module("Fraction Tests");
var frac = function(n, d) {
	return new Fraction(n, d);
};

test("create fraction", function() {
	var fraction = new Fraction(3, 3);
	equal(fraction.numerator, 1);
	equal(fraction.denominator, 1);

	throws(function() {
		var fraction = new Fraction(1);
	});
	throws(function() {
		var fraction = new Fraction(1 / 1);
	});
	throws(function() {
		var fraction = new Fraction("1");
	});
	throws(function() {
		var fraction = new Fraction("1/1");
	});
});

test("add fraction", function() {
	var result = frac(2, 3).add(frac(5, 6)).add(frac(7, 8));
	var expected = frac(19, 8);
	ok(expected, result, expected + " != " + result);

});

test("substract fraction", function() {
	var result = frac(3, 7).subtract(frac(126, 8)).subtract(frac(56, 52));
	var expected = frac(-5969, 364);
	ok(expected, result, expected + " != " + result);
});

test("multiply", function() {
	var result = frac(3, 7).multiply(frac(126, 8)).multiply(frac(56, 52));
	var expected = frac(189, 26);
	ok(expected, result, expected + " != " + result);
});

test("divide", function() {
	var result = frac(3, 7).divide(frac(126, 8)).divide(frac(56, 52));
	var expected = frac(26, 1029);
	ok(expected, result, expected + " != " + result);
});