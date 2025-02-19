












document.addEventListener('DOMContentLoaded', function() {
    // Store references to frequently used elements
    const menuItems = document.querySelectorAll('.menu-item');
    const submenuItems = document.querySelectorAll('.submenu-item');
    const toggleCheckbox = document.getElementById('toggle');
    const navigationContainer = document.querySelector('.navigation-container');
    const mobileMenuWrapper = document.querySelector('.mobile-menu-wrapper');
  
    // Function to toggle icon rotation
    function toggleIconRotation(link, show) {
        const icon = link.querySelector('i');
        if (icon) {
            icon.style.transform = show ? 'rotate(0deg)' : 'rotate(-90deg)';
        }
    }
    
    // Function to close all submenus
    function closeAllSubmenus() {
        document.querySelectorAll('.submenu').forEach(submenu => {
            submenu.style.display = 'none';
        });
        // Reset all icons
        document.querySelectorAll('.menu-item > a > i, .submenu-item > a > i').forEach(icon => {
            icon.style.transform = 'rotate(-90deg)';
        });
    }
  
    // Function to close mobile menu
    function closeMobileMenu() {
        toggleCheckbox.checked = false;
        closeAllSubmenus();
    }
  
    // Function to handle outside touches/clicks
    function handleOutsideInteraction(e) {
        if (window.innerWidth <= 920) {
            // Don't close if interacting with checkbox, navigation-container, or mobile menu
            if (!toggleCheckbox.contains(e.target) && 
                !navigationContainer.contains(e.target) && 
                !mobileMenuWrapper.contains(e.target)) {
                closeMobileMenu();
            }
            // Handle submenu closing
            else if (!e.target.closest('.menu-links') && !isSimpleLink(e.target)) {
                closeAllSubmenus();
            }
        }
    }
  
    // Handle mobile menu item clicks/touches
    menuItems.forEach(item => {
        const itemLink = item.querySelector('a');
        const submenu = item.querySelector('.submenu');
  
        ['click', 'touchstart'].forEach(eventType => {
            itemLink.addEventListener(eventType, function(e) {
                if (window.innerWidth <= 920) {
                    // Only prevent default if there's a submenu
                    if (submenu) {
                        e.preventDefault();
                        e.stopPropagation();
  
                        // Close other top-level submenus and reset their icons
                        menuItems.forEach(otherItem => {
                            if (otherItem !== item) {
                                const otherSubmenu = otherItem.querySelector('.submenu');
                                if (otherSubmenu) {
                                    otherSubmenu.style.display = 'none';
                                    toggleIconRotation(otherItem.querySelector('a'), false);
                                }
                            }
                        });
  
                        // Toggle current submenu
                        const isVisible = submenu.style.display === 'block';
                        closeAllSubmenus();
                        if (!isVisible) {
                            submenu.style.display = 'block';
                            toggleIconRotation(itemLink, true);
                        }
                    }
                }
            }, { passive: false });
        });
    });
  
    // Handle submenu item clicks/touches
    submenuItems.forEach(item => {
        const itemLink = item.querySelector('a');
        const nestedSubmenu = item.querySelector('.submenu');
  
        ['click', 'touchstart'].forEach(eventType => {
            itemLink.addEventListener(eventType, function(e) {
                if (window.innerWidth <= 920) {
                    // Only prevent default if there's a nested submenu
                    if (nestedSubmenu) {
                        e.preventDefault();
                        e.stopPropagation();
  
                        // Close sibling submenus and reset their icons
                        const siblings = item.parentElement.children;
                        Array.from(siblings).forEach(sibling => {
                            if (sibling !== item) {
                                const siblingSubmenu = sibling.querySelector('.submenu');
                                if (siblingSubmenu) {
                                    siblingSubmenu.style.display = 'none';
                                    const siblingLink = sibling.querySelector('a');
                                    toggleIconRotation(siblingLink, false);
                                }
                            }
                        });
  
                        // Toggle current submenu and icon
                        const isVisible = nestedSubmenu.style.display === 'block';
                        nestedSubmenu.style.display = isVisible ? 'none' : 'block';
                        toggleIconRotation(itemLink, !isVisible);
                    }
                }
            }, { passive: false });
        });
    });
  
    // Check if an element has a submenu
    function hasSubmenu(element) {
        return element.querySelector('.submenu') !== null;
    }
  
    // Check if element is a simple link
    function isSimpleLink(element) {
        return element.tagName.toLowerCase() === 'a' && !hasSubmenu(element.parentElement);
    }
  
    // Add both click and touch event listeners for outside interactions
    ['click', 'touchstart'].forEach(eventType => {
        document.addEventListener(eventType, handleOutsideInteraction, { passive: false });
    });
  
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 920) {
                // Reset all submenu displays and icons
                document.querySelectorAll('.submenu').forEach(submenu => {
                    submenu.style = '';
                });
                document.querySelectorAll('.menu-item > a > i, .submenu-item > a > i').forEach(icon => {
                    icon.style.transform = '';
                });
            }
        }, 250);
    });
  
    // Handle mobile menu toggle checkbox
    toggleCheckbox.addEventListener('change', function() {
        if (!this.checked) {
            closeAllSubmenus();
        }
    });
  });
  
  // Position aware button animation
  document.querySelector('.btn-animated').addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    this.querySelector('span').style.left = x + 'px';
    this.querySelector('span').style.top = y + 'px';
  });



 //  aboutus


 document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.video-slide');
    const videos = document.querySelectorAll('.video-slide video');
    let currentSlide = 0;

    // Initialize all videos
    videos.forEach(video => {
        // Ensure video is muted to allow autoplay
        video.muted = true;
        // Start loading the video
        video.load();
    });

    // Play the first video
    videos[0].play().catch(function(error) {
        console.log("Video play failed:", error);
    });

    function nextSlide() {
        // Remove active class from current slide
        slides[currentSlide].classList.remove('active');
        
        // Pause current video
        videos[currentSlide].pause();
        
        // Move to next slide
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Add active class to new slide
        slides[currentSlide].classList.add('active');
        
        // Play new video
        videos[currentSlide].currentTime = 0;
        videos[currentSlide].play().catch(function(error) {
            console.log("Video play failed:", error);
        });
    }

    // Change slide every 8 seconds
    setInterval(nextSlide, 8000);

    // Accordion functionality
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
});



