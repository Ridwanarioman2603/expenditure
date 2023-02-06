const log4js = require("log4js");
exports.jsonFormat = (res, status, msg, data = []) => {
  if (status === "success") {
    res.json({
      status: "success",
      message: msg,
      data: data,
      meta: {
        total: "",
        page: "",
        limit: "",
      },
    });
  }

  if (status === "failed") {
        log4js.getLogger().debug(msg);
    res.json({
      status: "failed",
      message: msg,
      data: data,
    });
  }

  if (status === "datanull") {
        log4js.getLogger().debug(msg);
    res.json({
      status: "datanull",
      message: msg,
      data: data,
    });
  }
};
