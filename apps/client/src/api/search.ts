import Axios from "../lib/axios";
import { IKeywordReport } from "ui/shared/type";

async function searchGoogle(keywords: string[]) {
  try {
    await Axios.instance.post("/search/google", {
      keywords,
      // keywords: [...keywords, "<script>alert('xss')</script>"], // test xss sanitization
    });
  } catch (error) {
    console.error("searchGoogle error:", error);
    throw error;
  }
}

async function getReports(query?: string): Promise<IKeywordReport[]> {
  try {
    const resp = await Axios.instance.get<IKeywordReport[]>(
      `/search/report${query ? `?q=${query}` : ""}`
    );
    return resp?.data;
  } catch (error) {
    console.error("getReports error:", error);
    throw error;
  }
}

async function getReportDetail(
  reportId: string
): Promise<IKeywordReport | null> {
  try {
    const resp = await Axios.instance.get<IKeywordReport>(
      "/search/report/" + reportId
    );
    return resp?.data;
  } catch (error) {
    console.error("getReports error:", error);
    throw error;
  }
}

export default { getReportDetail, searchGoogle, getReports } as const;
