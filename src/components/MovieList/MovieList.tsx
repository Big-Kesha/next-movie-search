import { IErrorResponse, IMovieItem } from '@/types/moviesTypes';
import Image from 'next/image';
import styles from '@/components/MovieList/MovieList.module.sass'
import { Card } from 'antd';
import Link from 'next/link';

export default function MovieList({
  moviesResponse,
  query
} : {
  moviesResponse?: IMovieItem[] | IErrorResponse
  query?: string
}) {

  let isSuccessfullSearch = true
  if(moviesResponse !== undefined && !Array.isArray(moviesResponse)){
    // console.log(moviesResponse.Response)
    isSuccessfullSearch = false
  }
  

  return (
    <div className={styles.list}>
      {Array.isArray(moviesResponse) &&
        moviesResponse.map((movie) => (
            <Link 
              href={`/${movie.imdbID}`} 
              className={styles.card}
              key={movie.imdbID}
            >
              <Card 
                hoverable
                size='small'
                title={movie.Title} 
                cover={<img src={movie.Poster} alt='Poster'/>}
              >
                {/* <Image src={movie.Poster} alt={movie.Title} width={100} height={150}/> */}
                <div className={styles.desc}>
                  <div>{movie.Year}</div> 
                  <div>{movie.Type}</div>
                </div>
              </Card>
            </Link>
      ))}
      {!Array.isArray(moviesResponse) &&
        <p>Некорректный запрос</p>
      }
    </div>
  );
};