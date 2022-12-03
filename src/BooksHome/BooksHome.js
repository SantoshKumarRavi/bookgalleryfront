import React, { useEffect, useState } from 'react'
import {Link,useNavigate} from "react-router-dom"
import EditBooks from "../BooksHome/EditBooks"
import { AuthConsumer } from '../useAuth/UseAuth'

const BooksHome = () => {
  const[booksdata,setBooksdata]=useState({})
  const [showonebook,setShowonebook]=useState({})
  const Navigate=useNavigate()
  let values=AuthConsumer()
  const[access,setaccess]=useState({})
  console.log("auth values in access===>" , access)
  function showparticularbook(e){
        const id=(e.target.id)
    let filteredbook=[...booksdata?.data]
    console.log("brfeore fileter book ===>",filteredbook)

    filteredbook=filteredbook.filter((ele)=>{
      if(ele._id===id){
        return  1
      }
    })
    console.log("after fileter book ===>",filteredbook)
    setShowonebook(()=>{
      return {
        data:filteredbook
      }
    })
    // Navigate("/books/edit")
    
  }

  useEffect(()=>{ 
    fetch("http://localhost:3000/books").then((x)=>x.json())
      .then((fetcheddata)=>{
        console.log("fwetched data===>",fetcheddata)
        setBooksdata(()=>{
          return {
            data:fetcheddata.bookdata
          }
        })
      })
  },[showonebook])
useEffect(()=>{

setaccess(()=>{
  return {
    token:values?.accesstoken
  }
  })
if(access?.token==""){
  console.log("log out not authen")
  Navigate("/login")
}
},[])
function logout (){
    console.log("clicked logout")
    // values.setaccestoken("")
    setaccess({})
    Navigate("/login")

  }

  return (
    <div>
    <button onClick={()=>logout()}>Logout</button>
    <Link to="/books/create"><button>Add books</button></Link>
      { !showonebook?.data &&
        booksdata?.data?.map((x,i)=><div id={x._id} onClick={(e)=>showparticularbook(e)} key={i}>{x.title}</div>)
      }
      {
        showonebook?.data &&(<EditBooks x={showonebook?.data} setShowonebook={setShowonebook} />)
      }

    </div>
  )
}

export default BooksHome