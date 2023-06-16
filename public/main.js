const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const FileStore = require('session-file-store')(session)

var authRouter = require('./auth');
var authCheck = require('./authcheck.js');
// var template = require('./template.js');
var fs =require('fs');
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
  secret: '~~~',	// 원하는 문자 입력
  resave: false,
  saveUninitialized: true,
  store:new FileStore(),
}))

app.get('/', (req, res) => {
  if (!authCheck.isOwner(req, res)) {  // 로그인 안되어있으면 로그인 페이지로 이동시킴
    // res.redirect('/auth/login');
    res.redirect('/login')
    return false;
  } else {                                      // 로그인 되어있으면 메인 페이지로 이동시킴
    res.redirect('/main');
    return false;
  }
})

app.get('/login', (req, res) => {
  res.redirect('login.html')
})

// 인증 라우터
app.use('/auth', authRouter);

// 메인 페이지
app.get('/main', (req, res) => {
  if (!authCheck.isOwner(req, res)) {  // 로그인 안되어있으면 로그인 페이지로 이동시킴
    res.redirect('/auth/login');
    return false;
  }
  //메인페이지 디자인 해야함
  var html = template.HTML('Welcome',
    `<hr>
        <h2><a href="http://192.168.0.101:5500/login_main.html"></h2>
        <p>로그인에 성공하셨습니다.</p>`,
    authCheck.statusUI(req, res)
  );
  res.send(html);
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})