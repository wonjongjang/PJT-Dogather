import { TextField } from "@mui/material";
import styled from "styled-components";

function HomeSearch() {
  return (
    <Search>
      <TextField
        id="outlined-basic"
        variant="outlined"
        fullWidth
        label="검색"
      ></TextField>
    </Search>
  );
}

const Search = styled.h1`
  width: 40%;
  display: flex;
  justify-content: center;
  padding-top: 50px;
`;

export default HomeSearch;
