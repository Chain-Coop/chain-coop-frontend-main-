import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../layout/dashboardLayout";
import Home from "../home/home";
import FinancialManagement from "../financialManagement/FinancialManagement";
import ProjectManagement from "../projectManagement/projectManagement";
import NewsLetter from "../newsLetter/newsLetter";
import ContentManagement from "../contentManagement/contentManagement";
import All from "../newsLetter/all";
import BlogDetails from "../newsLetter/blogDetails";
import NotificationComponent from "../notification/Notification";

const DashboardRoutes = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="home" element={<Home />} />
        <Route path="project_management" element={<ProjectManagement />} />
        <Route path="financial_management" element={<FinancialManagement />} />
        <Route path="notification" element={<NotificationComponent />} />
        <Route path="news_letter" element={<NewsLetter />} />
        <Route path="content_management" element={<ContentManagement />} />
        <Route path="/news_letter/all" element={<All />} />
        <Route path="/news_letter/:id" element={<BlogDetails />} />
      </Routes>
    </DashboardLayout>
  );
};

export default DashboardRoutes;
