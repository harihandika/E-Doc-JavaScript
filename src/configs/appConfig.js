const apiUrl = import.meta.env.VITE_API_URL || "";
const jwtSecretKey = import.meta.env.VITE_JWT_SECRET_KEY || "";
const xAccessToken = import.meta.env.VITE_X_ACCESS_TOKEN || "";

export const config =
  import.meta.env.VITE_NODE_ENV === "development"
    ? {
        nodeEnv: "development",
        apiUrl: "http://localhost:3000",
        jwtSecretKey,
        xAccessToken,
        appPlatform: "Website",
      }
    : {
        nodeEnv: "production",
        apiUrl,
        jwtSecretKey,
        xAccessToken,
        appPlatform: "Website",
      };
