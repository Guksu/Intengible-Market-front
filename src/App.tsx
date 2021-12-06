import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isLogginAtom } from "./atom";
import Header from "./components/Header";
import Board from "./routes/Board";
import EditProfile from "./routes/EditProfile";
import Home from "./routes/Home";
import Login from "./routes/Login";
import Product from "./routes/Product";
import Profile from "./routes/Profile";
import Register from "./routes/Register";

function App() {
  const isLogin = useSetRecoilState(isLogginAtom);
  const token = localStorage.getItem("token");
  if (token) {
    isLogin(true);
  }

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/profile/edit" component={EditProfile} />
        <Route exact path="/product" component={Product} />
        <Route exact path="/board" component={Board} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
