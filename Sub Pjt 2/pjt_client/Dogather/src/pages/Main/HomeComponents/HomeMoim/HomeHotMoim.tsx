import { Card, CardActionArea, CardMedia, Grid } from "@mui/material";
import styled, { keyframes } from "styled-components";
import {
  FetchHomeHotMoimCard,
  FetchHomeNewMoimCard,
} from "../../../../api/MoimDetail";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { iHomeCard } from "../../Home";

function HomeHotMoim() {
  const { data: hotData } = useQuery<iHomeCard>("hot", () =>
    FetchHomeHotMoimCard()
  );
  // console.log(hotData);

  const makeComma = (price: number) =>
    price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <Container>
      <Title>
        <CardDetail>
          <TextENG>Hot Moim</TextENG>
          <TextKOR>인기 모임</TextKOR>
        </CardDetail>
      </Title>

      <ProductList>
        <Grid container margin={0} display={"flex"} justifyContent={"center"}>
          {hotData?.list.slice(0, 4).map((d, idx) => (
            // <li key={idx}>{d.groupNo}</li>
            <Grid item key={idx} sx={{ marginLeft: 2, marginRight: 2 }}>
              <Alarm>
                <Box>마감임박</Box>
              </Alarm>
              <CardActionArea>
                <Link to={`/moim/${d.groupNo}`}>
                  <Card
                    sx={{
                      minWidth: 200,
                      minHeight: 200,
                      maxWidth: 200,
                      maxHeight: 200,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "whitesmoke",
                      transition: "all .25s linear",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="auto"
                      width="100px"
                      image="img/Hoodie.png"
                      alt="Product Image"
                    />
                  </Card>
                </Link>
              </CardActionArea>
              <CardDetail>
                <CategoryName>{d.categoryName}</CategoryName>
                <ProductName>{d.product}</ProductName>
                <Price>{makeComma(d.price)}원</Price>
                <PriceDetail>공동구매가</PriceDetail>
                {/* <MaxPeople>80/{d.maxPeople}명</MaxPeople>
                <DeadLine>마감 {d.deadline}일 전</DeadLine> */}
              </CardDetail>
            </Grid>
          ))}
        </Grid>
      </ProductList>
    </Container>
  );
}

const CardImg = styled(CardMedia)``;

const animation = keyframes`
0% {
  opacity: 1;
}
10% {
  opacity: 0.9;
}
20% {
  opacity: 0.8;
}
30% {
  opacity: 0.7;
}
40% {
  opacity: 0.6;
}
50% {
  opacity: 0.5;
}
60% {
  opacity: 0.4;
}
70% {
  opacity: 0.3;
}
80% {
  opacity: 0.2;
}
90% {
  opacity: 0.1;
}
100% {
  opacity: 0;
}
`;

const Box = styled.div`
  height: 20px;
  width: 50px;
  background-color: tomato;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  animation: ${animation} 2s infinite;
  margin-bottom: 5px;
`;

const Alarm = styled.span`
  display: flex;
  justify-content: left;
  font-size: 10px;
  font-weight: bold;
  color: white;
`;

const TextKOR = styled.h1`
  font-size: 16px;
  font-weight: bold;
  color: grey;
  text-align: center;
  margin-top: 3px;
`;

const TextENG = styled.h1`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  width: 60%;
  margin-top: 20px;
`;

const MaxPeople = styled.p``;

const DeadLine = styled.p``;

const PriceDetail = styled.p`
  font-size: 8px;
  color: grey;
`;

const ProductName = styled.p`
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 10px;
  width:200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

const CardDetail = styled.div`
  width: 100%;
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
  margin-bottom: 50px;
`;

const ProductList = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export default HomeHotMoim;
