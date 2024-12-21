import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import { useAuth } from "../../hooks/useAuth";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth(); // assuming `register` function is available in the `useAuth` hook
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Passwords must match
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const success = await register(email, password);
      if (success) {
        navigate("/login");
      } else {
        setError("Registration failed");
      }
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: 2,
        bgcolor: "background.default",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: "400px", width: "100%" }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3 }}>
            Register
          </Button>
          <Button
            component={Link}
            to="/login"
            fullWidth
            variant="text"
            sx={{ mt: 1 }}
          >
            Already have an account? Login
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default RegisterForm;
