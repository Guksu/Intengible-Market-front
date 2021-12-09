import React from "react";
import { useHistory } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { client } from "../apollo";
import { isLogginAtom } from "../atom";

const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 2%;
`;

const Title = styled.div`
  font-size: 30px;
`;

const NavDiv = styled.div`
  width: 50vw;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  font-size: 20px;
`;

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
    <HeaderDiv>
      <Title onClick={() => history.push("/")}>Photo Market</Title>
      <NavDiv>
        <span onClick={() => history.push("/product")}>상품</span>
        {isLoggin ? (
          <>
            <span onClick={() => history.push("/profile")}>프로필</span>
            <span onClick={logOutClick}>로그아웃</span>
          </>
        ) : (
          <span onClick={() => history.push("/login")}>로그인</span>
        )}
      </NavDiv>
    </HeaderDiv>
  );
}
export default Header;
