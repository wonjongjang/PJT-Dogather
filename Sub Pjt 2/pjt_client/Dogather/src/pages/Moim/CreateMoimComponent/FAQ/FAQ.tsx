/* FAQ 리스트 렌더링 */

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
    <li>
      <span>{faqQuestion} </span>
      <span>{faqAnswer} </span>
      <button onClick={onClick}>삭제</button>
    </li>
  );
}

export default FAQ;
