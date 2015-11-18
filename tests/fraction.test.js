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
	ok(expected.equals(result), expected + " != " + result);

});

test("substract fraction", function() {
	var result = frac(3, 7).subtract(frac(126, 8)).subtract(frac(56, 52));
	var expected = frac(-5969, 364);
	ok(expected.equals(result), expected + " != " + result);
});

test("multiply", function() {
	var result = frac(3, 7).multiply(frac(126, 8)).multiply(frac(56, 52));
	var expected = frac(189, 26);
	ok(expected.equals(result), expected + " != " + result);
});

test("divide", function() {
	var result = frac(3, 7).divide(frac(126, 8)).divide(frac(56, 52));
	var expected = frac(26, 1029);
	ok(expected.equals(result), expected + " != " + result);
});

test("toTex", function() {
	equal("\\frac{63}{4}", frac(126, 8).toTeX(false));
});

test("zero", function() {
	ok(Fraction.ZERO.equals(frac(0, 8)));
});

test("value", function() {
	equal(frac(1, 2).value(), 0.5);
	equal(Fraction.ZERO.value(), 0);
	equal(Fraction.ONE.value(), 1);
});

test("parse", function() {
	ok(Fraction.parse("1/1").equals(Fraction.ONE));
	ok(Fraction.parse("-4/7").equals(frac(-4, 7)));
	throws(function() {
		Fraction.parse("0");
	});
	throws(function() {
		Fraction.parse("1/a");
	});
	throws(function() {
		Fraction.parse("a/a");
	});
});

test("inverse", function() {
	ok(Fraction.ONE.equals(Fraction.ONE.inverse()));
	ok(frac(-7, 4).inverse().equals(frac(-4, 7)));
	throws(function() {
		Fraction.ZERO.inverse();
	});
});

test("compare", function() {
	ok(Fraction.ZERO.compareTo(Fraction.ONE) < 0);
	ok(Fraction.ZERO.compareTo(Fraction.ZERO) === 0);
	ok(frac(-7, 4).compareTo(frac(-3, 4)) < 0)
	ok(frac(1, 4).compareTo(frac(1, 2)) < 0);
	ok(frac(5, 8).compareTo(frac(7, 9)) < 0);
	ok(frac(3, 4).compareTo(frac(3, 5)) > 0);

	throws(function() {
		frac(-7, 4).compareTo(5);
	});
});