const { jsonFormat } = require("../../utils/jsonFormat");
const request = require("request");
const SuratTugasHonor = require("../../models/ref_surat_tugas_honor");
const dokumenKirimPanutan = require("../../models/trx_dokumen_kirim_ke_panutan");
const ExternalKondisi = require("./externalKondisi");
const Status = require("../../models/ref_status");
const HonorPanitiaKegiatan = require("../../models/trx_petugas_honorarium/trx_petugas_honor_panitia_kegiatan");
const HonorPengisiKegiatan = require("../../models/trx_petugas_honorarium/trx_petugas_honor_pangisi_kegiatan");
const HonorPenulisSoal = require("../../models/trx_petugas_honorarium/trx_petugas_honor_penulis_soal");
const HonorPetugas = require("../../models/trx_petugas_honorarium/trx_petugas_honorarium_all");
const refSBMPanitiaKegiatan = require("../../models/ref_sbm_honorarium/ref_sbm_honorarium_panitia_kegiatan")
const refPajak = require("../../models/ref_sbm_honorarium/ref_pajak_honorarium");
const datarefHonor = require("./ref_honorarium_kegiatan_data");
const { validationResult, body } = require("express-validator");
const db = require("../../config/database");
const { QueryTypes,Op, where } = require("sequelize");
const axios = require("axios"); 
const { parse } = require("path");
const hostProdevPanutan = process.env.hostProdevPanutan
const hostEbudgeting = process.env.hostEbudgeting
const idAPI = require("../../lang/id-api.json")


// LIST
const BelumDiproses = async(req,res,next)=>{
    try{
    const panutan = await axios.get(`${hostProdevPanutan}${idAPI.panutan.sk_by_honor}?id=${req.params.id_sub_unit}&metode=${req.params.jenis_honor}&nama=${req.params.nama}`)
    .then((a)=>{return a.data.data});
    console.log("panutan :", panutan)
    const honor = await SuratTugasHonor.findAll({where:{id_sub_unit:req.params.id_sub_unit,jenis_honor:req.params.jenis_honor,nama_honor:req.params.nama}})
    const ArrIdSurat = honor.map((a)=>a.id_surat_tugas)
    let dataResponse = []
    panutan.map((p)=>{
      if(!ArrIdSurat.includes(p.id_surat)){
        dataResponse.push(p)
      }
    })
    jsonFormat(res,"success","Berhasil melihat data",dataResponse)
    }catch(err){
      next(err)
    }
  }

const getHonor = async(req,res,next) =>{
    try{
        let dataResponse = await SuratTugasHonor.findAll().then((a)=>{return a}).catch((err)=>{throw err})
        return jsonFormat(res,'success','Berhasil Menambah Data',dataResponse)
    }catch(err){
        err.statusCode = 404
        next(err)
    }
}

const getHonorByheader = async(req,res,next)=>{
    try{
        console.log(req.params)


        let status = req.params.kode_status.split(",",20)
        const honor = await SuratTugasHonor.findAll({where:{id_sub_unit:req.params.id_sub_unit,jenis_honor:req.params.jenis_honor,nama_honor:req.params.nama,kode_status:{[Op.in]:[status]}}})
        return jsonFormat(res,'success','Berhasil Menampilkan Data',honor)
    }catch(err){
        err.statusCode = 404
        next(err)
    }
}


// Detail DETAIL
const getHonorById = async(req,res,next) =>{
    try{
        let Honor = await SuratTugasHonor.findOne({where:{kode_surat:req.params.kode_surat,tahun:req.params.tahun},
            include:[{
                model:HonorPanitiaKegiatan,
                as:'honor_panitia',
                include:['refSBM','refPajak']
                    }
             ,{
                model:HonorPetugas,
                as:'honor_petugas',
                include:['refSBM','refPajak']
             }
             //,'honor_penulis_soal'
        ]})
        .then((a)=>{if(a==null){throw new Error("data kosong")}return a}).catch((err)=>{throw err})
        let cekrkapagu = await axios.get(`${hostEbudgeting}${idAPI.ebudgeting.rka_bulan}/${parseInt(Honor.kode_rka)}/${Honor.kode_periode}`)
        .then((a)=>{return a.data.values})
        .catch((err)=>{return err})
        let dokumen = await dokumenKirimPanutan.findAll({where:{id_surat_tugas:req.params.kode_surat,aktif:{[Op.in]:[1,2]}}})
        .then((a)=>{
            let responseMap = a.map(async(a)=>{
                let dataCB = await datarefHonor.dataDokumennested(a)
                return dataCB
            })
            return Promise.all(responseMap).then((a)=>a)
        })
        let dataResponse = {
            "Honor":Honor,
            "Dokumen":dokumen,
            "Ebudgeting":cekrkapagu
        }
        return jsonFormat(res,'success','Berhasil Menambah Data',dataResponse)
    }catch(err){
        err.statusCode = 404
        next(err)
    }
}



