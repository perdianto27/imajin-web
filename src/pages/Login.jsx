import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../services/Api";

import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const auth = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [notif, setNotif] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      email: form.email,
      password: form.password,
    };

    api
      .post("/auth/login", payload)
      .then((res) => {
        const result = res.data?.data;
        const token = result.access_token;
        const email = result.email;
        if (token) {
          auth.login({ token, user: { email } });
          console.log("Login success", res.data);
        }

        setNotif({
          open: true,
          message: "Login berhasil! Selamat datang.",
          type: "success",
        });

        setTimeout(() => {
          navigate("/");
        }, 1200);
      })
      .catch((err) => {
        console.log("Error login", err);

        setNotif({
          open: true,
          message: "Login gagal! Email atau password salah.",
          type: "error",
        });
      });
  };

  return (
    <>
      <Box
        sx={{
          marginTop: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
        }}
      >
        <Paper sx={{ padding: 4, width: "100%", maxWidth: 400 }}>
          <Typography variant="h5" textAlign="center" mb={3}>
            Login
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              margin="normal"
              value={form.email}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              margin="normal"
              value={form.password}
              onChange={handleChange}
            />

            <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
              Login
            </Button>
          </form>
        </Paper>
      </Box>

      <Snackbar
        open={notif.open}
        autoHideDuration={2500}
        onClose={() => setNotif({ ...notif, open: false })}
      >
        <Alert severity={notif.type} variant="filled">
          {notif.message}
        </Alert>
      </Snackbar>
    </>
  );
}