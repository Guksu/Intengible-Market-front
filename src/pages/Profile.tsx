import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useHistory } from "react-router";
import { useRecoilValue } from "recoil";
import { isLogginAtom } from "../atom";
import { ProductListIF, PurchaseList } from "../interface/ProfileIF";

const PRODUCT_LIST = gql`
  query userProductList {
    userProductList {
      ok
      error
      product {
        name
        volume
        nowVolume
      }
    }
  }
`;

const PURCHASE_PRODUCT_LIST = gql`
  query userPurchaseProductList {
    userPurchaseProductList {
      ok
      error
      purchaseProduct {
        name
        volume
      }
    }
  }
`;

function Profile() {
  const history = useHistory();
  const isLoggin = useRecoilValue(isLogginAtom);
  const { data: sellListData } = useQuery<ProductListIF>(PRODUCT_LIST);
  const sellList = sellListData?.userProductList.product;
  const { data: buyListData } = useQuery<PurchaseList>(PURCHASE_PRODUCT_LIST);
  const buyList = buyListData?.userPurchaseProductList.purchaseProduct;

  return (
    <>
      {isLoggin ? (
        <>
          <div>
            <h1>등록 상품</h1>
            {sellList?.map((item) => {
              return (
                <ul key={item.name}>
                  <li>상품명: {item.name}</li>
                  <li>판매량: {item.volume - item.nowVolume}</li>
                  <li>재고: {item.nowVolume}</li>
                </ul>
              );
            })}
            <h1>구매 상품</h1>
            {buyList?.map((item) => {
              return (
                <ul key={item.name}>
                  <li>상품명: {item.name}</li>
                  <li>구매량: {item.volume}</li>
                </ul>
              );
            })}
          </div>
          <button onClick={() => history.push("/profile/edit")}>
            비밀번호 변경하기
          </button>
        </>
      ) : (
        <h1>Login Plz</h1>
      )}
    </>
  );
}

export default Profile;