const ShowPetugas = async(req,res,next) =>{
    try{
        const dataResponse = await HonorPanitiaKegiatan.findOne({where:{kode_trx:req.params.kode_trx}})
        .then((a)=>{
            if(a==null){
                throw new Error("Data tidak ada dalam database")
            }
            return a}).catch((err)=>{throw err});
        jsonFormat(res,"success","Berhasil menampilkan data",dataResponse)
    }catch(err){
        next(err)
    }
}

const getHonorPanutan = async(req,res,next)=>{
    try{
        kode_surat = req.params.kode_surat
        nama_honor = req.params.nama_honor
        tahun = req.params.tahun
        const data  = await SuratTugasHonor.findOne({where:{kode_surat:`${kode_surat}-honorarium`,tahun:tahun},
        include:['honor_panitia','honor_pengisi','honor_penulis_soal']})
        jsonFormat(res,"success","Berhasil menampilkan SK",data)
    }catch(err){
        next(err)
    }
}

const getKodeTrx = async(kode_surat,tahun) =>{
    let data = await SuratTugasHonor.findOne({attributes:['kode_trx'],where:{kode_surat:kode_surat,tahun:tahun}})
    return data.kode_trx
}

// Store STORE
const storeHonor = async(req,res,next) =>{
    try{
    let hitung = await SuratTugasHonor.count({where:{id_surat_panutan:req.body.id_surat, kode_status:{[Op.in]:[3,4,5]}}})
    .then((a)=>{if(a>0){throw new Error('Data Tidak Bisa di Input Kembali')}}).catch((err)=>{throw err})
    let dataH = datarefHonor.dataHonor(req.body)
    let dataResponse = await db.transaction()
    .then((t)=>{
        return SuratTugasHonor.destroy({where:{id_surat_panutan:req.body.id_surat},transaction:t})
        .then((a)=>{
            return SuratTugasHonor.create(dataH,{transaction:t}).then((a)=>{
                t.commit()
            }).catch((err)=>{
                t.rollback()
                return err
            })
        }).catch((err)=>{
            t.rollback()
            return err
        })
    })
     jsonFormat(res,'success','Berhasil Menambah Data',dataResponse)
    }catch(err){
        err.statusCode = 404
        next(err)
    }
}

const storePetugas = async(req,res,next) =>{
    try{
        let dataPetugas = req.body.dataPetugas
        let dataInsert = await dataPetugas.map((a)=>{
            return datarefHonor.dataPetugasHonor(req.body,a)
        })
        await db.transaction()
        .then((t)=>{
            return HonorPanitiaKegiatan.destroy({where:{kode_trx_surat:req.body.kode_trx_surat},transaction:t})
            .then(()=>{
                return HonorPanitiaKegiatan.bulkCreate(dataInsert,{transaction:t})
                .then((a)=>{
                    t.commit()
                    return jsonFormat(res,"success","berhasil menginput data",a)
                })
                .catch((err)=>{
                    throw err
                })
            }) 
            .catch((err)=>{
                t.rollback()
                throw err
            })
        }).catch((err)=>{
        throw err
        })
    }catch(err){
        next(err)
    }
}

const storeHonorPanutan = async(req,res,next) =>{
    try{
        let dataH = datarefHonor.dataHonorPanutan(req.body)
        console.log(dataH);
        let response = await SuratTugasHonor.create(dataH)
        jsonFormat(res,'success','Berhasil Menambah Data',response)
    }catch(err){
        next(err)
    }
}


const storeHonorPanitiaPanutan = async(req,res,next) =>{
    try{
        let honor = await SuratTugasHonor.findOne({where: {kode_surat:`${req.body.kode_surat}-honorarium`,tahun:req.body.tahun}})
        .then((a)=>{if(a==null){throw new Error("Data sk belum ada di database")} return a}).catch((err)=>{throw err})
        let dataPanitia = []
        req.body.dataPanitia.map(async(a)=>{
             dataPanitia.push(datarefHonor.dataHonorPanitiaKegiatan(honor,a))
            
        })

        await db.transaction().then((t)=>{
            HonorPanitiaKegiatan.destroy({where:{kode_surat:`${req.body.kode_surat}-honorarium`,tahun:req.body.tahun},transaction:t})
            .then(()=>{
                HonorPanitiaKegiatan.bulkCreate(dataPanitia,{transaction:t}).then((response)=>{
                    t.commit()
                    jsonFormat(res,'success','Berhasil menambah Data',response)
                }).catch((err)=>{
                    t.rollback()
                    err.statusCode = 401
                     next(err)
                })
            }).catch((err)=>{
                t.rollback()
                err.statusCode = 401
                 next(err)
            })
        })

        
    }catch(err){
        next(err)
    }
}

