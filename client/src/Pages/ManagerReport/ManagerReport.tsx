import { BiSolidTagX, BiSolidUserRectangle } from "react-icons/bi";
import { AiFillTag } from "react-icons/ai";
import { BsFillCartCheckFill } from "react-icons/bs";
import { RiForbidFill } from "react-icons/ri";
import { TbReportOff } from "react-icons/tb";
import { ChartBar } from "./Chart";
import { Bestseller } from "./Bestseller";

const time = new Date();
export const formattedDate = time.toDateString();
const ManagerReport = () => {

  return (
    <>
      <div className="containerr">
        <div
          style={{
            padding: "13px 20px 13px 20px",
            backgroundColor: "#FFFFFF",
            borderRadius: "5px",
            fontWeight: "bolder",
            fontSize: "14px",
            borderLeft: "6px solid  #ffd43b",
            display: "flex",
            justifyContent: "space-between",
            width: "95%",
          }}
        >
          <p>Bảng điều khiển</p>
          <p>{formattedDate} </p>
        </div>
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            marginRight: "30px",
          }}
        >
          <div className="report-item">
            <BiSolidUserRectangle
              style={{
                color: "green",
                fontSize: "60px",
                margin: "7px",
                backgroundColor: "#BCF0DA",
                height: "85%",
                borderRadius: "4px",
              }}
            />
            <div
              style={{
                fontWeight: "bolder",
                fontSize: "15px",
                margin: "15px 15px 15px 10px",
              }}
            >
              <p style={{ color: "#C81E1E" }}>TỔNG KHÁCH HÀNG</p>{" "}
              <p>200 khách hàng</p>
            </div>
          </div>
          <div className="report-item">
            <AiFillTag
              style={{
                color: "#76A9FA",
                fontSize: "60px",
                margin: "7px",
                height: "85%",
                backgroundColor: "#E1EFFE",
                borderRadius: "4px",
              }}
            />
            <div
              style={{
                fontWeight: "bolder",
                fontSize: "15px",
                margin: "15px 20px 15px 10px",
              }}
            >
              <p style={{ color: "#C81E1E" }}>TỔNG SẢN PHẨM</p>{" "}
              <p>sản phẩm </p>
            </div>
          </div>
          <div className="report-item">
            <BsFillCartCheckFill
              style={{
                color: "#FACA15",
                fontSize: "60px",
                margin: "7px",
                backgroundColor: "#FDF6B2",
                borderRadius: "4px",
                height: "85%",
              }}
            />
            <div
              style={{
                fontWeight: "bolder",
                fontSize: "15px",
                margin: "15px 20px 15px 0",
              }}
            >
              <p style={{ color: "#C81E1E" }}>TỔNG ĐƠN HÀNG</p>{" "}
              <p>200 đơn hàng</p>
            </div>
          </div>
          <div className="report-item">
            <BiSolidTagX
              style={{
                color: "#F98080",
                fontSize: "60px",
                margin: "7px",
                backgroundColor: "#FBD5D5",
                borderRadius: "4px",
                height: "85%",
              }}
            />
            <div
              style={{
                fontWeight: "bolder",
                fontSize: "15px",
                margin: "15px 20px 15px 10px",
              }}
            >
              <p style={{ color: "#C81E1E" }}>SẢN PHẨM HẾT HÀNG</p>{" "}
              <p>4 sản phẩm</p>
            </div>
          </div>
          <div className="report-item">
            <RiForbidFill
              style={{
                color: "#F98080",
                fontSize: "60px",
                margin: "7px",
                backgroundColor: "#FBD5D5",
                borderRadius: "4px",
                height: "85%",
              }}
            />
            <div
              style={{
                fontWeight: "bolder",
                fontSize: "15px",
                margin: "15px 50px 0px 0",
              }}
            >
              <p style={{ color: "#C81E1E" }}>BỊ CẤM</p> <p>3 khách hàng</p>
            </div>
          </div>
          <div className="report-item">
            <TbReportOff
              style={{
                color: "F98080",
                fontSize: "60px",
                margin: "7px",
                backgroundColor: "#FBD5D5",
                borderRadius: "4px",
                height: "85%",
              }}
            />
            <div
              style={{
                fontWeight: "bolder",
                fontSize: "15px",
                margin: "15px 20px 15px 10px",
              }}
            >
              <p style={{ color: "#C81E1E" }}>ĐƠN HÀNG BỊ HỦY</p>{" "}
              <p>4 đơn hàng</p>
            </div>
          </div>
        </section>
        <section>
          <ChartBar />
        </section>
        <section>
          <Bestseller />
        </section>
      </div>
    </>
  );
};

export default ManagerReport;
