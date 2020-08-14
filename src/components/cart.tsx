import React, { useState } from "react";
import { RouteComponentProps } from "react-router";
import style from "./cart.module.scss";
import { Link } from "react-router-dom";

type Props = {
  device: any;
  id: any;
};

export const Cart = ({ match, location }: RouteComponentProps<Props>) => {
  const [modal, showModal] = useState({ show: false });
  const device = location.state as any;
  const id = match.params.id as any;

  const modalshow = () => {
    showModal({
      show: true,
    });
  };
  return (
    <article>
      <div className={style.cartContainer}>
        <div>
          <label>Din Kurv</label>
        </div>
        <div className="row">
          <div className={style.cartContainerComponent}>
            <div style={{ float: "left" }}>
              <div style={{ float: "left" }}>
                <img
                  style={{ height: "10rem" }}
                  src={`/static/devices/${device.deviceImage[0].image}`}
                />
              </div>
              <div style={{ float: "right", marginTop: "2rem" }}>
                <label>
                  <strong>
                    {device.data.brandName} {device.data.name}
                  </strong>
                </label>
                <br></br>
                <label style={{ color: "gray" }}>
                  {device.selectedSize}/{device.selectedColor}
                </label>
              </div>
            </div>
            <div style={{ float: "right", margin: "2rem" }}>
              <label>Pris: </label>
              <label>{device.data.leastPriceUpfront} Kr.</label>
              <br></br>
              <br></br>
              <label style={{ color: "blue" }}>Rabat: </label>
              <label>{device.data.savings} Kr.</label>
              <br></br>
              <br></br>
              <label>Pris i alt: </label>
              <label style={{ color: "green" }}>
                {device.data.leastPrice} Kr.
              </label>
            </div>
          </div>
          <div>
            <Link
              to={{ pathname: "/" + id }}
              style={{ textDecoration: "none" }}
            >
              <input
                style={{ display: modal.show ? "none" : "" }}
                className={style.cartBtns}
                type="button"
                value="Rediger"
              />
            </Link>
            <Link to={{ pathname: "/" }} style={{ textDecoration: "none" }}>
              <input
                style={{ display: modal.show ? "none" : "" }}
                className={style.cartBtns}
                type="button"
                value="Slet"
              />
            </Link>
            <button
              style={{ display: modal.show ? "none" : "block" }}
              onClick={modalshow}
              className={style.checkoutbtn}
              value="Gå til bestilling"
            >
              Gå til bestilling
            </button>
          </div>
        </div>
        <div
          style={{
            display: modal.show ? "block" : "none",
            textAlign: "center",
          }}
        >
          <br></br>
          <hr></hr>
          <label>Tak for din order</label>
          <br></br>
          <br></br>
          <Link to={{ pathname: "/" }}>Gå til Homepage</Link>
        </div>
      </div>
    </article>
  );
};
