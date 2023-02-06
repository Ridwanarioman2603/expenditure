const hostProdevPanutannew = process.env.hostProdevPanutannew
const idAPI = require("../lang/id-api.json")
const fs = require('fs');
const dokumenKirimPanutan = require("../models/trx_dokumen_kirim_ke_panutan");
const request = require("request");
const log4js = require("log4js");

const generateNomor = (nomor,panjang,variabelDepan) =>{
    return nomor.padStart(panjang,variabelDepan)
}

const randomkarakter = () =>{
  let characters = "abcdefghijklmnopqrstuvwxyz1234567890"
  let randomchar = ""
       charactersLength = characters.length;
       for (let i = 0; i < 15; i++) {
         randomchar += characters.charAt(
           Math.floor(Math.random() * charactersLength)
         );
       }
       return randomchar
}

const linkfilepanutan = (tahun,id,dokumen) =>{
    return `${hostProdevPanutannew}/archive_external/${tahun}/E-Expenditure/${id}/${dokumen}`
}

const kirimpanutan = (pathpdf,filename,sifat_surat,id_trx,nomor_surat,perihal,tanggal_surat,nip_pembuat,nip_penandatangan,tahun) =>{
  try{
let options = {
      'method': 'POST',
      'url': `${hostProdevPanutannew}${idAPI.panutan.send_data}`,
      'headers': {
      },
      formData: {
        'pdf': {
          'value': fs.createReadStream(pathpdf),
          'options': {
            'filename': filename,
            'contentType': null
          }
        },
        'email': 'expenditure@ecampus.ut.ac.id',
        'password': 'password123',
        'id_aplikasi': '4',
        'sifat_surat': sifat_surat,
        'id_trx': id_trx,
        'nomor_surat': nomor_surat,
        'perihal': perihal,
        'tanggal_surat': tanggal_surat,
        'nip_pembuat': nip_pembuat,
        'nip_penandatangan[]': nip_penandatangan
      }
    };
   request(options, function (error, response,body) {
      if (error) throw new Error(error);
      let a = JSON.parse(body)
      let link_file = linkfilepanutan(tahun,a.id,a.dokumen)
      dokumenKirimPanutan.update({link_file:link_file,id_file:a.id},{where:{id_trx:id_trx}})
                  fs.unlink(pathpdf, (err) => {console.log("unlink error", err);})
                  return body
  
    });

    return null

  } catch(err){
    let res = {
      "id_trx":id_trx,
      "err":err
    }
            log4js.getLogger().debug(res);
    return null
  }
  
  }

module.exports = {
  generateNomor,
  linkfilepanutan,
  kirimpanutan,
  randomkarakter,
};