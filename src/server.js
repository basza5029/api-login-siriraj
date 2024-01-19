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

const Login = (req, res) => {
  console.log(req.body.user);
  res.status(200).json({found: true,msg: "Success",userInfo:{UserData:UserData,UserToken:UserToken,siRoles:siRoles}});
};

app.post("/ad/webapi/api/auth1", Login);
