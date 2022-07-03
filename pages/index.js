import Link from "next/link";
import axios from "axios";

import styles from "./index.module.css";

export async function getStaticProps() {
  const { data } = await axios.get("https://api.magicthegathering.io/v1/cards");

  return {
    props: {
      cards: data.cards
    }
  };
}

export default function Home({ cards }) {
  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Magic Compendium</h1>
      <div className={styles.root}>
        {cards.map(({ id, imageUrl }) => (
          <div key={id} className={styles.card}>
            <Link href={`/cards/${id}`}>
              <a>
                <img
                  src={
                    imageUrl
                      ? imageUrl
                      : "https://i.ibb.co/jwXGVPB/Capture-d-e-cran-2022-07-03-a-21-44-55.png"
                  }
                  alt=""
                />
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
