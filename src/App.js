import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import styled from "styled-components";
import MainPage from "./components/MainPage";
import PopularPage from "./components/PopularPage";
import NowPlayingPage from "./components/NowPlayingPage";
import TopRatedPage from "./components/TopRatedPage";
import UpComingPage from "./components/UpComing";
import Details from "./components/Details";
import NotFound from "./components/NotFound";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Paging from "./components/Paging";
import { FaBars } from "react-icons/fa";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Navbar = styled.nav`
  background-color: black;
  color: white;
  width: 100%;
  padding: 0;
  ul {
    display: flex;
    justify-content: space-between;
    list-style: none;
    padding: 0;
  }
  li {
    margin: 0 10px;
  }
  @media (max-width: 768px) {
    font-size:6px;
  }


  @media (max-width: 480px) {
    display: none;
  }
`;

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 10px;

  &:hover {
    color: yellow;
    font-size: 17px;
  }
`;

const MenuIcon = styled.div`
  display: none;
  font-size: 24px;
  color: white;
  cursor: pointer;

  @media (max-width: 480px) {
    display: block;
    position: fixed;
    top: 10px;
    right: 20px;
    z-index: 1000;
  }
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  right: ${(props) => (props.isOpen ? "0" : "100%")};
  width: 250px;
  height: 100%;
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: start;
  padding: 20px;
  transition: left 0.3s ease;
`;

const SidebarLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 50px;
`;

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <Router>
      <AppContainer>
        <Navbar>
          <ul>
            <li>
              <StyledLink to="/">UMC Movie</StyledLink>
            </li>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              {isLoggedIn && (
                <li>
                  <StyledLink to="/" onClick={handleLogout}>
                    로그아웃
                  </StyledLink>
                </li>
              )}
              {!isLoggedIn && (
                <>
                  <li>
                    <StyledLink to="/login">로그인</StyledLink>
                  </li>
                  <li>
                    <StyledLink to="/signup">회원가입</StyledLink>
                  </li>
                </>
              )}
              <li>
                <StyledLink to="/popular">Popular</StyledLink>
              </li>
              <li>
                <StyledLink to="/now-playing">Now Playing</StyledLink>
              </li>
              <li>
                <StyledLink to="/top-rated">Top Rated</StyledLink>
              </li>
              <li>
                <StyledLink to="/upcoming">Upcoming</StyledLink>
              </li>
            </div>
          </ul>
        </Navbar>

        <MenuIcon onClick={toggleSidebar}>
          <FaBars />
        </MenuIcon>

        <Sidebar isOpen={isSidebarOpen}>
          <MenuIcon onClick={closeSidebar}></MenuIcon>
          <SidebarLinks>
            <StyledLink to="/" onClick={closeSidebar}>
              UMC Movie
            </StyledLink>
            {isLoggedIn && (
              <StyledLink
                to="/"
                onClick={() => {
                  handleLogout();
                  closeSidebar();
                }}
              >
                로그아웃
              </StyledLink>
            )}
            {!isLoggedIn && (
              <>
                <StyledLink to="/login" onClick={closeSidebar}>
                  로그인
                </StyledLink>
                <StyledLink to="/signup" onClick={closeSidebar}>
                  회원가입
                </StyledLink>
              </>
            )}
            <StyledLink to="/popular" onClick={closeSidebar}>
              Popular
            </StyledLink>
            <StyledLink to="/now-playing" onClick={closeSidebar}>
              Now Playing
            </StyledLink>
            <StyledLink to="/top-rated" onClick={closeSidebar}>
              Top Rated
            </StyledLink>
            <StyledLink to="/upcoming" onClick={closeSidebar}>
              Upcoming
            </StyledLink>
          </SidebarLinks>
        </Sidebar>

        <Routes>
          <Route path="/paging" element={<Paging />} />
          <Route
            path="/login"
            element={<Login onLogin={() => setIsLoggedIn(true)} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<MainPage isLoggedIn={isLoggedIn} />} />
          <Route path="/popular" element={<PopularPage />} />
          <Route path="/now-playing" element={<NowPlayingPage />} />
          <Route path="/top-rated" element={<TopRatedPage />} />
          <Route path="/upcoming" element={<UpComingPage />} />
          <Route path="/details/:movieId" element={<Details />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AppContainer>
    </Router>
  );
};

export default App;
