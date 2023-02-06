const loggerConfig = {
  log4js: {
    traceLogConfig: {
      appenders: {
        fileAppender: { type: "file", filename: "./src/logs/logger.log" },
      },
      categories: {
        default: { appenders: ["appender"], level: "debug" },
      },
    },
  },
};

module.exports = loggerConfig;
