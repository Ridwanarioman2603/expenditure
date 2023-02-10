const db = require("../../config/database");
const {DataTypes} = require("sequelize");

const TrxSuratTugasBeasiswa = db.define(
    "TrxSuratTugasBeasiswa", 
    {
        kode_trx_surat_tugas : {
            type : DataTypes.INTEGER(),
            allowNull : false, 
            primaryKey : true, 
            autoIncrement : true
        }, 
        no_surat_tugas : {
            type : DataTypes.STRING(50),
            allowNull : true, 
        },
        nip : {
            type : DataTypes.STRING(16), 
            allowNull : true
        }, 
        nama_pegawai : {
            type : DataTypes.STRING(255),
            allowNull : true
        },
        tahun : {
            type : DataTypes.STRING(4),
            allowNull : true
        }, 
        npwp : {
            type : DataTypes.STRING(50), 
            allowNull : true
        },
        kode_bank : {
            type : DataTypes.STRING(3),
            allowNull : true
        },
        nama_bank : {
            type : DataTypes.STRING(100), 
            allowNull : true
        }, 
        atas_nama_rekening : {
            type : DataTypes.STRING(255),
            allowNull : true
        },
        ucr: {
            type: DataTypes.STRING(100),
            allowNull: true,
          },
          uch: {
            type: DataTypes.STRING(100),
            allowNull: true,
          },
          udcr: {
            type: DataTypes.DATE,
            allowNull: true,
          },
          udch: {
            type: DataTypes.DATE,
            allowNull: true,
          },
    }
)