import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/login/Login";
import Exam from "./Pages/Exam/";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/exam" element={<Exam />} />
      </Routes>
    </Router>
  );
};

export default App;
