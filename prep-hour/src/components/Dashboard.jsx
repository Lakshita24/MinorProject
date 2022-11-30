import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import DashMentee from "./Dash_Mentee";
import DashMentor from "./Dash_Mentor";

const drawerWidth = 240;

export default function ResponsiveDrawer() {
  const [rolee, setRolee] = React.useState("");
  const [user, setUser] = React.useState({});
  const nav = useNavigate();

  React.useEffect(() => {
    fetch("http://localhost:8000/getinfo", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((data) => data.json())
      .then((data) => {
        setRolee(data.role);
        setUser(data);
      })
      .catch((err) => {
        nav("/error");
      });
  }, []);

  const { firstName, role, graduationYear } = user;

  const userData = [firstName, "JIIT", role, graduationYear];

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div
      style={{
        color: "white",
        height: "100vh",
        backgroundImage: "linear-gradient(#000000,#130F40)",
      }}
    >
      <Toolbar />
      <Divider />
      <List>
        {userData.map((text, index) => (
          <ListItem
            style={{ textTransform: "capitalize" }}
            key={text}
            disablePadding
          >
            <ListItemButton>
              <ListItemIcon>
                <DoubleArrowIcon color="primary" />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    style={{ fontFamily: "Barlow", letterSpacing: "0.2em" }}
                  >
                    {text}
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem key="Logout" disablePadding>
          <ListItemButton
            onClick={() => {
              fetch("http://localhost:8000/logout", {
                method: "GET",
                headers: {
                  Accept: "appllication/json",
                  "Content-Type": "application/json",
                },
                credentials: "include",
              })
                .then((res) => {
                  nav("/login", { replace: true });
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            <ListItemIcon>
              <LogoutIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography
                  style={{ fontFamily: "Barlow", letterSpacing: "0.2em" }}
                >
                  Logout
                </Typography>
              }
            />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box
      style={{
        height:"100vh",
       
        backgroundImage: "linear-gradient(to left,#000000,#130F40)",
      }}
      sx={{ display: "flex" }}
    >
      <AppBar
        style={{ backgroundImage: "linear-gradient(#000000,#130F40)" }}
        position="fixed"
      >
        <Toolbar>
          <IconButton
            size="large"
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            style={{ textTransform: "capitalize", fontFamily: "Barlow" }}
            variant="h5"
          >
            {" "}
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      {/* <Box sx={{ width: { sm: drawerWidth } }}> */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          ".MuiDrawer-paper": {
            height: "100vh",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      {/* </Box> */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          mt: "4.5vh",
        }}
      >
        {rolee === "Mentor" ? (
          <DashMentor arr={user.mentors !== undefined ? user.mentors : []} />
        ) : (
          <DashMentee arr={user.mentors !== undefined ? user.mentors : []} />
        )}
      </Box>
    </Box>
  );
}
