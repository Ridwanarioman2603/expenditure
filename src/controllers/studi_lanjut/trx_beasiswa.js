const TrxSuratTugasBeasiswa = require("../../models/studi_lanjut/trx_surat_tugas_beasiswa")
const TrxKomponenBeasiswa = require("../../models/studi_lanjut/trx_komponen_beasiswa")
const hostExpenditure = process.env.hostExpenditure;
const dokumenKirimPanutan = require("../../models/trx_dokumen_kirim_ke_panutan");
const pevita = require("../../utils/pevita")
const render = require("../../utils/renderpdf")
const db = require("../../config/database");
const { jsonFormat } = require("../../utils/jsonFormat");

exports.store = (req, res, next) => {
    let kodemax
    let nomor_surat
    let kode_surat
    let insert1
    let data
    return db.transaction ()
    .then((t) => {
        return TrxSuratTugasBeasiswa.max('kode_trx').then((max) => {
            let kode_trx = max + 1
            kodemax = kode_trx
            let katagori = "Beasiswa"
            kode_surat = kode_trx + "-" + katagori
            nomor_surat = "Beasiswa"
            let rkatu = req.body.rkatu
            let rkatu_split = rkatu.split("||")
            let kode_rkatu = rkatu_split[0]
            let nama_rkatu = rkatu_split[1]
            insert1 = {
                kode_trx     : kode_trx,
                kode_surat   : kode_surat,
                nama_usulan  : req.body.nama_usulan,
                katagori     : katagori,
                nomor_surat  : nomor_surat,
                tanggal_surat: req.body.tanggal_surat,
                perihal      : req.body.perihal,
                kode_unit    : req.body.kode_unit,
                tahun        : req.body.tahun,
                jenjang      : req.body.jenjang,
                klasifikasi  : req.body.klasifikasi,
                kode_rkatu   : kode_rkatu,
                nama_rkatu   : nama_rkatu
            }
            return TrxSuratTugasBeasiswa.create(insert1, {transaction : t});
        })
        .then((appCreate) => {
            if(!appCreate) {
                const error = new Error ("Data Gagal Tambah")
                error.statusCode = 422
                throw error
            }
            const request = req.body;
            data = request.tkomponen.map((item) => {
                return {
                    kode_trx            : kodemax,
                    nip                 : item.nip,
                    nama_pegawai        : item.nama_pegawai,
                    keterangan          : item.keterangan,
                    golongan            : item.golongan,
                    biaya_pendaftaran   : item.biaya_pendaftaran,
                    biaya_spp           : item.biaya_spp,
                    dana_hidup          : item.dana_hidup,
                    tunjangan_buku      : item.tunjangan_buku,
                    tunjangan_keluarga  : item.tunjangan_keluarga,
                    dana_transportasi   : item.dana_transportasi,
                    dana_kedatangan     : item.dana_kedatangan,
                    dana_keadaan_darurat: item.dana_keadaan_darurat,
                    bantuan_penelitian  : item.bantuan_penelitian,
                    bantuan_seminar     : item.bantuan_seminar,
                    bantuan_publikasi   : item.bantuan_publikasi,
                    pph                 : item.pph,
                    jumlah_diterima     : item.jumlah_diterima
                }
            });
            return TrxKomponenBeasiswa.bulkCreate(data, {
                transaction : t
            });
        })
        .then((appBulk) => {
            if(!appBulk) {
                const error = new Error ("Data Gagal Tambah")
                error.statusCode = 422
                throw error
            }

            t.commit();
        })
        .catch((err) => {
            t.rollback()
            throw err
        })
    })
    .then(() => {
        return jsonFormat(res,'success', 'Data Berhasil Ditambah', {
            insert1, 
            data
        })
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    });
}

exports.renderbeasiswa = (req, res, next) => {
    const script_html = req.body.script_html

    return render.render(script_html)
    .then((app) => {
        if(!app) {
            const error = new Error("Data Gagal Render")
            error.statusCode = 422
            throw error
        }
        return jsonFormat(res, "success", "Data Berhasil Render")
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    });
}

exports.showByNoSurat = (req, res, next) => {
    let param = {
        kode_surat : req.params.id
    }
    return TrxSuratTugasBeasiswa.findAll({
        where : param,
        include : [
            {
                model : dokumenKirimPanutan,
                as : 'DokumenPanutan',
                attributes : ['id_surat_tugas','nomor']
            },
            {
                model : TrxKomponenBeasiswa, 
                as : 'TrxKomponenBeasiswa',
                attributes : {
                    exclude : ['udcr','udch','ucr','uch']
                }
            }
        ]
    })
    .then((app) => {
        if(app.length === 0) {
            const error = new Error("Data Tidak Ada")
            error.statusCode = 422
            throw error
        }
        return jsonFormat(res, 'success', 'Data Berhasil Ditampilkan', app)
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    });
}

exports.updatekomponen = (req, res, next) => {
    const param = {
        kode_trx_komponen_beasiswa : req.params.id
    }
    const body = {
        nip                 : req.body.nip,
        nama_pegawai        : req.body.nama_pegawai,
        keterangan          : req.body.keterangan,
        golongan            : req.body.golongan,
        biaya_pendaftaran   : req.body.biaya_pendaftaran,
        biaya_spp           : req.body.biaya_spp,
        dana_hidup          : req.body.dana_hidup,
        tunjangan_buku      : req.body.tunjangan_buku,
        tunjangan_keluarga  : req.body.tunjangan_keluarga,
        dana_transportasi   : req.body.dana_transportasi,
        dana_kedatangan     : req.body.dana_kedatangan,
        dana_keadaan_darurat: req.body.dana_keadaan_darurat,
        bantuan_penelitian  : req.body.bantuan_penelitian,
        bantuan_seminar     : req.body.bantuan_seminar,
        bantuan_publikasi   : req.body.bantuan_publikasi,
        pph                 : req.body.pph,
        jumlah_diterima     : req.body.jumlah_diterima
    }
    return TrxKomponenBeasiswa.findOne({
        where : param
    })
    .then((app) => {
        if(!app) {
            const error = new Error("Data Tidak Ada")
            error.statusCode = 422
            throw error
        }
        return TrxKomponenBeasiswa.update(body, {
            where : param
        });
    })
    .then((appUpd) => {
        if(!appUpd) {
            const error = new Error("Data Tidak Ada")
            error.statusCode = 422
            throw error
        }
        return jsonFormat(res, 'success', 'Data Berhasil Diupdate', body)
    })
    .catch((err) => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    });
}