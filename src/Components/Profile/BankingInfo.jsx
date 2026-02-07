import { Box, Alert, Grid, Paper, Typography, TextField, FormControl, Select, MenuItem, Tabs, Tab, CircularProgress, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Collapse, IconButton, Snackbar } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HistoryIcon from '@mui/icons-material/History';
import { useTheme } from '@mui/material/styles';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Save, Cancel } from '@mui/icons-material';
import { getBankingDetails, getBankingHistoryDetails, updateBankingDetails } from '../../Slice/UserLoginSlice';

export default function BankingInfo () {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { bankingDetails, bankingHistory, isLoading, isBankingUpdating } = useSelector((state) => state.user);
    const [bankingSubTab, setBankingSubTab] = useState(0);
    const [expandedRow, setExpandedRow] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({
        payPalId: '',
        upiId: '',
        bankName: '',
        accountHolder: '',
        accountIFSC: '',
        accountNumber: '',
        accountLast4: '',
        accountType: '',
    });
    const [showSaveSuccess, setShowSaveSuccess] = useState(false);
    const [showSaveError, setShowSaveError] = useState(false);
    const [saveErrorMessage, setSaveErrorMessage] = useState('');

    useEffect(() => {
      dispatch(getBankingDetails());
    }, [dispatch]);

    useEffect(() => {
      const details = bankingDetails?.bankingDetails ?? bankingDetails;
      if (details && typeof details === 'object') {
        setEditData((prev) => ({
          ...prev,
          payPalId: details.payPalId ?? details.paypalEmail ?? '',
          upiId: details.upiId ?? '',
          bankName: details.bankName ?? '',
          accountHolder: details.accountHolder ?? '',
          accountIFSC: details.accountIFSC ?? details.routingNumber ?? '',
          accountNumber: details.accountNumber ?? '',
          accountLast4: details.accountLast4 ?? '',
          accountType: details.accountType ?? '',
        }));
      }
    }, [bankingDetails]);

    useEffect(() => {
      if (bankingSubTab === 1) {
        dispatch(getBankingHistoryDetails());
      } else {
        setExpandedRow(null);
      }
    }, [bankingSubTab, dispatch]);

    const handleInputChange = (field, value) => {
      setEditData((prev) => ({ ...prev, [field]: value }));
    };

    const details = bankingDetails?.bankingDetails ?? bankingDetails;
    const serverData = details && typeof details === 'object' ? {
      payPalId: details.payPalId ?? details.paypalEmail ?? '',
      upiId: details.upiId ?? '',
      bankName: details.bankName ?? '',
      accountHolder: details.accountHolder ?? '',
      accountIFSC: details.accountIFSC ?? details.routingNumber ?? '',
      accountNumber: details.accountNumber ?? '',
      accountLast4: details.accountLast4 ?? '',
      accountType: details.accountType ?? '',
    } : { payPalId: '', upiId: '', bankName: '', accountHolder: '', accountIFSC: '', accountNumber: '', accountLast4: '', accountType: '' };
    const dataIsNotChanged = (editData.payPalId ?? '') === (serverData.payPalId ?? '')
      && (editData.upiId ?? '') === (serverData.upiId ?? '')
      && (editData.bankName ?? '') === (serverData.bankName ?? '')
      && (editData.accountHolder ?? '') === (serverData.accountHolder ?? '')
      && (editData.accountIFSC ?? '') === (serverData.accountIFSC ?? '')
      && (editData.accountNumber ?? '') === (serverData.accountNumber ?? '')
      && (editData.accountLast4 ?? '') === (serverData.accountLast4 ?? '')
      && (editData.accountType ?? '') === (serverData.accountType ?? '');

    const getPayloadForBackend = () => ({
      bankName: editData.bankName || '',
      accountHolder: editData.accountHolder || '',
      accountIFSC: editData.accountIFSC || '',
      accountNumber: editData.accountNumber || '',
      accountType: editData.accountType || '',
      upiId: editData.upiId || '',
      payPalId: editData.payPalId || '',
    });

    const handleSubmit = () => {
      const payload = getPayloadForBackend();
      dispatch(updateBankingDetails(payload))
        .unwrap()
        .then(() => {
          setIsEditing(false);
          setShowSaveSuccess(true);
          dispatch(getBankingDetails());
        })
        .catch((err) => {
          setShowSaveError(true);
          setSaveErrorMessage(err?.message ?? err?.data?.message ?? 'Failed to save banking details');
        });
    };

    const historyList = Array.isArray(bankingHistory)
      ? bankingHistory
      : (bankingHistory?.bankingDetailsHistory ?? bankingHistory?.bankingHistory ?? bankingHistory?.history ?? []);


    return (
      <Box>
        <Snackbar
          open={showSaveSuccess}
          autoHideDuration={3000}
          onClose={() => setShowSaveSuccess(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        >
          <Alert onClose={() => setShowSaveSuccess(false)} severity="success" sx={{ width: '100%' }}>
            Banking details saved successfully
          </Alert>
        </Snackbar>
        <Snackbar
          open={showSaveError}
          autoHideDuration={5000}
          onClose={() => { setShowSaveError(false); setSaveErrorMessage(''); }}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={() => { setShowSaveError(false); setSaveErrorMessage(''); }} severity="error" sx={{ width: '100%' }}>
            {saveErrorMessage}
          </Alert>
        </Snackbar>
        <Alert severity="info" sx={{ mb: 3 }}>
          Manage your banking and payment information securely. All sensitive data is encrypted and its your responsibility to provide correct information. if anything is wrong with your account that's on your responsibility.
        </Alert>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 2, borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={bankingSubTab}
            onChange={(_, v) => setBankingSubTab(v)}
            sx={{
              '& .MuiTab-root': {
                minHeight: 48,
                fontSize: '0.9rem',
                fontWeight: 600,
                textTransform: 'none',
                color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
                '&.Mui-selected': {
                  color: theme.palette.mode === 'dark' ? '#fff' : '#1976d2',
                  fontWeight: 700,
                },
                '&:hover': {
                  color: theme.palette.mode === 'dark' ? '#fff' : '#1976d2',
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(25, 118, 210, 0.08)',
                },
              },
              '& .MuiTabs-indicator': {
                backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#1976d2',
                height: 3,
              },
            }}
          >
            <Tab
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ color: 'inherit', display: 'flex', alignItems: 'center', mr: 1, '& .MuiSvgIcon-root': { fontSize: '1.2rem' } }}>
                    <AccountBalanceIcon />
                  </Box>
                  <Typography sx={{ ml: 0.5, fontSize: '0.9rem', color: 'inherit', fontWeight: 'inherit' }}>
                    Current Details
                  </Typography>
                </Box>
              }
            />
            <Tab
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ color: 'inherit', display: 'flex', alignItems: 'center', mr: 1, '& .MuiSvgIcon-root': { fontSize: '1.2rem' } }}>
                    <HistoryIcon />
                  </Box>
                  <Typography sx={{ ml: 0.5, fontSize: '0.9rem', color: 'inherit', fontWeight: 'inherit' }}>
                    History
                  </Typography>
                </Box>
              }
            />
          </Tabs>
          {bankingSubTab === 0 && !isLoading && (
            isEditing ? (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  sx={{ backgroundColor: 'green', color: 'white' }}
                  disabled={dataIsNotChanged || isBankingUpdating}
                  startIcon={isBankingUpdating ? <CircularProgress size={20} color="inherit" /> : <Save />}
                  variant="contained"
                  size="small"
                  color="inherit"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
                <Button
                  sx={{ backgroundColor: 'red', color: 'white' }}
                  disabled={isBankingUpdating}
                  startIcon={<Cancel />}
                  variant="outlined"
                  size="small"
                  onClick={() => {
                  setIsEditing(false);
                  const details = bankingDetails?.bankingDetails ?? bankingDetails;
                  if (details && typeof details === 'object') {
                    setEditData((prev) => ({
                      ...prev,
                      payPalId: details.payPalId ?? details.paypalEmail ?? '',
                      upiId: details.upiId ?? '',
                      bankName: details.bankName ?? '',
                      accountHolder: details.accountHolder ?? '',
                      accountIFSC: details.accountIFSC ?? details.routingNumber ?? '',
                      accountNumber: details.accountNumber ?? '',
                      accountLast4: details.accountLast4 ?? '',
                      accountType: details.accountType ?? '',
                    }));
                  }
                }}
                >
                  Cancel
                </Button>
              </Box>
            ) : (
              <Button variant="outlined" size="small" color="inherit" onClick={() => setIsEditing(true)}>
                Edit
              </Button>
            )
          )}
        </Box>

        {bankingSubTab === 0 && (
        <>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
        <Grid container spacing={3}>
            {/* Account Holder */}
          <Grid size={{ xs: 12 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 2,
                backgroundColor: theme.palette.mode === 'dark' ? 'background.default' : '#f8f9fa',
                border: '2px solid',
                borderColor: theme.palette.mode === 'dark' ? 'divider' : '#e0e0e0',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: 3,
                  borderColor: '#1976d2',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    backgroundColor: '#6f42c1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.5rem',
                    flexShrink: 0,
                  }}
                >
                  👤
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                      display: 'block',
                    }}
                  >
                    Account Holder
                  </Typography>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      value={editData.accountHolder}
                      onChange={(e) => handleInputChange('accountHolder', e.target.value)}
                      variant="outlined"
                      size="small"
                      placeholder="Full name"
                      sx={{ mt: 1 }}
                    />
                  ) : (
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, color: 'text.primary', mt: 1 }}
                    >
                      {editData.accountHolder || 'Not provided'}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Bank Name */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 2,
                backgroundColor: theme.palette.mode === 'dark' ? 'background.default' : '#f8f9fa',
                border: '2px solid',
                borderColor: theme.palette.mode === 'dark' ? 'divider' : '#e0e0e0',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: 3,
                  borderColor: '#1976d2',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    backgroundColor: '#28a745',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.5rem',
                    flexShrink: 0,
                  }}
                >
                  🏦
                </Box>
                <Box sx={{ flex: 1, width: '100%' }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                      display: 'block',
                    }}
                  >
                    Bank Name
                  </Typography>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      value={editData.bankName}
                      onChange={(e) => handleInputChange('bankName', e.target.value)}
                      variant="outlined"
                      size="small"
                      placeholder="e.g. HDFC, Chase Bank, Barclays"
                      sx={{ mt: 1 }}
                    />
                  ) : (
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, color: 'text.primary', mt: 1 }}
                    >
                      {editData.bankName || 'Not provided'}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Account Type */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 2,
                backgroundColor: theme.palette.mode === 'dark' ? 'background.default' : '#f8f9fa',
                border: '2px solid',
                borderColor: theme.palette.mode === 'dark' ? 'divider' : '#e0e0e0',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: 3,
                  borderColor: '#1976d2',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    backgroundColor: '#fd7e14',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.5rem',
                    flexShrink: 0,
                  }}
                >
                  📊
                </Box>
                <Box sx={{ flex: 1, width: '100%' }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                      display: 'block',
                    }}
                  >
                    Account Type
                  </Typography>
                  {isEditing ? (
                    <FormControl fullWidth size="small" sx={{ mt: 1 }}>
                      <Select
                        value={editData.accountType}
                        onChange={(e) => handleInputChange('accountType', e.target.value)}
                      >
                        <MenuItem value="Saving">Saving</MenuItem>
                        <MenuItem value="CurrentAccount">Current Account</MenuItem>
                      </Select>
                    </FormControl>
                  ) : (
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, color: 'text.primary', mt: 1 }}
                    >
                      {editData.accountType || 'Not provided'}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Account Number */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 2,
                backgroundColor: theme.palette.mode === 'dark' ? 'background.default' : '#f8f9fa',
                border: '2px solid',
                borderColor: theme.palette.mode === 'dark' ? 'divider' : '#e0e0e0',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: 3,
                  borderColor: '#1976d2',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    backgroundColor: '#dc3545',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.5rem',
                    flexShrink: 0,
                  }}
                >
                  💳
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                    }}
                  >
                    Account Number
                  </Typography>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      value={editData.accountNumber}
                      onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                      variant="outlined"
                      size="small"
                      placeholder="e.g. 12234328970986"
                      type="password"
                      sx={{ mt: 1 }}
                    />
                  ) : (
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, color: 'text.primary', mt: 1 }}
                    >
                      {editData.accountNumber ? `****${String(editData.accountNumber).slice(-4)}` : (editData.accountLast4 ? `****${editData.accountLast4}` : 'Not provided')}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Routing Number */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 2,
                backgroundColor: theme.palette.mode === 'dark' ? 'background.default' : '#f8f9fa',
                border: '2px solid',
                borderColor: theme.palette.mode === 'dark' ? 'divider' : '#e0e0e0',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: 3,
                  borderColor: '#1976d2',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    backgroundColor: '#17a2b8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.5rem',
                    flexShrink: 0,
                  }}
                >
                  🔐
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                    }}
                  >
                    IFSC Number
                  </Typography>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      value={editData.accountIFSC}
                      onChange={(e) => handleInputChange('accountIFSC', e.target.value)}
                      variant="outlined"
                      size="small"
                      placeholder="HDFC00000001"
                      sx={{ mt: 1 }}
                    />
                  ) : (
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, color: 'text.primary', mt: 1 }}
                    >
                      {editData.accountIFSC || 'Not provided'}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Paper>
          </Grid>
          {/* UPI ID */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 2,
                backgroundColor: theme.palette.mode === 'dark' ? 'background.default' : '#f8f9fa',
                border: '2px solid',
                borderColor: theme.palette.mode === 'dark' ? 'divider' : '#e0e0e0',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: 3,
                  borderColor: '#1976d2',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    backgroundColor: '#6c63ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.5rem',
                    flexShrink: 0,
                  }}
                >
                  ₹
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                    }}
                  >
                    UPI ID
                  </Typography>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      value={editData.upiId}
                      onChange={(e) => handleInputChange('upiId', e.target.value)}
                      variant="outlined"
                      size="small"
                      placeholder="yourname@upi"
                      sx={{ mt: 1 }}
                    />
                  ) : (
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, color: 'text.primary', mt: 1 }}
                    >
                      {editData.upiId && editData.upiId !== 'NA' ? editData.upiId : 'Not provided'}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* PayPal Account */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              sx={{
                p: 3,
                borderRadius: 2,
                backgroundColor: theme.palette.mode === 'dark' ? 'background.default' : '#f8f9fa',
                border: '2px solid',
                borderColor: theme.palette.mode === 'dark' ? 'divider' : '#e0e0e0',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: 3,
                  borderColor: '#1976d2',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                <Box
                  sx={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    backgroundColor: '#0070ba',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.5rem',
                    flexShrink: 0,
                  }}
                >
                  🅿️
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: 0.5,
                    }}
                  >
                    PayPal Account
                  </Typography>
                  {isEditing ? (
                    <TextField
                      fullWidth
                      type="email"
                      value={editData.payPalId}
                      onChange={(e) => handleInputChange('payPalId', e.target.value)}
                      variant="outlined"
                      size="small"
                      placeholder="your.email@paypal.com"
                      sx={{ mt: 1 }}
                    />
                  ) : (
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, color: 'text.primary', mt: 1 }}
                    >
                      {editData.payPalId && editData.payPalId !== 'NA' ? editData.payPalId : 'Not provided'}
                    </Typography>
                  )}
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        )}
        </>
        )}

        {bankingSubTab === 1 && (
          <Box>
            {isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : historyList.length === 0 ? (
              <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography color="text.secondary">
                  No banking update history available.
                </Typography>
              </Paper>
            ) : (
              <TableContainer component={Paper} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: theme.palette.mode === 'dark' ? 'action.hover' : 'grey.100' }}>
                      <TableCell width={48} />
                      <TableCell><Typography variant="subtitle2" fontWeight={600}>Date</Typography></TableCell>
                      <TableCell><Typography variant="subtitle2" fontWeight={600}>Bank</Typography></TableCell>
                      <TableCell><Typography variant="subtitle2" fontWeight={600}>Account Holder</Typography></TableCell>
                      <TableCell><Typography variant="subtitle2" fontWeight={600}>IFSC</Typography></TableCell>
                      <TableCell><Typography variant="subtitle2" fontWeight={600}>Last 4</Typography></TableCell>
                      <TableCell><Typography variant="subtitle2" fontWeight={600}>Account Type</Typography></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {historyList.map((record, index) => {
                      const isExpanded = expandedRow === index;
                      return (
                        <React.Fragment key={record.id ?? index}>
                          <TableRow
                            hover
                            onClick={() => setExpandedRow(isExpanded ? null : index)}
                            sx={{ cursor: 'pointer' }}
                          >
                            <TableCell>
                              <IconButton size="small" aria-label="expand row">
                                {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                              </IconButton>
                            </TableCell>
                            <TableCell>
                              {record.createdAt ? new Date(record.createdAt).toLocaleString() : '—'}
                            </TableCell>
                            <TableCell>{record.bankName || '—'}</TableCell>
                            <TableCell>{record.accountHolder || '—'}</TableCell>
                            <TableCell>{record.accountIFSC || '—'}</TableCell>
                            <TableCell>{record.accountLast4 ? `****${record.accountLast4}` : '—'}</TableCell>
                            <TableCell>{record.accountType || '—'}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell colSpan={7} sx={{ py: 0, borderBottom: 0 }}>
                              <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                                <Box sx={{ py: 2, pl: 6, pr: 2, backgroundColor: theme.palette.mode === 'dark' ? 'action.hover' : 'grey.50' }}>
                                  <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 600, mb: 1.5, display: 'block' }}>
                                    Full details
                                  </Typography>
                                  <Grid container spacing={3}>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                      <Typography variant="caption" color="text.secondary">Bank Name</Typography>
                                      <Typography variant="body2" sx={{ fontWeight: 500 }}>{record.bankName || '—'}</Typography>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                      <Typography variant="caption" color="text.secondary">Account Holder</Typography>
                                      <Typography variant="body2" sx={{ fontWeight: 500 }}>{record.accountHolder || '—'}</Typography>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                      <Typography variant="caption" color="text.secondary">Account IFSC</Typography>
                                      <Typography variant="body2" sx={{ fontWeight: 500 }}>{record.accountIFSC || '—'}</Typography>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                      <Typography variant="caption" color="text.secondary">Account Last 4</Typography>
                                      <Typography variant="body2" sx={{ fontWeight: 500 }}>{record.accountLast4 ? `****${record.accountLast4}` : '—'}</Typography>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                      <Typography variant="caption" color="text.secondary">Account Type</Typography>
                                      <Typography variant="body2" sx={{ fontWeight: 500 }}>{record.accountType || '—'}</Typography>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                      <Typography variant="caption" color="text.secondary">UPI ID</Typography>
                                      <Typography variant="body2" sx={{ fontWeight: 500 }}>{record.upiId && record.upiId !== 'NA' ? record.upiId : '—'}</Typography>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                      <Typography variant="caption" color="text.secondary">Created At</Typography>
                                      <Typography variant="body2" sx={{ fontWeight: 500 }}>{record.createdAt ? new Date(record.createdAt).toLocaleString() : '—'}</Typography>
                                    </Grid>
                                    <Grid size={{ xs: 12, sm: 6 }}>
                                      <Typography variant="caption" color="text.secondary">Updated At</Typography>
                                      <Typography variant="body2" sx={{ fontWeight: 500 }}>{record.updatedAt ? new Date(record.updatedAt).toLocaleString() : '—'}</Typography>
                                    </Grid>
                                  </Grid>
                                </Box>
                              </Collapse>
                            </TableCell>
                          </TableRow>
                        </React.Fragment>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Box>
        )}
      </Box>
    );
  };