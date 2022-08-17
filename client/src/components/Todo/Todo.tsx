import React, {useState, useEffect} from 'react'
import TodoForm from "./TodoForm";
import { TodoContainer } from "./TodoForm.style"
import * as Api from "../../api/api"
import { TodoResponse } from '../../types/todo';
import Todos from './Todos';
import { useNavigate } from "react-router-dom";

function Todo() {
    const navigate = useNavigate();
    const [todos, setTodos] = useState<TodoResponse[]>([]);

    useEffect(() => {
        Api.Todo.getTodos().then((response) => setTodos(response))
    }, [])

    useEffect(() => {
        if(!localStorage.getItem("userToken")){
            console.log('no token')
            navigate("/")
            return;
        }
      }, [])

  return (
    <TodoContainer>
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
