import React from "react";
import { useHistory } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { client } from "../apollo";
import { isLogginAtom } from "../atom";

function Header() {
  const isLoggin = useRecoilValue(isLogginAtom);
  const setIsLogin = useSetRecoilState(isLogginAtom);

  const history = useHistory();
  const logOutClick = () => {
    localStorage.clear();
    client.clearStore();
    setIsLogin(false);
    history.push("/");
  };
  return (
    <>
      <h1 onClick={() => history.push("/")}>Intengible Market</h1>
      <span onClick={() => history.push("/product")}>상품</span>
      <span onClick={() => history.push("/board")}>게시판</span>
      {isLoggin ? (
        <>
          <span onClick={() => history.push("/profile")}>프로필</span>
          <span onClick={logOutClick}>로그아웃</span>
        </>
      ) : (
        <span onClick={() => history.push("/login")}>로그인</span>
      )}
    </>
  );
}
export default Header;
