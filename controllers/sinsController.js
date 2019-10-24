const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Sinus = mongoose.model('Sins');

//var sains = new Sinus();



router.get('/', async (req,res, next) => {
    try {
        var sins = new Sinus();
        const lastData = await Sinus.find().sort({'nomor_surat': -1}).limit(1)
        res.render("sins/addOrEdit", {
            viewTitle : "Tambah Nomor Surat",
            sins: {
                nomor_surat: lastData[0].nomor_surat + 1
            }
        });
    } catch (error) {
        return next(error)
    }
});

router.post('/', async (req, res, next) => {
    if(req.body._id == ''){
    try {
        const lastData = await Sinus.find().sort({'nomor_surat': -1}).limit(1)
        const {
            nomor_surat,
            alamat_penerima,
            tanggal,
            perihal
        } = req.body
        
        const ref = await Sinus.create({
            nomor_surat,
            alamat_penerima,
            tanggal,
            perihal
        }, 
        function (err, doc) {
            res.redirect('sins/list');
        });
    } catch (error) {
        return next(error)
    }}
});

router.get('/edit/:id', async (req, res, next) => {
    try {
        const oneData = await Sinus.findOne({_id: req.params.id})
        res.render("sins/Edit",{
            viewTitle: "Tambah Nomor Surat",
            sins: {
                nomor_surat: oneData.nomor_surat,
                alamat_penerima: oneData.alamat_penerima,
                tanggal: oneData.tanggal,
                perihal: oneData.perihal
            }
        });
    } catch (error) {
        return next(error)
    }
})


router.post('/edit', async (req, res, next) => {
    try {
        const { 
            nomor_surat,
            alamat_penerima,
            tanggal,
            perihal
        } = req.body

        const ref = await Sinus.updateOne({ nomor_surat }, { $set: { alamat_penerima, tanggal, perihal } })
        res.redirect('/sins/list')
    } catch(error) {
        return next(error)
    }
})

// function updateRecord(req,res){
//     Sinus.findOneAndUpdate({ _id: req.body._id}, req.body, { new: true }, (err, doc) => {
//         if(!err) { res.redirect('sins/list'); }
//         else {
//             if(err.name == 'ValidationError') {
//                 handleValidationError(err, req.body);
//                 res.render("sins/addOrEdit", {
//                     viewTitle: 'Edit Data',
//                     sins: req.body
//                 });
//             }
//             else {
//                 console.log('Error during record update: ' + err);
//             }
//         }
//     });
// }

router.get('/list', (req, res) => { 
    Sinus.find((err, docs) => {
        if (!err) {
            res.render("sins/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving sins list: '+ err)
        }
    })
}); 

router.get('/print', (req, res) => {
    Sinus.find((err, docs) => {
        if (!err) {
            res.render("sins/print", {
                list: docs
            });
        }else {
            console.log('Error in print : ' + err);
        }
    });
});


router.get('/:id',(req,res) => {
    Sinus.findById(req.param.id, (err, doc) => {
        if(!err) {
            res.render("sins/addOrEdit", {
                viewTitle: "Perbarui Data",
                sins: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Sinus.findByIdAndRemove(req.params.id, (err, doc) => {
        if(!err) {
            res.redirect('/sins/list');
        }
        else {
            console.log('Error in sins delete: ' + err);
        }
    });
});

module.exports = router;