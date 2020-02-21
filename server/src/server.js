import app from "./app";

app.listen(process.env.NODE_PORT || 5800);

console.log(`Server started at port ${process.env.NODE_PORT || 5800}`);

export default app;
