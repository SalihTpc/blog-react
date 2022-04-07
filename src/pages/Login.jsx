import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
// import { BlogContext } from "../store/BlogContext";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/about">
        About
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
function GoToRegister(props) {
  return (
    <Link color="inherit" variant="body2" href="/register">
      Don't have an account? Sign Up
    </Link>
  );
}

const theme = createTheme();
const Login = () => {
  // const [
  //   myCategories,
  //   setMyCategories,
  //   myAnimes,
  //   setMyAnimes,
  //   token,
  //   setToken,
  //   user,
  //   setUser,
  // ] = React.useContext(BlogContext);
  let navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const loginValues = {
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
    };
    await axios
      .post("https://blogsato-drf.herokuapp.com/users/auth/login/", loginValues)
      .then(
        (response) => {
          localStorage.setItem("user", JSON.stringify(response.data)); // locale atılacak.
        },
        (error) => {
          console.log(error);
        }
      );
    navigate("/");
    window.location.reload(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Formik>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="user-name"
                  />
                </Grid>
              </Grid>
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid justifyContent="center" container>
                <Grid item>
                  <GoToRegister />
                </Grid>
              </Grid>
            </Box>
          </Formik>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Login;

// const sendPostRequest = async () => {
//   try {
//     const resp = await axios.post(
//       "https://blogsato-drf.herokuapp.com/users/auth/login/",
//       loginValues
//     )
//     console.log(resp.data.key)
//   } catch {
//     (err){
//       console.error(err)
//     };
//   }
// };
// sendPostRequest();
