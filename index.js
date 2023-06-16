const express = require('express')
const app = express();
const port = 3000;
app.use(express.static('public'))
const mysql      = require('mysql'); //mysql 플러그인 실행
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'jhsong1376!',
  database : 'test'
}); //MYSQL 설정잡아주기

connection.connect();
//클라이언트에서HTTP 요청 메소드 중 Get 을 이용해서 'HOST:PORT'로 요청을 보내면 실행된다 한송아 정친차려라

app.get('/',(req,res) => {
  res.send('우리는 1921 팀이에요! 멋지죠?');
});

//app.listen() 함수를 사용해서 서버를 실행하는거라고 지선아
app.listen(port,() => {
  console.log('서버 온!!!!!!!!')
});

app.get('/main',(req,res) => { // index.html로 이동 재은아 집가니까 좋니?
  res.sendFile(__dirname + "/Main/index.html")
})

app.get('/auth/login',(req,res) => { //login.html 로 이동
  console.log('저는 바보죠! 조한송 후후^^ ')
  res.sendFile(__dirname + "/Main/login.html")
})

app.get('/auth/register',(req,res) => { // signUp.html 로 이동
  console.log('저 너무 잠와요ㅠㅠㅠㅠㅠ 나는 신재은 그래놓고 잠안와요 잠안와요 찡얼~찡얼')
  res.sendFile(__dirname + "/Main/signUp.html")
})

app.get('/users/:answer', (req, res) => {//'/users'url 로 들어오면 전체회원 조회
  var answer = req.params.answer;
  
  console.log(answer);
  if (answer.includes('저는바보입니다')){
    connection.query('SELECT * from usertable', (error, rows) => {
      if (error) throw error;
      console.log('User info is: ', rows);
      res.send(rows);
    });
  }else{
    res.writeHead(200,{'Content-Type': 'text/html;charset=UTF-8'})
    res.write("<script charset=utf-8>alert('재은아 정답아니다 정신차리자')</script>");
  }
  // connection.end();
})

app.get('/signIn',(req,res) =>{//'/signIn'url 로 들어오면 회원가입 쿼리를 실행
 
    // connection.connect();
    connection.query('insert into usertable (username,password,email) values(?,?,?);',
    ['신재은', '조한송', '여지선'],
    (error,rows,field) => {
      if(error) throw error;
       console.log('complete',rows);
    });
    // connection.end();
})

