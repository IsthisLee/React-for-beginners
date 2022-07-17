import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getMovie = async () => {
    const movie = await fetch(
      `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
    ).then((res) => res.json());
    setMovie(movie);
    setIsLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, []);

  return <div>{isLoading ? <h1>Loading...</h1> : <h1>Detail</h1>}</div>;
}

export default Detail;
