var RIO = RIO || {};

RIO.Util = {
	extend: function(object, extension) {
		for (var x in extension) {
			object[x] = extension[x];
		}
		
		return object;
	},
	clone: function(object) {
		if (!(object instanceof Object)) {
			return object;
		} else if (object instanceof Array) {
			return object.slice();
		} else {
			return this.extend({}, object);
		}
	},
	unique: function(array) {
		var u = {},
			a = [];
			
		for (var x = 0; x < array.length; x++) {
			if (u.hasOwnProperty(array[x])) continue;
			
			a.push(array[x]);
			u[array[x]] = 1;
		}
		
		return a;
	},
	addClass: function(element, classes) {
		classes = (element.className + ' ' + classes).replace(/\s+/g, ' ').split(' ');
		element.className = this.unique(classes).join(' ').replace(/^\s+|\s+$/g, '');
	},
	removeClass: function(element, classes) {
		
	},
	addEventListener: function(object, type, callback) {
		// Wrap the callback in a function that can stop event propegation if false is returned
		// callback = function(event) {
		// 			if (callback(event) === false) {
		// 				if (event.preventDefault) {
		// 					event.preventDefault();
		// 				}
		// 				event.returnValue = false; // IE
		// 
		// 				if (event.stopPropagation) {
		// 					event.stopPropagation();
		// 				}
		// 				event.cancelBubble = true; // IE
		// 			}
		// 		};
		
		if (object.attachEvent) {
			object.attachEvent('on' + type, callback);
		} else {
			object.addEventListener(type, callback, false);
		}
	},
	eventModifiers: function(event) {
		var modifiers = [];

		if (event.shiftKey) modifiers.push('shift');
		if (event.altKey) modifiers.push('alt');
		if (event.ctrlKey) modifiers.push('ctrl');
		if (event.metaKey) modifiers.push('meta');

		return modifiers;
	},
	mapKeys: function(keys) {
		for (var x = 0; x < keys.length; x++) {
			keys[x] = this.keymap[keys[x]];
		}
		
		return keys;
	},
	keymap: {
		'backspace': 8, 'tab': 9, 'enter': 13, 'return': 13, 'shift': 16, 'ctrl': 17, 'alt': 18, 'option': 18, 'pause': 19, 'break': 19,
		'capslock': 20, 'escape': 27, 'esc': 27, 'space': 32, 'spacebar': 32, 'pageup': 33, 'pagedown': 34, 'end': 35, 'home': 36, 'left': 37,
		'up': 38, 'right': 39, 'down': 40, 'insert': 45, 'delete': 46, 
		
		'0': 48, '1': 49, '2': 50, '3': 51, '4': 52, '5': 53, '6': 54, '7': 55, '8': 56, '9': 57,
		
		'a': 65, 'b': 66, 'c': 67, 'd': 68, 'e': 69, 'f': 70, 'g': 71, 'h': 72, 'i': 73, 'j': 74, 'k': 75, 'l': 76, 'm': 77, 'n': 78, 'o': 79,
		'p': 80, 'q': 81, 'r': 82, 's': 83, 't': 84, 'u': 85, 'v': 86, 'w': 87, 'x': 88, 'y': 89, 'z': 90,
		
		'meta': 91, 'command': 91, 'windows': 91, 'win': 91, 'select': 93,
		
		'num0': 96, 'num1': 97, 'num2': 98, 'num3': 99, 'num4': 100, 'num5': 101, 'num6': 102, 'num7': 103, 'num8': 104, 'num9': 105,
		
		'*': 106, '+': 107, '-': 109, '.': 110, '/': 111,
		
		'f1': 112, 'f2': 113, 'f3': 114, 'f4': 115, 'f5': 116, 'f6': 117, 'f7': 118, 'f8': 119, 'f9': 120, 'f10': 121, 'f11': 122, 'f12': 123,
		
		'numlock': 144, 'num': 144, 'scrolllock': 145, 'scroll': 145, ';': 186, '=': 187, ',': 188, '-': 189, '.': 190, '/': 191, '`': 192,
		'[': 219, '\\': 220, ']': 221, '\'': 222
	}
};