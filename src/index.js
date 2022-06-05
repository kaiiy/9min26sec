window.jQuery = window.$ = require('jquery');
import 'normalize.css'
import "./stylesheet.scss"

let inputNumber = (input) => {
	let dif_cnt = 0;
	for (let i = 0; i < 9; i++) {
		if (num[i] != input) {
			dif_cnt++;
		}
	}
	if (dif_cnt == 9) {
		num[num_cnt] = input;
		$('.button' + input).css('visibility', 'hidden');
		$('.n' + num_cnt).text(input);
		num_cnt++;
	}
	if (num_cnt == 8) {
		flag = true;
		displayCircle();
	}
};

let displayCircle = () => {
	let total = 0;
	let total2 = 0;
	for (let i = 0; i < 9; i++) {
		total = total * 10 + num[i];
		total2 = total2 * 10 + num[8 - i];
		if (total % num[i] == 0) {
			$('.u' + (i + 1)).css('background-color', 'white');
			flag_cnt++;
		} else {
			$('.u' + (i + 1)).css('background-color', 'black');
		}
		if (total2 % num[8 - i] == 0) {
			$('.s' + (-i + 9)).css('background-color', 'white');
			flag_cnt++;
		} else {
			$('.s' + (-i + 9)).css('background-color', 'black');
		}
	}

	$('.circle').css('opacity', 1);
	if (flag_cnt == 18) {
		$('.clear').addClass('displayClear');
		$('.clear-img').css('display', 'inline-block');
		displayShareButton();
		$(window).resize(
			(() => {
				displayShareButton();
			})
		);
		$('.reload').css('display', 'inline-block');
	} else {
		flag_cnt = 0;
	}
};
let reset = () => {
	let reset_num = [1, 2, 3, 4, 5, 7, 8];
	for (let i = 1; i < 8; i++) {
		num[i] = 0;
		$('.mid-num').text('?');
		$('.button' + reset_num[i - 1]).css('visibility', 'visible');
	}
	num_cnt = 1;
	flag = false;
	$('.circle').css('opacity', 0);
	flag_cnt = 0;
};

let displayShareButton = () => {
	let window_width = window.innerWidth;
	let window_height = window.innerHeight;
	let clear_width = $('.clear-img').width();
	let clear_height = $('.clear-img').height();
	$('.share-btn').css({
		top: window_height / 2 + clear_height / 2 + 'px',
		right: window_width / 2 - clear_width / 2 + 'px',
	});
	if (window_width < 650) {
		$('.share-btn').css({
			top: window_height / 2 + clear_height / 2 - (window_height / 100) * 10 + 'px',
		});
	}
	$('.reload').css({
		top: window_height / 2 + clear_height / 2 + (window_height / 100) * 5 + 'px',
		height: ((window_height - clear_height) / 2) * 0.5 + 'px',
	});
	if (window_width < 650) {
		$('.reload').css({
			height: ((window_height - clear_height) / 2) * 0.4 + 'px',
		});
	}
};

let flag = false;
let flag_cnt = 0;
let num = [6, 0, 0, 0, 0, 0, 0, 0, 9];
let num_cnt = 1;
$('html').keyup((e) => {
	if (!flag) {
		if (49 <= e.which && e.which <= 56) {
			inputNumber(e.which - 48);
		}
		if (e.which == 13) {
			reset();
		}
	}
});

$('.reset').on('touchstart click', () => {
	reset();
});
$('.button').on('touchstart click', (event) => {
	if (0 < $(event.currentTarget).data('num')) {
		inputNumber($(event.currentTarget).data('num'));
	} else {
		reset();
	}
});

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
$('table').css('top', (windowHeight / 100) * 15 + 'px');

if (windowWidth < 1100) {
	$('.button-wrap').css({
		top: (windowHeight / 100) * 30 + (windowWidth / 100) * 24 + 'px',
	});
}

$('.reload').on('click touchstart', () => {
	$('.reload').css('display', 'none');
	$('.clear-img').css('display', 'none');
	$('.share-btn').css({
		top: '-50%',
		right: '-50%',
	});
	$('.clear').removeClass('displayClear');
	reset();
});
