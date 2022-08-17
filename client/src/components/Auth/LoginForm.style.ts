import styled from "styled-components";

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export const LoginFormContainer = styled.form`
  width: 100%;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
    font-size: 30px ;
`
export const LoginFormInput = styled.input`
  max-width: 320px;
  width: 100%;
  padding: 10px;
  border-radius: 30px;
  background-color: rgba(255, 255, 255, 1);
  margin-bottom: 10px;
  margin-top: 20px;
  font-size: 20px;
  color: black;
`;

export const LoginFormSubmit = styled.button`
  max-width: 320px;
  width: 100%;
  padding: 10px;
  border-radius: 30px;
  margin-bottom: 10px;
  font-size: 20px;
  text-align: center;
  color: black;
  margin-top: 20px;
  cursor: pointer;
  background-color: skyblue ;

  &:disabled {
    cursor: default;
    opacity: 0.5;
    background-color: grey;
  }
`;

export const AuthSwitch = styled.span`
  color: #04aaff;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 50px;
  display: block;
  font-size: 18px;
  text-decoration: underline;
`