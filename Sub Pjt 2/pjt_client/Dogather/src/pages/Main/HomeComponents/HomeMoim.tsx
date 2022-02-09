import { Card, CardActionArea, CardMedia, Grid } from "@mui/material";
import styled from "styled-components";
import { fetchHomeMoimCard } from "../../../api/MoimDetail";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

interface Ilist {
  categoryName: string;
  categoryNo: number;
  deadline: string;
  groupLeader: number;
  groupNo: number;
  maxPeople: number;
  price: number;
  product: string;
  status: string;
  view: number;
}

interface iHomeCard {
  list: Array<Ilist>;
}

function HomeMoim() {
  const { data } = useQuery<iHomeCard>("Home", () => fetchHomeMoimCard());
  const makeComma = (price: number) =>
    price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <Container>
      <ProductList>
        <Grid
          container
          spacing={2}
          margin={0}
          display={"flex"}
          justifyContent={"center"}
        >
          {data?.list.slice(0, 4).map((d, idx) => (
            // <li key={idx}>{d.groupNo}</li>
            <Link key={idx} to={`/moim/${d.groupNo}`}>
              <Grid item sx={{ marginRight: 3 }}>
                <CardActionArea>
                  <Card
                    sx={{
                      minWidth: 200,
                      minHeight: 200,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "whitesmoke",
                      transition: "all .25s linear",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="100px"
                      width="100px"
                      image="img/CHANEL.png"
                      alt="Product Image"
                    />
                  </Card>
                </CardActionArea>
                <CardDetail>
                  <CategoryName>{d.categoryName}</CategoryName>
                  <ProductName>{d.product}</ProductName>
                  <Price>{makeComma(d.price)}원</Price>
                  <PriceDetail>공동구매가</PriceDetail>
                </CardDetail>
              </Grid>
            </Link>
          ))}
        </Grid>
      </ProductList>
    </Container>
  );
}

const PriceDetail = styled.p`
  font-size: 8px;
  color: grey;
`;

const ProductName = styled.p`
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Price = styled.p`
  font-size: 15px;
  font-weight: bold;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  padding-bottom: 3px;
`;

const CategoryName = styled.p`
  font-size: 10px;
  font-weight: bold;
  color: grey;
  padding-bottom: 5px;
`;

const CardDetail = styled.h1`
  justify-content: left;
  margin-top: 5px;
`;

const Container = styled.div`
  display: flex;
  /* height: 100vh; */
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-flow: wrap;
  row-gap: 20px;
`;

const ProductList = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const MoimList = styled.ul``;

export default HomeMoim;
