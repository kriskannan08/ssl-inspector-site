const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.22 }
);

document.querySelectorAll(".shots img").forEach((image, index) => {
  image.style.transitionDelay = `${index * 80}ms`;
  observer.observe(image);
});
