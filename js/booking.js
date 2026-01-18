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


// ====  Service Data
const services = {
  hair: [
    {
      name: 'Haircut by Humna Feroze',
      duration: '45 min',
      price: 'PKR 5,000/-'
    },
    {
      name: 'Haircut by Inaaya Fazail',
      duration: '45 min',
      price: 'PKR 5,000/-'
    },
  ],

  beauty: [
    {
      name: 'Grey Coverage (Ammonia-Free)',
      duration: '60 min',
      price: 'PKR 6,500/-'
    },
    {
      name: 'Grey Coverage (Ammonia-Based)',
      duration: '50 min',
      price: 'PKR 5,500/-'
    },
  ],

  spa: [
    {
      name: 'One Tone Dye (Ammonia-Based)',
      duration: '90 min',
      price: 'PKR 8,000/-'
    },
    {
      name: 'One Tone Dye (Ammonia-Free)',
      duration: '100 min',
      price: 'PKR 10,000/-'
    },
    {
      name: 'Highlights',
      duration: '150 min',
      price: 'PKR 12,000/-'
    },
    {
      name: 'Lowlights',
      duration: '150 min',
      price: 'PKR 12,000/-'
    },
    {
      name: 'Babylights',
      duration: '180 min',
      price: 'PKR 14,000/-'
    },
    {
      name: 'Balayage',
      duration: '180 min',
      price: 'PKR 14,000/-'
    },
    {
      name: 'Ombre',
      duration: '200 min',
      price: 'PKR 16,000/-'
    },
    {
      name: 'Fashion Colors',
      duration: '240 min',
      price: 'PKR 18,000/-'
    },
  ],

  nails: [
    {
      name: 'Glossing',
      duration: '30 min',
      price: 'PKR 5,000/-'
    },
    {
      name: 'Toning',
      duration: '30–45 min',
      price: 'PKR 6,000 – 12,000/-'
    },
    {
      name: 'Vitamina Treatment',
      duration: '25 min',
      price: 'PKR 2,000/-'
    },
    {
      name: 'Bond Builder Treatment',
      duration: '30 min',
      price: 'PKR 2,000/-'
    },
  ]
};
// ====  Available time slots
const timeSlots = [
  '12:00 PM', '12:30 PM',
  '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM',
  '4:00 PM', '4:30 PM',
  '5:00 PM', '5:30 PM',
  '6:00 PM', '6:30 PM',
  '7:00 PM', '7:30 PM',
  '8:00 PM', '8:30 PM',
  '9:00 PM', '9:30 PM',
  '10:00 PM'
];


// ====  Booking State
let bookingData = {
  category: null,
  service: null,
  date: null,
  time: null,
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  notes: '',
  smsReminder: false
};

let currentStep = 1;
let currentDate = new Date();
let selectedDate = null;
let selectedTime = null;

// ====  DOM Elements
const steps = document.querySelectorAll('.booking-step');
const stepIndicators = document.querySelectorAll('.step');
const stepLines = document.querySelectorAll('.step-line');

