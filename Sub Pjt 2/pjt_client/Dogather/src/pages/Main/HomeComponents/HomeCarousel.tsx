import { Grid } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { Link } from "react-router-dom";
import styled from "styled-components";

function HomeCarousel() {
  const slides = [
    "img/두게더와함께.png",
    "img/할인팡팡.png",
    "img/포인트팡팡.png",
    "img/콘텍트렌즈.png",
    "img/사은품.png",
  ];

  return (
    <Container
      style={{
        height: "auto",
        width: "100%",
        objectFit: "cover",
      }}
    >
      <Grids>
        <Slider
          autoPlay={true}
          animation={"fade"}
          navButtonsAlwaysVisible={true}
        >
          {slides.map((slide, idx) => (
            <Link key={idx} to={"/moim/2"}>
              <img
                style={{
                  overflow: "hidden",
                  width: "100%",
                  objectFit: "cover",
                }}
                src={slide}
                alt="끼잉낑"
              />
            </Link>
          ))}
        </Slider>
      </Grids>
    </Container>
  );
}

const Container = styled.div`
  margin-bottom: 10px;
`;

const Slider = styled(Carousel)`
  display: flex;
  display: -webkit-box;
  justify-content: center;
  height: 500px;
  width: 100%;
  object-fit: cover;
  overflow: hidden;
`;

const Grids = styled(Grid)`
  height: "90%";
  width: "700px";
  object-fit: cover;
`;

export default HomeCarousel;
