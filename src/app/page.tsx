import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./components/navbar/navbar";
import Castle from '../../public/images/castle.jpg'
import Carousel from "./components/carousel/Carousel";
import carouselData from './data/carousel.json'
import Footer from "./components/footer/footer";

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar></Navbar>
      <div className={styles.hero}>
        <h1>Dungeon Gate</h1>
        <button>Crear Partida</button>
      </div>

      <div className={styles.section2}>
        <Image src={Castle} alt="Dungeon gate"></Image>
        <div className={styles.textSection}>
          <h3>¿Qué es Dungeon Gate?</h3>
          <div className={styles.texts}>
            <p>Dungeon Gate es una aplicación web creada para acompañar partidas de Dungeons & Dragons 5ª edición, pensada como un apoyo digital que respeta la esencia del juego de rol de mesa. No busca sustituir la imaginación, la interpretación ni la narrativa compartida, sino eliminar la carga mecánica que muchas veces interrumpe el ritmo de la sesión.

              La aplicación centraliza el estado de la partida, automatiza cálculos y mantiene la coherencia del juego, permitiendo que los jugadores y el Dungeon Master se concentren en lo verdaderamente importante: vivir la aventura..</p>
            <p>La aplicación no valida distancias, no limita decisiones creativas ni impone reglas narrativas. No te dice cómo describir una escena, ni qué decisiones son correctas o incorrectas desde el punto de vista del rol. Todo eso sigue perteneciendo a la mesa, a las personas que juegan.

              Dungeon Gate se encarga únicamente de lo mecánico: tiradas, daño, condiciones, turnos, estados y sincronización. Todo lo demás sigue siendo interpretación, imaginación y acuerdos entre jugadores.</p>
          </div>
          <div className={styles.slogan}>
            <h4>Dungeon Gate no decide el destino de tus personajes.
              Solo mantiene abierto el camino para que la historia continue.</h4>
          </div>
        </div>

      </div>

      <Carousel items={carouselData} />

      <Footer></Footer>
    </div>
  );
}
