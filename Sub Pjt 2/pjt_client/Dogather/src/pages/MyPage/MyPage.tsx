import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import { fetchMyPage } from "../../api/MyPage";
import { userIdAtom } from "../../atoms/Login";

function MyPage() {
  const setUserId = useSetRecoilState(userIdAtom);

  // const { isLoading: tickersLoading, data: tickersData } = useQuery(
  //   ["tickers", coinId], // 위와 동일한 key이기 때문에 [] 첫번째에 고유값 넣어줌
  //   () => fetchMyPage(coinId!) // arg 필요하기 때문에 함수로
  // );

  return <span>MYPAGE</span>;
}

export default MyPage;
