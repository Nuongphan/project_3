import { Link, useNavigate } from "react-router-dom";
import styles from "../../User.module.css";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<any>("");

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (email !== "" && password !== "") {
      const userLogin = {
        email: email,
        password: password
      }
      axios.post("http://localhost:8000/user/login", userLogin).then((data) => {
        localStorage.setItem("token", data.data.accessToken)
        localStorage.setItem("username", JSON.stringify(data.data.data))
        setEmail("");
        setPassword("");
        setError({ email: "", password: "" });
        navigate("/")
      }).catch((error) => {
        setError({
          email: "Email or password is not match",
          password: "Email or password is not match",
        });
        console.log(error)
      });
    }
  }

  return (
    <div style={{ width: "350px", display: "block", margin: "0 auto" }}>
      <form onSubmit={handleLogin} action="" className={styles.formLogin}>
        <h1>LOG IN</h1>
        <p>Please enter your e-mail and password:</p>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          id="email"
        />
        <p className={styles.renderError}> {error.email}</p>
        <label className="error" id="error-email-login"></label>
        <input
          className={styles.lastinput}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          id="password"
        /><Link to=""><span className={styles.forgotpassword}>Forgot Password</span></Link>
        <p className={styles.renderError}> {error.password}</p>
        <label className="error" id="error-password-login"></label>
        <input className={styles.btnLogin} type="submit" value="LOGIN" />
        <p>
          Don't have an account? <Link to="/auth/register">Create one</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
