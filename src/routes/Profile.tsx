import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useHistory } from "react-router";

interface Product {
  name: string;
  volume: number;
  nowVolume: number;
}

interface UserProductList {
  ok: string;
  error?: string;
  product?: Product[];
}

interface ProductListIF {
  userProductList: UserProductList;
}

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

function Profile() {
  const history = useHistory();
  const { data } = useQuery<ProductListIF>(PRODUCT_LIST);
  const list = data?.userProductList.product;
  return (
    <>
      <div>
        <h1>등록 상품</h1>
        {list?.map((item) => {
          return (
            <ul key={item.name}>
              <li>상품명: {item.name}</li>
              <li>판매량: {item.volume - item.nowVolume}</li>
              <li>재고: {item.nowVolume}</li>
            </ul>
          );
        })}
      </div>
      <button onClick={() => history.push("/profile/edit")}>
        비밀번호 변경하기
      </button>
    </>
  );
}

export default Profile;
