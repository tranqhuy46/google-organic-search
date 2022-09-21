enum KeywordReportStatus {
  PROCESSING = "PROCESSING",
  DONE = "DONE",
  FAILED = "FAILED",
}

interface IKeywordReport {
  id: string;
  html?: string;
  links: string[];
  keyword: string;
  totalAdwords?: number;
  totalResults?: number;
  totalSeconds?: number;
  status: KeywordReportStatus;
  owner: { id: string; email: string };
}

export { KeywordReportStatus };
export type { IKeywordReport };
