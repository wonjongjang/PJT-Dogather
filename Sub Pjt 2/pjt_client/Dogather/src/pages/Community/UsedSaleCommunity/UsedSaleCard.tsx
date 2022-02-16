import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import styled from "styled-components";

function UsedSaleCard() {
  return (
    <CustomFrame>
      <Card sx={{ minWidth: "17.5vw", maxWidth: "17.5vw" }}>
        <CardHeader
          avatar={<Avatar aria-label="recipe">D</Avatar>}
          title="dogather"
          subheader="02-16"
        />
        <CardMedia
          component="img"
          height="194"
          image={process.env.PUBLIC_URL + "/img/community_card.jpg"}
          alt="Paella dish"
        />
        <CardContent>후기</CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Like">
            <img
              src={process.env.PUBLIC_URL + "/img/comment2.png"}
              alt="error"
            />
          </IconButton>
        </CardActions>
      </Card>
    </CustomFrame>
  );
}

export default UsedSaleCard;

const CustomFrame = styled.div`
  margin: 1.5vw 1.5vw;
`;
