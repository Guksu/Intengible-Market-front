import { useHistory } from "react-router";
import { useRecoilValue } from "recoil";
import { isLogginAtom } from "../atom";

function Product() {
  const history = useHistory();
  const isLoggin = useRecoilValue(isLogginAtom);

  return (
    <>
      <h1>상품 목록</h1>
      {isLoggin && (
        <button onClick={() => history.push("/product/registe")}>
          상품 등록
        </button>
      )}
    </>
  );
}

export default Product;
