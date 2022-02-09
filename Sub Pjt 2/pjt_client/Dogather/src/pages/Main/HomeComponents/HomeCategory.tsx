import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Hidden,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const categoryImg = [
  "img/category/남성패션.png",
  "img/category/여성패션.png",
  "img/category/뷰티미용.png",
  "img/category/식품.png",
  "img/category/건강의료용품.png",
  "img/category/생활가전.png",
  "img/category/디지털기기.png",
  "img/category/가구.png",
  "img/category/생활용품.png",
  "img/category/도서티켓쿠폰.png",
  "img/category/출산유아동.png",
  "img/category/반려동물용품.png",
  "img/category/스포츠레저.png",
  "img/category/자동차공구.png",
  "img/category/악기.png",
  "img/category/게임놀이.png",
];

const categoryName = [
  "남성패션",
  "여성패션",
  "뷰티/미용",
  "식품",
  "건강/의료용품",
  "생활가전",
  "디지털기기",
  "가구/인테리어",
  "생활용품",
  "도서/티켓/E쿠폰",
  "출산/유아동",
  "반려동물용품",
  "스포츠/레저",
  "자동차/공구",
  "악기",
  "게임/놀이",
];

const category = [];

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
                    // width: "100%",
                    height: "60px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    ":hover": {
                      // boxShadow: 20, // theme.shadows[20]
                      transform: "scale3d(1.1, 1.1, 1)",
                    },
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
                  <CategoryName>카테고리이름</CategoryName>
                </CardDetail>
              </Grid>
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
              <Card
                key={idx}
                elevation={0}
                sx={{
                  // width: "100%",
                  height: "60px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "white",
                  ":hover": {
                    // boxShadow: 20, // theme.shadows[20]
                    transform: "scale3d(1.1, 1.1, 1)",
                  },
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
                <CategoryName>카테고리이름</CategoryName>
              </CardDetail>
            </Link>
          ))}
        </Grid>
      </CategoryList>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 50%;
  justify-content : center
  align-items: center;
`;

const CategoryList = styled.div`
  display: block;
  width: 100%;
`;

const CategoryName = styled.p`
  font-size: 10px;
  font-weight: bold;
  color: grey;
  padding-bottom: 5px;
`;

const CardDetail = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5px;
`;

export default HomeCategory;
