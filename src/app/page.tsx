import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./components/navbar/navbar";

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar></Navbar>
      <div className={styles.hero}>
        <h1>Dungeon Gate</h1>
        <button>Crear Partida</button>
      </div>

      <div className={styles.section2}>
        <h3></h3>
      </div>

    </div>
  );
}
