import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import EditProfile from "./pages/EditProfile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import Profile from "./pages/Profile";
import RegisteProduct from "./pages/RegisteProduct";
import Register from "./pages/RegisteUser";
import GlobalStyles from "./styles/GlobalStyle";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/product" component={Product} />
        <Route exact path="/product/registe" component={RegisteProduct} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/profile/edit" component={EditProfile} />
      </Switch>
      <GlobalStyles />
    </BrowserRouter>
  );
}

export default App;
