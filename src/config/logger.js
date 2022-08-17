const winston = require('winston');

const logConfiguration = {
    'transports': [
        new winston.transports.Console({
            level: 'info'
        }),
        new winston.transports.File({
            filename: 'logs/urlshortener.log'
        })
    ]
};

const logger = winston.createLogger(logConfiguration);

module.exports = logger;