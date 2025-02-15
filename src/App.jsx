import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { TodoProvider } from './Context/TodoContext'
import TodoForm from './Component/TodeForm'
import TodoItem from './Component/TodoItem'

function App() {
  const [todos, setTodos] = useState([])
  const addTodo=(todo)=>{
    setTodos((prev)=>[{id:Date.now(),...todo},...prev])
  }
  const deleteTodo=(id)=>{
    setTodos((prev)=>prev.filter((todo)=>todo.id!==id))
  }
  const updateTodo=(id,todo)=>{
    // console.log(todo)
    setTodos((prev)=>prev.map((prevtodo)=>prevtodo.id===id?todo : prevtodo))
  }

  const toggleComplete=(id)=>{
    setTodos((prev)=>prev.map((prevtodo)=>
    prevtodo.id===id ? {...prevtodo,completed: !prevtodo.completed}:prevtodo
    ))
  }

  useEffect(()=>{
    const todos=JSON.parse(localStorage.getItem("todos"))

    if(todos && todos.length>0){
      setTodos(todos)
    }
  },[])

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])

  return (
    <TodoProvider value={{todos,addTodo,deleteTodo,toggleComplete,updateTodo}}>
      <div className="bg-[url('https://images.unsplash.com/photo-1710503915593-9801b71740fc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]  bg-cover bg-center h-screen w-screen fixed top-0 left-0 flex items-center justify-center">
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 tex t-white">
              <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
              <div className="mb-4">
                  <TodoForm/> 
              </div>
              <div className="flex flex-wrap gap-y-3">
                  {todos.map((todo)=>(
                    <div key={todo.id}  className='w-full'>
                      <TodoItem todo={todo}/>
                    </div>
                  ))}
              </div>
          </div>
        </div>
    </TodoProvider>
  )
}

export default App
