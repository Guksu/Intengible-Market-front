import { useState } from "react";
import { useHistory } from "react-router";

function Login() {
  const history = useHistory();
  const [id, setId] = useState("");
  const [passwrod, setPassword] = useState("");

  return (
    <>
      <form>
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
