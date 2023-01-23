import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Exam from "./Pages/Exam/";
import Instruction from "./Pages/Exam/instruction";
import Dashboard from "./Pages/dashboard";
import { Toaster } from "react-hot-toast";
import Result from "./Pages/result";
import SignUp from "./Pages/Auth/SignUp";

const App = () => {
  return (
    <div>
      <div>
        <Toaster
          toastOptions={{
            duration: 5000,
            position: "top-center",
            success: {
              style: {
                background: "#222",
                color: "#fff",
              },
            },
            error: {
              duration: 5000,
              position: "top-center",
              style: {
                background: "red",
                color: "#fff",
              },
            },
          }}
        />
      </div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/results" element={<Result />} />
          <Route path="/instruction" element={<Instruction />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
