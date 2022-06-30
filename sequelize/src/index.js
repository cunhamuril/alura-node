const express = require("express");
const bodyParser = require("body-parser");

const routes = require("./routes");

const app = express();

app.use(bodyParser.json());

routes(app);

const port = 3000;
app.listen(port, () => {
  console.log(`🚀 Server is running in port ${port}`);
});
