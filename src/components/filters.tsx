import React, { useState, ReactElement } from "react";
import { DeviceList } from "./devicelist";
import * as Api from "../../types/api";
import style from "./filters.module.scss";

type Props = {
  data: Api.DeviceList[];
};

export const Filters = ({ data }: Props): ReactElement => {
  const [state, setState] = useState({
    items: data,
    filter: "",
  });

  const handleChange = (e: React.MouseEvent<HTMLInputElement>) => {
    setState({
      ...state,
      filter: (e.target as HTMLInputElement).value,
    });
  };

  const { items, filter } = state;
  let shownItems = items;

  if (filter != "Alle") {
    shownItems = items.filter(({ brandName }) => brandName.includes(filter));
  }

  const uniqueBrands = [] as Array<string>;
  {
    items.map((newitem: Api.DeviceList) => {
      if (uniqueBrands.indexOf(newitem.brandName) === -1) {
        uniqueBrands.push(newitem.brandName);
      }
    });
  }

  return (
    <div>
      <div className={style.devicefilters}>
        <input
          className={style.devicefiltersbuttons}
          style={{
            backgroundColor:
              state.filter == "" || state.filter == "Alle"
                ? "lightskyblue"
                : "white",
          }}
          type="button"
          value="Alle"
          onClick={handleChange}
        />
        {uniqueBrands.map((newitem: string) => {
          return (
            <input
              className={style.devicefiltersbuttons}
              style={{
                backgroundColor:
                  state.filter == newitem ? "lightskyblue" : "white",
              }}
              type="button"
              key={newitem}
              value={newitem}
              onClick={handleChange}
            />
          );
        })}
      </div>
      <div className={style.resultcount}>
        {shownItems.length} af {items.length} results
      </div>
      <DeviceList data={shownItems}></DeviceList>
    </div>
  );
};
