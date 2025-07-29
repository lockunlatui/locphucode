import styles from "./style.module.scss";
import { useCountdown } from "@/hooks/useCountTime";

import { useState } from "react";
import Image from "next/image";

import Img1 from "@/images/get-married/slider/1.jpeg";
import Img2 from "@/images/get-married/slider/2.jpg";

import Dove from "@/images/get-married/dove.png";

import { useSearchParams } from "next/navigation";
const ShowCounter = ({ days, hours, minutes, seconds }: any) => {
  return (
    <div className={styles.showCounter}>
      <DateTimeDisplay value={days} type={"Ngày"} />

      <DateTimeDisplay value={hours} type={"Giờ"} />

      <DateTimeDisplay value={minutes} type={"Phút"} />

      <DateTimeDisplay value={seconds} type={"Giây"} />
    </div>
  );
};

const DateTimeDisplay = ({ value, type }: any) => {
  return (
    <div>
      <p>{value}</p>
      <span>{type}</span>
    </div>
  );
};

const CountdownTimer = ({ targetDate }: any) => {
  const [days, hours, minutes, seconds] = useCountdown(targetDate);

  if (!(days + hours + minutes + seconds <= 0)) {
    return (
      <ShowCounter
        days={days}
        hours={hours}
        minutes={minutes}
        seconds={seconds}
      />
    );
  }
  return null;
};

const IMG_SLIDER = [Img1.src, Img2.src];

const Slider = () => {
  const [imgSlider, setImgSlider] = useState(IMG_SLIDER[0]);
  const searchParams = useSearchParams();
  const sendName = searchParams.get("name");

  const THREE_DAYS_IN_MS = 9 * 24 * 60 * 60 * 1000;
  const NOW_IN_MS = new Date().getTime();

  const dateTimeAfterThreeDays = NOW_IN_MS + THREE_DAYS_IN_MS;

  return (
    <div
      style={{
        backgroundImage: `url(${imgSlider})`,
      }}
      className={styles.container}
    >
      <div className={styles.bgWrapper}></div>
      <div className={styles.sendWrapper}>
        <Image src={Dove} alt="dove" width={50} height={50} />
        <h1 className={styles.sendYou}>
           Thân gửi: {sendName ? sendName : "bạn của tôi"}
        </h1>
      </div>
      <h1 className={styles.nameBrideGroom}>Xuân Lộc - Kim Nhuỵ</h1>
      <h4 className={styles.whenMarried}>
        Chúng tôi sẽ kết hôn vào ngày 23.7.2022 <br />
        (Nhầm ngày 25.06.2022)
      </h4>

      <CountdownTimer targetDate={dateTimeAfterThreeDays} />
    </div>
  );
};

export default Slider;
