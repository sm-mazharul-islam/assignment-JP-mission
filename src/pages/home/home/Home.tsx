import Container from "../../../components/ui/Container";
import HeroSection from "../../../components/ui/HeroSection";
// import SingleCard from "../../reliefGoodsCardItem/SingleCard";
import SingleCards from "../../reliefGoodsCardItem/SingleCards";
import Testimonials from "../testimonials/testimonials";
// import OurRecentlyWork from "../transparencyInitiatives/OurRecentlyWork";

const Home = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <Container>
        {/* <SingleCard></SingleCard> */}
        <SingleCards></SingleCards>
        <Testimonials></Testimonials>
        {/* <OurRecentlyWork></OurRecentlyWork> */}
      </Container>
    </div>
  );
};

export default Home;
