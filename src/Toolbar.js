var RIO = RIO || {};

RIO.Toolbar = function(buttons, options) {
	/**
	 * @access private
	 */
	var self = this;
	
	/**
	 * @access public
	 */
	self.element;
	self.buttons = buttons || [];
	
	/**
	 * @access private
	 */
	var init = function() {
		self = RIO.Util.extend(self, options);
		
		self.render();
	};
	
	/**
	 * @access public
	 */
	this.render = function() {
		self.element = document.createElement('ul');
		self.element.className = 'rio-toolbar';

		for (var x = 0; x < self.buttons.length; x++) {
			self.element.appendChild(self.buttons[x].getElement());
		}
	};
	
	self.getElement = function() {
		return self.element;
	};
	
	self.addEventListeners = function(editor) {
		for (var x = 0; x < self.buttons.length; x++) {
			// Bind event listeners to buttons
			self.buttons[x].addEventListeners(editor);
		}
	};
	
	self.addButton = function(button) {
		//button.addEventListeners();
		self.buttons.push(button);
		self.render();
		return self.buttons.length - 1;
	};
	
	self.removeButton = function(id) {
		//button.removeEventListeners();
		self.buttons.splice(self.buttons.indexOf(id), 1);
		self.render();
	};
	
	init();
};