document.addEventListener('DOMContentLoaded', function() {
    // Get all the tab buttons
    var tabLinks = document.querySelectorAll('.schedule-tabs .nav-pills .nav-link');
    
    // Get all tab panes
    var tabPanes = document.querySelectorAll('.tab-content .tab-pane');
    
    tabLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            // Get the target tab content id from the data-bs-target attribute
            var targetId = this.getAttribute('data-bs-target').substring(1); // Remove the #
            
            // Remove active class from all tabs
            tabLinks.forEach(function(tab) {
                tab.classList.remove('active');
                tab.setAttribute('aria-selected', 'false');
            });
            
            // Add active class to clicked tab
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');
            
            // Hide all tab content
            tabPanes.forEach(function(pane) {
                pane.classList.remove('show', 'active');
            });
            
            // Show the selected tab content
            var targetPane = document.getElementById(targetId);
            targetPane.classList.add('show', 'active');
        });
    });
});


// Add scroll detection for schedule rows to show/hide gradient hint
document.addEventListener('DOMContentLoaded', function() {
    var scrollRows = document.querySelectorAll('.schedule-scroll-row');
    
    scrollRows.forEach(function(row) {
        row.addEventListener('scroll', function() {
            // Add 'scrolled' class when user scrolls
            if (this.scrollLeft > 10) {
                this.classList.add('scrolled');
            } else {
                this.classList.remove('scrolled');
            }
        });
    });
});
