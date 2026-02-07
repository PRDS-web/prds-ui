import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Modal,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Alert,
  Snackbar,
  Chip,
  Divider,
  Paper,
  Backdrop,
  Fade,
  TablePagination,
} from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { applyForTheJob, getAllJobs, updateJobApplicationStatus } from "../../Slice/JobSlice";
import { APPLICATION_FORM_FIELDS_DEFAULT } from "../../constants/jobConstants";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EventIcon from "@mui/icons-material/Event";
import StatusIcon from "@mui/icons-material/FiberManualRecord";
// import { isLoggedInUser } from "../../Slice/UserLoginSlice";

// Utility function to format dates
const formatDate = (dateString) => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
const textFieldStyles = {
     '& .MuiOutlinedInput-root': {
        borderRadius: "10px",
    },
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

// Utility function to get field value (handles different naming conventions)
const getFieldValue = (job, ...fieldNames) => {
  if (!job) return null;
  for (let fieldName of fieldNames) {
    if (job[fieldName] !== undefined && job[fieldName] !== null) {
      return job[fieldName];
    }
  }
  return null;
};

export default function Opportunity() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const mode = theme.palette.mode;
  const navigate = useNavigate();
  const {users, isLoggedIn} = useSelector((state) => state.user || {});
  const {_id} = users.user || "";

  // const [isUserLoggedIn, setIsUserLoggedIn] = useState(isLoggedIn || false);

  const { Jobs, isJobsLoading, isError, errorMessage } = useSelector(
    (state) => state.jobstore || {}
  );
  // const {isLoggedIn} = useSelector((state) => state.user || {})
  const [selectedJob, setSelectedJob] = useState(null);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [openApplicationModal, setOpenApplicationModal] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    experience: "",
    skills: "",
    coverLetter: "",
    linkedIn: "",
    jobId: "",
    userId: "",
  });
  

  const [formErrors, setFormErrors] = useState({});

  // Filter state
  const [filters, setFilters] = useState({
    jobType: "",
    location: "",
    experience: "",
    searchTerm: "",
  });
  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  // Get unique filter options
  const jobTypes = [...new Set(Jobs.map((job) => job.jobType).filter(Boolean))];
  const locations = [...new Set(Jobs.map((job) => job.jobLocation).filter(Boolean))];

  // Filter jobs based on filters and search
  const filteredJobs = Jobs.filter((job) => {
    // Empty string means "Select All"
    const matchesJobType = filters.jobType === "" || job.jobType === filters.jobType;
    const matchesLocation = filters.location === "" || job.jobLocation === filters.location;
    const matchesExperience = filters.experience === "" || job.experience === filters.experience;
    const matchesSearch =
      !filters.searchTerm ||
      job.jobTitle?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      job.jobDescription?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      job.jobStatus?.toLowerCase().includes(filters.searchTerm.toLowerCase());
    return matchesJobType && matchesLocation && matchesExperience && matchesSearch;
  });

  const handleFilterChange = (filterName, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
    setPage(0); // Reset to first page when filter changes
  };

  const handleClearFilters = () => {
    setFilters({
      jobType: "",
      location: "",
      experience: "",
      searchTerm: "",
    });
    setPage(0); // Reset to first page
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Fetch jobs on component mount
  useEffect(() => {
    dispatch(getAllJobs());
  }, [dispatch]);

  const handleViewDetails = (job) => {
    setSelectedJob(job);
    setOpenDetailsModal(true);
  };

  const handleApply = async(job) => {
     if(!isLoggedIn){
      navigate("/login");
      return;
    }
    setSelectedJob(job);
    const initialCustomValues = {};
    (job.customApplicationFields || []).forEach((f) => {
      initialCustomValues[f.id] = "";
    });
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      experience: "",
      skills: "",
      coverLetter: "",
      linkedIn: "",
      customFieldValues: initialCustomValues,
    });
    setFormErrors({});
    setOpenDetailsModal(false);
    setOpenApplicationModal(true);
  };

  const validateForm = () => {
    const errors = {};
    const fieldConfig = selectedJob?.applicationFormFields || APPLICATION_FORM_FIELDS_DEFAULT;

    const validations = {
      firstName: () => !formData.firstName?.trim() && "First name is required",
      lastName: () => !formData.lastName?.trim() && "Last name is required",
      email: () => (!formData.email?.trim() || !/\S+@\S+\.\S+/.test(formData.email)) && "Valid email is required",
      phoneNumber: () => (!formData.phoneNumber?.trim() || !/^\d{10}$/.test(formData.phoneNumber)) && "Valid 10-digit phone number is required",
      experience: () => !formData.experience?.trim() && "Experience is required",
      skills: () => !formData.skills?.trim() && "Skills are required",
      coverLetter: () => !formData.coverLetter?.trim() && "Cover letter is required",
      linkedIn: () => !formData.linkedIn?.trim() && "LinkedIn profile is required",
    };

    Object.entries(fieldConfig).forEach(([fieldKey, config]) => {
      if (config.enabled && config.required && validations[fieldKey]) {
        const error = validations[fieldKey]();
        if (error) errors[fieldKey] = error;
      }
    });

    // Validate custom fields
    (selectedJob?.customApplicationFields || []).forEach((field) => {
      if (field.required) {
        const value = formData.customFieldValues?.[field.id];
        if (!value?.toString().trim()) {
          errors[`custom_${field.id}`] = `${field.label || "This field"} is required`;
        }
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("custom_")) {
      const fieldId = name.replace("custom_", "");
      setFormData((prev) => ({
        ...prev,
        customFieldValues: {
          ...(prev.customFieldValues || {}),
          [fieldId]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    const errorKey = name.startsWith("custom_") ? name : name;
    if (formErrors[errorKey]) {
      setFormErrors((prev) => ({ ...prev, [errorKey]: "" }));
    }
  };

  const handleSubmitApplication = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    formData.jobId = selectedJob?._id;
    formData.skills = typeof formData.skills === "string"
      ? formData.skills.split(",").map((skill) => skill.trim()).filter(Boolean)
      : formData.skills || [];
    formData.userId = _id;
    console.log("Submitting application with data:", formData.userId);
    try {
      // Dispatch applyForTheJob action
      dispatch(applyForTheJob({...formData}));

      // Optimistically update the job's appliedCandidates array
      dispatch(updateJobApplicationStatus({
        jobId: selectedJob?._id,
        userId: _id
      }));

      setSnackbar({
        open: true,
        message: "Application submitted successfully!",
        severity: "success",
      });

      setOpenApplicationModal(false);
      
    } catch (error) {
      console.error("Error submitting application:", error);
      setSnackbar({
        open: true,
        message: "Error submitting application. Please try again.",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };


  if (isError) {
    return (
      <Container sx={{ py: 5 }}>
        <Alert severity="error">{errorMessage || "Failed to load job opportunities"}</Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", mt: 8, bgcolor: mode === "dark" ? "#1a1a1a" : "#f5f7fa", py: 4 }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: "800",
              mb: 2,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Explore Opportunities
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: mode === "dark" ? "#aaa" : "#666",
              fontWeight: "400",
              mb: 1,
            }}
          >
            Find your next career opportunity with us
          </Typography>
          <Box
            sx={{
              width: "60px",
              height: "4px",
              background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
              margin: "0 auto",
              borderRadius: "2px",
            }}
          />
        </Box>

        {isJobsLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8, color: mode === "dark" ? "#fff" : "#000" }}>
            <CircularProgress sx={{ color: mode === "dark" ? "#fff" : "#000"}}/>
          </Box>
        )}

        {isError && (
          <Alert
            severity="error"
            sx={{
              fontSize: "16px",
              py: 2,
              borderRadius: "12px",
              boxShadow: 2,
            }}
          >
            {errorMessage || "Failed to load job opportunities"}
          </Alert>
        )}

        {!isJobsLoading && !isError && (!Jobs || Jobs.length === 0) && ( 
          <Paper
            elevation={3}
            sx={{
              p: 5,
              textAlign: "center",
              borderRadius: "16px",
              bgcolor: mode === "dark" ? "#2a2a2a" : "#fff",
            }}
          >
            <WorkIcon sx={{ fontSize: 80, color: "action.disabled", mb: 2 }} />
            <Typography variant="h5" sx={{ mb: 1 }}>
              No Job Opportunities
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Check back soon for exciting opportunities
            </Typography>
          </Paper>
        )}

        {!isJobsLoading && !isError && Jobs && Jobs.length > 0 && (
          <Box>
            {/* Filter Section */}
            <Paper
              elevation={2}
              sx={{
                p: 3,
                mb: 4,
                borderRadius: "16px",
                bgcolor: mode === "dark" ? "#2a2a2a" : "#fff",
                border: mode === "dark" ? "1px solid #444" : "1px solid #eee",
              }}
            >
              <Grid container spacing={2}>
                {/* Search */}
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    fullWidth
                    placeholder="Search jobs..."
                    value={filters.searchTerm}
                    onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
                    size="small"
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                      },
                    }}
                  />
                </Grid>

                {/* Job Type Filter */}
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    fullWidth
                    select
                    label="Job Type"
                    value={filters.jobType}
                    onChange={(e) => handleFilterChange("jobType", e.target.value)}
                    size="small"
                    variant="outlined"
                    SelectProps={{
                      native: true,
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        "&:hover fieldset": {
                          borderColor: "#667eea",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#667eea",
                        },
                      },
                      "& .MuiInputBase-input": {
                        padding: "10px 12px",
                        overflow: "visible !important",
                      },
                      "& label": {
                        transform: "translate(14px, -9px) scale(0.75)",
                      },
                      "& label.Mui-focused": {
                        color: "#667eea",
                      },
                    }}
                  >
                    <option value="">Select All</option>
                    {jobTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </TextField>
                </Grid>

                {/* Location Filter */}
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    fullWidth
                    select
                    label="Location"
                    value={filters.location}
                    onChange={(e) => handleFilterChange("location", e.target.value)}
                    size="small"
                    variant="outlined"
                    SelectProps={{
                      native: true,
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        "&:hover fieldset": {
                          borderColor: "#667eea",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#667eea",
                        },
                      },
                      "& .MuiInputBase-input": {
                        padding: "10px 12px",
                        overflow: "visible !important",
                        textOverflow: "clip",
                        whiteSpace: "normal",
                      },
                      "& label": {
                        transform: "translate(14px, -9px) scale(0.75)",
                      },
                      "& label.Mui-focused": {
                        color: "#667eea",
                      },
                    }}
                  >
                    <option value="">Select All</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </TextField>
                </Grid>
                {/* Clear Filters Button */}
                <Grid item xs={12}>
                  {(filters.jobType || filters.location || filters.experience || filters.searchTerm) && (
                    <Button
                      onClick={handleClearFilters}
                      variant="outlined"
                      size="small"
                      sx={{
                        borderRadius: "8px",
                        textTransform: "none",
                        borderColor: "#667eea",
                        color: "#667eea",
                        "&:hover": {
                          backgroundColor: "rgba(102, 126, 234, 0.08)",
                        },
                      }}
                    >
                      Clear All Filters
                    </Button>
                  )}
                  <Typography
                    variant="caption"
                    sx={{
                      ml: 2,
                      color: mode === "dark" ? "#aaa" : "#999",
                    }}
                  >
                    Showing {filteredJobs.length} of {Jobs.length} jobs
                  </Typography>
                </Grid>
              </Grid>
            </Paper>

            {/* Jobs Grid */}
            {filteredJobs.length === 0 ? (
              <Paper
                elevation={2}
                sx={{
                  p: 5,
                  textAlign: "center",
                  borderRadius: "16px",
                  bgcolor: mode === "dark" ? "#2a2a2a" : "#fff",
                }}
              >
                <WorkIcon sx={{ fontSize: 60, color: "action.disabled", mb: 2 }} />
                <Typography variant="h6" sx={{ mb: 1 }}>
                  No jobs match your filters
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  Try adjusting your search criteria
                </Typography>
                <Button
                  onClick={handleClearFilters}
                  variant="outlined"
                  sx={{
                    borderRadius: "8px",
                    borderColor: "#667eea",
                    color: "#667eea",
                    "&:hover": {
                      backgroundColor: "rgba(102, 126, 234, 0.08)",
                    },
                  }}
                >
                  Clear Filters
                </Button>
              </Paper>
            ) : (
              <>
                <Grid container spacing={3} sx={{ justifyContent: "center", mb: 3 }}>
                  {filteredJobs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((job, index) => (
              <Grid height="100%" width="30%" item xs={12} sm={8} md={6} lg={5} key={job._id || job.id || index}>
                <Card
                  sx={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "16px",
                    backgroundColor: mode === "dark" ? "#2a2a2a" : "#fff",
                    border: mode === "dark" ? "1px solid #444" : "1px solid #eee",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    overflow: "hidden",
                    position: "relative",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "4px",
                      background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                    },
                    "&:hover": {
                      transform: "translateY(-12px)",
                      boxShadow:
                        mode === "dark"
                          ? "0 20px 40px rgba(102, 126, 234, 0.15)"
                          : "0 20px 40px rgba(102, 126, 234, 0.25)",
                    },
                    cursor: "pointer",
                  }}
                >
                  <CardContent sx={{ flex: 1, pb: 2 }}>
                    {/* Job Title */}
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{
                        fontWeight: "700",
                        mb: 2,
                        color: mode === "dark" ? "#fff" : "#1a1a1a",
                        fontSize: "18px",
                        lineHeight: 1.3,
                      }}
                    >
                      {job.jobTitle || "Job Title"}
                    </Typography>

                    {/* Info Row 1: Skill */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                      <Box
                        sx={{
                          p: 0.8,
                          borderRadius: "8px",
                          bgcolor: mode === "dark" ? "#3a3a3a" : "#f0f2f5",
                        }}
                      >
                        <SchoolIcon
                          sx={{ fontSize: 18, color: "#667eea" }}
                        />
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: mode === "dark" ? "#bbb" : "#555",
                          fontWeight: "500",
                        }}
                      >
                        {job.skillsRequired.join(", ") || "Skill"}
                      </Typography>
                    </Box>

                    {/* Info Row 2: Location */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                      <Box
                        sx={{
                          p: 0.8,
                          borderRadius: "8px",
                          bgcolor: mode === "dark" ? "#3a3a3a" : "#f0f2f5",
                        }}
                      >
                        <LocationOnIcon
                          sx={{ fontSize: 18, color: "#ff6b6b" }}
                        />
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: mode === "dark" ? "#bbb" : "#555",
                          fontWeight: "500",
                        }}
                      >
                        {job.jobLocation + " " + job.country || "Location"}
                      </Typography>
                    </Box>

                    {/* Info Row 3: Salary */}
                    {job.salary && (
                      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
                        <Box
                          sx={{
                            p: 0.8,
                            borderRadius: "8px",
                            bgcolor: mode === "dark" ? "#3a3a3a" : "#f0f2f5",
                          }}
                        >
                          <CurrencyRupeeIcon
                            sx={{ fontSize: 18, color: "#51cf66" }}
                          />
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: "600",
                            color: mode === "dark" ? "#bbb" : "#555",
                          }}
                        >
                          {job.salary}
                        </Typography>
                      </Box>
                    )}

                    {/* Divider */}
                    <Divider sx={{ my: 1.5, opacity: 0.5 }} />

                    {/* Badges */}
                    <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap", alignItems: "center" }}>
                      {job.jobType && (
                        <Chip
                          label={job.jobType}
                          size="small"
                          sx={{
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            color: "#fff",
                            fontWeight: "600",
                            borderRadius: "6px",
                          }}
                        />
                      )}
                      {job.experience && (
                        <Chip
                          icon={<SchoolIcon />}
                          label={`${job.experience} yrs`}
                          size="small"
                          variant="outlined"
                          sx={{
                            color: "#667eea",
                            borderColor: "#667eea",
                            borderRadius: "6px",
                          }}
                        />
                      )}
                      {getFieldValue(job, "status", "jobStatus") && (
                        <Chip
                          icon={<StatusIcon sx={{ fontSize: 12 }} />}
                          label={getFieldValue(job, "status", "jobStatus")}
                          size="small"
                          sx={{
                            background:
                              getFieldValue(job, "status", "jobStatus") === "Active"
                                ? "rgba(81, 207, 102, 0.2)"
                                : "rgba(255, 107, 107, 0.2)",
                            color: getFieldValue(job, "status", "jobStatus") === "Active" ? "#51cf66" : "#ff6b6b",
                            fontWeight: "600",
                            borderRadius: "6px",
                          }}
                        />
                      )}
                    </Box>

                    {/* Date Info Row */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8, mb: 2 }}>
                      {getFieldValue(job, "createdDate", "created_date", "createdAt", "created_at") && (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <EventIcon sx={{ fontSize: 16, color: "#667eea" }} />
                          <Typography variant="caption" sx={{ color: mode === "dark" ? "#999" : "#888", fontWeight: "500" }}>
                            Posted: <span style={{ fontWeight: "600" }}>{formatDate(getFieldValue(job, "createdAt"))}</span>
                          </Typography>
                          <Typography variant="caption" sx={{ color: mode === "dark" ? "#999" : "#888", fontWeight: "500" }}>
                            End Date: <span style={{ fontWeight: "600" }}>{formatDate(getFieldValue(job, "lastdateToApply"))}</span>
                          </Typography>
                        </Box>
                      )}
                      {getFieldValue(job, "lastApplyDate", "last_apply_date", "lastApplyAt", "last_apply_at", "applicationDeadline") && (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <EventIcon sx={{ fontSize: 16, color: "#ffd93d" }} />
                          <Typography variant="caption" sx={{ color: mode === "dark" ? "#999" : "#888", fontWeight: "500" }}>
                            Apply by: <span style={{ fontWeight: "600", color: getFieldValue(job, "jobStatus") === "Active" ? mode === "dark" ? "#ffd93d" : "#ff9800" : "#ff6b6b" }}>{formatDate(getFieldValue(job, "lastApplyDate", "last_apply_date", "lastApplyAt", "last_apply_at", "applicationDeadline"))}</span>
                          </Typography>
                        </Box>
                      )}
                    </Box>

                    {/* Description Preview */}
                    <Typography
                      variant="body2"
                      sx={{
                        color: mode === "dark" ? "#999" : "#777",
                        display: "-webkit-box",
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        lineHeight: 1,
                        mb: 2,
                      }}
                    >
                      {job.jobDescription || "No description provided"}
                    </Typography>
                  </CardContent>

                  {/* Action Buttons */}
                  <Box sx={{ display: "flex", gap: 1, p: 2, pt: 0 }}>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => handleViewDetails(job)}
                      sx={{
                        borderRadius: "8px",
                        fontWeight: "600",
                        textTransform: "none",
                        fontSize: "14px",
                        borderColor: "#667eea",
                        color: "#667eea",
                        "&:hover": {
                          borderColor: "#667eea",
                          backgroundColor: "rgba(102, 126, 234, 0.08)",
                        },
                      }}
                    >
                      Details
                    </Button>
                    <Button
                      variant="contained"
                      fullWidth
                      disabled={getFieldValue(job, "jobStatus") !== "Active" || job.appliedCandidates.includes(_id)}
                      onClick={() => handleApply(job)}
                      endIcon={job.appliedCandidates.includes(_id) ? <CheckIcon /> : <ArrowForwardIcon />}
                      sx={{
                        borderRadius: "8px",
                        fontWeight: "600",
                        textTransform: "none",
                        fontSize: "14px",
                        background: job.appliedCandidates.includes(_id) ? "linear-gradient(135deg, #65666e 0%, #686b66 100%)" : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        "&:hover": {
                          boxShadow: "0 8px 16px rgba(102, 126, 234, 0.4)",
                        },
                        "&.Mui-disabled": {
                          cursor: "not-allowed",
                          pointerEvents: "auto",
                        },
                        cursor: getFieldValue(job, "jobStatus") !== "Active" || job.appliedCandidates.includes(_id) ? "not-allowed" : "pointer",
                      }}
                    >
                     {isLoggedIn ? job.appliedCandidates.includes(_id) ? "Applied" : "Apply" : "Login to Apply"}
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
                </Grid>

                {/* Pagination */}
                <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                  <TablePagination
                    component="div"
                    count={filteredJobs.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[6, 12, 18, 24]}
                    sx={{
                      "& .MuiTablePagination-root": {
                        borderTop: mode === "dark" ? "1px solid #444" : "1px solid #eee",
                        backgroundColor: mode === "dark" ? "#1f1f1f" : "#f9f9f9",
                        borderRadius: "12px",
                      },
                      "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
                        color: mode === "dark" ? "#bbb" : "#666",
                        margin: "8px 0",
                      },
                      "& .MuiSelect-icon": {
                        color: mode === "dark" ? "#667eea" : "#667eea",
                      },
                      "& .MuiIconButton-root": {
                        color: mode === "dark" ? "#667eea" : "#667eea",
                      },
                    }}
                  />
                </Box>
              </>
            )}
          </Box>
        )}

      {/* Job Details Modal */}
      <Dialog
        open={openDetailsModal}
        onClose={() => setOpenDetailsModal(false)}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Fade}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Box
          sx={{
            background: mode === "dark" ? "#2a2a2a" : "#fff",
            position: "relative",
          }}
        >
          <Box
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "#fff",
              p: 3,
              position: "relative",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
                cursor: "pointer",
              }}
            >
              <Button
                onClick={() => setOpenDetailsModal(false)}
                sx={{ color: "#fff", minWidth: "auto" }}
              >
                <CloseIcon />
              </Button>
            </Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "700",
                mb: 0.5,
              }}
            >
              {selectedJob?.jobTitle || "Job Details"}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              {selectedJob?.skillsRequired?.join(", ") || "Skill"} • {selectedJob?.jobLocation || "Location"}
            </Typography>
          </Box>

          <DialogContent sx={{ py: 3 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
              {/* Skill Info */}
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <SchoolIcon
                    sx={{
                      color: "#667eea",
                      fontSize: 20,
                    }}
                  />
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "700", color: mode === "dark" ? "#fff" : "#333" }}
                  >
                    Skill
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{ ml: 4, color: mode === "dark" ? "#bbb" : "#666" }}
                >
                  {selectedJob?.skillsRequired?.join(", ") || "N/A"}
                </Typography>
              </Box>
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <LocationOnIcon
                    sx={{
                      color: "#ff6b6b",
                      fontSize: 20,
                    }}
                  />
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "700", color: mode === "dark" ? "#fff" : "#333" }}
                  >
                    Location
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{ ml: 4, color: mode === "dark" ? "#bbb" : "#666" }}
                >
                  {selectedJob?.country || "N/A"}
                </Typography>
              </Box>
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                  <WorkIcon
                    sx={{
                      color: "#51cf66",
                      fontSize: 20,
                    }}
                  />
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: "700", color: mode === "dark" ? "#fff" : "#333" }}
                  >
                    Employment Type
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{ ml: 4, color: mode === "dark" ? "#bbb" : "#666" }}
                >
                  {getFieldValue(selectedJob, "jobType") || "N/A"}
                </Typography>
              </Box>
              {/* Status */}
              {getFieldValue(selectedJob,"jobStatus") && (
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <StatusIcon
                      sx={{
                        color: getFieldValue(selectedJob, "jobStatus") === "Active" ? "#51cf66" : "#ff6b6b",
                        fontSize: 20,
                      }}
                    />
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: "700", color: mode === "dark" ? "#fff" : "#333" }}
                    >
                      Job Status
                    </Typography>
                  </Box>
                  <Box sx={{ ml: 4 }}>
                    <Chip
                      label={getFieldValue(selectedJob, "status", "jobStatus")}
                      sx={{
                        background:
                          getFieldValue(selectedJob, "status", "jobStatus") === "Active"
                            ? "rgba(81, 207, 102, 0.2)"
                            : "rgba(255, 107, 107, 0.2)",
                        color: getFieldValue(selectedJob, "status", "jobStatus") === "Active" ? "#51cf66" : "#ff6b6b",
                        fontWeight: "600",
                      }}
                    />
                  </Box>
                </Box>
              )}
              {getFieldValue(selectedJob, "createdDate", "created_date", "createdAt", "created_at") && (
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <EventIcon
                      sx={{
                        color: "#667eea",
                        fontSize: 20,
                      }}
                    />
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: "700", color: mode === "dark" ? "#fff" : "#333" }}
                    >
                      Posted Date
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ ml: 4, color: mode === "dark" ? "#bbb" : "#666" }}
                  >
                   {formatDate(getFieldValue(selectedJob, "createdAt"))}
                  </Typography>
                </Box>
              )}
              {getFieldValue(selectedJob, "lastdateToApply") && (
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <EventIcon
                      sx={{
                        color: "#ffd93d",
                        fontSize: 20,
                      }}
                    />
                    <Typography
                      variant="subtitle2"
                      sx={{ fontWeight: "700", color: mode === "dark" ? "#fff" : "#333" }}
                    >
                      Last Date to Apply
                    </Typography>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ ml: 4, color: mode === "dark" ? "#bbb" : "#666", fontWeight: "600" }}
                  >
                    {formatDate(getFieldValue(selectedJob, "lastdateToApply"))}
                  </Typography>
                </Box>
              )}

              <Divider sx={{ my: 1 }} />

              {/* Description */}
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: "700", mb: 1, color: mode === "dark" ? "#fff" : "#333" }}
                >
                  About the Role
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: mode === "dark" ? "#bbb" : "#666", lineHeight: 1.6 }}
                >
                  {selectedJob?.jobDescription || "No description provided"}
                </Typography>
              </Box>
            </Box>
          </DialogContent>

          <DialogActions sx={{ p: 3, gap: 1, borderTop: `1px solid ${mode === "dark" ? "#444" : "#eee"}` }}>
            <Button
              onClick={() => setOpenDetailsModal(false)}
              variant="outlined"
              sx={{
                borderRadius: "8px",
                color: 'inherit',
                borderColor: mode === "dark" ? "#666" : "#ccc",
                fontWeight: "600",
                textTransform: "none",
              }}
            >
              Close
            </Button>
            <Button
              variant="contained"
              onClick={() => handleApply(selectedJob)}
              disabled={selectedJob?.appliedCandidates.includes(_id) || getFieldValue(selectedJob, "jobStatus") !== "Active"}
              sx={{
                borderRadius: "8px",
                fontWeight: "600",
                textTransform: "none",
                background:  selectedJob?.appliedCandidates.includes(_id) ? "linear-gradient(135deg, #65666e 0%, #686b66 100%)" : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                "&:hover": {
                  boxShadow: "0 8px 16px rgba(102, 126, 234, 0.4)",
                },
                "&.Mui-disabled": {
                  cursor: "not-allowed",
                  pointerEvents: "auto",
                },
                cursor: selectedJob?.appliedCandidates.includes(_id) || getFieldValue(selectedJob, "jobStatus") !== "Active" ? "not-allowed" : "pointer",
              }}
              endIcon={selectedJob?.appliedCandidates.includes(_id) ? <CheckIcon /> : <ArrowForwardIcon />}
            >
              {selectedJob?.appliedCandidates.includes(_id) ? "Applied" : "Apply Now"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* Application Form Modal */}
      <Modal
        open={openApplicationModal}
        onClose={() => setOpenApplicationModal(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backdropFilter: "blur(4px)",
        }}
      >
        <Fade in={openApplicationModal}>
          <Card
            sx={{
              width: isMobile ? "90%" : "800px",
              maxHeight: "95vh",
              overflowY: "auto",
              borderRadius: "20px",
              backgroundColor: mode === "dark" ? "#2a2a2a" : "#fff",
              position: "relative",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Close Button */}
            <Box
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                zIndex: 10,
              }}
            >
              <Button
                onClick={() => setOpenApplicationModal(false)}
                sx={{
                  minWidth: "auto",
                  p: 1,
                  color: mode === "dark" ? "#fff" : "#333",
                  "&:hover": {
                    backgroundColor: mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                  },
                }}
              >
                <CloseIcon />
              </Button>
            </Box>

            {/* Header */}
            <Box
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "#fff",
                p: 3,
                borderRadius: "20px 20px 0 0",
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: "700", mb: 0.5 }}>
                Apply for {selectedJob?.jobTitle}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Submit your details to get started
              </Typography>
            </Box>

            {/* Form Content */}
            <Box sx={{ p: 3, width: "100%" }}>
              <Box component="form" onSubmit={handleSubmitApplication} sx={{ width: "100%", boxSizing: "border-box" }}>
                <Grid container spacing={2} sx={{ width: "100%", m: 0, boxSizing: "border-box" }}>
                  {(() => {
                    const fieldConfig = selectedJob?.applicationFormFields || APPLICATION_FORM_FIELDS_DEFAULT;
                    const fieldProps = {
                      firstName: { type: "text", placeholder: "", multiline: false, rows: 1 },
                      lastName: { type: "text", placeholder: "", multiline: false, rows: 1 },
                      email: { type: "email", placeholder: "", multiline: false, rows: 1 },
                      phoneNumber: { type: "text", placeholder: "10-digit number", multiline: false, rows: 1 },
                      experience: { type: "number", placeholder: "", multiline: false, rows: 1 },
                      skills: { type: "text", placeholder: "e.g., React, Node.js, Python, etc.", multiline: true, rows: 2 },
                      coverLetter: { type: "text", placeholder: "Tell us why you're interested in this position", multiline: true, rows: 3 },
                      linkedIn: { type: "url", placeholder: "https://linkedin.com/in/yourprofile", multiline: false, rows: 1 },
                    };
                    const getCustomFieldProps = (type) => {
                      const types = {
                        text: { type: "text", multiline: false, rows: 1 },
                        textarea: { type: "text", multiline: true, rows: 3 },
                        email: { type: "email", multiline: false, rows: 1 },
                        url: { type: "url", multiline: false, rows: 1 },
                        number: { type: "number", multiline: false, rows: 1 },
                        phone: { type: "tel", multiline: false, rows: 1 },
                      };
                      return types[type] || types.text;
                    };
                    return (
                      <>
                        {Object.entries(fieldConfig)
                          .filter(([, config]) => config.enabled)
                          .map(([fieldKey, config]) => (
                            <Grid item xs={12} key={fieldKey}>
                              <TextField
                                fullWidth
                                required={config.required}
                                label={config.label}
                                name={fieldKey}
                                type={fieldProps[fieldKey]?.type || "text"}
                                value={formData[fieldKey] || ""}
                                onChange={handleInputChange}
                                error={!!formErrors[fieldKey]}
                                helperText={formErrors[fieldKey]}
                                variant="outlined"
                                size={fieldProps[fieldKey]?.multiline ? "medium" : "small"}
                                multiline={fieldProps[fieldKey]?.multiline || false}
                                rows={fieldProps[fieldKey]?.rows || 1}
                                placeholder={fieldProps[fieldKey]?.placeholder}
                                sx={textFieldStyles}
                              />
                            </Grid>
                          ))}
                        {(selectedJob?.customApplicationFields || []).map((field) => {
                          const props = getCustomFieldProps(field.type);
                          return (
                            <Grid item xs={12} key={field.id}>
                              <TextField
                                fullWidth
                                required={field.required}
                                label={field.label || "Custom Field"}
                                name={`custom_${field.id}`}
                                type={props.type}
                                value={formData.customFieldValues?.[field.id] || ""}
                                onChange={handleInputChange}
                                error={!!formErrors[`custom_${field.id}`]}
                                helperText={formErrors[`custom_${field.id}`]}
                                variant="outlined"
                                size={props.multiline ? "medium" : "small"}
                                multiline={props.multiline || false}
                                rows={props.rows || 1}
                                placeholder={field.label ? `Enter ${field.label.toLowerCase()}` : ""}
                                sx={textFieldStyles}
                              />
                            </Grid>
                          );
                        })}
                      </>
                    );
                  })()}
                </Grid>

                {/* Buttons */}
                <Box sx={{ display: "flex", gap: 2, mt: 4 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => setOpenApplicationModal(false)}
                    sx={{
                      borderRadius: "10px",
                      fontWeight: "600",
                      textTransform: "none",
                      fontSize: "15px",
                      py: 1.2,
                      color: 'inherit',
                      borderColor: mode === "dark" ? "#666" : "#ccc",
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    sx={{
                      borderRadius: "10px",
                      fontWeight: "600",
                      textTransform: "none",
                      fontSize: "15px",
                      py: 1.2,
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      "&:hover": {
                        boxShadow: "0 8px 16px rgba(102, 126, 234, 0.4)",
                      },
                    }}
                  >
                    Submit Application
                  </Button>
                </Box>
              </Box>
            </Box>
          </Card>
        </Fade>
      </Modal>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{
            borderRadius: "10px",
            boxShadow: 3,
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
    </Box>
  );
}