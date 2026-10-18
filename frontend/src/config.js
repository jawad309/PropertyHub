const BASE_URL =
import.meta.env.VITE_API_URL ||
"https://propertyhub-production-ceea.up.railway.app";

export const API_URL = `${BASE_URL.replace(/\/+$/, "")}/api`;
