import styled from "styled-components";

export const TodoContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export const TodoFormContainer = styled.form`
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
`;

export const TodoCreateContainer = styled.div`
    display: flex;
    width:100% ;
    max-width: 320px;
    flex-direction: row;
    justify-content: center ;
`

export const TodoCreateButton = styled.button`
  max-width: 60px;
  width: 100%;
  padding: 10px;
  border-radius: 30px;
  margin-bottom: 10px;
  margin-left: 10px;
  font-size: 12px;
  text-align: center;
  color: black;
  margin-top: 20px;
  cursor: pointer;
`;

export const TodoListContainer = styled.div`
    display: flex;
    width:100% ;
    max-width: 320px;
    flex-direction: column;
    justify-content: center ;
`
export const TodoList = styled.div`
    display: flex;
    flex-direction: row;
    font-size: 18px ;
    align-items: center;
`

export const TodoListLi = styled.li`
    font-size: 18px ;
    margin: 8px;
`

export const TodoFormInput = styled.input`
  max-width: 320px;
  width: 100%;
  padding: 10px;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 1);
  margin-bottom: 10px;
  margin-top: 20px;
  font-size: 12px;
  color: black;
`;

export const TodoFormSubmit = styled.button`
  max-width: 320px;
  width: 100%;
  padding: 10px;
  border-radius: 30px;
  margin-bottom: 10px;
  font-size: 12px;
  text-align: center;
  color: black;
  margin-top: 20px;
  cursor: pointer;
`;

export const TodoEditForm = styled.div`
    display: flex;
    width:100% ;
    max-width: 320px;
    flex-direction: row;
    justify-content: center ;
`

export const TodoSubmitButton = styled.button`
  border-radius: 30px;
  margin-right: 3px ;
  margin-left: 3px;
  height: 20px;
  font-size: 12px;
  text-align: center;
  color: black;
  cursor: pointer;
`;

export const AuthSwitch = styled.span`
  color: #04aaff;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 50px;
  display: block;
  font-size: 12px;
  text-decoration: underline;
`