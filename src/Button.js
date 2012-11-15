var RIO = RIO || {};

RIO.Button = function(options) {
	/**
	 * @access private
	 */
	var self = this;
	
	/**
	 * @access public
	 */
	self.name;
	self.label;
	self.callback;
	self.shortcuts = [];
	self.element;
	self.state = 'inactive';
	
	/**
	 * @access private
	 */
	var init = function() {
		self = RIO.Util.extend(self, options);
		
		// Allow for a button specific init method
		if (typeof(self.init) === 'function') {
			self.init(options);
		}
		
		self.render();
	};
	
	/**
	 * @access public
	 */
	self.render = function() {
		self.element = document.createElement('li');
		self.element.className = ['rio-button', self.name, self.state].join(' ');
		self.element.title = self.label || '';
		self.element.innerHTML = self.label || '';
	};
	
	self.getElement = function() {
		return self.element;
	};
	
	self.addEventListeners = function(editor) {
		// Bind click event
		RIO.Util.addEventListener(self.element, 'click', function(event) {
			self.callback.call(self, editor);
		});
		
		// Bind shortcuts
		editor.bindKeys(self.shortcuts, function(event) {
			self.callback.call(self, editor);
		});
	};
	
	init();
};