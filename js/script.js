/*
Template Name: Lisa - Wellness Center, Spa and Beauty Salon Template
Author       : Abubakar Siddique
Version      : 1.0
*/
(function($)
{
	"use strict";


	// preloader
	$(window).on('load', function() {
		preloader();
	})

	$(document).on('ready', function () {

		// Dropdown menu
		$('.dropdown').on('mouseenter', function () {
			$(this).addClass('open');
		});
		$(".dropdown").on('mouseleave', function () {
			$(this).removeClass('open');
		});

		//Masonry Grid
		$('.grid').masonry({
			itemSelector: '.grid-item',
			percentPosition: true,
			columnWidth: '.grid-item'
		});

		//Header Fixed
		$('.navbar-static-top').affix({
			  offset: {
				top: $('.top-bar').outerHeight()
			  }
		});

		var pageBoby = $('body');
		var topBar=$('.top-bar').outerHeight();
		$(window).on('scroll', function() {
			if ($(this).scrollTop() >= topBar) {
				pageBoby.addClass("f-header");
			} else {
				pageBoby.removeClass("f-header");
			}
		});

		// Animation
		 if($('.wow').length){
			var wow = new WOW(
			  {
				boxClass:     'wow',      // animated element css class (default is wow)
				animateClass: 'animated', // animation css class (default is animated)
				offset:       0,          // distance to the element when triggering the animation (default is 0)
				mobile:       true,       // trigger animations on mobile devices (default is true)
				live:         true       // act on asynchronously loaded content (default is true)
			  }
			);
			wow.init();
		}

		// Services Carousel
		$("#services-carousel").owlCarousel({
			autoplay: true,
			autoplayTimeout:2000,
			margin:30,
			nav: false,
			smartSpeed:1000,
			dots:true,
			autoplayHoverPause:false,
			loop:true,
			responsiveClass: true,
			responsive: {
			  0: {
				items: 1,
			  },
			  600: {
				items: 2,
			  },
			  768: {
				items: 3,
			  },
			  1200: {
				items: 3,
			  }
			}
		 });

		//Custom select box
		$('.select-option').chosen({disable_search_threshold:10});

		//Datepicker
		$( ".date-pic" ).datepicker({
			todayBtn: "linked",
			keyboardNavigation: false,
			forceParse: false,
			calendarWeeks: true,
			autoclose: true,
			format: 'mm/dd/yyyy'
		});

		//Timepicker
        $(".timepicker").timepicker({
        	showInputs: false
        });

		// Gallery Filter
		$('.gallery-item').mixitup({
			targetSelector: '.gallery',
			transitionSpeed: 450
		});

		// Fancybox
		$('a.fancybox').fancybox();

		//Contact Map
		var mapInfo = {"lat":"-33.9986201", "lon":"22.6140917"}; //Change a map coordinate here!
		try {
			$('.map').gmap3({
				action: 'addMarker',
				latLng: [mapInfo.lat, mapInfo.lon],
				map:{
					center: [mapInfo.lat, mapInfo.lon],
					zoom: 15
					},
				},
				{action: 'setOptions', args:[{scrollwheel:false}]}
			);
		} catch(err) {

		}

		// Counter Up
		$('.counter').counterUp({
			delay: 10,
			time: 2000
		});

		// Back to top
		$(".back-top").hide();

		$('.back-top a').on('click', function(event) {
			$('body,html').animate({scrollTop:0},800);
			return false;
		});

		// Background Scrolling
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {

		} else {
			$(window).stellar({
				horizontalScrolling: false,
				responsive: true
			});
		}


/*******************************
****	RESERVATION FORM	****
********************************/

		var resFirstName = $("input[name=res_first_name]");
		var resLastName = $("input[name=res_last_name]");
		var resPhone = $("input[name=res_phone]");
		var resEmailAddress = $("input[name=res_email_address]");
		var therapy = $("select[name=therapy]");
		var resDate = $("input[name=date]");
		var resTime = $("input[name=time]");

		var form = $("#reservation-form");
		form.validate();

		//Bind validation rules to form fields.
		resFirstName.rules("add", {
			required: true,
			messages: {
				required: "Please enter your first name"
			}
		});

		resLastName.rules("add", {
			required: true,
			messages: {
				required: "Please enter your last name"
			}
		});

		resEmailAddress.rules("add", {
			required: true,
			email: true,
			messages: {
				required: "Please enter your email address",
				email: "Please enter a valid email address"
			}
		});

		resPhone.rules("add", {
			required: true,
			messages: {
				required: "Please give me a number I can get in touch with you on, just in case."
			}
		});

		//Bind AJAX request to form submit action.
		$('#reservation-form-button').on("click", function(event) {
			event.preventDefault();
			if(form.valid()) {
                $('#reservation-form-buttons').hide();
                $('#ajax-loading').show();
				$.ajax({
					url: "http://heartnomads.co.za/reservation.php",
					method: "POST",
					data: {
						therapy: therapy.val(),
						date: resDate.val(),
						time: resTime.val(),
						first_name: resFirstName.val(),
						last_name: resLastName.val(),
						email_address: resEmailAddress.val()
					},
					dataType: "json",
					error: function(jqXHR, textStatus, errorThrown) {
						$('#reservation-form-return-error').show();
						$('#reservation-form-return-success').hide();
						$('#reservation-form-input').hide();
                        $('#reservation-form-buttons').show();
                        $('#ajax-loading').hide();
					},
					success: function(data, textStatus, jqXHR) {
                        $('#reservation-form-buttons').show();
                        $('#ajax-loading').hide();
						if(data.status === 'success') {
							$('#reservation-form-return-success').show();
							$('#reservation-form-return-error').hide();
							$('#reservation-form-input').hide();
						} else {
							if(data.errors.length > 0) {
								for(var i = 0; i < data.errors.length; i++) {
									if(data.errors[i].field === 'contact-me-form') {
										$('#reservation-form-return-error').show();
										$('#reservation-form-return-success').hide();
										$('#reservation-form-input').hide();
									} else {
										$('input[name=' + data.errors[i].field + ']').after('<label class="error" for="' + data.errors[i].field + '">' + data.errors[i].message + '</label>');
									}
								}
							} else {
								$('#reservation-form-return-error').show();
								$('#reservation-form-return-success').hide();
								$('#reservation-form-input').hide();
							}
						}
					}
				});
			}
		});

		$('.reservation-modal-ok').on('click', function() {
			$('#reservation-form-return-error').hide();
			$('#reservation-form-return-success').hide();
			$('#reservation-form-input').show();
		});

	});

	/***********************************
	****	END RESERVATION FORM	****
	************************************/

	$(window).on('scroll', function() {
	// Progressbar
		$(".single-progressbar").each(function() {
			var base = $(this);
			var windowHeight = $(window).height();
			var itemPos = base.offset().top;
			var scrollpos = $(window).scrollTop() + windowHeight - 100;
			if (itemPos <= scrollpos) {
				var auptcoun = base.find(".progress-bar").attr("aria-valuenow");
				base.find(".progress-bar").css({
					"width": auptcoun + "%"
				});
				var str = base.find(".skill-per").text();
				var res = str.replace("%", "");
				if (res == 0) {
					$({
						countNumber: 0
					}).animate({
						countNumber: auptcoun
					}, {
						duration: 1500,
						easing: 'linear',
						step: function() {
							base.find(".skill-per").text(Math.ceil(this.countNumber) + "%");
						}
					});
				}
			}
		});


	// Back to top
		if($(this).scrollTop()>150){
			$('.back-top').fadeIn();
		}
		else{
			$('.back-top').fadeOut();
		}


	});

	// Preload
	function preloader(){
		$(".preloaderimg").fadeOut();
		$(".preloader").delay(200).fadeOut("slow").delay(200, function(){
			$(this).remove();
		});
	}

	// Slider Caption Animation
	function doAnimations( elems ) {
		//Cache the animationend event in a variable
		var animEndEv = 'webkitAnimationEnd animationend';

		elems.each(function () {
			var $this = $(this),
				$animationType = $this.data('animation');
			$this.addClass($animationType).one(animEndEv, function () {
				$this.removeClass($animationType);
			});
		});
	}

	//Variables on page load
	var $myCarousel = $('#banner'),
		$firstAnimatingElems = $myCarousel.find('.item:first').find("[data-animation ^= 'animated']");

	//Initialize carousel
	$myCarousel.carousel();

	//Animate captions in first slide on page load
	doAnimations($firstAnimatingElems);

	//Pause carousel
	$myCarousel.carousel('pause');


	//Other slides to be animated on carousel slide event
	$myCarousel.on('slide.bs.carousel', function (e) {
		var $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
		doAnimations($animatingElems);
	});

	// modal vertical
	function centerModals($element) {
		  var $modals;
		  if ($element.length) {
			$modals = $element;
		  } else {
			$modals = $('.modal-vcenter:visible');
		  }
		  $modals.each( function(i) {
			var $clone = $(this).clone().css('display', 'block').appendTo('body');
			var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
			top = top > 0 ? top : 0;
			$clone.remove();
			$(this).find('.modal-content').css("margin-top", top);
		  });
	}

	$('.modal-vcenter').on('show.bs.modal', function(e) {
	  centerModals($(this));
	});
	$(window).on('resize', centerModals);

  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

})(jQuery);
