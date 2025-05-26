let colors = null;
let turn = 1;
let field = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
]

function play(color) {
    document.getElementById('count-down').style.display = 'flex';

    let count = 4;
    let ct = document.getElementById('counter');
    ct.innerText = "Ready?";
    const timer = setInterval(() => {
        count--;
        if (count === -1) {
            clearInterval(timer);
            document.getElementById('count-down').classList.add('fade-out');

            document.getElementById('count-down').addEventListener('animationend', () => {
                document.getElementById('count-down').style.display = 'none';
            }, { once: true });
            colors = color;
            document.getElementById("chooser").style.display = "none";
            document.getElementById("board").style.display = "block";
        } else {
            ct.innerText = count;
        }
    }, 1000)


}


function pressed(pos) {
    if (!pos.style.backgroundColor) {
        if (turn === 1) {
            pos.style.backgroundColor = colors[0];
            field[parseInt(pos.id)] = 1;
        } else {
            pos.style.backgroundColor = colors[1];
            field[parseInt(pos.id)] = 2;
        }

        const winner = checkWinner(field);

        if (winner !== null) {
            if (winner === 1) {
                document.getElementById("board").style.display = "none";
                document.getElementById("pl1").style.display = "flex";
            } else if (winner === 2) {
                document.getElementById("board").style.display = "none";
                document.getElementById("pl2").style.display = "flex";
            }
        } else if (!field.includes(0)) {
            document.getElementById("board").style.display = "none";
            document.getElementById("draw").style.display = "flex";
        }

        turn = turn === 1 ? 2 : 1;
    }
}

function checkWinner(board) {

    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const [a, b, c] of lines) {
        if (board[a] !== 0 && board[a] === board[b] && board[b] === board[c]) {
            return board[a];
        }
    }

    return null;
}
