import { beforeEach, describe, expect, it, vi } from "vitest";

import { ProcessCaseService } from "../../../src/services/ProcessCaseService";
import { CreateHelpRequestService } from "../../../src/services/CreateHelpRequestService";
import { HelpRequestRepository } from "../../../src/repositories/HelpRequestRepository";
import { CaseRepository } from "../../../src/repositories/CaseRepository";
import { CaseStatus } from "../../../src/generated/prisma/enums";
import { CreateHelpRequestInput } from "../../../src/validation/helpRequest.schema";

describe("CreateHelpRequestService", () => {
  let prisma = {
    $transaction: vi.fn(),
  };

  let processCaseService = {
    execute: vi.fn(),
  };

  let service: CreateHelpRequestService;

  let createHelpRequestSpy: ReturnType<typeof vi.spyOn>;
  let createCaseSpy: ReturnType<typeof vi.spyOn>;

  const input: CreateHelpRequestInput = {
    description: "I need financial assistance for my education.",
  };

  beforeEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();

    createHelpRequestSpy = vi.spyOn(HelpRequestRepository.prototype, "create");

    createCaseSpy = vi.spyOn(CaseRepository.prototype, "create");

    service = new CreateHelpRequestService(
      prisma as any,
      processCaseService as unknown as ProcessCaseService,
    );

    prisma.$transaction.mockImplementation(async (callback) => {
      return callback({});
    });
  });

  it("creates a help request, creates a case, and processes the case", async () => {
    // Arrange

    createHelpRequestSpy.mockResolvedValue({
      id: "help-request-123",
    } as any);

    createCaseSpy.mockResolvedValue({
      id: "case-123",
      status: CaseStatus.NEW,
    } as any);

    // Act
    const result = await service.execute(input);

    // Assert
    expect(prisma.$transaction).toHaveBeenCalledTimes(1);

    expect(createHelpRequestSpy).toHaveBeenCalledWith(input);

    expect(createCaseSpy).toHaveBeenCalledWith("help-request-123");

    expect(createHelpRequestSpy.mock.invocationCallOrder[0]).toBeLessThan(
      createCaseSpy.mock.invocationCallOrder[0],
    );

    expect(processCaseService.execute).toHaveBeenCalledWith("case-123");

    expect(result).toEqual({
      helpRequestId: "help-request-123",
      caseId: "case-123",
      status: CaseStatus.NEW,
    });
  });

  it("does not create a case when help request creation fails", async () => {
    // Arrange
    const error = new Error("Database error");

    createHelpRequestSpy.mockRejectedValue(error);

    // Act + Assert
    await expect(service.execute(input)).rejects.toThrow(error);

    expect(prisma.$transaction).toHaveBeenCalledTimes(1);

    expect(createHelpRequestSpy).toHaveBeenCalledWith(input);

    expect(createCaseSpy).not.toHaveBeenCalled();

    expect(processCaseService.execute).not.toHaveBeenCalled();
  });

  it("does not process the case when case creation fails", async () => {
    // Arrange
    createHelpRequestSpy.mockResolvedValue({
      id: "help-request-123",
    } as any);

    const error = new Error("Case creation failed");

    createCaseSpy.mockRejectedValue(error);

    // Act + Assert
    await expect(service.execute(input)).rejects.toThrow(error);

    // Assert
    expect(prisma.$transaction).toHaveBeenCalledTimes(1);

    expect(createHelpRequestSpy).toHaveBeenCalledWith(input);

    expect(createCaseSpy).toHaveBeenCalledWith("help-request-123");

    expect(processCaseService.execute).not.toHaveBeenCalled();
  });

  it("propagates processing errors after the transaction completes", async () => {
    // Arrange
    createHelpRequestSpy.mockResolvedValue({
      id: "help-request-123",
    } as any);

    createCaseSpy.mockResolvedValue({
      id: "case-123",
      status: CaseStatus.NEW,
    } as any);

    const error = new Error("Processing failed");

    processCaseService.execute.mockRejectedValue(error);

    // Act + Assert
    await expect(service.execute(input)).rejects.toThrow(error);

    expect(prisma.$transaction).toHaveBeenCalledTimes(1);

    expect(createHelpRequestSpy).toHaveBeenCalledWith(input);

    expect(createCaseSpy).toHaveBeenCalledWith("help-request-123");

    expect(createHelpRequestSpy.mock.invocationCallOrder[0]).toBeLessThan(
      createCaseSpy.mock.invocationCallOrder[0],
    );

    expect(processCaseService.execute).toHaveBeenCalledWith("case-123");
  });
});
