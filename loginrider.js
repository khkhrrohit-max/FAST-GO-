// ================= WAIT FOR PAGE LOAD =================
document.addEventListener("DOMContentLoaded", function () {

    // ================= GLOBAL =================
    let generatedOTP = "";
    let timer;
    let timeLeft = 60;

    // ================= FUNCTIONS =================
    function isValidIndianNumber(number) {
        return /^[6-9]\d{9}$/.test(number);
    }

    function generateOTP() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    // ================= SELECT ELEMENTS =================
    const inputs = document.querySelectorAll("input");
    const buttons = document.querySelectorAll("button");

    const numberInput = inputs[0];   // Mobile input
    const otpInput = inputs[1];      // OTP input

    const getOtpBtn = buttons[0];    // GET OTP button
    const loginBtn = buttons[1];     // LOGIN button

    // ================= OTP TIMER =================
    function startTimer() {
        timeLeft = 60;
        getOtpBtn.disabled = true;
        getOtpBtn.innerText = "Resend in 60s";

        timer = setInterval(() => {
            timeLeft--;
            getOtpBtn.innerText = "Resend in " + timeLeft + "s";

            if (timeLeft <= 0) {
                clearInterval(timer);
                getOtpBtn.disabled = false;
                getOtpBtn.innerText = "GET OTP";
            }
        }, 1000);
    }

    // ================= GET OTP =================
    getOtpBtn.addEventListener("click", function () {

        const number = numberInput.value.trim();

        if (number === "") {
            alert("Enter Mobile Number");
            return;
        }

        if (!isValidIndianNumber(number)) {
            alert("Enter valid 10 digit Indian number");
            return;
        }

        // Check rider exists (from signup)
        const riderData = localStorage.getItem("rider_" + number);

        if (!riderData) {
            alert("Rider not registered ❌ Please Signup First");
            return;
        }

        generatedOTP = generateOTP();
        alert("Demo OTP: " + generatedOTP);

        startTimer();
    });

    // ================= LOGIN =================
    loginBtn.addEventListener("click", function () {

        const number = numberInput.value.trim();
        const enteredOTP = otpInput.value.trim();

        if (number === "") {
            alert("Enter Mobile Number");
            return;
        }

        if (generatedOTP === "") {
            alert("Please click GET OTP first");
            return;
        }

        if (enteredOTP !== generatedOTP) {
            alert("Wrong OTP ❌");
            return;
        }

        // Save login session
        localStorage.setItem("loggedInRider", number);

        alert("🎉 Login Successful!");

        // ✅ Redirect changed here
        window.location.href = "riderpage.html";
    });

});