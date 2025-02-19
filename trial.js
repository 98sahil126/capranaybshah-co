//  aboutus
const images = [
    'images/bg-finance-team.jpg',
    'images/bg-hand-mobile.jpg',
    'images/bg-man-sitting.jpg'
];

let currentIndex = 0;
const imageElement = document.querySelector('.showcase__img');

function rotateImage() {
    currentIndex = (currentIndex + 1) % images.length;
    imageElement.style.opacity = '0';
    
    setTimeout(() => {
        imageElement.src = images[currentIndex];
        imageElement.style.opacity = '1';
    }, 500);
}

setInterval(rotateImage, 3000);

document.querySelectorAll('.accordion-header').forEach(button => {
    button.addEventListener('click', () => {
        const currentlyActive = document.querySelector('.accordion-header.active');
        const content = button.nextElementSibling;
        
        if (currentlyActive && currentlyActive !== button) {
            currentlyActive.classList.remove('active');
            currentlyActive.nextElementSibling.classList.remove('active');
            currentlyActive.nextElementSibling.style.maxHeight = '0px';
        }
        
        button.classList.toggle('active');
        content.classList.toggle('active');
        
        if (content.classList.contains('active')) {
            content.style.maxHeight = content.scrollHeight + 'px';
        } else {
            content.style.maxHeight = '0px';
        }
    });
});






// number counter animation

const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      startCounterAnimation(entry.target);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 1 });

counters.forEach((counter) => {
  counter.innerText = "0";
  observer.observe(counter);
});

function startCounterAnimation(counter) {
  const target = +counter.getAttribute("data-target");
  let count = 0;
  const increment = target / 200;

  function updateCounter() {
    if (count < target) {
      count += increment;
      counter.innerText = `${Math.ceil(count)}+`;
      setTimeout(updateCounter, 1);
    } else {
      counter.innerText = `${target}+`;
    }
  }

  updateCounter();
}
