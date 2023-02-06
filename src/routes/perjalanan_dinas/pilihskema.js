const express = require("express");
const router = express.Router();
const pilihSkemaController = require("../../controllers/perjalanan_dinas/pilihskema");

router.get("/filter/uang-harian/kode_katagori/:kode_trx_katagori",pilihSkemaController.filterUang);
router.get("/filter/penginapan/kode_katagori-kode_filter_terkait/:kode_trx_katagori/:kode_trx_filter_terkait",pilihSkemaController.filterPenginapan);

module.exports = router;