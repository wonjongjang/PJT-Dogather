import { Link } from "react-router-dom";
import KakaoPay, { IKakaoContent } from "../KakaoPay";

function MoimPayment({ groupNo, products, price }: IKakaoContent) {
  return (
    <div>
      <button>
        <KakaoPay groupNo={groupNo!} products={products} price={price} />
        카카오페이
      </button>
    </div>
  );
}

export default MoimPayment;
