import { IKeywordReport } from "ui/shared/type";

const MOCK_KEYWORD_RESOURCES: IKeywordReport[] = [
  {
    id: "row-1",
    html: "",
    status: "PROCESSING",
    keyword: "nimble",
    totalLinks: 0,
    totalResults: 0,
    totalSearchTime: 0,
  },
  {
    id: "row-2",
    html: "",
    status: "FINISHED",
    keyword: "fireworks",
    totalLinks: 0,
    totalResults: 0,
    totalSearchTime: 0,
  },
];

export { MOCK_KEYWORD_RESOURCES };
