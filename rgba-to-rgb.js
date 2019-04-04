function Color(r, g, b, a) {
  this.r = r;
  this.b = b;
  this.g = g;
  this.a = typeof a == "number" ? a : 1;
}

Color.prototype.rgba2rgb = function (color) {
	var alpha = color.a;

	return new Color(
		(1 - alpha) * this.r + alpha * color.r,
		(1 - alpha) * this.g + alpha * color.g,
		(1 - alpha) * this.b + alpha * color.b
	);
};

function recalculate () {
	var background = $('#colorpicker_bg').spectrum('get');
	
	var rgba = $('#colorpicker_rgba').spectrum('get');
	var rgba_color = new Color(rgba.toRgb().r, rgba.toRgb().g, rgba.toRgb().b, rgba.toRgb().a);
	
	var background_color = new Color(background.toRgb().r, background.toRgb().g, background.toRgb().b);
	var result_rgb = background_color.rgba2rgb(rgba_color);

	$('#result_rgba').css('background-color', 'rgba(' + rgba.toRgb().r + ',' +
		rgba.toRgb().g + ',' +
		rgba.toRgb().b + ',' +
		rgba.toRgb().a + ')'  );

	var result_rgb_str = 'rgb(' + Math.round(result_rgb.r) + ',' +
		Math.round(result_rgb.g) + ',' +
		Math.round(result_rgb.b) + ')';

	$('#bg_text').text(background.toRgbString() + ' / ' + background.toHexString());

	$('#result_rgb').css('background-color', result_rgb_str);
	$('#result_rgb_text').text(result_rgb_str + ' / ' + new tinycolor(result_rgb_str).toHexString());

	$('#rgba_text').text(rgba.toRgbString() + ' / ' + rgba.toHexString());
}

$('#colorpicker_bg').spectrum({
	color: '#000',
	preferredFormat: 'rgb',
	showInput: true,
	change: function (color) {
		recalculate();
	}
});

$('#colorpicker_rgba').spectrum({
	color: 'rgba(255, 0, 0, .5)',
	showAlpha: true,
	preferredFormat: 'rgb',
	showInput: true,
	change: function (color) {
		recalculate();
	}
});

recalculate();
