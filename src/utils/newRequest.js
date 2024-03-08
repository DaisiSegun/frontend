import axios from "axios";

const newRequest = axios.create({
  baseURL: "https://whale-app-ho8op.ondigitalocean.app/api", // Make sure to include the protocol (http/https)
  withCredentials: true,
})

// Add a request interceptor
newRequest.interceptors.request.use(
  (config) => {
    // Check if the access token is present and not expired
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
newRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If the error status is 401 (Unauthorized) and the request was not a retry
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the access token using your /refresh-token endpoint
        const response = await newRequest.post("/auth/refresh-token");
        const newAccessToken = response.data.accessToken;

        // Update the localStorage and retry the original request with the new token
        localStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return newRequest(originalRequest);
      } catch (refreshError) {
        // If refresh token fails, redirect to login or handle as needed
        console.error("Failed to refresh token:", refreshError);
        // Redirect to login or handle the error as needed
      }
    }

    return Promise.reject(error);
  }
);

export default newRequest;
