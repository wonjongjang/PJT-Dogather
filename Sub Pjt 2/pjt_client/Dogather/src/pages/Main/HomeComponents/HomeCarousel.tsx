import { Grid } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { Link } from "react-router-dom";
import styled from "styled-components";

function HomeCarousel() {
  const slides = [
    "img/할인.png",
    "img/봄할인.png",
    "img/공동구매.png",
    "img/발렌타인데이.png",
    "img/감귤농장.png",
    "img/크리스마스.png",
    "img/아구찜.png",
    "img/서점.png",
  ];

  return (
    <Container
      style={{
        height: "500px",
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
          {slides.map((slide, idx) => (
            <Link to={"/moim/2"}>
              <img style={{ overflow: "hidden" }} src={slide} alt="끼잉낑" />
            </Link>
          ))}
        </Slider>
      </Grids>
    </Container>
  );
}

const Container = styled.div``;

const Slider = styled(Carousel)`
  display: flex;
  display: -webkit-box;
  justify-content: center;
  height: 500px;
  object-fit: cover;
  overflow: hidden;
`;

const Grids = styled(Grid)`
  height: "90%";
  width: "700px";
  object-fit: cover;
`;

export default HomeCarousel;
