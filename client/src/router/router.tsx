import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "../components/Auth/Auth";
import Todo from "../components/Todo/Todo";

function Router() {
  return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Auth/>}/>
        <Route path="/todo" element={<Todo/>}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;
