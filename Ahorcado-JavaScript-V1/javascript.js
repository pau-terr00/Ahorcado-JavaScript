$(document).ready(function () {
    const words = [
        "elefante", "camarera", "aventuras", "guitarra", "hospital",
        "limpiador", "patente", "inventor", "solitaria", "pecadores",
        "murcielago", "cultura", "abundante", "cuidado", "futuroso"
    ];

    let selectedWord = "";
    let guessedLetters = [];
    let wrongGuesses = 0;

    const maxWrongGuesses = 7;

    function startGame() {
        selectedWord = words[Math.floor(Math.random() * words.length)];
        guessedLetters = [];
        wrongGuesses = 0;
        $('#word-display').text("_ ".repeat(selectedWord.length));
        $('#guessed-letters').text("-");
        $('#letter-input').prop("disabled", false);
        $('#restart-btn').hide();
        $('#letter-input').val("");
    }

    function guessLetter(letter) {
        if (guessedLetters.includes(letter)) return; 
        guessedLetters.push(letter);
        $('#guessed-letters').text(guessedLetters.join(", "));

        if (selectedWord.includes(letter)) {
            updateWordDisplay();
        } else {
            wrongGuesses++;
            if (wrongGuesses === maxWrongGuesses) {
                alert("Perdiste! La palabra era " + selectedWord);
                $('#letter-input').prop("disabled", true);
                $('#restart-btn').show();
            }
        }

        if (isWordGuessed()) {
            alert("¡Ganaste! La palabra era " + selectedWord);
            $('#letter-input').prop("disabled", true);
            $('#restart-btn').show();
        }
    }

    function updateWordDisplay() {
        let displayWord = selectedWord.split("").map(letter => {
            return guessedLetters.includes(letter) ? letter : "_";
        }).join(" ");
        $('#word-display').text(displayWord);
    }

    function isWordGuessed() {
        return selectedWord.split("").every(letter => guessedLetters.includes(letter));
    }


    $('#guess-btn').click(function () {
        let letter = $('#letter-input').val().toLowerCase();

        if (letter.length === 1 && /^[a-zA-Z]$/.test(letter)) {
            guessLetter(letter);
            $('#letter-input').val("");
        } else {
            alert("Por favor, ingresa una letra válida.");
        }
    });

    $('#restart-btn').click(function () {
        startGame();
    });

    startGame();
});