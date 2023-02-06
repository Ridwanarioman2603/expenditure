const express = require("express");
const router = express.Router();
const {
    getByUnit,
    getByNip,
    getByprimarykey,
    create,
    detailVA
} = require("../controllers/trx_spj_perorang_perjadin");

const SPJSchema = require("../request/trx_spj_perorang_perjadin")
const { validationResult } = require("express-validator");
const { jsonFormat } = require("../utils/jsonFormat");
const validate = require("../utils/validation");

router.get("/getByUnit/:kode_unit", getByUnit);
router.get("/getByNip/:nip", getByNip);
router.get("/getByprimarykey/:kode_surat/:nip/:kode_kota_tujuan",getByprimarykey);
router.post("/create",SPJSchema.create,validate.process,create);
router.get("/virtual-account/:nomor_va",detailVA)

module.exports = router;
