const generateKode1 = (kode) => {
    let kode_gen = "0";

        if(kode !== null) {
            kode_gen = kode;
        }

        let kode1 = parseInt(kode_gen);

        if(kode1 > 0 ){
            kode1 = parseInt(kode1) + 1 ;
            kode_hasil = kode1.toString()
          } else {
            kode_hasil = parseInt(kode_gen) + 1
          }
      
          if(kode1 === 0) {
            kode1 = parseInt(kode1) + 1;
            kode_hasil = kode1.toString()
          } else {
            kode_hasil = kode1.toString();
          }

          return kode_hasil
}

