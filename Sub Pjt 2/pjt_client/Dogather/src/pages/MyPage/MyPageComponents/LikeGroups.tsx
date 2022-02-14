import styled from "styled-components";
import { IGroup } from "../MyPage";

function LikeGroups(likeGroup: IGroup) {
  return (
    <Container>
      <LeftSide>
        <ImgDiv>
          <ImgRadius>
            <Img src="https://www.bigjungbo.com/files/attach/images/163/017/178/010/f1f78c3b5eaeb68788a9c98dc796b4c7.jpeg" />
          </ImgRadius>
        </ImgDiv>
        <ProductInfo>
          <ProductTitle>{likeGroup.product}</ProductTitle>
          <ProductDeadline>{likeGroup.deadline}</ProductDeadline>
        </ProductInfo>
      </LeftSide>
      <RightSide>
        <StatusDiv>
          {likeGroup.status === "마감" ? (
            <StatusOff>{likeGroup.status}</StatusOff>
          ) : (
            <StatusOn>{likeGroup.status}</StatusOn>
          )}
        </StatusDiv>
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
  /* position: relative; */
  /* -webkit-box-flex: 0; */
  /* flex: none; */
  width: 80px;
  height: 80px;
`;

const ImgRadius = styled.div`
  background-color: rgb(242, 242, 242);
  border-radius: 12px;
  /* overflow: hidden; */
  /* position: relative; */
  /* padding-top: 100%; */
`;

const Img = styled.img`
  width: 100%;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  margin-left: 16px;
`;

const ProductTitle = styled.p`
  font-size: 14px;
  line-height: 17px;
`;

const ProductDeadline = styled.p`
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

const StatusDiv = styled.div`
  margin-left: 10px;
  width: 134px;
`;

const StatusOn = styled.div`
  color: #05c46b;
  font-size: 14px;
  letter-spacing: -0.21px;
`;

const StatusOff = styled.div`
  color: #c23616;
  font-size: 14px;
  letter-spacing: -0.21px;
`;

export default LikeGroups;
