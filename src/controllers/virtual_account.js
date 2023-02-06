const axios = require("axios");
const { jsonFormat } = require("../utils/jsonFormat");
const request = require("request");
const tVA = require("../models/t_VA");
const spjPerorang =require("../models/trx_spj_perorang_perjadin");

exports.createVirtualAccount = async(req,res,next)=>{
    let nip = req.body.nip
    let kode_surat = req.body.kode_surat
    let kode_sub_surat = req.body.kode_sub_surat
    let kode_bank = req.body.kode_bank
    let nominal = req.body.nominal
    let ucr = req.body.ucr
    let characters ='Expenditure';
    randomchar = '';
    charactersLength = characters.length;
    for ( let i = 0; i < 11; i++ ) {
        randomchar += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    let kode_VA = kode_surat+randomchar+nip+kode_sub_surat;
    tVA.create({
        nip:nip,
        kode_surat:kode_surat,
        kode_sub_surat:kode_sub_surat,
        kode_VA:kode_VA,
        kode_bank:kode_bank,
        nominal:nominal,
        ucr:ucr,
        status:0
    }).then((create)=>{jsonFormat(res, "success", "pembuatan virtual account berhasil", create);}).catch((err)=>{jsonFormat(res, "failed", err.message, []);})
}

exports.pushNotifVA = (req,res,next) =>{
    spjPerorang.update({status:"+00"},{where:{nomor_virtual_account:req.params.kode_VA}}).then((va)=>{if(va == 0){throw new Error("data tidak ada")} 
        jsonFormat(res,"success","Berhasil mengupdate VA",va)
    }).catch((err)=>{
        next(err)
    })
}