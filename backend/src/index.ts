import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import express from "express";
import jwt from "jsonwebtoken";
import mysql from "mysql";
import generateToken from "utils/generateToken";
import validateInput from "utils/validateInput";

const app = express();

const PORT = 4000;
const THIRTY_MINUTES = 30 * 60 * 1000;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "movielink",
});

app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    res.sendStatus(204);
  } else {
    next();
  }
});

const verifyToken = (req, res, next) => {
  const token = req.cookies.user;

  if (!token) {
    return res.status(401).json({ error: null, data: false });
  }

  // Verify the JWT token
  jwt.verify(token, "bazinga", (err, decoded: { fname: string; lname: string; email: string }) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ error: null, data: false });
      }
      return res.status(401).json({ error: null, data: false });
    }
    req.user = decoded;
    next();
  });
};

// Auth endpoint to verify JWT token
app.get("/auth", verifyToken, (req, res) => {
  res.status(200).json({ error: null, data: true });
});

app.post("/signup", async (req, res) => {
  if (!req.body) {
    return res.status(401).json({ error: "Bad input. Missing body.", data: null });
  }

  if (!req.body.fname || !req.body.lname || !req.body.email || !req.body.password) {
    return res.status(401).json({ error: "The form data is malformed.", data: null });
  }

  const { fname, lname, email, password } = req.body;

  const error: string | null = validateInput(req.body);
  if (error) return res.status(400).json({ error, data: null });

  try {
    const hashedPassword: string = await bcrypt.hash(password, 10);

    const query = "INSERT INTO users (fname, lname, email, password) VALUES (?, ?, ?, ?)";
    connection.query(query, [fname, lname, email, hashedPassword], (err) => {
      if (err) {
        console.error("Error inserting into MySQL:", err);
        return res.status(500).json({ error: "Database error inserting the user into the database." });
      }

      const token: string = generateToken({ fname, lname, email });
      console.log("Generated token", token);
      res.cookie("user", token, { httpOnly: true, maxAge: THIRTY_MINUTES });
      res.status(201).json({ error: null, data: "User created successfully" });
    });
  } catch (err) {
    console.error("Error hashing password:", err);
    res.status(500).json({ error: "Internal server error", data: null });
  }
});

app.post("/login", (req, res) => {
  if (!req.body) {
    return res.status(401).json({ error: "Bad input. Missing body.", data: null });
  }

  if (!req.body.email || !req.body.password) {
    return res.status(401).json({ error: "The form data is malformed.", data: null });
  }

  const { email, password } = req.body;

  console.log(req.cookies);
  if (req.cookies && req.cookies.user) {
    return res.status(401).json({ error: "You are already logged in", data: null });
  }

  // Validate input
  const error: string | null = validateInput(req.body);
  if (error !== null) {
    return res.status(400).json({ error: error, data: null });
  }

  // Query the database for the user's email and hashed password
  const query = "SELECT fname, lname, email, password FROM users WHERE email = ?";
  connection.query(query, [email], async (err, results) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.status(500).json({ error: "Database error", data: null });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid email or password", data: null });
    }

    const user = results[0];
    const hashedPassword = user.password;

    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password", data: null });
    }

    const token = generateToken({ fname: user.fname, lname: user.lname, email });

    // Set HTTP-only cookie with JWT
    res.cookie("user", token, { httpOnly: true, maxAge: 30 * 60 * 1000 }); // 30 minutes expiration
    res.status(200).json({ error: null, data: { fname: user.fname, lname: user.lname, email: user.email } });
  });
});

app.get("/logout", (req, res) => {
  res.clearCookie("user");

  res.status(200).json({ error: null, data: true });
});

app.post("/add-friend", (req, res) => {
  if (!req.body) {
    return res.status(401).json({ error: "Bad input. Missing body.", data: null });
  }

  if (!req.body.friendid || !req.body.useremail) {
    return res.status(401).json({ error: "Bad input. Missing user/friend id.", data: null });
  }

  const { useremail, friendid } = req.body;

  const query = "INSERT INTO friends (useremail, friendid) VALUES (?, ?)";
  connection.query(query, [useremail, friendid], (err, results) => {
    if (err) {
      console.error("Error inserting into MySQL:", err);
      return res.status(500).json({ error: "Database error", data: null });
    }

    res.status(201).json({ error: null, data: true });
  });
});

// Endpoint to get user's friends
app.get("/get-friends", (req, res) => {
  if (!req.body) {
    return res.status(401).json({ error: "Bad input. Missing body.", data: null });
  }

  if (!req.body.useremail) {
    return res.status(401).json({ error: "The user email is missing.", data: null });
  }

  const userEmail = req.body.useremail;

  // Query to get user's friends' IDs
  const friendIdsQuery =
    "SELECT friendId FROM friends INNER JOIN users ON friends.userId = users.id WHERE users.email = ?";

  connection.query(friendIdsQuery, [userEmail], (err, friendIdsResults) => {
    if (err) {
      console.error("Error querying friend IDs:", err);
      return res.status(500).json({ error: "Database error", data: null });
    }

    // Extract friend IDs from the results
    const friendIds = friendIdsResults.map((result) => result.friendId);

    if (friendIds.length === 0) {
      return res.status(200).json({ error: null, data: [] });
    }

    // Query to get friend details (fname, lname, email)
    const friendDetailsQuery = "SELECT fname, lname, email FROM users WHERE id IN (?)";
    connection.query(friendDetailsQuery, [friendIds], (err, friendDetailsResults) => {
      if (err) {
        console.error("Error querying friend details:", err);
        return res.status(500).json({ error: null, data: "Database error" });
      }

      res.status(200).json({ error: null, data: friendDetailsResults });
    });
  });
});

app.listen(PORT, () => {
  console.log("Listening on 4000");
});
