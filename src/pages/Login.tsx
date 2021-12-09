import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useState } from "react";
import { useHistory } from "react-router";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isLogginAtom } from "../atom";
import { LoginMutation } from "../interface/LoginIF";

const LOGIN = gql`
  mutation login($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      error
      token
    }
  }
`;

const LoginDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: space-around;
  margin-top: 15%;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  min-width: 30vw;
`;

const LoginInput = styled.input`
  border: 0px;
  border-bottom: 1px solid black;
  margin: 2%;
`;

function Login() {
  const isLogin = useSetRecoilState(isLogginAtom);
  const history = useHistory();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useMutation<LoginMutation>(LOGIN, {
    variables: {
      loginInput: {
        id,
        password,
      },
    },
  });

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login();
      if (data?.login.ok && data.login.token) {
        localStorage.setItem("token", data.login.token);
        isLogin(true);
        history.push("/");
      } else {
        alert(data?.login.error);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <LoginDiv>
      <LoginForm onSubmit={onSubmit}>
        <LoginInput
          type="text"
          required
          name="id"
          onChange={(e) => setId(e.currentTarget.value)}
          placeholder="아이디를 입력하세요"
        />
        <LoginInput
          type="text"
          required
          name="password"
          onChange={(e) => setPassword(e.currentTarget.value)}
          placeholder="비밀번호를 입력하세요"
        />
        <button>로그인</button>
      </LoginForm>
      <button onClick={() => history.push("/register")}>회원가입</button>
    </LoginDiv>
  );
}

export default Login;
