import { React, useMemo } from "react";
import { useTable } from "react-table";
import styled from "styled-components";
import { Link } from "react-router-dom";

const TableStyle = styled.div`
  display: flex;
  justify-content: space-evenly;

  table {
    border: 1px solid black;
    border-spacing: 0px;
    margin-bottom: 100px;
    width: 400px;
    height: 200px;

    thead {
      display: flex;
      background: gray;
    }

    tbody {
      display: flex;
      border-bottom: 1px solid black;
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
    }
  }
`;

const Btn = styled.a`
  margin: 10px;
  font-size: 20px;
  display: flex;
  justify-content: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

function Table({ columns, data, communityTitle, address }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  return (
    <div>
      <Btn>
        <StyledLink to={address}>
          <p>{communityTitle}</p>
        </StyledLink>
      </Btn>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function PhotoTable() {
  return (
    <div>
      <Btn>
        <StyledLink to="/A">후기게시판</StyledLink>
      </Btn>
    </div>
  );
}

function Community() {
  const columns = useMemo(
    () => [
      {
        accessor: "order",
        Header: "순서",
      },
      {
        accessor: "title",
        Header: "제목",
      },
      {
        accessor: "writer",
        Header: "작성자",
      },
      {
        accessor: "view",
        Header: "조회수",
      },
      {
        accessor: "created",
        Header: "생성일",
      },
    ],
    []
  );
  //임시데이터
  const data = useMemo(
    () => [
      {
        order: 1,
        title: "AASDASDASDASDASDASASD",
        writer: "B",
        view: 100,
        created: "1/31",
      },
    ],
    []
  );
  return (
    <div>
      <TableStyle>
        <Table
          columns={columns}
          data={data}
          communityTitle="공지사항게시판"
          address="A"
        />
        <Table
          columns={columns}
          data={data}
          communityTitle="정보공유게시판"
          address="A"
        />
      </TableStyle>
      <TableStyle>
        <Table
          columns={columns}
          data={data}
          communityTitle="중고거래게시판"
          address="A"
        />
        <Table
          columns={columns}
          data={data}
          communityTitle="자유게시판"
          address="A"
        />
      </TableStyle>
      <PhotoTable />
    </div>
  );
}
export default Community;
