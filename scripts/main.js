// Event tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
  const tabButtons = document.querySelectorAll('.event-tab-button');
  const tabContentBride = document.querySelector('.tab-content-bride');
  const tabContentReception = document.querySelector('.tab-content-reception');
  
  // Initialize: hide reception tab by default
  if (tabContentReception) {
    tabContentReception.style.display = 'none';
  }
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      tabButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get the tab type
      const tab = this.getAttribute('data-tab');
      
      // Show/hide content based on tab
      if (tab === 'bride') {
        // Show Family Details 1 (Tiệc nhà gái)
        if (tabContentBride) tabContentBride.style.display = 'block';
        if (tabContentReception) tabContentReception.style.display = 'none';
      } else if (tab === 'reception') {
        // Show Family Details 2 (Lễ tân hôn)
        if (tabContentBride) tabContentBride.style.display = 'none';
        if (tabContentReception) tabContentReception.style.display = 'block';
      }
    });
  });
  
  // Map link handlers
  const mapLinks = document.querySelectorAll('.location-map-link[data-map-url]');
  mapLinks.forEach(link => {
    link.addEventListener('click', function() {
      const mapUrl = this.getAttribute('data-map-url');
      if (mapUrl) {
        window.open(mapUrl, '_blank', 'noopener,noreferrer');
      }
    });
  });
});

