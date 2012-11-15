var RIO = RIO || {};

RIO.Buttons = {
	bold: {
		name: 'bold',
		label: 'Bold',
		shortcuts: ['ctrl+b', 'meta+b'],
		init: function() {
			// This wont work unless the element has been rendered first.
			//this.addEventListener(this.element, 'mouseover', function() { console.log('mouseover'); });
		},
		callback: function(editor) {
			var selection = editor.getSelection();

			if (selection.text != '') {
				editor.wrapSelection('<strong>', '</strong>');
			} else if (this.state === 'active') {
				this.state = 'inactive';
				editor.wrapSelection('', '</strong>');
			} else {
				this.state = 'active';
				editor.wrapSelection('<strong>', '');
			}
		}
	},
	italic: {
		name: 'italic',
		label: 'Italic',
		shortcuts: ['ctrl+i', 'meta+i', ''],
		callback: function(editor) {
			var selection = editor.getSelection();

			if (selection.text != '') {
				editor.wrapSelection('<em>', '</em>');
			} else if (this.status === 'active') {
				this.status = 'inactive';
				editor.wrapSelection('', '</em>');
			} else {
				this.status = 'active';
				editor.wrapSelection('<em>', '');
			}
		}
	},
	olist: {
		name: 'olist',
		label: 'Numbered List',
		callback: function(editor) {
			console.log(this.name);
		}
	},
	ulist: {
		name: 'ulist',
		label: 'Bulleted List',
		callback: function(editor) {
			console.log(this.name);
		}
	},
	link: {
		name: 'link',
		label: 'Hyperlink',
		callback: function(editor) {
			console.log(this.name);
		}
	},
	image: {
		name: 'image',
		label: 'Image',
		callback: function(editor) {
			console.log(this.name);
		}
	},
	code: {
		name: 'code',
		label: 'Code',
		callback: function(editor) {
			console.log(this.name);
		}
	},
	quote: {
		name: 'quote',
		label: 'Block Quote',
		callback: function(editor) {
			console.log(this.name);
		}
	},
	heading: {
		name: 'heading',
		label: 'Heading',
		callback: function(editor) {
			console.log(this.name);
		}
	},
	hr: {
		name: 'hr',
		label: 'Horizontal Line',
		callback: function(editor) {
			console.log(this.name);
		}
	},
	undo: {
		name: 'undo',
		label: 'Undo',
		shortcuts: ['ctrl+z', 'meta+z'],
		callback: function(editor) {
			console.log(this.name);
		}
	},
	redo: {
		name: 'redo',
		label: 'Redo',
		shortcuts: ['ctrl+y', 'ctrl+shift+z', 'meta+y', 'meta+shift+z'],
		callback: function(editor) {
			console.log(this.name);
		}
	},
	help: {
		name: 'help',
		label: 'Help',
		url: 'http://daringfireball.net/projects/markdown/basics',
		callback: function(editor) {
			window.open(this.url, '_blank');
		}
	},
	separator: {
		name: 'separator'
	}
};