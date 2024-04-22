import { Navigate, Outlet } from "react-router-dom";
import { Stack } from "@mui/material";
import SideBar from "./SideBar";
import { authStore } from "../../contexts/authStore";

const DashboardLayout = () => {
  const { isAuthenticated } = authStore();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <Stack direction="row">
      {/* SideBar */}
      <SideBar />
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
