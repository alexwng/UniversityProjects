const server = "http://localhost:3000";
var promptName = prompt("Please enter your name", "random user");

var myName = document.getElementById("my-name");
myName.textContent = promptName;

var tabTitle = document.getElementById("tab-title");
tabTitle.textContent = "Salut, " + myName.textContent + "!";

setTimeout(function () {
    tabTitle.textContent = "My Survey Room";
}, 2000);

for (var i = 1; i <= 12; i++) {
    document.getElementById("ch-" + i).style.visibility = "hidden";
}

var myMessage = document.getElementById("input-message-text");
var myTextColor = document.getElementById("my-text-color");

var socket = io(server);

socket.emit("add user", myName.textContent);

socket.on("user change list", (userList) => {
    var myUserList = document.getElementById("user-list");
    myUserList.innerHTML = "";
    for (var i = 0; i < userList.length; i++) {
        const elem = document.createElement("li");
        elem.textContent = userList[i].name;
        myUserList.append(elem);
        // myUserList.innerHTML += `<li>${userList[i].name}</li>`;
    }
});

document
    .getElementById("input-form")
    .addEventListener("submit", function (event) {
        event.preventDefault();
        // console.log("a fost apasat send" + myMessage.value);

        socket.emit(
            "add message",
            myMessage.value,
            myName.textContent,
            myTextColor.value
        );
        myMessage.value = "";
    });

var myChat = document.getElementById("messages");
socket.on("update message box", (messages) => {
    myChat.innerHTML = "";
    for (var i = 0; i < messages.length; i++) {
        const divMesaj = document.createElement("div");
        divMesaj.classList.add("message");

        const divMesajBox = document.createElement("div");
        divMesajBox.classList.add("message-box");

        const divUsername = document.createElement("div");
        divUsername.classList.add("username-chat");
        divUsername.textContent = messages[i].name;

        const divTimestamp = document.createElement("div");
        divTimestamp.classList.add("datetime");
        divTimestamp.textContent = messages[i].timestamp;

        const pMesaj = document.createElement("p");
        pMesaj.style.color = messages[i].color;
        pMesaj.textContent = messages[i].message;

        if (messages[i]._id == socket.id) {
            divMesaj.classList.add("my-message");
            divMesajBox.classList.add("my-message");
            //     myChat.innerHTML += ` <div class="message my-message"><div class="message-box">
            //     <div class="username-chat">
            //         ${messages[i].name}
            //     </div>
            //     <div class="datetime">${messages[i].timestamp}</div>
            // </div>
            // <p style="color: ${messages[i].color}">${messages[i].message}</p></div>`;
        }
        // else {
        //     myChat.innerHTML += ` <div class="message"><div class="message-box">
        //     <div class="username-chat">
        //         ${messages[i].name}
        //     </div>
        //     <div class="datetime">${messages[i].timestamp}</div>
        // </div>
        // <p style="color: ${messages[i].color}">${messages[i].message}</p></div>`;
        // }

        divMesajBox.append(divUsername, divTimestamp);
        divMesaj.append(divMesajBox, pMesaj);
        myChat.append(divMesaj);
    }
});

document
    .getElementById("change-name-btn")
    .addEventListener("click", function (event) {
        event.preventDefault();

        promptName = prompt("Please enter your name", myName.textContent);
        myName.textContent = promptName;
        socket.emit("change username", myName.textContent);
        // console.log("usernameul a fost schimbat " + myName.textContent);
    });

myTextColor.addEventListener("change", function (event) {
    event.preventDefault();
    // console.log("S-a schimbat " + myTextColor.value);
    socket.emit("change color", myTextColor.value);
});

var myEmojiInput = document.getElementById("emoji-input");
for (var i = 0; i < myEmojiInput.children.length; i++) {
    myEmojiInput.children[i].addEventListener("click", function (event) {
        event.preventDefault();
        // console.log(event.srcElement.textContent);
        myMessage.value += event.srcElement.textContent.trim();
    });
}

var mySurvey = document.getElementById("input-survey-text");

document
    .getElementById("survey-form")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        socket.emit("add survey", mySurvey.value);
        mySurvey.value = "";
    });

