import { Table } from "@mui/material";
import styled from "styled-components";
import AnnounceTable from "./AnnounceTable";

function AnnouncementCommunity() {
  return (
    <Container>
      <AnnounceTable />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  /* justify-content: center; */
`;

export default AnnouncementCommunity;
