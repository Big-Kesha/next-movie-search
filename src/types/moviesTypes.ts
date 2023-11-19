export enum movieTypeEnum {
  series,
  movie
}

export type movieType = 'series' | 'movies'

movieTypeEnum.movie

export interface IMovieItem {
  Title: string,
  Year: string,
  imdbID: string,
  Type: 'series' | 'movie',
  Poster: string
}

export interface IMovieExtended extends IMovieItem {
  Director: string,
  Released: string,
  Runtime: string,
  Genre: string,
  Country: string,
  imdbRating: string,
  Plot: string,
}

export interface IMovieResponse {
  Response: 'True' | 'False'
}

export interface IMovieListResponseData extends IMovieResponse {
  Search: IMovieItem[]
  totalResults: string
}

export interface IMovieResponseData extends IMovieExtended {}

export interface IErrorResponse extends IMovieResponse {
  Error: string
}