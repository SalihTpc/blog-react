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
import Modal from "@mui/material/Modal";
import Login from "../pages/Login";
import Register from "../pages/Register";

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
  const { myCategories, token, user, isAuth, setIsAuth } =
    React.useContext(BlogContext);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    handleCloseUserMenu();
  };
  const [openModalLogin, setOpenModalLogin] = React.useState(false);
  const handleOpenModalLogin = () => setOpenModalLogin(true);
  const handleCloseModalLogin = () => {
    setOpenModalLogin(false);
    handleCloseUserMenu();
  };

  const logoutApi = async (token) => {
    await axios.post(
      "https://blogsato-drf.herokuapp.com/users/auth/logout/",
      { withCredentials: true },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      }
    );
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleCloseAndLogoutUserMenu = () => {
    setAnchorElUser(null);
    sessionStorage.removeItem("user");
    logoutApi(token);
    if (sessionStorage.getItem("user") === null) {
      setIsAuth(false);
    } else {
      setIsAuth(true);
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // console.log(user.lenght);
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar
          sx={{ display: "flex", justifyContent: "space-between" }}
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
              style={{ textDecoration: "none", color: "white" }}
              to={"/"}
            >
              AnimeBlog
            </NavLink>
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            <NavLink style={{ textDecoration: "none" }} to={"/"}>
              <img
                width="50"
                src="https://anilist.co/img/icons/icon.svg"
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
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={token ? `${user.user.username[0].toUpperCase()}` : "S"}
                  src="/static/images/avatar/2.jpg"
                />
              </IconButton>
            </Tooltip>
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
                <div>
                  <MenuItem disabled>
                    <Typography textAlign="center">
                      {user.user.username.charAt(0).toUpperCase() +
                        user.user.username.slice(1)}
                    </Typography>
                  </MenuItem>

                  <MenuItem onClick={() => navigate("/new-post")}>
                    New Post
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/change-password")}>
                    Change Password
                  </MenuItem>
                  <MenuItem onClick={() => handleCloseAndLogoutUserMenu()}>
                    Logout
                  </MenuItem>
                </div>
              ) : (
                <div>
                  <MenuItem onClick={handleOpenModalLogin}>Login</MenuItem>
                  <Modal
                    open={openModalLogin}
                    onClose={handleCloseModalLogin}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Login />
                  </Modal>

                  <MenuItem onClick={handleOpenModal}>Register</MenuItem>
                </div>
              )}
              <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Register />
              </Modal>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
