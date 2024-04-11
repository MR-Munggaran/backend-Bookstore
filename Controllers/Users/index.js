const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const allData = async (req, res) => {
    try {
      const users = await User.find({});
      return res.status(200).json({
        count: users.length,
        message: "Succesfully Get a Data",
        data: users,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  }

const signUp = async (req, res) => {
    try {
      if (
        !req.body.name ||
        !req.body.username ||
        !req.body.email ||
        !req.body.password
      ) {
        res.status(400).send({
          message: "Send all required fields",
        });
      } else {
        const Salt = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, Salt);
        console.log("Successfully Hashing Password");
        const user = {
          name: req.body.name,
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
          token: null,
        };
        const newUser = await User.create(user);
        return res.status(200).send(newUser);
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  }

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).send({
          message: "Send all required fields",
        });
      } else {
        // Cari pengguna berdasarkan email
        const user = await User.findOne({ email: email });
        if (!user) {
          return res.status(400).send({ message: "User not found" });
        }
  
        // Memeriksa apakah password yang dimasukkan cocok dengan password yang disimpan di database
        const validatePassword = await bcrypt.compare(password, user.password);
        if (!validatePassword) {
          return res.status(400).send({ message: "Incorrect password" });
        }
        let token;
        token = jwt.sign(
          {
            email: user.email,
            password: user.password,
          },
          process.env.SECRET_KEY
        );
  
        user.token = token;
        await user.save();
  
        res.status(201).json({
          success: true,
          data: {
            email: user.email,
            password: user.password,
            token: token,
          },
        });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  }

const deleteUser = async (req, res) => {
    try {
      const id = req.params.id;
      const result = await User.findOneAndDelete({ _id: id });
      if (!result) {
        res.status(404).json({
          message: "User not found",
        });
      }
      return res.status(200).send({ message: "Users deleted successfully" });
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: error.message });
    }
  }

const logOut = async (req, res) => {
    try {
        const userId = req.params.id;
    
        // Cari pengguna berdasarkan id
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).send({ message: "User not found" });
        }
        if(user.token === null ){
            return res.status(404).send({message: "Token is Not Found"})
        }else{
            // Hapus token dari entitas pengguna
            user.token = null;
            await user.save();
        }
    
        res.status(200).send({ message: "Logout successful" });
      } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
      }
}

// Khusus Middleware
const portalGate = async (req, res, next) => {
  try {
      // Mendapatkan token dari header permintaan
      const token = req.headers.authorization;
      
      // Jika token tidak ada
      if (!token) {
          return res.status(401).send({ message: "Token not provided or Unauthorized" });
      }

      const tokenWithoutBearer = token.split(" ")[1];

      // Verifikasi token
      const decoded = jwt.verify(tokenWithoutBearer, process.env.SECRET_KEY);
      console.log(decoded)
      // Cari pengguna berdasarkan email yang ada dalam token
      const user = await User.findOne({ email: decoded.email });

      // Jika pengguna tidak ditemukan
      if (!user) {
          return res.status(404).send({ message: "User not found" });
      }

      // Menambahkan objek pengguna ke dalam objek req untuk digunakan pada middleware selanjutnya
      req.user = user;

      // Lanjut ke middleware atau handler selanjutnya
      next();
  } catch (error) {
      console.log(error.message);
      res.status(500).send({ message: "Internal Server Error" });
  }
};
module.exports = {allData, signUp, login, deleteUser, logOut, portalGate}