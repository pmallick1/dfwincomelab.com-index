// Remember to minimize this file before putting into production site

// ------------------------------------------------------
// document loaded
// ------------------------------------------------------
jQuery(document).ready(function () {


    jQuery('#searchButton').click(function () {
        if (jQuery('#searchForm').hasClass('expanded')) {
            jQuery('#searchForm').removeClass('expanded');
        } else {
            jQuery('#searchForm').addClass('expanded');
        }
        if (jQuery('#searchButton').hasClass('expanded')) {
            jQuery('#searchButton').removeClass('expanded');
        } else {
            jQuery('#searchButton').addClass('expanded');
        }
    });


    // use this value to remember window width when menu gets hidden
    // use it to unhide menu when screen gets bigger. Needed because normally
    // menu width used to make determination, but is forced to 100% width at
    // small sizes...
    var rememberWidth = '';

    function formatNav() {
        var pagenavwidth = jQuery('#page-nav-container .inner').width();
        var pageulwidth = jQuery('#page-nav-container ul').width();
        var firstwidth = jQuery('#page-nav-container .sectionParent').width();
        var ctawidth = jQuery('#page-nav-container .cta-link').width();

        if (pagenavwidth - (firstwidth + pageulwidth) < 60) {
            if (rememberWidth == '') {
                rememberWidth = jQuery(window).width();
                // console.log('rememberWidth = '+rememberWidth);
            }
            jQuery('#page-nav-container').addClass('tooSmallForMenu');
        } else {
            jQuery('#page-nav-container').removeClass('tooSmallForMenu');
        }

        if (pagenavwidth - (firstwidth + pageulwidth + ctawidth) < 120) {
            jQuery('#page-nav-container').addClass('tooSmallForDonate');
        } else {
            jQuery('#page-nav-container').removeClass('tooSmallForDonate');
        }


    }
    formatNav();


    $(window).resize(function () {
        formatNav();

        if (rememberWidth < jQuery(window).width()) {
            jQuery('#page-nav-container').removeClass('tooSmallForMenu');
            rememberWidth = '';
        }
    });


    jQuery('#pageNavButton').click(function () {
        if (jQuery('#page-nav-container ul').hasClass('opened')) {
            jQuery('#page-nav-container ul').removeClass('opened');
            jQuery(this).removeClass('opened');

        } else {
            jQuery('#page-nav-container ul').addClass('opened');
            jQuery(this).addClass('opened');

            jQuery('html, body').animate({
                scrollTop: jQuery("#page-nav-container").offset().top
            }, 750, 'easeInOutCubic');

        }
    });


    // Hide Header on on scroll down
    // ------------------------------------------------------

    /*
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('#header').outerHeight();

    $(window).scroll(function(event){
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        var st = $(this).scrollTop();
        
        if(Math.abs(lastScrollTop - st) <= delta)
            return;
        
        if (st > lastScrollTop && st > navbarHeight  ) { 
            $('#header').removeClass('nav-down').addClass('nav-up');
            $('.page-nav-container').removeClass('nav-down').addClass('nav-up');

            
        } else {

            if(st + $(window).height() < $(document).height()) {
                const newLocal = '#header';
                const newLocal2 = '.page-nav-container';
                $(newLocal).removeClass('nav-up').addClass('nav-down');
                $(newLocal2).removeClass('nav-up').addClass('nav-down');
            }
        }
        
        lastScrollTop = st;
    }
    */

    // When ajax load more completes, also fire any code that 
    // needs to be run on the newly created elements.
    // ------------------------------------------------------
    AOS.init({
        once: true
    });

    window.almComplete = function (alm) {
        console.log("Ajax Load More Complete!");
        AOS.init();
        jQuery('.news-page article .image img').resizeToParent();

    };


    // ------------------------------------------------------
    // simple expand
    // ------------------------------------------------------

    jQuery('.expander').simpleexpand();

    // ------------------------------------------------------
    // resize news images to parent
    // ------------------------------------------------------

    jQuery('.news-page article .image img').resizeToParent();


    // ------------------------------------------------------
    // block scrolling
    // ------------------------------------------------------

    // lock on click images
    jQuery("#sbi_images").mouseup(
        function () {
            console.log('opened lightbox');
            jQuery(window).disablescroll();
        }
    );

    // unlock on click lightbox
    jQuery("#sbi_lightbox").mouseup(
        function () {
            console.log('clicked to close lightbox');
            jQuery(window).disablescroll("undo");
        }
    );

    // unlock on esc
    jQuery(document).on('keydown', function (event) {
        if (event.key == "Escape") {
            console.log('typed esc to close lightbox');
            jQuery(window).disablescroll("undo");
        }
    });

    // ------------------------------------------------------
    // home scrollmagic
    // ------------------------------------------------------


    // add class to target users with js or no js
    // ------------------------------------------------------
    document.documentElement.classList.remove("no-js");
    document.documentElement.classList.add("js");

    // restrict hovers to non-touch devices 
    // ------------------------------------------------------
    var touchsupport = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);
    if (!touchsupport) { // browser doesn't support touch
        document.documentElement.className += " non-touch";
    }

    /* sticky page nav*/
    var num0 = $("#page-nav-container").offset().top;
    $(window).bind('scroll', function () {
        if ($(window).scrollTop() > num0) {
            $('#page-nav-container').addClass('fixed');

        } else {
            $('#page-nav-container').removeClass('fixed');
        }
    });

    /* sticky theory of change 1 */
    var num1 = $("#section-stripe-1").offset().top;
    $(window).bind('scroll', function () {
        if ($(window).scrollTop() > num1) {
            $('#section-stripe-1').addClass('fixed');

        } else {
            $('#section-stripe-1').removeClass('fixed');
        }
    });

    /* sticky theory of change 1 */
    var num2 = $("#section-stripe-2").offset().top;
    $(window).bind('scroll', function () {
        if ($(window).scrollTop() > num2) {
            $('#section-stripe-2').addClass('fixed');

        } else {
            $('#section-stripe-2').removeClass('fixed');
        }
    });


    /* sticky theory of change 1 */
    var num3 = $("#section-stripe-3").offset().top;
    $(window).bind('scroll', function () {
        if ($(window).scrollTop() > num3) {
            $('#section-stripe-3').addClass('fixed');

        } else {
            $('#section-stripe-3').removeClass('fixed');
        }
    });


    





















    // mobile navigation
    // ------------------------------------------------------

    $('#navContainer').addClass('hide-nav');
    $('#navContainer li.menu-item-has-children > a').addClass('direct-child');

    //     // write back button 
    //     $('#navContainer li.menu-item-has-children .sub-menu').prepend('<li><button class="sub-nav-back"><span></span><span></span></button></li>');

    // set vars to "nav is closed"
    var clickedNav = false;
    //     var clickedSubNav = false;

    // toggleNav Function
    // --------------------------------- 
    function toggleNav() {
        // if var is true (nav is open), then close the nav and reset the var to false (nav is closed)
        if (clickedNav) {
            $('#navContainer').addClass('hide-nav').addClass('main-closed').removeClass('main-open').animate({
                top: "-100vh"
            });
            clickedNav = false;
            // if var is false (nav is closed), then open the nav and set the var to true (nav is open)
        } else {
            $('#navContainer').removeClass('hide-nav').addClass('main-open').removeClass('main-closed').animate({
                top: "0"
            });
            clickedNav = true;
        }
    }

    // if the nav button is clicked, execute function
    jQuery('#toggleNav').click(function () {
        toggleNav();
    });


    // closeNav Function
    // --------------------------------- 
    function closeNav() {
        // close subnav
        //  $('.sub-menu').animate({top: "0"}); /* DL  - Bug Fix - updated from -100vh */
        //  clickedSubNav = false;
        // close main nav
        $('#navContainer').addClass('hide-nav').addClass('main-closed').removeClass('main-open').animate({
            top: "-100vh"
        });
        // reset the var to false/closed
        clickedNav = false;
    }

    // if the close (x) button is clicked, execute the function
    jQuery('#closeNav').click(function () {
        closeNav();
    });
    
    
    
    // ------------------------------------------------------
    // home page animation
    // ------------------------------------------------------
    // time-out
    $(".home-animation-wrapper").delay(3000).fadeOut("slow");

    // check cookie
    //var visited = Cookies("visited")
    // if first time visitor display animation
//    if (visited == null) {
//        $('.home-animation-wrapper').show().css("display", "");
//    }
//    // it not, keep it hidden
//    else {
//        $('.home-animation-wrapper').hide().css("display", "none");
//    }
//    // set the cookie
//    Cookies('visited', 'yes', {
//        expires: 1,
//        path: '/'
//    });

}); // end jQuery document.ready








