import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/login/Login";
import Exam from "./Pages/Exam/";
import Instruction from "./Pages/Exam/instruction";
import Dashboard from "./Pages/dashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route  path="/exam" element={<Exam />} />
        <Route  path="/dashboard" element={<Dashboard />} />
        <Route  path="/instruction" element={<Instruction />} />
      </Routes>
    </Router>
  );
};

export default App;