// const images = [
//     'images/bg-finance-team.jpg',
//     'images/bg-hand-mobile.jpg',
//     'images/bg-man-sitting.jpg'
// ];

// let currentIndex = 0;
// const imageElement = document.querySelector('.showcase__img');

// function rotateImage() {
//     currentIndex = (currentIndex + 1) % images.length;
//     imageElement.style.opacity = '0';
    
//     setTimeout(() => {
//         imageElement.src = images[currentIndex];
//         imageElement.style.opacity = '1';
//     }, 500);
// }

// setInterval(rotateImage, 3000);

// document.querySelectorAll('.accordion-header').forEach(button => {
//     button.addEventListener('click', () => {
//         const currentlyActive = document.querySelector('.accordion-header.active');
//         const content = button.nextElementSibling;
        
//         if (currentlyActive && currentlyActive !== button) {
//             currentlyActive.classList.remove('active');
//             currentlyActive.nextElementSibling.classList.remove('active');
//             currentlyActive.nextElementSibling.style.maxHeight = '0px';
//         }
        
//         button.classList.toggle('active');
//         content.classList.toggle('active');
        
//         if (content.classList.contains('active')) {
//             content.style.maxHeight = content.scrollHeight + 'px';
//         } else {
//             content.style.maxHeight = '0px';
//         }
//     });
// });






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
    

 




// testimonials
class MasonryGrid {
    constructor(container, options = {}) {
        this.container = container;
        this.cards = Array.from(container.children);
        this.gutter = options.gutter || 24;
        this.columns = 4;
        this.columnHeights = [];
        this.isAnimating = false;

        // Initialize
        this.init();
        this.bindEvents();
    }

    init() {
        this.container.style.position = 'relative';
        this.updateColumnCount();
        this.positionCards();
        this.container.classList.add('initialized');
        
        // Set container height
        const maxHeight = Math.max(...this.columnHeights);
        this.container.style.height = maxHeight + 'px';
    }

    updateColumnCount() {
        if (window.innerWidth <= 640) {
            this.columns = 1;
        } else if (window.innerWidth <= 1024) {
            this.columns = 2;
        } else {
            this.columns = 4;
        }
        
        // Reset column heights
        this.columnHeights = Array(this.columns).fill(0);
    }

    getShortestColumn() {
        return this.columnHeights.indexOf(Math.min(...this.columnHeights));
    }

    positionCards() {
        this.updateColumnCount();
        const cardWidth = (this.container.offsetWidth - (this.gutter * (this.columns - 1))) / this.columns;

        this.cards.forEach((card, index) => {
            const column = this.getShortestColumn();
            const x = column * (cardWidth + this.gutter);
            const y = this.columnHeights[column];

            card.style.width = cardWidth + 'px';
            card.style.transform = `translate(${x}px, ${y}px)`;
            card.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out';

            // Update column height
            this.columnHeights[column] += card.offsetHeight + this.gutter;
        });

        // Update container height
        const maxHeight = Math.max(...this.columnHeights);
        this.container.style.height = maxHeight + 'px';
    }

    animateCards() {
        if (this.isAnimating) return;
        this.isAnimating = true;

        this.cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('visible');
                if (index === this.cards.length - 1) {
                    this.isAnimating = false;
                }
            }, index * 150);
        });
    }

    resetCards() {
        this.cards.forEach(card => {
            card.classList.remove('visible');
        });
        this.isAnimating = false;
    }

    bindEvents() {
        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.positionCards();
            }, 100);
        });

        // Handle scroll animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCards();
                } else {
                    this.resetCards();
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        observer.observe(this.container);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.testimonials-grid');
    new MasonryGrid(grid, {
        gutter: 24
    });
});


// document.addEventListener('DOMContentLoaded', () => {
//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach(entry => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add('visible');
//         }
//       });
//     }, {
//       threshold: 0.1,
//       rootMargin: '50px'
//     });
  
//     document.querySelectorAll('.testimonial-card').forEach(card => {
//       observer.observe(card);
//     });
//   });