const winston = require('winston');
const settings = require(__base + 'settings.json');

const format = winston.format.printf((info) => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
});

const logger = winston.createLogger({
    level: settings.logLevel,
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint(),
        format,
    ),
});

module.exports = logger;
