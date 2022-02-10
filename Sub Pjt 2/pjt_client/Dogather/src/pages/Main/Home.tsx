import styled from "styled-components";
import HomeCarousel from "./HomeComponents/HomeCarousel";
import HomeCategory from "./HomeComponents/HomeCategory";
import HomeMoim from "./HomeComponents/HomeMoim";
import HomeSearch from "./HomeComponents/HomeSearch";

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
`;

export default Home;
