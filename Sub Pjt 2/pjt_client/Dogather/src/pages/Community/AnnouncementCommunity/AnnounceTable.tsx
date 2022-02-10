import { Table } from "@mui/material";
import styled from "styled-components";

function AnnounceTable() {
  return (
    <Container>
      <Table></Table>
      {/* 테이블에 대한 작업하고 */}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  /* justify-content: center; */
`;

export default AnnounceTable;
