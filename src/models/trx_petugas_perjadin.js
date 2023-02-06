const { Sequelize } = require("sequelize");
const db = require("../config/database");

const { DataTypes } = Sequelize;

const PetugasPerjadin = db.define(
  "PetugasPerjadin",
  {
    id_surat_tugas: {
      type: DataTypes.STRING(15),
      primaryKey: true,
      allowNull: false,
    },
    urut_tugas: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    nip: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    kode_kota_asal: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    kode_kota_tujuan: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    kode_kecamatan_tujuan: {
      type: DataTypes.STRING(8),
      allowNull: true,
    },
    tanggal_pergi: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    tanggal_pulang: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    // ucr: {
    //   type: DataTypes.STRING(100),
    //   allowNull: true,
    // },
    // uch: {
    //   type: DataTypes.STRING(100),
    //   allowNull: true,
    // },
    // udcr: {
    //   type: DataTypes.DATE,
    //   allowNull: true,
    // },
    // udch: {
    //   type: DataTypes.DATE,
    //   allowNull: true,
    // },
  },
  {
    tableName: "trx_petugas_perjadin",
    timestamps: false,
    // createdAt: "udcr",
    // updatedAt: "udch",
  }
);

module.exports = PetugasPerjadin;
