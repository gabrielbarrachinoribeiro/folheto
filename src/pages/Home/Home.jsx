import Hero from './Hero/Hero.jsx'
import ContinueReading from './ContinueReading/ContinueReading.jsx'
import Populares from './Populares/Populares.jsx';
import Catalogo from './Catalogo/Catalogo.jsx';
import Editoras from './Editoras/Editoras.jsx';

function Home(){
    return(
        <>
            <Hero/>
            <ContinueReading/>
            <Populares/>
            <Catalogo/>
            <Editoras/>
        </>
    )
}

export default Home;
