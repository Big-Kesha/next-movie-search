import Layout from "@/components/Layout";
import { movieService } from "@/services/movie-service";
import { IMovieExtended } from "@/types/moviesTypes";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
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


export const getServerSideProps = (async ({params}) => {
  const search = Array.isArray(params!.movieId) ? params!.movieId[0] : params!.movieId
  const movieData = await movieService.getById(search || '')

  return { props: { movie: movieData } }
}) satisfies GetServerSideProps<{
  movie: IMovieExtended
}>

// export const getStaticPaths = (async () => {
//   return {
//     paths: [
//       {
//         params: {
//           movieId: '/',
//         },
//       },
//     ],
//     fallback: 'blocking',
//   }
// }) satisfies GetStaticPaths


// export const getStaticProps = (async ({params}) => {
//   const search = Array.isArray(params!.movieId) ? params!.movieId[0] : params!.movieId
//   const movieData = await  movieService.getById(search || '')

//   return { props: { movie: movieData } }
// }) satisfies GetStaticProps<{
//   movie: IMovieExtended
// }>