const express = require("express");
const app = express();
app.use(express.static(__dirname + "/www"));
app.use(express.urlencoded({ extended: true })); // this will parse the req.body instead of manual parse
app.use(express.json());
let http = require("http").Server(app);

app.get("/", function (req, res) {
  let filepath = __dirname + "/www/login.html";
  res.sendFile(filepath);
});

app.get("/account/", function (req, res) {
  let filepath = __dirname + "/www/account.html";
  res.sendFile(filepath);
});

// hard-coded accounts
const accounts = [
  { email: "aj@com.au", password: "123", name: "AJ" },
  { email: "juno@com.au", password: "234", name: "Juno" },
  { email: "momo@com.au", password: "345", name: "Momo" },
];

// accept post requests and check with hard-coded value to output json
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const account = checkAccount(email, password);
  if (account) {
    res.json({ valid: true });
  } else {
    res.json({ valid: false });
  }
});

function checkAccount(email, password) {
  for (const acc of accounts) {
    if (acc.email === email && acc.password === password) {
      return acc;
    }
  }
  return null;
}

app.post("/api/loginForm", function (req, res) {
  // if there is no body in request, return error
  if (!req.body) {
    console.log("error");
    return res.sendStatus(400);
  }

  // get both email and password from request
  const { email, password } = req.body;

  // both field need to be filled
  if (!email || !password) {
    return res.json({ valid: false });
  }

  // match the credentials and response to client
  const account = checkAccount(email, password);

  if (account) {
    res.json({ valid: true, name: account.name, email: account.email });
  } else {
    res.json({ valid: false });
  }
});

let server = http.listen(3000, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log("Server listening on: " + host + " port:" + port);
});
