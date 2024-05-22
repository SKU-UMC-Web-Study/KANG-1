import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MovieList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  background-color: rgb(0,0,102);
`;

const MovieItem = styled.div`
  width: 200px;
  border: solid rgb(0,0,102);
  padding: 0;
  border-radius: 10px;
  text-align: center;
  font-size: 9px;
  text-align: left;
  color: white;

  img {
    border-radius: 5px;
  }

  h3 {
    margin: 0;
    border-radius: 2px;
    padding-bottom: 40px;
    padding-top: 10px;
    background-color: rgb(51,51,102);
  }
`;

const API_KEY = '215f09dabe10c24a540887f85a29f81f';

const PopularPage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div>
      <MovieList>
        {movies.map((movie) => (
          // Link를 사용하여 영화 포스터를 클릭하면 상세 페이지로 이동합니다.
          <Link key={movie.id} to={`/details/${movie.id}`}>
            <MovieItem>
              <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
              <h3>{movie.title}</h3>
            </MovieItem>
          </Link>
        ))}
      </MovieList>
    </div>
  );
};

export default PopularPage;