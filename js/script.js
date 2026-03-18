document.addEventListener("DOMContentLoaded", function () {

    // Элементы для изменения размера текста
    const increase = document.getElementById("font-increase");
    const decrease = document.getElementById("font-decrease");
    const reset = document.getElementById("font-reset");

    // Элементы виджета
    const toggleBtn = document.querySelector(".a11y-toggle");
    const panel = document.querySelector(".a11y-panel");
    const contrastBtn = document.getElementById("contrast-toggle");
    const grayscaleBtn = document.getElementById("grayscale-toggle");

    // Настройки шрифта
    const storage_key = "fontSize";
    const step = 10;
    const min = 70;
    const max = 150;
    let currentSize = parseInt(localStorage.getItem(storage_key)) || 100;

    // Применение размера шрифта
    function applyFontSize(size) {
        document.documentElement.style.fontSize = size + "%";
        localStorage.setItem(storage_key, size);
    }

    // Изменение размера шрифта
    function changeFontSize(delta) {
        let newSize = currentSize + delta;
        if (newSize < min || newSize > max) return;
        currentSize = newSize;
        applyFontSize(currentSize);
    }

    applyFontSize(currentSize);

    // Контраст
    if (localStorage.getItem("contrast") === "on") {
        document.body.classList.add("high-contrast");
        contrastBtn.classList.add("active-btn");
    }

    // Ч/Б
    if (localStorage.getItem("grayscale") === "on") {
        document.body.classList.add("grayscale");
        grayscaleBtn.classList.add("active-btn");
    }

    // Кнопки изменения размера шрифта
    increase.addEventListener("click", () => changeFontSize(step));
    decrease.addEventListener("click", () => changeFontSize(-step));
    reset.addEventListener("click", () => {
        currentSize = 100;
        applyFontSize(currentSize);
    });

    // Открытие/закрытие панели доступности
    toggleBtn.addEventListener("click", () => {
        const isOpen = panel.classList.toggle("active");
        panel.setAttribute("aria-hidden", !isOpen);
        toggleBtn.setAttribute("aria-expanded", isOpen);
    });

    // Закрытие панели по ESC
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            panel.classList.remove("active");
            panel.setAttribute("aria-hidden", "true");
            toggleBtn.setAttribute("aria-expanded", "false");
        }
    });

    // Переключение контраста
    contrastBtn.addEventListener("click", () => {
        document.body.classList.toggle("high-contrast");
        contrastBtn.classList.toggle("active-btn");
        const isActive = document.body.classList.contains("high-contrast");
        localStorage.setItem("contrast", isActive ? "on" : "off");
    });

    // Переключение Ч/Б
    grayscaleBtn.addEventListener("click", () => {
        document.body.classList.toggle("grayscale");
        grayscaleBtn.classList.toggle("active-btn");
        const isActive = document.body.classList.contains("grayscale");
        localStorage.setItem("grayscale", isActive ? "on" : "off");
    });

});