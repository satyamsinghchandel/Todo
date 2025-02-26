import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { account, database } from "../appwrite/config";
import { useNavigate } from "react-router-dom";
import { Query } from "appwrite";

function Dashboard() {
  const Navigate  = useNavigate()
  
  
  let [email, setEmail] = useState("")
  let [name, setName] = useState("")
  const [todo, setTodo] = useState("")
  const [allTodo, setAllTodo] = useState([])
  useEffect(()=>{
    isLogin()
  }, [])
  useEffect(()=>{
    if(email)
    viewTodo()
  }, [email])

  const isLogin = async()=>{
    try{
      var x = await account.get("current")
      
      console.log(x)
      setEmail(x.email)
      setName(x.name)
      
    }
    catch(e){
      Navigate("/login")
    }
  }

  const logout = async()=>{
    try{
      var x = account.deleteSession("current")
      Navigate("/login")
    }
    catch(e){
      console.log(e)
    }
  }
  const addTodo = async()=>{
    if(todo===""){
      alert("enter some todo")
    }
    try{
      var x = await database.createDocument(import.meta.env.VITE_DATABASE_ID, import.meta.env.VITE_COLLECTION_ID, "unique()",{
        email:email,
        todo:todo
      })
      console.log(x)
      setTodo("")
      viewTodo()
    }
    catch(e){
      console.log(e)
    }
  }
  const viewTodo = async()=>{
    try{
    var x = await database.listDocuments(import.meta.env.VITE_DATABASE_ID, import.meta.env.VITE_COLLECTION_ID,[
      Query.equal('email',email)
    ])                                      
    console.log(x)
    setAllTodo(x.documents)
    }
    catch(e){
      console.log(e)
    }
  }

  const updatetodo = async(id)=>{
    try{
    var x = await database.updateDocument(
      import.meta.env.VITE_DATABASE_ID, 
      import.meta.env.VITE_COLLECTION_ID,
      id,
      {
      todo:"I have completed it"
      }
    )
    setAllTodo((prevTodos)=>
      prevTodos.map((todo)=>
        todo.$id===id?{...todo, todo: "I have completed it"}: todo
      )
    )
    console.log(x.documents)
    }
    catch(e){
      console.log(e)
    }
  }

  const deletetodo = async(id)=>{
    try{
      var x = await database.deleteDocument(import.meta.env.VITE_DATABASE_ID,
        import.meta.env.VITE_COLLECTION_ID,
        id
      )
      setAllTodo((prevTodos)=> 
        prevTodos.filter((todo) => 
          todo.$id !==id))
      console.log(x)
    }
    catch(e){
      console.log(e)
    }
  }
  return (
    <div className="dashboard-container">
      {email && name?<>
      <div className="dashboard-content">
        <h1>Welcome : {name}</h1>
        <p>Email: {email}</p>
        <button className="logout-button" onClick={logout}>
          Logout
        </button>
        <br />
        <br />
        <input placeholder="add your todo" value={todo} onChange={(e)=>{
          setTodo(e.target.value)
        }}/>
        <button onClick = {addTodo}>Add Todo</button>
        <br />
        <br/>
        {allTodo!=[]?<div>
          {
            allTodo.map((e)=>{
              return(
                <>
              <p>{e.todo}</p>
              <button onClick={()=>{
                updatetodo(e.$id)
              }}>update</button>
              
              <button onClick={()=>{
                deletetodo(e.$id)
              }}>delete</button>
              <br />
              <br />
              </>
            )
            })
          }
        </div>: 
        <></>}
      </div>
      
      <br />
      
      </> : <>
       <h1>Loading...</h1>
      </>
      }  
    </div>
  );
};

export default Dashboard;
