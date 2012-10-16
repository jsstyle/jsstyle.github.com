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

JSStyle.prototype.toHash = function() {
	var ids = this._sortIds();
	var result = [];
	while (ids.length) {
		var id = ids.shift();
		var value = this._items[id].getValue();
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

JSStyle.prototype.fromHash = function(str) {
	var ids = this._sortIds();
	
	while (str.length && ids.length) {
		var id = ids.shift();
		var item = this._items[id];
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
	var height = 12;

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
	
	var JS = "12,6 15,6 16,6 12,7 14,7 12,8 15,8 16,8 9,9 12,9 17,9 10,10 11,10 15,10 16,10";
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
