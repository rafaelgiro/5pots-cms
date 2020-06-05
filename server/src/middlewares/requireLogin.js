export default (req, res, next) => {
  if (!req.user) {
    return res.send(401).send({ error: "You must log in!" });
  }

  next();
};
