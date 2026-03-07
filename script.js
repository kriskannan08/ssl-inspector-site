const APP_ID = "6759235383";
const LOOKUP_URL = `https://itunes.apple.com/lookup?id=${APP_ID}&country=us`;

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

function observeShotImages() {
  document.querySelectorAll(".shots img").forEach((image, index) => {
    image.style.transitionDelay = `${index * 80}ms`;
    observer.observe(image);
  });
}

function renderScreenshots(urls) {
  const gallery = document.getElementById("shots");
  const heroImage = document.querySelector(".hero-shot img");

  if (!gallery || !urls.length) {
    observeShotImages();
    return;
  }

  const markup = urls
    .map(
      (url, index) =>
        `<img src="${url}" alt="SSL Inspector screenshot ${index + 1}" loading="lazy" />`
    )
    .join("");

  gallery.innerHTML = markup;

  if (heroImage && urls[0]) {
    heroImage.src = urls[0];
  }

  observeShotImages();
}

async function loadStoreScreenshots() {
  try {
    const response = await fetch(LOOKUP_URL);
    if (!response.ok) {
      throw new Error(`Lookup failed: ${response.status}`);
    }

    const payload = await response.json();
    const app = payload?.results?.[0];
    const screenshots = Array.isArray(app?.screenshotUrls) ? app.screenshotUrls : [];

    renderScreenshots(screenshots);
  } catch {
    observeShotImages();
  }
}

loadStoreScreenshots();
