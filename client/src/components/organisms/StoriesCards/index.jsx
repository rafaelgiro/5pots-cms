import React from "react";
import ScrollContainer from "react-indiana-drag-scroll";

import Controller from "./Controller";
import SelfCard from "./SelfCard";
import LinkCard from "./LinkCard";
import MainCard from "./MainCard";

const postMain = {
  image: "https://imgur.com/cl4lZ4R.jpg",
  category: "Notícias oficiais",
  title: "Criando os Reinos Mech",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat odit rerum alias deserunt quidem sed mollitia reiciendis nobis officia, tempora eaque laboriosam eveniet corporis voluptates omnis porro earum incidunt dignissimos!",
};

const postSelf = {
  image: "https://images5.alphacoders.com/105/thumb-1920-1057451.jpg",
  category: "Atualização do PBE",
  title: "Atualização do PBE 27/01: Sion te amo",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat odit rerum alias deserunt quidem sed mollitia reiciendis nobis officia, tempora eaque laboriosam eveniet corporis voluptates omnis porro earum incidunt dignissimos!",
};

const postLink = {
  image:
    "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltcf72c3444f9b8c68/5eb5bad33458fa2d446903dc/PS20_Volibear_Base.jpg",
  category: "Novo Campeão",
  title: "Volibear - A Tempestade Implacável",
  description:
    "Quando o trovão rugir, conhecerão o nome dele. Acompanhe o retorno de Volibear no resumo da live realizada em 9 de maio de 2020.",
};

const Stories = () => {
  return (
    <section className="stories">
      <Controller />

      <ScrollContainer className="stories__cards">
        <MainCard post={postMain} />
        <SelfCard post={postSelf} />
        <LinkCard post={postLink} />
      </ScrollContainer>
    </section>
  );
};

export default Stories;
