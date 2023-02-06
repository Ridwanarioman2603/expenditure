const refSBMHonorarium = require("../../models/ref_sbm_honorarium/ref_sbm_honorarium_all");
const { jsonFormat } = require("../../utils/jsonFormat");
const index = async(req,res,next)=>{
    try{
        const SBM = await refSBMHonorarium.findAll()
        .then((a)=>{if(a==null){let err = new Error('Data tidak ditemukan'); err.statusCode = 400; throw err } return a}).catch((err)=>{throw err})
        return jsonFormat(res,"success","Berhasil Menampilkan Data",SBM)
    }catch(err){
        err.statusCode = 404
        next(err)
    }
}

const show = async(req,res,next) =>{
    try{
        const SBM = await refSBMHonorarium.findAll({where:req.params})
        .then((a)=>{if(a==null){let err = new Error('Data tidak ditemukan'); err.statusCode = 400; throw err } return a}).catch((err)=>{throw err})
        return jsonFormat(res,"success","Berhasil Menampilkan Data",SBM)
    }catch(err){
        err.statusCode = 404
        next(err) 
    }
}

const edit = async(req,res,next)=>{
    try{
        const SBM = await refSBMHonorarium.update(req.body,{where:req.params})
        .then((a)=>{if(a==0){let err = new Error('Data tidak ada yang diubah'); err.statusCode = 400; throw err } return a}).catch((err)=>{throw err})
        return jsonFormat(res,"success","Berhasil Mengubah Data",SBM)
    }catch(err){
        err.statusCode = 404
        next(err) 
    }
}

const store = async(req,res,next)=>{
    try{
        const SBM = await refSBMHonorarium.create(req.body)
        .then((a)=>{return a}).catch((err)=>{throw err})
        return jsonFormat(res,"success","Berhasil Menambahkan Data",SBM)
    }catch(err){
        err.statusCode = 404
        next(err) 
    }
}

const showunik = async(body,data)=>{
    let response = await refSBMHonorarium.findOne({where:{kode_klasifikasi:body.kode_klasifikasi,katagori:data.katagori,tugas:data.tugas,jenjang:data.jenjang,eselon:data.eselon,jabatan:data.jabatan,}})
    return response
}

module.exports ={
    index,
    show,
    edit,
    store,
    showunik
}