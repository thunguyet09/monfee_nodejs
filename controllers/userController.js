const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var dotenv = require("dotenv");
const nodemailer = require("nodemailer");
dotenv.config();
class userController {
  async getUsers(req, res) {
    try {
      const users = await User.find({});
      if (users) {
        return res.status(200).json(users);
      } else {
        return res.status(404).json({ message: "Not found" });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async getUser(req, res) {
    try {
      const id = req.params.id;
      const user = await User.findOne({ _id: id });
      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(404).json({ message: "Not found" });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async handleRegister(req, res) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const newUser = new User({
        full_name: req.body.full_name,
        email: req.body.email,
        role: "User",
        password: hashedPassword,
        avatar: "avatar.jpg",
        createdDate: req.body.createdDate,
        vouchers: [],
        products_fav: [],
      });
      const existingUser = await User.findOne({ email: req.body.email });
      if (!existingUser) {
        const savedUser = await newUser.save();
        const { password, ...data } = await savedUser.toJSON();
        res.status(200).json({ message: "Đăng ký thành công" });
      } else {
        res.status(404).json({ message: "Email đã tồn tại" });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Lỗi khi đăng ký người dùng mới" });
    }
  }

  async handleLogin(req, res) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      if (!(await bcrypt.compare(req.body.password, user.password))) {
        return res.status(400).json({
          message: "Incorrect password",
        });
      }
      const refreshToken = jwt.sign({ _id: user._id, email: user.email }, "nguyet", {
        expiresIn: "3d",
      });
      const access_token = jwt.sign({ _id: user._id }, "nguyet", {
        expiresIn: "5m",
      });
      user.jwt = access_token;
      res.cookie("_jwt", access_token, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
      });
      await user.save();
      return res
        .status(200)
        .json({
          refresh_token: refreshToken,
          access_token: access_token,
          user_id: user._id,
          role: user.role,
        });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async verifyToken(req, res) {
    const { token } = req.body;

    try {
      const decoded = jwt.verify(token, "nguyet");

      const { userId } = decoded;
      const user = await User.findOne({ _id: userId });

      if (!user && user.role == "Thành viên") {
        return res.json({ isValid: false });
      } else {
        return res.json({ isValid: true });
      }
    } catch (error) {
      return res.json({ isValid: false });
    }
  }

  async verifyUserToken(req, res) {
    const { token } = req.body;
    try {
      const decoded = jwt.verify(token, "nguyet");
      const user = await User.findOne({ _id: decoded._id });
      if (!user || user.role == "Admin") {
        return res.status(404).json({ isValid: false });
      } else {
        return res.status(200).json({ isValid: true });
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async addVouchers(req, res) {
    try {
      const id = req.params.id;
      const { vouchers } = req.body;
      const user = await User.findOne({ _id: id });
      if (user) {
        user.vouchers = vouchers;
        const updated = await user.save();
        return res.status(200).json(updated);
      } else {
        return res.status(404).json({ message: "Not Found" });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async updateOrderInfo(req, res) {
    try {
      const id = req.params.id;
      const user = await User.findOne({ _id: id });
      if (user) {
        user.order_info = req.body.order_info;
        const updated = await user.save();
        return res.status(200).json(updated);
      } else {
        return res.status(404).json({ message: "Not Found" });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async updateUser(req, res) {
    try {
      const id = req.params.id;
      const updated = await User.updateOne({ id: id }, { $set: req.body });
      if (updated) {
        return res.status(200).json(updated);
      } else {
        return res.status(404).json({ message: "Not Found" });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async updateNotice(req, res) {
    try {
      const id = req.params.id;
      const user = await User.findOne({ _id: id });
      if (user) {
        user.emailed = req.body.emailed;
        const updated = await user.save();
        return res.status(200).json(updated);
      } else {
        return res.status(404).json({ message: "Not Found" });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async sendResetPasswordLink(req, res) {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "thnguyet03@gmail.com",
        pass: "dykw zmra kbrb wbta",
      },
    });

    const email = req.body.email;
    let { id } = req.body;

    const token = jwt.sign({ _id: id }, "nguyet", { expiresIn: "1m" });
    let update = {
      token: token,
    };
    await User.findByIdAndUpdate(id, update);
    const mailOptions = {
      from: "thnguyet03@gmail.com",
      to: email,
      subject: "Liên kết đổi mật khẩu",
      text: `Hãy nhấp vào liên kết sau đây: http://localhost:4200/reset-password?token=${token}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res
          .status(500)
          .json({ message: "An error occurred while sending email." });
      } else {
        console.log("Email sent: " + info.response);
        res
          .status(200)
          .json({
            message: "The password reset link has been sent successfully",
          });
      }
    });
  }

  async getUserByToken(req, res) {
    try {
      const token = req.params.token;
      const user = await User.findOne({ token: token });
      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(404).json({ message: "Not found" });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async comparePassword(req, res) {
    try {
      const { id, password } = req.body;
      const user = await User.findOne({ _id: id });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        return res.status(200).json({ message: "Password matches!" });
      } else {
        return res.status(400).json({ message: "Password does not match" });
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  }

  async resetPassword(req, res) {
    try {
      const salt = await bcrypt.genSalt(10);
      const id = req.params.id;
      const { password } = req.body;
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.findOne({ _id: id });
      if (user) {
        user.password = hashedPassword;
        const updated = await user.save();
        return res.status(200).json({ message: "Password is changed successfuly" });
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async removeToken(req, res) {
    try {
      const id = req.params.id;
      const user = await User.findOne({ _id: id });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      user.token = null;
      await user.save();
      return res.status(200).send();
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async generateAccessToken(req, res) {
    const userId = req.body.id;
    return jwt.sign({ _id: userId }, "nguyet", { expiresIn: "1m" });
  }

  async refreshToken(req, res) {
    const refreshToken = req.headers.authorization;

    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token is missing' });
    }

    try {
      const token = refreshToken.split(' ')[1];
      const decoded = jwt.verify(token, 'nguyet');

      if (decoded) {
        console.log(decoded)
        const newAccessToken = jwt.sign({ _id: decoded._id }, "nguyet", { expiresIn: "5m" });
        res.status(200).json(newAccessToken);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async updateAccountInfo(req, res) {
    try {
      const id = req.params.id
      let { full_name, gender, address, avatar } = req.body
      let updateData = {
        full_name: full_name,
        gender: gender,
        address: address,
        avatar: avatar
      }

      const updated = await User.updateOne({ _id: id }, { $set: updateData })
      if (updated) {
        return res.status(200).json(updated)
      } else {
        return res.status(404).json({ message: 'Not Found' })
      }
    } catch (error) {
      return res.status(500).json(error)
    }
  }

  async uploadImg(req,res){
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
  
    res.json({ message: 'File uploaded successfully' });
  }

  async insertNotifications(req, res) {
    try {
      const id = req.params.id;
      const user = await User.findOne({ _id: id });
      if (user) {
        user.notifications = req.body.notifications
        await user.save(); 
        res.status(200).json({ message: 'Notification added successfully' });
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      return res.status(500).json({ message: 'Error occurred', error: error.message });
    }
  }

}

module.exports = new userController();
