Fraction = (function() {
	var checkType = function(value, type) {
		if (typeof value !== type) {
			throw "It should be a " + type + ": " + value;
		}
		return value;
	};
	var checkIsNumber = function(value) {
		return checkType(value, 'number');
	};
	var checkIsInt = function(value) {
		checkIsNumber(value);
		if (value % 1 !== 0) {
			throw "It should be an int: " + value;
		}
		return value;
	};
	/**
	 * Initialize the Fraction, numerator and denominator 
	 * @class Fraction
	 * @constructor
	 * @param {Integer} numerator of the fraction 
	 * @param {Integer} denominator the fraction must not be equal to 0
	 */
	var Fraction = function(numerator, denominator, noCheck) {
		if (!noCheck) {
			checkIsInt(numerator);
			checkIsInt(denominator);
			if (denominator === 0) {
				throw "The denominator must not be zero";
			}
			if (denominator < 0) {
				numerator = -numerator;
				denominator = -denominator;
			}
		}
		this.numerator = numerator;
		this.denominator = denominator;
		this.normalize();
	};
	/**
	 * clone the Fraction
	 * 
	 * @method clone
	 * @return {Fraction} Returns a clone of the fraction
	 */
	Fraction.prototype.clone = function() {
		return new Fraction(this.numerator, this.denominator, true);
	};

	/**
	 * pretty-printer, converts fractions into whole numbers and fractions
	 * 
	 * @method toString
	 * @returns {String}
	 */
	Fraction.prototype.toString = function() {
		return this.numerator + "/" + this.denominator;

	};

	/**
	 * pretty-printer to support TeX notation (using with MathJax, KaTeX, etc)
	 * 
	 * @method toTeX
	 * @returns {String}
	 */
	Fraction.prototype.toTeX = function(mixed) {
		var result = '';
		if ((this.numerator < 0) != (this.denominator < 0))
			result = '-';
		var numerator = Math.abs(this.numerator);
		var denominator = Math.abs(this.denominator);

		if (!mixed) {
			// We want a simple fraction, without wholepart extracted
			if (denominator === 1)
				return result + numerator;
			else
				return result + '\\frac{' + numerator + '}{' + denominator + '}';
		}
		var wholepart = Math.floor(numerator / denominator);
		numerator = numerator % denominator;
		if (wholepart !== 0)
			result += wholepart;
		if (numerator !== 0)
			result += '\\frac{' + numerator + '}{' + denominator + '}';
		return result.length > 0 ? result : '0';
	};

	/* destructively rescale the fraction by some integral factor */
	Fraction.prototype.rescale = function(factor) {
		this.numerator *= factor;
		this.denominator *= factor;
		return this;
	};

	/**
	 * Adds the value of this fraction to another, returning the result in reduced form.
	 * 
	 * @method add
	 * @returns {Fraction}
	 */
	Fraction.prototype.add = function(b) {
		var a = this.clone();
		if (!(b instanceof Fraction)) {
			throw "must be a Fraction: " + b;
		}
		var td = a.denominator;
		a.rescale(b.denominator);
		a.numerator += b.numerator * td;
		return a.normalize();
	};

	/**
	 * Subtracts the value of another fraction from the value of this one, returning the result in reduced form
	 * 
	 * @method subtract
	 * @returns {Fraction}
	 */
	Fraction.prototype.subtract = function(b) {
		var a = this.clone();
		if (!(b instanceof Fraction)) {
			throw "must be a Fraction: " + b;
		}
		var td = a.denominator;
		a.rescale(b.denominator);
		a.numerator -= b.numerator * td;

		return a.normalize();
	};

	Fraction.prototype.multiply = function(b) {
		var a = this.clone();
		a.numerator *= b.numerator;
		a.denominator *= b.denominator;
		return a.normalize();
	};

	Fraction.prototype.divide = function(b) {
		if (!(b instanceof Fraction)) {
			throw "must be a Fraction: " + b;
		}
		var a = this.clone();
		a.numerator *= b.denominator;
		a.denominator *= b.numerator;
		return a.normalize();
	};

	Fraction.prototype.equals = function(b) {
		if (!(b instanceof Fraction)) {
			return false;
		}
		// fractions that are equal should have equal normalized forms
		return (this.numerator === b.numerator && this.denominator === b.denominator);
	};
	/**
	 * Compares this object to another based on size.
	 * @method compareTo
	 * @returns {Fraction}
	 */
	Fraction.prototype.compareTo = function(b) {
		if (!(b instanceof Fraction)) {
			throw "must be a Fraction: " + b;
		}
		if (this === other || this.equals(b)) {
			return 0;
		}
		var first = numerator * other.denominator;
		var second = other.numerator * denominator;
		if (first == second) {
			return 0;
		} else if (first < second) {
			return -1;
		} else {
			return 1;
		}
	};

	Fraction.prototype.normalize = function() {
		var gcf = Fraction.gcf(this.numerator, this.denominator);
		this.numerator /= gcf;
		this.denominator /= gcf;
		if (this.denominator < 0) {
			this.numerator *= -1;
			this.denominator *= -1;
		}
		return this;
	};
	/* Takes two numbers and returns their greatest common factor. */
	// Adapted from Ratio.js
	Fraction.gcf = function(a, b) {
		if (arguments.length < 2) {
			return a;
		}
		var c;
		a = Math.abs(a);
		b = Math.abs(b);
		/*
		 * //It seems to be no need in these checks // Same as isNaN() but
		 * faster if (a !== a || b !== b) { return NaN; } //Same as !isFinite()
		 * but faster if (a === Infinity || a === -Infinity || b === Infinity ||
		 * b === -Infinity) { return Infinity; } // Checks if a or b are
		 * decimals if ((a % 1 !== 0) || (b % 1 !== 0)) { throw new Error("Can
		 * only operate on integers"); }
		 */

		while (b) {
			c = a % b;
			a = b;
			b = c;
		}
		return a;
	};
	/**
	 *<code>Fraction</code> representation of 0.
	 * @property ZERO
	 * @type Fraction
	 * @static
	 * @final
	 */
	Fraction.ZERO = new Fraction(0,1);
	/**
	 *<code>Fraction</code> representation of 1.
	 * @property ONE
	 * @type Fraction
	 * @static
	 * @final
	 */
	Fraction.ONE = new Fraction(1,1);
	
	return Fraction;
})();
