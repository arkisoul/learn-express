const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

const routes = require("./routes");

app.use("/users", routes.users);
app.use("/auth", routes.auth);

app.listen(port, () =>
  console.log(`Express server started listening at PORT ${port}`)
);
