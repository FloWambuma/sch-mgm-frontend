import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from "../pages/DashboardPage";
import Login from "../pages/login";
import Register from "../pages/register";
import Assignments from "../pages/assignments";
import Assignment from "../pages/assignment";
import Mark from "../pages/mark";
import Results from "../pages/results";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/assignment/:assignmentId" element={<Assignment />} />
        <Route path="/mark/:assignmentId" element={<Mark />} />
        <Route path="/results/:assignmentId" element={<Results />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
