// V1.2.0

// ==========================================
// Copyright 2013 Dataminr
// Licensed under The MIT License
// http://opensource.org/licenses/MIT
// work derived from https://github.com/rhysbrettbowen/PlastronJS
// ==========================================

define([
  'underscore'
], function(_) {

  var id = 1;
  var toArray = function(obj) {
    if (!obj) return [];
    if (obj.length === +obj.length) return [].slice.call(obj);
    return _.values(obj);
  };
  var pairs = _.pairs;

  _.mixin({

    // sum an array or values of an object
    sum: function(arr, asString) {
      var radix = _.isNumber(asString) ? asString : 10;
      var transform = function(val) {
        if (_.isString(val))
          return parseInt(val, radix);
        return val;
      };
      if (_.isFunction(asString)) {
        transform = asString;
        asString = arguments[2];
      }
      return _.reduce(arr, function(memo, num) {
        return memo + transform(num);
      }, asString === true ? '': 0);
    },

    // gets the element relative to another child in an array
    relative: function(arr, child, rel) {
      var ind = _.indexOf(arr, child);
      if (ind < 0)
        return;
      return arr[ind + rel];
    },

    // insert a child in to an array if it doesn't exist
    insert: function(arr, child) {
      if (!_.contains(arr, child))
        arr.push(child);
      return arr;
    },

    // remove the item at the given index
    removeAt: function(arr, ind) {
      return arr.splice(ind, 1);
    },

    // remove an item from an array
    remove: function(arr, child) {
      var i = _.indexOf(arr, child);
      if (i > 0)
        return _.removeAt(arr, i);
    },

    // remove an item that satisfies a function
    removeIf: function(arr, fn) {
      _.remove(arr, _.find(arr, fn));
    },

    // give an object a unique id if it doesn't have one and return it
    giveUid: function(obj) {
      if (!obj._underscore_uid_property)
        obj._underscore_uid_property = id++;
      return obj._underscore_uid_property;
    },

    // change the order of arguments in an array
    // pass the array then a list of the order arguments should be in
    // for instance to move the last argument to the front and the others along
    // one for a 3 argument function:
    // _.flip(threeArg, 2, 0, 1);
    // if no numbers given will flip the first two arguments
    flip: function(fn) {
      var flips = _.toArray(arguments, 1);
      if (!flips.length) {
        flips[0] = 1;
        flips[1] = 0;
      }
      return function() {
        var args = _.toArray(arguments);
        var temp = [];
        for (var i = 0; i < args.length || i < flips.length; i++) {
          temp.push(args[i < flips.length ? flips[i] : i]);
        }
        return fn.apply(this, temp);
      };
    },

    // a self currying function, will continually return a curried version
    // of the given function until the opt_minLength is reached or it is
    // called with no arguments. Passing in undefined will leave a 'gap' in the
    // arguments passed in that you can fill in later.
    curry: function(fn, opt_minLength) {
      var args = arguments.length > 2 ? _.toArray(arguments, 2) : [];
      var curried = function() {
        var newArgs = args.slice();
        if (!arguments.length)
          return fn.apply(this, args);
        var ind = 0;
        _.each(arguments, function(arg) {
          if (arg == null) {
            while (newArgs[ind++] != null) {}
          } else {
            while (newArgs[ind] != null)
              ind++;
            newArgs[ind] = arg;
          }
        });
        var newArgsLength = _.filter(newArgs, function(arg) {
          return arg != null;
        }).length;
        if (opt_minLength <= newArgsLength) {
          return fn.apply(this, newArgs);
        }
        return _.curry.apply(this,
          [fn].concat(opt_minLength != null ?
          opt_minLength - newArgsLength : undefined, newArgs));
      };
      return curried;
    },

    // push to an array in an object and create one if it doesn't exist
    push: function(obj, key, value) {
      if (value != null) {
        if (!obj[key])
          obj[key] = [];
        obj[key].push(value);
      }
    },

    // put a key/value pair in an object if the value is defined
    put: function(obj, key, value) {
      if (obj == null)
        throw new Error('no object passed in');
      if (_.isEmpty(key))
        throw new Error('no key given');
      var names = key.split('.');
      while (names.length > 1) {
        var name = names.shift();
        if (obj[name] == null) {
          obj[name] = {};
        }
        obj = obj[name];
      }
      if (value == null) {
        delete obj[names[0]];
      } else {
        obj[names[0]] = value;
      }
      return obj;
    },

    // gets a value given a key and object
    get: function(key, obj, backup) {
      return _.exist(obj, key, backup);
    },

    // create a function that will run the initially given functions in order
    // with the called arguments and return the last result
    seq: function() {
      var functions = arguments;
      var length = functions.length;
      return function() {
        var result;
        for (var i = 0; i < length; i++) {
          result = functions[i].apply(this, arguments);
        }
        return result;
      };
    },

    // returns if an object is empty or doesn't exist
    isEmpty: function(obj) {
      return obj == null ||
        (_.isObject(obj) && !_.keys(obj).length) ||
        (_.isString(obj) && !obj.length);
    },

    // give a base object and string with dot delimited namespace. Will return
    // the backup or undefined if it doesn't exist else will return the value
    exist: function(obj, namespace, backup) {
      if (!obj) return;
      var names = namespace.split('.').reverse();
      while(names.length && (obj = obj[names.pop()]) != null);
      return( obj == null ? backup : obj);
    },

    // call a function on an object and set the object to the result
    inPlace: function(obj, namespace, fn) {
      if (!obj) return;
      var names = namespace.split('.').reverse();
      while(names.length > 1 && (obj = obj[names.pop()]) != null);
      if (!obj || !obj[names[0]])
        return;
      if (_.isString(fn)) {
        if (_.isFunction(obj[names[0]][fn])) {
          fn = obj[names[0]][fn];
        } else {
          return;
        }
      }
      return (obj[names[0]] = fn.apply(obj[names[0]], _.toArray(arguments, 3)));
    },

    // pass in the context as the first value to a function
    feedThis: function(fn) {
      return function() {
        return fn.apply(this, [this].concat(_.toArray(arguments)));
      };
    },

    // if an object exists pass it to a function
    canUse: function(obj, fn, ctx) {
      if (obj == null)
        return;
      return fn.call(ctx || this, obj);
    },

    // call a function from the context of an object
    callOn: function(fn, obj) {
      var args = _.toArray(arguments, 2);
      if (obj == null)
        return;
      if (_.isString(fn) && _.isFunction(obj[fn]))
        return obj[fn].apply(obj, args);
      if (_.isFunction(fn))
        return fn.apply(obj, args);
    },

    // return a function that will call the functions on an object
    makeCallable: function(fn, obj) {
      var args = _.toArray(arguments, 2);
      return function() {
        var args2 = args.concat(_.toArray(arguments));
        return _.callOn.apply(this, [fn, obj].concat(args2));
      };
    },

    // return the true or false value passed in given the condition, if any of
    // them are functions then run with the extra arguments given
    ifelse: function(cond, tr, fa) {
      var args = _.toArray(arguments, 3);
      var test = _.isFunction(cond) ? cond.apply(this, args) : cond;
      if (test) {
        return _.isFunction(tr) ? tr.apply(this, args) : tr;
      } else {
        return _.isFunction(fa) ? fa.apply(this, args): fa;
      }
    },

    // add on slice variables to the underscore toArray
    toArray: function(arr, start, end) {
      return [].slice.call(toArray(arr), start || 0, end);
    },

    // only give the first x arguments to a function
    cutArgs: function(fn, num) {
      return function() {
        var args = _.toArray(arguments, 0, num);
        return fn.apply(this, args);
      };
    },

    // pythonesque string interpolation
    print: function(str) {
      var args = _.toArray(arguments, 1).reverse();
      return str.replace(/%s/g, function() {
        var arg = args.pop();
        return (arg == null ? '' : '' + arg);
      });
    },

    // just like delay but you can pass in the context
    wait: function(fn, time, ctx) {
      fn = _.bind(fn, ctx || this);
      return _.delay.apply(this, [fn, time].concat(_.toArray(arguments, 3)));
    },

    // enhanced map function can also map values of an object
    map: function (obj, iterator, context) {
      if (!obj)
        return [];
      var results = _.isArray(obj) ? [] : {};
      if (obj == null) return results;
      if (_.isFunction(obj.map)) return obj.map(iterator, context);
      _.each(obj, function(value, index, list) {
        results[index] = iterator.call(context, value, index, list);
      });
      return results;
    },

    isArguments: function(obj) {
      return obj && !!obj.callee;
    },

    createTest: function(test) {
      var ret = function() {
        return _.all(arguments, function(val) {
          return _.isArguments(val) ?
            ret.apply(_, _.toArray(val)) :
            test(val);
        });
      };
      return ret;
    },

    // test two arrays for equality, optional levels for how deep to test (e.g. Infinity)
    arrayEquals: function(a, b, levels) {
      return a.length == b.length && _.all(a, function(a, i) {
        return levels ? _.equals(b[i], a, levels - 1) : b[i] == a;
      });
    },

    // test two objects for equality, optional levels for how deep to test (e.g. Infinity)
    equals: function(a, b, levels) {
      levels = levels || 0;
      if (a == b)
        return true;
      if (_.isArray(a) && _.isArray(b))
        return _.arrayEquals(a, b, levels);
      if (_.isObject(a) && _.isObject(b))
        return _.arrayEquals(_.pairs(a), _.pairs(b), levels + 1);
      return false;
    },

    // sort the pairs array from an object by keys
    pairs: function(obj) {
      return pairs(obj).sort(function(a, b) {
        return _.strCmp(a[0], b[0]);
      });
    },

    // string compare for sort functions
    strCmp: function(a, b) {
      return a > b ? 1 : a < b ? -1 : 0;
    },

    // return a new function that negates the return value
    negate: function(fn) {
      return function() {
        return !fn.apply(this, _.toArray(arguments));
      };
    }

  });

  _.mixin({
    isNotEmpty: _.negate(_.isEmpty)
  });

  _.mixin({
    argsExist: _.createTest(_.isNotEmpty)
  });

});
