const express = require("express");
const router = express.Router();
const zod = require("zod");
const { User , Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const {authMiddleware} = require("../middleware");
const nodemailer = require("nodemailer");
require('dotenv').config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: `${process.env.USER_EMAIL}`, // replace with your email
    pass: `${process.env.USER_PASS}`, // replace with your email password or use an app-specific password
  },
});


const signupBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
  
});

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

 
router.post("/signup", async function (req, res) {
  const { success } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken  / incorrect inputs.", 
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });
  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken.",
    });
  }
  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
   
  });

  const userId = user._id;

  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000
})

  const token = jwt.sign({ userId }, JWT_SECRET);

   // Send email to the user
   const mailOptions = {
    from: `${process.env.USER_EMAIL}`, // replace with your email
    to: req.body.username,
    subject: "Welcome to Paytm Dummy",
    text: "Thank you for signing up to Your Website!",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });

  res.json({
    message: "user created succesfullly",
  });
});

router.post("/signin", async function (req, res) {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "incorrect inputs",
    });
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
      },
      JWT_SECRET
    );
    return res.json({
      token: token,
    });

    
  }

  // If the user is not found, return a response and exit the function
  return res.status(411).json({
    message: "error while signin",
  });
});


const updateBody = zod.object({
    password: zod.string().optional(),
    firstName :zod.string().optional(),
    lastName: zod.string().optional()
})

router.put("/",authMiddleware, async function(req,res){
    const {Success} = updateBody.safeParse(req.body);
    if(!Success){
        res.status(411).json({
            message : "Error while updating information."
        })
    }
    await User.updateOne(req.body,{
        id : req.userId
    })
    res.json({
        message:"update successfully"
    })
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })

})
module.exports = router;
