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
              backgroundColor: "whitesmoke",
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

const CategoryList = styled.div``;

const First = styled.div``;

const Second = styled.div``;

export default HomeCategory;
