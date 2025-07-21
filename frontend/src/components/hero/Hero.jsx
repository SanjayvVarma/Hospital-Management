import "./hero.scss"
const Hero = ({ title, imageUrl }) => {
  return (
    <>
      <div className='container-hero'>
        <div className="container-hero__banner">
          <h1 className="container-hero__banner__title">{title}</h1>
          <p className="container-hero__banner__pera">
            Welcome to SkCare Medical Institute — a center of excellence in modern healthcare, where innovation, empathy, and expertise come together to deliver exceptional patient care. Our state-of-the-art facility is equipped with the latest medical technologies, enabling our highly skilled team of doctors, specialists, and caregivers to provide accurate diagnoses and effective treatments across a wide range of medical services. At SkCare, we believe that every individual deserves personalized attention, which is why we take the time to understand your unique needs and guide you through every step of your health journey. From preventive care to advanced treatment plans, our mission is to support your well-being with compassion, integrity, and unwavering commitment. Your health, comfort, and trust are at the heart of everything we do — because at SkCare, we don’t just treat patients, we care for people.
          </p>

        </div>

        <div className="container-hero__banner">
          <img className='container-hero__banner__image' src={imageUrl} alt="hero" />
          <span>
            <img className='container-hero__banner__vector' src="/Vector.png" alt="vector" />
          </span>
        </div>
      </div>
    </>
  )
}

export default Hero;