const express = require("express");
const router = express.Router();
const validation = require("../../utils/validation")
const dataController = require("../../controllers/ref/ref_sbm_honorarium_pengisi_kegiatan");
const dataValidation = require("../../request/ref/ref_sbm_honorarium_pengisi_kegiatan")

router.get("/", dataController.index);
router.get("/show/:tugas/:jabatan/:eselon",dataValidation.show,validation.process,dataController.show)
router.put("/edit/:tugas/:jabatan/:eselon",dataValidation.edit,validation.process,dataController.edit)
router.post("/store",dataValidation.store,validation.process,dataController.store)


module.exports = router;