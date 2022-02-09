import styled from "styled-components";

function Footer() {
  return (
    <FooterBody>
      <FooterP>Dogather Project</FooterP>
    </FooterBody>
  );
}
const FooterP = styled.p`
  font-size: 18px;
`;

const FooterBody = styled.div`
  text-align: center;
  border : red dashed 1px;
  height : 100px;
  width : 100%;
  position : absolute;
  bottom : 0;
`;

export default Footer;
