const express = require("express");
const app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const uuid = require("uuid");
const port = 3000;

const fs = require("fs");

// const routerLogin = require("./routes/login.js");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors());
// app.use(routerLogin);

app.get("/", (req, res) => res.send("Hello World!"));

var userList = [];
var messages = [];
var surveys = [];

var vizitari = {};

app.get("/vizitari", (req, res) => {
    if (vizitari[req.ip] == null) {
        vizitari[req.ip] = { ip: req.ip, times: 1, timestamp: getTimestamp() };
    } else {
        vizitari[req.ip].times++;
    }
    res.json(vizitari[req.ip]);
    vizitari[req.ip].timestamp = getTimestamp();
});

app.get("/log", (req, res) => res.sendFile(__dirname + "/log.txt"));

function getTimestamp() {
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = ("0" + date_ob.getHours()).slice(-2);
    let minutes = ("0" + date_ob.getMinutes()).slice(-2);
    let seconds = ("0" + date_ob.getSeconds()).slice(-2);

    return (
        date +
        "-" +
        month +
        "-" +
        year +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds
    );
}

io.on("connection", (socket) => {
    fs.appendFile(
        "log.txt",
        `[${getTimestamp()}] utilizatorul ${socket.id} s-a conectat\n`,
        (err) => {
            if (err) console.log(err);
        }
    );
    io.emit("update message box", messages);
    io.emit("update survey", surveys);

    socket.on("add user", (name) => {
        userList.push({ _id: socket.id, name: name });
        io.emit("user change list", userList);
    });

    socket.on("add message", (message, name, color) => {
        if (message != "") {
            messages.unshift({
                _id: socket.id,
                name: name,
                timestamp: getTimestamp(),
                message: message,
                color: color,
            });
            io.emit("update message box", messages);
            fs.appendFile(
                "log.txt",
                `[${getTimestamp()}] utilizatorul ${
                    socket.id
                } a scris mesajul: ${message}\n`,
                (err) => {
                    if (err) console.log(err);
                }
            );
        }
    });

    socket.on("add survey", (survey) => {
        if (survey != "") {
            surveys.unshift({
                _id: uuid.v4(),
                survey: survey,
                likes: [],
                dislikes: [],
            });
            io.emit("update survey", surveys);
            fs.appendFile(
                "log.txt",
                `[${getTimestamp()}] utilizatorul ${
                    socket.id
                } a adaugat optiunea: ${survey}\n`,
                (err) => {
                    if (err) console.log(err);
                }
            );
        }
    });

    socket.on("change username", (name) => {
        for (var i = 0; i < userList.length; i++) {
            if (userList[i]._id == socket.id) {
                userList[i].name = name;
            }
        }

        for (var i = 0; i < messages.length; i++) {
            if (messages[i]._id == socket.id) {
                messages[i].name = name;
            }
        }
        io.emit("user change list", userList);
        io.emit("update message box", messages);

        fs.appendFile(
            "log.txt",
            `[${getTimestamp()}] utilizatorul ${
                socket.id
            } si-a schimbat numele in: ${name}\n`,
            (err) => {
                if (err) console.log(err);
            }
        );
    });

    socket.on("change color", (color) => {
        for (var i = 0; i < messages.length; i++) {
            if (messages[i]._id == socket.id) {
                messages[i].color = color;
            }
        }

        io.emit("update message box", messages);
        fs.appendFile(
            "log.txt",
            `[${getTimestamp()}] utilizatorul ${
                socket.id
            } si-a schimbat culoarea in: ${color}\n`,
            (err) => {
                if (err) console.log(err);
            }
        );
    });

    socket.on("voting", (surveyId, likeType) => {
        for (var i = 0; i < surveys.length; i++) {
            if (surveys[i]._id == surveyId) {
                if (surveys[i].likes.includes(socket.id)) {
                    surveys[i].likes = surveys[i].likes.filter(
                        (foo) => foo != socket.id
                    );
                    if (likeType == 0) {
                        surveys[i].dislikes.push(socket.id);
                    }
                } else if (surveys[i].dislikes.includes(socket.id)) {
                    surveys[i].dislikes = surveys[i].dislikes.filter(
                        (foo) => foo != socket.id
                    );
                    if (likeType == 1) {
                        surveys[i].likes.push(socket.id);
                    }
                } else {
                    if (likeType == 1) {
                        surveys[i].likes.push(socket.id);
                    } else if (likeType == 0) {
                        surveys[i].dislikes.push(socket.id);
                    }
                }
            }
        }
        io.emit("update survey", surveys);
        fs.appendFile(
            "log.txt",
            `[${getTimestamp()}] utilizatorul ${socket.id} a votat\n`,
            (err) => {
                if (err) console.log(err);
            }
        );
    });

    socket.on("random ping", () => {});

    socket.on("disconnect", () => {
        userList = userList.filter((user) => user["_id"] != socket.id);
        io.emit("user change list", userList);
        fs.appendFile(
            "log.txt",
            `[${getTimestamp()}] utilizatorul ${socket.id} s-a deconectat\n`,
            (err) => {
                if (err) console.log(err);
            }
        );
    });
});

http.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
