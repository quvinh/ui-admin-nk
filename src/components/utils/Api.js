import axios from "axios"

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
},
)

export const getData = async (url) => {
  const res = await api.get(url);
  return res.data;
}

export const postData = async (url, data) => {
  const res = await api.post(url, data);
  console.log("POST")
  return res;
}

export const putData = async (url, data) => {
  const res = await api.put(url, data);
  return res;
}

export const delData = async (url) => {
  const res = await api.delete(url);
  return res.data;
}
