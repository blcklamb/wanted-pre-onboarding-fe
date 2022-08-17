import React, { useEffect, useState } from "react";
import * as Api from "../../api/api";
import {
  TodoFormContainer,
  TodoList,
  TodoListLi,
  TodoListContainer,
  TodoSubmitButton,
  TodoFormInput,
  TodoFormSubmit,
  TodoCreateContainer,
  TodoCheckBox,
} from "./TodoForm.style";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons'

function Todos({todoElement, setTodos}:any) {
  const [editing, setEditing] = useState(false)
  const [updateTodo, setUpdateTodo] = useState(todoElement.todo)
  const [completeCheck, setCompleteCheck] = useState<boolean>(todoElement.isCompleted)

  const toggleEditing = () => setEditing(current => !current)
  
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { target: {value},} = event
    setUpdateTodo(value)
  }
  const onUpdate:React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    try{
      await Api.Todo.updateTodo({id: todoElement.id, todo: updateTodo, isCompleted: todoElement.isCompleted})
    } catch (error:any){
      return error.response.data
    }
    try {
      await Api.Todo.getTodos().then((response) => setTodos(response))
    } catch (error:any) {
      return error.response.data
    }
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

  const toggleCheck = async () => setCompleteCheck(current => !current)

  const checkCompleted: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault()
    await toggleCheck()
    try {
      await Api.Todo.updateTodo({id: todoElement.id, todo: todoElement.todo, isCompleted: !todoElement.isCompleted})
    } catch (error:any) {
      return error.response.data
    }
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
  {!completeCheck ? (
    <>
    <TodoCheckBox onClick={checkCompleted} ></TodoCheckBox>
    <TodoListLi>{todoElement.todo}</TodoListLi>
    </>
  ):(<>
  <TodoCheckBox onClick={checkCompleted} style={{background:"green"}}></TodoCheckBox>
  <TodoListLi><s>{todoElement.todo}</s></TodoListLi>
  </>)}
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
