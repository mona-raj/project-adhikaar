export interface KeywordInferenceRule {
  code: string;
  keywords: readonly string[];
}

export const KEYWORD_INFERENCE_RULES: readonly KeywordInferenceRule[] = [
  {
    code: "EMERGENCY_SHELTER",
    keywords: [
      "shelter",
      "safe place",
      "homeless",
      "escape",
      "nowhere to stay",
    ],
  },

  {
    code: "LEGAL_ASSISTANCE",
    keywords: [
      "lawyer",
      "legal",
      "court",
      "police",
      "fir",
      "domestic violence",
      "abuse",
      "rights",
    ],
  },

  {
    code: "MENTAL_HEALTH",
    keywords: [
      "depression",
      "depressed",
      "anxiety",
      "stress",
      "mental health",
      "therapy",
    ],
  },

  {
    code: "EMPLOYMENT_SUPPORT",
    keywords: [
      "job",
      "employment",
      "career",
      "resume",
      "interview",
      "work",
      "income",
    ],
  },

  {
    code: "IDENTITY_DOCUMENTATION",
    keywords: [
      "aadhaar",
      "aadhar",
      "pan",
      "passport",
      "voter id",
      "birth certificate",
      "identity",
      "documents",
    ],
  },

  {
    code: "COMMUNITY_SUPPORT",
    keywords: ["community", "support group", "peer", "family support"],
  },

  {
    code: "HEALTHCARE",
    keywords: [
      "doctor",
      "hospital",
      "medical",
      "medicine",
      "injury",
      "treatment",
      "health",
    ],
  },

  {
    code: "CRISIS_COUNSELING",
    keywords: ["panic", "crisis", "suicidal", "self harm", "emotional support"],
  },

  {
    code: "FINANCIAL_ASSISTANCE",
    keywords: ["money", "financial", "rent", "loan", "bills", "food", "income"],
  },
];
