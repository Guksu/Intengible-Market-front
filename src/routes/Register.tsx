import { useState } from "react";

function Register() {
  const [regId, setregId] = useState("");
  const [regPasswrod, setRegPassword] = useState("");
  return (
    <>
      <form>
        아이디 :{" "}
        <input
          type="text"
          required
          name="id"
          onChange={(e) => setregId(e.currentTarget.validationMessage)}
        />
        비밀번호 :{" "}
        <input
          type="text"
          required
          name="password"
          onChange={(e) => setRegPassword(e.currentTarget.value)}
        />
        <button>가입하기</button>
      </form>
    </>
  );
}

export default Register;
