import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { isLogginAtom } from "../atom";
import { RegisterProductIF } from "../interface/RgisterProduct";

const REGISTE_PRODUCT = gql`
  mutation registerProduct($registerProductInput: RegisterProductInput!) {
    registerProduct(input: $registerProductInput) {
      ok
      error
    }
  }
`;

const RegDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: space-around;
  margin-top: 15%;
`;

const RegiForm = styled.form`
  display: flex;
  flex-direction: column;
  min-width: 30vw;
`;

const RegiInput = styled.input`
  border: 0px;
  border-bottom: 1px solid black;
  margin: 2%;
`;

function RegisteProduct() {
  const isLoggin = useRecoilValue(isLogginAtom);
  const [name, setName] = useState("");
  const [file, setFile] = useState<FileList | null>();
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("0");
  const [volume, setVolume] = useState("0");
  const history = useHistory();

  const [registProduct] = useMutation<RegisterProductIF>(REGISTE_PRODUCT);
  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      if (file) {
        const actualFile = file[0];
        const formData = new FormData();
        formData.append("file", actualFile);
        const { url: imgUrl } = await (
          await fetch("http://localhost:4000/uploads/", {
            method: "POST",
            body: formData,
          })
        ).json();
        const { data } = await registProduct({
          variables: {
            registerProductInput: {
              name,
              img: imgUrl,
              description,
              price: parseInt(price.replace(/,/g, "")),
              volume: parseInt(volume.replace(/,/g, "")),
            },
          },
        });
        if (data?.registerProduct.ok) {
          alert("등록되었습니다.");
          history.push("/product");
        } else {
          alert(data?.registerProduct.error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  //input값 콤마 입력코드
  const changNum: React.FormEventHandler<HTMLInputElement> = (e) => {
    const i = e.currentTarget;
    const startPosition = i.value.length - i.selectionEnd!;
    i.value = i.value
      .replace(/^0+|\D+/g, "")
      .replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
    const len = Math.max(i.value.length - startPosition, 0);
    i.setSelectionRange(len, len);
  };

  return (
    <>
      {isLoggin ? (
        <RegDiv>
          <RegiForm onSubmit={onSubmit}>
            <RegiInput
              type="text"
              required
              name="name"
              onChange={(e) => {
                setName(e.currentTarget.value);
              }}
              placeholder="상품명"
            />
            <RegiInput
              type="file"
              required
              name="file"
              accept="image/*"
              onChange={(e) => {
                setFile(e.currentTarget.files);
              }}
            />
            <RegiInput
              required
              name="description"
              maxLength={100}
              onChange={(e) => {
                setDescription(e.currentTarget.value);
              }}
              placeholder="상세설명"
            />
            <RegiInput
              type="text"
              required
              onInput={changNum}
              name="price"
              onChange={(e) => {
                setPrice(e.currentTarget.value);
              }}
              placeholder="가격"
            />
            <RegiInput
              type="text"
              required
              onInput={changNum}
              name="volume"
              onChange={(e) => {
                setVolume(e.currentTarget.value);
              }}
              placeholder="수량"
            />
            <button>등록하기</button>
          </RegiForm>
        </RegDiv>
      ) : (
        <h1>Login Plz</h1>
      )}
    </>
  );
}

export default RegisteProduct;
