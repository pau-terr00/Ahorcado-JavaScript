$(document).ready(function() {
    const words = [
        "elefante", "murcielago", "manzana", "libro", "pelicula",
        "coche", "ciudad", "montaña", "ordenador", "cielo",
        "guitarra", "platano", "flor", "camisa", "vacaciones",
        "bici", "pescado", "sol", "tigre", "chocolate", "avion"
    ];
    let selectedWord = "";
    let guessedLetters = [];
    let wrongGuesses = 0;

    const maxWrongGuesses = 6; 
    const hangmanImages = [
        "imagenes/img0.png", "imagenes/img1.png", "imagenes/img2.png", 
        "imagenes/img3.png", "imagenes/img4.png", "imagenes/img5.png", 
        "imagenes/img6.png"
    ];

    function startGame() {
        selectedWord = words[Math.floor(Math.random() * words.length)];
        guessedLetters = [];
        wrongGuesses = 0;
        $('#hangman-image').attr('src', hangmanImages[wrongGuesses]);
        $('#word-display').text("_ ".repeat(selectedWord.length));
        $('#restart-btn').hide();
        $('#guessed-letters').text("");
        $('#letter-input').prop("disabled", false);
        $('#end-message').hide(); 
        $('#overlay').addClass('d-none');
    }

    function guessLetter(letter) {
        if (guessedLetters.includes(letter)) return; 
        guessedLetters.push(letter);
        $('#guessed-letters').text(guessedLetters.join(", "));
        
        if (selectedWord.includes(letter)) {
            updateWordDisplay();
        } else {
            wrongGuesses++;
            $('#hangman-image').attr('src', hangmanImages[wrongGuesses]);
        }

        if (wrongGuesses === maxWrongGuesses) {
            showEndMessage(false); 
        } else if (isWordGuessed()) {
            showEndMessage(true); 
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

    function showEndMessage(isWin) {
        if (isWin) {
            $('#end-message-title').text("¡Ganaste!");
        } else {
            $('#end-message-title').text("¡Perdiste!");
        }

        $('#selected-word').text(selectedWord); 
        $('#overlay').removeClass('d-none');
        $('#end-message').show();
        $('#letter-input').prop("disabled", true);
        $('#restart-btn').show();
    }

    $('#letter-input').on('input', function() {
        let letter = $(this).val().toLowerCase();

        if (letter.length == 1 && /^[a-zA-Z]$/.test(letter)) {
            guessLetter(letter);
            $(this).val("");
        }
    });

    $('#restart-btn').click(startGame);

    startGame();
});