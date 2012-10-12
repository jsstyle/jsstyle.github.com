var JSStyle = function(data) {
	this.constructor.instance = this;
	this._items = {};
	this._data = data;
}

JSStyle.prototype.build = function(parent) {
	for (var i=0;i<this._data.length;i++) {
		var item = new JSStyle.Item(this._data[i]);
		this._items[item.getId()] = item;
		item.build(parent);
	}
}

JSStyle.prototype.toDebug = function() {
	var result = {};
	for (var id in this._items) {
		var item = this._items[id];
		result[item.getName()] = item.getValue();
	}
	return result;
}

JSStyle.prototype.toJSON = function() {
	var result = {};
	for (var id in this._items) {
		var item = this._items[id];
		result[id] = item.getValue();
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

JSStyle.prototype.toCanvas = function(size) {
	var size = 200;
	var canvas = document.createElement("canvas");
	canvas.className = "jslogo";
	canvas.width = size;
	canvas.height = size;
	
	var ctx = canvas.getContext("2d");
	ctx.fillStyle = "#ff0";
	ctx.fillRect(0, 0, size, size);
	
	ctx.textBaseline = "bottom";
	ctx.textAlign = "right";
	ctx.font = "bold 80px arial, sans-serif";
	ctx.fillStyle = "#323330";
	ctx.fillText("JS", size-10, size);
	
	var count = 0;
	for (var id in this._items) {
		this._drawItemToCanvas(this._items[id], ctx, count++);
	}
	
	return canvas;
}

JSStyle.prototype._drawItemToCanvas = function(item, ctx, index) {
	var size = 20;
	var line = Math.floor((Math.sqrt(1+8*index)-1)/2);
	
	var before = line * (line+1) / 2;
	index -= before;
	var x = index;
	var y = line - index;
	
	ctx.fillStyle = "red";
	ctx.fillRect(x*size, y*size, size, size);
}
/*
sum(1..n) = n * (n+1) / 2;

sum = n*(n+1)/2
2*sum = n*(n+1)
2*sum = n*n + n
n*n + n - 2*sum = 0;

A = 1
B = 1 
C = -2*sum


D = B*B - 4*A*C ?
n = (-B +- sqrt(D)) / 2A

D = 1 + 8*sum
n = -1 - sqrt(1 + 8*sum) / 2
n = (sqrt(1+8*sum)-1)/2;

0..0
1..1
2..1+
3..2
4..2+
5..2+
6..3
7..3+
8..3+
9..3+
10..4

*/
