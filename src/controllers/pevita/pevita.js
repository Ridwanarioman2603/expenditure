const axios = require("axios");
const dokumenKirimPanutan = require("../../models/trx_dokumen_kirim_ke_panutan");
const hostPevita = process.env.hostPevita
const hostProdevPanutan = process.env.hostProdevPanutan
const hostProdevPanutannew = process.env.hostProdevPanutannew
const idAPI = require("../../lang/id-api.json")
const db = require("../../config/database");
const { jsonFormat } = require("../../utils/jsonFormat")
const puppeteer  = require("puppeteer");
const path = require("path");
const https = require('https');
const FormData = require('form-data');
const { dataKirimPanutan } = require("../honorarium/ref_honorarium_kegiatan_data");
const aplikasi = process.env.aplikasi

let token = async() =>{ const gettoken = await axios .post(`${hostPevita}${idAPI.pevita.login}`).catch(function(error){
     jsonFormat(res, "failed", error.message, []);});
    return gettoken.data.access_token}

const createnomor = (req,res,next)=>{ 
        
        
        
        dokumenKirimPanutan.max('id_trx').then((maxtrx)=>{
          let datanomor = datagetnomor(req.body,maxtrx+1)
          return token().then((tokenpevita)=>{
            console.log("token",tokenpevita);
            return axios .post(`${hostPevita}${idAPI.pevita.lat_nosurat}`,datanomor,{ headers: { Authorization: `Bearer ${tokenpevita}` }})
            .then((nomor)=>{
              console.log("id_nomor",nomor.data.id_nomor);
              console.log("nomor",nomor.data.nomor);
              return db.transaction((t)=>{
                let datakonddok = datakondisidokumen(req.body)
                  return dokumenKirimPanutan.update({aktif:0},{where:datakonddok,transaction:t})
                  .then(()=>{
                    let datadok = datadokumen(req.body,nomor.data.id_nomor,nomor.data.nomor,1)
                    return dokumenKirimPanutan.create(datadok,{transaction:t}).then((createdok)=>{
                    t.commit()
                      jsonFormat(res,'success','berhasil',createdok)
                })
              }).catch((err)=>{
              t.rollback()
              next(err)}) 
              }) 
            })  
          })
        }).catch((error)=> {
          next(error)
        });  
}
const fgetnomor = (body)=>{
  let tokenpevita = token()
  return axios .post(`${hostPevita}${idAPI.pevita.lat_nosurat}`,data,{ headers: { Authorization: `Bearer ${tokenpevita}` }})
  .then((nomor)=>{
    return nomor.data
  }).catch((a)=> [])
}


const datadokumen = (body,id_nomor,nomor,aktif) =>{
  return {
      katagori_surat:body.katagori_surat,
      id_surat_tugas:body.id_surat_tugas,
      kode_unit:body.kode_unit,
      tahun:body.tahun,
      tanggal:body.tanggal,
      jenis_surat:body.type_surat,
      id_nomor:id_nomor,
      nomor:nomor,
      aktif:aktif
  }
  }

const datagetnomor = (body,newTrx)=>{
      return{
          "aplikasi":aplikasi,
          "sifat_surat":body.sifat_surat,
          "id_surat":newTrx,
          "id_jenis_surat":body.id_jenis_surat,
          "id_jenis_nd":body.id_jenis_nd,
          "perihal":body.perihal,
          "id_klasifikasi":body.id_klasifikasi,
          "id_sub_unit":body.id_sub_unit,
          "id_user":body.id_user,        
          "nama_pembuat":body.ucr,
          "tanggal":body.tanggal
      }
  }

const datakondisidokumen = (body) =>{
return {
        katagori_surat:body.katagori_surat,
        id_surat_tugas:body.id_surat_tugas,
        kode_unit:body.kode_unit,
        tahun:body.tahun,
        jenis_surat:body.type_surat,
}
}

module.exports = {
  createnomor,
  fgetnomor
}