const Theme = require('../models/Theme')
class themeController {
    async getTheme(req, res) {
        try {
            const themes = await Theme.find({})
            if (themes) {
                return res.status(200).json(themes)
            } else {
                return res.status(404).json({ message: "Not found" })
            }
        } catch (err) {
            return res.status(500).json(err)
        }
    }

    async updateStatus(req, res) {
        try {
            const { status } = req.body
            const theme = await Theme.findOne({ name: "chat page" })
            if (theme) {
                theme.status = status
                await theme.save()
                return res.status(200).json(theme)
            } else {
                return res.status(404).json(false)
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    }

    async getChatTheme(req, res) {
        try {
            const theme = await Theme.findOne({ name: "chat page" })
            if (theme) {
                return res.status(200).json(theme)
            } else {
                return res.status(404).json(false)
            }
        } catch (err) {
            return res.status(500).json(err);
        }
    }
}

module.exports = new themeController