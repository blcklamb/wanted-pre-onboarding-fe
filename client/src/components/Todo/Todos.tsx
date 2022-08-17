import React, { useEffect, useState } from "react";
import * as Api from "../../api/api";
import {
  TodoEditForm,
  TodoFormContainer,
  TodoList,
  TodoListLi,
  TodoListContainer,
  TodoSubmitButton,
  TodoFormInput,
  TodoFormSubmit,
  TodoCreateContainer,
} from "./TodoForm.style";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { isNamedExportBindings } from "typescript";


function Todos({todoElement, setTodos}:any) {
  const [editing, setEditing] = useState(false)
  const [updateTodo, setUpdateTodo] = useState(todoElement.todo)
  const toggleEditing = () => setEditing(current => !current)
  
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { target: {value},} = event
    setUpdateTodo(value)
  }
  const onUpdate:React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()

    console.log('going to', updateTodo)
    try{
      await Api.Todo.updateTodo({id: todoElement.id, todo: updateTodo, isCompleted: todoElement.isCompleted})
    } catch (error:any){
      return error.response.data
    }

    await Api.Todo.getTodos().then((response) => setTodos(response))
    setEditing(false)

  }
  const onDelete = async () => {
    const ok = window.confirm("Do you want to delete this todo?")

    if (ok) {
      await Api.Todo.deleteTodo({id: todoElement.id})
    }
    await Api.Todo.getTodos().then((response) => setTodos(response))
    setEditing(false)

  }
  return (
    <>
    <TodoListContainer>
      {editing ? (
        <>
          <TodoFormContainer onSubmit={onUpdate}>
            <TodoCreateContainer>
          <TodoFormInput
          onChange={onChange}
          value={updateTodo}
          autoFocus
          name="UpdateTodo"
          required
          placeholder="Update your todo"
          />
          <TodoFormSubmit type="submit">Update</TodoFormSubmit>
          <TodoFormSubmit >Cancel</TodoFormSubmit>
            
          </TodoCreateContainer>
          </TodoFormContainer>
          

        </>
      ):(
<TodoList>
        <TodoListLi>{todoElement.todo}</TodoListLi>
      <TodoSubmitButton onClick={toggleEditing}>
      <FontAwesomeIcon icon={faPencilAlt}/>
      </TodoSubmitButton>
      <TodoSubmitButton onClick={onDelete}>
        <FontAwesomeIcon icon={faTrash}/>
      </TodoSubmitButton>
      </TodoList>
      )}
      
    </TodoListContainer>
      
    </>
  );
}

export default Todos;