(function ($) {

    /*
     *  new_map
     *
     *  This function will render a Google Map onto the selected jQuery element
     *
     *  @type   function
     *  @date   8/11/2013
     *  @since  4.3.0
     *
     *  @param  $el (jQuery element)
     *  @return n/a
     */

    function new_map($el) {

        // var
        var $markers = $el.find('.marker');


        // vars
        var args = {
            zoom: 16,
            center: new google.maps.LatLng(0, 0),
            disableDefaultUI: true,
            styles: [
                {
                    "featureType": "administrative",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "gamma": "0.00"
                        },
                        {
                            "weight": "0.01"
                        },
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [
                        {
                            "color": "#ffffff"
                        }
                    ]
                },
                {
                    "featureType": "landscape.natural",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "landscape.natural.terrain",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": [
                        {
                            "saturation": "-100"
                        },
                        {
                            "lightness": "32"
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "labels.text",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "lightness": "63"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "labels.text",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "transit.station",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#eeeeee"
                        }
                    ]
                }
            ]
        };


        // create map               
        var map = new google.maps.Map($el[0], args);


        // add a markers reference
        map.markers = [];


        // add markers
        $markers.each(function () {

            add_marker($(this), map);

        });


        // center map
        center_map(map);


        // return
        return map;

    }

    // create info window outside of each - then tell that singular infowindow to swap content based on click
    var infowindow = new google.maps.InfoWindow({
        content: ''
    });

    /*
     *  add_marker
     *
     *  This function will add a marker to the selected Google Map
     *
     *  @type   function
     *  @date   8/11/2013
     *  @since  4.3.0
     *
     *  @param  $marker (jQuery element)
     *  @param  map (Google Map object)
     *  @return n/a
     */

    function add_marker($marker, map) {

        // var
        var latlng = new google.maps.LatLng($marker.attr('data-lat'), $marker.attr('data-lng'));

        // create marker
        var marker = new google.maps.Marker({
            position: latlng,
            map: map
        });

        // add to array
        map.markers.push(marker);

        // if marker contains HTML, add it to an infoWindow
        if ($marker.html()) {

            // show info window when marker is clicked & close other markers
            google.maps.event.addListener(marker, 'click', function () {
                //swap content of that singular infowindow
                infowindow.setContent($marker.html());
                infowindow.open(map, marker);
            });

            // close info window when map is clicked
            google.maps.event.addListener(map, 'click', function (event) {
                if (infowindow) {
                    infowindow.close();
                }
            });

        }

    }

    /*
     *  center_map
     *
     *  This function will center the map, showing all markers attached to this map
     *
     *  @type   function
     *  @date   8/11/2013
     *  @since  4.3.0
     *
     *  @param  map (Google Map object)
     *  @return n/a
     */

    function center_map(map) {

        // vars
        var bounds = new google.maps.LatLngBounds();

        // loop through all markers and create bounds
        $.each(map.markers, function (i, marker) {

            var latlng = new google.maps.LatLng(marker.position.lat(), marker.position.lng());

            bounds.extend(latlng);

        });

        // only 1 marker?
        if (map.markers.length == 1) {
            // set center of map
            map.setCenter(bounds.getCenter());
            map.setZoom(16);
        } else {
            // fit to bounds
            map.fitBounds(bounds);
        }

    }

    /*
     *  document ready
     *
     *  This function will render each map when the document is ready (page has loaded)
     *
     *  @type   function
     *  @date   8/11/2013
     *  @since  5.0.0
     *
     *  @param  n/a
     *  @return n/a
     */
    // global var
    var map = null;

    $(document).ready(function () {

        $('.acf-map').each(function () {

            // create map
            map = new_map($(this));

        });

    });

})(jQuery);
