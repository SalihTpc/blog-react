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
import { CardActionArea } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import Badge from "@mui/material/Badge";
import { useNavigate } from "react-router-dom";
import { errorNote, successNote } from "../helper/toastNotify";
import axios from "axios";
import { BlogContext } from "../store/BlogContext";

const MyCard = ({ anime }) => {
  let navigate = useNavigate();
  const { myChanges, setMyChanges } = React.useContext(BlogContext);

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
      // navigate("/");
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
      // navigate("/");
      setMyChanges(!myChanges);
    } catch (error) {
      // console.log(error.response.data.non_field_errors[0]);
      errorNote(error.response.data.non_field_errors[0]);
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
          alt="Paella dish"
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
        <IconButton aria-label="comment">
          <Badge badgeContent={anime.comments_count} color="success">
            <CommentIcon />
          </Badge>
        </IconButton>
      </CardActions>
    </Card>
  );
};
export default MyCard;
