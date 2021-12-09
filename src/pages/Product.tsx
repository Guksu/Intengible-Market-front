import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useHistory } from "react-router";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { isLogginAtom } from "../atom";
import { GetProductIF } from "../interface/ProductIF";

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
const ListTitle = styled.div`
  font-size: 30px;
  text-align: center;
  margin-top: 5%;
`;

const ProductBtn = styled.button`
  margin-left: 80%;
  min-width: 8vw;
`;

const ListDiv = styled.div`
  display: grid;
  grid-template-columns: minmax(30%, 50%) minmax(30%, 50%);
  margin: 3% 20%;
`;

function Product() {
  const history = useHistory();
  const isLoggin = useRecoilValue(isLogginAtom);
  const { data: productList } = useQuery<GetProductIF>(GET_PRODUCT);
  const realProductList = productList?.getProduct.product?.filter(
    (item) => item.nowVolume > 0
  );

  return (
    <>
      <ListTitle>상품 목록</ListTitle>
      {isLoggin && (
        <ProductBtn onClick={() => history.push("/product/registe")}>
          상품 등록
        </ProductBtn>
      )}
      <ListDiv>
        {productList?.getProduct.ok &&
          realProductList?.map((item) => {
            return (
              <ul key={item.name}>
                <li>상품명: {item.name}</li>
                <li>
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
                  onChange={(e) => {}}
                />
                <button>구입하기</button>
              </ul>
            );
          })}
      </ListDiv>
    </>
  );
}

export default Product;