const storeHonorPengisiPanutan = async(req,res,next) =>{
    try{
        let honor = await SuratTugasHonor.findOne({where: {kode_surat:`${req.body.kode_surat}-honorarium`,tahun:req.body.tahun}})
        .then((a)=>{if(a==null){throw new Error("Data sk belum ada di database")} return a}).catch((err)=>{throw err})
        let dataPanitia = []
        req.body.dataPanitia.map(async(a)=>{
             dataPanitia.push(datarefHonor.dataHonorPengisiKegiatan(honor,a))
            
        })

        await db.transaction().then((t)=>{
            HonorPengisiKegiatan.destroy({where:{kode_surat:`${req.body.kode_surat}-honorarium`,tahun:req.body.tahun},transaction:t})
            .then(()=>{
                HonorPengisiKegiatan.bulkCreate(dataPanitia,{transaction:t}).then((response)=>{
                    t.commit()
                    jsonFormat(res,'success','Berhasil menambah Data',response)
                }).catch((err)=>{
                    t.rollback()
                    err.statusCode = 401
                     next(err)
                })
            }).catch((err)=>{
                t.rollback()
                err.statusCode = 401
                 next(err)
            })
        })

        
    }catch(err){
        next(err)
    }
}

const storeHonorPenulisSoal = async(req,res,next) =>{
    try{
        let honor = await SuratTugasHonor.findOne({where: {kode_surat:`${req.body.kode_surat}-honorarium`,tahun:req.body.tahun}})
        .then((a)=>{if(a==null){throw new Error("Data sk belum ada di database")} return a}).catch((err)=>{throw err})
        let dataPanitia = []
        req.body.dataPanitia.map(async(a)=>{
             dataPanitia.push(datarefHonor.dataHonorPenulisSoal(honor,a))
        })

        await db.transaction().then((t)=>{
            HonorPenulisSoal.destroy({where:{kode_surat:`${req.body.kode_surat}-honorarium`,tahun:req.body.tahun},transaction:t})
            .then(()=>{
                HonorPenulisSoal.bulkCreate(dataPanitia,{transaction:t}).then((response)=>{
                    t.commit()
                    jsonFormat(res,'success','Berhasil menambah Data',response)
                }).catch((err)=>{
                    t.rollback()
                    err.statusCode = 401
                     next(err)
                })
            }).catch((err)=>{
                t.rollback()
                err.statusCode = 401
                 next(err)
            })
        })

        
    }catch(err){
        next(err)
    }
}

// Edit
const editSK = async(req,res,next) =>{
        try{
            let dataWhereSK = await datarefHonor.dataWhereSK(req.params)
            let dataSK = await datarefHonor.dataupdateSK(req.body)
            let response = await SuratTugasHonor.update(dataSK,{where:dataWhereSK})
            jsonFormat(res,'success','Berhasil Mengedit data',response)
        }catch(err){
            next(err)
        }
}

// Input RKA 
const InputRKA = async(req,res,next) =>{
    try{
        let dataWhereSK = await datarefHonor.dataWhereRKA(req.params)
        let dataSK = await datarefHonor.dataupdateRKA(req.body)
        let response = await SuratTugasHonor.update(dataSK,{where:dataWhereSK})
        if(response == 0){
            throw new Error('tidak ada data yang diimputkan')
        }
        // let dataSiakun = {
        //     "tahun":req.body.tahun,
        //     "kode_aplikasi":"08",
        //     "kode_menu":"M08.01.04",
        //     "kode_surat":req.body.id_surat_tugas,
        //     "kode_sub_surat":"-",
        //     "tanggal_transaksi":req.body.tanggal,
        //     "keterangan":`Honorarium - Nomor surat:${req.body.nomor_surat_tugas}`,
        //     "kode_rkatu":req.body.kode_RKA,
        //     "bulan_rkatu":req.body.kode_periode,
        //     "nominal":req.body.jumlah_budget,
        //     "ucr":req.body.ucr
        // }
        //   let lemparsiakun = await axios .post(`https://be1.ut.ac.id/siakun/apiv1/transaksi-pagu/store`,dataSiakun).then((response)=>{return response.data})
        //   .catch((err)=>{throw err})
        jsonFormat(res,'success','berhasil menginputkan rka', response)
    }catch(err){
        next(err)
    }
}

const UpdateSKStatus = async(req,res,next) =>{
    try{
        let response = await updateStatusSK(req.params,req.body.kode_status)
        jsonFormat(res,"success","Berhasil mengupdate status",response)
    }catch(err){
        next(err)
    }
}

let updateStatusSK = async(data,status)=>{
    let response = await SuratTugasHonor.update({kode_status:status},{where:{kode_surat:data.id_surat_tugas,tahun:data.tahun}})
    return response
  }

module.exports={
    BelumDiproses,
    getHonor,
    getHonorById,
    storeHonor,
    storePetugas,
    ShowPetugas,
    getHonorByheader,
    storeHonorPanutan,
    storeHonorPanitiaPanutan,
    getHonorPanutan,
    storeHonorPengisiPanutan,
    storeHonorPenulisSoal,
    getKodeTrx,
    editSK,
    InputRKA,
    UpdateSKStatus
}