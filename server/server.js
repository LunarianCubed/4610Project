const express = require("express");
const sql = require("sqlite3").verbose();
const cors = require("cors");
const fs = require('fs');
const path = require('path');
const articlesFolder = path.join(__dirname, 'articles');
const interval = 1000 * 60 * 60 * 24;

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

    db.run("SELECT id, email, name FROM users Where email = ? AND password = ?", [email, password],
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


const checkAndAddArticles = () => {
    const articlesFolder = path.join(__dirname, 'articles');

    fs.readdir(articlesFolder, (err, files) => {
        if (err) {
            console.error('Error reading articles folder: ', err);
            return;
        }

        files.forEach((file) => {
            const filePath = path.join(articlesFolder, file);
            const stats = fs.statSync(filePath);
            const title = path.parse(file).name;

            db.get('SELECT COUNT(*) AS count FROM articles WHERE title = ?', [title], (err, row) => {
                if (err) {
                    console.error('Error checking existing article:', err);
                } else {
                    const count = row.count;
                    if (count === 0) {
                        db.run(
                            'INSERT INTO articles (date, title, path) VALUES (?, ?, ?)',
                            [stats.birthtime, title, filePath],
                            (insertErr) => {
                                if (insertErr) {
                                    console.error('Error inserting article: ', insertErr);
                                } else {
                                    console.log('Article inserted successfully:', title);
                                }
                            }
                        );
                    } else {
                        console.log('Article already exists:', title);
                    }
                }
            })

        });
    });
};

checkAndAddArticles();
setInterval(checkAndAddArticles, interval);

app.get("/search", (req, res) => {
    const { q } = req.query;
    const query = `%${q}%`;

    db.all("SELECT title, id FROM articles WHERE title LIKE ?", [query], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        res.json({ data: rows });
    });
});
app.get("/TagList", (req, res) => {
    db.all("SELECT id, name FROM tags ORDER BY id",
        (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        // const tagNames = row.map((tag) => tag.name);
        // res.json({ data: tagNames });
            res.json({ data: row });
    });
});



app.get('/tags/:tagName', (req, res) => {
    const tagName = req.params.tagName;
    console.log("tagname" + tagName);
    const tagid = db.get(`SELECT id FROM tags WHERE name = ?`, [tagName], (err, row) =>{
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        return row.id; });
    console.log("tagid" + tagid);
    db.all("SELECT article_id FROM article_tags WHERE tag_id = ?", [tagid], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        console.log("article_id" + rows);
        db.get("SELECT title FROM articles WHERE id = ?", [rows], (err, row) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.json({ data: row });
        });
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



app.get("/articles/:title/comments", (req, res) => {
    const { title } = req.params;

    db.all(
        "SELECT * FROM comments WHERE title = ? ORDER BY id DESC",
        [title],
        (err, rows) => {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }

            res.json({ data: rows });
        }
    );
});

app.post('/articles/:title/comments', (req, res) => {
    const title = req.params.title;
    const { content } = req.body;

    const articleId = db.get('SELECT id FROM articles WHERE title = ?', [title], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        return row.id;
    });

    db.run('INSERT INTO comments (article_id, content) VALUES (?, ?)', [articleId, content], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }

        res.json({ message: 'Comment added successfully' });
    });
});

app.get('/articles/:title', (req, res) => {
    const requestedTitle = req.params.title;
    console.log(requestedTitle)
    const filePath = path.join(articlesFolder, `${requestedTitle}.txt`);

    fs.readFile(filePath, 'utf8',
        (err, data) => {
        if (err) {
            res.status(404).send('Article not found');
        } else {
            res.send(data);
            console.log(data)
        }
    });
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




app.listen(3001, () => {
    console.log("running server on 3001");
    console.log(articlesFolder);
})