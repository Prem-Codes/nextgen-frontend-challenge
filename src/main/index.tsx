import { hot } from "react-hot-loader/root";
import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import style from "./document.module.scss";
import { Sample } from "../components/sample";
import { Device } from "../components/device";
import { Cart } from "../components/cart";
import { NavBar } from "../components/navbar";

const App = hot(Sample);

const rootElement = document.getElementById("root");
rootElement?.classList.add(style.root);

ReactDOM.render(
  <BrowserRouter>
    <Fragment>
      <NavBar />
      <br></br>
      <br></br>
      <Route exact path="/" component={App} />
      <Route exact path="/:id" component={Device} />
      <Route path="/:id/cart" component={Cart} />
    </Fragment>
  </BrowserRouter>,
  rootElement
);
