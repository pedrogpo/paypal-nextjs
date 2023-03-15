import axios, { AxiosResponse } from 'axios'

export const localApi = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : '',
})
