document.addEventListener('DOMContentLoaded', () => {
    // عناصر الواجهة
    const modal = document.getElementById("loginModal");
    const getStartedBtn = document.getElementById("getStartedBtn");
    const closeBtn = document.querySelector(".close-btn");
    const loginArea = document.getElementById("login-area");
    const signupArea = document.getElementById("signup-area");
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    // 1. التحكم في القائمة (Hamburger Menu)
    if (hamburger) {
        hamburger.onclick = () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        };
    }

    // 2. فتح وإغلاق النافذة (Modal)
    if (getStartedBtn) getStartedBtn.onclick = () => { modal.style.display = "block"; };
    if (closeBtn) closeBtn.onclick = () => { modal.style.display = "none"; };
    window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };

    // 3. التنقل بين Login و Signup
    document.getElementById("go-to-signup").onclick = (e) => {
        e.preventDefault();
        loginArea.style.display = "none";
        signupArea.style.display = "block";
    };
    document.getElementById("go-to-login").onclick = (e) => {
        e.preventDefault();
        signupArea.style.display = "none";
        loginArea.style.display = "block";
    };

    // 4. منطق إنشاء حساب (Sign Up)
    const signupForm = document.getElementById("signupForm");
    signupForm.onsubmit = (e) => {
        e.preventDefault();
        const user = document.getElementById("signup-username").value.trim();
        const pass = document.getElementById("signup-pass").value;
        const confirmPass = document.getElementById("confirm-pass").value;

        if (pass.length < 8) return alert("Password must be at least 8 characters!");
        if (pass !== confirmPass) return alert("Passwords do not match!");
        if (localStorage.getItem(user)) return alert("Username already taken!");

        localStorage.setItem(user, pass);
        localStorage.setItem(user + "_attempts", 0);
        alert("Account created! Now you can login.");
        document.getElementById("go-to-login").click();
    };

    // 5. منطق تسجيل الدخول (Login)
    const loginForm = document.getElementById("loginForm");
    loginForm.onsubmit = (e) => {
        e.preventDefault();
        const user = document.getElementById("login-username").value.trim();
        const pass = document.getElementById("login-pass").value;

        const savedPass = localStorage.getItem(user);
        let attempts = parseInt(localStorage.getItem(user + "_attempts")) || 0;

        if (attempts >= 3) return alert("Account locked due to 3 failed attempts!");

        if (!savedPass) {
            alert("User not found!");
        } else if (savedPass === pass) {
            localStorage.setItem(user + "_attempts", 0);
            alert("Welcome back, " + user + "!");
            modal.style.display = "none";
        } else {
            attempts++;
            localStorage.setItem(user + "_attempts", attempts);
            alert(`Wrong password! ${3 - attempts} attempts left.`);
        }
    };

    // 6. تأثير Fade-in
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }, index * 300);
    });
});
