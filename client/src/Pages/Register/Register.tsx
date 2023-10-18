import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "../../User.module.css";
import axios from "axios";
const Register = () => {
  const regex = /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/i;
  const [error, setError] = useState<any>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [repeatpassword, setRepeatPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorData, setErrorData] = useState("");
  console.log("7654323456", errorData);

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };
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
        avatar: selectedFile,
        repeatpassword: repeatpassword
      }
      await axios.post("http://localhost:8000/user/register", user, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      }
      )
        .then(response => {
          console.log("response", response);
        })
        .catch((err) => {
          setErrorData(err.response.data.msg)
          console.log("error", err)
        }
        );
      setFullName(""),
        setEmail(""),
        setPassword(""),
        setRepeatPassword("");
      alert("success");
    }
  }
  function handleValidate() {
    const newError: any = {};
    if (!email.trim()) {
      newError.email = "Email is required";
    }
     else if (errorData) {
      newError.email = "Email already exists";
    } 
    else if (!regex.test(email)) {
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
    return newError
  }
  useEffect(() => {
    handleSubmit;
  }, [error]);
  return (
    <div style={{ width: "350px", display: "block", margin: "0 auto" }}>
      <form onSubmit={handleSubmit} className={styles.formRegister}>
        <h3>REGISTER</h3>
        <p>Please fill in the information below:</p>
        <div className={styles.inputRegister}><input
          onChange={(e) => setFullName(e.target.value)}
          value={fullName}
          name="fullName"
          type="text"
          placeholder="full name"
          id="full-name"
        />
          <p className={styles.renderError}>{error.fullName}</p></div>
        <div className={styles.inputRegister}> <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name="email"
          type="email"
          placeholder="Email"
          id="email"
        />
          <p className={styles.renderError}>{error.email}</p></div>
        <div className={styles.inputRegister}><input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          name="password"
          type="password"
          placeholder="Password"
          id="password"
        />
          <p className={styles.renderError}>{error.password}</p></div>
        <div className={styles.inputRegister}>
          <input
            onChange={(e) => setRepeatPassword(e.target.value)}
            value={repeatpassword}
            type="password"
            placeholder="Repeat password"
            id="repeat-password"
          />
          <p className={styles.renderError}>{error.repeatPassword}</p></div>
        <input placeholder="Chọn ảnh đại diện" className={styles.upload} type="file" onChange={handleAvatarChange} />
        <input type="submit" value="CREATE MY ACCOUNT" />
      </form>
    </div>
  );
}

export default Register;
