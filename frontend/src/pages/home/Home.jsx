import Hero from '../../components/hero/Hero';
import Biography from '../../components/biography/Biography';
import Departments from '../../components/departments/Departments';
import MessageForm from '../../components/messageForm/MessageForm';
 
const Home = () => {

  return (
    <div>
      <Hero title={"Welcome to SkCare Medical Institute | Your Trusted Healthcare provider"} imageUrl={"/hero.png"} />
      <Biography imageUrl={"/about.png"} />
      <Departments />
      <MessageForm />
    </div>
  )
}

export default Home;