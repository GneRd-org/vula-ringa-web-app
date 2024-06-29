import { Carousel } from "@trendyol-js/react-carousel";
import { FC } from "react";
import {
  ChickenLicken,
  EmbaMall,
  Galitos,
  KFC,
  KotaKhona,
  MegaBus,
} from "../../assets";

export const PartnersCarousel: FC = () => {
  const images = [
    { original: MegaBus },
    { original: EmbaMall },
    { original: KFC },
    { original: ChickenLicken },
    { original: KotaKhona },
    { original: Galitos },
    { original: KFC },
    { original: ChickenLicken },
    { original: KotaKhona },
  ];
  return (
    <Carousel
      autoSwipe={2000}
      infinite
      swiping
      slide={2}
      show={5}
      transition={0.5}
    >
      {images.map((image, index) => (
        <img
          key={index}
          src={image.original}
          alt="partner"
          className="w-24 h-24 md:w-32 md:h-32"
        />
      ))}
    </Carousel>
  );
};
