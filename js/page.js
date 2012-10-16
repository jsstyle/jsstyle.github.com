var Page = {
	_dom: {},

	init: function() {
		this._jsstyle = new JSStyle(DATA);
		this._dom.about = document.querySelector("#about");
		this._dom.create = document.querySelector("#create");
		this._dom.decode = document.querySelector("#decode");
		this._dom.result = document.querySelector("#result");
		this._dom.createButton = document.querySelector("#create button");
		this._dom.resultHeading = document.querySelector("#result h2");
		
		this._jsstyle.build(this._dom.create);
		
		this._dom.create.appendChild(this._dom.createButton);
		
		this._dom.createButton.addEventListener("click", this);
		
		if (location.search.length > 1) {
			var hash = location.search.substring(1);
			this._jsstyle.fromHash(hash);
			this._create();
		} else if (!location.hash) {
			location.hash = "about";
		}
	},

	handleEvent: function(e) {
		switch (e.target) {
			case this._dom.createButton:
				this._create();
			break;
		}
		
	},
	
	_create: function() {
		this._dom.result.innerHTML = "";
		this._dom.result.appendChild(this._dom.resultHeading);
		
		var canvas = this._jsstyle.toCanvas();
		this._buildResultItem("Image", "Right-click to save", canvas);

		var aa = this._jsstyle.toAA();
		this._buildResultItem("Signature", "Hardcore ASCII art awesomeness. Select all, copy, paste!", aa);

		var url = "?" + this._jsstyle.toHash();
		var link = document.createElement("a");
		link.href = url;
		link.target = "_blank";
		link.innerHTML = "Click here";
		var aa = this._jsstyle.toAA();
		this._buildResultItem("Permalink", "Link to this page", link);

		var json = this._jsstyle.toJSON();
		var pre = document.createElement("pre");
		pre.innerHTML = JSON.stringify(json, null, "  ");
		this._buildResultItem("JSON", "Pure JSONified essence", pre);

		location.hash = "result";
	},
	
	_buildResultItem: function(label, title, node) {
		var box = document.createElement("div");
		box.title = title;
		
		var heading = document.createElement("h3");
		heading.innerHTML = label;
		
		[heading, node].forEach(box.appendChild, box);
		this._dom.result.appendChild(box);
	}
	
};
