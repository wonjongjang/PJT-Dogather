import { Grid } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import styled from "styled-components";

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
  const slides = [
    "img/커머스1.png",
    "img/쾌남장영남.png",
    "img/쾌남2.png",
    "img/쾌남3.png",
    "img/쾌남4.png",
    "img/쾌남5.png",
  ];

  return (
    <Container
      style={{
        height: "100%",
        width: "1000px",
        objectFit: "cover",
      }}
    >
      <Grids>
        <Slider
          autoPlay={true}
          animation={"fade"}
          navButtonsAlwaysVisible={true}
        >
          <img src={slides[0]} />
          <img src={slides[1]} />
          <img src={slides[2]} />
          <img src={slides[3]} />
          <img src={slides[4]} />
          <img src={slides[5]} />
        </Slider>
      </Grids>
    </Container>
  );
}

const Container = styled.div`
  display: block;
  height: "90%";
  width: "1000px";
  object-fit: cover;
`;

const Slider = styled(Carousel)`
  display: block;
  justify-content: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
  object-fit: cover;
`;

const Grids = styled(Grid)`
  display: flex;
  justify-content: center;
`;

export default HomeCarousel;
