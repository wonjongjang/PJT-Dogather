import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

import Category from "./Category/Category";
import ShopHeader from "./ShopHeader/ShopHeader";
import SideFilterList from "./SideFilterList/SideFilterList";
import ProductList from "./ProductList/ProductList";
import { PRODUCTS_API, PRODUCTS_CATEGORY_API, BEST_AUTHOR } from "../../config";

const Shop = () => {
  const [productAmount, setProductAmount] = useState("");
  const [productList, setProductList] = useState([]);
  const [filterList, setFilterList] = useState([]);
  const [queryState, setQueryState] = useState([]);
  const [bestAuthor, setBestAuthor] = useState([]);
  const [sortList, setSortList] = useState("");
  const [pagination, setPagination] = useState("0");
  const history = useHistory();

  const resetPage = () => {
    setPagination("0");
  };

  // console.log(`productAmount`, productAmount);
  console.log(`queryState`, queryState);
  useEffect(() => {
    const addQuery = queryState.map((state) => makeQuery(state)).join("");
    // console.log(`pagination`, pagination);

    fetch(
      `${PRODUCTS_API}?${addQuery}&${sortList}&offset=${pagination}&limit=20`
    )
      // fetch(`${PRODUCTS_API}?author=1`)
      .then((res) => res.json())
      .then((data) => {
        setProductAmount(data.product_count);
        setProductList(data.results);
      });
  }, [queryState, sortList, pagination]);
  //?limit=20&offset=0
  useEffect(() => {
    fetch(`${BEST_AUTHOR}`)
      .then((res) => res.json())
      .then((data) => {
        setBestAuthor(data.results);
      });
    getFilterList();
  }, []);

  const sortDrop = (e) => {
    setSortList(e.target.value);
  };

  const pageSwitch = (e) => {
    setPagination((e.target.innerHTML - 1) * 20);
    // history.push(`?offset=${pagination}&limit=20`);
    // history.push(`&offset=${pagination}&limit=20`);
  };
  useEffect(() => {
    history.push(`?offset=${pagination}&limit=20`);
  }, [pagination]);
  //  const redirect = () => {
  //   history.push(`/detail/${product_id}`);
  // };

  const getFilterList = (id, categoryName) => {
    // fetch('/data/filter.json')
    fetch(`${PRODUCTS_CATEGORY_API}`)
      .then((res) => res.json())
      .then((data) => {
        setFilterList(data.results);
        setQueryState(
          data.results.map(({ category_name }) => ({
            category_name,
            id: [],
          }))
        );
      });
  };

  const makeQuery = (agu) => {
    if (queryState !== undefined) {
      return agu.id.reduce((accumulator, currentValue) => {
        if (!accumulator && currentValue) {
          return accumulator + agu.category_name + "=" + currentValue;
        }
        if (accumulator) {
          return (
            accumulator + "&" + agu.category_name + "=" + currentValue + "&"
          );
        }
        return accumulator;
      }, "");
    }
  };

  const prevId = (categoryName) => {
    const preId = queryState.filter(
      (filterState) => filterState.category_name === categoryName
    )[0].id;
    return preId;
  };

  const getCategory = (queryId, categoryName) => {
    setQueryState(
      queryState.map((state) =>
        state.category_name === categoryName
          ? { ...state, id: [...prevId(categoryName), queryId] }
          : state
      )
    );
  };

  const removeSelected = (queryId, categoryName) => {
    const selectCategory = queryState.filter(
      (filteringQueryState) =>
        filteringQueryState.category_name === categoryName
    );
    const removeChoosen = selectCategory[0].id.splice(
      selectCategory[0].id.indexOf(queryId),
      1
    );
    setQueryState(
      queryState.map((state) =>
        state.id === queryId
          ? { ...state, selected: [...removeChoosen] }
          : state
      )
    );
  };

  // 1. true/false 로 눌렸는지 안눌렸는지 알 수 있는가?
  // 2. true/false를 눌렸는지 확인하고 그것을 id, classname으로 분류할 수 있는가
  // 3. 해당 id,를 해당 query에 넣었다 뺄다를 할 수 있는가?
  // 4. 배열로 관리하는 id 값을 쿼리에 알맞게 넣기 => 함수로 map  관리(if문)
  // 5. url에 직접 함수를 넣어놓고 작동하면 쿼리문 아니면 빈걸로

  return (
    <Container>
      <ShopHeaderFix>
        <ShopHeader />
        <Category bestAuthor={bestAuthor} />
      </ShopHeaderFix>
      <ProductBox>
        <SideFilterList
          filterList={filterList}
          getCategory={getCategory}
          removeSelected={removeSelected}
          resetPage={resetPage}
        />
        <ProductList
          productList={productList}
          sortDrop={sortDrop}
          pageSwitch={pageSwitch}
          productAmount={productAmount}
        />
      </ProductBox>
    </Container>
  );
};

const Container = styled.div`
  ${(props) => props.theme.setFlex("normal", "center")};
  flex-direction: column;
  margin-top: 98px;
  width: 100vw;
  height: 100%;
`;

const ShopHeaderFix = styled.div`
  position: fixed;
  background-color: #ffffff;
  z-index: 9999;
`;

const ProductBox = styled.div`
  ${(props) => props.theme.setFlex("space-between", "normal")}
  width: 1200px;
  margin-top: 103px;
`;

export default Shop;
