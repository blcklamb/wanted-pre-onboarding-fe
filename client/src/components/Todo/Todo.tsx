import React, {useState, useEffect} from 'react'
import TodoForm from "./TodoForm";
import { TodoContainer, SignOutButton } from "./TodoForm.style"
import * as Api from "../../api/api"
import { TodoResponse } from '../../types/todo';
import Todos from './Todos';
import { useNavigate } from "react-router-dom";

function Todo() {
    const navigate = useNavigate();
    const [todos, setTodos] = useState<TodoResponse[]>([]);

    useEffect(() => {
        try{
            Api.Todo.getTodos().then((response) => setTodos(response))
        } catch (error:any) {
            return error.response.data
        }
    }, [])

    useEffect(() => {
        if(localStorage.getItem("userToken")==="undefined" || localStorage.getItem("userToken")=== null){
            console.log('no token')
            navigate("/")
            return;
        }
      }, [])

      const onSignOut = () => {
        localStorage.removeItem("userToken")
        localStorage.clear
        alert("Sign Out Completed")
        navigate("/")
      }

  return (
    <TodoContainer>
        <SignOutButton onClick={onSignOut}>Sign Out</SignOutButton>
        <TodoForm setTodos={setTodos}/>
        {todos.map((todo) => (
            <Todos
                key={todo.id}
                todoElement={todo}
                setTodos={setTodos}
            />
        ))}
    </TodoContainer>

  )
}

export default Todo;
