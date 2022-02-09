import { Card, CardMedia, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Category from "../../../Category";

const categoryImg = [
  "img/남성패션.png",
  "img/여성패션.png",
  "img/뷰티미용.png",
  "img/식품.png",
  "img/건강의료용품.png",
  "img/생활가전.png",
  "img/디지털기기.png",
  "img/가구.png",
  "img/생활용품.png",
  "img/도서티켓쿠폰.png",
  "img/출산유아동.png",
  "img/반려동물용품.png",
  "img/스포츠레저.png",
  "img/자동차공구.png",
  "img/악기.png",
  "img/게임놀이.png",
];

function HomeCategory() {
  return (
    <Container>
      <CategoryList>
        <Grid
          container
          spacing={2}
          width={"100%"}
          display={"flex"}
          justifyContent={"space-between"}
          marginBottom={"10Px"}
          marginTop={"0px"}
          marginLeft={"0px"}
        >
          {categoryImg.slice(0, 8).map((cat, idx) => (
            <Link to={"/moim/1"}>
              <Grid item>
                <Card
                  key={idx}
                  elevation={0}
                  sx={{
                    width: "60px",
                    height: "60px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    ":hover": {
                      // boxShadow: 20, // theme.shadows[20]
                      transform: "scale3d(1.1, 1.1, 1)",
                    },
                    margin: "0px",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="100%"
                    width="100%"
                    image={cat}
                    alt="Product Image"
                  />
                </Card>
              </Grid>
              <CardDetail>
                <CategoryName>{Category(idx + 1)}</CategoryName>
              </CardDetail>
            </Link>
          ))}
        </Grid>
        <Grid
          container
          spacing={2}
          width={"100%"}
          display={"flex"}
          justifyContent={"space-between"}
          marginTop={"0px"}
          marginLeft={"0px"}
        >
          {categoryImg.slice(8, 17).map((cat, idx) => (
            <Link to={"/moim/1"}>
              <Grid item>
                <Card
                  key={idx}
                  elevation={0}
                  sx={{
                    width: "60px",
                    height: "60px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    ":hover": {
                      // boxShadow: 20, // theme.shadows[20]
                      transform: "scale3d(1.1, 1.1, 1)",
                    },
                    // objectFit: "cover",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="100%"
                    width="100%"
                    image={cat}
                    alt="Product Image"
                  />
                </Card>
                <CardDetail>
                  <CategoryName>{Category(idx + 9)}</CategoryName>
                </CardDetail>
              </Grid>
            </Link>
          ))}
        </Grid>
      </CategoryList>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 65%;
  justify-content : center
  align-items: center;
`;

const CategoryList = styled.div`
  display: block;
  width: 100%;
`;

const CategoryName = styled.p`
  font-size: 11px;
  font-weight: bold;
  color: grey;
  padding-bottom: 5px;
`;

const CardDetail = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 60px;
  margin-top: 5px;
`;

export default HomeCategory;
