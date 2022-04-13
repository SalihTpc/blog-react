import Avatar from "@mui/material/Avatar";
import { grey } from "@mui/material/colors";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import React from "react";

const Comments = ({ comment }) => {
  // console.log(comment);

  return (
    <>
      <ListItem
        alignItems="flex-start"
        sx={{ bgcolor: "#90caf9", borderRadius: "20px" }}
      >
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: grey[900] }} aria-label="recipe">
            {comment.user[0].toUpperCase() || "A"}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {comment.user || "Anonymous"}
              </Typography>
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {comment.since_creation}
              </Typography>
            </div>
          }
          secondary={
            <React.Fragment>{`  -  ${comment.content}`}</React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default Comments;
