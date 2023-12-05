const express = require("express");
const sql = require("sqlite3").verbose();
const cors = require("cors");
const fs = require('fs');
const path = require('path');
const articlesFolder = path.join(__dirname, 'articles');

const app = express();

app.use(express.json());
app.use(cors());

const db = new sql.Database("./Blog.db");

db.serialize(() =>{
    db.run(`
        CREATE TABLE IF NOT EXISTS users(
                                            id INTEGER PRIMARY KEY AUTOINCREMENT,
                                            name TEXT,
                                            email TEXT,
                                            password TEXT
        );
    `);
    db.run(`
        CREATE TABLE IF NOT EXISTS articles(
                                               id INTEGER PRIMARY KEY AUTOINCREMENT,
                                               date DATE,
                                               title TEXT,
                                               path TEXT
        );
    `);
    db.run(`
        CREATE TABLE IF NOT EXISTS comments(
                                               id INTEGER PRIMARY KEY AUTOINCREMENT,
                                               user_id INTEGER,
                                               article_id INTEGER,
                                               content TEXT,
                                               FOREIGN KEY(user_id) REFERENCES users(id),
                                               FOREIGN KEY(article_id) REFERENCES articles(id)
        );
    `);
    db.run(`
        CREATE TABLE IF NOT EXISTS tags(
                                           id INTEGER PRIMARY KEY AUTOINCREMENT,
                                           name TEXT
        );
    `);
    db.run(`
        CREATE TABLE IF NOT EXISTS article_tags(
                                                   article_id INTEGER,
                                                   tag_id INTEGER,
                                                   FOREIGN KEY(article_id) REFERENCES articles(id),
                                                   FOREIGN KEY(tag_id) REFERENCES tags(id)
        );
    `);
});

app.post("/register", (req,res) => {

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    db.run(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, password],
        (err) => {
            if (err) {
                console.log(err);
                res.status(500).send({ message: "Error registering user" });
            } else {
                res.status(200).send({ message: "User registered successfully" });
            }
        }
    );
})

app.post("/login", (req ,res) =>{
    const email = req.body.email;
    const password = req.body.password;

    db.run("SELECT id FROM users Where email = ? AND password = ?", [email, password],
        (err, result) => {
            if (err){
                res.status(500).send({err: err});
            }
            if (result) {
                res.status(200).send(result)
            } else {
                res.status(401).send({message: "Wrong email or password!"});
            }
        });
});

app.get("/", (req, res) => {
    const { q } = req.query;

    const keys = ["first_name", "last_name", "email"];

    const search = (data) => {
        return data.filter((item) =>
            keys.some((key) => item[key].toLowerCase().includes(q))
        );
    };

    q ? res.json(search(Users).slice(0, 10)) : res.json(Users.slice(0, 10));
});

app.get("/search", (req, res) => {
    const { q } = req.query;
    const query = `%${q}%`;

    db.all("SELECT * FROM articles WHERE title LIKE ?", [query], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        res.json({ data: rows });
    });
});

app.get("/articles", (req, res) => {
    db.all("SELECT title, date FROM articles ORDER BY date DESC", (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        res.json({ data: rows });
    });
});



app.get("/TagList", (req, res) => {
    db.get("SELECT * FROM tags", (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        res.json({ data: row });
    });
});

app.get("/articles/:title/comments", (req, res) => {
    const { id } = req.params;

    db.all(
        "SELECT * FROM comments WHERE title = ? ORDER BY id DESC",
        [id],
        (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }

            res.json({ data: rows });
        }
    );
});


app.get("/comments/:user_id", (req, res) => {
    const { user_id } = req.params;

    db.all(
        "SELECT * FROM comments WHERE user_id = ? ORDER BY id DESC",
        [user_id],
        (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }

            res.json({ data: rows });
        }
    );

});


app.get('/articles/:title', (req, res) => {
    const requestedTitle = req.params.title;
    const filePath = path.join(articlesFolder, `${requestedTitle}.txt`);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(404).send('Article not found');
        } else {
            res.send(data);
        }
    });
});



app.listen(3001, () => {
    console.log("running server on 3001");
})