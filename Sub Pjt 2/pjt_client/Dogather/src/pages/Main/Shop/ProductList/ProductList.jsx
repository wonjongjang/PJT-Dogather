import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card/Card";

const ProductList = ({ productList, sortDrop, productAmount, pageSwitch }) => {
  // if (!productAmount) return '';
  const productNum = productAmount / 20;
  // console.log(`productNum`, productNum);
  const makeBtn = (productNum) => {
    let arrNum = [];

    for (let i = 1; i <= productNum; i++) {
      arrNum.push(i);
    }
    let arrBtn;
    arrBtn = arrNum.map((count) => (
      <button onClick={pageSwitch}>{count}</button>
    ));
    return arrBtn;
  };
  return (
    <div>
      <Sort>
        <Count>
          <div>상품 {productAmount}개</div>
        </Count>
        <Filter>
          <select onChange={sortDrop}>
            {SORT_PRICE.map((sort) => (
              <option value={sort.value} key={sort.id}>
                {sort.sortName}
              </option>
            ))}
          </select>
        </Filter>
      </Sort>
      <Grid>
        {productList.map((productList, idx) => (
          <Card key={idx} productList={productList} />
        ))}
      </Grid>
      <Btn>{makeBtn(productNum)}</Btn>
    </div>
  );
};
const Sort = styled.div`
  ${(props) => props.theme.setFlex("space-between", "center")}
  width: 980px;
  height: 64px;
  background-color: #ffffff;
  span {
    font-weight: 700;
  }
`;
const Count = styled.div`
  display: flex;
`;
const Filter = styled.div`
  display: flex;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 12px;
  column-gap: 12px;
`;
const Btn = styled.div`
  button {
    /* margin-right: 3px; */
    border: none;
    border-right: 1.5px solid ${(props) => props.theme.subFontColor};
    padding: 0, 12px;
    background-color: transparent;
    color: ${(props) => props.theme.fontColor};
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    &:last-child {
      padding-right: 0;
      border-right: none;
    }
  }
`;

const SORT_PRICE = [
  { id: 1, value: "sort=buying-price-ascending", sortName: "즉시 구매가순" },
  { id: 2, value: "sort=selling-price-descending", sortName: "즉시 판매가순" },
  {
    id: 3,
    value: "sort=original-price-descending",
    sortName: "발매가 내림차순",
  },
  {
    id: 4,
    value: "sort=original-price-ascending",
    sortName: "발매가 오름차순",
  },
];

export default ProductList;
