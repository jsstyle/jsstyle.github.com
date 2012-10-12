var JSStyle = function(data) {
	this.constructor.instance = this;
	this._items = {};

/*	data.sort(function(a, b) {
		return (a.id < b.id ? -1 : 1);
	}) */
	this._data = data;

	document.addEventListener("click", this);
}

JSStyle.prototype.handleEvent = function(e) {
	var result = document.querySelector("#result");
	result.innerHTML = "";

	result.appendChild(this.toCanvas());

	var pre = document.createElement("pre");
	pre.innerHTML = JSON.stringify(this.toJSON(), null, "  ");
	result.appendChild(pre);

	result.appendChild(this.toAA());
}

JSStyle.prototype.build = function(parent) {
	var ids = {};
	for (var i=0;i<this._data.length;i++) {
		var item = new JSStyle.Item(this._data[i]);
		this._items[item.getId()] = item;

		var id = item.getId();
		if (id in ids) { throw new Error("Duplicate ID '" + id + "'"); }
		ids[id] = true;

		item.build(parent);
	}
}

JSStyle.prototype.toDebug = function() {
	var result = {};
	for (var id in this._items) {
		var item = this._items[id];
		result[item.getName()] = item.getValueName();
	}
	return result;
}

JSStyle.prototype.toJSON = function() {
	var result = {};
	for (var id in this._items) {
		var item = this._items[id];
		var value = item.getValue();
		if (value === null) { continue; }
		result[id] = value;
	}
	return result;
}

JSStyle.prototype.fromJSON = function(obj) {
	for (var id in obj) {
		this._items[id].setValue(obj[id]);
	}
	return this;
}

JSStyle.prototype.isDone = function() {
	for (var id in this._items) {
		if (this._items[id].getValue() === null) { return false; }
	}
	return true;
}

JSStyle.prototype.toCanvas = function() {
	var size = 200;
	var canvas = document.createElement("canvas");
	canvas.className = "jslogo";
	canvas.width = size;
	canvas.height = size;
	
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, size, size);
	
	ctx.textBaseline = "bottom";
	ctx.textAlign = "right";
	ctx.font = "bold 80px arial, sans-serif";
	ctx.fillStyle = "#323330";
	ctx.fillText("JS", size-10, size);
	
	var count = 0;
	var s = 20;
	for (var id in this._items) {
		var coords = this._indexToCoords(count++);

		ctx.fillStyle = "red";
		ctx.fillRect(coords[0]*s, coords[1]*s, s, s);
	}
	
	return canvas;
}

JSStyle.prototype.toAA = function() {
	var width = 20;
	var height = Math.round(width / 1.7);
	var node = document.createElement("pre");
	node.className = "jslogo";

	var data = [];
	for (var i=0;i<width;i++) {
		data.push([]);
		for (var j=0;j<height;j++) {
			var ch = " ";
			if (i == 0 || i+1 == width) { ch = "|";}
			if (j == 0 || j+1 == height) { ch = (ch == " " ? "-" : "+"); }

			data[i].push(ch);
		}
	}

	var count = 0;
	for (var id in this._items) {
		var coords = this._indexToCoords(count++);
		var val = this._items[id].getValue();
		if (val === null) { continue; }
		data[coords[0]+1][coords[1]+1] = val;
	}

	var str = "";
	for (var j=0;j<height;j++) {
		for (var i=0;i<width;i++) {
			str += data[i][j];
		}
		str += "\n";
	}
	node.innerHTML = str;
	
	return node;
}

JSStyle.prototype._indexToCoords = function(index) {
	var line = Math.floor((Math.sqrt(1+8*index)-1)/2);
	var before = line * (line+1) / 2;
	index -= before;
	return [index, line-index];
}