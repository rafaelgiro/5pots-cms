/* eslint-disable react/jsx-one-expression-per-line */

/* TODO: Componentizar com a resposta da API
 * As duas divs internas viraram 2 componentes, mas por enquanto
 *  tenho dúvida nas condicionais.
 */

import React from "react";

import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

import Typography from "../../atoms/Typography";

const ServerStatus = () => {
  return (
    <div className="server-status">
      <Typography className="sidebar__title" component="h4" variant="h4">
        Status do Servidor
      </Typography>
      <div>
        <Typography component="p" variant="p">
          <FaCheckCircle className="server-status__icon server-status__icon--online" />
          <span className="server-status__server-name">Brasil - </span>Online
        </Typography>
      </div>
      <div>
        <Typography component="p" variant="p">
          <FaTimesCircle className="server-status__icon server-status__icon--offline" />
          <span className="server-status__server-name">PBE - </span>Offline
        </Typography>
        <Typography
          className="server-status__time-ago"
          component="p"
          variant="sub"
        >
          1 hora atrás
        </Typography>
        <Typography className="server-status__desc" component="p" variant="p">
          O servidor do PBE ficará indisponível por 2 horas enquanto é
          trabalhado em uma manutenção
        </Typography>
      </div>
    </div>
  );
};

export default ServerStatus;
