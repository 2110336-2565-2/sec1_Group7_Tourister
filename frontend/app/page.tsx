"use client";

import LoginForm from "./login/loginForm";
import Register from "./register/page";
import Request from "./request/requestPage";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="*" element={<LoginForm />} />
          <Route path="/register" element={<Register />} />
          <Route path="/request" element={<Request />} />
        </Routes>
      </Router>
    </div>
  );
}
