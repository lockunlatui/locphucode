/* eslint-disable @next/next/no-img-element */
import styles from "./style.module.scss";
import Image from "next/image";
import Dove from "@/images/get-married/dove.png";

import Background from "@/images/get-married/blog-img-3.jpg";
import Background1 from "@/images/get-married/blog-img-9.jpg";
import WeddingSign from "@/images/get-married/wedding-sign.png";
import { useState } from "react";
import { useSpring } from "react-spring";

const EVENTS = [
  // {
  //   name: "Lễ Vu Quy",
  //   date: "Ngày 17 tháng 7 năm 2022",
  //   datePositive: "Ngày 19 tháng 6 năm Nhâm Dần",
  //   bride: "Đoàn Thị Kim Nhụy",
  //   groom: "Đỗ Xuân Lộc",
  //   brideTitle: "Thứ Nữ",
  //   groomTitle: "Trưởng Nam",
  //   motherBride: "Phạm Thị Hồng",
  //   fatherBride: "Đoàn Kim Trì",
  //   motherGroom: "Nguyễn Thị Hiệp",
  //   fatherGroom: "Nguyễn Văn Ánh",
  //   addressBride:
  //     "Xóm Tân Long, thôn Nam Tượng 2, xã Nhơn Tân, TX. An Nhơn, tỉnh Bình Định",
  //   addressGroom:
  //     "123 Lê Duẩn,  thị Trấn Tân Sơn, huyện Ninh Sơn,  tỉnh Ninh Thuận",
  //   time: "11h",
  //   img: Background.src,
  // },
  {
    name: "Lễ Tân Hôn",
    date: "Ngày 23 tháng 7 năm 2022",
    datePositive: "Ngày 25 tháng 6 năm Nhâm Dần",
    bride: "Đoàn Thị Kim Nhụy",
    groom: "Đỗ Xuân Lộc",
    brideTitle: "Thứ Nữ",
    groomTitle: "Trưởng Nam",
    motherBride: "Phạm Thị Hồng",
    fatherBride: "Đoàn Kim Trì",
    motherGroom: "Nguyễn Thị Hiệp",
    fatherGroom: "Nguyễn Văn Ánh",
    addressBride:
      "Xóm Tân Long, thôn Nam Tượng 2, xã Nhơn Tân, TX. An Nhơn, tỉnh Bình Định",
    addressGroom:
      "123 Lê Duẩn,  thị Trấn Tân Sơn, huyện Ninh Sơn,  tỉnh Ninh Thuận",
    time: "11h00",
    img: Background1.src,
  },
];

const Event = () => {
  return (
    <div className={styles.container}>
      <div className={styles.titleWrapper}>
        <Image src={Dove} width={70} height={70} alt="Dove" />
        <h1 className={styles.title}>Sự kiện</h1>
      </div>
      <ul className={styles.list}>
        {EVENTS.map((event: any, index: number) => {
          return (
            <li
              style={{
                backgroundImage: `url(${event.img})`,
              }}
              className={styles.item}
              key={index}
            >
              <img
                src={WeddingSign.src}
                alt="Wedding sign"
                width="100px"
                height="100px"
                className={styles.weddingSign}
              />
              <div className={styles.wrap}>
                <h1 className={styles.title}>{event.name}</h1>
                <div className={styles.parent}>
                  <div className={styles.grideHouse}>
                    <span>Ông: {event.fatherBride}</span>
                    <span> Bà: {event.motherBride}</span>
                  </div>
                  <div className={styles.grideHouse}>
                    <span>Cậu: {event.fatherGroom}</span>
                    <span>Mẹ: {event.motherGroom}</span>
                  </div>
                </div>
                <div className={styles.wrapperGroomBride}>
                  <h3 className={styles.groom}>
                    {event.groom}{" "}
                    <sup className={styles.title}>{event.groomTitle}</sup>
                  </h3>
                  <h3 className={styles.bride}>
                    {event.bride}{" "}
                    <sup className={styles.title}>{event.brideTitle}</sup>
                  </h3>
                </div>
                {/* {index === 0 && <address>{event.addressBride}</address>} */}
                <address>{event.addressGroom}</address>
                <br />
                <time className={styles.time}>
                  Hôn lễ được tổ chức vào lúc: <span>{event.time}</span>
                </time>
              </div>
            </li>
          );
        })}
      </ul>
      <div className={styles.bank}>
        <blockquote>
          <span className={styles.vietcombank}>
            9968343185 - Vietcombank (Do Xuan Loc){" "}
          </span>
          <span className={styles.momo}>0968343185 - Momo (Do Xuan Loc) </span>
        </blockquote>
        <img
          src="https://media0.giphy.com/media/KmXiCFtT6tv9ZYGiS7/giphy.gif?cid=ecf05e475n97lpso3g0zo8h6wcxrjdqazrp794nqby6fj8bp&rid=giphy.gif&ct=g"
          alt="note"
          className={styles.imgHappy}
        />
        <blockquote>
          <span className={styles.vietcombank}>
            0431000237700 - Vietcombank (Doan Thi Kim Nhuy){" "}
          </span>
        </blockquote>
      </div>
      <div className={styles.formWrapper}>
        <h3>
          Nhờ mọi người điền giúp mẫu bên dưới để vợ chồng con/em/chị/anh chuẩn
          bị <br />
          tiếp đón chu đáo nhất. Chân thành cảm ơn mọi người.
        </h3>
      </div>
      <div className={styles.formWrapper}></div>
    </div>
  );
};

export default Event;
