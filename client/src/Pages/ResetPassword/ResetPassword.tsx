import { useState, useEffect } from "react"
import axios from "axios"
import styles from "../../User.module.css"
import instance from "../../api/axiosInstance"
import { useNavigate } from "react-router-dom"
// import axiosInstance from '../../api/axiosInstance';
const ResetPassword = () => {
    const [code, setCodeReset] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [statusError, setStatusError] = useState(0)
    const [errorPassword, setErrorPassword] = useState("")
    const navigate=useNavigate()
    // kiểm tra thử đã sử dụng được apiService chưa 
    // apiService.get("/user").then((res) => console.log(res.data))
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
            await instance.post("http://localhost:8000/user/resetpassword", { password, code })
                .then((res) =>
                    console.log(res))
                .catch((err) =>{ 
                    if(err.response.data.status===500) {
                    setStatusError(500)}
                    setStatusError(400)
                    console.log(err)}
                )
                if(!password) {
                    setErrorPassword("Password is required")
                }
                navigate("/auth")
    }
    return <>
        <div style={{ width: "350px", display: "block", margin: "0 auto" }}>
            <form action="" className={styles.formLogin}>
                <h1>RESET PASSWORD</h1>
                <p>Please enter your code and new password:</p>
                <div className={styles.inputLogin}><input
                    placeholder="Code"
                    value={code}
                    onChange={(e) => setCodeReset(e.target.value)}
                />
                    {statusError === 400 && <p className={styles.renderErrorrr}>Invalid reset code</p>}</div>
                <div className={styles.inputLogin}><input
                    className={styles.lastinputt}
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                    <p className={styles.renderErrorrr}>{errorPassword}</p></div>
                <button className={styles.btnForgotPassword} onClick={handleSubmit} > Reset </button>

            </form>
        </div>
    </>
}
export default ResetPassword