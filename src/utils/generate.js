const hostProdevPanutannew = process.env.hostProdevPanutannew
const generateNomor = (nomor,panjang,variabelDepan) =>{
    return nomor.padStart(panjang,variabelDepan)
}
const linkfilepanutan = (tahun,id,dokumen) =>{
    return `${hostProdevPanutannew}/archive_external/${tahun}/E-Expenditure/${id}/${dokumen}`
}

module.exports = {
    generateNomor,
    linkfilepanutan
}