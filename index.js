const logger = require('./logger/logger')
const app = require('./app');
const port = process.env.PORT || 3000;

app.listen(port, () => logger.info(`Server has been started on ${port}`));






















// const winston = require('winston')
// const DatadogWinston = require('datadog-winston')

// const logger = winston.createLogger({
//     // Whatever options you need
//     // Refer https://github.com/winstonjs/winston#creating-your-own-logger
// })

// logger.add(
//     new DatadogWinston({
//         apiKey: 'super_secret_datadog_api_key',
//         hostname: 'my_machine',
//         service: 'super_service',
//         ddsource: 'nodejs',
//         ddtags: 'foo:bar,boo:baz'
//     })
// )

// module.exports = logger;

// // Example logs
// logger.log('info', 'Hello simple log!');
// logger.info('Hello log with metas',{color: 'blue' });