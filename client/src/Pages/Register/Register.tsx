import { ChangeEvent, FormEvent, ReactEventHandler, useEffect, useState } from "react";
import styles from "../../User.module.css";
import axios from "axios";
const Register =  () => {
  const regex = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/i;
  const [error, setError] = useState<any>("");
  const [selectedFile, setSelectedFile] = useState<File| null>(null); 
  const [repeatpassword, setRepeatPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  useEffect(  () => {
   const getData= async () => {
    await axios.get("http://localhost:8000/user")
    .then((response) => {
        console.log("data", response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      })} 
  }, []);
  const handleAvatarChange = (event:ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };
  const filterEmail = data?.map((item:any) => item?.email);
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const checkError = await handleValidate();
    setError(checkError);
    if (
      !checkError.email &&
      !checkError.password &&
      !checkError.fullName &&
      !checkError.repeatPassword
    ) {
      const user = {
        fullName: fullName,
        email: email,
        password: password,
       avatar:  selectedFile,
       repeatpassword: repeatpassword
      }
      console.log("user", user);
      
    await  axios.post("http://localhost:8000/user/register", user, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    }
    )
    .then(response => response)
    .catch((err)=> console.log("error", err)
    );
      setFullName(""),
      setEmail(""),
      setPassword(""),
      setRepeatPassword("");
      alert("success");
      return ""
    }
  }
  function handleValidate() {
    const newError: any = {};
    if (!email.trim()) {
      newError.email = "Email is required";
    } else if (filterEmail.find((item: string) => item === email)) {
      newError.email = "Email already exists";
    } else if (!regex.test(email)) {
      newError.email = "Invalid email";
    }
    if (!password.trim()) {
      newError.password = "Password is required";
    } else if (password.trim().length < 8) {
      newError.password = "Password must be at least 8 characters long";
    } else if (password !== repeatpassword) {
      newError.password = "Passwords do not match";
      newError.repeatPassword = "Passwords do not match";
    }
    if (!repeatpassword.trim()) {
      newError.repeatPassword = "Repeatpassword is required";
    }
    if (!fullName.trim()) {
      newError.lastName = "Full Name is required";
    }
    return newError}
  useEffect(() => {
    handleSubmit;
  }, [error]);
  return (
    <div style={{ width: "350px", display: "block", margin: "0 auto" }}>
      <form onSubmit={handleSubmit} className={styles.formRegister}>
        <h3>REGISTER</h3>
        <p>Please fill in the information below:</p>
        <input
          onChange={(e) => setFullName(e.target.value)}
          value={fullName}
          name="fullName"
          type="text"
          placeholder="full name"
          id="full-name"
        />
        <p className={styles.renderError}>{error.fullName}</p>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name="email"
          type="email"
          placeholder="Email"
          id="email"
        />
        <p className={styles.renderError}>{error.email}</p>
        <label className="error" id="error-email"></label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name="password"
          type="password"
          placeholder="Password"
          id="password"
        />
        <p className={styles.renderError}>{error.password}</p>

        <input
          onChange={(e) => setRepeatPassword(e.target.value)}
          value={repeatpassword}
          type="password"
          placeholder="Repeat password"
          id="repeat-password"
        />
        <p className={styles.renderError}>{error.repeatPassword}</p>
        <input placeholder="Chọn ảnh đại diện" className={styles.upload}  type="file" onChange={handleAvatarChange} />
        <input  type="submit" value="CREATE MY ACCOUNT" />
      </form>
    </div>
  );
}

export default Register;
