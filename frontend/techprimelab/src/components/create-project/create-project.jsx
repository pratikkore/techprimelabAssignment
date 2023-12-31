import React, { useEffect, useState } from "react";
import "./create-project.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import {
  Container,
  Grid,
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Loader from "../loader/loader";

function CreateProject() {
  const [projectName, setProjectName] = useState("");
  const [reason, setReason] = useState("For Business");
  const [type, setType] = useState("Internal");
  const [division, setDivision] = useState("Filters");
  const [category, setCategory] = useState("Quality A");
  const [priority, setPriority] = useState("High");
  const [department, setDepartment] = useState("Startegy");
  const [startDate, setStartDate] = useState(dayjs(new Date()));
  const [endDate, setEndDate] = useState(startDate);
  const [location, setLocation] = useState("Pune");

  const [typeOptions, setTypeOptions] = useState([]);
  const [divisionOptions, setDivisionOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [reasonOptions, setReasonOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [priorityOptions, setPriorityOptions] = useState([]);
  const [departmentOptions, setDepartmentsOptions] = useState([]);

  const [loggedIn, setDataSaved] = useState(false);
  const [projectNameError, setProjectNameError] = useState(false);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [sev, setSev] = useState("error");

  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onSave = async () => {
    if (!projectName) {
      setProjectNameError(true);
      return;
    } else {
      setProjectNameError(false);
    }
    setLoading(true);
    const req = {
      StartDate: dayjs(startDate).format("MMM-DD, YYYY"),
      EndDate: dayjs(endDate).format("MMM-DD, YYYY"),
      Reason: reason,
      Type: type,
      Division: division,
      Category: category,
      Priority: priority,
      Department: department,
      Location: location,
      ProjectName: projectName,
    };
    // console.log();

    axios
      .post("http://localhost:8000/protected/project/save", req, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          resetForm();
          console.log("Project data saved successful");
          setDataSaved(true);
          setOpen(true);
          setSev("success");
          setMsg("Project data saved successfully!!");
          // navigate("/");
        } else {
          console.log("login failed");
          setOpen(true);
          setSev("error");
          setMsg("Something went wrong");
          setDataSaved(true);
        }
      })
      .catch((err) => {
        console.error(err);
        setOpen(true);
        setSev("error");
        setMsg("Something went wrong");
        setDataSaved(true);
      });
  };

  useEffect(() => {
    getTypeList();
    getDivisionList();
    getLocationList();
    getReasonList();
    getCategoryList();
    getPriorityList();
    getDepartmentList();
  }, []);

  const getTypeList = () => {
    axios
      .get("http://localhost:8000/protected/type/typelist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setTypeOptions(response.data);
          setType(response.data[0].Type);
        } else {
          console.log(response);
        }
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          setMsg(err?.response?.data?.message);
        } else {
          setMsg("Something went Wrong!!!");
        }
        setOpen(true);
        setSev("error");
      });
  };

  const getDivisionList = () => {
    axios
      .get("http://localhost:8000/protected/division/divisionlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setDivisionOptions(response.data);
          setDivision(response.data[0].Division);
        } else {
          console.log(response);
        }
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          setMsg(err?.response?.data?.message);
        } else {
          setMsg("Something went Wrong!!!");
        }
        setOpen(true);
        setSev("error");
      });
  };

  const getLocationList = () => {
    axios
      .get("http://localhost:8000/protected/location/locationlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setLocationOptions(response.data);
          setLocation(response.data[0].Location);
        } else {
          console.log(response);
        }
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          setMsg(err?.response?.data?.message);
        } else {
          setMsg("Something went Wrong!!!");
        }
        setOpen(true);
        setSev("error");
      });
  };

  const getReasonList = () => {
    axios
      .get("http://localhost:8000/protected/reason/reasonlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setReasonOptions(response.data);
          setReason(response.data[0].Reason);
        } else {
          console.log(response);
        }
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          setMsg(err?.response?.data?.message);
        } else {
          setMsg("Something went Wrong!!!");
        }
        setOpen(true);
        setSev("error");
      });
  };

  const getCategoryList = () => {
    axios
      .get("http://localhost:8000/protected/category/categorylist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setCategoryOptions(response.data);
          setCategory(response.data[0].Category);
        } else {
          console.log(response);
        }
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          setMsg(err?.response?.data?.message);
        } else {
          setMsg("Something went Wrong!!!");
        }
        setOpen(true);
        setSev("error");
      });
  };

  const getPriorityList = () => {
    axios
      .get("http://localhost:8000/protected/priority/priorityList", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setPriorityOptions(response.data);
          setPriority(response.data[0].Priority);
        } else {
          console.log(response);
        }
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          setMsg(err?.response?.data?.message);
        } else {
          setMsg("Something went Wrong!!!");
        }
        setOpen(true);
        setSev("error");
      });
  };

  const getDepartmentList = () => {
    axios
      .get("http://localhost:8000/protected/dept/deptlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setDepartmentsOptions(response.data);
          setDepartment(response.data[0].Department);
        } else {
          console.log(response);
        }
      })
      .catch((err) => {
        if (err?.response?.data?.message) {
          setMsg(err?.response?.data?.message);
        } else {
          setMsg("Something went Wrong!!!");
        }
        setOpen(true);
        setSev("error");
      });
  };

  const resetForm = () => {
    console.log("abc");
    setProjectName("");
    setStartDate(dayjs(new Date()));
    setEndDate(startDate);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <div className="DashBoardText">
        <ArrowBackIosIcon />
        <h2 className="removePadding">Create Project</h2>
      </div>
      <Container className="createProjectContainer" maxWidth="xl">
        <Paper style={{ padding: 30 }}>
          <form>
            <Grid container spacing={4}>
              <Grid item xs={8}>
                <label className="gray-color">Enter Projet Theme</label>
                <TextField
                  fullWidth
                  variant="outlined"
                  required
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  error={projectNameError}
                  helperText={projectNameError && "Project Name is required"}
                />
              </Grid>
              <Grid item xs={4} className="btn-save-pro btn-border">
                <Button
                  onClick={() => {
                    onSave();
                  }}
                  variant="contained"
                >
                  Save Project
                </Button>
              </Grid>
              <Grid item xs={4}>
                <label className="gray-color">Reason</label>
                <Select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  fullWidth
                  variant="outlined"
                >
                  {reasonOptions.map((option, index) => (
                    <MenuItem key={index} value={option.Reason}>
                      {option.Reason}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              <Grid item xs={4}>
                <label className="gray-color">Type</label>
                <Select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  fullWidth
                  variant="outlined"
                >
                  {typeOptions.map((option, index) => (
                    <MenuItem key={index} value={option.Type}>
                      {option.Type}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              <Grid item xs={4}>
                <label className="gray-color">Division</label>
                <Select
                  value={division}
                  onChange={(e) => setDivision(e.target.value)}
                  fullWidth
                  variant="outlined"
                >
                  {divisionOptions.map((option, index) => (
                    <MenuItem key={index} value={option.Division}>
                      {option.Division}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              <Grid item xs={4}>
                <label className="gray-color">category</label>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  fullWidth
                  variant="outlined"
                >
                  {categoryOptions.map((option, index) => (
                    <MenuItem key={index} value={option.Category}>
                      {option.Category}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              <Grid item xs={4}>
                <label className="gray-color">Priority</label>
                <Select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  fullWidth
                  variant="outlined"
                >
                  {priorityOptions.map((option, index) => (
                    <MenuItem key={index} value={option.Priority}>
                      {option.Priority}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              <Grid item xs={4}>
                <label className="gray-color">Department</label>
                <Select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  fullWidth
                  variant="outlined"
                >
                  {departmentOptions.map((option, index) => (
                    <MenuItem key={index} value={option.Department}>
                      {option.Department}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              <Grid item xs={4}>
                <label className="gray-color">
                  Start Date as per Project Plan
                </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      value={startDate}
                      format="MMM-DD, YYYY"
                      required
                      minDate={startDate}
                      maxDate={endDate}
                      onChange={(newValue) => setStartDate(newValue)}
                      fullWidth
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={4}>
                <label className="gray-color">
                  End Date as per Project Plan
                </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                      value={endDate}
                      format="MMM-DD, YYYY"
                      minDate={endDate}
                      required
                      onChange={(newValue) => setEndDate(newValue)}
                      fullWidth
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={4}>
                <label className="gray-color">Location</label>
                <Select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  fullWidth
                  variant="outlined"
                >
                  {locationOptions.map((option, index) => (
                    <MenuItem key={index} value={option.Location}>
                      {option.Location}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={8}></Grid>
              <Grid item xs={4}>
                <div className="status-display">
                  <span className="gray-color">Status: </span>
                  <h3>Registered</h3>
                </div>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={sev} icon={<CheckCircleIcon />} sx={{ width: "100%" }}>
          {msg}
        </Alert>
      </Snackbar>
      {loading && <Loader />}
    </div>
  );
}

export default CreateProject;
