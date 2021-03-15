import ScrollContainer from "react-indiana-drag-scroll";

import Controller from "./Controller";
import SelfCard from "./SelfCard";
import LinkCard from "./LinkCard";
import MainCard from "./MainCard";

import styles from "./styles.module.scss";

const postMain = {
  image: "https://assets.5pots.com/file/cincopots/posts/mecha.jpg",
  category: "Notícias oficiais",
  title: "Criando os Reinos Mech",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat odit rerum alias deserunt quidem sed mollitia reiciendis nobis officia, tempora eaque laboriosam eveniet corporis voluptates omnis porro earum incidunt dignissimos!",
};

const postSelf = {
  image: "https://assets.5pots.com/file/cincopots/posts/kench_pbe.jpg",
  category: "Atualização do PBE",
  title: "Atualização do PBE 19/10: Sion te amo",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat odit rerum alias deserunt quidem sed mollitia reiciendis nobis officia, tempora eaque laboriosam eveniet corporis voluptates omnis porro earum incidunt dignissimos!",
};

const postLink = {
  image: "https://assets.5pots.com/file/cincopots/posts/seraphine_splash.jpg",
  category: "Nova Campeã",
  title: "Seraphine",
  description:
    "Seraphine é uma Campeã única. Ela tem contas em redes sociais , tira selfies com seu gato e está colaborando com o grupo de pop global K/DA .",
};

const Stories = () => {
  return (
    <section className={styles.stories}>
      <Controller />

      <ScrollContainer className={styles.stories__cards}>
        <MainCard post={postMain} />
        <SelfCard post={postSelf} />
        <LinkCard post={postLink} />
      </ScrollContainer>
    </section>
  );
};

export default Stories;
