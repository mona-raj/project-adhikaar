import { ReferralSharedData } from "../../domain/referral/ReferralSharedData";
import { RecommendationStatus, ReferralStatus } from "../../generated/prisma/enums";

export interface GetReferralResponse {
  id: string;
  status: ReferralStatus;
  createdAt: Date;

  recommendation: {
    id: string;
    status: RecommendationStatus;
    score: number | null;
    reason: string | null;
  };

  service: {
    id: string;
    code: string;
    name: string;
  };

  organization: {
    id: string;
    name: string;
    website: string | null;
    email: string | null;
    phone: string | null;
  };

  sharedData: ReferralSharedData;
}
