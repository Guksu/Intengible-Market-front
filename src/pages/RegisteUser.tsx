import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { CreateAccount } from "../interface/RegisterIF";

const CREATE_USER = gql`
  mutation createAccount($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
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

function Register() {
  const history = useHistory();
  const [regId, setRegId] = useState("");
  const [regPasswrod, setRegPassword] = useState("");
  const [createAccountMutation] = useMutation<CreateAccount>(CREATE_USER, {
    variables: {
      createAccountInput: {
        id: regId,
        password: regPasswrod,
      },
    },
  });

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createAccountMutation();
      if (data?.createAccount.ok) {
        alert("회원가입에 성공하셨습니다 !");
        history.push("/login");
      } else {
        alert(data?.createAccount.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <RegDiv>
      <RegiForm onSubmit={onSubmit}>
        <RegiInput
          type="text"
          required
          name="id"
          onChange={(e) => setRegId(e.currentTarget.value)}
          placeholder="아이디를 입력하세요"
        />
        <RegiInput
          type="text"
          required
          name="password"
          onChange={(e) => setRegPassword(e.currentTarget.value)}
          placeholder="비밀번호를 입력하세요"
        />
        <button>가입하기</button>
      </RegiForm>
    </RegDiv>
  );
}

export default Register;
