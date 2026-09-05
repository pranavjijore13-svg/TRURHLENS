export type InputType = 'TEXT' | 'URL' | 'IMAGE' | 'SCREENSHOT' | 'VIDEO' | 'AUDIO';

export type VerificationStatus =
  | 'HIGHLY SUPPORTED'
  | 'GENERALLY SUPPORTED'
  | 'NEEDS REVIEW'
  | 'LIKELY MISLEADING'
  | 'VERY LOW SUPPORT'
  | 'CONTRADICTED'
  | 'INSUFFICIENT EVIDENCE';

export type ClaimStatus =
  | 'SUPPORTED'
  | 'PARTIALLY SUPPORTED'
  | 'NEEDS REVIEW'
  | 'CONTRADICTED'
  | 'OUTDATED'
  | 'UNVERIFIED'
  | 'INSUFFICIENT EVIDENCE';

export type RelationshipType = 'SUPPORTS CLAIM' | 'CONTRADICTS CLAIM' | 'CONTEXT';

export type CredibilityLevel = 'HIGH' | 'MEDIUM' | 'LOW' | 'UNKNOWN';

export interface EvidenceExcerpt {
  title: string;
  excerpt: string;
  date: string;
  url: string;
  publisher?: string;
}

export interface Claim {
  id: string;
  claimNumber: number;
  text: string;
  status: ClaimStatus;
  supportingCount: number;
  conflictingCount: number;
  explanation: string;
  sources: string[];
  supportingEvidence?: EvidenceExcerpt;
  contradictoryEvidence?: EvidenceExcerpt;
}

export interface EvidenceItem {
  id: string;
  sourceName: string;
  domain: string;
  publishDate: string;
  excerpt: string;
  relationship: RelationshipType;
  credibility: CredibilityLevel;
  url: string;
}

export interface CredibilityFactor {
  text: string;
  passed: boolean;
}

export interface SourceCredibility {
  id: string;
  name: string;
  domain: string;
  publisherType: string;
  score: number;
  credibilityLevel: CredibilityLevel;
  reasons: CredibilityFactor[];
}

export interface MisinformationSignal {
  id: string;
  type: 'CAUTION' | 'CLEAR';
  title: string;
  description: string;
}

export interface EvidenceGraphNode {
  id: string;
  label: string;
  type: 'claim' | 'source';
  domain?: string;
  credibility?: CredibilityLevel;
  relationship?: 'SUPPORTS' | 'CONTRADICTS' | 'CONTEXT';
}

export interface EvidenceGraphEdge {
  from: string;
  to: string;
  relationship: 'SUPPORTS' | 'CONTRADICTS' | 'CONTEXT';
}

export interface RecommendationInfo {
  headline: string;
  description: string;
  nextSteps: string[];
}

export interface WhyReason {
  type: 'positive' | 'warning' | 'negative';
  text: string;
}

export interface VerificationResult {
  id: string;
  createdAt: string;
  timestamp: number;
  inputType: InputType;
  title: string;
  rawContent: string;
  url?: string;
  trustScore: number;
  status: VerificationStatus;
  assessment: string;
  analysisTime: string;
  claimsCount: number;
  sourcesCount: number;
  evidenceCount: number;
  whyReasons: WhyReason[];
  fullExplanation: string;
  recommendation: RecommendationInfo;
  claims: Claim[];
  evidence: EvidenceItem[];
  sources: SourceCredibility[];
  warningSignals: MisinformationSignal[];
  graph: {
    nodes: EvidenceGraphNode[];
    edges: EvidenceGraphEdge[];
    balance: {
      supports: number;
      contradicts: number;
      context: number;
    };
  };
  isSaved?: boolean;
}

export interface HistoryItem {
  id: string;
  title: string;
  inputType: InputType;
  createdAt: string;
  timestamp: number;
  trustScore: number | null;
  status: VerificationStatus;
  evidenceCount: number;
}