var mySurveys = document.getElementById("proposals-list");
socket.on("update survey", (surveys) => {
    surveys.sort(function (a, b) {
        return (
            b.likes.length -
            b.dislikes.length -
            (a.likes.length - a.dislikes.length)
        );
    });

    mySurveys.innerHTML = "";
    for (var i = 0; i < surveys.length; i++) {
        // mySurveys.innerHTML += `
        // <div class="survey">
        //     <p>${surveys[i].survey}</p>
        //     <button type="button" id="like-btn">👍</button>
        //     <span>${surveys[i].likes.length}</span>
        //     <button type="button" id="dislike-btn">👎</button>
        //     <span>${surveys[i].dislikes.length}</span>
        // </div>
        // `;
        const divSurvey = document.createElement("div");
        divSurvey.classList.add("survey");
        divSurvey.id = surveys[i]._id;

        const pSurvey = document.createElement("p");
        pSurvey.textContent = surveys[i].survey;

        const pHidden = document.createElement("p");
        pHidden.textContent = "Textul a fost ascuns";
        pHidden.style.display = "none";
        pHidden.addEventListener("click", (event) => {
            const tempId = event.srcElement.parentNode.id;
            document.getElementById(tempId).children[0].style.display = "";
            event.srcElement.style.display = "none";
        });

        if (surveys[i].likes.length - surveys[i].dislikes.length <= -3) {
            pSurvey.style.display = "none";
            pHidden.style.display = "";
        }

        const buttonLike = document.createElement("button");
        buttonLike.textContent = "👍";
        buttonLike.classList.add("round-button");
        if (surveys[i].likes.includes(socket.id) == true) {
            buttonLike.classList.add("bigger-btn", "liked");
        }
        buttonLike.addEventListener("click", (event) => {
            event.preventDefault();
            // console.log(event.srcElement.parentNode.id);
            socket.emit("voting", event.srcElement.parentNode.id, 1);
        });

        const spanLike = document.createElement("span");
        spanLike.textContent = surveys[i].likes.length;
        spanLike.classList.add("marginLikeNo");

        const buttonDislike = document.createElement("button");
        buttonDislike.textContent = "👎";
        buttonDislike.classList.add("round-button");
        if (surveys[i].dislikes.includes(socket.id) == true) {
            buttonDislike.classList.add("bigger-btn", "disliked");
        }
        buttonDislike.addEventListener("click", (event) => {
            event.preventDefault();
            // console.log(event.srcElement.parentNode.id);
            socket.emit("voting", event.srcElement.parentNode.id, 0);
        });

        const spanDislike = document.createElement("span");
        spanDislike.textContent = surveys[i].dislikes.length;
        spanDislike.classList.add("marginLikeNo");

        divSurvey.append(
            pSurvey,
            pHidden,
            buttonLike,
            spanLike,
            buttonDislike,
            spanDislike
        );
        mySurveys.append(divSurvey);
    }
});

const randomPing = setInterval(function () {
    socket.emit("random ping");
}, 5000);

for (var i = 1; i < 12; i += 2) {
    setTimeout(
        function (indice) {
            document.getElementById("ch-" + indice).style.visibility = "";
            document.getElementById("ch-" + (indice + 1)).style.visibility = "";
        },
        i * 100,
        i
    );
}

fetch(server + "/vizitari").then((response) => {
    response.json().then((data) => {
        if (data.times == 1) {
            document.getElementById("footer").textContent =
                "Salut, te-ai logat azi pentru prima oara";
        } else {
            document.getElementById("footer").textContent = `Salut, ${
                myName.textContent
            }, ultima oara ai intrat de pe ip-ul ${
                data.ip
            } in ziua ${data.timestamp.substring(
                0,
                10
            )} la ora ${data.timestamp.substring(11)}. Ai vizitat site-ul de ${
                data.times
            } ori`;
        }
    });
});

document.getElementsByTagName("body")[0].style.backgroundPositionX = "0px";

setInterval(function () {
    var bar = document.getElementsByTagName("body")[0].style
        .backgroundPositionX;
    document.getElementsByTagName("body")[0].style.backgroundPositionX = `${
        parseInt(bar.substr(0, bar.length - 2)) + 5
    }px`;
}, 100);
