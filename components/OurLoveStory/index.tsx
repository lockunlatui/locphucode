/* eslint-disable @next/next/no-img-element */
import styles from "./style.module.scss";
import Image from "next/image";
import c from "classnames";

import Dove from "@/images/get-married/dove.png";
import FirstMeet from "@/images/get-married/our-love-true/first-meet.png";
import OLT1 from "@/images/get-married/our-love-true/1.jpg";
import OLT2 from "@/images/get-married/our-love-true/2.jpg";
import OLT3 from "@/images/get-married/our-love-true/3.jpg";
import { useState } from "react";

const OUR_LOVE_TRUE = [
  {
    name: "Lần đầu gặp",
    date: "7 tháng 3 2018",
    content: "Chúng tôi hẹn gặp nhau và cùng đi ăn bún đậu mắm tôm.",
    img: OLT1,
  },
  {
    name: "Lần hẹn hò đầu tiên",
    date: "19 tháng 10 2019",
    content: `Và tôi đã tỏ tình với cô ấy tại một quán kem. Và cô ấy đồng ý.`,
    img: OLT2,
  },
  {
    name: "Ngày kết duyên",
    date: "23 tháng 7 2022",
    content:
      "Vào một ngày đẹp trời. Theo tiếng gọi của VŨ TRỤ. Ba mẹ của hai bên đã đồng ý cho chúng tôi về một nhà.",
    img: OLT3,
  },
];

const OurLoveStory = () => {
  const [index, setIndex] = useState(0);

  return (
    <div className={styles.container}>
      <div className={styles.titleWrapper}>
        <Image src={Dove} width={70} height={70} alt="Dove" />
        <h1 className={styles.title}>Câu chuyện tình yêu</h1>
      </div>
      <div className={styles.tabOurLoveStory}>
        <ul className={styles.listWrapper}>
          {OUR_LOVE_TRUE.map((love: any, number: number) => {
            return (
              <li
                key={number}
                className={c(
                  styles.love,
                  index === number ? styles.active : ""
                )}
                onClick={() => setIndex(number)}
              >
                {love.name}
              </li>
            );
          })}
        </ul>
        <div className={styles.contentWrapper}>
          <div className={styles.backgroundImg}>
            <div className={styles.overImg}></div>
            <Image
              className={styles.ourLoveImg}
              src={OUR_LOVE_TRUE[index].img}
              width={557}
              height={363}
              alt="Our Love True 1"
            />
          </div>
          <div className={styles.wrapperContent}>
            <div className={styles.content}>
              <div className={styles.borderShape}>
                <img
                  src="https://wpocean.com/wp/feelings/wp-content/uploads/2022/01/shape.jpg"
                  alt=""
                />{" "}
              </div>
              <span>
                <Image
                  src={FirstMeet}
                  alt="First Meet"
                  width={53}
                  height={55}
                />{" "}
              </span>
              <h1>{OUR_LOVE_TRUE[index].name}</h1>
              <time
                className={styles.date}
                dateTime={OUR_LOVE_TRUE[index].date}
              >
                {OUR_LOVE_TRUE[index].date}
              </time>
              <p>{OUR_LOVE_TRUE[index].content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurLoveStory;
