const db = require("../../config/database");
const {DataTypes} = require("sequelize");
const TrxSuratTugasBeasiswa = require("./trx_surat_tugas_beasiswa")
const RefStudiLanjut = require("./ref_studi_lanjut")

const TrxKomponenBeasiswa = db.define(
    "TrxKomponenBeasiswa", 
    {
        kode_trx_surat_tugas : {
            type : DataTypes.INTEGER(),
            allowNull : true, 
        }, 
        kode_ref_studi_lanjut : {
            type : DataTypes.INTEGER(),
            allowNull : true, 
        },
        kode_trx_komponen_beasiswa : {
            type : DataTypes.INTEGER(), 
            allowNull : false
        }, 
        volume : {
            type : DataTypes.INTEGER(),
            allowNull : true
        },
        jumlah : {
            type : DataTypes.DECIMAL(16,2),
            allowNull : true
        }, 
        keterangan : {
            type : DataTypes.TEXT(), 
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
        tableName : "trx_komponen_beasiswa", 
        createdAt : "udcr",
        updatedAt : "udch"
    }
)

TrxSuratTugasBeasiswa.hasMany(TrxKomponenBeasiswa, {
    foreignKey : 'kode_trx_surat_tugas', 
    as : 'TrxKomponenBeasiswa'
})

TrxKomponenBeasiswa.belongsTo(TrxSuratTugasBeasiswa, {
    foreignKey : 'kode_trx_surat_tugas',
    as : 'TrxSuratTugasBeasiswa'
})

RefStudiLanjut.hasMany(TrxKomponenBeasiswa, {
    foreignKey : 'kode_ref_studi_lanjut', 
    as : 'TrxKomponenBeasiswa'
})

TrxKomponenBeasiswa.belongsTo(RefStudiLanjut, {
    foreignKey : 'kode_ref_studi_lanjut',
    as : 'RefStudiLanjut'
})

module.exports = TrxKomponenBeasiswa;