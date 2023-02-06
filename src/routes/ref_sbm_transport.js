const express = require("express");
const router = express.Router();
const { getAll,
    getbyprimarykey,
    getbykodeunit,
    create,
    update,
    deleteData,filtersatu,filterdua,filterTransport } = require("../controllers/ref_sbm_transport");
const sbmTransportSchema = require("../request/ref_sbm_transport");
const validate = require("../utils/validation");

// router.get("/", getAllRka);
router.get("/getAll", getAll);
router.get("/getbyprimarykey/kode_unit-asal-tujuan/:kode_unit/:asal/:tujuan", getbyprimarykey);
router.get("/filter-transport/kode_unit-asal-tujuan/:kode_unit/:asal/:tujuan", filterTransport);
router.get("/getbykodeunit/kode_unit/:kode_unit",getbykodeunit)
router.post("/", sbmTransportSchema.create,validate.process, create);
router.put("/getbyprimarykey/kode_unit-asal-tujuan/:kode_unit/:asal/:tujuan",sbmTransportSchema.update,validate.process, update);
router.delete("/getbyprimarykey/kode_unit-asal-tujuan/:kode_unit/:asal/:tujuan", deleteData);
module.exports = router;
