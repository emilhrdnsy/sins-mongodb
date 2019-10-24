const mongoose = require('mongoose');

var sinsSchema = new mongoose.Schema({
    nomor_surat: {
        type: Number,
        required: 'Field harus diisi.'
    },
    alamat_penerima: {
        type: String
    },
    tanggal: {
        type: Date
    },
    perihal: {
        type: String
    }
});

mongoose.model('Sins', sinsSchema);