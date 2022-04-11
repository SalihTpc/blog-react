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
import { useParams } from "react-router-dom";
import { BlogContext } from "../store/BlogContext";
import axios from "axios";

const PostDetail = () => {
  const { id } = useParams();
  const [selectedPost, setSelectedPost] = React.useState();
  const { load, setLoad } = React.useContext(BlogContext);
  console.log(id);
  const getPostDetail = async (id) => {
    setLoad(true);
    const { data } = await axios({
      method: "get",
      url: `https://blogsato-drf.herokuapp.com/api/list/${id}/`,
      headers: { Authorization: `Token ${sessionStorage.getItem("key")}` },
    });
    console.log(data);
    setSelectedPost(data);
    setLoad(false);
  };
  //   getPostDetail(id);

  // React.useEffect(() => {
  //   getPostDetail(id);
  // }, []);

  console.log(selectedPost);
  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      {/* <CardActionArea>
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
            {selectedPost.body.length > 300
              ? selectedPost.body.slice(0, 300) + " ..."
              : selectedPost.body}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{ display: "flex", justifyContent: "space-around" }}
        disableSpacing
      >
        <IconButton aria-label="like">
          <Badge badgeContent={selectedPost.likes_count} color="error">
            <FavoriteIcon />
          </Badge>
        </IconButton>
        <IconButton aria-label="view">
          <Badge badgeContent={selectedPost.postviews_count} color="info">
            <VisibilityIcon />
          </Badge>
        </IconButton>
        <IconButton aria-label="comment">
          <Badge badgeContent={selectedPost.comments_count} color="success">
            <CommentIcon />
          </Badge>
        </IconButton>
      </CardActions> */}
    </Card>
  );
};
export default PostDetail;
