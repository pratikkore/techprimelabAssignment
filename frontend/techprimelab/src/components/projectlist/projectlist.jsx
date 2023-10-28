import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableSortLabel from "@mui/material/TableSortLabel";
import Input from "@mui/material/Input";
import {
  Button,
  Select,
  MenuItem,
  Stack,
  Pagination,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SearchIcon from "@mui/icons-material/Search";

import "./projectlist.css";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";


function Projectlist() {
  const [data, setData] = useState([]);
  const [orgData, setOrgData] = useState([]);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [status, setStatus] = useState(false);
  const [sortingData, setSortingData] = useState("Priority");
  const [totalRecords, setTotalRecords] = useState(0);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [sev, setSev] = useState("error");
  const navigate = useNavigate();

  const sortingOption = [
    "ProjectName",
    "StartDate",
    "EndDate",
    "Priority",
    "Type",
    "Reason",
    "Status",
    "Divison",
    "Category",
    "Location",
  ];
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const handleChange = (event, value) => {
    setPage(value);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const UpdateProject = (url) => {
    console.log(url);
    axios
      .patch("http://localhost:8000/project/updateStatus/" + url)
      .then((response) => {
        if (response.status === 200) {
          setStatus(true);
          console.log(response);
          navigate("/");
          setOpen(true);
          setMsg("Project Stats updated successfully!!");
          setSev("success");
        } else {
          setMsg("Something went Wrong!!!");
          setOpen(true);
          setSev("error");
        }
      })
      .catch((err) => {
        setMsg("Something went Wrong!!!");
        setOpen(true);
        setSev("error");
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/project/projectList?sortField=" + sortingData)
      .then((response) => {
        if (response.status == 200) {
          console.log(response);
          setStatus(false);
          setOrgData(response.data.data);
          setMsg("Project List Get SuccesFully sorting on " + sortingData);
          setOpen(true);
          setSev("success");
          if (search) {
            handleS(search);
          } else {
            setTotalRecords(Math.ceil(response.data.data.length / 5));
            setData(response.data.data.slice(startIndex, endIndex));
          }
        } else {
          setMsg("Something went Wrong!!!");
          setOpen(true);
          setSev("error");
        }
      })
      .catch((err) => {
        setMsg("Something went Wrong!!!");
        setOpen(true);
        setSev("error");
      });
  }, [status, sortingData, page]);

  const handleS = (value) => {
    setSearch(value);
  

    value = value.toLowerCase(); 

    const result = orgData.filter((item) => {
      return Object.values(item).some((e) => {
        return String(e).toLowerCase().includes(value);
      });
    });

    if (result.length > 0) {
      setMsg("Project Search Successfully!!");
      setOpen(true);
      setSev("success");
    } else {
      setMsg("No Matching records found!!");
      setOpen(true);
      setSev("error");
    }

    setData(result.slice(startIndex, endIndex));
    setTotalRecords(Math.ceil(result.length / 5));
  };

  return (
    <div>
      <div className="DashBoardText">
        <ArrowBackIosIcon />
        <h2 className="removePadding">Project List</h2>
      </div>
      <div className="main-container-list">
        <div className="align-header">
          <div className="align-header-search">
            <TextField
              placeholder="Search"
              onChange={(e) => handleS(e.target.value)}
              value={search}
              InputProps={{
                startAdornment: <SearchIcon style={{ color: "gray" }} />,
              }}
            />
          </div>
          <div className="d-flex">
            <label className="gray-color w-90-px">Sort By : </label>
            <Select
              value={sortingData}
              onChange={(e) => setSortingData(e.target.value)}
              fullWidth
              variant="outlined"
            >
              {sortingOption.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </div>
        </div>
        <TableContainer className="list-conatiner" component={Paper}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel>Project Theme</TableSortLabel>
                </TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Division</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Priority</TableCell>

                <TableCell>Department</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Status</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row._id}>
                  <TableCell>
                    <div>
                      <h4>{row.ProjectName}</h4>
                    </div>
                    <div>
                      <p>{row.StartDate + " to " + row.EndDate}</p>
                    </div>
                  </TableCell>
                  <TableCell>{row.Reason}</TableCell>
                  <TableCell>{row.Type}</TableCell>
                  <TableCell>{row.Division}</TableCell>
                  <TableCell>{row.Category}</TableCell>
                  <TableCell>{row.Priority}</TableCell>
                  <TableCell>{row.Department}</TableCell>
                  <TableCell>{row.Location}</TableCell>
                  <TableCell>
                    <h4>{row.Status}</h4>
                  </TableCell>
                  <TableCell className="btn-border">
                    {
                      <Button
                        variant="contained"
                        onClick={() => {
                          UpdateProject(row._id + "/" + "Running");
                        }}
                      >
                        Start
                      </Button>
                    }
                  </TableCell>
                  <TableCell className="btn-border">
                    {
                      <Button
                        variant="outlined"
                        onClick={() => {
                          UpdateProject(row._id + "/" + "Closed");
                        }}
                      >
                        Close
                      </Button>
                    }
                  </TableCell>
                  <TableCell className="btn-border">
                    {
                      <Button
                        variant="outlined"
                        onClick={() => {
                          UpdateProject(row._id + "/" + "Cancelled");
                        }}
                      >
                        Cancel
                      </Button>
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="pagination-div">
          <Stack spacing={2}>
            <Pagination
              count={totalRecords}
              page={page}
              onChange={handleChange}
              showFirstButton
              showLastButton
              color="primary"
            />
          </Stack>
        </div>
      </div>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={sev} icon={<CheckCircleIcon />} sx={{ width: "100%" }}>
          {msg}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Projectlist;
