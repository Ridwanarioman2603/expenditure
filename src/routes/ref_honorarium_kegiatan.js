const express = require("express");
const router = express.Router();
const DataController = require("../controllers/honorarium/ref_honorarium_kegiatan");
const DataSPMController = require("../controllers/honorarium/ref_spm_honorarium");
const DokumenController = require("../controllers/honorarium/render_honorarium");
const validation = require("../utils/validation")
const dataInsertController = require("../controllers/honorarium/insert_ref_petugas_honorarium")
const dataValidation = require("../request/ref_honorarium_kegiatan")

router.get("/panutan-belum-diproses/:id_sub_unit/:jenis_honor/:nama",dataValidation.BelumDiproses,validation.process, DataController.BelumDiproses)
router.get("/expenditure/:id_sub_unit/:jenis_honor/:nama/:kode_status", DataController.getHonorByheader)
router.get("/", DataController.getHonor);
router.get("/show/:kode_surat/:tahun",dataValidation.show,validation.process, DataController.getHonorById)
router.get("/show-petugas/:kode_trx",dataValidation.showPetugas,validation.process,DataController.ShowPetugas)

router.get("/get-sk-panutan/:kode_surat/:nama_honor/:tahun",DataController.getHonorPanutan)
router.get("/spm-honorarium/:tahun/:jenis_honor/:nama_honor",DataSPMController.listSPMHonor)


//POST
router.post("/store",dataValidation.store,validation.process,DataController.storeHonor);
router.post("/store-petugas",dataValidation.storePetugas,validation.process,DataController.storePetugas)

//Get NOMOR dan render
router.post("/get-nomor",dataValidation.getnomor,validation.process,DokumenController.getNomor)
router.post("/render-dokumen",dataValidation.renderKirim,validation.process,DokumenController.renderKirim)
router.post("/get-nomor-spm",dataValidation.getnomorSPM,validation.process,DokumenController.getNomorSPM)
router.post("/render-dokumen-spm",dataValidation.renderKirimSPM,validation.process,DokumenController.renderKirimSPM)

//router.post("/store-panitia-kegiatan",dataValidation.storeHonorPanitiaPanutan,validation.process,DataController.storeHonorPanitiaPanutan)
router.post("/store-panitia-kegiatan",dataValidation.storeHonorPanitiaPanutan,validation.process,dataInsertController.insertPanitiaKegiatan)
router.post("/store-sk",dataValidation.storeSKpanutan,validation.process,DataController.storeHonorPanutan)
//router.post("/store-pengisi-kegiatan",dataValidation.storeHonorPengisiPanutan,validation.process,DataController.storeHonorPengisiPanutan)
router.post("/store-penulis-soal",dataValidation.storeHonorPenulisSoal,validation.process,DataController.storeHonorPenulisSoal)
router.post("/store-pengisi-kegiatan",dataValidation.storeHonorPengisiPanutannew,validation.process,dataInsertController.insertPengisiKegiatan)
router.post("/store-petugas-honorarium",dataValidation.storeHonorariumPetugasPanutan,validation.process,dataInsertController.insertPetugasHonor)

//EDIT
router.put("/update-sk/:kode_surat/:tahun",dataValidation.editSK,validation.process,DataController.editSK)
router.put("/update-status-sk/:id_surat_tugas/:tahun",dataValidation.UpdateSKStatus,validation.process,DataController.UpdateSKStatus)

//PUSH RKA
router.put("/update-rka-sk/:kode_surat/:tahun",dataValidation.InputRKA,validation.process,DataController.InputRKA)

module.exports = router;
