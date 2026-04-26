import ImpactHome from "../../../components/impactHome/impactHome/ImpactHome";
import { StoryWall } from "../../../components/impactHome/storyWall/StoryWall";
import { Timeline } from "../../../components/impactHome/timeline/Timeline";
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
        <ImpactHome />
        <SingleCards></SingleCards>
        <Timeline />
        <OurRecentlyWork></OurRecentlyWork>
        <Testimonials></Testimonials>
        <StoryWall />
      </Container>
    </div>
  );
};

export default Home;
