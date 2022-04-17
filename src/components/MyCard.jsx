import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  CardActionArea,
  InputAdornment,
  InputLabel,
  Modal,
  OutlinedInput,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router-dom";
import { errorNote, successNote } from "../helper/toastNotify";
import axios from "axios";
import { BlogContext } from "../store/BlogContext";
import SendIcon from "@mui/icons-material/Send";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "100%",
  boxShadow: 24,
  borderRadius: 10,
  opacity: 0.9,
  bgcolor: "background.paper",
  p: 1,
};
const myStyle1 = {
  position: "relative",
  width: "95%",
};

const MyCard = ({ anime }) => {
  let navigate = useNavigate();
  const { myChanges, setMyChanges } = React.useContext(BlogContext);
  const myId = anime.id;
  const [commentValue, setCommentValue] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    sessionStorage.getItem("key") ? setOpen(true) : navigate("/login");
  };
  const handleClose = () => setOpen(false);

  const inputTextHandler = (e) => {
    setCommentValue(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = {
      post: myId,
      content: data.get("comment"),
    };
    data.get("comment").length === 0
      ? errorNote("Comment can not be blank!!")
      : CommentPost(myId, value);
  };

  const CommentPost = async (id, value) => {
    try {
      await axios
        .post(
          `https://blogsato-drf.herokuapp.com/api/list/${id}/comment/`,
          value,
          {
            headers: {
              Authorization: `Token ${sessionStorage.getItem("key")}`,
            },
          }
        )
        .then(function (response) {
          // console.log(response.data.message);
          successNote(response.data.message);
        });
      setMyChanges(!myChanges);
      setCommentValue("");
    } catch (error) {
      // console.log(error.response.data.content[0]);
      errorNote(error.response.data.content[0]);
    }
  };

  const viewPost = async (id) => {
    const value = { post: id };
    try {
      await axios
        .post(
          `https://blogsato-drf.herokuapp.com/api/list/${id}/view/`,
          value,
          {
            headers: {
              Authorization: `Token ${sessionStorage.getItem("key")}`,
            },
          }
        )
        .then(function (response) {
          // console.log(response.data.user);
          successNote(`${response.data.user} viewed the Post`);
        });
      setMyChanges(!myChanges);
    } catch (error) {
      // console.log(
      //   error.response.data.detail || error.response.data.non_field_errors[0]
      // );
      errorNote(
        error.response.data.detail || error.response.data.non_field_errors[0]
      );
    }
  };
  const likePost = async (id) => {
    const value = { post: id };
    try {
      await axios
        .post(
          `https://blogsato-drf.herokuapp.com/api/list/${id}/like/`,
          value,
          {
            headers: {
              Authorization: `Token ${sessionStorage.getItem("key")}`,
            },
          }
        )
        .then(function (response) {
          // console.log(response.data.user);
          successNote(`${response.data.user} liked the Post`);
        });
      setMyChanges(!myChanges);
    } catch (error) {
      console.log(error.response.data);
      // errorNote(error.response.data.non_field_errors[0]);
      errorNote(
        error.response.data.detail || error.response.data.non_field_errors[0]
      );
    }
  };

  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardActionArea onClick={() => navigate(`/post-detail/${anime.id}`)}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: blue[200] }}
              aria-label="recipe"
              title={anime.user}
              alt={anime.user.charAt(0).toUpperCase()}
              src="/static/images/avatar/2.jpg"
            />
          }
          titleTypographyProps={{ variant: "h5", color: "black" }}
          title={anime.title}
          subheader={anime.since_creation}
        />
        <Divider />
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {anime.category?.map((cate) => (
            <Typography
              key={cate.id}
              sx={{ flexGrow: 1, mt: 0.5, ml: 2 }}
              color="text.secondary"
              display="block"
              variant="caption"
            >
              {cate.name}
            </Typography>
          ))}
        </Box>

        <CardMedia
          component="img"
          height="550"
          image={anime.image}
          alt="There is no image at this url"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {anime.body.length > 300
              ? anime.body.slice(0, 300) + " ..."
              : anime.body}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{ display: "flex", justifyContent: "space-around" }}
        disableSpacing
      >
        <IconButton onClick={() => likePost(anime.id)} aria-label="like">
          <Badge badgeContent={anime.likes_count} color="error">
            <FavoriteIcon />
          </Badge>
        </IconButton>
        <IconButton onClick={() => viewPost(anime.id)} aria-label="view">
          <Badge badgeContent={anime.postviews_count} color="info">
            <VisibilityIcon />
          </Badge>
        </IconButton>
        <IconButton onClick={handleOpen} aria-label="comment">
          <Badge badgeContent={anime.comments_count} color="success">
            <CommentIcon />
          </Badge>
        </IconButton>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{
                width: 900,
                maxWidth: "100%",
                mb: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={myStyle1}>
                <InputLabel>Comment for {anime.title}</InputLabel>
                <OutlinedInput
                  value={commentValue}
                  onChange={inputTextHandler}
                  fullWidth
                  htmlFor="outlined-adornment-comment"
                  required
                  id="comment"
                  name="comment"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        disabled={commentValue.length === 0}
                        type="submit"
                        aria-label="comment"
                      >
                        <SendIcon size="large" />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </div>
            </Box>
          </Box>
        </Modal>
      </CardActions>
    </Card>
  );
};
export default MyCard;
