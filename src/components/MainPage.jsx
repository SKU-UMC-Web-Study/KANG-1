import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { debounce } from "lodash";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

const Main = styled.main`
  width: 100%;
  overflow-y: auto;
  max-height: calc(100vh - 10px);
`;

const Welcome = styled.div`
  text-align: center;
  background-color: black;
  color: white;
  font-size: 25px;
  padding: 150px;
`;

const Data = styled.p`
  text-align:center;
  margin-top:100px;
`;

const Search = styled.div`
  input {
    border-radius: 20px;
    margin-top: 20px;
    padding: 2px 20px;
  }
`;

const Find = styled.div`
  color: white;
  text-align: center;
  background-color: gray;
  padding: 50px;
  font-size: 40px;
`;

const MovieList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap:20px;
  background-color: navy;
  padding: 50px;
  
`;

const MovieItem = styled.div`
  width: 90%;
  border: solid px;
  padding: 10px;
  background-color: black;
  border-radius: 10px;
  color: white;

  h3 {
    font-size: 10px;
  }
`;

const MainPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = async (searchTerm) => {
    if (searchTerm.trim() === "") return;
    const apiKey = "215f09dabe10c24a540887f85a29f81f";
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`;
    try {
      setIsLoading(true);
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setSearchResult(data.results);
      } else {
        console.error("검색에 실패했습니다.");
      }
    } catch (error) {
      console.error("검색 중 오류 발생:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedHandleSearch = useCallback(
    debounce((searchTerm) => handleSearch(searchTerm), 300),
    []
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedHandleSearch(value);
  };

  return (
    <Main>
      <Welcome>환영합니다</Welcome>

      <Find>
        🎥 Find your movies!
        <Search>
          <input
            type="text"
            placeholder="영화를 검색하세요"
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button>🔍</button>
        </Search>
      </Find>

      {isLoading ? (
        
        <Data>데이터를 받아오는 중입니다...</Data>
      ) : searchResult.length > 0 ? (
        <MovieList>
          {searchResult.map((movie) => (
            <Link key={movie.id} to={`/details/${movie.id}`}>
              <MovieItem>
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
                <h3>{movie.title}</h3>
                <p>⭐️: {movie.vote_average.toFixed(1)}</p>
              </MovieItem>
            </Link>
          ))}
        </MovieList>
      ) : null}
    </Main>
  );
};

export default MainPage;