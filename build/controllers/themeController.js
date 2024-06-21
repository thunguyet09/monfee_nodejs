const Theme = require('../models/Theme');
class themeController {
  async getTheme(req, res) {
    try {
      const themes = await Theme.find({});
      if (themes) {
        return res.status(200).json(themes);
      } else {
        return res.status(404).json({
          message: "Not found"
        });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  }
}
module.exports = new themeController();