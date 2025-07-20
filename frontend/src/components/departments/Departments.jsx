import "./departments.scss";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Departments = () => {

  const departmentsArray = [
    {
      name: "Pediatrics",
      imageUrl: "/departments/pedia.jpg",
    },
    {
      name: "Orthopedics",
      imageUrl: "/departments/ortho.jpg",
    },
    {
      name: "Cardiology",
      imageUrl: "/departments/cardio.jpg",
    },
    {
      name: "Neurology",
      imageUrl: "/departments/neuro.jpg",
    },
    {
      name: "Oncology",
      imageUrl: "/departments/onco.jpg",
    },
    {
      name: "Radiology",
      imageUrl: "/departments/radio.jpg",
    },
    {
      name: "Physical Therapy",
      imageUrl: "/departments/therapy.jpg",
    },
    {
      name: "Dermatology",
      imageUrl: "/departments/derma.jpg",
    },
    {
      name: "ENT",
      imageUrl: "/departments/ent.jpg",
    },
  ];


  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
      slidesToScroll: 4,
      slidesToSlide: 1,
      infinite: true,
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
      slidesToSlide: 1,
      slidesToScroll: 3,
      infinite: true,
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
      slidesToSlide: 1,
      slidesToScroll: 2,
      infinite: true,
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
      slidesToSlide: 1,
      slidesToScroll: 1,
      infinite: true,
    },
  };

  return (
    <>
      <div className="container-depart">
        <h2>Departments</h2>
        <Carousel
          responsive={responsive}
          removeArrowOnDeviceType={["medium", "small"]}
          infinite={true}
          autoPlay
          autoPlaySpeed={1250}
        >
          {
            departmentsArray.map((depart, index) => {
              return (
                <div className="container-depart__card" key={index}>
                  <div className="container-depart__depart-name">{depart.name}</div>
                  <img src={depart.imageUrl} alt={depart.name} />
                </div>
              )
            })
          }
        </Carousel>
      </div>
    </>
  )
}

export default Departments;