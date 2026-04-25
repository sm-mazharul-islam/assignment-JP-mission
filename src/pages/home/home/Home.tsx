import Container from "../../../components/ui/Container";
import HeroSection from "../../../components/ui/HeroSection";
import SingleCards from "../../reliefGoodsCardItem/SingleCards";
import Testimonials from "../testimonials/testimonials";
import OurRecentlyWork from "../transparencyInitiatives/OurRecentlyWork";
const Home = () => {
  return (
    <div>
      <HeroSection></HeroSection>
      <Container>
        <SingleCards></SingleCards>
        <OurRecentlyWork></OurRecentlyWork>
        <Testimonials></Testimonials>
      </Container>
    </div>
  );
};

export default Home;
