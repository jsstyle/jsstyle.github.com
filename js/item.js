JSStyle.Item = function(data) {
	this._data = data;
	this._options = [];
}

/* so far, a maximum of 6 options is used */
JSStyle.Item.COLORS = ["red", "green", "blue", "cyan", "magenta", "yellow", "black", "white"];

JSStyle.Item.prototype.getId = function() {
	return this._data.id;
}

JSStyle.Item.prototype.getName = function() {
	return this._data.name;
}

JSStyle.Item.prototype.getValue = function() {
	for (var i=0;i<this._options.length;i++) {
		var option = this._options[i];
		if (option.isChecked()) { return option.getId(); }
	}
	return null;
}

JSStyle.Item.prototype.getValueName = function() {
	for (var i=0;i<this._options.length;i++) {
		var option = this._options[i];
		if (option.isChecked()) { return option.getName(); }
	}
	return null;
}

JSStyle.Item.prototype.getColor = function() {
	var value = this.getValue();
	if (value === null) {
		return "transparent";
	} else {
		var options = [];
		for (var i=0;i<this._options.length;i++) {
			var option = this._options[i].getId();
			options.push(option);
		}
		
		options.sort(function(a, b) {
			return (a < b ? -1 : 1);
		});

		return this.constructor.COLORS[options.indexOf(value)];
	}
}

JSStyle.Item.prototype.build = function(parent) {
	var ids = {};
	var name = "item_" + Math.random().toString().replace(/[^0-9]/g, "");

	var box = document.createElement("section");
	box.className = "item";
	var heading = document.createElement("h3");
	heading.innerHTML = this._data.name;
	
	var ul = document.createElement("ul");
	var options = this._data.options;
	for (var i=0;i<options.length;i++) {
		var option = new JSStyle.Option(options[i]);
		this._options.push(option);

		var id = option.getId();
		if (id in ids) { throw new Error("Duplicate option ID '" + id + "' for item '" + this.getId() + "'"); }
		ids[id] = true;

		option.build(ul, name);
	}
	
	[heading, ul].forEach(box.appendChild, box);
	parent.appendChild(box);
	return this;
}

JSStyle.Item.prototype.setValue = function(value) {
	for (var i=0;i<this._options.length;i++) {
		var option = this._options[i];
		option.uncheck();
		if (option.getId() == value) { option.check(); }
	}
	return this;
}
