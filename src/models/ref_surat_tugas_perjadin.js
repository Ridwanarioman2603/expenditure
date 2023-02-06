const { Sequelize } = require("sequelize");
const db = require("../config/database");
const Status = require("./ref_status");
const Skema = require("./ref_skema_perjadin");
const dokumenKirimPanutan = require("./trx_dokumen_kirim_ke_panutan");
const PetugasPerjadinBiaya = require("./trx_petugas_perjadin_biaya");

const { DataTypes } = Sequelize;

const SuratTugasPerjadin = db.define(
  "SuratTugasPerjadin",
  {
    id_surat_tugas: {
      type: DataTypes.STRING(15),
      allowNull: true,
      defaultValue: null,
      primaryKey: true,
    },
    kode_kegiatan_ut_detail: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      primaryKey: true,
    },
    kode_aktivitas_rkatu: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: true,
    },
    kode_rka: {
      type: DataTypes.CHAR(5),
      primaryKey: true,
      allowNull: true,
    },
    kode_periode: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: true,
    },
    akun_bas_rka: {
      type: DataTypes.CHAR(6),
      allowNull: true,
    },
    akun_bas_realisasi: {
      type: DataTypes.CHAR(6),
      allowNull: true,
    },
    akun_bas_final: {
      type: DataTypes.CHAR(6),
      allowNull: true,
    },
    nomor_surat_tugas: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    tanggal_surat_tugas: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    tahun: {
      type: DataTypes.STRING(4),
      allowNull: true,
      primaryKey: true,
    },
    request_nomor_surat_ke: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      primaryKey: true,
    },
    kode_skema: {
      type: DataTypes.INTEGER(2),
      allowNull: true,
    },
    kode_unit: {
      type: DataTypes.CHAR(25),
      allowNull: true,
    },
    kode_sub_unit: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    kode_status: {
      type: DataTypes.INTEGER(2),
      allowNull: true,
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
    tableName: "ref_surat_tugas_perjadin",
    createdAt: "udcr",
    updatedAt: "udch",
  }
);

// Status.hasMany(SuratTugasPerjadin, { foreignKey: "kode_status", as: "status" });
// Skema.hasMany(SuratTugasPerjadin,{foreignKey:"kode_skema", as:"skema"});


SuratTugasPerjadin.belongsTo(Status, {
  foreignKey: "kode_status",
  as: "status",
});
SuratTugasPerjadin.belongsTo(Skema,{foreignKey:"kode_skema", as:"skema"});
SuratTugasPerjadin.hasMany(dokumenKirimPanutan,{foreignKey:"id_surat_tugas", as:"dokumen"})



PetugasPerjadinBiaya.belongsTo(SuratTugasPerjadin,{ foreignKey:"id_surat_tugas", as:"surat"});

SuratTugasPerjadin.hasMany(PetugasPerjadinBiaya,{ foreignKey:"id_surat_tugas", as:"hsurat"});


module.exports = SuratTugasPerjadin;
