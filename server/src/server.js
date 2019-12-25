require("sucrase/register");

import app from "./app";

app.listen(process.env.PORT || 5000);

console.log(`Server started at port ${process.env.PORT || 5000}`);

export default app;
