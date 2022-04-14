import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import { styled, alpha } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { BlogContext } from "../store/BlogContext";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { errorNote, successNote } from "../helper/toastNotify";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const Navbar = () => {
  const { myCategories, token, user, setUser, isAuth, setIsAuth } =
    React.useContext(BlogContext);
  const navigate = useNavigate();
  const logoutApi = async (token) => {
    try {
      await axios
        .post(
          "https://blogsato-drf.herokuapp.com/users/auth/logout/",
          { withCredentials: true },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${token}`,
            },
          }
        )
        .then((response) => successNote(response.data.detail));
      // successNote("User Logged Out Succesfully!!!");
    } catch (error) {
      errorNote(error.response.data.non_field_errors[0]);
    }
  };
  let settings = isAuth
    ? ["New Post", "Change Password", "Logout"]
    : ["Login", "Register"];

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseAndLogoutUserMenu = () => {
    setAnchorElUser(null);
    logoutApi(token);
    sessionStorage.clear();
    setUser({});
    setIsAuth(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
          disableGutters
        >
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            onClick={() => navigate("/")}
          >
            <NavLink
              style={{
                textDecoration: "none",
                color: "white",
                fontFamily: "Leckerli One",
                fontSize: "1.5rem",
              }}
              to={"/"}
            >
              AniBlog
            </NavLink>
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { mt: 2, xs: "flex", md: "none" } }}
          >
            <NavLink style={{ textDecoration: "none" }} to={"/"}>
              <img
                width="50"
                src="https://eksiup.com/images/26/63/7u558215qkum.png"
                alt=""
              />
            </NavLink>
          </Typography>
          <Button
            id="demo-customized-button"
            aria-controls={open ? "demo-customized-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
          >
            Categories
          </Button>
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            {myCategories.map((category) => (
              <NavLink
                key={category.id}
                style={{
                  textDecoration: "none",
                  color: "#616161",
                }}
                to={`/category/${category.name
                  .toLowerCase()
                  .replace(" ", "-")}`}
              >
                <MenuItem onClick={handleClose} disableRipple>
                  {category.name}
                </MenuItem>
              </NavLink>
            ))}
          </StyledMenu>

          <Box>
            {user?.username ? (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={user ? user.username[0].toUpperCase() : "S"}
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={"S"} src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
            )}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {isAuth ? (
                <MenuItem disabled>
                  <Typography>
                    {user?.username
                      ? user.username.charAt(0).toUpperCase() +
                        user.username.slice(1)
                      : "Sato"}
                  </Typography>
                </MenuItem>
              ) : null}

              {settings.map((setting) => (
                <NavLink
                  key={setting}
                  style={{ textDecoration: "none", color: "#424242" }}
                  to={
                    setting.toLowerCase() === "logout"
                      ? "/"
                      : `/${setting.replace(" ", "-").toLowerCase()}`
                  }
                >
                  <MenuItem
                    onClick={
                      setting.toLowerCase() === "logout"
                        ? handleCloseAndLogoutUserMenu
                        : handleCloseUserMenu
                    }
                  >
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                </NavLink>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
