import axios from "axios";

export async function handleResponse(response) {
  if ([200, 201].includes(response.status)) return response.data;
  if (response.status === 400) {
    // So, a server-side validation error occurred.
    // Server side validation returns a string error message, so parse as text instead of json.
    const error = await response.text();
    throw new Error(error);
  }
  throw new Error("Network response was not ok.");
}

export function handleError(error) {
  // eslint-disable-next-line no-console
  console.error("API call failed. " + error);
  throw error;
}

axios.interceptors.request.use(async (config) => {
  const token = 123;
  config.headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  return config;
});
