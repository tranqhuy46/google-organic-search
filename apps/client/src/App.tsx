import React from "react";
import { Route, Routes } from "react-router-dom";
import HomeLayout from "./layout/home";
import Home from "./routes/Home/Home";
import SignIn from "./routes/SignIn";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<SignIn />} />
      <Route path="/" element={<HomeLayout />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
