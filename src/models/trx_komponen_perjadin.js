const { Sequelize } = require("sequelize");
const db = require("../config/database");

const { DataTypes } = Sequelize;

const KomponenPerjadin = db.define(
  "KomponenPerjadin",
  {
    id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false,
    },
    id_petugas: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    kode_surat_tugas: {
      type: DataTypes.STRING(100),
      primaryKey: true,
      allowNull: false,
    },
    urut_tugas: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false,
    },
    nip: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true,
    },
    kode_komponen_honor: {
      type: DataTypes.STRING(1),
      allowNull: false,
      primaryKey: true,
    },
    keterangan_komponen: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    tahun: {
      type: DataTypes.INTEGER(4),
      primaryKey: true,
      allowNull: false,
    },
    kode_kota_asal: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    kode_kota_tujuan: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    kode_satuan: {
      type: DataTypes.STRING(2),
      allowNull: false,
    },
    biaya_satuan: {
      type: DataTypes.DECIMAL(10,0),
      allowNull: false,
    },
    pajak_persen: {
      type: DataTypes.DECIMAL(10,3),
      allowNull: true,
    },
    jumlah_pajak: {
        type: DataTypes.DECIMAL(10,0),
        allowNull: true,
      },
    jumlah: {
    type: DataTypes.INTEGER(3),
    allowNull: true,
    },
    total: {
        type: DataTypes.DECIMAL(10,0),
        allowNull: true,
        },
    
  },
  {
    tableName: "trx_komponen_perjadin",
     timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);


module.exports = KomponenPerjadin;
