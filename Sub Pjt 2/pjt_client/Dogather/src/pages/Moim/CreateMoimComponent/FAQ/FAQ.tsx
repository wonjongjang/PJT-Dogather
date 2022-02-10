/* FAQ 리스트 렌더링 */

import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { FAQsAtom, IFAQ } from "../../../../atoms/FAQs";

function FAQ({ id, faqQuestion, faqAnswer }: IFAQ) {
  const [FAQs, setFAQs] = useRecoilState(FAQsAtom);
  // console.log(id, option_name, option_price);

  const onClick = () => {
    // console.log(options);
    setFAQs((prev) => {
      const targetIndex = prev.findIndex((FAQ) => FAQ.id === id);
      // console.log(targetIndex);
      return [...prev.slice(0, targetIndex), ...prev.slice(targetIndex + 1)];
    });
  };

  return (
    <List>
      <Element>{faqQuestion} </Element>
      <Element>{faqAnswer} </Element>
      <Element>
        <Button onClick={onClick}>삭제</Button>
      </Element>
    </List>
  );
}

const List = styled.div`
  display: flex;
  align-items: center;
  min-height: 30px;
  border: 1px solid whitesmoke;
`;

const Element = styled.div`
  width: 100%;
  word-break: break-all;
  font-size: 14px;
  text-align: center;
`;

const Button = styled.button`
  border-radius: 5px;
  border: none;
  background-color: #c23616;
  color: white;
  font-weight: bold;
  cursor: pointer;
`;

export default FAQ;
