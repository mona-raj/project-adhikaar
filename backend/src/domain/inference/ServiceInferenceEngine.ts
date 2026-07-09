import { KEYWORD_INFERENCE_RULES } from "./keywordInferenceRules";

export class ServiceInferenceEngine {
  infer(description: string): string[] {
    const normalizedDescription = description.toLowerCase();

    const inferredCodes = new Set<string>();

    for (const rule of KEYWORD_INFERENCE_RULES) {
      for (const keyword of rule.keywords) {
        if (normalizedDescription.includes(keyword.toLowerCase())) {
          inferredCodes.add(rule.code);
          break;
        }
      }
    }

    return [...inferredCodes];
  }
}
