import React, { ReactElement, useEffect, useState } from "react";
import style from "./device.module.scss";
//import favorites from "../assets/icons/favorites-active.svg";
import * as Api from "../../types/api";
import axios, { AxiosResponse } from "axios";
import { RouteComponentProps } from "react-router";
import { DeviceImageGallery } from "./deviceimagegallery";
import { Link } from "react-router-dom";

type Props = {
  //data?: Api.Device;
  id: string;
};

export const Device = ({ match }: RouteComponentProps<Props>): ReactElement => {
  const [data, setData] = useState<Api.Device>();
  const [showDetails, setShowDetails] = useState({
    showSpecifications: false,
    showDescription: false,
  });
  const id = match.params.id as any;

  useEffect(() => {
    axios
      .get(`api/device/${id}`, id)
      .then((result: AxiosResponse<Api.Device>) => {
        setData(result?.data);
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }, []);

  const variant = data?.variants?.find(
    (variant) => variant.id === data?.featuredVariantId
  );

  const specificationClick = () => {
    setShowDetails({
      showSpecifications: !showDetails.showSpecifications,
      showDescription:
        showDetails.showDescription == true
          ? false
          : showDetails.showDescription,
    });
  };

  const descriptionClick = () => {
    setShowDetails({
      showDescription: !showDetails.showDescription,
      showSpecifications:
        showDetails.showSpecifications == true
          ? false
          : showDetails.showSpecifications,
    });
  };

  const [device, setDevice] = useState({
    ImageGallery: [] as any,
    Color: null,
    Size: null,
  });

  const deviceImages = [] as Array<any>;
  {
    data?.variants.map((item) => {
      if (data.featuredVariantId == item.id) {
        deviceImages.push({ image: item.image, imageAlt: item.imageAlt }),
          item.gallery.map((imageitem) => {
            deviceImages.push({
              image: imageitem.image,
              imageAlt: imageitem.imageAlt,
            });
          });
      }
    });
  }

  const handleColorChange = (event: any) => {
    data?.variants.map((item) => {
      if (item.color === event.target.value) {
        setDevice({
          ...device,
          ImageGallery: item.gallery
            .map((images) => ({
              image: images.image,
              imageAlt: images.imageAlt,
            }))
            .concat({ image: item.image, imageAlt: item.imageAlt }),
          Color: item.color as any,
        });
      }
      if (item.size === event.target.value) {
        setDevice({
          ...device,
          Size: item.size as any,
        });
      }
    });
  };

  const loadedGallery =
    device.ImageGallery.length != 0 ? device.ImageGallery : deviceImages;
  const defaultColor =
    device.Color != null ? (device.Color as any) : data?.variants[0].color;
  const defaultSize =
    device.Size != null ? (device.Size as any) : data?.variants[0].size;

  const uniqueSizes = [] as Array<any>;
  {
    data?.variants.map((item) => {
      if (uniqueSizes.indexOf(item.size) === -1) {
        uniqueSizes.push(item.size);
      }
    });
  }

  const uniqueColors = [] as Array<any>;
  {
    data?.variants.map((item) => {
      if (uniqueColors.indexOf(item.color) === -1) {
        uniqueColors.push(item.color);
      }
    });
  }

  return (
    <article className={style.device} data-testid="device">
      <div className={style.photo}>
        <DeviceImageGallery imageUrls={...loadedGallery} />
      </div>
      <div className={style.headlines}>
        <div>
          <h1>
            <span className={style.brand}>{data?.brandName} </span>
            <span className={style.terminal}>{data?.name}</span>
          </h1>
        </div>
        <div style={{ color: "darkgray" }}>
          {defaultSize} {defaultColor}
        </div>
        <br></br>
        <div>{data?.campaignLabel}</div>
        <br></br>
        <div>
          <label style={{ color: "darkgray" }}>
            <strong>VÆLG STØRRELSE:</strong>
          </label>
          <br></br>
          {uniqueSizes.map((item, index) => (
            <label key={index} onClick={handleColorChange}>
              <input
                type="radio"
                name="radio-mobile-storage"
                value={item}
                defaultChecked={item === defaultSize}
              />
              {item}
              <br></br>
            </label>
          ))}
        </div>
        <br></br>
        <div>
          <label style={{ color: "darkgray" }}>
            <strong>VÆLG FARVE:</strong>
          </label>
          <br></br>
          {uniqueColors.map((item) => (
            <label key={item.id} onClick={handleColorChange}>
              <input
                type="radio"
                name="radio-mobile-color"
                value={item}
                defaultChecked={item === defaultColor}
              />
              {item}
              <br></br>
            </label>
          ))}
        </div>
        <div>
          <Link
            to={{
              pathname: "/" + id + "/cart",
              state: {
                data: data,
                selectedSize: defaultSize,
                selectedColor: defaultColor,
                deviceImage: loadedGallery,
              },
            }}
            style={{ textDecoration: "none" }}
          >
            <input
              className={style.addToCartBtn}
              type="button"
              value="Tilføj til kurv"
            />
          </Link>
        </div>
      </div>
      <div className={style.properties}>
        <div style={{ marginBottom: "5rem", marginTop: "2rem" }}>
          <div
            className={style.footer}
            style={{ width: "45%", float: "left" }}
            onClick={specificationClick}
          >
            Specifications
          </div>
          <div
            className={style.footer}
            style={{ width: "45%", float: "right" }}
            onClick={descriptionClick}
          >
            Om
          </div>
        </div>
        <div
          className={
            showDetails.showSpecifications
              ? style.specificationsshow
              : style.specificationshide
          }
        >
          {data?.specifications?.map((item, index) => (
            <ul key={index} className={style.design}>
              <li>
                {item?.label}: {item?.description}
              </li>
            </ul>
          ))}
        </div>
        {/* <img className={style.favorites} src={favorites} alt="Favorites" /> */}
        <div
          className={
            showDetails.showDescription
              ? style.specificationsshow
              : style.specificationshide
          }
        >
          <p
            className={style.description}
            dangerouslySetInnerHTML={{ __html: data?.descriptionHtml as any }}
          />
        </div>
      </div>
    </article>
  );
};
