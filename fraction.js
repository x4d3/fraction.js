Fraction = function() {
	var Fraction = function(numerator, denominator) {
		if (denominator == 0) {
			throw "The denominator must not be zero";
		}
		if (denominator < 0) {
			numerator = -numerator;
			denominator = -denominator;
		}

		this.n = numerator;
		this.d = denominator;
	};
	return Fraction;

}();
