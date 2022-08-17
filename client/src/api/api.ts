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
    const { data } = await axios.post(
      serverUrl+"/auth/signin",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  },

  signUp: async ({
    email,
    password,
  }: SignUpFormState): Promise<AuthResponse> => {
    const {data} = await axios.post(
      serverUrl + "/auth/signup",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  },
};

const Todo = {
    createTodo: async ({
      todo,
    }: TodoFormState): Promise<TodoResponse> => {
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
      return data;
    },
  
    getTodos: async (): Promise<TodoResponse[]> => {
      const {data} = await axios.get(
        serverUrl + "/todos",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
        },
        }
      );
      return data;
    },

    updateTodo: async ({id, todo, isCompleted}: TodoUpdateState): Promise<AuthResponse> => {
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
          return data;
    },

    deleteTodo: async ({id}: TodoDeleteState) => {
        const { data } = await axios.delete(
            serverUrl+"/todos/"+`${id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
              },
            }
          );
          return data;
    }

  };

export { Auth, Todo };
