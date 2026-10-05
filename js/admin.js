/* =========================================================
   GUARDIANS OF PARIS
   ADMINISTRATION SYSTEM
   admin.js
========================================================= */

"use strict";


/* =========================================================
   ADMIN ACCOUNTS
========================================================= */

const ADMIN_ACCOUNTS = {

    "mystraweberry": {

        password: "Ladyshy_luxury",

        name: "Bridgette Dupond",

        role: "Owner",

        recognition:
            "Portadora del Miraculous de la Mariquita",

        miraculous:
            "Mariquita",

        page:
            "maya.html",

        theme:
            "maya"

    },


    "angel1254.0": {

        password: "Princess_seraphin",

        name: "Mark Edmond",

        role: "Owner",

        recognition:
            "Sentiser",

        miraculous:
            "Pavo Real",

        page:
            "mark.html",

        theme:
            "mark"

    },


    "reikowner": {

        password: "Coconut_Slay",

        name: "Moth Holder",

        role: "Head Admin",

        recognition:
            "The Queen",

        miraculous:
            "Mariposa",

        page:
            "moth-holder.html",

        theme:
            "moth-holder"

    },


    "pitufo1451": {

        password: "Shine_Motion",

        name: "Lily Tyler",

        role: "Admin",

        recognition:
            "Portadora del Miraculous de la Serpiente",

        miraculous:
            "Serpiente",

        page:
            "lily.html",

        theme:
            "lily"

    },


    "misteryet13_03093": {

        password: "Bubble_Fairy",

        name: "Rex Lourenzt",

        role: "Admin",

        recognition:
            "Portador del Miraculous del Conejo",

        miraculous:
            "Conejo",

        page:
            "rex.html",

        theme:
            "rex"

    },


    "mornalis_v": {

        password: "Goldie_Golder",

        name: "Mizuki Edmond",

        role: "Admin",

        recognition:
            "Portadora del Miraculous del Gato",

        miraculous:
            "Gato",

        page:
            "mizuki.html",

        theme:
            "mizuki"

    },


    "itss.rubiii": {

        password: "Kitty_Berry",

        name: "Duusuu Queen",

        role: "Admin",

        recognition:
            "Kwami del Miraculous del Pavo Real",

        miraculous:
            "Pavo Real",

        page:
            "duusuu.html",

        theme:
            "duusuu"

    }

};


/* =========================================================
   SESSION
========================================================= */

const SESSION_KEY =
    "guardiansOfParisAdmin";


function saveAdminSession(
    username,
    account
) {

    const session = {

        username:
            username,

        name:
            account.name,

        role:
            account.role,

        recognition:
            account.recognition,

        miraculous:
            account.miraculous,

        page:
            account.page,

        theme:
            account.theme,

        loginTime:
            Date.now()

    };


    sessionStorage.setItem(

        SESSION_KEY,

        JSON.stringify(session)

    );

}


function getAdminSession() {

    try {

        const session =
            sessionStorage.getItem(
                SESSION_KEY
            );


        if (!session) {

            return null;

        }


        return JSON.parse(
            session
        );


    } catch (error) {

        console.error(
            "Error leyendo la sesión:",
            error
        );

        return null;

    }

}


function clearAdminSession() {

    sessionStorage.removeItem(
        SESSION_KEY
    );

}


/* =========================================================
   LOADER
========================================================= */

function hideAdminLoader() {

    const loader =
        document.getElementById(
            "adminLoader"
        );


    if (!loader) {

        return;

    }


    /*
        No usamos window.load.

        Esto significa que el loader NO va a esperar
        imágenes, fuentes ni otros recursos.
    */

    loader.style.opacity =
        "0";

    loader.style.visibility =
        "hidden";

    loader.style.pointerEvents =
        "none";


    /*
        Lo retiramos completamente
        después de la transición.
    */

    window.setTimeout(
        function () {

            loader.style.display =
                "none";

        },
        650
    );

}


/* =========================================================
   PASSWORD TOGGLE
========================================================= */

function setupPasswordToggle() {

    const passwordInput =
        document.getElementById(
            "adminPassword"
        );


    const toggleButton =
        document.getElementById(
            "passwordToggle"
        );


    if (
        !passwordInput ||
        !toggleButton
    ) {

        return;

    }


    toggleButton.addEventListener(
        "click",
        function () {

            const isPassword =
                passwordInput.type ===
                "password";


            passwordInput.type =
                isPassword
                    ? "text"
                    : "password";


            toggleButton.textContent =
                isPassword
                    ? "◎"
                    : "◉";


            toggleButton.setAttribute(

                "aria-label",

                isPassword
                    ? "Ocultar contraseña"
                    : "Mostrar contraseña"

            );

        }
    );

}


/* =========================================================
   LOGIN MESSAGE
========================================================= */

function showLoginMessage(
    message,
    type = "error"
) {

    const messageElement =
        document.getElementById(
            "loginMessage"
        );


    if (!messageElement) {

        return;

    }


    messageElement.textContent =
        message;


    messageElement.className =
        "login-message " +
        type;

}


/* =========================================================
   LOGIN
========================================================= */

