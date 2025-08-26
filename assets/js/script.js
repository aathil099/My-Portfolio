'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });


// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);


// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {
    const itemCategory = filterItems[i].dataset.category.toLowerCase();
    if (selectedValue === "all" || selectedValue === itemCategory) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};


// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    const selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");

        window.scrollTo(0, 0);
        
        if (pages[i].dataset.page === "portfolio") {
          selectValue.innerText = "All";
          filterFunc("all");

          if (lastClickedBtn) lastClickedBtn.classList.remove("active");
            filterBtn[0].classList.add("active");
            lastClickedBtn = filterBtn[0];
        }  
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}


document.addEventListener('DOMContentLoaded', function () {
  const modals = {
    'Energy Monitoring System': document.getElementById('emsModal'),
    'EMS Breakout Board': document.getElementById('emsBreakoutBoardModal'),
    'Matrix Vector Multiplier UART System': document.getElementById('mvmUartModal'),
    'Digital Stop Watch': document.getElementById('digitalSafeModal'),
    'Plant Monitoring System': document.getElementById('plantMonitoringModal'),
    'Custom ESP board': document.getElementById('customEspBoardModal'),
    'vehicle indicator circuit': document.getElementById('vehicleIndicatorModal'),
    'Carpark management system': document.getElementById('carparkManagementModal'),
    'Battery Health Monitoring System': document.getElementById('bhmsModal'),
    'CMOS Filter Design': document.getElementById('cmosFilterModal')
  };

  // Attach open modal events
  document.querySelectorAll('.project-item').forEach(item => {
    const title = item.querySelector('.project-title');
    if (title) {
      const modal = modals[title.textContent.trim()];
      if (modal) {
        item.addEventListener('click', function (e) {
          e.preventDefault();
          modal.style.display = 'block';
        });

        // Close modal on 'X'
        const closeBtn = modal.querySelector('.close');
        if (closeBtn) {
          closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
          });
        }

        // Close modal on outside click
        window.addEventListener('click', function (e) {
          if (e.target === modal) {
            modal.style.display = 'none';
          }
        });
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {

  const serviceLinks = {
    "go-to-embedded": "embedded systems",
    "go-to-firmware": "firmware development",
    "go-to-pcb": "pcb designs",
    "go-to-fpga": "asic/fpga design",
    "go-to-analog": "analog design",
    "go-to-electrical": "electrical design",
    "go-to-power": "power systems",
    "go-to-photography": "photography"
  };

  for (const id in serviceLinks) {
    const link = document.getElementById(id);
    if (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();

        // Show portfolio page
        for (let i = 0; i < pages.length; i++) {
          if (pages[i].dataset.page === "portfolio") {
            pages[i].classList.add("active");
          } else {
            pages[i].classList.remove("active");
          }
        }

        // Update navigation
        for (let i = 0; i < navigationLinks.length; i++) {
          if (navigationLinks[i].innerText.toLowerCase() === "portfolio") {
            navigationLinks[i].classList.add("active");
          } else {
            navigationLinks[i].classList.remove("active");
          }
        }

        // Set selected value
        const selectedCategory = serviceLinks[id];
        selectValue.innerText = selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);
        filterFunc(selectedCategory);

        // Highlight correct button
        lastClickedBtn.classList.remove("active");
        for (let i = 0; i < filterBtn.length; i++) {
          if (filterBtn[i].innerText.toLowerCase() === selectedCategory) {
            filterBtn[i].classList.add("active");
            lastClickedBtn = filterBtn[i];
            break;
          }
        }

        window.scrollTo(0, 0);
      });
    }
  }
});



