export interface ReferralSharedData {
  contact: {
    name: string;
    email: string | null;
    phone: string | null;
  };

  helpRequest: {
    description: string;
  };

  preferredLanguage: {
    code: string;
    name: string;
  } | null;

  service: {
    code: string;
    name: string;
  };
}
