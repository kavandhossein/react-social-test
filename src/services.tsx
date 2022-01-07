import axios from "axios";

const BASE_URL = "http://localhost:3030/socials";

export const getPathes = () => {
  return axios.get(BASE_URL);
};

export const getPathById = (id: string) => {
  return axios.get(BASE_URL + `/${id}`);
};

export const createPath = (data: object) => {
  return axios.post(BASE_URL, data);
};

export const editPath = (id: string, data: object) => {
  return axios.put(BASE_URL + `/${id}`, data);
};

export const removePath = (id: string) => {
  return axios.delete(BASE_URL + `/${id}`);
};
