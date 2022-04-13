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

const passwordChangeValidationSchema = Yup.object().shape({
  //! En az 2 karakter olması lazım. olmazsa yanına yazdığımız mesajı
  old_password: Yup.string()
    .required("No password provided")
    .min(8, "Password is too short - should be 8 chars minimum"),
  new_password1: Yup.string()
    .required("No password provided")
    .min(8, "Password is too short - should be 8 chars minimum")
    .matches(/\d+/, "Password must have a number")
    .matches(/[a-z]+/, "Password must have a lowercase")
    .matches(/[A-Z]+/, "Password must have a uppercase"),
  new_password2: Yup.string()
    .required("No password provided")
    .min(8, "Password is too short - should be 8 chars minimum")
    .oneOf([Yup.ref("new_password1"), null], "Passwords must match"),
});

const theme = createTheme();
const PasswordChange = () => {
  let navigate = useNavigate();
  const initialValues = {
    old_password: "",
    new_password1: "",
    new_password2: "",
  };

  const handleSubmit = async (values) => {
    // console.log(values);
    try {
      await axios
        .post(
          `https://blogsato-drf.herokuapp.com/users/auth/password/change/`,
          values,
          {
            headers: {
              Authorization: `Token ${sessionStorage.getItem("key")}`,
            },
          }
        )
        .then((response) =>
          console.log(response.request.status, response.data)
        );
      // console.log(isAuth);
      successNote("Password Changed Successfully");
      navigate("/");
    } catch (error) {
      //   errorNote(error.response.data.non_field_errors[0]);
      // console.log(error.response.status, error.response.data.old_password[0]);
      errorNote(error.response.data.old_password[0]);
    }
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 10,
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
            Change Password
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            //! Yup ile hazırladığımız validationu buraya gönderiyoruz.
            validationSchema={passwordChangeValidationSchema}
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
                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="old_password"
                      label="Password"
                      type="password"
                      id="old_password"
                      autoComplete="current-password"
                      value={values.old_password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.old_password && errors.old_password}
                      error={
                        touched.old_password && Boolean(errors.old_password)
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="new_password1"
                      label="New-Password"
                      type="password"
                      id="new_password1"
                      autoComplete="current-password"
                      value={values.new_password1}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={touched.new_password1 && errors.new_password1}
                      error={
                        touched.new_password1 && Boolean(errors.new_password1)
                      }
                    />
                  </Grid>
                </Grid>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="new_password2"
                  label="New-Password2"
                  type="password"
                  id="new_password2"
                  autoComplete="current-password"
                  value={values.new_password2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.new_password2 && errors.new_password2}
                  error={touched.new_password2 && Boolean(errors.new_password2)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Change Password
                </Button>
              </Box>
            )}
          </Formik>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default PasswordChange;
