export default {
  API_URL: process.env.REACT_APP_API_URL,
  NODE_ENV: process.env.NODE_ENV ?? "development",
} as const;
