# react-study
## 남부_월수금토_스터디 📚

### 4차) 241107 목 점심
📘 백엔드 레이어드아키텍쳐   

## ch06_02 api.js 코드보기

<details>
<summary>접기/펼치기</summary>


# ch06_02 api.js 코드를 보며 진행됨

const express = require("express");
const fs = require("fs");
var moment = require("moment");
const sqlite3 = require("sqlite3");
const path = require("path");

// database setting부분임 
// dao로 빠지는 게 이 부분임. 디비설정이 컨피그로빠짐
const db_name = path.join(__dirname, "post.db");

///데이터베이스 생성
const db = new sqlite3.Database(db_name); 
//


var app = express();
const PORT = 3000;

//app.use에 들어가는 게 미들웨어. 데이터를 주고받을 때 중간에서 도움 주는 것. 미들웨어 사용하겠다.
app.use(express.json());

//
const create_sql = `
    CREATE TABLE if not exists posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        title VARCHAR(255), 
        content TEXT, 
        writer TEXT,
        write_date TEXT,
        count integer default 0
    )`;

    //app.js에 들어갈 내용
db.serialize(() => {
  db.run(create_sql);
});

app.get("/posts", (req, res) => {
  let p = req.query.page;

  const page = req.query.page ? parseInt(req.query.page) : 1;
  const limit = 5;
  const offset = (page - 1) * limit;

  let sql = `select id, title, content, writer, write_date 
        from posts ORDER BY write_date DESC LIMIT ? OFFSET ? `;

  db.all(sql, [limit, offset], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    } else {
      db.get(`SELECT COUNT(*) as count FROM posts`, (err, row) => {
        if (err) {
          console.error(err);
          res.status(500).send("Internal Server Error");
        } else {
          // 이 sql문이 dao로 빠지는 것. 디비와 가장 가깝게 처리하는게 dao로 들어가는 코드.
          const total = row.count;
          //이렇게 토탈을 리미트로 나누듯이
          //받아온 데이터를 처리해주는 게 service코드에서 하는 것. 받아온 데이터를 좀 재가공하는 역할이 서비스에서 함.
          const totalPages = Math.ceil(total / limit);
          res.json({ items: rows, currentPage: page, totalPages });
        }
      });
    }
  });
});

// 컨트롤러는 req로 받아와서 res로 넘기는 역할을 수행. 컨트롤러에서 req, res가 필수.
// 컨트롤러에서 바디, 파람스 등등 받아오는 걸 처리 // 하고 다시 res로 프론트로 넘겨주는 걸 하는 역할.
// req,res성공실패 표시. 컨트롤러에서.

app.get("/posts/:id", (req, res) => {
  const id = req.params.id;

  let sql = `select id, title, content, writer, write_date, count from posts where id = ${id}`;
  console.log(`id => ${id}, sql => ${sql}`);
  let detail = {};
  db.run(`update board set count = count + 1 where id = ${id}`, (err) => {});
  db.all(sql, [], (err, rows) => {
    // 6. run query
    if (err) {
      console.error(err.message);
    }
    // console.log(rows);
    rows.forEach((row) => {
      detail = row;
    });
    console.log(detail);
    res.json({ item: detail }); // 8. render page with data
  });
});

// router에 들어가는 게 이 부분.
//req, res가 컨트롤러에서 받아지는 함수의 기본적인 매개변수가 되는 것. 이것은 고정적인 것.
app.post("/posts", (req, res) => {
  //이 부분은 컨트롤러에서 실행됨
  console.log("/write post", req.body);

  const write_date = moment().format("YYYY-MM-DD");

  //dao로 빠짐. model이라고 부르기도함. 디비를 직접 조작하는 부분.
  let sql = `insert into posts(title, content, writer, write_date) 
        values('${req.body.title}', '${req.body.content}', 'tester', '${write_date}')`;
  db.run(sql, (err) => {
    if (err) {
      console.error(err);
    }
    console.log(`A row has been inserted with rowid ${this.lastID}`);
    //res,req는 컨트롤러에서 처리
    res.redirect("/posts");
  });
});

app.put("/posts/:id", (req, res) => {
  const id = req.params.id;

  let sql = `update posts set title = '${req.body.title}', content = '${req.body.content}' where id = ${id}`;
  db.run(sql, (err) => {
    if (err) {
      console.error(err);
    }
    console.log(`A row has been updated with rowid ${this.lastID}`);
    res.redirect("/list");
  });
});

app.delete("/posts/:id", (req, res) => {
  const id = req.params.id;

  let sql = `delete from posts where id = ${id}`;
  db.run(sql, (err) => {
    if (err) {
      console.error(err);
    }
    console.log(`A row has been deleted with rowid ${this.lastID}`);
    res.redirect("/list");
  });
});

//서버키는 것
app.listen(PORT);
console.log("Server is listening on port 3000");

</details>





### 3차) 241106 수
📗 리액트 children

페이지마다 동일하게 반복되는 헤더, 푸터와 같은 레이아웃은 그대로 유지하고,
변하는 본문 부분만 children을 이용하여 다르게 보여주는 방식.

리액트 수업시간에 form-test 폴더에서 • Card.jsx / • CardList.jsx 에서 코딩한 내용임. 카드의 배경색, borderRadius 같은 카드의 틀은 반복해서 유지되고, 카드마다의 내용은 제각각으로 표현가능.   
  • Card.jsx 에서 카드틀의 스타일을 코딩함.   
  • CardList.jsx 에서 각 카드의 내부 내용을 코딩함. CardList에서 `<Card></Card>` 태그 안에 내용을 작성했기 때문에 CardList의 `<Card></Card>` 안의 내용이 children안에 들어가고, Card에서 정한 카드 틀안에 각각의 내용들이 들어간 모습으로 보여짐. 

숙제) useState, useEffect 언제 사용하고, 왜 사용하는 지 공부해오기   
계획) 아침이나 점심시간에 추가 스터디 진행할 예정

---
### 2차) 241104 월
📗리액트 props

프롭스는 리액트에서 데이터를 전달하기 위하여 사용하는 방법.
부모 컴포넌트가 자식컴포넌트로 데이터를 전달할 때 프롭스를 통하여 전달함. 부모에서 자식으로만 전달가능. 
읽기전용이기 때문에 자식컴포넌트에서는 값 변경 불가. 값을 변경해야한다면 부모컴포넌트에서 새로운 값을 전달해주어야 함.

숙제) 깃허브 계정만들고 react-study 레포지토리 주소 디스코드에 올리기

---
### 1차) 241103 일
📘 백엔드 전반적인 개요
express
