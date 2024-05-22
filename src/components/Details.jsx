import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  background-color: rgba(0, 0, 139, 0.6);
  background-image: ${({ movie }) =>
    movie && movie.poster_path
      ? `url('https://image.tmdb.org/t/p/original${movie.poster_path}')`
      : ""};
  background-blend-mode: overlay;
  background-size: cover;
  background-position: center;
  color: white;
  padding: 20px;
  box-sizing: border-box;
`;

const Img = styled.div`
  margin-right: 100px;

  img {
    width: 250px;
    height: auto;
    border-radius:5px;
  }
`;

const MovieOverview = styled.div`
  font-weight: bold;
  margin-bottom: 30px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: white;
  text-align: center;
  border-radius: 10px;
  width:60%;
  
  p {
    font-weight: bold;
    margin: 10px 0;
  }
`;

const Data = styled.div`
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  margin-top: 40px;
  margin-left:420px;
  `;

const CreditsList = styled.ul`
  list-style: none;
  display: flex;  
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  padding: 0;
`;

const CreditItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    width: 50px;
    height: 50px;
    margin-bottom: 8px;
    border-radius: 50%;
  }
`;

const Details = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);

  const API_KEY = "215f09dabe10c24a540887f85a29f81f";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`
        );
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("영화 상세 정보를 가져오는 데 문제가 발생했습니다:", error);
      }
    };

    const fetchCredits = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}&language=ko-KR`
        );
        const data = await response.json();
        setCredits(data);
      } catch (error) {
        console.error("출연진 및 제작진 정보를 가져오는 데 문제가 발생했습니다:", error);
      }
    };

    fetchMovieDetails();
    fetchCredits();
  }, [movieId]);

  if (!movie || !credits) {
    return <p>로딩 중...</p>;
  }

  const renderStars = (voteAverage) => {
    const stars = Math.floor(voteAverage / 2); // 10점 만점 기준 5점 만점으로 변환
    return "⭐️".repeat(stars);
  };

  return (
    <Container movie={movie}>
      <Img>
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
        />
      </Img>
      <Content>
        <h1>{movie.title}</h1>
        <p>평점 {renderStars(movie.vote_average)} ({movie.vote_average}/10)</p>
        <p>개봉일 {movie.release_date}</p>
        <p>줄거리</p>
        <MovieOverview>
          {movie.overview
            ? movie.overview
            : "TMDB에서 제공하는 API에 상세 줄거리 정보가 없습니다."}
        </MovieOverview>
        <Data>출연진 및 제작진</Data>
        <CreditsList>
          {credits.cast.map((castMember) => (
            <CreditItem key={castMember.id}>
              <img
                src={
                  castMember.profile_path
                    ? `https://image.tmdb.org/t/p/w200${castMember.profile_path}`
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz7ztleRwzXhFdiwBYqZ8cib9RvEsukVVUS3niN1YQ&s"
                }
                alt={castMember.name}
              />
              {castMember.name}
            </CreditItem>
          ))}
          {credits.crew.map((crewMember) => (
            <CreditItem key={crewMember.id}>
              <img
                src={
                  crewMember.profile_path
                    ? `https://image.tmdb.org/t/p/w200${crewMember.profile_path}`
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz7ztleRwzXhFdiwBYqZ8cib9RvEsukVVUS3niN1YQ&s"
                }
                alt={crewMember.name}
              />
              {crewMember.name}
            </CreditItem>
          ))}
        </CreditsList>
      </Content>
    </Container>
  );
};

export default Details;