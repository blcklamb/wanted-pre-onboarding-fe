import React, { useEffect, useState } from 'react';

import * as Api from '../../api/api';
import {
  TodoFormContainer,
  TodoCreateContainer,
  TodoCreateButton,
  TodoFormInput,
} from './TodoForm.style';

function TodoForm({ setTodos }: any) {
  const [newTodo, setNewTodo] = useState('');

  const onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value },
    } = event;
    setNewTodo(value);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    if (newTodo === '') {
      return;
    }
    try {
      await Api.Todo.createTodo({ todo: newTodo });
    } catch (error: any) {
      return error.response.data;
    }
    try {
      await Api.Todo.getTodos().then(response => setTodos(response));
    } catch (error: any) {
      return error.response.data;
    }
    setNewTodo('');
  };

  return (
    <>
      <TodoFormContainer onSubmit={handleSubmit}>
        <TodoCreateContainer>
          <TodoFormInput
            type="text"
            name="NewTodo"
            placeholder="Thing to Do"
            required
            value={newTodo}
            onChange={onChange}
          />
          <TodoCreateButton type="submit">Enter</TodoCreateButton>
        </TodoCreateContainer>
      </TodoFormContainer>
    </>
  );
}

export default TodoForm;
