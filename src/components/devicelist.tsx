import React, { ReactElement } from "react";
import style from "./devicelist.module.scss";
import * as Api from "../../types/api";
import { Link } from "react-router-dom";

type Props = {
  data: Api.DeviceList[];
};

export const DeviceList = ({ data }: Props): ReactElement => {
  return (
    <div className={style.devicelist}>
      {data.map((item) => (
        <div key={item.id}>
          <Link
            to={{ pathname: "/" + item.id }}
            style={{ textDecoration: "none" }}
          >
            <div
              className={style.deviceitem}
              key={item.id}
              style={{ width: "22rem" }}
            >
              <div>
                <img
                  alt={item.imageAlt}
                  className={style.deviceimg}
                  src={`/static/devices/${item.image}`}
                />
              </div>
              <div style={{ width: "50%", height: "100%", float: "right" }}>
                <div className={style.brandName}>{item.brandName}</div>
                <div className={style.itemName}>
                  <strong>{item.name}</strong>
                </div>
                <br></br>
                <div className={style.devicecolors}>
                  {item.colors.map((item, index) => (
                    <div
                      key={index}
                      aria-label={item.color}
                      className={style.devicecolorbuttons}
                      style={{ backgroundColor: item.colorHex }}
                    ></div>
                  ))}
                </div>
                <br></br>
                <div className={style.campaignLabel}>{item.campaignLabel}</div>
                <div
                  style={{
                    color: "#27a4d7",
                    fontSize: "12px",
                    marginTop: "1rem",
                  }}
                >
                  Rabat: {item.savings} Kr.
                </div>
                <div style={{ color: "black" }}>
                  <strong>{item.offeringServicePrice} Kr.</strong>
                </div>
                <div style={{ fontSize: "10px", color: "black" }}>
                  ved {item.offeringService}
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};
