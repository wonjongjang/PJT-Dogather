import * as React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import { fetchHomeMoimCard } from "../../api/MoimDetail";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { useQuery } from "react-query";
import { maxWidth } from "@mui/system";

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

function Home() {
  const { data } = useQuery<iHomeCard>("Home", () => fetchHomeMoimCard());

  // useEffect(() => {
  //   (async () => {
  //     const groupList = await (
  //       await fetch(`http://i6e104.p.ssafy.io:8090/group/list`)
  //     ).json();
  //     console.log(groupList);
  //   })();
  // }, []);
  console.log(data?.list[0].groupNo);

  const [selectedId, setSelectedId] = useState(null);

  // console.log(data[0].groupNo);
  // console.log(data?.map((d) => console.log(d)));
  return (
    <div>
      <Container>
        <Search>
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            label="검색"
          ></TextField>
        </Search>
        <Grid container spacing={2} margin={2}>
          {data?.list.map((d, idx) => (
            // <li key={idx}>{d.groupNo}</li>
            <Grid item sx={{ maxWidth: 300, minHeight: 500 }}>
              <Card key={idx} sx={{ minWidth: 300, minHeight: 500 }}>
                <CardMedia
                  component="img"
                  height="100%"
                  image="http://img.danawa.com/prod_img/500000/907/780/img/6780907_1.jpg?shrink=330:330&_v=20210405094355"
                  alt="Product Image"
                />
                <CardContent>
                  <Typography
                    display="flex"
                    justifyContent="center"
                    // whiteSpace="nowrap"
                    flexWrap="wrap"
                    // textOverflow="ellipsis"
                    // overflow="hidden"
                    gutterBottom
                    fontSize="15px"
                    // variant="h6"
                    component="div"
                  >
                    {d.product}
                  </Typography>
                  <Typography
                    display="flex"
                    justifyContent="right"
                    variant="body2"
                    color="text.secondary"
                  >
                    {d.price}원
                  </Typography>
                  <Typography
                    display="flex"
                    justifyContent="right"
                    variant="body2"
                    color="text.secondary"
                  >
                    {d.maxPeople}명
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

const Search = styled.h1`
  width: 40%;
  display: flex;
  justify-content: center;
  padding-top: 50px;
`;

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  align-items: center;
  flex-direction: column;
  row-gap: 20px;
`;

const CategoryList = styled.ul``;

const MoimList = styled.ul``;

export default Home;
