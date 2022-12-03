import React ,{useState} from 'react'
import {useNavigate,Link} from "react-router-dom"
import { AuthConsumer } from '../useAuth/UseAuth'

const Login = () => {
    const [data,setdata]=useState({
        name:"",
        password:"",
        error:"",
    })
    const Navigate=useNavigate()
    let values=AuthConsumer()

    function processingdata(e){
        let updated={...data}
        updated[e.target.name]=e.target.value
        setdata(()=>updated)
    }
function loginuser(e){
    e.preventDefault()
    let tobesenddata={
        name:data.name,
        password:data.password
    }
    fetch("http://localhost:3000/login",{
        method:"POST",
        body:JSON.stringify(tobesenddata),
        headers: {'Content-Type': 'application/json'}
    }).then((res)=>res.json()).then((result)=>{
            if(result.status=="fail"){
                let updated={...data}
                updated["error"]=result.message
                setdata(()=>updated)
            }else{
                values.setaccestoken(result.status)
                Navigate("/books/home")
            }

    })

}
    const {name,password,error}=data
    return (
        <div>
            <h2>Login</h2>
        <form onSubmit={(e)=>loginuser(e)}>
            <input value={name} onChange={(e)=>processingdata(e)}  type={"text"} name={"name"} placeholder="name"/>
            <input value={password} onChange={(e)=>processingdata(e)} type={"password"} name={"password"}  placeholder="password"/>
            <input type={"submit"} value="Login"/>
        </form>
            {error?.length !==0 && <p>{error}</p>}
            <Link to="/signup"><button>Signup</button></Link>
        </div>
      )
}

export default Login