function setupLogin() {

    const form =
        document.getElementById(
            "adminLoginForm"
        );


    const usernameInput =
        document.getElementById(
            "adminUsername"
        );


    const passwordInput =
        document.getElementById(
            "adminPassword"
        );


    const loginButton =
        document.getElementById(
            "loginButton"
        );


    if (
        !form ||
        !usernameInput ||
        !passwordInput ||
        !loginButton
    ) {

        return;

    }


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const username =
                usernameInput.value
                    .trim()
                    .toLowerCase();


            const password =
                passwordInput.value;


            if (
                !username ||
                !password
            ) {

                showLoginMessage(
                    "Completa todos los campos."
                );

                return;

            }


            const account =
                ADMIN_ACCOUNTS[
                    username
                ];


            if (
                !account ||
                account.password !==
                    password
            ) {

                showLoginMessage(
                    "Usuario o contraseña incorrectos."
                );


                form.classList.remove(
                    "login-error-shake"
                );


                void form.offsetWidth;


                form.classList.add(
                    "login-error-shake"
                );


                return;

            }


            /*
                LOGIN CORRECTO
            */

            loginButton.disabled =
                true;


            loginButton.classList.add(
                "is-loading"
            );


            const buttonText =
                loginButton.querySelector(
                    ".button-text"
                );


            if (buttonText) {

                buttonText.textContent =
                    "Verificando acceso...";

            }


            showLoginMessage(
                "Acceso autorizado. Bienvenido al sistema.",
                "success"
            );


            saveAdminSession(
                username,
                account
            );


            window.setTimeout(
                function () {

                    window.location.href =
                        "admin/" +
                        account.page;

                },
                650
            );

        }
    );

}


/* =========================================================
   DASHBOARD PROTECTION
========================================================= */

function setupDashboardProtection() {

    if (
        !document.body.classList.contains(
            "admin-dashboard"
        )
    ) {

        return;

    }


    const session =
        getAdminSession();


    if (!session) {

        window.location.replace(
            "../admin.html"
        );

        return;

    }

}


/* =========================================================
   DASHBOARD MODULES
========================================================= */

function setupDashboardModules() {

    const modules =
        document.querySelectorAll(
            ".control-module"
        );


    if (!modules.length) {

        return;

    }


    modules.forEach(
        function (module) {

            module.addEventListener(
                "click",
                function () {

                    const title =
                        module.querySelector(
                            "h3"
                        );


                    const moduleName =
                        title
                            ? title.textContent.trim()
                            : "Módulo";


                    showModuleNotification(
                        moduleName
                    );

                }
            );

        }
    );

}


/* =========================================================
   MODULE NOTIFICATION
========================================================= */

function showModuleNotification(
    moduleName
) {

    let notification =
        document.getElementById(
            "adminModuleNotification"
        );


    if (!notification) {

        notification =
            document.createElement(
                "div"
            );


        notification.id =
            "adminModuleNotification";


        notification.className =
            "admin-module-notification";


        document.body.appendChild(
            notification
        );

    }


    notification.textContent =
        moduleName +
        " · Módulo disponible próximamente";


    notification.classList.add(
        "show"
    );


    window.clearTimeout(
        notification._hideTimer
    );


    notification._hideTimer =
        window.setTimeout(
            function () {

                notification.classList.remove(
                    "show"
                );

            },
            2600
        );

}


/* =========================================================
   DASHBOARD ENTRANCE
========================================================= */

function setupDashboardEntrance() {

    if (
        !document.body.classList.contains(
            "admin-dashboard"
        )
    ) {

        return;

    }


    document.body.classList.add(
        "dashboard-ready"
    );

}


/* =========================================================
   CURSOR GLOW
========================================================= */

function setupCursorGlow() {

    if (
        !window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        ).matches
    ) {

        return;

    }


    const glow =
        document.createElement(
            "div"
        );


    glow.className =
        "admin-cursor-glow";


    document.body.appendChild(
        glow
    );


    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;


    window.addEventListener(
        "mousemove",
        function (event) {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;

        },
        {
            passive: true
        }
    );


    function animateGlow() {

        currentX +=
            (
                mouseX -
                currentX
            ) * 0.08;


        currentY +=
            (
                mouseY -
                currentY
            ) * 0.08;


        glow.style.transform =
            "translate3d(" +
            currentX +
            "px, " +
            currentY +
            "px, 0)";


        window.requestAnimationFrame(
            animateGlow
        );

    }


    animateGlow();

}


/* =========================================================
   LOGOUT
========================================================= */

function setupLogout() {

    const logoutButtons =
        document.querySelectorAll(
            "[data-admin-logout]"
        );


    if (!logoutButtons.length) {

        return;

    }


    logoutButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    clearAdminSession();


                    window.location.href =
                        "../admin.html";

                }
            );

        }
    );

}


/* =========================================================
   SYSTEM CLOCK
========================================================= */

function setupSystemClock() {

    const clock =
        document.querySelector(
            "[data-admin-clock]"
        );


    if (!clock) {

        return;

    }


    function updateClock() {

        const now =
            new Date();


        clock.textContent =
            now.toLocaleTimeString(
                "es-CO",
                {
                    hour:
                        "2-digit",

                    minute:
                        "2-digit",

                    second:
                        "2-digit"
                }
            );

    }


    updateClock();


    window.setInterval(
        updateClock,
        1000
    );

}


/* =========================================================
   GLOBAL ADMIN OBJECT
========================================================= */

window.GuardiansAdmin = {

    accounts:
        ADMIN_ACCOUNTS,

    getSession:
        getAdminSession,

    logout:
        clearAdminSession

};


/* =========================================================
   INITIALIZATION
========================================================= */

function initializeAdminSystem() {

    /*
        1. OCULTAR LOADER
    */

    hideAdminLoader();


    /*
        2. LOGIN
    */

    setupPasswordToggle();

    setupLogin();


    /*
        3. DASHBOARD
    */

    setupDashboardProtection();

    setupDashboardModules();

    setupDashboardEntrance();


    /*
        4. EFFECTS
    */

    setupCursorGlow();

    setupLogout();

    setupSystemClock();

}


/* =========================================================
   START
========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeAdminSystem,
        {
            once: true
        }
    );

} else {

    initializeAdminSystem();

}