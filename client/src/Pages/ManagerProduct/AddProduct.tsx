import { useDispatch } from "react-redux";
import { formattedDate } from "../ManagerReport/ManagerReport";
import TinyMCEEditor from "./TinyMCEEditor";
import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import { addProduct } from "../../redux/Action/ProductAction";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BaseAxios from "../../api/axiosClient";

export function AddProduct() {
  // const [selectedFile, setSelectedFile] = useState<File | null>();
  // console.log("selectedFile: " ,selectedFile);
  const [images, setImages] = useState<any>([]);
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);
  const [descriptions, setDescriptions] = useState("");
  const dispatch = useDispatch();
  const productEdit = useSelector((state: any) => state.products.editProduct);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const type = useSelector((state: any) => state.products.type);
  console.log("type", type);

  useEffect(() => {
    if (productEdit) {
      setName(productEdit.name || "");
      setQuantity(productEdit.quantity || 0);
      setPrice(productEdit.price || 0);
      setSelected(productEdit.type || 0);
      setDescriptions(productEdit.description || "");
    }
    if (type === "Add") {
      setName("");
      setQuantity(0);
      setDescriptions("");
      setPrice(0);
      setSelected(0)
    }
  }, [productEdit]);
  function handleDescriptionChange(content: SetStateAction<string>) {
    setDescriptions(content);
  }
  const handleAvatarChange = (event: any) => {
    let listImages: any = []
    for (let i = 0; i < event.target.files.length; i++) {
      listImages.push(event.target.files[i])
    }
    setImages(listImages)
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (productEdit) {
      const updateProductt = {
        ...productEdit,
        name: name,
        quantity: quantity,
        price: price,
        categoryId: selected,
        description: descriptions,
        stock: true,
      };
      try {
        await BaseAxios.post(`/products/${productEdit.id}`, updateProductt)
        setName("");
        setQuantity(0);
        setDescriptions("");
        setPrice(0);
        navigate(-1); // Quay lại trang trước đó
      } catch (error) {
        console.error("Lỗi khi cập nhật sản phẩm:", error);
      }
    } else if (
      selected &&
      descriptions &&
      name &&
      price &&
      descriptions !== ""
    ) {
      const newProduct = {
        name: name,
        price: price,
        description: descriptions,
        categoryId: selected,
        stock: quantity,
      };
      const createProduct = await BaseAxios.post(`/products`, newProduct)
      console.log("createProduct", createProduct);
      if (createProduct?.status == 200) {
        const formData = new FormData();
        // Lặp qua mảng hình ảnh và thêm từng hình ảnh vào FormData 
        images.forEach((img: any) => {
          formData.append(`images`, img); // Tên trường sẽ là `images[0]`, `images[1]`,...
        });
        formData.append("productId", createProduct?.data?.return.id); // imageFile là File hoặc Blob của hình ảnh
        await BaseAxios.post("/images", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        })
      }
      setName("");
      setQuantity(0);
      setDescriptions("");
      setPrice(0);
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

        <form encType="multipart/form-data" style={{ padding: "0 15px 15px 15px" }}>
          {/* <div className="input-item">
            <label htmlFor="id">Mã sản phẩm</label>
            <input
              required
              value={id}
              id="id"    
              name="id"
              type="text"
              onChange={(e) => setId(e.target.value)}
            />
          </div>{" "} */}
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
              onChange={(e) => setSelected(Number(e.target.value))}
              name="images"
              id="type"

              required
            >
              <option value="">-- Loại --</option>
              <option value="1">Candle</option>
              <option value="2">Room mist</option>
              <option value="3">Room perfume</option>
              <option value="4">Bath bar</option>
            </select>
          </div>
          <div className="input-item">
            <label>Ảnh sản phẩm</label>
            <input
              type="file"
              multiple
              onChange={(handleAvatarChange)}
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
