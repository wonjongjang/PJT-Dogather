import { React, useMemo } from "react";
import { useTable } from "react-table";
import styled from "styled-components";
import { Link } from "react-router-dom";

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

const StyledTable = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: flex-end;
  table {
    width: 80vw;
    border: 1px solid black;
    text-align: left;

    th {
      background: gray;
    }
  }
`;

function Table({ columns, data, communityTitle, address }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    getRowProps,
  } = useTable({ columns, data });
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

function NoticeCommunity() {
  const columns = useMemo(
    () => [
      {
        accessor: "order",
        Header: "#",
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
      {
        order: 2,
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
      <StyledTable>
        <Table
          columns={columns}
          data={data}
          communityTitle="공지사항게시판"
          address="/noticecommunity"
          getRowProps={(row) => ({
            onClick: () => alert("Column!"),
          })}
        />
      </StyledTable>
    </div>
  );
}
export default NoticeCommunity;
