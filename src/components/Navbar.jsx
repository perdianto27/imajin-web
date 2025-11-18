import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";

  return (
    <AppBar position="fixed" className="app-header">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">IMAJIN APP</Typography>

        <Box>
          {!user ? (
            <>
              {!isLoginPage && (
                <Button color="inherit" component={Link} to="/login" sx={{ mr: 1 }}>
                  Login
                </Button>
              )}

              {!isRegisterPage && (
                <Button variant="outlined" color="inherit" component={Link} to="/register">
                  Register
                </Button>
              )}
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/profile" sx={{ mr: 1 }}>
                {user.name || user.email}
              </Button>

              <Button variant="outlined" color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}