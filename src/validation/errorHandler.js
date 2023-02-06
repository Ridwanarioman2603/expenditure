// define error
module.exports = (error, req, res, next) => {
    const code = error.statusCode || 500;
  
    let data = {
      code: code,
      status: "failed",
      error: error?.message,
    };
  
    if (code !== 422) {
      data = {
        code: code,
        status: "failed",
        error: [
          {
            msg: error.message,
          },
        ],
      };
    }
    
    res.statusCode = 200
    res.json(data);
  };
  