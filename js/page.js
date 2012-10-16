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
		} else {
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

		this._dom.result.appendChild(this._jsstyle.toCanvas());
		
		var url = "?" + this._jsstyle.toHash();
		var link = document.createElement("a");
		link.href = url;
		link.innerHTML = "Permalink";
		this._dom.result.appendChild(link);

		this._dom.result.appendChild(this._jsstyle.toAA());
		location.hash = "result";
	}
	
};
