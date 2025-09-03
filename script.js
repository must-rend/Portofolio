// Typing animation for the name
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Skill tags animation
function initializeSkillTags() {
  const skills = document.querySelectorAll(".skill-tag");
  skills.forEach((skill) => {
    skill.addEventListener("mouseover", (e) => {
      e.target.style.transform = `translateY(-5px) rotate(${
        Math.random() * 5 - 2.5
      }deg)`;
    });
    skill.addEventListener("mouseout", (e) => {
      e.target.style.transform = "translateY(0) rotate(0deg)";
    });
  });
}

// Scroll reveal animation
function revealOnScroll() {
  const sections = document.querySelectorAll(".section");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
}

// Dark mode toggle
function initializeDarkMode() {
  const darkModeToggle = document.getElementById("darkModeToggle");
  const body = document.body;

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme") || "light";
  body.setAttribute("data-theme", savedTheme);
  darkModeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙";

  // Toggle theme
  darkModeToggle.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    darkModeToggle.textContent = newTheme === "dark" ? "☀️" : "🌙";
  });
}

// Fun facts rotation
const funFacts = [
  "⚡ I can debug code faster than I can find my keys in the morning!",
  "🎮 I've written more lines of code than I've played video games... almost!",
  "🍕 My code runs on coffee and pizza!",
  "🌟 I speak multiple languages, including JavaScript, Python, and Sarcasm",
  "🎨 I make pixels dance and databases sing!",
];

function rotateFunFacts() {
  const funFactElement = document.querySelector(".fun-fact p");
  let currentIndex = 0;

  setInterval(() => {
    funFactElement.style.opacity = "0";
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % funFacts.length;
      funFactElement.textContent = funFacts[currentIndex];
      funFactElement.style.opacity = "1";
    }, 500);
  }, 5000);
}

// Particle background effect
function initializeParticles() {
  const canvas = document.getElementById("particleCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = 50;

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 5 + 1;
      this.speedX = Math.random() * 3 - 1.5;
      this.speedY = Math.random() * 3 - 1.5;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x > canvas.width) this.x = 0;
      if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      if (this.y < 0) this.y = canvas.height;
    }

    draw() {
      ctx.fillStyle = "rgba(76, 175, 80, 0.2)";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function init() {
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });
    requestAnimationFrame(animate);
  }

  init();
  animate();

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// Initialize everything when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Get the name element and start typing animation
  const nameElement = document.querySelector("h1.typing-effect");
  // Call initializeDarkMode immediately to set initial theme
  initializeDarkMode();

  const originalText = nameElement.textContent;
  typeWriter(nameElement, originalText);

  // Initialize other features
  initializeSkillTags();
  revealOnScroll();
  rotateFunFacts();
  initializeParticles();

  // Add smooth scroll behavior for section links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
});
