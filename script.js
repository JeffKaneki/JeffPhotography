(function () {
    emailjs.init("-yQtk4CVfGVp3wJkP");
})();

document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const bookingId =
    "BK-" +
    new Date().getFullYear() +
    "-" +
    Math.floor(1000 + Math.random() * 9000);

  const formData = {
    booking_id: bookingId,
    name: this.name.value,
    email: this.email.value,
    phone: this.phone.value,
    service: this.service.value,
    location: this.location.value,
    date: this.date.value,
    time: this.time.value,
    details: this.details.value,
    budget: this.budget.value,
  };

  emailjs
    .send("jeffphotography", "template_yy5r29m", formData)
    .then(() => {
      document.getElementById("confirmation").innerText =
        "Booking submitted! Your Booking ID is: " + bookingId;
      this.reset();
    })
    .catch(() => {
      alert("Failed to send booking.");
    });
});
  
  // Modal logic
const openBtn = document.getElementById("openBooking");
const closeBtn = document.getElementById("closeBooking");
const modal = document.getElementById("bookingModal");

openBtn.addEventListener("click", () => {
  modal.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});

document.addEventListener("DOMContentLoaded", () => {

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxClose = document.getElementById("lightboxClose");

  const imgTitle = document.getElementById("imgTitle");
  const imgDesc = document.getElementById("imgDesc");

  document.querySelectorAll(".lightbox-img").forEach(img => {
    img.addEventListener("click", () => {
      lightboxImage.src = img.src;

      // GET DATA
      imgTitle.textContent = img.getAttribute("data-title");
      imgDesc.textContent = img.getAttribute("data-desc");

      lightbox.classList.add("active");
    });
  });

  lightboxClose.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("active");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      lightbox.classList.remove("active");
    }
  });

  // INTRO ANIMATION
  window.addEventListener("load", () => {
    document.querySelector(".hero-content").classList.add("show");
  });

  // SCROLL REVEAL
  function revealOnScroll() {
    const reveals = document.querySelectorAll(".reveal");

    reveals.forEach((el) => {
      const windowHeight = window.innerHeight;
      const elementTop = el.getBoundingClientRect().top;

      if (elementTop < windowHeight - 100) {
        el.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);

});
  
