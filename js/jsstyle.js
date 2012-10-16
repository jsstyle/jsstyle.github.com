var JSStyle = function(data) {
	this.constructor.instance = this;
	this._items = {};
	this._data = data;
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
		result[item.getId()] = item.getValue();
	}
	return result;
}

JSStyle.prototype.toHash = function() {
	var ids = this._sortIds();
	var result = [];
	while (ids.length) {
		var value = this._items[ids.shift()].getValue();
		var code = "x";
		
		if (value !== null) {
			/* from 32 to 128 exclusive, e.g. 96 values */
			var code = value.charCodeAt(0);
			
			code -= 32;
			code = code.toString();
			while (code.length < 2) { code = "0" + code; } /* poor man's lpad */
		}
		
		
		result.push(code);
	}
	
	return result.join("");
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
	
	var ids = this._sortIds();
	for (var i=0;i<ids.length;i++) { 
		var id = ids[i];
		var coords = this._indexToCoords(i);

		ctx.fillStyle = "red";
		ctx.fillRect(coords[0]*s, coords[1]*s, s, s);
	}
	
	return canvas;
}

JSStyle.prototype.toAA = function() {
	var width = 20;
	var height = 11;

	var node = document.createElement("textarea");
	node.cols = width;
	node.rows = height;
	node.readOnly = true;
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
	
	var JS = "12,5 15,5 16,5 12,6 14,6 12,7 15,7 16,7 9,8 12,8 17,8 10,9 11,9 15,9 16,9";
	var chars = JS.split(" ");
	while (chars.length) {
		var parts = chars.shift().split(",");
		data[parts[0]][parts[1]] = "#";
	}

	var ids = this._sortIds();
	for (var i=0;i<ids.length;i++) { 
		var id = ids[i];
		var coords = this._indexToCoords(i);
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

JSStyle.prototype.fromJSON = function(data) {
	for (var id in data) {
		var item = this._items[id];
		if (!item) { continue; }
		item.setValue(data[id]);
	}

	return this;
}

JSStyle.prototype.fromHash = function(str) {
	var ids = this._sortIds();
	
	while (str.length && ids.length) {
		var item = this._items[ids.shift()];
		var ch = str.charAt(0);
		var code = 0;
		
		if (ch == "x") { /* empty*/
			str = str.substring(1);
			item.setValue(null);
		} else { /* number */
			ch += str.charAt(1);
			str = str.substring(2);
			code = parseInt(ch, 10) + 32;
			item.setValue(String.fromCharCode(code));
		}
	}
	
	/* fill remaining with nulls */
	while (ids.length) { this._items[ids.shift()].setValue(null); }

	return this;
}

JSStyle.prototype.fromAA = function(str) {
	var ids = this._sortIds();

	var parts = str.split("\n");
	parts.shift();
	parts = parts.map(function($) { return $.substring(1); });
	
	var x = 0;
	var y = 0;

	while (ids.length) {
		var item = this._items[ids.shift()];
		var row = parts[y] || "";
		var value = row.charAt(x);
		if (value.length == 0) { value = null; }
		item.setValue(value);
		
		y--;
		if (y < 0) {
			y = x+1;
			x = 0;
		} else {
			x++;
		}
	}
	
}

JSStyle.prototype._indexToCoords = function(index) {
	var line = Math.floor((Math.sqrt(1+8*index)-1)/2);
	var before = line * (line+1) / 2;
	index -= before;
	return [index, line-index];
}

JSStyle.prototype._sortIds = function() {
	var ids = [];
	for (var id in this._items) { ids.push(id); }
	ids.sort(function(a, b) {
		return (a < b ? -1 : 1);
	});
	return ids;
}
