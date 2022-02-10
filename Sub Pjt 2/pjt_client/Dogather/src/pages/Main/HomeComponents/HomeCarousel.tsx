import React from "react";
import { Carousel, Progress } from "antd";
import { Paper, Button } from "@mui/material";

function HomeCarousel() {
  const items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
    },
  ];
  return (
    <div>
      {/* <Carousel>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
      </Carousel> */}
      <Progress percent={30} strokeWidth={5} />
    </div>
  );
}

export default HomeCarousel;
