(function() {
'use strict';

/* Detect Mobile */
var isMobile = {
Android: function() {
return navigator.userAgent.match(/Android/i);
},
BlackBerry: function() {
return navigator.userAgent.match(/BlackBerry/i);
},
iOS: function() {
return navigator.userAgent.match(/iPhone|iPad|iPod/i);
},
Opera: function() {
return navigator.userAgent.match(/Opera Mini/i);
},
Windows: function() {
return navigator.userAgent.match(/IEMobile/i);
},
any: function() {
return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
}
};

/* Flexslider Initialization */
var flexSlider = function() {
jQuery('.flexslider').flexslider({
animation: "fade",
prevText: "",
nextText: "",
slideshow: true
});
};

/* Animate on Scroll */
var contentWayPoint = function() {
var i = 0;
jQuery('.bootstrap-animate').waypoint( function( direction ) {
if( direction === 'down' && !jQuery(this.element).hasClass('bootstrap-animated') ) {
i++;
jQuery(this.element).addClass('item-animate');
setTimeout(function(){
jQuery('body .bootstrap-animate.item-animate').each(function(k){
var el = jQuery(this);
setTimeout( function () {
var effect = el.data('animate-effect');
if ( effect === 'fadeIn') {
el.addClass('fadeIn bootstrap-animated');
} else if ( effect === 'fadeInLeft') {
el.addClass('fadeInLeft bootstrap-animated');
} else if ( effect === 'fadeInRight') {
el.addClass('fadeInRight bootstrap-animated');
} else {
el.addClass('fadeInUp bootstrap-animated');
}
el.removeClass('item-animate');
},  k * 30, 'easeInOutExpo' );
});
}, 100);
}
} , { offset: '95%' } );
};

/* Navbar Scroll State */
var navbarState = function() {
jQuery(window).scroll(function(){
var $this = jQuery(this),
st = $this.scrollTop();

if ( st > 5 ) {
jQuery('.otl-navbar').addClass('scrolled');
} else {
jQuery('.otl-navbar').removeClass('scrolled');
}
});
};

/* Stellar Parallax */
var stellarInit = function() {
if( !isMobile.any() ) {
jQuery(window).stellar();
}
};

/* Page Navigation */
var clickMenu = function() {
jQuery('.navbar-nav a:not([class="external"])').click(function(event){
var section = jQuery(this).data('nav-section'),
navbar = jQuery('.navbar-nav');

if (isMobile.any()) {
jQuery('.navbar-toggle').click();
}

if ( jQuery('[data-section="' + section + '"]').length ) {
jQuery('html, body').animate({
scrollTop: jQuery('[data-section="' + section + '"]').offset().top - 55
}, 500, 'easeInOutExpo');
}

event.preventDefault();
return false;
});
};

/* Active Navigation State */
var navActive = function(section) {
var $el = jQuery('.navbar-nav');
$el.find('li').removeClass('active');
$el.each(function(){
jQuery(this).find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
});
};

/* Navigation Section Tracking */
var navigationSection = function() {
var $section = jQuery('section[data-section]');

$section.waypoint(function(direction) {
if (direction === 'down') {
navActive(jQuery(this.element).data('section'));
}
}, {
offset: '150px'
});

$section.waypoint(function(direction) {
if (direction === 'up') {
navActive(jQuery(this.element).data('section'));
}
}, {
offset: function() { return -jQuery(this.element).height() - 155; }
});
};

/* Initialize on DOM Ready */
jQuery(function(){
contentWayPoint();
navbarState();
stellarInit();
clickMenu();
navigationSection();
});

/* Initialize on Window Load */
jQuery(window).load(function(){
flexSlider();
});

})();
