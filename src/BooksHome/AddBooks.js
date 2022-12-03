import React, { useState } from 'react'
import {useNavigate,Link} from "react-router-dom"

const AddBooks = () => {
    const Navigate=useNavigate()

    function postbookdata(e){
        e.preventDefault()
             fetch("http://localhost:3000/books",{
                method:"POST",
                body:JSON.stringify(data),
                headers: {'Content-Type': 'application/json'}
            }).then((res)=>res.json()).then((result)=>{
                    console.log("updated book ==> ",result)
                    if(result){
                      Navigate("/books/home")
                    }

            })
    
    }

  const [data,setdata]=useState({
    title:"",
    isbn:"",
    author:"",
    description:"",
    publisheddate:"",
    publisher:""
})
function processingdata(e){
    let updated={...data}
    updated[e.target.name]=e.target.value
    setdata(()=>updated)
}
const {title,isbn,author,description,publisheddate,publisher}=data

  return (
    <div>
          <Link to="/books/home"><button>show booklist</button></Link>
        <h2>Add Book</h2>
    <form onSubmit={(e)=>postbookdata(e)}>
        <input value={title} onChange={(e)=>processingdata(e)}  type={"text"} name={"title"} placeholder="title"/>
        <input value={isbn} onChange={(e)=>processingdata(e)} type={"text"} name={"isbn"}  placeholder="isbn"/>
        <input value={author} onChange={(e)=>processingdata(e)} type={"text"} name={"author"}  placeholder="author"/>
        <input value={description} onChange={(e)=>processingdata(e)}  type={"text"} name={"description"} placeholder="description"/>
        <input value={publisheddate} onChange={(e)=>processingdata(e)} type={"text"} name={"publisheddate"}  placeholder="publisheddate"/>
        <input value={publisher} onChange={(e)=>processingdata(e)} type={"text"} name={"publisher"}  placeholder="publisher"/>
        <input type={"submit"} value="Submit"/>
    </form>
    </div>
  )
}

export default AddBooks