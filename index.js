const logger = require('./logger/logger')
const app = require('./app');
const port = process.env.PORT || 3000;

app.listen(port, () => logger.info(`Server has been started on ${port}`));