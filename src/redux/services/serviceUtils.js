import axios from "axios";
import { getUsersByIds } from "../../api/userApi";

export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({ url: baseUrl + url, method, data, params });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

axios.interceptors.request.use(async (config) => {
  const token = 123;
  config.headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  return config;
});

export const fetchRelatedUsers = (promise) => {
  return promise.then((result) => {
    const userIds = new Set(
      result.data
        .filter((record) => record.createdById)
        .map((record) => record.createdById)
    );
    if (!userIds.size > 0) return { data: result.data };
    const finalData = getUsersByIds([...userIds]).then((usersResult) => {
      const data = result.data.map((record) =>
        record.createdById
          ? {
              ...record,
              createdBy: usersResult.data.find(
                (user) => user.id === record.createdById
              ).name,
            }
          : record
      );
      return { data };
    });
    return finalData;
  });
};