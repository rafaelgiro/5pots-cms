import mongoose from "mongoose";

import app from "./app";
import keys from "./config/keys";

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
});

app.listen(process.env.NODE_PORT || 5000);

console.log(`Server started at port ${process.env.NODE_PORT || 5000}`);

export default app;
