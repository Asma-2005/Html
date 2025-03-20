// Impact Chart
const ctx = document.getElementById('impactChart');
const impactChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Meals Donated', 'Food Waste Reduced'],
    datasets: [{
      label: 'Impact',
      data: [1000, 500],
      backgroundColor: ['#4CAF50', '#FFC107'], // Green and Gold
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});

const sections = document.querySelectorAll('section');
const elements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');

const checkVisibility = () => {
  // Section Animations
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const sectionBottom = section.getBoundingClientRect().bottom;
    if (sectionTop < window.innerHeight && sectionBottom > 0) {
      section.classList.add('visible');
    }
  });

  // Element Animations
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;
    if (elementTop < window.innerHeight && elementBottom > 0) {
      element.classList.add('visible');
    }
  });
};

// Image Preview Functionality
const foodImageInput = document.getElementById('food-image');
const imagePreview = document.getElementById('image-preview');

foodImageInput.addEventListener('change', function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imagePreview.innerHTML = `<img src="${e.target.result}" alt="Food Preview">`;
    };
    reader.readAsDataURL(file);
  } else {
    imagePreview.innerHTML = '<p>No image selected.</p>';
  }
});

window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);

function initMap() {
  // Default location (e.g., Riyadh, Saudi Arabia)
  const defaultLocation = { lat: 24.7136, lng: 46.6753 };

  // Create a map centered at the default location
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: defaultLocation,
  });

  // Add a marker at the default location
  new google.maps.Marker({
    position: defaultLocation,
    map: map,
    title: "Default Location",
  });
}