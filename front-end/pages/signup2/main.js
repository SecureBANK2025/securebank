// Wait for the document to fully load before executing the script
document.addEventListener("DOMContentLoaded", function () {
    // Define the keyboard layouts for English and Arabic
    const englishLayout = {
        row2: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
        row3: ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
        row4: ["z", "x", "c", "v", "b", "n", "m", "⌫"],
        row5: ["⇧", "EN.", "SPACE", ".COM", "."],
    };

    const arabicLayout = {
        row2: ["ض", "ص", "ث", "ق", "ف", "غ", "ع", "ه", "خ", "ح"],
        row3: ["ش", "س", "ي", "ب", "ل", "ا", "ت", "ن", "م"],
        row4: ["ئ", "ء", "ؤ", "ر", "لا", "ى", "ة", "⌫"],
        row5: ["⇧", "AR.", "SPACE", ".COM", "."],
    };

    // Set initial language and shift state variables
    let currentLanguage = "en";
    let shiftActive = false;

    // Function to update the layout of the keyboard based on the current language and shift state
    function updateLayout() {
        // Select the keys in each row to be updated
        const row2Keys = document.querySelectorAll(
            ".keyboard > .row:nth-child(2) .key"
        );
        const row3Keys = document.querySelectorAll(
            ".keyboard > .row:nth-child(3) .key"
        );
        const row4Keys = document.querySelectorAll(
            ".keyboard > .row:nth-child(4) .key"
        );
        const row5Keys = document.querySelectorAll(
            ".keyboard > .row:nth-child(5) .key"
        );

        let layout;
        if (currentLanguage === "en") {
            // Use the English layout and adjust for shift (uppercase or lowercase)
            layout = englishLayout;
            row2Keys.forEach((key, i) => {
                key.textContent = shiftActive
                    ? layout.row2[i].toUpperCase()
                    : layout.row2[i].toLowerCase();
            });
            row3Keys.forEach((key, i) => {
                key.textContent = shiftActive
                    ? layout.row3[i].toUpperCase()
                    : layout.row3[i].toLowerCase();
            });
            row4Keys.forEach((key, i) => {
                // Do not modify the backspace key
                if (layout.row4[i] !== "⌫") {
                    key.textContent = shiftActive
                        ? layout.row4[i].toUpperCase()
                        : layout.row4[i].toLowerCase();
                }
            });
            row5Keys.forEach((key, i) => {
                // Special keys in row 5 remain unchanged
                key.textContent = layout.row5[i];
            });
        } else {
            // Use the Arabic layout (no case change for Arabic)
            layout = arabicLayout;
            row2Keys.forEach((key, i) => {
                key.textContent = layout.row2[i];
            });
            row3Keys.forEach((key, i) => {
                key.textContent = layout.row3[i];
            });
            row4Keys.forEach((key, i) => {
                key.textContent = layout.row4[i];
            });
            row5Keys.forEach((key, i) => {
                key.textContent = layout.row5[i];
            });
        }
    }

    // Event listener for language toggle button click
    document.querySelector(".toggle-lang").addEventListener("click", () => {
        // Toggle the language between English and Arabic
        currentLanguage = currentLanguage === "en" ? "ar" : "en";
        // Reset shift state when switching to Arabic (since Arabic doesn't have case)
        if (currentLanguage !== "en") {
            shiftActive = false;
            document.querySelector(".shift").classList.remove("active");
        }
        // Update the keyboard layout after language change
        updateLayout();
    });

    // Event listener for shift button click (only for English)
    document.querySelector(".shift").addEventListener("click", () => {
        if (currentLanguage === "en") {
            // Toggle shift state
            shiftActive = !shiftActive;
            // Update shift button appearance based on active state
            document
                .querySelector(".shift")
                .classList.toggle("active", shiftActive);
            // Update the keyboard layout after toggling shift
            updateLayout();
        }
    });

    // Swipe detection on the space key to toggle language
    const spaceKey = document.querySelector(".space");
    let startX = 0;
    let endX = 0;

    // Record the starting X position when the user touches the space key
    spaceKey.addEventListener("touchstart", function (e) {
        startX = e.touches[0].clientX;
    });

    // Compare the X position on touch end to detect a swipe
    spaceKey.addEventListener("touchend", function (e) {
        endX = e.changedTouches[0].clientX;
        // If swipe distance is greater than 50px, toggle the language
        if (Math.abs(endX - startX) > 50) {
            currentLanguage = currentLanguage === "en" ? "ar" : "en";
            if (currentLanguage !== "en") {
                shiftActive = false;
                document.querySelector(".shift").classList.remove("active");
            }
            updateLayout();
        }
    });

    // Initialize the keyboard layout on page load
    updateLayout();
});
