const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();

// require("../DB/conn");
const User = require("../../models/userSchema");

router.get("/", (req, res) => {
  res.send(`Hello, I am Homepage from router`);
});

router.post("/signup", async (req, res) => {
  const { first_name, last_name, email, password, confPassword } = req.body;

  if (!first_name || !last_name || !email || !password || !confPassword) {
    return res.status(422).json({ error: "fill all the details" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email already Exists" });
    } else if (password != confPassword) {
      return res.status(422).json({ error: "Email already Exists" });
    } else {
      const user = new User({
        first_name,
        last_name,
        email,
        password,
        confPassword,
      });

      // bcrypt will work here as a middleware.
      await user.save();

      res.status(201).json({ message: "User registeration is successfull" });
    }
  } catch (err) {
    console.log(err);
  }
});

// login route

router.post("/signin", async (req, res) => {
  // console.log(req.body);
  // res.json({message: "Signin Working"});   ~ for postman

  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const userlogin = await User.findOne({ email: email });

    // console.log(userlogin);

    if (userlogin) {
      const isMatch = await bcrypt.compare(password, userlogin.password);

      token = await userlogin.generateAuthToken();
      console.log(token);

      res.cookie("jwtoken", token, {
        // cookies - doubt
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(400).json({ error: "Invalid Credentials" });
      } else {
        res.json({ message: "User signin Successfull" });
      }
    } else {
      res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
