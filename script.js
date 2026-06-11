// ================= EMAILJS INIT =================
(function () {
  emailjs.init("-yQtk4CVfGVp3wJkP");
})();

// ================= DOM READY =================
document.addEventListener("DOMContentLoaded", () => {

  // Enable hardware acceleration for smooth animations
  document.body.style.willChange = "auto";

  // ================= RENDER GALLERY FROM DATA =================
  function renderGallery() {
    const galleryContainer = document.getElementById("gallery");
    
    galleryData.forEach((item) => {
      const imgElement = document.createElement("img");
      imgElement.className = "collection";
      imgElement.src = item.coverImage;
      imgElement.alt = item.title;
      imgElement.dataset.cover = item.coverImage;
      imgElement.dataset.images = JSON.stringify(item.images);
      imgElement.dataset.title = item.title;
      imgElement.dataset.desc = item.description;
      
      galleryContainer.appendChild(imgElement);
    });
  }
  
  // Render gallery on page load
  renderGallery();

  // ================= BOOKING FORM =================
  const form = document.getElementById("bookingForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const bookingId = `BK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

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

    emailjs.send("jeffphotography", "template_yy5r29m", formData)
      .then(() => {
        document.getElementById("confirmation").innerText =
          "Booking submitted! ID: " + bookingId;
        this.reset();
      })
      .catch(() => alert("Failed to send booking."));
  });

  // ================= MODAL =================
  const modal = document.getElementById("bookingModal");

  document.getElementById("openBooking").onclick = () => {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  };
  
  const closeBookingFn = () => {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  };

  document.getElementById("closeBooking").onclick = closeBookingFn;

  window.onclick = (e) => {
    if (e.target === modal) {
      closeBookingFn();
    }
  };

  // ================= LIGHTBOX =================
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightboxImage");
  const title = document.getElementById("imgTitle");
  const desc = document.getElementById("imgDesc");

  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");

  let images = [];
  let index = 0;
  let autoPlay, pauseTimer;
  let isAnimating = false;
  let lastDirection = 'next'; // Track direction for animation

  // SHOW IMAGE WITH DIRECTIONAL ANIMATION
  function showImage(direction = 'auto') {
    if (isAnimating) return;
    isAnimating = true;
    
    // Remove previous animation classes
    img.classList.remove('slideInRight', 'slideInLeft', 'slideOutLeft', 'slideOutRight', 'fade');
    
    // Trigger exit animation
    if (direction === 'next') {
      img.classList.add('slideOutLeft');
    } else if (direction === 'prev') {
      img.classList.add('slideOutRight');
    } else {
      img.classList.add('fade');
    }

    setTimeout(() => {
      img.src = images[index];
      
      // Trigger entry animation
      if (direction === 'next') {
        img.classList.remove('slideOutLeft');
        img.classList.add('slideInRight');
      } else if (direction === 'prev') {
        img.classList.remove('slideOutRight');
        img.classList.add('slideInLeft');
      } else {
        img.classList.remove('fade');
      }
      
      lastDirection = direction;
      isAnimating = false;
    }, direction === 'auto' ? 0 : 150);
  }

  // AUTO PLAY
  function startAuto() {
    clearInterval(autoPlay);
    autoPlay = setInterval(() => {
      index = (index + 1) % images.length;
      showImage('auto');
    }, 4000);
  }

  function pauseAuto() {
    clearInterval(autoPlay);
    clearTimeout(pauseTimer);

    pauseTimer = setTimeout(startAuto, 8000);
  }

  // OPEN COLLECTION
  document.querySelectorAll(".collection").forEach(el => {
    el.onclick = () => {

      img.classList.remove('slideInRight', 'slideInLeft', 'slideOutLeft', 'slideOutRight');
      img.classList.add("fade");
      img.src = "";

      setTimeout(() => {
        const cover = el.dataset.cover;
        const set = JSON.parse(el.dataset.images);

        images = [cover, ...set];
        index = 0;

        title.textContent = el.dataset.title;
        desc.textContent = el.dataset.desc;

        img.src = images[0];
        img.classList.remove("fade");

        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
        startAuto();
      }, 250);
    };
  });

  // NAVIGATION WITH DEBOUNCE
  let navDebounce = false;
  
  nextBtn.onclick = () => {
    if (!navDebounce) {
      navDebounce = true;
      index = (index + 1) % images.length;
      showImage('next');
      pauseAuto();
      setTimeout(() => { navDebounce = false; }, 400);
    }
  };

  prevBtn.onclick = () => {
    if (!navDebounce) {
      navDebounce = true;
      index = (index - 1 + images.length) % images.length;
      showImage('prev');
      pauseAuto();
      setTimeout(() => { navDebounce = false; }, 400);
    }
  };

  // KEYBOARD CONTROL
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;

    if (e.key === "ArrowRight") {
      nextBtn.click();
    } else if (e.key === "ArrowLeft") {
      prevBtn.click();
    } else if (e.key === "Escape") {
      closeLightbox();
    }
  });

  function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "auto";
    clearInterval(autoPlay);
    isAnimating = false;
  }

  document.getElementById("lightboxClose").onclick = closeLightbox;

  lightbox.onclick = (e) => {
    if (e.target === lightbox) closeLightbox();
  };

  // ================= ANIMATIONS =================
  window.onload = () => {
    // Trigger hero animations
    const heroContent = document.querySelector(".hero-content");
    if (heroContent) {
      heroContent.classList.add("show");
    }
  };

  // Optimized scroll reveal with Intersection Observer
  const observerOptions = {
    threshold: 0.05,
    rootMargin: "0px 0px -30px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".reveal").forEach(el => {
    observer.observe(el);
  });

  // SMOOTH ZOOM FEATURE WITH PREVENTION OF DOUBLE-TAP ZOOM
  let lastTap = 0;
  lightboxImage.addEventListener("click", (e) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    
    if (tapLength < 300 && tapLength > 0) {
      // Double tap detected
      e.preventDefault();
    }
    
    lightboxImage.classList.toggle("zoomed");
    lastTap = currentTime;
  });

  // Prevent context menu on images for better UX
  document.querySelectorAll("img").forEach(img => {
    img.addEventListener("contextmenu", (e) => e.preventDefault());
  });

});