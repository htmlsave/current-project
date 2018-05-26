// Show active tab
let removeLinkEll = document.querySelectorAll('.about_tab__nuv > ul > li');
let removeEll = document.querySelectorAll('.about_tab__content > div');
for(let i = 0; i < removeLinkEll.length; i++) {
	if ( !removeLinkEll[i].classList.contains('about_tab__active') ) 
		removeEll[i].style.display = 'none';
}

window.onload = function() {
	// Navigation
	var nuvEll = document.querySelectorAll('.nuv > li > a'); 
	nuvEll.forEach(function(el) {
		el.addEventListener('click', function(e) {
			// Toggle class
			let removeClassEl = document.querySelectorAll('.nuv > li');
			for(let i = 0; i < removeClassEl.length; i++) {
				removeClassEl[i].classList.remove('nuv_active');
			}
			e.currentTarget.parentNode.classList.add('nuv_active');
			// Toggle show
			let takeHref  = e.currentTarget.getAttribute('href');
			let removeEll = document.querySelectorAll('#sections > section');
			for(let i = 0; i < removeEll.length; i++) {
				if( takeHref[0] === '#' )
					e.preventDefault();
					removeEll[i].style.display = 'none';
			}
			if( takeHref[0] === '#' ) document.querySelector(takeHref).style.display = 'block';
		});
	});

	// Switch nuv
	var btnNuvSwitch = document.querySelector('.js-switch_nuv');
	btnNuvSwitch.addEventListener('click', function(e) {
		e.target.parentNode.classList.toggle('nuv_block');
	});

	// Position type
	var typed = new Typed('.js-type', {
		strings: ["Html верстальщик", "Junior Front-end"],
		typeSpeed: 100,
		loop: true,
		backDelay: 1200,
		backSpeed: 20
	});

	// Particles main
	particlesJS.load('particles', '../libs/particles.js-master/package.json');

	// About tab
	var tabElLnk = document.querySelectorAll('.about_tab__nuv > ul > li > a');
	tabElLnk.forEach(function(el) {
		el.addEventListener('click', function(e) {
			e.preventDefault();
			// Set class
			let removeClassEl = document.querySelectorAll('.about_tab__nuv > ul > li');
			for(let i = 0; i < removeClassEl.length; i++) {
				removeClassEl[i].classList.remove('about_tab__active');
			}
			e.currentTarget.parentNode.classList.add('about_tab__active');
			// Toggle show
			let takeAttr  = e.currentTarget.getAttribute('href')
			let removeEll = document.querySelectorAll('.about_tab__content > div');
			for(let i = 0; i < removeEll.length; i++) {
				removeEll[i].style.display = 'none';
			}
			document.querySelector(takeAttr).style.display = 'block';
		});
	});
}
