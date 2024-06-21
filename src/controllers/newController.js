const News = require('../models/News')
class newController {
    async getNewsApproved(req,res){
        try {
            const news = await News.find({approved: 1})
            if(news){
                return res.status(200).json(news)
            }else{
                return res.status(404).json({message: "Not found"})
            }
        }catch(err){
            return res.status(500).json(err)
        }
    }
}

module.exports = new newController