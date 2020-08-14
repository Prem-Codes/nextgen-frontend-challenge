import React, { ReactElement, Fragment, useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { Filters } from "./filters";
import largeHero from "../assets/photos/5349.jpg";
import style from "./sample.module.scss";
import { Spinner } from "./spinner";
import * as Api from "../../types/api";

export const Sample = (): ReactElement => {
  const [data, setData] = useState<Api.DeviceList[]>();

  const renderDeviceList = (): ReactElement =>
    !data ? <Spinner className={style.spinner} /> : <Filters data={data} />;

  useEffect(() => {
    axios("/api/device/list")
      .then((result: AxiosResponse<Api.DeviceList[]>) => {
        setData(result?.data);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }, []);

  return (
    <Fragment>
      <header className={style.hero}>
        <img src={largeHero} />
      </header>
      <main className={style.main}>
        <div className={style.gutter}>{renderDeviceList()}</div>
      </main>
    </Fragment>
  );
};
