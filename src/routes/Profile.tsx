import { useHistory } from "react-router";

function Profile() {
  const history = useHistory();

  return (
    <>
      <h1>Profile</h1>
      <button onClick={() => history.push("/profile/edit")}>
        비밀번호 변경하기
      </button>
    </>
  );
}

export default Profile;
