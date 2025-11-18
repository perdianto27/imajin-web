import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Snackbar,
  Alert
} from "@mui/material";

import api from "../services/Api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [notif, setNotif] = useState({
    open: false,
    message: "",
    type: "success"
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
      name: form.name,
      email: form.email,
      password: form.password,
      roleId: 1,
    };

    api
      .post("/user", payload)
      .then((res) => {
        console.log("API register", res.data);

        setNotif({
          open: true,
          message: "Registrasi berhasil! Silakan login.",
          type: "success",
        });

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      })
      .catch((err) => {
        console.log("error register", err);

        setNotif({
          open: true,
          message: "Registrasi gagal! Pastikan data sudah benar.",
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
            Register
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              margin="normal"
              value={form.name}
              onChange={handleChange}
            />

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

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Register
            </Button>
          </form>
        </Paper>
      </Box>
      {/* Notifikasi Snackbar */}
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