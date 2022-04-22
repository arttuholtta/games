var rI = 0
var cell = ""
var fl = 0
var mR = 0
var uoSq = 0
var oSq = 0
var tM = 0


function startGame() {
    fl = 0
    mR = 0
    uoSq = 0
    oSq = 0
    tM = 0

    document.getElementById("status").innerHTML = ""
    var amount = document.getElementById("rows").value - 1
    uoSq = (amount + 1) * (amount + 1)
    var board = document.getElementById("game")
    var difficulty = document.getElementById("difficulty").value / 100
    board.innerHTML = ""
    for (i = 0; i <= amount; i++) {
        cell = ""
        for (u = 0; u <= amount; u++) {

            rI = Math.round(Math.random() - difficulty)
            console.log("random number:" + rI)
            if (rI == 0) {
                cell += "<td class=\"cell clear\" style=\"background-color:lightgrey;color:lightgrey;\" id=\"r-" + i + "-c-" + u + "-clear\" onclick=\"reveal(\'r-" + i + "-c-" + u + "-clear\')\" oncontextmenu=\"flag(\'r-" + i + "-c-" + u + "-clear\');return false;\"> </td>"
            } else {
                cell += "<td class=\"cell mine\" style=\"background-color:lightgrey;color:lightgrey;\" id=\"r-" + i + "-c-" + u + "-mine\" onclick=\"gameState(\'gameOver\')\" oncontextmenu=\"flag(\'r-" + i + "-c-" + u + "-mine\');return false;\">*</td>";
                mR++;
                tM++
            }
        }
        board.innerHTML += "<tr id=\"row-" + i + "\">" + cell + "</tr>"
    }

    calcMines(board)


}

