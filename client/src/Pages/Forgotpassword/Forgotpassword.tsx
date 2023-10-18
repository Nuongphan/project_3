import { useState } from "react"
import axios from "axios"
import styles from "../../User.module.css"
import { useNavigate } from "react-router-dom"
import instance from "../../api/axiosInstance"
const ForgotPassword = () => {
    const navigate = useNavigate()
    const [nameInput, setNameInput] = useState("")
    const [notication, setNotication] = useState("")
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        instance.post("http://localhost:8000/user/forgotpassword", {
            email: nameInput
        }).then((data) => {
            console.log("data", data);
            setNotication(data.data.msg)
            navigate("/auth/resetpassword")
        }).catch((error) => setNotication(error.response.data.msg));
    }
    return <>
        <div style={{ width: "350px", display: "block", margin: "0 auto" }}>
            <form className={styles.formLogin} action="">
                <h1>SEND EMAIL</h1>
                <p>Please enter your e-mail:</p>
                <div className={styles.inputLogin}><input value={nameInput} onChange={e => setNameInput(e.target.value)} placeholder="email" type="email"
                />
                    <p className={styles.renderErrorr}>{notication} </p></div>
                <button className={styles.btnForgotPassword} onClick={handleSubmit}>SENT</button>
            </form>
        </div>
    </>
}
export default ForgotPassword