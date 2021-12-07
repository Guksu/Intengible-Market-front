import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useState } from "react";
import { useHistory } from "react-router";
import { useSetRecoilState } from "recoil";
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
    <>
      <form onSubmit={onSubmit}>
        아이디 :{" "}
        <input
          type="text"
          required
          name="id"
          onChange={(e) => setId(e.currentTarget.value)}
        />
        비밀번호 :{" "}
        <input
          type="text"
          required
          name="password"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <button>로그인</button>
      </form>
      <button onClick={() => history.push("/register")}>회원가입</button>
    </>
  );
}

export default Login;
