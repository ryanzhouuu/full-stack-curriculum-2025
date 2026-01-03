import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

function LoginPage() {
  // Access the MUI theme for potential theme-related functionalities.

  // TODO: Extract login function and error from our authentication context.
  const { login, register, loginError } = useAuth();

  // State to hold the username and password entered by the user.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // TODO: Handle login function.
  const handleLogin = () => {
    login(email, password);
  };

  const handleRegister = () => {
    register(email, password);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="img"
          sx={{
            marginBottom: 2,
            height: 200,
            width: 200,
          }}
          alt="UT Longhorn"
          src="/longhorn.jpg"
        ></Box>
        <Typography component="h1" variant="h4" fontWeight="bold">
          Login
        </Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            InputLabelProps={{ shrink: true }}
            placeholder="example@example.com"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            InputLabelProps={{ shrink: true }}
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
          >
            Login
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleRegister}
          >
            Register
          </Button>
        </Box>
        {/* TODO: Display Login Error if it exists */}
        {loginError && <Alert severity="error">{loginError}</Alert>}
      </Box>
    </Container>
  );
}

export default LoginPage;
