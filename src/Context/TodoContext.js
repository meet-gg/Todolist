import { useContext } from "react";
import { createContext } from "react";

export const TodoContext=createContext({
    todos: [
        {
            id: 1,
            todo: " Todo msg",
            completed: false,
        }
    ],
    addTodo: (todo) => {},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {},
    updateTodo: (id, todo) => {}
})

export const TodoProvider=TodoContext.Provider

export const useTodo=()=>{
    return useContext(TodoContext)
}