import styled from "styled-components";
import HomeCategory from "./HomeComponents/HomeCategory";
import HomeMoim from "./HomeComponents/HomeMoim";
import HomeSearch from "./HomeComponents/HomeSearch";

function Home() {
  return (
    <Container>
      <HomeSearch />
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
  display: fe;
  width: 100%;
`;

export default Home;
