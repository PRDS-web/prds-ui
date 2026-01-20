import React, { useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { verifyUserToken } from "../../Slice/UserLoginSlice";

export default function VerifyUser() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const { isSuccess, isLoading, errorMessage } = useSelector((state) => state.user);
  const hasVerified = useRef(false);

  useEffect(() => {
    // Verify user token only once
    if (token && !hasVerified.current) {
      hasVerified.current = true;
      dispatch(verifyUserToken(token));
    }
  }, [token, dispatch]);

  const handleLoginClick = () => {
    navigate("/login");
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <CircularProgress />
        <Typography variant="h6">Verifying your account...</Typography>
      </Box>
    );
  }

  if (isSuccess) {
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
        <Card
          sx={{
            maxWidth: 500,
            textAlign: "center",
            padding: 3,
            boxShadow: 3,
          }}
        >
          <CardContent>
            <CheckCircleOutlineIcon
              sx={{
                fontSize: 80,
                color: "success.main",
                marginBottom: 2,
              }}
            />
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: "bold" }}>
              Verification Successful!
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                margin: "20px 0 30px 0",
                lineHeight: 1.6,
              }}
            >
              Your email has been verified successfully. You can now proceed to login.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleLoginClick}
              sx={{ marginTop: 2, textTransform: "capitalize" }}
            >
              Click here to Login
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
      }}
    >
      <Card
        sx={{
          maxWidth: 500,
          textAlign: "center",
          padding: 3,
          boxShadow: 3,
        }}
      >
        <CardContent>
          <ErrorOutlineIcon
            sx={{
              fontSize: 80,
              color: "error.main",
              marginBottom: 2,
            }}
          />
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: "bold" }}>
            Verification Failed
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "text.secondary",
              margin: "20px 0 30px 0",
            }}
          >
            Unable to verify your account. {errorMessage || 'The verification link may be invalid or expired.'} 
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleLoginClick}
            sx={{ marginTop: 2, textTransform: "capitalize" }}
          >
            Back to Login
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}