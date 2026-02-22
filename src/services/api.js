import axios from "axios";

/**
 * ============================================================
 * API SERVICE — CarbonChain Pro
 * Centralized API communication with backend
 * ============================================================
 */

// ------------------------------------------------------------
// BASE URL RESOLUTION
// ------------------------------------------------------------
const API_BASE_URL ="https://carbonchain-backend-8h0r.onrender.com/api" ||
  import.meta.env.VITE_API_BASE_URL ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:5000/api"
    : null);

// 👉 LOG BASE URL (for debugging in production)
console.log("🌐 ENV VITE_API_BASE_URL:", import.meta.env.VITE_API_BASE_URL);
console.log("🌐 FINAL API_BASE_URL:", API_BASE_URL);

// ------------------------------------------------------------
// AXIOS INSTANCE
// ------------------------------------------------------------
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

// ------------------------------------------------------------
// GLOBAL ERROR INTERCEPTOR (optional but helpful)
// ------------------------------------------------------------
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("🚨 API ERROR:", error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ============================================================
// HEALTH CHECK
// ============================================================
export const healthCheck = async () => {
  const res = await apiClient.get("/health");
  return res.data;
};

// ============================================================
// COMPANY ENDPOINTS
// ============================================================
export const createCompany = async (data) =>
  (await apiClient.post("/companies", data)).data;

export const registerCompany = async (data) =>
  (await apiClient.post("/companies/register", data)).data;

export const loginCompany = async (email, password) =>
  (await apiClient.post("/companies/login", { email, password })).data;

export const getCompanies = async () =>
  (await apiClient.get("/companies")).data;

export const getCompanyById = async (id) =>
  (await apiClient.get(`/companies/${id}`)).data;

// ============================================================
// PRODUCT ENDPOINTS
// ============================================================
export const createProduct = async (data) =>
  (await apiClient.post("/products", data)).data;

export const getProductsByCompany = async (companyId) =>
  (await apiClient.get(`/products/company/${companyId}`)).data;

export const getProductById = async (id) =>
  (await apiClient.get(`/products/${id}`)).data;

// ============================================================
// SUPPLY CHAIN
// ============================================================
export const addSupplyChainNode = async (data) =>
  (await apiClient.post("/supply-chain", data)).data;

export const getSupplyChainNodes = async (productId) =>
  (await apiClient.get(`/supply-chain/product/${productId}`)).data;

export const getNodeById = async (id) =>
  (await apiClient.get(`/supply-chain/${id}`)).data;

export const updateSupplyChainNode = async (id, data) =>
  (await apiClient.put(`/supply-chain/${id}`, data)).data;

export const analyzeRouteIntelligence = async (data) =>
  (await apiClient.post("/supply-chain/route/analyze", data)).data;

// ============================================================
// ANALYSIS
// ============================================================
export const runAnalysis = async (productId) =>
  (await apiClient.post(`/analysis/${productId}`)).data;

export const getAnalysisResult = async (productId) => {
  try {
    return (await apiClient.get(`/analysis/${productId}`)).data;
  } catch (err) {
    if (err.response?.status === 404)
      return { success: true, data: null };
    throw err;
  }
};

export const getAnalysisHistory = async (productId) =>
  (await apiClient.get(`/analysis/history/${productId}`)).data;

// ============================================================
// OPTIMIZATIONS
// ============================================================
export const getOptimizations = async (productId) => {
  try {
    return (await apiClient.get(`/optimizations/${productId}`)).data;
  } catch (err) {
    if (err.response?.status === 404)
      return { success: true, data: [] };
    throw err;
  }
};

export const createOptimization = async (data) =>
  (await apiClient.post("/optimizations", data)).data;

export const getGeminiOptimizations = async (productId) => {
  try {
    return (await apiClient.get(`/optimizations/${productId}/gemini`)).data;
  } catch (err) {
    if (err.response?.status === 404)
      return { success: true, data: [], source: "gemini-ai" };
    throw err;
  }
};

export const regenerateGeminiOptimizations = async (productId) =>
  (await apiClient.post(`/optimizations/${productId}/gemini/regenerate`)).data;

export const getOptimisationInsights = async () => {
  try {
    return (await apiClient.get("/optimizations")).data;
  } catch (err) {
    if (err.response?.status === 404)
      return { success: true, data: [] };
    throw err;
  }
};

// ============================================================
// NET ZERO PROGRESS
// ============================================================
export const getNetZeroProgress = async (productId) =>
  (await apiClient.get(`/netzero-progress/product/${productId}`)).data;

export const recordNetZeroProgress = async (data) =>
  (await apiClient.post("/netzero-progress", data)).data;

export default apiClient;