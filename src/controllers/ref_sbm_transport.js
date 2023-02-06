const { jsonFormat } = require("../utils/jsonFormat");
const axios = require("axios");
const { QueryTypes } = require("sequelize");
const SbmTransport = require("../models/ref_sbm_transport");
const { validationResult } = require("express-validator");

exports.getAll = async (req, res, next) => {
    try {
      const data = await SbmTransport.findAll({
        include:["provinsi_asal","pokjar_asal","pokjar_tujuan","provinsi_tujuan"]
      });
      jsonFormat(res, "success", "Berhasil memuat data", data);
    } catch (error) {
      jsonFormat(res, "failed", error.message, []);
    }
  }

  exports.getbyprimarykey = async (req, res, next) => {
    try {
      const data = await SbmTransport.findAll({
        where:{kode_unit:req.params.kode_unit,asal:req.params.asal,tujuan:req.params.tujuan},
        include:["provinsi_asal","pokjar_asal","pokjar_tujuan","provinsi_tujuan"]
      });
      jsonFormat(res, "success", "Berhasil memuat data", data);
    } catch (error) {
      jsonFormat(res, "failed", error.message, []);
    }
  }

  exports.filterTransport = async (req, res, next) => {
    try {
      const data = await SbmTransport.findOne({
        where:{kode_unit:req.params.kode_unit,asal:req.params.asal,tujuan:req.params.tujuan},
      }).then((d)=>{
        if(d==null){
          let err = new Error('Tidak ada di database')
          throw err
        }
        let arrSelection = []
        if(d.udara > 0){
          arrSelection.push({
            kode_unit:req.params.kode_unit,
            asal:req.params.asal,
            tujuan:req.params.tujuan,
            kode_transport:"udara",
            biaya:d.udara
          })
        }
        if(d.darat > 0){
          arrSelection.push({
            kode_unit:req.params.kode_unit,
            asal:req.params.asal,
            tujuan:req.params.tujuan,
            kode_transport:"darat",
            biaya:d.darat
          })
        }

        if(d.laut > 0){
          arrSelection.push({
            kode_unit:req.params.kode_unit,
            asal:req.params.asal,
            tujuan:req.params.tujuan,
            kode_transport:"laut",
            biaya:d.laut
          })
        }

        return arrSelection 
      }).catch((err)=>{throw err})

      jsonFormat(res, "success", "Berhasil memuat data", data);
    } catch (error) {
      return next(error)
    }
  }
  
  exports.getbykodeunit = async (req, res, next) => {
    try {
      const data = await SbmTransport.findAll({
        where:{kode_unit:req.params.kode_unit},
        include:["provinsi_asal","pokjar_asal","pokjar_tujuan","provinsi_tujuan"]
      });
      jsonFormat(res, "success", "Berhasil memuat data", data);
    } catch (error) {
      jsonFormat(res, "failed", error.message, []);
    }
  }

  exports.create = async (req,res,next) => {
    try{
    const data = await SbmTransport.findAll({where:{kode_unit:req.body.kode_unit,asal:req.body.asal,tujuan:req.body.tujuan}});
    if(data.lenght > 0){
      return jsonFormat(res, "failed","data telah ada di database", []);
    }
      await SbmTransport.create({
        kode_unit:req.body.kode_unit,
        kode_provinsi_asal:req.body.kode_provinsi_asal,
        asal:req.body.asal,
        tujuan:req.body.tujuan,
        kode_provinsi_tujuan:req.body.kode_provinsi_tujuan,
        udara: req.body.udara,
        darat: req.body.darat,
        laut:req.body.laut,
        keterangan:"terverifikasi admin",
        ucr: req.body.ucr,
      })
      jsonFormat(res, "success", "Berhasil membuat data", []);
    }catch(error){
      jsonFormat(res, "failed", error.message, []);}
  }

  exports.deleteData = async (req, res, next) => {
    try{
      const data = await SbmTransport.findOne({
        where: { kode_unit:req.params.kode_unit,asal:req.params.asal,tujuan:req.params.tujuan},
      });
      if (data === null)
        return jsonFormat(res, "failed", "data SBM tidak ada", []);
  
      await SbmTransport.destroy({
        where: {
          kode_unit:req.params.kode_unit,asal:req.params.asal,tujuan:req.params.tujuan
        },
      });
      jsonFormat(res, "success", "Berhasil menghapus data", []);
    } catch (error) {
      jsonFormat(res, "failed", error.message, []);
    }
  };

  exports.update = async (req, res, next) => {
    try {
      const data = await SbmTransport.findOne({
        where: { kode_unit:req.params.kode_unit,asal:req.params.asal,tujuan:req.params.tujuan},
      });
      if (data === null)
        return jsonFormat(res, "failed", "data sbm tidak ada", []);
  
      await SbmTransport.update(req.body, {
        where: {
          kode_unit:req.params.kode_unit,asal:req.params.asal,tujuan:req.params.tujuan
        },
      });
  
      jsonFormat(res, "success", "Berhasil memperbarui data", []);
    } catch (error) {
      jsonFormat(res, "failed", error.message, []);
    }
  };


  exports.filterssatu = async (req, res, next) => {
    try {
      const data = await SbmTransport.findAll({
        where:{kode_unit:req.params.kode_unit},
        include:["provinsi_asal","pokjar_asal"]
      ,group:"asal"});
      jsonFormat(res, "success", "Berhasil memuat data", data);
    } catch (error) {
      jsonFormat(res, "failed", error.message, []);
    }
  }

  exports.filtersdua = async (req, res, next) => {
    try{
      const data = await SbmTransport.findAll({
        where:{kode_unit:req.params.kode_unit, asal:req.params.asal},
        include:["provinsi_tujuan","pokjar_tujuan"]
      ,group:"tujuan"})

      jsonFormat(res, "success", "Berhasil memuat data", data);
    }catch(error){
      jsonFormat(res, "failed", error.message, []);
    }
  }