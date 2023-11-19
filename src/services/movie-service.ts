import { IErrorResponse, IMovieItem, IMovieListResponseData, IMovieResponseData } from "@/types/moviesTypes";
import axios, { AxiosResponse } from "axios";

const API_URL = 'https://www.omdbapi.com/'

export const API_KEY = 'ea977fb7'

export const axiosInstance = axios.create({
  baseURL: API_URL,
  params: {
    apikey: 'ea977fb7'
  }
})


export const movieService = {
  async getAll(
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
      const response = await axiosInstance.get<IMovieListResponseData>('/', 
        {
          params: {
            s: search,
            y: year,
            type: type,
          }
        }
      )
      if(!response.data.Search){
        throw 'no search'
      }else{
        // console.log('succes', response.data.Search);
        return response.data.Search
      }
    }catch(error) {
      // console.log('error', error)
      const response = await axiosInstance.get<IErrorResponse>('/', {params: {s: search}})
      return response.data
    }
  },
  async getById(OMDBId: string) {
    const response = await axiosInstance.get<IMovieResponseData>('/', {params: {i: OMDBId}})
    return response.data
  }
}