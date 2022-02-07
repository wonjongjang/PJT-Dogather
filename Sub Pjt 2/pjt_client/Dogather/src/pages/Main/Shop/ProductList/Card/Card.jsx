import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router";
const Card = ({ productList }) => {
  const {
    product_name,
    image,
    author_name,
    product_id,
    product_price,
    sort_name,
  } = productList;
  const history = useHistory();
  const redirect = () => {
    history.push(`/detail/${product_id}`);
  };

  const [isClicked, setIsClicked] = useState(false);
  const mutatePrice = Math.floor(product_price).toLocaleString();

  return (
    <CardContainer>
      <Image onClick={redirect} productImage={image} />
      <InfoBox>
        <BookMark>
          <p>{product_name}</p>
          <span onClick={() => setIsClicked(!isClicked)}>
            <BookMarkLogo
              className="far fa-bookmark"
              clicked={!isClicked}
            ></BookMarkLogo>
            <BookMarkLogo
              className="fas fa-bookmark"
              clicked={isClicked}
            ></BookMarkLogo>
          </span>
        </BookMark>
        <Designer>{author_name}</Designer>
        <PosterPrice>
          {mutatePrice}원<div>{sort_name}</div>
        </PosterPrice>
      </InfoBox>
    </CardContainer>
  );
};
const BookMarkLogo = styled.i`
  display: ${(props) => (props.clicked ? "block" : "none")};
`;
const CardContainer = styled.div`
  ${(props) => props.theme.setFlex("normal", "center")}
  flex-direction: column;
  width: 236px;
  height: 357px;
  padding: 0 6px;
  margin-bottom: 40px;
  background-color: #ffffff;
  cursor: pointer;
`;
const Image = styled.img.attrs((props) => ({
  src: props.productImage,
  alt: "poster",
}))`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;
const InfoBox = styled.div`
  width: 100%;
  padding-top: 12px;
`;
const BookMark = styled.div`
  ${(props) => props.theme.setFlex("space-between", "center")}
  height: 20px;
  p {
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
const Designer = styled.div`
  height: 36px;
  padding-top: 10px;
  font-size: 14px;
`;
const PosterPrice = styled.div`
  font-size: 15px;
  font-weight: 700;
  div {
    margin-top: 3px;
    margin-left: 1px;
    font-size: 11px;
    font-weight: 400;
  }
`;
export default Card;
