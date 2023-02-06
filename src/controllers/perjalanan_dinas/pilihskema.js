const refKatagoriPerjadin = require("../../models/ref_katagori_perjadin")
const refPerjalanan = require("../../models/ref_perjalanan")
const refSbmTransporPerjadin = require("../../models/ref_sbm_transpor_perjadin")
const refFilterSkema = require("../../models/ref_filter_skema")
const trxKatagoriFilter = require("../../models/trx_katagori_filter")
const trxtPerjalananSbm = require("../../models/trx_perjalanan_sbm")
const {jsonFormat} = require("../../utils/jsonFormat")
const { response } = require("express")

exports.pilihSkema = (req,res,next) =>{

}

exports.filterUang = (req,res,next) =>{
    trxKatagoriFilter.findAll({include:{
        model:refFilterSkema,
        as:"mKFilter"
    },where:{kode_trx_katagori:req.params.kode_trx_katagori,katagori:"UANG_HARIAN"}}).then((response)=>{
        if(response.length === 0){
            let erro = new Error("data filter tidak ada")
        }
        jsonFormat(res,"success","Berhasil Menampilkan data",response)
    }).catch((erro) =>{
        jsonFormat(res,"success",erro.message,[])
    })
}

exports.filterPenginapan = (req,res,next) =>{
    trxKatagoriFilter.findAll({include:{
        model:refFilterSkema,
        as:"mKFilter"
    },where:{kode_trx_katagori:req.params.kode_trx_katagori,kode_trx_filter_terkait:req.params.kode_trx_filter_terkait,katagori:"PENGINAPAN"}}).then((response)=>{
        if(response.length === 0){
            let erro = new Error("data filter tidak ada")
        }
        jsonFormat(res,"success","Berhasil Menampilkan data",response)
    }).catch((erro) =>{
        jsonFormat(res,"success",erro.message,[])
    })
}

let perjalanan = (kode_tempat_asal,kode_tempat_tujuan,eselon,gol) =>{
    refPerjalanan.findOne({includes:{
        model:trxtPerjalananSbm,
        as:"htrxsbm",
        include:{
            model:refSbmTransporPerjadin,
            as:"bsbmtranspor"
        }
    },where:{kode_tempat_asal:kode_tempat_asal,kode_tempat_tujuan:kode_tempat_tujuan,eselon:eselon,gol:gol}})
    .then((response)=>{
        htrxsbm.map((trx)=>{
            return {
                kode_komponen:"1."+trx.kode_trx_perjalanan+"."+trx.kode_trx_sbm,
                keterangan:trx.bsbmtranspor.katagori_sbm,
                satuan:trx.bsbmtranspor.satuan,
                
            }
        })
    })
}