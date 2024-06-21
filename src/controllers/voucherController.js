const Voucher = require('../models/Voucher')
class voucherController {
    async getAllVouchers(req,res){
        try{
            const vouchers = await Voucher.find({})
            if(vouchers){
                return res.status(200).json(vouchers)
            }else{
                return res.status(404).json({message: "Not found"})
            }
        }catch(err){
            return res.status(500).json(err)
        }
    }

    async getChosedVoucher(req,res){
        try{
            const voucher = await Voucher.findOne({choose: 1})
            if(voucher){
                return res.status(200).json(voucher)
            }else{
                return res.status(404).json({message: "Not found"})
            }
        }catch(err){
            return res.status(500).json(err)
        }
    }

    async updateQuantityVoucher(req,res){
        try {
            const id = req.params.id 
            const voucher = await Voucher.findOne({id: id})
            if(voucher){
                voucher.quantity = req.body.quantity
                const updated = await voucher.save()
                return res.status(200).json(updated)
            }else{
                return res.status(404).json({message: "Not found"})
            }
        }catch(err){

        }
    }

    async getDetailVoucher(req,res){
        const id = req.params.id 
        try{
            const voucher = await Voucher.findOne({id: id})
            if(voucher){
                return res.status(200).json(voucher)
            }else{
                return res.status(404).json({message: "Not found"})
            }
        }catch(err){
            return res.status(500).json(err)
        }
    }
}

module.exports = new voucherController