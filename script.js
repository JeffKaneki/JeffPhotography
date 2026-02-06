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
  