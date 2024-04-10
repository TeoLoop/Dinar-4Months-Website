function revealTicket() {
    var ticketElement = document.getElementById("ticket");
    var pdfPreview = ticketElement.querySelector(".pdf-preview");
    var downloadLink = ticketElement.querySelector(".download-link");
    var giftImage = document.querySelector(".gift-image");

    // Mostrar el ticket y animar la entrada
    ticketElement.style.display = "block";
    fadeInElement(pdfPreview);
    setTimeout(function() {
        downloadLink.classList.remove("hidden");
    }, 500); // Mostrar el enlace de descarga después de 0.5 segundos

    // Inclinar la imagen principal hacia la derecha con una animación
    tiltImage(giftImage, 50); // Inclinar la imagen principal 20 grados hacia la derecha

    // Ocultar la imagen principal con una animación de fundido
    fadeOutElement(giftImage, function() {
        // Una vez que la imagen original se desvanece, cambiar la imagen a la versión abierta
        giftImage.src = "media/gift2.png";

        // Mostrar la nueva imagen con una animación de fundido
        fadeInElement(giftImage);
    });
}

function fadeInElement(element) {
    element.style.opacity = "0";
    var opacity = 0;
    var interval = setInterval(function() {
        opacity += 0.1;
        element.style.opacity = opacity.toString();
        if (opacity >= 1) {
            clearInterval(interval);
        }
    }, 50); // Ajustar la velocidad de la tranición según sea necesario
}

function fadeOutElement(element, callback) {
    var opacity = 1;
    var interval = setInterval(function() {
        opacity -= 0.1;
        element.style.opacity = opacity.toString();
        if (opacity <= 0) {
            clearInterval(interval);
            // Llamar al callback después de completar la transición de fundido
            if (typeof callback === 'function') {
                callback();
            }
        }
    }, 30); // Ajustar la velocidad de la transición según sea necesario
}

function tiltImage(element, degrees) {
    var duration = 500; // Duración de la animación (en milisegundos)
    var start = null;

    function tilt(timestamp) {
        if (!start) start = timestamp;
        var progress = timestamp - start;
        var angle = (progress / duration) * degrees;

        if (angle <= degrees) {
            element.style.transform = "rotateZ(" + angle + "deg)";
            window.requestAnimationFrame(tilt);
        } else {
            // Una vez que se completa la inclinación, restablecer la transformación
            element.style.transform = "none";
        }
    }

    window.requestAnimationFrame(tilt);
}
