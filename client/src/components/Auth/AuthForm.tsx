import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Api from '../../api/api';
import {
  AuthFormContainer,
  Title,
  AuthFormInput,
  AuthFormSubmit,
  AuthSwitch,
} from './AuthForm.style';

function AuthForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);

  const validateEmail = (email: string) => {
    let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 8;
  const isFormValid = isEmailValid && isPasswordValid;

  useEffect(() => {
    if (localStorage.getItem('userToken') && localStorage.getItem('userToken') != 'undefined') {
      navigate('/todo');
      return;
    }
  }, []);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    try {
      if (newAccount) {
        try {
          const response = await Api.Auth.signUp({ email, password });
          const userToken = response.access_token;
          localStorage.setItem('userToken', userToken);
          alert('Register Complete!');
        } catch (error: any) {
          alert(error.response.data.message);
        }
      } else {
        try {
          const response = await Api.Auth.signIn({ email, password });
          const userToken = response.access_token;
          localStorage.setItem('userToken', userToken);
          alert('Sign In Complete!');
        } catch (error: any) {
          if (error.response.data.message === 'Unauthorized') {
            alert('비밀번호가 일치하지 않습니다.');
          } else {
            alert(error.response.data.message);
          }
        }
      }
      if (localStorage.getItem('userToken')) {
        navigate('/todo');
      } else {
        navigate('/');
      }
    } catch (error: any) {
      return error.response.data;
    }
  };

  const toggleAccount = () => setNewAccount(current => !current);

  return (
    <>
      <AuthFormContainer onSubmit={handleSubmit}>
        <Title>{newAccount ? 'Sign Up' : 'Sign In'} </Title>
        <AuthFormInput
          type="text"
          name="email"
          placeholder="email"
          required
          value={email}
          onChange={onChange}
        />
        {!isEmailValid && <>Not Valid Email Form</>}
        <AuthFormInput
          type="password"
          name="password"
          placeholder="password"
          required
          value={password}
          onChange={onChange}
        />
        {!isPasswordValid && <>Password must be over 8 letters</>}
        <AuthFormSubmit disabled={!isFormValid} type="submit">
          {newAccount ? 'Create Account' : 'Sign In'}
        </AuthFormSubmit>
      </AuthFormContainer>
      <AuthSwitch onClick={toggleAccount}>{newAccount ? 'Sign In?' : 'Register?'}</AuthSwitch>
    </>
  );
}

export default AuthForm;
