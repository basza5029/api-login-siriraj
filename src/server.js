const express = require("express");
const cors = require("cors");
const http = require("http");
const dotenv = require('dotenv');

dotenv.config();
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const port = process.env.PORT;
server.listen(port, () => console.log("Start server in port " + port));


const userInfo = {

    siRoles: null,
}

const siRoles = null;

const UserToken = {
    token: "F2CC1E2903C34C3CA52D20EFFF8B6891",
    token_expire_date: "09/01/2020 00:00:00",
}

// const UserData ={
//     sapid: "T10030669",
//     username: "tkulpaporn.noi",
//     full_name: "น.ส. กุลภาภร น้อยโนนทอง",
//     position: "",
//     office: "งานบริการสารสนเทศและฝึกอบรม",
//     department: "ฝ่ายสารสนเทศ",
//     passwordExpiredDate: "01/01/1970 00:00:00",
//     daysLeft: 0,
//     passwordNeverExpire: true,
//     eng_name: "Miss TKULPAPORN NOINONTHONG",
//     email: "",
//     sn: "NOINONTHONG",
//     givenName: "KULPAPORN",
//     ipPhone: "",
//     pager: "",
//   }

  
const {Pool} = require("pg");
const pool  = new Pool({
    user:process.env.DB_USER,
    host:process.env.DB_HOST,
    password:process.env.DB_PWD,
    database:process.env.DB_NAME,
    port:process.env.DB_PORT,
    ssl: true
});

pool.connect(
  (err)=>{ 
  if (err) throw err; console.log("connect");
})

const Login = async(req, res) => {
  try{
    const {name} = req.body.user;
    const query = `SELECT * FROM "AD_Siriraj" WHERE username = '${name}'`;
    console.log(query);
    await pool.query(query)
    .then((data)=>{
      if (data.rows[0]){
        res.status(200).json({found: true,msg: "Success",userInfo:{UserData:data.rows[0],UserToken:UserToken,siRoles:siRoles}});
      }else{
        res.status(200).json({found: false,msg: "error",userInfo:null});
      }
   
    })
    .catch((err)=>{
        res.status(400).json({status:"ERROR",message:err})
    });
  }catch(err){
    res.status(400).json({status:"ERROR",message:err})
  }
};

app.post("/ad/webapi/api/auth1", Login);
