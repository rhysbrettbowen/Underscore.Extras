# Underscore.extras #

more functionality for underscore, come functionality take from [http://closure-library.googlecode.com/svn/docs/closure_goog_array_array.js.html]

## include ##

made for require js, alter it to work for your project

## Functions ##

### sum(array|object) ###

sums the values for an array or object

### relative(array, item, number) ###

given an array, a contained child element and a number which is a relative index (e.g. -1 to go one to the left) it will return the relative child

### insert(array, item) ###

push an item on the array if it doesn't already exist

### removeAt(array, index) ###

remove an item at a given index

### remove(array, item) ###

remove and item from an array

### removeIf(array, function) ###

removes the first item that satisfies (returns true) the function (takes the item and index)

### giveUid(object) ###

returns a uid that is placed on the object, or the uid if already given one

### flip(function, *number...) ###

changes the order of the arguments in a function. If none given it will flip the first two arguments.
e.g. to rotate the first three arguments along one:
` var rotated = _.flip(myFn, 1, 2, 0);`

### curry(function, *number, *args...) ###

will return a self-currying function that will only run when the number (minimum length) of arguments are reached or is called with no arguments. Passing in an undefined argument acts as a gap in the argument list that can be filled later. read more at https://github.com/rhysbrettbowen/functional-closure#funccurryfunction-opt_minlength-opt_args

### push(object, string, value) ###

will push the value on to the object[string] array and create one if it doesn't exist

### put(object, string, value) ###

will remove object[string] is value is undefined, else will put it on the object

### get(string, object, *item) ###

the string can be a dot delimitted namespace that may exist on the object. If it doesn't it will return the optional item

### seq(function...) ###

return a function that will run all the functions in sequence with the same arguments returning the result of the last one

### isEmpty(object) ###

will return true for null, undefined or an empty object, array or string (false for 0)

### exist(object, string, *item) ###

the same as _.get, just different argument order

### inPlace(object, string, string|function, *object) ###

given an object and dot delimitted namespace, call the function (with optional context given or context as the namespace) and first argument as the namespace and set the namespace to the result.

### feedThis(function) ###

return a function that will pass in it's context as the first value to the given function.

### canUse(object, function, *ctx) ###

only run the function with given context if object is not undefined.

### call(string|function, object) ###

call the function (or object[string]) from the context of object if object exists

### makeCallable(function, object) ###

returns a function that will only run if object and function are defined

### ifelse(condition|function, item|function, *item|function) ###

if the condition or function evaluates to true return the evaluated first argument, else the second

### toArray(arrayLike, *number, *number) ###

extends underscores toArray to take in two optional number variables which are used to slice the returned array

### wait(function, number, *object) ###

just like _.delay but the last parameter is an optional context for the function

### map(object, function, *object) ###

extends underscore map to also work with objects (will return an object with the values mapped if an object is used);
