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
import axios from "axios";
import "./categorycard.css";

const CategoryCard = ({ categoryName }) => {
  const [selectedCategoryPosts, setSelectedCategoryPosts] = React.useState([]);
  const getSelectedCategories = async () => {
    await axios
      .get(`https://blogsato-drf.herokuapp.com/api/category/${categoryName}/`)
      .then((response) => setSelectedCategoryPosts(response.data));
  };
  // React.useEffect(() => {
  //   getSelectedCategories();
  // }, []);

  React.useEffect(() => {
    getSelectedCategories();
  }, [categoryName]);

  // console.log(selectedCategoryPosts);

  return (
    <div className="categoryposts">
      {selectedCategoryPosts.map((post) => (
        <Card key={post.id} sx={{ maxWidth: 345, m: 2 }}>
          <CardActionArea>
            <CardHeader
              avatar={
                <Avatar
                  sx={{ bgcolor: blue[200] }}
                  aria-label="recipe"
                  title={post.user}
                  alt={post.user.charAt(0).toUpperCase()}
                  src="/static/images/avatar/2.jpg"
                />
              }
              titleTypographyProps={{ variant: "h5", color: "black" }}
              title={post.title}
              subheader={post.since_creation}
            />
            <Divider />
            <Box sx={{ display: "flex" }}>
              {post.category.map((cate) => (
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
              image={post.image}
              alt="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {post.body.length > 300
                  ? post.body.slice(0, 300) + " ..."
                  : post.body}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions
            sx={{ display: "flex", justifyContent: "space-around" }}
            disableSpacing
          >
            <IconButton aria-label="like">
              <Badge badgeContent={post.likes_count} color="error">
                <FavoriteIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="view">
              <Badge badgeContent={post.postviews_count} color="info">
                <VisibilityIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="comment">
              <Badge badgeContent={post.comments_count} color="success">
                <CommentIcon />
              </Badge>
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default CategoryCard;
