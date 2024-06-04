import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Spinner from './Spinner'; 

const MovieList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  background-color: rgb(0, 0, 102);
`;

const MovieItem = styled.div`
  border: solid rgb(0, 0, 102);
  padding: 50px;
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
    border-radius: 4px;
    padding-bottom: 40px;
    padding-top: 10px;
    background-color: rgb(51, 51, 102);
  }
`;

const NowPlayingPage = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const observer = useRef();
  const API_KEY = 'api-key';

  const fetchMovies = async (page) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=${page}`);
      const data = await response.json();
      setMovies((prevMovies) => [...prevMovies, ...data.results]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMovies(currentPage);
  }, [currentPage]);

  const lastMovieElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
  );

  return (
    <div>
      <MovieList>
        {movies.map((movie, index) => (
          <Link key={movie.id} to={`/details/${movie.id}`}>
            <MovieItem ref={movies.length === index + 1 ? lastMovieElementRef : null}>
              <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
              <h3>{movie.title}</h3>
            </MovieItem>
          </Link>
        ))}
      </MovieList>
      {isLoading && <Spinner />}
    </div>
  );
};

export default NowPlayingPage;
