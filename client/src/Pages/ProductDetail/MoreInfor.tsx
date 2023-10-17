
import { useState } from "react";
import styles from "../../User.module.css";
interface Data {
  title: string;
  answer: string;
}
const data: Data[] = [
  {
    title: "PRODUCT DETAILS",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Asperiores aut commodi vel culpa pariatur nam nobis aspernatur aliquam iste, hic earum dolore, autem ullam? Esse nobis labore laudantium repellendus debitis?",
  },
  {
    title: "CARE + SAFETY",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Asperiores aut commodi vel culpa pariatur nam nobis aspernatur aliquam iste, hic earum dolore, autem ullam? Esse nobis labore laudantium repellendus debitis?",
  },

  {
    title: "SHIPPING + EXCHANGES",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Asperiores aut commodi vel culpa pariatur nam nobis aspernatur aliquam iste, hic earum dolore, autem ullam? Esse nobis labore laudantium repellendus debitis? Lorem ipsum dolor sit amet consectetur adipisicing elit.Asperiores aut commodi vel culpa pariatur nam nobis aspernatur aliquam iste, hic earum dolore, autem ullam? Esse nobis labore laudantium repellendus debitis?",
  },
  {
    title: "SCENT GLOSSARY",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit.Asperiores aut commodi vel culpa pariatur nam nobis aspernatur aliquam iste, hic earum dolore, autem ullam? Esse nobis labore laudantium repellendus debitis?",
  },
];
function MoreInfor(): any {
  const [selected, setSelected] = useState(null);
  const toggle = (index: any) => {
    if (selected == index) {
      setSelected(null);
    } else {
      setSelected(index);
    }
  };
  return (
    <div className={styles.accordinContainer}>
      <div className={styles.accordionn}>
        {data.map((item, index) => (
          <div key={item.title} className={styles.itemAccordin}>
            <div className={styles.titleAccordin} onClick={() => toggle(index)}>
              <h2>{item.title}</h2>
              <h2>
                {" "}
                <span className={styles.titleAction}>
                  {selected == index ? "-" : "+"}
                </span>
              </h2>
            </div>
            <div
              className={
                selected == index
                  ? `${styles.content} ${styles.show}`
                  : `${styles.content}`
              }
            >
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default MoreInfor;
