import styled from "styled-components";
import HomeCategory from "./HomeComponents/HomeCategory";
import HomeMoim from "./HomeComponents/HomeMoim";
import HomeSearch from "./HomeComponents/HomeSearch";

function Home() {
  return (
    <Container>
      <SearchBar>
        <HomeSearch />
      </SearchBar>
      <HomeCategory />
      <HomeMoim />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 100vh;
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
