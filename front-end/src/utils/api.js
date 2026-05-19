export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://quran-server-zbx4.onrender.com"

export function apiUrl(path) {
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`
}

export default apiUrl
