const { check } = require("express-validator");

exports.show = [
    check("tugas").exists().withMessage("params tugas harus ada."),
    check("komponen").exists().withMessage("params komponen harus ada."),
  ];

exports.store = [
    check("tugas").notEmpty().withMessage("tugas harus ada."),
    check("komponen").notEmpty().withMessage("komponen harus ada."),
    check("satuan").notEmpty().withMessage("satuan harus di isi "),
    check("besaran").notEmpty().isInt().withMessage("besaran harus di isi dengan angka"),
    check("ucr").notEmpty().withMessage("ucr harus di isi."),
  ];

  exports.edit = [
    check("tugas").exists().withMessage("params tugas harus ada."),
    check("komponen").exists().withMessage("params komponen harus ada."),
    check("satuan").notEmpty().withMessage("satuan harus di isi "),
    check("besaran").notEmpty().isInt().withMessage("besaran harus di isi dengan angka"),
    check("uch").notEmpty().withMessage("uch harus di isi."),
  ];
  