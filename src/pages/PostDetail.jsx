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
import { Grid, Box, List, Button } from "@mui/material";
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

const PostDetail = () => {
  const { id } = useParams();
  const { user, myChanges, setMyChanges } = React.useContext(BlogContext);
  const [myId, setMyId] = React.useState();
  const [selectedPost, setSelectedPost] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  let navigate = useNavigate();

  const getPostdet = (id) => {
    setLoading(true);
    axios
      .get(`https://blogsato-drf.herokuapp.com/api/list/${id}/`, {
        headers: { Authorization: `Token ${sessionStorage.getItem("key")}` },
      })
      .then(function (response) {
        // console.log(response.data);
        // console.log(response.data.body);
        setSelectedPost(response.data);
      });
    setLoading(false);
  };

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
      navigate("/");
    } catch (error) {
      console.log(error.response.data.detail);
      errorNote(error.response.data.detail);
    }
    setMyChanges(!myChanges);
    setLoading(false);
  };
  const viewPost = async (id) => {
    setLoading(true);
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
      // navigate("/");
      setMyChanges(!myChanges);
    } catch (error) {
      // console.log(error.response.data.non_field_errors[0]);
      errorNote(error.response.data.non_field_errors[0]);
    }
    setLoading(false);
  };
  const likePost = async (id) => {
    setLoading(true);
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
      // navigate("/");
      setMyChanges(!myChanges);
    } catch (error) {
      // console.log(error.response.data.non_field_errors[0]);
      errorNote(error.response.data.non_field_errors[0]);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    setMyId(id);
    getPostdet(id);
  }, []);

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
                alt="Paella dish"
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
                <IconButton aria-label="comment">
                  <Badge
                    badgeContent={selectedPost.comments_count}
                    color="success"
                  >
                    <CommentIcon />
                  </Badge>
                </IconButton>
              </CardActions>
            </div>
          ) : null}
        </Card>
      )}

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
              <Comments comment={comment} />
            </List>
          ))}
        </Grid>
      )}
      <Button
        disabled={user?.username !== selectedPost.user}
        onClick={() => delPost(myId)}
        variant="contained"
        size="large"
      >
        DELETE
      </Button>
    </Container>
  );
};
export default PostDetail;
