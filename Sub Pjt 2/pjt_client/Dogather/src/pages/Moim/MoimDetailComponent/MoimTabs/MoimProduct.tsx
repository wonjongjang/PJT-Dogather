import styled from "styled-components";

interface IData {}

function MoimProduct({ detail }: any) {
  return (
    <Container>
      <ImgWrapper>
        <Img
          src="https://image.musinsa.com/images/prd_img/2021031512340000000090657.jpg"
          alt=""
        />
      </ImgWrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  background-color: white;
`;

const ImgWrapper = styled.div`
  /* background-color: whitesmoke; */
`;

const Img = styled.img``;

export default MoimProduct;
