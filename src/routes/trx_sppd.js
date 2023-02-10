const express = require("express");
const router = express.Router();
const {
    index, 
    show, 
    store, 
    update,
    destroy
} = require("../controllers/trx_sppd");
const transferexpenditureSchame = require("../request/trx_transfer_expenditure");
const { validationResult } = require("express-validator");
const { jsonFormat } = require("../utils/jsonFormat");
const validate = require("../utils/validation");

router.get("/get-sppd", index)
router.get("/get-sppd-byid/:id/:nip/:id_tujuan",show)
router.post("/add-sppd", store)
router.put("/update-sppd/:id/:nip/:id_tujuan",update)
router.delete("/delete-sppd/:id/:nip/:id_tujuan",destroy)

module.exports = router;