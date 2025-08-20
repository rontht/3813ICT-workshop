const express = require("express");
const app = express();

// parse JSON bodies
app.use(express.json());

// User class definition
class User {
  constructor(username, birthdate, age, email, password) {
    this.username = username;
    this.birthdate = birthdate;
    this.age = age;
    this.email = email;
    this.password = password;
    this.valid = false; // default to false
  }
}

// Hard-coded users
const users = [
  new User("AJ", "1990-01-01", 33, "aj@com.au", "123"),
  new User("Juno", "1992-05-12", 31, "juno@com.au", "234"),
  new User("Momo", "1995-09-21", 28, "momo@com.au", "345"),
];

// Single route to handle login
app.post("/api/auth", (req, res) => {
  const { email, password } = req.body;

  // Find a matching user
  const user = users.find(u => u.email === email && u.password === password);

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
