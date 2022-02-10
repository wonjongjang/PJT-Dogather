import { useEffect, useState } from "react";
import styled from "styled-components";
import HomeCarousel from "./HomeComponents/HomeCarousel";
import HomeCategory from "./HomeComponents/HomeCategory";
import HomeMoim from "./HomeComponents/HomeMoim";
import HomeSearch from "./HomeComponents/HomeSearch";

// const today = new Date();

// const year = today.getFullYear();
// const month = today.getMonth() + 1;
// const date = today.getDate();
// const hour = today.getHours();
// const minute = today.getMinutes();
// const second = today.getSeconds();

// console.log(today);
// console.log(year + "-" + month + "-" + date);
// console.log(hour + ":" + minute + ":" + second);

function Home() {
  return (
    <Container>
      <SearchBar>
        <HomeSearch />
      </SearchBar>
      <HomeCarousel />
      <HomeCategory />
      <HomeMoim />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-flow: wrap;
  row-gap: 20px;
`;

const SearchBar = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 40px;
`;

export default Home;
