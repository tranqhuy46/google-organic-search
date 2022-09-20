type TKeywordReportStatus = "PROCESSING" | "FINISHED" | "FAILED";

interface IKeywordReport {
  id: string;
  html?: string;
  keyword: string;
  totalResults: number;
  totalSearchTime: number;
  totalLinks: number;
  status: TKeywordReportStatus;
}

export type { IKeywordReport, TKeywordReportStatus };
