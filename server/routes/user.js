   import express from 'express'
   import bcrypt from 'bcrypt'

   const router = express.Router();
   import { User } from '../models/User.js';
   import jwt from 'jsonwebtoken';
   import nodemailer from "nodemailer"

   // ================= Creating an Account ===============
   router.post('/signup', async (req, res) => {

      const { username, email, password } = req.body;
      const user = await User.findOne({ email })

      if (user) {
         return res.json({ message: "user already existed" })
      }

      const hashpassword = await bcrypt.hash(password, 10)
      const newUser = new User({
         username, email, password: hashpassword,
      })

      await newUser.save()
      return res.json({ status: true, message: "record registered" })
   })
   // ================= Creating an Account ===============

   // ================= Login =============================
   router.post('/login', async (req, res) => {
      const { email, password } = req.body;
      const user = await User.findOne({ email })

      console.log(user)

      if (!user) {
         return res.json({ message: "user is not registered" })
      }

      const validPassword = await bcrypt.compare(password, user.password)

      if (!validPassword) {
         return res.json({ message: "password in incorrect" })
      }

      const token = jwt.sign({
         username: user.username,
      }, process.env.KEY, { expiresIn: '5m' })

      res.cookie('token', token, { httpOnly: true, maxAge: 360000 })

      return res.json({ status: true, message: "Login successfully" })
   })
   // ================= Login =============================


   // ================= Forgot Password =============================
   router.post('forgot-password', async (req, res) => {
      const { email } = req.body;

      try {
         const user = await User.findOne({ email })
         if (!user) {
            return res.json({ message: "User not existed ever" })
         }

         const token = jwt.sign({ id: user._id,
         }, process.env.KEY, { expiresIn: '5m' })

         var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
               user: 'heelme1181@gmail.com',
               pass: 'kaju tmzm pcjg mqtu'
            }
         });

         var mailOptions = {
            from: 'heelme1181@gmail.com',
            to: email,
            subject: 'Reset password',
            text: `http://localhost:5173/resetPassword/${token}`
         };

         transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
               console.log("suc")
               return res.json({ message: "error sending email" })
            } else { 
               return res.json({ status: true, message: "email sent " })
            }

         });
      } catch (err) {
         console.log(err)
      }
   })
   // ================= Forgot Password =============================


   // ================= Reset Password =============================
   router.post('/reset-password/:token', async (req, res)=>{
      const {token} = req.params;
      const {password} = req.body;

      try {  
         const decoded = await jwt.verify(token, process.env.KEY);
         const id = decoded.id;
         const hashpassword = await bcrypt.hash(password, 10);
         await User.findByIdAndUpdate({ _id:id }, { password: hashpassword })
         return res.json({ status: true, message: "Updated Successfully" })
      }
      catch(err){
         return res.json(`${token} not match with ${process.env.KEY}`)
      }
   })
   // ================= Reset Password =============================
   
   const verifyUser = ( req, res, next) =>{
      const token = req.cookies.token;
      try{
      if(!token){
         return res.json({ status : false, message: "no token" })
         } 
         const decoded = jwt.verify(token, process.env.KEY)
         next()
      } 
      catch(err){
      return res.json(err)
      }
   }

   // ================= Verify ( PROTECTED ROUTES ) =============================
   router.get('/verify', verifyUser, (req, res)=>{
      return res.json({ status: true, message: "Authorized" })
   })
   // ================= Verify ( PROTECTED ROUTES ) =============================


   // ================= LogOut =============================
   router.get('/logout',(req, res)=>{
      res.clearCookie('token')
      return res.json({ status: true })
   })
   // ================= LogOut =============================




   export { router as UserRouter }