// ====  Header Scroll Effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('header-scrolled');
  } else {
    header.classList.remove('header-scrolled');
  }
});

// ====  Mobile Menu
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const closeMobileMenu = document.getElementById('closeMobileMenu');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.add('active');
});

closeMobileMenu.addEventListener('click', () => {
  mobileMenu.classList.remove('active');
});

// ====  Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
    mobileMenu.classList.remove('active');
  }
});

// ====  Scroll Animation Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// ====  Observe all fade-in elements
document.querySelectorAll('.fade-in-up').forEach(el => {
  el.style.animationPlayState = 'paused';
  observer.observe(el);
});

// ====  ===== Testimonials Carousel =====
const testimonials = [
  {
    quote: "Humna truly understands hair. From consultation to final result, everything felt calm, intentional, and luxurious. My color has never looked this seamless.",
    author: "Ayesha K.."
  },
  {
    quote: "The custom-blended color was exactly what I wanted, even better than my reference. You can tell she genuinely cares about hair health and detail.",
    author: "Sarah M."
  },
  {
    quote: "Finally found my go-to salon. The stylists truly understand what I want and always exceed my expectations.",
    author: "Mariam H."
  },
  {
    quote: "This is not just a salon, it’s an experience. I felt relaxed, heard, and completely taken care of. The results speak for themselves.",
    author: "Zainab R."
  },
  {
    quote: "If you’re looking for quality over quantity, this is the place. Humna’s expertise, patience, and professionalism are unmatched.",
    author: "Noor A."
  }
];

let currentTestimonial = 0;
const testimonialContainer = document.getElementById('testimonialContainer');
const dots = document.querySelectorAll('.dot');

function showTestimonial(index) {
  testimonialContainer.style.opacity = '0';

  setTimeout(() => {
    testimonialContainer.innerHTML = `
          <blockquote class="testimonial-quote mb-6">
            "${testimonials[index].quote}"
          </blockquote>
          <cite class="text-peach not-italic font-medium">
            — ${testimonials[index].author}
          </cite>
        `;
    testimonialContainer.style.opacity = '1';
  }, 300);

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentTestimonial = index;
    showTestimonial(index);
  });
});

// ====  Auto-rotate testimonials
setInterval(() => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}, 6000);
