const express = require("express");
const cors = require("cors");
const http = require("http");

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const port = 3333;
server.listen(port, () => console.log("Start server in port " + port));


const userInfo = {

    siRoles: null,
}

const siRoles = null;

const UserToken = {
    token: "F2CC1E2903C34C3CA52D20EFFF8B6891",
    token_expire_date: "09/01/2020 00:00:00",
}

const UserData ={
    sapid: "T10030669",
    username: "tkulpaporn.noi",
    full_name: "น.ส. กุลภาภร น้อยโนนทอง",
    position: "",
    office: "งานบริการสารสนเทศและฝึกอบรม",
    department: "ฝ่ายสารสนเทศ",
    passwordExpiredDate: "01/01/1970 00:00:00",
    daysLeft: 0,
    passwordNeverExpire: true,
    eng_name: "Miss TKULPAPORN NOINONTHONG",
    email: "",
    sn: "NOINONTHONG",
    givenName: "KULPAPORN",
    ipPhone: "",
    pager: "",
  }

  
const {Pool} = require("pg");
const pool  = new Pool({
    user:"root",
    host:"dpg-cmboofv109ks73adkjmg-a.singapore-postgres.render.com",
    password:"YVINDPHCEmNLIunRvC0s2OJiOrukNwED",
    database:"basdb",
    port:5432,
    ssl: true
});

pool.connect(
  (err)=>{ 
  if (err) throw err; console.log("connect");
})

const Login = async(req, res) => {
  const {name} = req.body.user;
  const query = `SELECT * FROM "AD_Siriraj" WHERE username = '${name}'`;
  console.log(query);
  await pool.query(query)
  .then((data)=>{
    res.status(200).json({found: true,msg: "Success",userInfo:{UserData:data.rows[0],UserToken:UserToken,siRoles:siRoles}});
  })
  .catch((err)=>{
      res.status(400).json({status:"ERROR",message:err})
  });

};

app.post("/ad/webapi/api/auth1", Login);
