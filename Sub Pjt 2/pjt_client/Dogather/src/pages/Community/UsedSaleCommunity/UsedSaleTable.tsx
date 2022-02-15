import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import UsedSaleCard from "./UsedSaleCard";

// neutral 색깔
const theme = createTheme({
  palette: {
    neutral: {
      main: "#1E272E",
      // #2d2c2e
      contrastText: "#fff",
    },
  },
});

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
  }

  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

//메인
function UsedSaleTable() {
  return (
    <Container>
      <Top>
        <div></div>
      </Top>
      <Mid>
        <CustomStack>
          <H1>중고판매게시판</H1>
          <Stack spacing={2} direction="column">
            <ThemeProvider theme={theme}>
              <Button
                variant="outlined"
                color="neutral"
                sx={{ height: 40, minWidth: 95 }}
              >
                <Link to={"/community/announcement"}>공지사항</Link>
              </Button>
              <Button
                variant="outlined"
                color="neutral"
                sx={{ height: 40, minWidth: 95 }}
              >
                <Link to={"/community/infoshare"}>정보공유게시판</Link>
              </Button>
              <Button
                variant="outlined"
                color="neutral"
                sx={{ height: 40, minWidth: 95 }}
              >
                <Link to={"/community/review"}>후기게시판</Link>
              </Button>
              <Button
                variant="contained"
                color="neutral"
                sx={{ height: 40, minWidth: 95 }}
              >
                <Link to={"/community/usedsale"}>
                  <Fontw>중고판매게시판</Fontw>
                </Link>
              </Button>
              <Button
                variant="outlined"
                color="neutral"
                sx={{ height: 40, minWidth: 95 }}
              >
                <Link to={"/community/free"}>자유게시판</Link>
              </Button>
            </ThemeProvider>
          </Stack>
        </CustomStack>
        <div>
          <CustomCard>
            <UsedSaleCard />
            <UsedSaleCard />
            <UsedSaleCard />
            <UsedSaleCard />
          </CustomCard>
          <div></div>
          <CustomCard>
            <UsedSaleCard />
            <UsedSaleCard />
            <UsedSaleCard />
            <UsedSaleCard />
          </CustomCard>
        </div>
      </Mid>
      <Bottom>
        <Input type="text" />
        <Btn>
          <img src={process.env.PUBLIC_URL + "/img/search.png"} />
        </Btn>
        <CustomWrite>
          <ThemeProvider theme={theme}>
            <Button variant="contained" color="neutral">
              글쓰기
            </Button>
          </ThemeProvider>
        </CustomWrite>
        <CustomPage>
          <Pagination count={5} variant="text" shape="rounded" />
        </CustomPage>
      </Bottom>
    </Container>
  );
}

const Btn2 = styled.button`
  width: 8vw;
  color: white;
  background-color: white;
  border: 0;
`;

const Container = styled.div``;

const Mid = styled.span`
  display: flex;
`;

const Mid2 = styled.span`
  display: flex;
  justify-content: space-between;
`;

const H1 = styled.h1`
  display: inline-block;
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 1vw;
`;

const CustomTabs = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 7vw;
`;

const CustomStack = styled.div`
  display: inline-block;
  margin-left: 4vw;
  width: 9vw;
`;

const CustomTable = styled.div`
  dispaly: inline-block;
  width: 75vw;
  margin-left: 4vw;
`;

const Hr = styled.hr`
  display: flex;
  width: 79vw;
  height: 3px;
  border: none;
  background-color: black;
  margin-left: 14vw;
  margin-bottom: 50px;
`;

const Top = styled.div`
  margin-top: 50px;
`;

const Input = styled.input`
  width: 20vw;
  height: 4vh;
  border-radius: 7px;
  margin-left: 43vw;
`;

const CustomWrite = styled.div`
  display: inline-flex;
  margin-left: 22vw;
`;

const CustomPage = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25px;
  margin-left: 6.3vw;
`;

const Bottom = styled.div`
  margin-top: 2.5vw;
  margin-bottom: 2.5vw;
`;

const H3 = styled.h3`
  display: inline;
  font-size: 15px;
`;

const Imo = styled.span`
  margin-left: 4px;
  margin-right: 4px;
`;

const Btn = styled.button`
  border: 0;
  outline: 0;
  background-color: white;
  cursor: pointer;
`;

const CustomCard = styled.div`
  display: flex;
`;

const Fontw = styled.h1`
  font-weight: 900;
`;

export default UsedSaleTable;
