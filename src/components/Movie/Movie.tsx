import React from 'react';
import styles from '@/components/Movie/Movie.module.sass'
import { IMovieExtended } from '@/types/moviesTypes';
import { Table } from "antd";


interface dataType {
  key: string
  value: string
}


const Movie = ({movie}: {movie: IMovieExtended}) => {
  const {Column} = Table

  const tableData: dataType[] = [{
    key: 'Год производства',
    value: movie.Year,
  },
  {
    key: 'Жанр',
    value: movie.Genre,
  },
  {
    key: 'Режиссер',
    value: movie.Director,
  },
  {
    key: 'Страна производства',
    value: movie.Country,
  },
  {
    key: 'Продолжительность',
    value: movie.Runtime,
  }]

  return (
    <div>
      <div className={styles.contentColumns}>
        <section>
          <img src={movie.Poster} alt=''/>
        </section>
        <section>
          <h2>{`${movie.Title} (${movie.Year})`}</h2>
          <Table dataSource={tableData} showHeader={false} pagination={false}>
            <Column dataIndex="key" key="key"/>
            <Column dataIndex="value" key="value"/>
          </Table>
        </section>
      </div>
      <div className={styles.article}>
        <article>
          {movie.Plot}
        </article>
      </div>
    </div>
  );
};

export default Movie;