import { useDispatch } from "react-redux";
import { formattedDate } from "../ManagerReport/ManagerReport";
import TinyMCEEditor from "./TinyMCEEditor";
import { SetStateAction, useEffect, useState } from "react";
import { addProduct } from "../../redux/Action/ProductAction";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function AddProduct() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");
  const [descriptions, setDescriptions] = useState("");
  const dispatch = useDispatch();
  const productEdit = useSelector((state: any) => state.products.editProduct);
  const [imageInput1, setImageInput1] = useState("");
  const [imageInput2, setImageInput2] = useState("");
  const [imageInput3, setImageInput3] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const type = useSelector((state: any) => state.products.type);
  useEffect(() => {
    if (productEdit) {
      setId(productEdit.id || "");
      setName(productEdit.name || "");
      setQuantity(productEdit.quantity || 0);
      setPrice(productEdit.price || 0);
      setSelected(productEdit.type || "");
      setImageInput1(productEdit.image[0] || "");
      setImageInput2(productEdit.image[1] || "");
      setImageInput3(productEdit.image[2] || "");
      setDescriptions(productEdit.description || "");
    }
    if (type === "Add") {
      setId("");
      setName("");
      setQuantity(0);
      setDescriptions("");
      setPrice(0);
      setImageInput1("");
      setImageInput2("");
      setImageInput3("");
    }
  }, [productEdit]);

  function handleDescriptionChange(content: SetStateAction<string>) {
    setDescriptions(content);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (productEdit) {
      const updateProductt = {
        ...productEdit,
        name: name,
        quantity: quantity,
        price: price,
        type: selected,
        description: descriptions,
        image: [imageInput1, imageInput2, imageInput3],
        feedback: [],
        totalRating: 0,
        status: true,
      };
      try {
        await axios.patch(
          `http://localhost:8080/proucts/${id}`,
          updateProductt
        );
        setId("");
        setName("");
        setQuantity(0);
        setDescriptions("");
        setPrice(0);
        setImageInput1("");
        setImageInput2("");
        setImageInput3("");
        navigate(-1); // Quay lại trang trước đó
      } catch (error) {
        console.error("Lỗi khi cập nhật sản phẩm:", error);
      }
    } else if (
      selected &&
      descriptions &&
      imageInput1 &&
      imageInput2 &&
      imageInput3 &&
      id &&
      name &&
      price &&
      descriptions !== ""
    ) {
      const newProduct = {
        id: id,
        name: name,
        quantity: quantity,
        price: price,
        description: descriptions,
        type: selected,
        image: [imageInput1, imageInput2, imageInput3],
        feedback: [],
        totalRating: 0,
        status: true,
        totalReview: 0,
        bestsellers: 0
      };
      dispatch(addProduct(newProduct));   
      setId("");
      setName("");
      setQuantity(0);
      setDescriptions("");
      setPrice(0);
      setImageInput1("");
      setImageInput2("");
      setImageInput3("");
    } else {
      alert("Please enter form");
    }
  }

  return (
    <div className="container">
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
        <p>Thêm sản phẩm</p>
        <p>{formattedDate} </p>
      </div>
      <section
        style={{
          width: "95%",
          backgroundColor: "#FFFFFF",
          borderRadius: "5px",
          padding: "20px 6px 20px 6px",
        }}
      >
        <p
          style={{
            margin: "0 15px 15px 15px",
            fontWeight: "bolder",
            borderBottom: "3px solid #ffd43b",
            paddingBottom: "14px",
          }}
        >
          Tạo mới sản phẩm
        </p>

        <form style={{ padding: "0 15px 15px 15px" }}>
          <div className="input-item">
            <label htmlFor="id">Mã sản phẩm</label>
            <input
              required
              value={id}
              id="id"
              name="id"
              type="text"
              onChange={(e) => setId(e.target.value)}
            />
          </div>{" "}
          <div className="input-item">
            <label htmlFor="name">Tên sản phẩm</label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              id="name"
              name="name"
              type="text"
              required
            />
          </div>
          <div className="input-item">
            <label htmlFor="quantity">Số lượng </label>
            <input
              onChange={(e) => setQuantity(Number(e.target.value))}
              value={quantity}
              id="quantity"
              name="quantity"
              type="number"
              required
            />
          </div>
          <div className="input-item">
            <label htmlFor="price">Gía sản phẩm</label>
            <input
              onChange={(e) => setPrice(Number(e.target.value))}
              value={price}
              id="price"
              name="price"
              type="number"
              required
            />
          </div>
          <div className="input-item">
            <label htmlFor="type">Danh mục</label>
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              name="type"
              id="type"
              required
            >
              <option value="">-- Loại --</option>
              <option value="CANDLE">Candle</option>
              <option value="ROOM PERFUME">Room perfume</option>
              <option value="ROOM MIST">Room mist</option>
              <option value="BATH BAR">Bath bar</option>
            </select>
          </div>
          <div className="input-item">
            <label>Ảnh sản phẩm</label>
            <input
              onChange={(e) => setImageInput1(e.target.value)}
              value={imageInput1}
              type="text"
              required
            />
            <input
              onChange={(e) => setImageInput2(e.target.value)}
              value={imageInput2}
              type="text"
              required
            />
            <input
              onChange={(e) => setImageInput3(e.target.value)}
              value={imageInput3}
              type="text"
              required
            />
          </div>
          <div style={{ marginBottom: "20px" }} className="input-item">
            <label htmlFor="">Mô tả sản phẩm</label>
            <TinyMCEEditor
              value={descriptions}
              onChange={handleDescriptionChange}
            />
          </div>
          <input
            style={{
              width: "80px",
              height: "35px",
              border: "none",
              color: "#fff",
              backgroundColor: "#333",
              display: "block",
              margin: "0 auto",
              letterSpacing: "1px",
              borderRadius: "5px",
            }}
            type="submit"
            value="Submit"
            name={productEdit ? "Edit" : "Create"}
            onClick={handleSubmit}
          />
        </form>
      </section>
    </div>
  );
}
