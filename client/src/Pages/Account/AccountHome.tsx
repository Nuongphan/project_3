import { useState } from "react";
import styles from "../../User.module.css";
import Account from "./Account";
import HistoryOrder from "./HistoryOrder";
import React from "react"
const AccountHome = () => {
  const tab = ["Account", "History Order"];
  const [type, setType] = useState<string>("Account");

  return (
      <div className={styles.mainAccount}>
      <div style={{ width: "25%" }} className={styles.sidebarAccount}>
        <ul>
          {tab.map((item) => (
            <li
              style={
                type === item
                  ? { fontWeight: "bold", color: "#000", fontSize: "17px" }
                  : {}
              }
              onClick={() => setType(item)}
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className= {styles.infor}>
        {type == "Account" ? <Account /> : <HistoryOrder />}
      </div>
    </div>
  );
};

export default AccountHome;
