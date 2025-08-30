// Popup functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize popup functionality
  initPopup();

  // Initialize toast functionality for Apply Now buttons
  initToastForApplyButtons();
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

// Mobile filter popup toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const filterMobileBtn = document.getElementById('filter-mobile-btn');
  const filterPopupMobile = document.getElementById('filter-popup-mobile');

  if (filterMobileBtn && filterPopupMobile) {
    // Add click event to mobile filter button
    filterMobileBtn.addEventListener('click', function(e) {
      e.preventDefault();
      filterPopupMobile.classList.toggle('active');
      document.body.style.overflow = filterPopupMobile.classList.contains('active') ? 'hidden' : '';
    });

    // Close popup when clicking the close button inside filter-popup-mobile
    const closeButtons = filterPopupMobile.querySelectorAll('.popup-close');
    closeButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        filterPopupMobile.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close popup when clicking on the overlay (outside of popup content)
    filterPopupMobile.addEventListener('click', function(e) {
      if (e.target === this) {
        filterPopupMobile.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Sort popup mobile toggle functionality
  const sortMobileBtn = document.getElementById('sort-mobile-btn');
  const sortPopupMobile = document.getElementById('sort-popup-mobile');

  if (sortMobileBtn && sortPopupMobile) {
    // Add click event to mobile sort button
    sortMobileBtn.addEventListener('click', function(e) {
      e.preventDefault();
      sortPopupMobile.classList.toggle('active');
      document.body.style.overflow = sortPopupMobile.classList.contains('active') ? 'hidden' : '';
    });

    // Close popup when clicking the close button inside sort-popup-mobile
    const closeButtons = sortPopupMobile.querySelectorAll('.popup-close');
    closeButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        sortPopupMobile.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close popup when clicking on the overlay (outside of popup content)
    sortPopupMobile.addEventListener('click', function(e) {
      if (e.target === this) {
        sortPopupMobile.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Search popup mobile toggle functionality
  const searchMobileBtn = document.getElementById('search-mobile-btn');
  const searchPopupMobile = document.getElementById('search-popup-mobile');

  if (searchMobileBtn && searchPopupMobile) {
    // Add click event to mobile search button
    searchMobileBtn.addEventListener('click', function(e) {
      e.preventDefault();
      searchPopupMobile.classList.toggle('active');
      document.body.style.overflow = searchPopupMobile.classList.contains('active') ? 'hidden' : '';
    });

    // Close popup when clicking the close button inside search-popup-mobile
    const closeButtons = searchPopupMobile.querySelectorAll('.popup-close');
    closeButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        searchPopupMobile.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close popup when clicking on the overlay (outside of popup content)
    searchPopupMobile.addEventListener('click', function(e) {
      if (e.target === this) {
        searchPopupMobile.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Fade effect for scrollable containers
  const scrollableContainers = document.querySelectorAll('.overflow-y-auto');
  scrollableContainers.forEach(container => {
    const fadeElement = container.querySelector('#scroll-fade');

    if (fadeElement) {
      // Check on page load
      checkScrollPosition(container, fadeElement);

      // Check on scroll
      container.addEventListener('scroll', function() {
        checkScrollPosition(container, fadeElement);
      });

      // Check on window resize
      window.addEventListener('resize', function() {
        checkScrollPosition(container, fadeElement);
      });
    }
  });

  function checkScrollPosition(container, fadeElement) {
    // Check if user has scrolled to the bottom
    const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + 5; // 5px tolerance

    // Toggle fade visibility
    if (isAtBottom) {
      fadeElement.style.opacity = '0';
    } else {
      fadeElement.style.opacity = '1';
    }
  }
});
