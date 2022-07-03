import axios from "axios";
import styles from "./card.module.css";

export async function getStaticPaths() {
  const { data } = await axios.get(
    `https://api.magicthegathering.io/v1/cards/`
  );

  return {
    paths: data.cards.map(({ id }) => `/cards/${id}`),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const { id } = params;

  const { data } = await axios.get(
    `https://api.magicthegathering.io/v1/cards/${id}`
  );

  return {
    props: {
      card: data.card
    }
  };
}

export default function Card({ card }) {
  console.log(card);

  return (
    <div className={styles.main}>
      <a className={styles.link} href="../..">
        Home
      </a>
      <h2 className={styles.title}>{card.name}</h2>
      <div className={styles.container}>
        <img
          className={styles.image}
          src={
            card.imageUrl
              ? card.imageUrl
              : "https://i.ibb.co/jwXGVPB/Capture-d-e-cran-2022-07-03-a-21-44-55.png"
          }
          alt=""
        />
        <div className={styles.description}>
          <p>
            {card.type} ({card.rarity})
          </p>
          <p>{card.setName}</p>
          <p>{card.text}</p>
        </div>
      </div>
    </div>
  );
}
