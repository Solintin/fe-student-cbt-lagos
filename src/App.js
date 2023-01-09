import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/login/Login";
import Exam from "./Pages/Exam/";
import Instruction from "./Pages/Exam/instruction";
import Dashboard from "./Pages/dashboard";
import { Toaster } from "react-hot-toast";

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
          <Route path="/exam" element={<Exam />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/instruction" element={<Instruction />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
