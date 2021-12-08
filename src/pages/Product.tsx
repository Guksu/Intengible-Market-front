import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useState } from "react";
import { useHistory } from "react-router";
import { useRecoilValue } from "recoil";
import { isLogginAtom } from "../atom";
import { CommonOutput } from "../interface/CommonIF";

interface AllProduct {
  name: string;
  img: string;
  price: number;
  description: string;
  nowVolume: number;
}

interface GetProductOutput extends CommonOutput {
  product?: AllProduct[];
}

interface GetProductIF {
  getProduct: GetProductOutput;
}

const GET_PRODUCT = gql`
  query getProduct {
    getProduct {
      ok
      error
      product {
        name
        img
        price
        description
        nowVolume
      }
    }
  }
`;

function Product() {
  const history = useHistory();
  const isLoggin = useRecoilValue(isLogginAtom);
  const [purchaseNum, setPurchaseNum] = useState(0);
  const { data: productList } = useQuery<GetProductIF>(GET_PRODUCT);
  const realProductList = productList?.getProduct.product?.filter(
    (item) => item.nowVolume > 0
  );

  return (
    <>
      <h1>상품 목록</h1>
      <div>
        {productList?.getProduct.ok &&
          realProductList?.map((item) => {
            return (
              <ul key={item.name}>
                <li>상품명: {item.name}</li>
                <li>
                  상품 이미지:{" "}
                  <img
                    src={item.img}
                    alt={item.name}
                    height="300"
                    width="200"
                  />{" "}
                </li>
                <li>상세설명: {item.description}</li>
                <li>가격: {item.price}</li>
                <li>수량: {item.nowVolume}</li>
                <input
                  type="number"
                  min={0}
                  max={item.nowVolume}
                  placeholder="수량을 선택하세요"
                  onChange={(e) => {
                    setPurchaseNum(parseInt(e.currentTarget.value));
                  }}
                />
                <button>구입하기</button>
              </ul>
            );
          })}
      </div>
      {isLoggin && (
        <button onClick={() => history.push("/product/registe")}>
          상품 등록
        </button>
      )}
    </>
  );
}

export default Product;
