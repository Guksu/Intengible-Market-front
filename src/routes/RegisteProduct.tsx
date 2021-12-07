import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { CommonOutput } from "../interface/CommonIF";

interface RegisterProductOutput extends CommonOutput {}

interface RegisterProductIF {
  registerProduct: RegisterProductOutput;
}

const REGISTE_PRODUCT = gql`
  mutation registerProduct($registerProductInput: RegisterProductInput!) {
    registerProduct(input: $registerProductInput) {
      ok
      error
    }
  }
`;

function RegisteProduct() {
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
      <form onSubmit={onSubmit}>
        상품명 :{" "}
        <input
          type="text"
          required
          name="name"
          onChange={(e) => {
            setName(e.currentTarget.value);
          }}
        />
        이미지등록:{" "}
        <input
          type="file"
          required
          name="file"
          accept="image/*"
          onChange={(e) => {
            setFile(e.currentTarget.files);
          }}
        />
        상세설명 :{" "}
        <textarea
          required
          name="description"
          maxLength={400}
          onChange={(e) => {
            setDescription(e.currentTarget.value);
          }}
        />
        가격:{" "}
        <input
          type="text"
          required
          onInput={changNum}
          name="price"
          onChange={(e) => {
            setPrice(e.currentTarget.value);
          }}
        />
        수량 :{" "}
        <input
          type="text"
          required
          onInput={changNum}
          name="volume"
          onChange={(e) => {
            setVolume(e.currentTarget.value);
          }}
        />
        <button>등록하기</button>
      </form>
    </>
  );
}

export default RegisteProduct;
