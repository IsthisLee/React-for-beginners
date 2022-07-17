import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

function Detail() {
  const { id } = useParams();
  const getMovie = async () => {
    const data = await fetch(
      `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
    ).then((res) => res.json());
  };

  useEffect(() => {
    getMovie();
  }, []);

  return <h1>Detail</h1>;
}

export default Detail;
