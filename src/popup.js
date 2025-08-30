// Popup functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize popup functionality
  initPopup();

  // Initialize toast functionality for Apply Now buttons
  initToastForApplyButtons();

  // Initialize mobile popups
  initMobilePopups();
});

function initPopup() {
  // Find ALL popup-button elements that will trigger the popup
  const popupButtons = document.querySelectorAll('.popup-button');

  if (popupButtons.length > 0) {
    // Add click event listener to ALL popup buttons
    popupButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default link behavior
        openPopup('filter-popup');
      });
    });
  }

  // Close popup when clicking the close button or overlay
  const closeButtons = document.querySelectorAll('.popup-close, .popup-overlay');
  closeButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      // Only close if clicking the overlay itself or the close button
      if (e.target === this || e.target.closest('.popup-close')) {
        const popupId = e.target.closest('.popup-overlay').id;
        closePopup(popupId);
      }
    });
  });

  // Handle the Apply button click in the popup
  const applyButton = document.querySelector('.apply-now-button');
  if (applyButton) {
    applyButton.addEventListener('click', function(e) {
      e.preventDefault(); // Prevent default form submission

      // Close the popup
      const popupId = e.target.closest('.popup-overlay').id;
      closePopup(popupId);

      // Show toast notification
      showToast();

      // Scroll to top of the page
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

function initToastForApplyButtons() {
  // Get all Apply Now buttons
  const applyButtons = document.querySelectorAll('.apply-now-button');
  const toastBlock = document.querySelector('.toast-block');

  if (applyButtons.length > 0 && toastBlock) {
    applyButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default link behavior
        showToast(toastBlock);
      });
    });

    // Add event listener to close toast when clicking the close button
    const toastCloseButton = toastBlock.querySelector('button');
    if (toastCloseButton) {
      toastCloseButton.addEventListener('click', function() {
        hideToast(toastBlock);
      });
    }

    // Auto-hide the toast after 5 seconds
    let toastTimeout;
    function showToast(toast) {
      // First clear any existing timeout
      if (toastTimeout) {
        clearTimeout(toastTimeout);
      }

      // Position the toast at the bottom of the viewport
      toast.style.display = 'block';
      toast.style.opacity = '0';
      toast.style.transition = 'all 0.3s ease';

      // Trigger reflow
      void toast.offsetWidth;

      // Show toast with animation
      toast.style.opacity = '1';

      // Set timeout to hide the toast
      toastTimeout = setTimeout(() => {
        hideToast(toast);
      }, 5000);

      // Start progress bar animation
      const progressBar = toast.querySelector('em');
      if (progressBar) {
        progressBar.style.transition = 'width 5s linear';
        progressBar.style.width = '0';
      }
    }

    function hideToast(toast) {
      toast.style.opacity = '0';

      // Reset progress bar
      const progressBar = toast.querySelector('em');
      if (progressBar) {
        progressBar.style.transition = 'none';
        progressBar.style.width = '50%';
      }
    }
  }
}

function openPopup(popupId) {
  const popup = document.getElementById(popupId);
  if (popup) {
    popup.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }
}

function closePopup(popupId) {
  const popup = document.getElementById(popupId);
  if (popup) {
    popup.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  }
}

// Global variable to store timeout ID
let toastTimeout;

function showToast() {
  const toast = document.querySelector('.toast-block');
  if (!toast) return;

  // First clear any existing timeout
  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }

  // Make the toast visible
  toast.classList.remove('hidden');
  toast.style.display = 'block';
  toast.style.opacity = '1';

  // Reset and start the progress bar animation
  const progressBar = toast.querySelector('em');
  if (progressBar) {
    progressBar.style.transition = 'none';
    progressBar.style.width = '100%';

    // Force reflow to make sure the transition starts from the beginning
    void progressBar.offsetWidth;

    progressBar.style.transition = 'width 5s linear';
    progressBar.style.width = '0';
  }

  // Auto-hide the toast after 5 seconds
  toastTimeout = setTimeout(() => {
    hideToast();
  }, 5000);
}

