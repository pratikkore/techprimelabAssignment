/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import CreateProject from "../create-project/create-project";
import Dashboard from "../dashboard/dashboard";
import UserLogin from "../user-data/UserLogin";
import HeaderLogo from "../../Images/Header-bg.svg";
import logo from "../../Images/Logo.svg";
import "./side-navbar.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
  NavLink,
  useLocation,
  Navigate,
} from "react-router-dom";
import { Container, Drawer, List, ListItem, ListItemText } from "@mui/material";

import createProjectActiveImg from "../../Images/create-project-active.svg";
import createProjectImg from "../../Images/create-project.svg";

import dashboardActiveImg from "../../Images/Dashboard-active.svg";
import dashboardImg from "../../Images/Dashboard.svg";

import projectActiveListImg from "../../Images/Project-list-active.svg";
import projectListImg from "../../Images/Project-list.svg";

import logoutImg from "../../Images/Logout.svg";

function SideNavbar({ onLogout }) {
  const [createProject, setcreateProject] = useState(false);
  const [dashboardProject, setdashboardProject] = useState(true);
  const [createProjectlist, setProjectlist] = useState(false);

  const onClickDashboard = () => {
    setdashboardProject(true);
    setProjectlist(false);
    setcreateProject(false);
  };

  const onClickProjectList = () => {
    setdashboardProject(false);
    setProjectlist(true);
    setcreateProject(false);
  };

  const onClickCreateProject = () => {
    setdashboardProject(false);
    setProjectlist(false);
    setcreateProject(true);
  };

  return (
    <div>
      {/* {location} */}
      <img src={HeaderLogo} className="w-t-100" alt="backgound img" />
      <div className="logo-img logo-header-img">
        <img src={logo} alt="Logo image" />
      </div>

      <Drawer variant="permanent">
        <List>
          <div className="side-div">
            <ListItem
              onClick={() => onClickDashboard()}
              button
              component={NavLink}
              className={dashboardProject ? "active" : ""}
              to="/"
            >
              <img src={dashboardProject ? dashboardActiveImg : dashboardImg} />
            </ListItem>

            <ListItem
              className={createProjectlist ? "active" : ""}
              onClick={onClickProjectList}
              button
              component={NavLink}
              to="/projectlist"
            >
              <img
                src={createProjectlist ? projectActiveListImg : projectListImg}
              />
            </ListItem>

            <ListItem
              button
              onClick={onClickCreateProject}
              className={createProject ? "active" : ""}
              component={NavLink}
              to="/create-project"
            >
              <img
                src={createProject ? createProjectActiveImg : createProjectImg}
              />
            </ListItem>
          </div>
          <div>
            <ListItem button onClick={onLogout}>
              <img src={logoutImg} />
            </ListItem>
          </div>
        </List>
      </Drawer>
    </div>
  );
}

export default SideNavbar;
