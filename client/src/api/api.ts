import axios from "axios";
import { SignUpFormState, SignInFormState, AuthResponse } from "../types/auth";
import { TodoFormState, TodoUpdateState, TodoDeleteState, TodoResponse } from "../types/todo";

const serverUrl = "https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/";

axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    if (error.response) {
      const {
        config,
        response: { status },
      } = error;
    }
    return Promise.reject(error);
  }
);

const Auth = {
  signIn: async ({
    email,
    password,
  }: SignInFormState): Promise<AuthResponse> => {
    console.log(`%cSignIn 요청 ${email}, ${password}`, "color: #FAB3A9 ")
    const { data } = await axios.post(
      serverUrl+"/auth/signin",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(`%cSignIn 요청 완료 ${data.access_token}`, "color: #FAB3A9 ");
    return data;
  },

  signUp: async ({
    email,
    password,
  }: SignUpFormState): Promise<AuthResponse> => {
    console.log(`%cSignUp 요청 ${email}, ${password}`, "color: #FAB3A9 ")
    const {data} = await axios.post(
      serverUrl + "/auth/signup",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(`%cSignUp 요청 완료 ${data.access_token}`, "color: #FAB3A9 ");
    return data;
  },
};

const Todo = {
    createTodo: async ({
      todo,
    }: TodoFormState): Promise<TodoResponse> => {
      console.log(`%cTodoCreate 요청 ${todo}`, "color: #ED6B86 ")
      console.log(localStorage.getItem("userToken"))
      const { data } = await axios.post(
        serverUrl+"/todos",
        { todo },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(`%cTodoCreate 요청 결과 ${data}`, "color: #ED6B86 ");
      return data;
    },
  
    getTodos: async (): Promise<TodoResponse[]> => {
      console.log(`%cTodoGet 요청`, "color: #ED6B86 ")
      const {data} = await axios.get(
        serverUrl + "/todos",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
        },
        }
      );
      console.log(`%cTodoGet 요청 결과 ${data}`, "color: #ED6B86 ");
      return data;
    },

    updateTodo: async ({id, todo, isCompleted}: TodoUpdateState): Promise<AuthResponse> => {
        console.log(`%cTodoUpdate 요청 ${id}, ${todo}, ${isCompleted}}`, "color: #ED6B86 ");
        const { data } = await axios.put(
            serverUrl+"/todos/"+`${id}`,
            { todo, isCompleted },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
                "Content-Type": "application/json",
              },
            }
          );
          console.log(`%cTodoUpdate 요청 ${data.bodyData}`, "color: #ED6B86 ");
          return data;
    },

    deleteTodo: async ({id}: TodoDeleteState) => {
        console.log(`%cTodoDelete 요청`, "color: #ED6B86 ");
        const { data } = await axios.delete(
            serverUrl+"/todos/"+`${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
              },
            }
          );
          console.log(`%cTodoDelete 요청 ${data.bodyData}`, "color: #ED6B86 ");
          return data;
    }

  };

export { Auth, Todo };
