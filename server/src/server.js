import app from "./app";

app.listen(process.env.NODE_PORT || 5000);

console.log(`Server started at port ${process.env.NODE_PORT || 5000}`);

export default app;
