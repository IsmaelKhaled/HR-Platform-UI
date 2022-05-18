import axios from "axios";

const baseUrl = process.env.REACT_APP_BACKEND_URL;

export function getUsersByIds(ids) {
  const ids_params = new URLSearchParams(ids.map((s) => ["ids", s]));
  return axios.get(`${baseUrl}/users/byids/?${ids_params.toString()}`);
}
