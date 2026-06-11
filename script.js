// ================= EMAILJS INIT =================
(function () {
  emailjs.init("-yQtk4CVfGVp3wJkP");
})();

// ================= DOM READY =================
document.addEventListener("DOMContentLoaded", () => {

  // Enable hardware acceleration for smooth animations
  document.body.style.willChange = "auto";

  // ================= RENDER GALLERY FROM DATA =================
  const galleryCategories = [
    { id: "all", label: "All Stories" },
    { id: "debut", label: "Debut" },
    { id: "wedding", label: "Wedding" },
    { id: "memorial", label: "Memorial" }
  ];

  function getCollectionCategory(item) {
    const text = `${item.title} ${item.description}`.toLowerCase();

    if (text.includes("wedding")) return "wedding";
    if (text.includes("memory") || text.includes("memorial")) return "memorial";
    if (text.includes("debut") || text.includes("@18")) return "debut";

    return "portrait";
  }

  function renderFilters() {
    const filtersContainer = document.getElementById("galleryFilters");
    if (!filtersContainer) return;

    filtersContainer.innerHTML = "";

    galleryCategories.forEach((category) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `filter-btn${category.id === "all" ? " active" : ""}`;
      button.dataset.filter = category.id;
      button.textContent = category.label;
      filtersContainer.appendChild(button);
    });
  }

  function renderGallery() {
    const galleryContainer = document.getElementById("gallery");
    galleryContainer.innerHTML = "";

    galleryData.forEach((item, itemIndex) => {
      const category = getCollectionCategory(item);
      const card = document.createElement("article");
      card.className = "collection-card collection";
      card.tabIndex = 0;
      card.role = "button";
      card.style.setProperty("--card-delay", `${Math.min(itemIndex * 45, 420)}ms`);
      card.dataset.cover = item.coverImage;
      card.dataset.images = JSON.stringify(item.images);
      card.dataset.title = item.title;
      card.dataset.desc = item.description;
      card.dataset.category = category;

      const photoCount = item.images.length + 1;

      card.innerHTML = `
        <div class="collection-media">
          <img src="${item.coverImage}" alt="${item.title}" loading="lazy">
          <div class="collection-shine"></div>
        </div>
        <div class="collection-copy">
          <span class="collection-type">${category}</span>
          <h3>${item.title}</h3>
          <p>${photoCount} photos</p>
        </div>
        <span class="collection-open" aria-hidden="true">
          <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </span>
      `;

      galleryContainer.appendChild(card);
    });
  }

  // Render gallery on page load
  renderFilters();
  renderGallery();

  document.getElementById("galleryFilters").addEventListener("click", (e) => {
    const filterButton = e.target.closest(".filter-btn");
    if (!filterButton) return;

    const activeFilter = filterButton.dataset.filter;
    document.querySelectorAll(".filter-btn").forEach((button) => {
      button.classList.toggle("active", button === filterButton);
    });

    document.querySelectorAll(".collection-card").forEach((card) => {
      const shouldShow = activeFilter === "all" || card.dataset.category === activeFilter;
      card.classList.toggle("is-hidden", !shouldShow);
    });
  });

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
  const counter = document.getElementById("lightboxCounter");
  const thumbs = document.getElementById("lightboxThumbs");

  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");

  let images = [];
  let index = 0;
  let autoPlay, pauseTimer;
  let isAnimating = false;

  function updateLightboxMeta() {
    counter.textContent = `${index + 1} / ${images.length}`;
    thumbs.querySelectorAll(".lightbox-thumb").forEach((thumb, thumbIndex) => {
      thumb.classList.toggle("active", thumbIndex === index);
      thumb.setAttribute("aria-current", thumbIndex === index ? "true" : "false");
    });
  }

  function renderLightboxThumbs() {
    thumbs.innerHTML = "";

    images.forEach((imageSrc, imageIndex) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "lightbox-thumb";
      button.setAttribute("aria-label", `View image ${imageIndex + 1}`);
      button.innerHTML = `<img src="${imageSrc}" alt="">`;

      button.addEventListener("click", () => {
        if (imageIndex === index || isAnimating) return;

        const direction = imageIndex > index ? "next" : "prev";
        index = imageIndex;
        showImage(direction);
        pauseAuto();
      });

      thumbs.appendChild(button);
    });

    updateLightboxMeta();
  }

  function preloadNearbyImages() {
    if (!images.length) return;

    const nextImage = new Image();
    const previousImage = new Image();
    nextImage.src = images[(index + 1) % images.length];
    previousImage.src = images[(index - 1 + images.length) % images.length];
  }

  function loadLightboxImage(src, onReady) {
    let isReady = false;

    const finish = () => {
      if (isReady) return;
      isReady = true;
      img.onload = null;
      img.onerror = null;
      onReady();
      updateLightboxMeta();
      preloadNearbyImages();
    };

    img.onload = finish;

    img.onerror = () => {
      img.onload = null;
      img.onerror = null;
      isAnimating = false;
    };

    img.src = src;

    if (img.complete) {
      requestAnimationFrame(finish);
    }
  }

  // SHOW IMAGE WITH DIRECTIONAL ANIMATION
  function showImage(direction = 'auto') {
    if (isAnimating) return;
    isAnimating = true;

    // Remove previous animation classes
    img.classList.remove('slideInRight', 'slideInLeft', 'slideOutLeft', 'slideOutRight', 'fade', 'zoomed');

    if (direction === 'auto') {
      img.classList.add('fade');

      setTimeout(() => {
        loadLightboxImage(images[index], () => {
          img.classList.remove('fade');
          isAnimating = false;
        });
      }, 300);

      return;
    }

    // Trigger exit animation
    if (direction === 'next') {
      img.classList.add('slideOutLeft');
    } else {
      img.classList.add('slideOutRight');
    }

    setTimeout(() => {
      loadLightboxImage(images[index], () => {
        img.classList.remove('slideOutLeft', 'slideOutRight');
        void img.offsetWidth;

        img.classList.add(direction === 'next' ? 'slideInRight' : 'slideInLeft');

        setTimeout(() => {
          img.classList.remove('slideInRight', 'slideInLeft');
          isAnimating = false;
        }, 400);
      });
    }, 300);
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
  function openCollection(el) {
    img.classList.remove('slideInRight', 'slideInLeft', 'slideOutLeft', 'slideOutRight', 'zoomed');
    img.classList.add("fade");
    img.src = "";

    setTimeout(() => {
      const cover = el.dataset.cover;
      const set = JSON.parse(el.dataset.images);

      images = [cover, ...set];
      index = 0;

      title.textContent = el.dataset.title;
      desc.textContent = el.dataset.desc;
      img.alt = el.dataset.title;

      renderLightboxThumbs();
      loadLightboxImage(images[0], () => {
        img.classList.remove("fade");
      });

      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
      startAuto();
    }, 180);
  }

  document.querySelectorAll(".collection").forEach(el => {
    el.addEventListener("click", () => openCollection(el));
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openCollection(el);
      }
    });
  });

  // NAVIGATION WITH DEBOUNCE
  let navDebounce = false;
  
  nextBtn.onclick = () => {
    if (!navDebounce) {
      navDebounce = true;
      index = (index + 1) % images.length;
      showImage('next');
      pauseAuto();
      setTimeout(() => { navDebounce = false; }, 720);
    }
  };

  prevBtn.onclick = () => {
    if (!navDebounce) {
      navDebounce = true;
      index = (index - 1 + images.length) % images.length;
      showImage('prev');
      pauseAuto();
      setTimeout(() => { navDebounce = false; }, 720);
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
    clearTimeout(pauseTimer);
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
  img.addEventListener("click", (e) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    
    if (tapLength < 300 && tapLength > 0) {
      // Double tap detected
      e.preventDefault();
    }
    
    img.classList.toggle("zoomed");
    lastTap = currentTime;
  });

  // Prevent context menu on images for better UX
  document.querySelectorAll("img").forEach(img => {
    img.addEventListener("contextmenu", (e) => e.preventDefault());
  });

});
