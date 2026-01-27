import Navbar from "../Components/Navbar.jsx"
import Hero from "../Components/Hero.jsx"
import Stats from "../Components/Stats.jsx"
import MostPopular from "../Components/MostPopular.jsx"
import TimeLine from "../Components/TimeLine.jsx"
import PopularCategory from "../Components/PopularCategory.jsx"
import TopCompaines from "../Components/TopCompaines.jsx"
import UserRecurterRegister from "../Components/UserRecurterRegister.jsx"
import Footer from "../Components/Footer.jsx"

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <MostPopular />
      <TimeLine />
      <PopularCategory />
      <TopCompaines />
      <UserRecurterRegister/>
      <Footer />
    </>
  )
}

export default Home
