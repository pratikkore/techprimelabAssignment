import {
  Alert,
  Card,
  CardContent,
  Grid,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useRef } from "react";
import { useEffect } from "react";
import Highcharts from "highcharts";
import axios from "axios";
import { useState } from "react";
import "./dashboard.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Loader from "../loader/loader";

function Dashboard() {
  const chartRef = useRef(null);
  const [projectStatusCounts, setProjectStatusCounts] = useState({});
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [sev, setSev] = useState("error");
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjectStatusData();
    getChartsData();
  }, []);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const getProjectStatusData = () => {
    console.log(token + "bhd");
    axios
      .get("http://localhost:8000/protected/project/projectStatusCount", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setMsg("Project Count and Details getting Successfully!!!");
          setOpen(true);
          setProjectStatusCounts(response.data);
          setSev("success");
        } else {
          setMsg("Something went Wrong!!!");
          setOpen(true);
          setSev("error");
          console.log();
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
      })
      .finally(() => {
        setTimeout(()=>{
      setLoading(false);

    },2000)
      });
  };

  const getChartsData = () => {
    axios
      .get("http://localhost:8000/protected/project/chart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          const dept = [];

          const closeData = [];
          const totalData = [];
          response.data.forEach((d) => {
            const succesPer = Math.ceil((d.closedCount / d.TotalCount) * 100);
            dept.push("<b>" + succesPer + "%</b> <br> <br>" + d.department);
            closeData.push(d.closedCount);
            totalData.push(d.TotalCount);
          });
          const series = [
            {
              name: "Total",
              data: totalData,
              color: "blue",
            },
            {
              name: "Closed",
              data: closeData,
              color: "green",
            },
          ];
          console.log(dept, "dd");
          if (chartRef.current) {
            Highcharts.chart(chartRef.current, {
              chart: {
                type: "column",
              },
              xAxis: {
                categories: dept,
                crosshair: true,
              },
              plotOptions: {
                series: {
                  borderRadius: 4,
                  pointWidth: 15,
                },
                column: {
                  dataLabels: {
                    enabled: true,
                  },
                },
              },
              stackLabels: {
                enabled: true,
                verticalAlign: "bottom",
                crop: false,
                overflow: "none",
                y: -275,
              },
              series: series,
            });
          }
        } else {
          console.log();
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

  return (
    <>
      <div className="DashBoardText">
        <h2 className="removePadding">DashBoard</h2>
      </div>
      <div className="data-container">
        <Grid container spacing={2}>
          <Grid item className="w-20 count-container">
            <Card variant="outlined">
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Total Projects
                </Typography>
                <h1>{projectStatusCounts.total}</h1>
              </CardContent>
            </Card>
          </Grid>

          <Grid item className="w-20 count-container">
            <Card variant="outlined">
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Closed
                </Typography>
                <h1>{projectStatusCounts.closed}</h1>
              </CardContent>
            </Card>
          </Grid>

          <Grid item className="w-20 count-container">
            <Card variant="outlined">
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Running
                </Typography>
                <h1>{projectStatusCounts.running}</h1>
              </CardContent>
            </Card>
          </Grid>

          <Grid item className="w-20 count-container">
            <Card variant="outlined">
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Closure Delay
                </Typography>
                <h1>{projectStatusCounts.colsureDelay}</h1>
              </CardContent>
            </Card>
          </Grid>

          <Grid item className="w-20 count-container">
            <Card variant="outlined">
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Cancelled
                </Typography>
                <h1>{projectStatusCounts.canceled}</h1>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <h3>Department wise - Total Vs Closed</h3>
        <div className="w-60" ref={chartRef}></div>

        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            severity={sev}
            icon={<CheckCircleIcon />}
            sx={{ width: "100%" }}
          >
            {msg}
          </Alert>
        </Snackbar>

        {loading && <Loader />}
      </div>
    </>
  );
}

export default Dashboard;
