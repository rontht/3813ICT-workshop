const express = require("express");
const cors = require("cors");
const app = express();

// parse JSON bodies
app.use(express.json());
app.use(cors());

// User class definition
class User {
  constructor(username, birthdate, age, email, password, valid) {
    this.username = username;
    this.birthdate = birthdate;
    this.age = age;
    this.email = email;
    this.password = password;
    this.valid = valid;
  }
}

// Hard-coded users
const users = [
  new User("AJ", "1990-01-01", 17, "aj@com.au", "123"),
  new User("Juno", "1992-05-12", 25, "juno@com.au", "234"),
  new User("Momo", "1995-09-21", 21, "momo@com.au", "345"),
];

// Single route to handle login
app.post("/api/auth", (req, res) => {
  const { email, password } = req.body;

  // Find a matching user
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    // User matched, set valid = true
    user.valid = true;
    const { username, birthdate, age, email, valid } = user;
    res.json({ username, birthdate, age, email, valid });
  } else {
    // No match, return valid = false
    res.json({ valid: false });
  }
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
