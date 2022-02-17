import { useLocation } from "react-router-dom";
import { IFAQData } from "../../MoimDetail";

interface RouteState {
  state: {
    faqs: IFAQData;
  };
}

function MoimFAQ() {
  const { state } = useLocation();
  console.log(state);
  return <div>하이</div>;
}

export default MoimFAQ;
