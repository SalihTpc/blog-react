import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { errorNote, successNote } from "../helper/toastNotify";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import styled from "styled-components";
import { BlogContext } from "../store/BlogContext";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const MyContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const theme = createTheme();
const signUpValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Display name is required")
    .min(2, "Too short")
    .max(25, "Must be 25 char or less"),
  image: Yup.string()
    .required("Image Url is required")
    .max(300, "Must be 300 char or less")
    .url(),
  body: Yup.string().required("Anime Content is required").min(2, "Too short"),
  category: Yup.array()
    .min(1, "You can't leave this blank.")
    .required("At least one Category is required")
    .nullable(),
});

const AddNewPost = () => {
  const navigate = useNavigate();
  const { myCategories, myChanges, setMyChanges } =
    React.useContext(BlogContext);
  const style = {
    width: 375,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 10,
  };

  const [categoryName, setCategoryName] = React.useState([]);
  // console.log(myChanges);
  const initialValues = {
    category: [],
    title: "",
    image: "",
    body: "",
  };
  const handleSubmit = async (values, { resetForm }) => {
    // console.log(values);
    // console.log(values.category);
    // console.log(personName);

    const newCategory = values.category.map(function (val) {
      return { name: val };
    });
    values.category = newCategory;
    // console.log(values.category);
    try {
      await axios
        .post("https://blogsato-drf.herokuapp.com/api/list/", values, {
          headers: {
            Authorization: `Token ${sessionStorage.getItem("key")}`,
          },
        })
        .then(function (response) {
          // console.log(response.data);
          successNote(response.data.message);
        });
      setMyChanges(!myChanges);
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
      errorNote(error.response.data.title[0]);
    }

    resetForm();
  };
  return (
    <ThemeProvider theme={theme}>
      <MyContainer>
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
              <AddCircleIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Add New Anime
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
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{
                    marginTop: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Grid container spacing={2}>
                    <FormControl
                      xs={12}
                      sm={6}
                      sx={{ ml: 2, mt: 2, mb: 2, width: 350 }}
                    >
                      <InputLabel id="label">Category *</InputLabel>
                      <Select
                        id="category"
                        required
                        multiple
                        name="category"
                        value={values.category}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helpertext={touched.username && errors.username}
                        error={touched.username && Boolean(errors.username)}
                        input={<OutlinedInput id="Tag" label="Category" />}
                        renderValue={(selected) => (
                          <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                          >
                            {selected.map((value) => (
                              <Chip key={value} label={value} />
                            ))}
                          </Box>
                        )}
                        MenuProps={MenuProps}
                      >
                        {myCategories.map((category) => (
                          <MenuItem
                            key={category.id}
                            value={category.name}
                            style={getStyles(
                              category.name,
                              categoryName,
                              theme
                            )}
                          >
                            {category.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="title"
                        label="Title"
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.title && errors.title}
                        error={touched.title && Boolean(errors.title)}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="image"
                        required
                        fullWidth
                        id="image"
                        label="Image Url"
                        value={values.image}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.image && errors.image}
                        error={touched.image && Boolean(errors.image)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        multiline
                        rows={7}
                        name="body"
                        required
                        label="body"
                        id="body"
                        value={values.body}
                        placeholder="Anime Content"
                        style={{ width: 350 }}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={touched.body && errors.body}
                        error={touched.body && Boolean(errors.body)}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Add
                  </Button>
                </Box>
              )}
            </Formik>
          </Box>
        </Container>
      </MyContainer>
    </ThemeProvider>
  );
};

export default AddNewPost;
