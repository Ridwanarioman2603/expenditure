const PetugasPerjadinBiaya = require("../models/trx_petugas_perjadin_biaya")
const trxSPPD = require("../models/trx_sppd")
const {jsonFormat} = require("../utils/jsonFormat")


exports.index = (req, res, next) => {
    return trxSPPD.findAll({
        attributes : {
            exclude : ["udcr", "udch", "ucr", "uch"]
        },
        include : [
            {
                model : PetugasPerjadinBiaya, 
                as : "surat",
                attributes : {
                    exclude : ["ucr", "uch","udcr", "udch"]
                }
            }
        ]
    })
    .then((app) => {
        jsonFormat(res, "success", "Berhasil Menampilkan", app)
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        return next(err);
    });
}

exports.show = (req, res, next) => {
    const param = {
        kode_surat_tugas: req.params.id,
        nip             : req.params.nip,
        kode_kota_tujuan: req.params.id_tujuan
    }
    return trxSPPD.findOne({
        where : param, 
        attributes : {
            exclude : ["udcr","ucr","uch","udch"]
        },
        include : [
            {
                model : PetugasPerjadinBiaya, 
                as : "surat",
                attributes : {
                    exclude : ["ucr", "uch","udcr", "udch"]
                }
            }
        ]
    })
    .then((app) => {
        if(!app){
            const error = new Error("Data Tidak Ada")
            error.statusCode = 422
            throw error
        }
        return jsonFormat(res, "success", "Data Berhasil Ditampilkan", app)
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        return next(err);
    });
}

exports.store = (req, res, next) => {
    const kode_surat_tugas = req.body.kode_surat_tugas
    const nip = req.body.nip 
    const kode_unit_tujuan = req.body.kode_unit_tujuan
    const jabatan = req.body.jabatan
    const kode_kota_tujuan = req.body.kode_kota_tujuan
    const geolokasi = req.body.geolokasi
    const waktulokasi = req.body.waktulokasi
    const nip_penandatangan = req.body.nip_penandatangan
    const nama_penandatangan = req.body.nama_penandatangan
    const file_link_ttd = req.body.file_link_ttd
    const file_link_foto = req.body.file_link_foto

    return trxSPPD.findAll({
        where : {
            kode_surat_tugas : req.body.kode_surat_tugas, 
            nip : req.body.nip, 
            kode_kota_tujuan : req.body.kode_kota_tujuan
        }
    })
    .then((app) => {
        if(app.length !== 0) {
            const error = new Error ("Data Sudah Ada")
            error.statusCode = 422
            throw error
        }
        return trxSPPD.create({
            kode_surat_tugas : kode_surat_tugas, 
            nip : nip, 
            kode_unit_tujuan : kode_unit_tujuan,
            jabatan : jabatan, 
            kode_kota_tujuan : kode_kota_tujuan,
            geolokasi : geolokasi, 
            waktulokasi : waktulokasi, 
            nip_penandatangan : nip_penandatangan, 
            nama_penandatangan : nama_penandatangan, 
            file_link_foto : file_link_foto, 
            file_link_ttd : file_link_ttd
        })
    })
    .then((appCreate) => {
        if(!appCreate) {
            const error = new Error("Data Gagal Create")
            error.statusCode = 422
            throw error
        }
        return jsonFormat(res, "success", "Data Berhasil Ditambah", appCreate)
    })
    .catch((err) => { 
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        return next(err);
    });
}

exports.update = (req, res, next) => {
    const param = {
        kode_surat_tugas: req.params.id,
        nip             : req.params.nip,
        kode_kota_tujuan: req.params.id_tujuan
    }
    const upd = {
        kode_unit_tujuan : req.body.kode_unit_tujuan,
        jabatan : req.body.jabatan, 
        geolokasi : req.body.geolokasi, 
        waktulokasi : req.body.waktulokasi, 
        nip_penandatangan : req.body.nip_penandatangan,
        nama_penandatangan : req.body.nama_penandatangan, 
        file_link_foto : req.body.file_link_foto, 
        file_link_ttd : req.body.file_link_ttd
    }

    return trxSPPD.findOne({
        where : param 
    })
    .then((app) => {
        if(!app) {
            const error = new Error("Data Tidak Ada")
            error.statusCode = 422 
            throw error
        }
        return trxSPPD.update(upd, {where : param})
    })
    .then((appUpd) => {
        if(!appUpd) {
            const error = new Error("Data Gagal Update")
            error.statusCode = 422
            throw error
        }
        return jsonFormat(res, "success", "Data Berhasil Update", upd);
    })
    .catch((err) => { 
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        return next(err);
    });
}

exports.destroy = (req, res, next) => {
    const param = {
        kode_surat_tugas: req.params.id,
        nip             : req.params.nip,
        kode_kota_tujuan: req.params.id_tujuan
    }

    return trxSPPD.findOne({
        where : param
    })
    .then((app)=> {
        if(!app) {
            const error = new Error("Data Tidak Ada")
            error.statusCode = 422
            throw error
        }
        return trxSPPD.destroy({
            where : param
        });
    })
    .then((appDes) => {
        if(!appDes) {
            const error = new Error("Data Berhasil Hapus")
            error.statusCode = 422
            throw error
        }
        return jsonFormat(res, "success", "Data Berhasil Hapus", appDes);
    })
    .catch((err) => { 
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        return next(err);
    });
}