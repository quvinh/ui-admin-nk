import axios from "axios"

const path = 'http://127.0.0.1:8000'

const api = axios.create({
  // baseURL: '/',
},
)

export const getData = async (url) => {
  const res = await api.get(path + url);
  return res.data;
}

export const postData = async (url, data) => {
  const res = await api.post(path + url, data);
  console.log("POST")
  return res;
}

export const putData = async (url, data) => {
  const res = await api.put(path + url, data);
  return res;
}

export const delData = async (url) => {
  const res = await api.delete(path + url);
  return res.data;
}
