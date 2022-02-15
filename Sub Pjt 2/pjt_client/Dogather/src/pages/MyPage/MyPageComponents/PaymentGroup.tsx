import styled from "styled-components";
import { IGroup } from "../MyPage";

function PaymentGroup(group: IGroup) {
  const totalPriceCal = () => {
    let tot = group.price;
    group.resultPaymentDtos.map(
      (option) => (tot += option.amountOfPrice * option.amount)
    );
    // console.log(tot);
    return tot;
  };

  const totalPrice = totalPriceCal();

  return (
    <Container>
      <LeftSide>
        <ImgDiv>
          <ImgRadius>
            <Img src="https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/e125b578-4173-401a-ab13-f066979c8848/air-force-1-older-shoes-11jxCZ.png" />
          </ImgRadius>
        </ImgDiv>
        <ProductDiv>
          <ProductTitle>{group.product}</ProductTitle>

          <Option>
            {group.count} / {group.maxPeople}
          </Option>
          <ProductInfo>{group.deadline}</ProductInfo>
        </ProductDiv>
      </LeftSide>
      <MidSide>
        {group.resultPaymentDtos.map((option) => (
          <Option key={option.optionName}>
            {option.optionName} : {option.amount}
          </Option>
        ))}
      </MidSide>
      <RightSide>
        <PriceDiv>
          <Price>{totalPrice}</Price>
        </PriceDiv>
      </RightSide>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  /* align-items: center; */
  padding: 12px;
  border-bottom: 1px solid #ebebeb;
`;

const LeftSide = styled.div`
  display: flex;
`;

const ImgDiv = styled.div`
  position: relative;
  /* -webkit-box-flex: 0; */
  flex: none;
  width: 80px;
  height: 80px;
`;

const ImgRadius = styled.div`
  background-color: rgb(242, 242, 242);
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  padding-top: 100%;
`;

const Img = styled.img`
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  height: auto;
  transform: translate(-50%, -50%);
`;

const ProductDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  margin-left: 16px;
`;

const ProductTitle = styled.p`
  font-size: 14px;
  line-height: 17px;
`;

const ProductInfo = styled.p`
  color: rgba(34, 34, 34, 0.5);
  font-size: 14px;
  font-weight: 700;
  line-height: 19px;
  letter-spacing: -0.5px;
  margin-top: 4px;
`;

const RightSide = styled.div`
  display: flex;
  align-items: center;
  text-align: right;
  margin-left: auto;
`;

const PriceDiv = styled.div`
  margin-left: 10px;
  width: 134px;
`;

const Price = styled.div`
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.21px;
`;

const MidSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: auto;
`;

const Option = styled.p`
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0.5px;
  margin-top: 4px;
`;

export default PaymentGroup;
