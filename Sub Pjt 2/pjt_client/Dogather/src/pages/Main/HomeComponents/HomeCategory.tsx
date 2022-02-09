import { Card, CardMedia } from "@mui/material";
import styled from "styled-components";

function HomeCategory() {
  return (
    <Container>
      <CategoryList>
        <First>
          <Card
            sx={{
              width: 100,
              height: 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "white",
              marginBottom: 1,
            }}
          >
            <CardMedia
              component="img"
              height="50px"
              width="50px"
              image="img/CHANEL.png"
              alt="Product Image"
            />
          </Card>
        </First>
        <Second>
          <Card></Card>
        </Second>
      </CategoryList>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
`;

const CategoryList = styled.div`
  display: block;
  justify-content: center;
`;

const First = styled.div`
  display: flex;
`;

const Second = styled.div`
  display: flex;
`;

export default HomeCategory;
