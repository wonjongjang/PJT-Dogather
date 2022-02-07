import styled from "styled-components";
import { fetchHomeMoimCard } from "../../api/MoimDetail";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

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
  const { isLoading, data } = useQuery<iHomeCard>("Home", () =>
    fetchHomeMoimCard()
  );

  // useEffect(() => {
  //   (async () => {
  //     const groupList = await (
  //       await fetch(`http://i6e104.p.ssafy.io:8090/group/list`)
  //     ).json();
  //     console.log(groupList);
  //   })();
  // }, []);
  console.log(data?.list[0].groupNo);

  // console.log(data[0].groupNo);
  // console.log(data?.map((d) => console.log(d)));
  return (
    <div>
      <Container>
        <H1>Home</H1>
        <ul>
          {data?.list.map((d, idx) => (
            <li key={idx}>{d.groupNo}</li>
          ))}
        </ul>
      </Container>
    </div>
  );
}

const H1 = styled.h1`
  font-size: 100px;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  padding: 0px 20px;
  margin: 0 auto;
  padding-bottom: 100px;
`;

export default Home;
