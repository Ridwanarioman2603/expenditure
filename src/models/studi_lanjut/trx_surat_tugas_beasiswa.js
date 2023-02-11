const db = require("../../config/database");
const {DataTypes} = require("sequelize");
const dokumenKirimPanutan = require("../trx_dokumen_kirim_ke_panutan")

const TrxSuratTugasBeasiswa = db.define(
    "TrxSuratTugasBeasiswa", 
    {
        kode_trx : {
            type : DataTypes.INTEGER(),
            allowNull : false, 
            primaryKey : true, 
            autoIncrement : true
        }, 
        kode_surat : {
            type : DataTypes.STRING(50),
            allowNull : true, 
        },
        nama_usulan : {
            type : DataTypes.STRING(255), 
            allowNull : true
        }, 
        katagori : {
            type : DataTypes.STRING(255),
            allowNull : true
        },
        nomor_surat : {
            type : DataTypes.STRING(255),
            allowNull : true
        }, 
        tanggal_surat : {
            type : DataTypes.DATE(), 
            allowNull : true
        },
        perihal : {
            type : DataTypes.STRING(255),
            allowNull : true
        },
        kode_unit : {
            type : DataTypes.STRING(16), 
            allowNull : true
        }, 
        tahun : {
            type : DataTypes.STRING(4),
            allowNull : true
        },
        jenjang : {
            type : DataTypes.STRING(2), 
            allowNull : true
        },
        klasifikasi : {
            type : DataTypes.STRING(50),
            allowNull : true
        },
        kode_rkatu : {
            type :DataTypes.STRING(12),
            allowNull : true
        },
        nama_rkatu : {
            type : DataTypes.STRING(50), 
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
    },
    {
        tableName : 'trx_surat_tugas_beasiswa',
        createdAt : 'udcr', 
        updatedAt : 'udch'
    }
)

TrxSuratTugasBeasiswa.hasMany(dokumenKirimPanutan,{
    foreignKey : 'id_surat_tugas',
    as : 'DokumenPanutan'
})

dokumenKirimPanutan.belongsTo(TrxSuratTugasBeasiswa, {
    foreignKey : 'kode_surat', 
    as : 'TrxSuratTugas'
})

module.exports = TrxSuratTugasBeasiswa