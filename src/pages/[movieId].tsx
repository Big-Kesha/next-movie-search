import Layout from "@/components/Layout";
import { movieService } from "@/services/movie-service";
import { IMovieExtended } from "@/types/moviesTypes";
import { GetStaticPaths, GetStaticProps } from "next";
import Movie from "@/components/Movie/Movie";


export default function moviePage({
  movie
} : {
  movie: IMovieExtended, 
}) {

  return (
    <Layout>
      <Movie movie={movie}/>
    </Layout>
  );
};

export const getStaticPaths = (async () => {
  return {
    paths: [
      {
        params: {
          movieId: '',
        },
      },
    ],
    fallback: 'blocking',
  }
}) satisfies GetStaticPaths

export const getStaticProps = (async ({params}) => {
  const search = Array.isArray(params!.movieId) ? params!.movieId[0] : params!.movieId
  const movieData = await  movieService.getById(search || '')

  // console.log('ssg', movieData);
  

  return { props: { movie: movieData } }
}) satisfies GetStaticProps<{
  movie: IMovieExtended
}>