// ====  Step Navigation Functions
function showStep(stepNum) {
  steps.forEach(step => step.classList.add('hidden'));
  document.getElementById(`step-${stepNum}`).classList.remove('hidden');

  stepIndicators.forEach((indicator, index) => {
    indicator.classList.remove('active', 'completed');
    if (index + 1 < stepNum) {
      indicator.classList.add('completed');
    } else if (index + 1 === stepNum) {
      indicator.classList.add('active');
    }
  });

  stepLines.forEach((line, index) => {
    line.classList.remove('completed');
    if (index + 1 < stepNum) {
      line.classList.add('completed');
    }
  });

  currentStep = stepNum;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showSuccess() {
  steps.forEach(step => step.classList.add('hidden'));
  document.getElementById('step-success').classList.remove('hidden');

  stepIndicators.forEach(indicator => {
    indicator.classList.remove('active');
    indicator.classList.add('completed');
  });
  stepLines.forEach(line => line.classList.add('completed'));

  // ====  Generate confirmation number
  const confNum = 'AZ-2024-' + Math.random().toString(36).substr(2, 4).toUpperCase();
  document.getElementById('confirmation-number').textContent = confNum;
}

// ====  Step 1: Service Selection
document.querySelectorAll('input[name="service-category"]').forEach(input => {
  input.addEventListener('change', function () {
    const category = this.value;
    bookingData.category = category;

    // ====  Update UI
    document.querySelectorAll('.service-option').forEach(opt => opt.classList.remove('selected'));
    this.closest('.service-option').classList.add('selected');

    // ====  Show specific service dropdown
    const container = document.getElementById('specific-service-container');
    const select = document.getElementById('specific-service');

    container.style.display = 'block';
    select.innerHTML = '<option value="">Choose a service...</option>';

    services[category].forEach((service, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = `${service.name} - ${service.duration} - ${service.price}`;
      select.appendChild(option);
    });

    document.getElementById('step-1-next').disabled = true;
  });
});

document.getElementById('specific-service').addEventListener('change', function () {
  if (this.value !== '') {
    bookingData.service = services[bookingData.category][parseInt(this.value)];
    document.getElementById('step-1-next').disabled = false;
  } else {
    bookingData.service = null;
    document.getElementById('step-1-next').disabled = true;
  }
});

document.getElementById('step-1-next').addEventListener('click', function () {
  if (bookingData.service) {
    showStep(2);
    initCalendar();
  }
});

// ====  Step 2: Calendar
function initCalendar() {
  renderCalendar();
}

function renderCalendar() {
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  document.getElementById('current-month').textContent =
    `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

  const calendarGrid = document.getElementById('calendar-days');

  // ====  Clear existing days (keep headers)
  const headers = calendarGrid.querySelectorAll('.calendar-day-header');
  calendarGrid.innerHTML = '';
  headers.forEach(h => calendarGrid.appendChild(h));

  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const startingDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // ====  Empty cells
  for (let i = 0; i < startingDay; i++) {
    const emptyCell = document.createElement('div');
    emptyCell.className = 'calendar-day empty';
    calendarGrid.appendChild(emptyCell);
  }

  // ====  Days
  for (let day = 1; day <= lastDay.getDate(); day++) {
    const dayCell = document.createElement('button');
    dayCell.className = 'calendar-day';
    dayCell.textContent = day;

    const cellDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

    // ====  Check if past date
    if (cellDate < today) {
      dayCell.classList.add('disabled');
    } else {
      // ====  Check if today
      if (cellDate.getTime() === today.getTime()) {
        dayCell.classList.add('today');
      }

      // ====  Check if selected
      if (selectedDate &&
        cellDate.getDate() === selectedDate.getDate() &&
        cellDate.getMonth() === selectedDate.getMonth() &&
        cellDate.getFullYear() === selectedDate.getFullYear()) {
        dayCell.classList.add('selected');
      }

      dayCell.addEventListener('click', function () {
        document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
        this.classList.add('selected');
        selectedDate = cellDate;
        bookingData.date = cellDate;
        renderTimeSlots();
        updateStep2Button();
      });
    }

    calendarGrid.appendChild(dayCell);
  }
}

function renderTimeSlots() {
  const container = document.getElementById('time-slots');
  const title = document.getElementById('time-slots-title');

  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  title.textContent = `Available Times for ${selectedDate.toLocaleDateString('en-US', options)}`;

  container.innerHTML = '';

  // ====  Simulate some unavailable slots
  const unavailable = [2, 5, 8, 11, 15];

  timeSlots.forEach((slot, index) => {
    const slotBtn = document.createElement('button');
    slotBtn.className = 'time-slot';
    slotBtn.textContent = slot;

    if (unavailable.includes(index)) {
      slotBtn.classList.add('disabled');
      slotBtn.disabled = true;
    } else {
      slotBtn.addEventListener('click', function () {
        document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('selected'));
        this.classList.add('selected');
        selectedTime = slot;
        bookingData.time = slot;
        updateStep2Button();
      });
    }

    if (selectedTime === slot) {
      slotBtn.classList.add('selected');
    }

    container.appendChild(slotBtn);
  });
}

function updateStep2Button() {
  document.getElementById('step-2-next').disabled = !(selectedDate && selectedTime);
}

document.getElementById('prev-month').addEventListener('click', function () {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

document.getElementById('next-month').addEventListener('click', function () {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

document.getElementById('step-2-back').addEventListener('click', () => showStep(1));
document.getElementById('step-2-next').addEventListener('click', () => {
  if (selectedDate && selectedTime) {
    showStep(3);
  }
});

// ====  Step 3: Personal Details
const formInputs = ['first-name', 'last-name', 'email', 'phone'];

formInputs.forEach(id => {
  document.getElementById(id).addEventListener('input', validateStep3);
});

function validateStep3() {
  const firstName = document.getElementById('first-name').value.trim();
  const lastName = document.getElementById('last-name').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('phone').value.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = firstName && lastName && emailRegex.test(email) && phone.length >= 10;

  document.getElementById('step-3-next').disabled = !isValid;

  if (isValid) {
    bookingData.firstName = firstName;
    bookingData.lastName = lastName;
    bookingData.email = email;
    bookingData.phone = phone;
    bookingData.notes = document.getElementById('notes').value.trim();
    bookingData.smsReminder = document.getElementById('sms-reminder').checked;
  }
}

document.getElementById('step-3-back').addEventListener('click', () => showStep(2));
document.getElementById('step-3-next').addEventListener('click', () => {
  updateSummary();
  showStep(4);
});

// ====  Step 4: Confirmation
function updateSummary() {
  document.getElementById('summary-service').textContent = bookingData.service.name;
  document.getElementById('summary-date').textContent = bookingData.date.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  document.getElementById('summary-time').textContent = bookingData.time;
  document.getElementById('summary-duration').textContent = bookingData.service.duration;
  document.getElementById('summary-price').textContent = bookingData.service.price;
  document.getElementById('summary-name').textContent = `${bookingData.firstName} ${bookingData.lastName}`;
  document.getElementById('summary-email').textContent = bookingData.email;
  document.getElementById('summary-phone').textContent = bookingData.phone;
}

document.getElementById('step-4-back').addEventListener('click', () => showStep(3));
document.getElementById('confirm-booking').addEventListener('click', () => {
  // ====  In a real app, you would submit to a server here
  showSuccess();
});

