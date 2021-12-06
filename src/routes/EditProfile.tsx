import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { useState } from "react";
import { useHistory } from "react-router";

interface EditProfileOutput {
  ok: string;
  error?: string;
}

interface EditProfileIF {
  editProfile: EditProfileOutput;
}

const EDIT_USER = gql`
  mutation editProfile($editProfileInput: EditProfileInput!) {
    editProfile(input: $editProfileInput) {
      ok
      error
    }
  }
`;

function EditProfile() {
  const [pw, newPw] = useState("");
  const history = useHistory();

  const [editProfile] = useMutation<EditProfileIF>(EDIT_USER, {
    variables: { editProfileInput: { newPassword: pw } },
  });

  const onClick: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    try {
      const { data } = await editProfile();
      if (data?.editProfile.ok) {
        alert("비밀번호가 변경되었습니다.");
        history.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form>
        <input
          type="text"
          placeholder="변경할 비빌번호를 입력하세요"
          required
          name="changePw"
          onChange={(e) => {
            newPw(e.currentTarget.value);
          }}
        />
        <button onClick={onClick}>변경하기</button>
        <button
          onClick={() => {
            history.push("/profile");
          }}
        >
          돌아가기
        </button>
      </form>
    </>
  );
}

export default EditProfile;
