const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Sinus = mongoose.model('Sins');
const moment = require('moment')
require('moment/locale/id')
moment.locale('id')

router.get('/', async (req,res, next) => {
    try {
        var sins = new Sinus();
        const lastData = await Sinus.find().sort({'nomor_surat': -1}).limit(1)
        res.render("sins/addOrEdit", {
            viewTitle : "Tambah Nomor Surat",
            sins: {
                nomor_surat: lastData[0].nomor_surat + 1
            },
            moment: moment
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
    
router.get('/list', (req, res) => { 
    Sinus.find((err, docs) => {
        let payload = []
        docs.map(item => {
            const { _id, nomor_surat, alamat_penerima, tanggal, perihal, __v } = item
            const onePayload = {
                _id, 
                nomor_surat, 
                alamat_penerima, 
                tanggal: moment(tanggal).format('llll'), 
                perihal, 
                __v
            }
            payload.push(onePayload)
        })
            if (!err) {
                res.render("sins/list", {
                    list: payload
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