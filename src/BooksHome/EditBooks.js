import React, { useState } from 'react'
import {useNavigate,Link} from "react-router-dom"

const EditBooks = ({x,setShowonebook}) => {
    // const Navigate=useNavigate()
  const[edit,setEdit]=useState(false);

    function updatebookdata(e){
        e.preventDefault()
        let currentvalue=e.target.value
        if(currentvalue==="Edit"){
          setEdit(true)
        }else{
          fetch(`http://localhost:3000/books/${x[0]._id}`,{
                          method:"PUT",
                          body:JSON.stringify(data),
                          headers: {'Content-Type': 'application/json'}
                      }).then((res)=>res.json()).then((result)=>{
                              // console.log("updated book ==> ",result)
                              if(result){
                                setShowonebook({})
                                // Navigate("/books/home")
                              }
                      })

        }
    
    }
    function deletebookdata(e){
      e.preventDefault()
      fetch(`http://localhost:3000/books/${x[0]._id}`,{
        method:"Delete",
    }).then((res)=>res.json()).then((result)=>{
          console.log("delete res",result)
            if(result.status=="success"){
              setShowonebook({})
            }
    })
    }
    
  const [data,setdata]=useState({
    title:x[0].title,
    isbn:x[0].isbn,
    author:x[0].author,
    description:x[0].description,
    publisheddate:x[0].publisheddate,
    publisher:x[0].publisher
})
function processingdata(e){
    let updated={...data}
    updated[e.target.name]=e.target.value
    setdata(()=>updated)
}
function avoidprevent(e){
  e.preventDefault()

}
const {title,isbn,author,description,publisheddate,publisher}=data

  return (
    <div>
        <Link to="/books/home"><button>show booklist</button></Link>
        <h2> Book details</h2>
    <form onSubmit={(e)=>avoidprevent(e)}>
        <input readOnly={!edit} value={title} onChange={(e)=>processingdata(e)}  type={"text"} name={"title"} placeholder="title"/>
        <input readOnly={!edit} value={isbn} onChange={(e)=>processingdata(e)} type={"text"} name={"isbn"}  placeholder="isbn"/>
        <input readOnly={!edit} value={author} onChange={(e)=>processingdata(e)} type={"text"} name={"author"}  placeholder="author"/>
        <input readOnly={!edit} value={description} onChange={(e)=>processingdata(e)}  type={"text"} name={"description"} placeholder="description"/>
        <input readOnly={!edit} value={publisheddate} onChange={(e)=>processingdata(e)} type={"text"} name={"publisheddate"}  placeholder="publisheddate"/>
        <input readOnly={!edit} value={publisher} onChange={(e)=>processingdata(e)} type={"text"} name={"publisher"}  placeholder="publisher"/>
        {!edit&& <input type={"submit"} onClick={(e)=>deletebookdata(e)}   value="Delete"/>}
        <input type={"submit"}  onClick={(e)=>updatebookdata(e)} value={edit?"Update":"Edit"}/>
    </form>

    </div>
  )
}

export default EditBooks