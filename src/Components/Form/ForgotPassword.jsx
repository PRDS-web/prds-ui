import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch} from 'react-redux';
import { forgotPasswords } from '../../Slice/UserLoginSlice';
import { TextField } from '@mui/material';

function ForgotPassword({ open, handleClose, isSuccess }) {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState('');
    const textFieldStyles = {
    '& .MuiInputLabel-root': {
      color: 'inherit',
    },

    // Label color when focused (moves up)
    '& .MuiInputLabel-root.Mui-focused': {
      color: 'inherit',
    },

    // Border color (default)
    '& .MuiOutlinedInput-root fieldset': {
      borderColor: 'inherit',
    },
    '& .MuiOutlinedInput-root.Mui-focused fieldset': {
      borderColor: 'inherit',
      borderWidth: '2px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'inherit',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'inherit',
      color: 'inherit',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'inherit',
      color: 'inherit',
      borderWidth: '2px',
    },
    '&.Mui-focused': {
      color: 'inherit',
    },
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose} >
      <DialogTitle>Reset password</DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}
      >
        <DialogContentText>
          Enter your account&apos;s email address, and we&apos;ll send you a link to
          reset your password.
        </DialogContentText>
        <TextField
          autoFocus
          required
          value={email}
          margin="dense"
          id="email"
          name="email"
          label="Email address"
          placeholder="Email address"
          type="email"
          sx={textFieldStyles}
          fullWidth
          onChange={(e) => setEmail(e.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={() =>{ 
          dispatch(forgotPasswords({ email })); 
          if(isSuccess){
           setEmail('');
          }
      }}>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  );
}


export default ForgotPassword;