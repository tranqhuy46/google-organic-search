import Axios from "../lib/axios";

async function searchGoogle() {
  try {
    const resp = await Axios.instance.get("/test");
  } catch (error) {
    console.error("searchGoogle error:", error);
  }
}

export default { searchGoogle } as const;
