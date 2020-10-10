//server.js
const app = require("./app");
const config = require('./config/config');

app.listen(config.port, () => {
  console.info(`server started on port ${config.port} (${config.env})`); // eslint-disable-line no-console
});


