import Hero from '../../components/hero/Hero'
import Biography from '../../components/biography/Biography'

const About = () => {
  return (
    <>
      <Hero
        title={"Learn More About Us | SkCare Medical Institute"}
        imageUrl={"/about.png"}
      />
      <Biography imageUrl={"/whoweare.png"} />
    </>
  )
}

export default About;