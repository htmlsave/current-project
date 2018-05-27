// Show active tab
let removeLinkEll = document.querySelectorAll('.about_tab__nuv > ul > li');
let removeEll = document.querySelectorAll('.about_tab__content > div');
for(let i = 0; i < removeLinkEll.length; i++) {
	if ( !removeLinkEll[i].classList.contains('about_tab__active') ) 
		removeEll[i].style.display = 'none';
}

window.onload = function() {
	// Btn mobile toggle nuv
	var mobileBtn = document.getElementById('btn_show_nuv');
	mobileBtn.addEventListener('click', function(el) {
		el.currentTarget.classList.toggle('btn_show_nuv__active');
		document.querySelector('.nuv_block_active').classList.toggle('nuv_block_active__mobile');
	});

	// Navigation
	var nuvEll = document.querySelectorAll('.nuv > li > a'); 
	for(let el = 0; el < nuvEll.length; el++) {
		nuvEll[el].addEventListener('click', function(e) {
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
					removeEll[i].style.display = 'none';
			}
			if( takeHref[0] === '#' ) {
				// mobile after click hide
				document.getElementById('btn_show_nuv').classList.remove('btn_show_nuv__active');
				document.querySelector('.nuv_block_active').classList.remove('nuv_block_active__mobile');
				// Show everywhere
				document.querySelector(takeHref).style.display = 'block';
			}
		});
	}
	

	// Switch nuv
	var btnNuvSwitch = document.querySelector('.js-switch_nuv');
	btnNuvSwitch.addEventListener('click', function(e) {
		e.target.parentNode.classList.toggle('nuv_block');
	});

	// Particles main
	particlesJS.load('particles', '../libs/particles.js-master/package.json');

	// Type text
	var typed = new Typed('.js-type', {
		strings: ["Html верстальщик", "Junior Front-end"],
		typeSpeed: 100,
		loop: true,
		backDelay: 1200,
		backSpeed: 20
	});

	// Link portfolio
	var linkPortfolio = document.getElementById('banner_portfolio');
	linkPortfolio.addEventListener('click', function(e) {
		// Toggle class
		let removeClassEl = document.querySelectorAll('.nuv > li');
		for(let i = 0; i < removeClassEl.length; i++) {
			removeClassEl[i].classList.remove('nuv_active');
		}
		// Toggle show
		let takeHref = e.currentTarget.getAttribute('href');
		let removeEll = document.querySelectorAll('#sections > section');
		for(let i = 0; i < removeEll.length; i++) {
			removeEll[i].style.display = 'none';
		}
		document.querySelector(takeHref).style.display = 'block';
	});

	// About tab
	var tabElLnk = document.querySelectorAll('.about_tab__nuv > ul > li > a');
		for(let el = 0; el < tabElLnk.length; el++) {
		tabElLnk[el].addEventListener('click', function(e) {
			e.preventDefault();
			// Toggle class
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
	}
}
