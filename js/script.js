/* =========================================================
   CONFIGURAÇÕES DO CONVITE
========================================================= */

// Data do casamento
// Formato: ano, mês (0 = janeiro), dia, hora, minuto
const weddingDate = new Date(
    2026,
    9,      // Outubro
    24,
    16,     // 16h
    0,      // 00 minutos
    0
);


/* =========================================================
   CONTAGEM REGRESSIVA
========================================================= */

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");


function updateCountdown() {

    const now = new Date();

    const difference = weddingDate.getTime() - now.getTime();


    // Caso o casamento já tenha acontecido
    if (difference <= 0) {

        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        return;
    }


    const seconds = Math.floor(
        difference / 1000
    );

    const days = Math.floor(
        seconds / 86400
    );

    const hours = Math.floor(
        (seconds % 86400) / 3600
    );

    const minutes = Math.floor(
        (seconds % 3600) / 60
    );

    const remainingSeconds =
        seconds % 60;


    daysElement.textContent =
        String(days).padStart(2, "0");

    hoursElement.textContent =
        String(hours).padStart(2, "0");

    minutesElement.textContent =
        String(minutes).padStart(2, "0");

    secondsElement.textContent =
        String(remainingSeconds).padStart(2, "0");
}


// Atualiza imediatamente
updateCountdown();


// Atualiza a cada segundo
setInterval(updateCountdown, 1000);


/* =========================================================
   ANIMAÇÕES AO ROLAR A PÁGINA
========================================================= */

const animatedElements =
    document.querySelectorAll(
        ".section-content, .date-content, .countdown-content"
    );


const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);
            }

        });

    },
    {
        threshold: 0.15
    }
);


animatedElements.forEach((element) => {
    observer.observe(element);
});


/* =========================================================
   CONFIRMAÇÃO DE PRESENÇA PELO WHATSAPP
========================================================= */

const rsvpForm = document.getElementById("rsvpForm");

rsvpForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const guestName = document
        .getElementById("guestName")
        .value
        .trim();

    const attendance = document.querySelector(
        'input[name="attendance"]:checked'
    );

    if (!guestName || !attendance) {
        alert("Por favor, preencha seu nome e escolha uma opção.");
        return;
    }

    const status =
        attendance.value === "sim"
            ? "Sim, estarei presente! ❤️"
            : "Infelizmente não poderei comparecer.";

    /*
     * COLOQUE AQUI O SEU NÚMERO
     *
     * Formato:
     * código do país + DDD + número
     *
     * Brasil = 55
     *
     * Exemplo:
     * 5511999999999
     */

    const numeroWhatsApp = "5511999999999";


    const mensagem = `
💍 *CONFIRMAÇÃO DE PRESENÇA*

Olá! Recebi uma confirmação pelo convite de casamento.

👤 *Nome:* ${guestName}

💌 *Presença:* ${status}

📅 *Casamento:* 24/10/2026

Obrigado! ❤️
    `.trim();


    const url =
        `https://wa.me/${numeroWhatsApp}?text=` +
        encodeURIComponent(mensagem);


    window.open(url, "_blank");

});


/* =========================================================
   LINKS DE NAVEGAÇÃO
========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach((link) => {

    link.addEventListener(
        "click",
        function (event) {

            const targetId =
                this.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);


            if (!target) {
                return;
            }


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );

});


/* =========================================================
   EFEITO SUTIL NO HERO
========================================================= */

const hero =
    document.querySelector(".hero");

const heroContent =
    document.querySelector(".hero-content");


window.addEventListener(
    "scroll",
    function () {

        const scrollPosition =
            window.scrollY;


        // Não aplica o efeito quando estiver
        // muito abaixo da capa
        if (scrollPosition > window.innerHeight) {
            return;
        }


        if (hero) {

            hero.style.backgroundPosition =
                `center ${50 + scrollPosition * 0.03}%`;
        }


        if (heroContent) {

            heroContent.style.transform =
                `translateY(${scrollPosition * 0.12}px)`;

            heroContent.style.opacity =
                Math.max(
                    0,
                    1 - scrollPosition / 650
                );
        }

    },
    {
        passive: true
    }
);


/* =========================================================
   EFEITO NOS BOTÕES
========================================================= */

const buttons =
    document.querySelectorAll(".button");


buttons.forEach((button) => {

    button.addEventListener(
        "mouseenter",
        () => {

            button.style.transform =
                "translateY(-2px)";

        }
    );


    button.addEventListener(
        "mouseleave",
        () => {

            button.style.transform =
                "translateY(0)";

        }
    );

});


/* =========================================================
   ANIMAÇÃO INICIAL
========================================================= */

window.addEventListener(
    "load",
    () => {

        document.body.classList.add(
            "page-loaded"
        );

    }
);

/* =========================================================
   MUSICA
========================================================= */
document.addEventListener("click", function() {
    const audio = document.getElementById("bg-music");
    audio.play();
  });
