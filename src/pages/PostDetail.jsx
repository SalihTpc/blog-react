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
import VisibilityIcon from "@mui/icons-material/Visibility";
import SendIcon from "@mui/icons-material/Send";
import {
  Grid,
  Box,
  List,
  Button,
  TextField,
  ButtonGroup,
  Modal,
  Tooltip,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import Badge from "@mui/material/Badge";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Comments from "../components/Comments";
import Loader from "../components/Loader";
import { BlogContext } from "../store/BlogContext";
import { errorNote, successNote } from "../helper/toastNotify";

const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
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

const myStyle = {
  position: "absolute",
  top: 0,
  bottom: 0,
  right: "1%",
};

const PostDetail = () => {
  const { id } = useParams();
  const { user, myChanges, setMyChanges } = React.useContext(BlogContext);
  const [myId, setMyId] = React.useState();
  const [selectedPost, setSelectedPost] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [commentValue, setCommentValue] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [myNotFound, setMyNotFound] = React.useState();
  const [detailUpdate, setDetailUpdate] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let navigate = useNavigate();

  const getPostdet = async (id) => {
    setLoading(true);
    try {
      await axios
        .get(`https://blogsato-drf.herokuapp.com/api/list/${id}/`, {
          headers: { Authorization: `Token ${sessionStorage.getItem("key")}` },
        })
        .then(function (response) {
          // console.log(response);
          // console.log(response.data.body);
          setSelectedPost(response.data);
        });
    } catch (error) {
      // console.log(error.response.status);
      setMyNotFound(error.response.status);
    }
    setLoading(false);
  };
  // console.log(myNotFound);
  const delPost = (id) => {
    setLoading(true);
    try {
      axios
        .delete(`https://blogsato-drf.herokuapp.com/api/list/${id}/`, {
          headers: { Authorization: `Token ${sessionStorage.getItem("key")}` },
        })
        .then(function (response) {
          // console.log(response.data.message);
          successNote(response.data.message);
        });
      setMyChanges(!myChanges);
      navigate("/");
    } catch (error) {
      console.log(error.response.data.detail);
      errorNote(error.response.data.detail);
    }
    setLoading(false);
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
      setDetailUpdate(!detailUpdate);
      setMyChanges(!myChanges);
    } catch (error) {
      // console.log(error.response.data.non_field_errors[0]);
      errorNote(error.response.data.non_field_errors[0]);
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
      setDetailUpdate(!detailUpdate);
      setMyChanges(!myChanges);
    } catch (error) {
      // console.log(error.response.data.non_field_errors[0]);
      errorNote(error.response.data.non_field_errors[0]);
    }
  };

  const CommentPost = async (id, value) => {
    setLoading(true);
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
      setDetailUpdate(!detailUpdate);
      setMyChanges(!myChanges);
      setCommentValue("");
    } catch (error) {
      // console.log(error.response.data.content[0]);
      errorNote(error.response.data.content[0]);
    }
    setLoading(false);
  };

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

  React.useEffect(() => {
    setMyId(id);
    getPostdet(id);
  }, [id]);

  React.useEffect(() => {
    if (myNotFound === 404) {
      if (typeof selectedPost !== "undefined") {
        navigate("/");
      }
    }
  }, [navigate, selectedPost, myNotFound]);

  React.useEffect(() => {
    getPostdet(id);
  }, [id, detailUpdate]);

  return (
    <Container>
      {loading ? (
        <Loader />
      ) : (
        <Card sx={{ m: 2, maxWidth: 1035 }}>
          {selectedPost?.user ? (
            <div>
              <CardHeader
                avatar={
                  <Avatar
                    sx={{ bgcolor: blue[200] }}
                    aria-label="recipe"
                    title={selectedPost.user}
                    alt={selectedPost.user.charAt(0).toUpperCase()}
                    src="/static/images/avatar/2.jpg"
                  />
                }
                titleTypographyProps={{ variant: "h5", color: "black" }}
                title={selectedPost.title}
                subheader={selectedPost.since_creation}
              />
              <Divider />
              <Box sx={{ display: "flex" }}>
                {selectedPost.category.map((cate) => (
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
                image={selectedPost.image}
                alt="There is no image at this url!!"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {selectedPost.body}
                </Typography>
              </CardContent>

              <CardActions
                sx={{ display: "flex", justifyContent: "space-around" }}
                disableSpacing
              >
                <IconButton onClick={() => likePost(myId)} aria-label="like">
                  <Badge badgeContent={selectedPost.likes_count} color="error">
                    <FavoriteIcon />
                  </Badge>
                </IconButton>
                <IconButton onClick={() => viewPost(myId)} aria-label="view">
                  <Badge
                    badgeContent={selectedPost.postviews_count}
                    color="info"
                  >
                    <VisibilityIcon />
                  </Badge>
                </IconButton>
                {/* <IconButton aria-label="comment"> */}
                <Badge
                  badgeContent={selectedPost.comments_count}
                  color="success"
                >
                  <CommentIcon />
                </Badge>
                {/* </IconButton> */}
              </CardActions>
            </div>
          ) : null}
        </Card>
      )}
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
          <TextField
            inputProps={{
              style: {
                paddingRight: 45,
              },
            }}
            value={commentValue}
            onChange={inputTextHandler}
            fullWidth
            required
            label="Comment"
            id="comment"
            name="comment"
          />
          <IconButton
            disabled={commentValue.length === 0}
            type="submit"
            style={myStyle}
            aria-label="comment"
          >
            <SendIcon size="large" />
          </IconButton>
        </div>
      </Box>

      {selectedPost?.comment_post?.length === 0 ? (
        <Grid item xs={12} sm={12} md={12}>
          <Typography
            style={{ fontFamily: "Permanent Marker", marginLeft: "30px" }}
            variant="body2"
            sx={{ color: "#c9c9c9", m: 2 }}
          >
            No Comments YET...
          </Typography>
        </Grid>
      ) : (
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          container
          flexDirection="columnn"
          justifyContent="center"
        >
          {selectedPost?.comment_post?.map((comment) => (
            <List
              key={comment.id}
              sx={{
                width: "95%",
                maxWidth: "md",
                bgcolor: "background.paper",
              }}
            >
              <Comments key={comment.id} comment={comment} />
            </List>
          ))}
        </Grid>
      )}
      <ButtonGroup sx={{ m: 2 }} size="large" aria-label="large button group">
        <Button
          disabled={user?.username !== selectedPost.user}
          //
          onClick={handleOpen}
          variant="contained"
          size="large"
          color="error"
        >
          DELETE
        </Button>
      </ButtonGroup>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              "& > *": {
                m: 1,
              },
            }}
          >
            <Typography
              sx={{ mt: 4, mb: 4, textAlign: "center" }}
              color="error"
              variant="h3"
            >
              Are you sure to delete awesome post?
            </Typography>
            <ButtonGroup size="large" aria-label="large button group">
              <Tooltip title="Cancel" placement="bottom-start">
                <Button onClick={handleClose}>CANCEL</Button>
              </Tooltip>
              <Tooltip title="Delete" placement="bottom-start">
                <Button onClick={() => delPost(myId)} color="error">
                  DELETE
                </Button>
              </Tooltip>
            </ButtonGroup>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};
export default PostDetail;
