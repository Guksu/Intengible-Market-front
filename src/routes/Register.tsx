import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useState } from "react";
import { useHistory } from "react-router";
import { CreateAccount } from "../interface/RegisterIF";

const CREATE_USER = gql`
  mutation createAccount($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
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
    <>
      <form onSubmit={onSubmit}>
        아이디 :{" "}
        <input
          type="text"
          required
          name="id"
          onChange={(e) => setRegId(e.currentTarget.value)}
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