function gameState(state) {
    if (state == "gameOver") {
        document.getElementById("status").innerHTML = "Game over :("
    }
    if (state == "winner") {
        document.getElementById("status").innerHTML = "Congratulations winner!"
    }
    var mines = document.getElementsByClassName("mine")
    for (const mine of mines) {
        mine.style.cssText = "background-color:black;color:red;"
    }
}
//Creates values for value squares
function calcMines(board) {
    var row = 0
    var cells = 0
    for (i = 0, row; row = board.rows[i]; i++) {
        for (j = 0, cells; cells = row.cells[j]; j++) {
            if (document.getElementById("r-" + i + "-c-" + j + "-clear")) {
                var count = 0
                if (document.getElementById("r-" + (i - 1) + "-c-" + (j - 1) + "-mine")) {
                    count++
                }
                if (document.getElementById("r-" + (i - 1) + "-c-" + j + "-mine")) {
                    count++
                }
                if (document.getElementById("r-" + (i - 1) + "-c-" + (j + 1) + "-mine")) {
                    count++
                }
                if (document.getElementById("r-" + i + "-c-" + (j - 1) + "-mine")) {
                    count++
                }
                if (document.getElementById("r-" + i + "-c-" + (j + 1) + "-mine")) {
                    count++
                }
                if (document.getElementById("r-" + (i + 1) + "-c-" + (j + 1) + "-mine")) {
                    count++
                }
                if (document.getElementById("r-" + (i + 1) + "-c-" + j + "-mine")) {
                    count++
                }
                if (document.getElementById("r-" + (i + 1) + "-c-" + (j - 1) + "-mine")) {
                    count++
                }
                if (0 < count) {
                    document.getElementById("r-" + i + "-c-" + j + "-clear").innerHTML = count
                }

            }
        }
    }
    flagCounter()
}
//Used for revealing clear squares, and in the case of empty squares, opens up all squares, that a)have values b)are empty, around the clicked square.  Keeps count of opened and unopened squares.
function reveal(id) {
    document.getElementById(id).style.cssText = "background-color:white;color:black;"
    uoSq--
    oSq++
    if (document.getElementById(id).innerHTML == 0) {
        var rv = id.split('-')
        if (document.getElementById("r-" + (parseInt(rv[1]) - 1) + "-c-" + (parseInt(rv[3]) - 1) + "-clear")) {
            if (document.getElementById("r-" + (parseInt(rv[1]) - 1) + "-c-" + (parseInt(rv[3]) - 1) + "-clear").style.color != "red") {
                document.getElementById("r-" + (parseInt(rv[1]) - 1) + "-c-" + (parseInt(rv[3]) - 1) + "-clear").style.cssText = "background-color:white;color:black;"
                uoSq--
                oSq++
            }
        }
        if (document.getElementById("r-" + (parseInt(rv[1]) - 1) + "-c-" + parseInt(rv[3]) + "-clear")) {
            if (document.getElementById("r-" + (parseInt(rv[1]) - 1) + "-c-" + parseInt(rv[3]) + "-clear").style.color != "red") {
                document.getElementById("r-" + (parseInt(rv[1]) - 1) + "-c-" + parseInt(rv[3]) + "-clear").style.cssText = "background-color:white;color:black;"
                uoSq--
                oSq++
            }
        }
        if (document.getElementById("r-" + (parseInt(rv[1]) - 1) + "-c-" + (parseInt(rv[3]) + 1) + "-clear")) {
            if (document.getElementById("r-" + (parseInt(rv[1]) - 1) + "-c-" + (parseInt(rv[3]) + 1) + "-clear").style.color != "red") {
                document.getElementById("r-" + (parseInt(rv[1]) - 1) + "-c-" + (parseInt(rv[3]) + 1) + "-clear").style.cssText = "background-color:white;color:black;"
                uoSq--
                oSq++
            }
        }
        if (document.getElementById("r-" + parseInt(rv[1]) + "-c-" + (parseInt(rv[3]) - 1) + "-clear")) {
            if (document.getElementById("r-" + parseInt(rv[1]) + "-c-" + (parseInt(rv[3]) - 1) + "-clear").style.color != "red") {
                document.getElementById("r-" + parseInt(rv[1]) + "-c-" + (parseInt(rv[3]) - 1) + "-clear").style.cssText = "background-color:white;color:black;"
                uoSq--
                oSq++
            }
        }
        if (document.getElementById("r-" + parseInt(rv[1]) + "-c-" + (parseInt(rv[3]) + 1) + "-clear")) {
            if (document.getElementById("r-" + parseInt(rv[1]) + "-c-" + (parseInt(rv[3]) + 1) + "-clear").style.color != "red") {
                document.getElementById("r-" + parseInt(rv[1]) + "-c-" + (parseInt(rv[3]) + 1) + "-clear").style.cssText = "background-color:white;color:black;"
                uoSq--
                oSq++
            }
        }
        if (document.getElementById("r-" + (parseInt(rv[1]) + 1) + "-c-" + (parseInt(rv[3]) + 1) + "-clear")) {
            if (document.getElementById("r-" + (parseInt(rv[1]) + 1) + "-c-" + (parseInt(rv[3]) + 1) + "-clear").style.color != "red") {
                document.getElementById("r-" + (parseInt(rv[1]) + 1) + "-c-" + (parseInt(rv[3]) + 1) + "-clear").style.cssText = "background-color:white;color:black;"
                uoSq--
                oSq++
            }
        }
        if (document.getElementById("r-" + (parseInt(rv[1]) + 1) + "-c-" + parseInt(rv[3]) + "-clear")) {
            if (document.getElementById("r-" + (parseInt(rv[1]) + 1) + "-c-" + parseInt(rv[3]) + "-clear").style.color != "red") {
                document.getElementById("r-" + (parseInt(rv[1]) + 1) + "-c-" + parseInt(rv[3]) + "-clear").style.cssText = "background-color:white;color:black;"
                uoSq--
                oSq++
            }
        }
        if (document.getElementById("r-" + (parseInt(rv[1]) + 1) + "-c-" + (parseInt(rv[3]) - 1) + "-clear")) {
            if (document.getElementById("r-" + (parseInt(rv[1]) + 1) + "-c-" + (parseInt(rv[3]) - 1) + "-clear").style.color != "red") {
                document.getElementById("r-" + (parseInt(rv[1]) + 1) + "-c-" + (parseInt(rv[3]) - 1) + "-clear").style.cssText = "background-color:white;color:black;"
                uoSq--
                oSq++
            }
        }
    }

}
//Used for marking flags. Also counts remaining mines
function flag(id) {
    if (document.getElementById(id).style.color == "black") {} else if (document.getElementById(id).style.color == "red") {

        document.getElementById(id).style.cssText = "background-color:grey;color:grey;"
        fl--
        flagCounter()
        if (id.includes("mine")) {
            mR++
        }
    } else {
        document.getElementById(id).style.cssText = "background-color: red; color: red;"

        fl++
        flagCounter()
        if (id.includes("mine")) {
            mR--
            if (mR == 0) {
                gameState("winner")
            }
        }
    }
}

function flagCounter() {
    document.getElementById("remainingFlags").innerHTML = "🚩:" + (tM - fl)
}