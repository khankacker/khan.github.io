/**
 * Countdown Timer with Configurable Date in HTML
 */

class Countdown {
    initCountDown() {
        const countdownElement = document.getElementById("countdown");
        const endMessageElement = document.getElementById("end-message");

        if (countdownElement) {
            // Get the target date from the HTML attribute
            const targetDate = countdownElement.getAttribute("data-countdown-date");

            if (!targetDate) {
                console.error("Countdown date is not set in the HTML.");
                return;
            }

            const eventCountDown = new Date(targetDate).getTime();

            if (isNaN(eventCountDown)) {
                console.error("Invalid countdown date format. Use 'YYYY-MM-DDTHH:mm:ss'.");
                return;
            }

            // Update the countdown every second
            const interval = setInterval(() => {
                const now = new Date().getTime();
                const timeLeft = eventCountDown - now;

                if (timeLeft > 0) {
                    // Calculate time units
                    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

                    // Update HTML using data attributes
                    countdownElement.querySelector("[data-days]").textContent = days;
                    countdownElement.querySelector("[data-hours]").textContent = hours;
                    countdownElement.querySelector("[data-minutes]").textContent = minutes;
                    countdownElement.querySelector("[data-seconds]").textContent = seconds;
                } else {
                    // When countdown ends
                    clearInterval(interval);
                    countdownElement.style.display = "none";
                    endMessageElement.style.display = "block";
                }
            }, 1000);
        }
    }

    init() {
        this.initCountDown();
    }
}

// Initialize the countdown
new Countdown().init();
