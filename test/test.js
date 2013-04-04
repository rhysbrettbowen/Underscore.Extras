define(['chai', 'underscore', 'underscore.extras'], function(chai) {


	chai.should();
	var expect = chai.expect;


	describe('Underscore.Extras', function() {

		describe('initialize functions', function() {
			it('should have properties added to the _ global', function() {
				_.should.have.property('sum').and.be.a('function');
				_.should.have.property('relative').and.be.a('function');
				_.should.have.property('insert').and.be.a('function');
				_.should.have.property('removeAt').and.be.a('function');
				_.should.have.property('remove').and.be.a('function');
				_.should.have.property('removeIf').and.be.a('function');
				_.should.have.property('giveUid').and.be.a('function');
				_.should.have.property('flip').and.be.a('function');
				_.should.have.property('curry').and.be.a('function');
				_.should.have.property('push').and.be.a('function');
				_.should.have.property('put').and.be.a('function');
				_.should.have.property('get').and.be.a('function');
				_.should.have.property('seq').and.be.a('function');
				_.should.have.property('isEmpty').and.be.a('function');
				_.should.have.property('exist').and.be.a('function');
				_.should.have.property('inPlace').and.be.a('function');
				_.should.have.property('feedThis').and.be.a('function');
				_.should.have.property('canUse').and.be.a('function');
				_.should.have.property('call').and.be.a('function');
				_.should.have.property('makeCallable').and.be.a('function');
				_.should.have.property('ifelse').and.be.a('function');
				_.should.have.property('toArray').and.be.a('function');
				_.should.have.property('cutArgs').and.be.a('function');
				_.should.have.property('print').and.be.a('function');
				_.should.have.property('wait').and.be.a('function');
				_.should.have.property('map').and.be.a('function');
			});
		});

	});

	describe('_.sum', function() {
		it('should sum an array of integers', function() {
			var num = _.sum([1, 2, 3]);
			num.should.equal(6).and.be.a('number');
		});
		it('should sum an array as string passed true', function() {
			var num = _.sum([1, 2, 3], true);
			num.should.equal('123').and.be.a('string');
		});
		it('should sum an array of hex strings given the radix', function() {
			var num = _.sum(['1', 'A'], 16);
			num.should.equal(11).and.be.a('number');
		});
		it('should sum an object of integers', function() {
			var num = _.sum({
				a: 1,
				b: 2,
				c: 3
			});
			num.should.equal(6).and.be.a('number');
		});
		it('should sum an object as string passed true', function() {
			var num = _.sum({
				a: 1,
				b: 2,
				c: 3
			}, true);
			// no guarantee on order in object
			num = num.split('').sort().join('');
			num.should.equal('123').and.be.a('string');
		});
		it('should sum an object of hex strings given the radix', function() {
			var num = _.sum({
				a: 1,
				b: 'A'
			}, 16);
			num.should.equal(11).and.be.a('number');
		});
	});

	describe('_.relative', function() {
		it('should get relative child given positive integer', function() {
			var child = _.relative([1,2,3], 2, 1);
			child.should.equal(3);
		});
		it('should get relative child given negative integer', function() {
			var child = _.relative([1,2,3], 2, -1);
			child.should.equal(1);
		});
		it('should give undefined if relative is outside array', function() {
			var child = _.relative([1,2,3], 2, 10);
			expect(child).to.be.undefined;
			child = _.relative([1,2,3], 2, -10);
			expect(child).to.be.undefined;
		});
		it('should give undefined if child not in array', function() {
			var child = _.relative([1,2,3], 4, 1);
			expect(child).to.be.undefined;
		});
	});

	describe('_.insert', function() {
		it('should add an item that doesn\'t exist in the array', function() {
			var arr = [1,2,3];
			_.insert(arr, 4);
			arr[3].should.equal(4);
		});
		it('should not add an already existing item', function() {
			var arr = [1,2,3];
			_.insert(arr, 3);
			arr.length.should.equal(3);
		});
	});

	describe('_.removeAt', function() {
		it('should remove the item at the specified index', function() {
			var arr = [1, 2, 3];
			_.removeAt(arr, 1);
			arr[0].should.equal(1);
			arr[1].should.equal(3);
			arr.length.should.equal(2);
		});
	});

	describe('_.remove', function() {
		it('should remove the child that matches', function() {
			var arr = [1, 2, 3];
			_.remove(arr, 2);
			arr[0].should.equal(1);
			arr[1].should.equal(3);
			arr.length.should.equal(2);
		});
		it('should do nothing if no child matches', function() {
			var arr = [1, 2, 3];
			_.remove(arr, 4);
			arr.length.should.equal(3);
		});
	});

	describe('_.removeIf', function() {
		it('should only remove the first found child', function() {
			var arr = [1, 2, 3, 2];
			_.removeIf(arr, function(val) {
				return val == 2;
			});
			arr.length.should.equal(3);
			arr[1].should.equal(3);
			arr[2].should.equal(2);
		});
	});

	describe('_.giveUid', function() {
		var obj1 = {};
		var obj1id;
		var obj2 = {};
		it('should give an object an id', function() {
			obj1id = _.giveUid(obj1);
			obj1id.should.not.be.undefined;
		});
		it('should give objects different ids', function() {
			var id = _.giveUid(obj2);
			id.should.not.equal(obj1id);
		});
		it('should return the same id for an object', function() {
			var id = _.giveUid(obj1);
			id.should.equal(obj1id);
		});
	});

	describe('_.flip', function() {
		var divide = function() {
			return _.reduce(_.toArray(arguments), function(memo, val, ind) {
				if (!ind)
					return val;
				return memo / val;
			}, 1);
		};
		it('should flip first two arguments by default', function() {
			var fdivide = _.flip(divide);
			var ans = fdivide(8, 4, 2);
			ans.should.equal(0.25);
		});
		it('should flip given argument order', function() {
			var fdivide = _.flip(divide, 2, 1, 0);
			var ans = fdivide(8, 4, 2);
			ans.should.equal(0.0625);
		});
		it('should deal with repeated arguments', function() {
			var fdivide = _.flip(divide, 0, 1, 0);
			var ans = fdivide(8, 1);
			ans.should.equal(1);
		});
	});

	describe('_.curry', function() {
		it('should curry a function', function() {
			var math = _.curry(Math.max, 2, 10);
			var ans = math(5);
			ans.should.equal(10);
		});
		it('should continually curry itself', function() {
			var math = _.curry(Math.max, 3, 10);
			var ans = math(15)(5);
			ans.should.equal(15);
		});
		it('should return when called with no arguments', function() {
			var math = _.curry(Math.max, Infinity, 10);
			var ans = math(15)(5)();
			ans.should.equal(15);
		});
		it('should leave a blank when called with an undefined', function() {
			var add = function(a, b, c) {return a + b + c;};
			var toBill = _.curry(add, 3, undefined, ' bill');
			var byBill = toBill(undefined, ', goodbye');
			var ans = byBill('Hello');
			ans.should.equal('Hello bill, goodbye');
		});
	});

	describe('_.push', function() {
		it('should create a new array in an object', function() {
			var a = {};
			_.push(a, 'arr', 1);
			a.arr.length.should.equal(1);
			a.arr[0].should.equal(1);
		});
		it('should not create an array when undefined', function() {
			var a = {};
			_.push(a, 'arr');
			expect(a.arr).to.be.undefined;
		});
	});

	describe('_.put', function() {
		it('should put a value on an object', function() {
			var a = {};
			_.put(a, 'a', 1);
			a.a.should.equal(1);
		});
		it('should remove a key for undefined', function() {
			var a = {
				a: 1
			};
			_.put(a, 'a');
			_.has(a, 'a').should.equal(false);
		});
	});

	describe('_.get', function() {
		it('should return value of namespace', function() {
			var a = {
				b: {
					c: 1
				}
			};
			var ans = _.get('b.c', a);
			ans.should.equal(1);
		});
		it('should return undefined for non existent namespace', function() {
			var a = {};
			var ans = _.get('b.c', a);
			expect(ans).to.be.undefined;
		});
		it('should return backup if not defined', function() {
			var a = {};
			var ans = _.get('b.c', a, 1);
			ans.should.equal(1);
		});
	});

	describe('_.seq', function() {
		it('should run all functions and return value of last', function() {
			var a = false;
			var b = false;
			var c = false;
			var af = function(arg) {
				a = arg;
				return 1;
			};
			var bf = function(arg) {
				b = arg;
				return 2;
			};
			var cf = function(arg) {
				c = arg;
				return 3;
			};
			var sequence = _.seq(af, bf, cf);
			var ans = sequence(true);
			a.should.equal(true);
			b.should.equal(true);
			c.should.equal(true);
			ans.should.equal(3);
		});
	});

	describe('_.isEmpty', function() {
		it('should return true for undefined', function() {
			_.isEmpty().should.equal(true);
		});
		it('should return true for null', function() {
			_.isEmpty(null).should.equal(true);
		});
		it('should return true for empty object', function() {
			_.isEmpty({}).should.equal(true);
		});
		it('should return true for empty array', function() {
			_.isEmpty([]).should.equal(true);
		});
		it('should return true for empty string', function() {
			_.isEmpty('').should.equal(true);
		});
		it('should return false for object with key', function() {
			_.isEmpty({a: 1}).should.equal(false);
		});
		it('should return false for array with item', function() {
			_.isEmpty([1]).should.equal(false);
		});
		it('should return false for string with length > 0', function() {
			_.isEmpty('a').should.equal(false);
		});
		it('should return false for zero', function() {
			_.isEmpty(0).should.equal(false);
		});
	});

	describe('_.exist', function() {
		it('should return value of namespace', function() {
			var a = {
				b: {
					c: 1
				}
			};
			var ans = _.exist(a, 'b.c');
			ans.should.equal(1);
		});
		it('should return undefined for non existent namespace', function() {
			var a = {};
			var ans = _.exist(a, 'b.c');
			expect(ans).to.be.undefined;
		});
		it('should return backup if not defined', function() {
			var a = {};
			var ans = _.exist(a, 'b.c', 1);
			ans.should.equal(1);
		});
	});

	describe('_.inPlace', function() {
		it('should change the value at a namespace if it has function defined by string', function() {
			_.inPlace({
				a: 'bob'
			}, 'a', 'toUpperCase').should.equal('BOB');
		});
		it('should change the value at a namespace with the given function', function() {
			_.inPlace({
				a: 'bob'
			}, 'a', String.prototype.toUpperCase).should.equal('BOB');
		});
	});

	describe('_.feedThis', function() {
		it('should pass the context as the first argument', function() {
			var returnThis = _.feedThis(_.identity);
			returnThis.call(5).should.equal(5);
		});
	});

	describe('_.canUse', function() {
		it('should not call function if undefined', function() {
			var a = true;
			var changeA = function(arg) {
				a = arg;
			};
			_.canUse(undefined, changeA);
			a.should.equal(true);
		});
		it('should call if object is defined', function() {
			_.canUse(5.2, Math.floor, Math).should.equal(5);
		});
	});

	describe('_.invoke', function() {
		it('should not call if object is undefined', function() {
			var a = true;
			var changeA = function() {
				a = false;
			};
			_.invoke(changeA);
			a.should.equal(true);
		});
		it('should not error if function is undefined', function() {
			_.invoke(undefined, {});
		});
		it('should call if string is a function on object', function() {
			var a = false;
			_.invoke('changeA', {changeA: function(arg) {
				a = arg;
			}}, true);
			a.should.equal(true);
		});
		it('should call if object and function exist', function() {
			var changeA = function(arg) {
				this.a = arg;
			};
			var a = {a: false};
			_.invoke(changeA, a, true);
			a.a.should.equal(true);
		});
	});

	describe('_.makeCallable', function() {
		it('should call if string is a function on object', function() {
			var a = false;
			_.makeCallable('changeA', {changeA: function(arg) {
				a = arg;
			}}, true)();
			a.should.equal(true);
		});
		it('should call if object and function exist', function() {
			var changeA = function(arg) {
				this.a = arg;
			};
			var a = {a: false};
			_.makeCallable(changeA, a, true)();
			a.a.should.equal(true);
		});
	});

	describe('_.ifelse', function() {
		var t = function() {return 1;};
		var f = function() {return 0;};
		it('should return truth value if condition is truthy', function() {
			_.ifelse(1, 2, 0).should.equal(2);
		});
		it('should return false value if condition is falsey', function() {
			_.ifelse(0, 2, 3).should.equal(3);
		});
		it('should return truth function return if function returns truthy', function() {
			_.ifelse(t, t, f).should.equal(1);
		});
		it('should return false function return if function returns falsey', function() {
			_.ifelse(f, t, f).should.equal(0);
		});
	});

	describe('_.toArray', function() {
		it('should slice an array given params', function() {
			var ret2arg = function() {return _.toArray(arguments, 1, 2)};
			ret2arg(1, 2, 3).length.should.equal(1);
			ret2arg(1, 2, 3)[0].should.equal(2);
		});
	});

	describe('_.cutArgs', function() {
		it('should restrict number of args to a function', function() {
			var rMax = _.cutArgs(Math.max, 2);
			rMax(1, 2, 3).should.equal(2);
		});
	});

	describe('_.print', function() {
		it('should replace %s with args', function() {
			_.print('ab%s%sd%s', 'c', '%s', 'e').should.equal('abc%sde');
		});
	});

	describe('_.map', function() {
		it('should map values of an object', function() {
			var a = {a: 1};
			var addOne = function(a) {return a + 1;};
			_.map(a, addOne).a.should.equal(2);
		});
	});

	describe('_.arrayEquals', function() {
		it('should work for simple cases', function() {
			var result = _.arrayEquals([1,2], [1,2]);
			result.should.be.true;
		});
		it('should return false for different order', function() {
			var result = _.arrayEquals([1,2], [2,1]);
			result.should.be.false;
		});
		it('should return false for shallow tests', function() {
			var result = _.arrayEquals([{}], [{}]);
			result.should.be.false;
		});
		it('should return true for deep tests', function() {
			var result = _.arrayEquals([{},[]], [{},[]], Infinity);
			result.should.be.true;
		});
	});

	describe('_.equals', function() {
		it('should work for simple cases', function() {
			var result = _.equals(1, 1);
			result.should.be.true;
		});
		it('should return false for sinple fails', function() {
			var result = _.equals(1, 2);
			result.should.be.false;
		});
		it('should return false for shallow tests', function() {
			var result = _.equals({0:{}}, {0:{}});
			result.should.be.false;
		});
		it('should return true for deep tests', function() {
			var result = _.equals({0:{}}, {0:{}}, Infinity);
			result.should.be.true;
		});
	});

	describe('_.pairs', function() {
		it('should return in order of keys', function() {
			var obj = {};
			obj['b'] = 1;
			obj['a'] = 1;
			var result = _.pairs(obj);
			result[0][0].should.equal('a');
		});
	});

	describe('negate', function() {
		it('should negate a true return', function() {
			var t = function(){return true;};
			var f = _.negate(t);
			var result = f();
			result.should.equal.false;
		});
	});

});