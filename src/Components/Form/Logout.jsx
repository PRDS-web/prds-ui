import { Alert, Snackbar } from "@mui/material";
import { Navigate } from "react-router";

export default function Logout() {
  return (
    <>
      <Navigate to="/" />
      <Snackbar
        open='true'
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={300}
      >
        <Alert severity="success" variant="filled" sx={{ width: '100%' }}>
          Logout Successful!
        </Alert>
      </Snackbar>
    </>
  );
}
