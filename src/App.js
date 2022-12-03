import './App.css';
import React from 'react';
import Signup from './signup/Signup';
import Login from './login/Login';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import BooksHome from './BooksHome/BooksHome';
import AddBooks from "./BooksHome/AddBooks";
// import EditBooks from "./BooksHome/EditBooks"
import UseAuth from './useAuth/UseAuth';
function App() {
  return (
    <div className="App">
  <BrowserRouter>
  <Routes>
    <Route path="/signup" element={  <Signup/>}>
    </Route>
    <Route path="/login" element={  
           <UseAuth>
             <Login/>
         </UseAuth>

    }>
    </Route>
    <Route path="/books/home" element={ 
       <UseAuth>
       <BooksHome/>
       </UseAuth>
       }>
    </Route>
    <Route path="/books/create" element={  <AddBooks/>}>
    </Route>
    {/* <Route path="/books/edit" element={  <EditBooks/>}>
    </Route> */}
  </Routes>
  
  </BrowserRouter>
    </div>
  );
}

export default App;
