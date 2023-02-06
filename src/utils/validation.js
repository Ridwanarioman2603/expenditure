const {jsonFormat} = require("./jsonFormat");
const { validationResult } = require("express-validator");

exports.process = (req,res,next)=>{
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return jsonFormat(res, "failed", errors.message, errors);
  }
  return next()
}