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
        <img
          src={
            card.imageUrl
              ? card.imageUrl
              : "https://i.ibb.co/jwXGVPB/Capture-d-e-cran-2022-07-03-a-21-44-55.png"
          }
          alt=""
        />
      </div>
    </div>
  );
}
