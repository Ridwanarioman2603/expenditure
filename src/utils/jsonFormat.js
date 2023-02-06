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
   
    res.json({
      status: "failed",
      message: msg,
      data: data,
    });
  }

  if (status === "datanull") {
    res.json({
      status: "datanull",
      message: msg,
      data: data,
    });
  }
};
