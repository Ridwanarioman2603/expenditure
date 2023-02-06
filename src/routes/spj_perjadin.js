const express = require("express");
const router = express.Router();
const { nestedspj,listspjperorang,detailspjperorang, nestedspjperorang,detailspjperunit,listperUnit} = require("../controllers/spj_perjadin");

router.get("/nested-perjadin/:id_surat_tugas", nestedspj);
router.get("/list-spj/:nip", listspjperorang);
router.get("/nested-spj/:nip/:id_surat_tugas", detailspjperorang);
router.get("/nested-spj-new/:nip/:id_surat_tugas", nestedspjperorang);
router.get("/list-spj-unit/:kode_unit_tujuan", listperUnit);
router.get("/nested-spj-unit/:kode_unit_tujuan/:id_surat_tugas", detailspjperunit);
module.exports = router;
