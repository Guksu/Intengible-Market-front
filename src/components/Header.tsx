import React from "react";
import { useHistory } from "react-router";
import { useRecoilValue } from "recoil";
import { isLogginAtom } from "../atom";

function Header() {
  const isLoggin = useRecoilValue(isLogginAtom);
  const history = useHistory();
  return (
    <>
      <h1 onClick={() => history.push("/")}>Intengible Market</h1>
      <span onClick={() => history.push("/product")}>상품</span>
      <span onClick={() => history.push("/board")}>게시판</span>
      {isLoggin ? (
        <span onClick={() => history.push("/profile")}>프로필</span>
      ) : (
        <span onClick={() => history.push("/login")}>로그인</span>
      )}
    </>
  );
}
export default Header;
