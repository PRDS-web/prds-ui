import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { resetPasswords } from "../Slice/UserLoginSlice";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const { isLoading, isSuccess, isError, errorMessage } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: "", text: "" });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!token) {
      setMessage({
        type: "error",
        text: "Invalid or expired reset link. Please request a new one.",
      });
      return;
    }

    dispatch( resetPasswords({ token, newPassword: formData.password }));
    setTimeout(() => {
        navigate("/login");
    }, 2000);

    if(isSuccess) {
      setMessage({
        type: "success",
        text: "Password has been reset successfully! Redirecting to login...",
      });
    } else if(isError) {
      setMessage({
        type: "error",
        text: errorMessage || "Failed to reset password. Please try again.",
      });
    }
    
  };

  if (!token) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          padding: 2,
        }}
      >
        <Card sx={{ maxWidth: 500, boxShadow: 3 }}>
          <CardContent sx={{ textAlign: "center", padding: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold", color: "error.main" }}>
              Invalid Reset Link
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", margin: "20px 0" }}>
              The password reset link is invalid or has expired. Please request a new one.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/login")}
              sx={{ marginTop: 2 }}
            >
              Request New Link
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: 2,
        background: 'inherit',
      }}
    >
      <Container maxWidth="sm">
        <Card sx={{ boxShadow: 3 }}>
          <CardContent sx={{ padding: 4 }}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ fontWeight: "bold", textAlign: "center", marginBottom: 1 }}
            >
              Reset Password
            </Typography>
            <Typography
              variant="body2"
              sx={{ textAlign: "center", color: "text.secondary", marginBottom: 3 }}
            >
              Enter your new password below
            </Typography>

            {message.text && (
              <Alert severity={message.type} sx={{ marginBottom: 2 }}>
                {message.text}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="New Password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                margin="normal"
                placeholder="Enter at least 8 characters"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        edge="end"
                        tabIndex={-1}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                margin="normal"
                placeholder="Re-enter your password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowConfirmPassword}
                        edge="end"
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                disabled={isLoading}
                sx={{ marginTop: 3, marginBottom: 2, textTransform: "capitalize" }}
              >
                {isLoading ? (
                  <>
                    <CircularProgress size={20} sx={{ marginRight: 1 }} />
                    Resetting...
                  </>
                ) : (
                  "Reset Password"
                )}
              </Button>

              <Box sx={{ textAlign: "center" }}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Remember your password?{" "}
                  <Button
                    onClick={() => navigate("/login")}
                    color="inherit"
                        sx={{ textTransform: "capitalize",  padding: 0, marginLeft: 0.5 }}
                  >
                    Login here
                  </Button>
                </Typography>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}