function hideToast() {
  const toast = document.querySelector('.toast-block');
  if (!toast) return;

  toast.style.opacity = '0';

  // Hide the toast after the transition
  setTimeout(() => {
    toast.style.display = 'none';
    toast.classList.add('hidden');

    // Reset progress bar
    const progressBar = toast.querySelector('em');
    if (progressBar) {
      progressBar.style.transition = 'none';
      progressBar.style.width = '100%';
    }
  }, 300);
}

// Function to initialize all mobile popups
function initMobilePopups() {
  initMobilePopup('filter-mobile-btn', 'filter-popup-mobile');
  initMobilePopup('sort-mobile-btn', 'sort-popup-mobile');
  initMobilePopup('search-mobile-btn', 'search-popup-mobile');

  // Initialize scroll fade effect for all mobile popups
  initScrollFadeEffect();
}

// Enhanced function to initialize mobile popups with better touch handling
function initMobilePopup(buttonId, popupId) {
  const button = document.getElementById(buttonId);
  const popup = document.getElementById(popupId);

  if (!button || !popup) return;

  // Add touchstart and click events for better mobile responsiveness
  button.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation(); // Prevent event bubbling
    togglePopup(popup);
  });

  // Use touchstart for faster response on mobile
  button.addEventListener('touchstart', function(e) {
    e.preventDefault();
    togglePopup(popup);
  }, { passive: false });

  // Close buttons inside the popup
  const closeButtons = popup.querySelectorAll('.popup-close');
  closeButtons.forEach(closeBtn => {
    closeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      closePopupMobile(popup);
    });

    closeBtn.addEventListener('touchstart', function(e) {
      e.preventDefault();
      closePopupMobile(popup);
    }, { passive: false });
  });

  // Close when clicking outside popup content
  popup.addEventListener('click', function(e) {
    if (e.target === popup) {
      closePopupMobile(popup);
    }
  });

  // Handle apply buttons inside mobile popups
  const applyButtons = popup.querySelectorAll('.apply-now-button');
  applyButtons.forEach(applyBtn => {
    applyBtn.addEventListener('click', function(e) {
      e.preventDefault();
      closePopupMobile(popup);
      // Show toast notification if needed
      showToast();
    });
  });
}

// Toggle mobile popup visibility
function togglePopup(popup) {
  if (popup.classList.contains('active')) {
    closePopupMobile(popup);
  } else {
    openPopupMobile(popup);
  }
}

// Open mobile popup with enhanced animation
function openPopupMobile(popup) {
  // Close any other open popups first
  document.querySelectorAll('.popup-overlay.active').forEach(openPopup => {
    if (openPopup !== popup) {
      closePopupMobile(openPopup);
    }
  });

  // Add active class to show the popup
  popup.classList.add('active');

  // Prevent background scrolling
  document.body.style.overflow = 'hidden';

  // Force browser reflow to ensure animations work properly
  void popup.offsetWidth;
}

// Close mobile popup with enhanced animation
function closePopupMobile(popup) {
  popup.classList.remove('active');
  document.body.style.overflow = '';
}

// Initialize scroll fade effect for scrollable containers
function initScrollFadeEffect() {
  const scrollableContainers = document.querySelectorAll('.overflow-y-auto');

  scrollableContainers.forEach(container => {
    // Check if a fade element exists, if not create one
    let fadeElement = container.querySelector('#scroll-fade');

    if (!fadeElement) {
      fadeElement = document.createElement('div');
      fadeElement.id = 'scroll-fade';
      container.appendChild(fadeElement);
    }

    // Initial check
    checkScrollPosition(container, fadeElement);

    // Check on scroll
    container.addEventListener('scroll', function() {
      checkScrollPosition(container, fadeElement);
    });

    // Check on window resize
    window.addEventListener('resize', function() {
      checkScrollPosition(container, fadeElement);
    });
  });
}

function checkScrollPosition(container, fadeElement) {
  // Check if user has scrolled to the bottom
  const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 5; // 5px tolerance

  // Toggle fade visibility
  if (isAtBottom) {
    fadeElement.style.opacity = '0';
  } else {
    fadeElement.style.opacity = '1';
  }

  // Position the fade element at the bottom of the container
  fadeElement.style.bottom = '0';
  fadeElement.style.position = 'absolute';
}
