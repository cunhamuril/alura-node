require("dotenv").config();

require("./database");
require("./redis/blocklist-access-token");
require("./redis/allowlist-refresh-token");

const { JsonWebTokenError, TokenExpiredError } = require("jsonwebtoken");

const {
  InvalidArgumentError,
  NotFoundError,
  NotAuthorizedError,
} = require("./src/erros");

const app = require("./app");
const routes = require("./rotas");

app.use((req, res, next) => {
  res.set({
    "Content-Type": "application/json",
  });

  next();
});

routes(app);

app.use((error, req, res, next) => {
  let status = 500;

  const corpo = {
    mensagem: error.message,
  };

  if (error instanceof InvalidArgumentError) {
    status = 400;
  }

  if (error instanceof NotFoundError) {
    status = 404;
  }

  if (error instanceof NotAuthorizedError) {
    status = 401;
  }

  if (error instanceof JsonWebTokenError) {
    status = 401;
  }

  if (error instanceof TokenExpiredError) {
    status = 401;
    corpo.expiradoEm = error.expiredAt;
  }

  res.status(status);
  res.json(corpo);
});

const port = 3000;

app.listen(port);
