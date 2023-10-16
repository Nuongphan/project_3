import { useState, useEffect } from "react"
import axios from "axios"
import apiService from "../../service/apiService"
const ResetPassword = () => {
    const [code, setCodeReset] = useState("")
    const [password, setPassword] = useState("")
    
    // kiểm tra thử đã sử dụng được apiService chưa 
    apiService.get("/user").then((res)=> console.log(res.data))
    const handleSubmit = async () => {
        if (password !== "" && code !== "") {
            await apiService.post("/user/resetpassword", {code,password})
            // axios.post("http://localhost:8000/user/resetpassword", { password, codeInput }).then((res) =>
            //     console.log(res)).catch((err) => console.log(err)
            //     )
        }
    }
    return <>
        <input value={code} placeholder="Code ResetPassword" onChange={(e) => setCodeReset(e.target.value)} type="text"></input>
        <input value={password} placeholder="Newpassword" onChange={(e) => setPassword(e.target.value)} type="text" >
        </input>
        <button onClick={handleSubmit}> submit</button>
    </>
}
export default ResetPassword