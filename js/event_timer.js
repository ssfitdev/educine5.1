jQuery(document).ready(function() {
    $('#educineEventTimer').countdown({
        until: new Date(2026, 3, 25, 15, 0),
        format: 'DHMS',
        padZeroes: true,
        layout: '<div class="countdown-show4">' +
                '<div class="countdown-section"><div class="countdown-amount">{dn}</div><div class="countdown-period">Days</div></div>' +
                '<div class="countdown-section"><div class="countdown-amount">{hn}</div><div class="countdown-period">Hours</div></div>' +
                '<div class="countdown-section"><div class="countdown-amount">{mn}</div><div class="countdown-period">Minutes</div></div>' +
                '<div class="countdown-section"><div class="countdown-amount">{sn}</div><div class="countdown-period">Seconds</div></div>' +
                '</div>'
    });


});