import mongoose from "mongoose";

import app from "./app";
import keys from "./config/keys";

const connectWithRetry = () => {
  mongoose.connect(
    keys.mongoURI || "mongodb://db:27017/5pots-dev",
    {
      useNewUrlParser: true,
    },
    (err) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(
          "Não foi possível conectar ao bancom tentando novamente em 5 segundos..."
        );
        setTimeout(connectWithRetry, 5000);
      }
    }
  );
};

connectWithRetry();

app.listen(process.env.NODE_PORT || 5000);

console.log(`Server started at port ${process.env.NODE_PORT || 5000}`);

export default app;
