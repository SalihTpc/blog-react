import * as React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { BlogContext } from "../store/BlogContext";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { errorNote, successNote } from "../helper/toastNotify";

function Copyright(props) {
  let navigate = useNavigate();
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        sx={{
          fontWeight: "600",
          paddingLeft: "0.5rem",
          cursor: "pointer",
          color: "inherit",
        }}
        onClick={() => navigate("/about")}
      >
        About
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function GoToRegister(props) {
  let navigate = useNavigate();
  return (
    <Link color="inherit" variant="body2" onClick={() => navigate("/register")}>
      Don't have an account? Sign Up
    </Link>
  );
}
const signUpValidationSchema = Yup.object().shape(
  {
    email: Yup.string()
      .email()
      .when("username", {
        is: (username) => !username || username.length === 0,
        then: Yup.string()
          .email()
          .required("At least one of the fields(email & username) is required"),
      }),
    username: Yup.string().when("email", {
      is: (email) => !email || email.length === 0,
      then: Yup.string().required(
        "At least one of the fields(email & username) is required"
      ),
    }),
    password: Yup.string()
      .required("No password provided")
      .min(8, "Password is too short - should be 8 chars minimum")
      .matches(/\d+/, "Password must have a number")
      .matches(/[a-z]+/, "Password must have a lowercase")
      .matches(/[A-Z]+/, "Password must have a uppercase"),
  },
  [["email", "username"]]
);

const theme = createTheme();
const Login = () => {
  const { setIsAuth } = React.useContext(BlogContext);
  let navigate = useNavigate();
  const initialValues = {
    email: "",
    username: "",
    password: "",
  };
  const handleSubmit = async (values) => {
    try {
      await axios
        .post("https://blogsato-drf.herokuapp.com/users/auth/login/", values)
        .then(function (response) {
          // console.log(response.data.key);
          sessionStorage.setItem("key", response.data.key);
        });
      setIsAuth(true);
      // console.log(isAuth);
      successNote("Login Successful");
      navigate("/");
    } catch (error) {
      errorNote(error.response.data.non_field_errors[0]);
      setIsAuth(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={style}>
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
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            //! Yup ile hazırladığımız validationu buraya gönderiyoruz.
            validationSchema={signUpValidationSchema}
          >
            {/* //!Bütün formu curly braces içerisine alıyoruz. Ve arrow function kullanarak bütün değişkenleri burada tanımlıyoruz. Ayrıca değerleri destructuring yapmak önemli  */}
            {({
              //!Parametre olarak tanımladığımız (values) değişkenleri TextField içerisinde value değişkenlerine atıyoruz.
              values,
              handleChange,
              //! handleSubmit önce burada, daha sonra Formik içerisinde tanımlıyoruz. Müteakiben fonksiyonu yukarıda oluşturuyoruz.
              handleSubmit,
              //! touched and errors and handleBlur--> validation hatasını almak için eklememiz gerekiyor.
              touched,
              errors,
              //! handleBlur --> focustan yani inputtan çıktığımızda blur oluyor.
              handleBlur,
            }) => (
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
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.email && errors.email}
                      error={touched.email && Boolean(errors.email)}
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
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.username && errors.username}
                      error={touched.username && Boolean(errors.username)}
                    />
                  </Grid>
                </Grid>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.password && errors.password}
                  error={touched.password && Boolean(errors.password)}
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
            )}
          </Formik>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Login;
