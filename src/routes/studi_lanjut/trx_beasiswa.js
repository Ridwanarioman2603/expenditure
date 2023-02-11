const express = require("express");
const router = express.Router();
const {
    store, renderbeasiswa, showByNoSurat, updatekomponen
} = require("../../controllers/studi_lanjut/trx_beasiswa");
// const transferexpenditureSchame = require("../request/trx_transfer_expenditure");
// const { validationResult } = require("express-validator");
// const { jsonFormat } = require("../utils/jsonFormat");
// const validate = require("../utils/validation");

router.post("/", store)

router.post("/render", renderbeasiswa)

router.get('/showbynosurat/:id', showByNoSurat )

router.put('/update-komponen/:id', updatekomponen)

module.exports = router;