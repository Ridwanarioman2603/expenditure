const express = require("express");
const router = express.Router();
const { nestedAll,allpanutanBarjas,detailbarjaspanutan,getdetailpembayaran,listSPM,
    nestedfrompanutan,nestedlistfrompanutan,nestedexpenditure,panutanexcludeexpenditure,
    detailBarjas,allexpenditure,
    transferdata,renderkrirmspm,
    store,storeOne,
    UpdateStatusBarjas
    ,getNomorSpm,NestedBarjas } = require("../controllers/ref_surat_tugas_barjas");
const barjasSchema = require("../request/ref_surat_barjas")
const { validationResult } = require("express-validator");
const { jsonFormat } = require("../utils/jsonFormat");
const validate = require("../utils/validation");

router.get("/allpanutan", allpanutanBarjas);
router.get("/nested-all", nestedAll);
router.get("/nested-detail/:id_permintaan/:id_kontrak", detailBarjas);
router.get("/allpanutannested", nestedlistfrompanutan);
router.get("/detailbarjaspanutan/:id_permintaan",detailbarjaspanutan);
router.get("/nestedfrompanutan/:id_permintaan",nestedfrompanutan);
router.get("/detailpermintaanpanutan/:id_level/:id_permintaan",getdetailpembayaran);
router.get("/allexpenditure", allexpenditure);
router.get("/nested-expenditure/:kode_permintaan/:kode_kontrak", nestedexpenditure);
router.get("/sibela-exclude-expenditure/:tahun", panutanexcludeexpenditure);
router.get("/list-spm", listSPM);
router.post("/get-nomor-spm",barjasSchema.getNomor,validate.process, transferdata);
router.post("/render-spm", renderkrirmspm);
router.post("/store",barjasSchema.store,validate.process, store);

  router.post("/store-one",barjasSchema.storeOne,validate.process, storeOne);

  router.post("/get-nomor-spm-new",barjasSchema.getNomorSPM,validate.process, getNomorSpm);

router.put("/update-status",barjasSchema.UpdateStatus,validate.process, UpdateStatusBarjas);

  router.get("/nested-barjas/:kode_permintaan/:kode_kontrak/:tahun", NestedBarjas);

module.exports = router;