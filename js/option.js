JSStyle.Option = function(data) {
	this._data = data;
	this._dom = {
		radio: null
	}
}

JSStyle.Option.prototype.getValue = function() {
	return this._data.name;
}

JSStyle.Option.prototype.build = function(parent, name) {
	var li = document.createElement("li");
	var label = document.createElement("label");
	var radio = document.createElement("input");
	radio.type = "radio";
	radio.name = name;
	var span = document.createElement("span");
	span.innerHTML = this._data.name;
	
	[radio, span].forEach(label.appendChild, label);
	li.appendChild(label);
	parent.appendChild(li);
	
	this._dom.radio = radio;
	return this;
}

JSStyle.Option.prototype.isChecked = function() {
	return this._dom.radio.checked;
}

JSStyle.Option.prototype.check = function() {
	this._dom.radio.checked = true;
	return this;
}

JSStyle.Option.prototype.uncheck = function() {
	this._dom.radio.checked = false;
	return this;
}
