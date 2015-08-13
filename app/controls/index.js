$(function() {

	var _sidemenu = {
		element: $('.sidemenu'),
		open: function() {
			this.modify();
			this.element.removeClass('is-close');
		},
		modify: function(item, type) {

			if (type === 'drop') {
				this.modify(item, 'leave');

				item
					.addClass('is-selected')
					.addClass('animated')
					.addClass('infinite')
					.addClass('tada');

				this.element.addClass('is-modified');
			} else if (type === 'enter') {
				item
					.addClass('animated')
					.addClass('infinite')
					.addClass('shake');
			} else if (type === 'leave') {
				item
					.removeClass('animated')
					.removeClass('infinite')
					.removeClass('shake');
			} else {

				this.element.removeClass('is-modified');

				this.element.find('.capsule').each(function() {
					$(this)
						.removeClass('is-selected')
						.removeClass('animated')
						.removeClass('infinite')
						.removeClass('tada')
						.removeClass('shake');
				});
			}
		},

		close: function() {
			this.element.addClass('is-close');
		}
	};

	var _drag = {
		element: undefined,
		dragging: false,

		original: {
			element: undefined,

			set: function(element) {
				this.element = element;

				this.element
					.addClass('animated')
					.addClass('bounce');
			},

			leave: function() {
				this.element
					.removeClass('animated')
					.removeClass('bounce');

				this.element = undefined;
			}
		},

		set: function(element) {
			this.element = element;
			this.dragging = true;
			this.original.set(element);
			_sidemenu.open();
		},

		leave: function() {
			this.element = undefined;
			this.original.leave();

			this.dragging = false;

			_sidemenu.close();
		},

		mousemove: function(event) {
			if (_drag.dragging) {
				_drag.clearSelection();
			}
		},

		mouseup: function(event) {
			if (_drag.dragging) {
				_drag.leave();
			}
		},

		dragenter: function(event) {
			event.preventDefault();
			_sidemenu.modify($(this), 'enter');
			return false;
		},

		dragleave: function(event) {
			_sidemenu.modify($(this), 'leave');
		},

		dragend: function(event) {
			event.preventDefault();
			return false;
		},

		drop: function(event) {
			_sidemenu.modify($(this), 'drop');
		},

		clearSelection: function() {
			window.getSelection().empty();
		}
	};

	$('body')
		.mousemove(_drag.mousemove)
		.mouseup(_drag.mouseup);

	$('.entry')
		.mousedown(function(event) {
			$(this).data('pressed', true);
		})
		.mouseup(function(event) {
			$(this).data('pressed', false);
		})
		.mouseleave(function(event) {
			$(this).data('pressed', false);
		})
		.mousemove(function(event) {
			var self = $(this);
			var pressed = self.data('pressed');

			if (pressed && !_drag.dragging) {
				_drag.set(self);
			}
		})
		.on('dragstart', function(event) {
			_drag.set($(this));
		})
		.on('dragend', function(event) {
			_drag.leave();
		})
		.each(function() {
			$(this)
				.data('pressed', false)
				.attr('draggable', true);

		});

	$('.capsule')
		.on('dragenter', _drag.dragenter)
		.on('dragleave', _drag.dragleave)
		.on('dragend', _drag.dragend)
		.on('dragover', _drag.dragend)
		.on('drop dragdrop', _drag.drop);

});