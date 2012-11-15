var RIO = RIO || {};

RIO.Editor = function(options) {
	/**
	 * @access private
	 */
	var self = this;
	
	self.container;
	self.toolbarContainer,
	self.input,
	self.preview,
		
	self.toolbars = [],
	self.showPreview = false,
		
	self.edits = [],
	self.undoneEdits = [],
	self.shortcuts = {};
	
	/**
	 * @access private
	 */
	var init = function() {
		self = RIO.Util.extend(self, options);
		
		render();
		addEventListeners();
	};
	
	var handleKey = function(event) {
		var charCode = event.which || event.keyCode,
			modifiers = RIO.Util.eventModifiers(event),
			keys = RIO.Util.mapKeys(modifiers),
			shortcut;
			
			keys.push(charCode);
			shortcut = keys.sort().join('+') + ':' + event.type;
			
		if (self.shortcuts[shortcut]) {
			self.shortcuts[shortcut](event);
		}
	};
	
	var handlePaste = function(event) {
		// if (uaSniffed.isIE || (inputStateObj && inputStateObj.text != panels.input.value)) {
		// 	if (timer == undefined) {
		// 		mode = "paste";
		// 		saveState();
		// 		refreshState();
		// 	}
		// }
	};
	
	var addEventListeners = function() {
		RIO.Util.addEventListener(self.input, 'keypress', handleKey);
		RIO.Util.addEventListener(self.input, 'keydown', handleKey);
		RIO.Util.addEventListener(self.input, 'keyup', handleKey);
		
		//RIO.Util.addEventListener(self.input, 'paste', handlePaste);
		//RIO.Util.addEventListener(self.input, 'drop', handlePaste);
		
		self.bindKeys('ctrl+z', self.undo);
		self.bindKeys(['ctrl+y', 'ctrl+shift+z'], self.redo);
		
		for (var x = 0; x < self.toolbars.length; x++) {
			self.toolbars[x].addEventListeners(self);
		}
	};
	
	/**
	 * @access public
	 */
	render = function() {
		// Create container
		if (!self.container) {
			self.container = document.createElement('div');
			RIO.Util.addClass(self.container, 'rio-editor');
			self.input.parentNode.insertBefore(self.container, self.input);
		}

		// Create toolbar container
		if (!self.toolbarContainer) {
			self.toolbarContainer = document.createElement('div');
			RIO.Util.addClass(self.toolbarContainer, 'rio-toolbars');
			self.container.appendChild(self.toolbarContainer);
		}

		// Insert toolbars
		self.toolbarContainer.innerHTML = '';
		for (var x = 0; x < self.toolbars.length; x++) {
			RIO.Util.addClass(self.toolbars[x].getElement(), 'rio-toolbar-' + x);
			self.toolbarContainer.appendChild(self.toolbars[x].getElement());
		}

		// Prepare input
		RIO.Util.addClass(self.input, 'rio-input');
		self.container.appendChild(self.input.parentNode.removeChild(self.input));

		// Create preview
		if (self.showPreview) {
			self.preview = document.createElement('div');
			RIO.Util.addClass(self.preview, 'rio-preview');
			self.preview.contentEditable = 'true';
			self.container.appendChild(self.preview);
		}
	};
	
	self.addToolbar = function(toolbar) {
		toolbar.addEventListeners(self);
		self.toolbars.push(toolbar);
		render();
		return self.toolbars.length - 1;
	};
	
	self.removeToolbar = function(id) {
		// toolbar.removeEventListeners();
		self.toolbars.splice(self.toolbars.indexOf(id), 1);
		render();
	};
	
	/**
	 * Borrowed from http://stackoverflow.com/a/2966703
	 */
	self.getSelection = function() {
	    if ('selectionStart' in self.input) { // Mozilla and DOM 3.0
	        var length = self.input.selectionEnd - self.input.selectionStart;
	        return {
				start: self.input.selectionStart,
				end: self.input.selectionEnd,
				length: length,
				text: self.input.value.substr(self.input.selectionStart, length)
			};
	    } else if (document.selection) { // IE
	        self.input.focus();
	        var r = document.selection.createRange();
	        var tr = self.input.createTextRange();
	        var tr2 = tr.duplicate();
	
	        tr2.moveToBookmark(r.getBookmark());
	        tr.setEndPoint('EndToStart', tr2);
	
	        if (r == null || tr == null) {
				return {
					start: self.input.value.length, 
					end: self.input.value.length, 
					length: 0, 
					text: '' 
				};
			}
			
			//for some reason IE doesn't always count the \n and \r in the length
	        var selected_text = r.text.replace(/[\r\n]/g, '.');
	        var text = self.input.value.replace(/[\r\n]/g, '.');
	        var start = text.indexOf(selected_text, tr.text.length);
	
	        return { 
				start: start, 
				end: start + selected_text.length, 
				length: selected_text.length, 
				text: r.text 
			};
	    } else { // Browser not supported
			return {
				start: self.input.value.length, 
				end: self.input.value.length, 
				length: 0, 
				text: '' 
			};
		}
	};
	
	self.setSelection = function(start, end) {
		if ('selectionStart' in self.input) { // Mozilla and DOM 3.0
			self.input.focus();
			self.input.selectionStart = start;
			self.input.selectionEnd = end;
		} else if (document.selection) { // IE
			self.input.focus();
			var tr = self.input.createTextRange(),
				stop;

			//Fix IE from counting the newline characters as two seperate characters
			stop = start;
			for (var i = 0; i < stop; i++) {
				if (self.input.value[i].search(/[\r\n]/) != -1) {
					start -= .5;
				}
			}
			stop = end;
			for (var i = 0; i < stop; i++) {
				if (self.input.value[i].search(/[\r\n]/) != -1) {
					end -= .5;
				}
			}

			tr.moveEnd('textedit', -1);
			tr.moveStart('character', start);
			tr.moveEnd('character', end - start);
			tr.select();
		}
	};
	
	self.replaceSelection = function(replacement) {
		var selection = self.getSelection(),
			start = selection.start;
			end = start + replacement.length;

		self.input.value = self.input.value.substr(0, start) + replacement + self.input.value.substr(selection.end, self.input.value.length);
		self.setSelection(start, end);
	};
	
	self.wrapSelection = function(left, right) {
		var selection = self.getSelection();

		self.replaceSelection(left + selection.text + right);

		if (selection.text == '') {
			self.setSelection(selection.start + left.length, selection.start + left.length);
		}
	};
	
	self.undo = function() {
		return false; // Stop propegation
	};
	
	self.redo = function() {
		return false; // Stop propegation
	};
	
	self.bindKeys = function(keys, callback, action) {
		if (!keys.length) return;
		
		// Bind multiple key combinations to the same callback
		if (keys instanceof Array) {
			for (var x = 0; x < keys.length; x++) {
				self.bindKeys(keys[x], callback, action);
			}
			return;
		}
		
		// keypress for letters/numbers, keydown for everything else
		var action = 'keydown'
		
		keys = (keys === '+') ? ['+'] : keys.split('+');
		shortcut = RIO.Util.mapKeys(keys).sort().join('+');
		
		self.shortcuts[shortcut + ':' + action] = callback;
	};
	
	init();
};