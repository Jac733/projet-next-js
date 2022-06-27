import axios from "axios";

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
    <div>
      <h2>{card.name}</h2>
      <div>
        <img src={card.imageUrl} alt="" />
      </div>
    </div>
  );
}
