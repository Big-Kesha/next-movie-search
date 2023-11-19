import { IErrorResponse, IMovieItem, IMovieListResponseData, IMovieResponseData } from "@/types/moviesTypes";
import axios, { AxiosResponse } from "axios";

const API_URL = 'https://www.omdbapi.com/'

export const api_key = process.env.API_KEY

export const axiosInstance = axios.create({
  baseURL: API_URL,
  params: {
    apikey: api_key
  }
})


export const movieService = {
  async getAll(
    // Деструктуризация чтобы не было проблем со значениями по умолчанию
    {
      search,
      type, 
      year
    }: 
    {
      search: string,
      type?: string,
      year?: string
    }): Promise<IMovieItem[] | IErrorResponse> {
    try {
      const response = await axiosInstance.get<IMovieListResponseData>('/', {
          params: {
            s: search,
            y: year,
            type: type,
          }
      })
      // console.log('response length', response.data.Search.length, !response.data.Search)
      if(!response.data.Search){
        throw 'no search'
      }else{
        // console.log('succes', !!response.data.Search);
        // console.table(response.data.Search)
        return response.data.Search
      }
    }catch(error) {
      // не смог типизировать неудачный и удачный ответы в один тип
      const response = await axiosInstance.get<IErrorResponse>('/', {
        params: {
          s: search,
          y: year,
          type: type,
        }
      })
      console.log('error', error)
      console.table(response.data.Error)
      return response.data
    }
  },
  async getById(OMDBId: string) {
    const response = await axiosInstance.get<IMovieResponseData>('/', {params: {i: OMDBId}})
    return response.data
  }
}