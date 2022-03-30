import axios from "axios"
import { getToken } from "./Common"

const path = 'http://127.0.0.1:8000'
// const path = 'https://nkgarage.herokuapp.com'
const token = '?token=' + getToken()

const api = axios.create({
  // baseURL: '/',
},
)

export const getData = async (url) => {
  const res = await api.get(path + url + token);
  return res.data;
}

export const postData = async (url, data) => {
  const res = await api.post(path + url + token, data);
  console.log("POST")
  return res;
}

export const putData = async (url, data) => {
  const res = await api.put(path + url + token, data);
  return res;
}

export const delData = async (url) => {
  const res = await api.delete(path + url + token);
  return res.data;
}
