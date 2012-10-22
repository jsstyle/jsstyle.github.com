var Page = {
	_dom: {},

	init: function() {
		if (!document.createElement("canvas").getContext) {
			alert("Sorry, your browser is not sexy enough for this cool stuff :-(");
			return;
		}
		
		this._dom.about = document.querySelector("#about");
		this._dom.create = document.querySelector("#create");
		this._dom.decode = document.querySelector("#decode");
		this._dom.badge = document.querySelector("#badge");
		this._dom.decodeArea = document.querySelector("#decode textarea");
		this._dom.createButton = document.querySelector("#create button");
		this._dom.decodeButton = document.querySelector("#decode button");
		this._dom.badgeHeading = document.querySelector("#badge h2");
		
		this._dom.createButton.addEventListener("click", this);
		this._dom.decodeButton.addEventListener("click", this);

		try {
			this._jsstyle = new JSStyle(DATA);
			this._jsstyle.build(this._dom.create);
		} catch (e) {
			alert(e.message);
			return;
		}
		
		this._dom.create.appendChild(this._dom.createButton);
		
		window.addEventListener("hashchange", this);
		this._syncNav();

		this._load();
		this._pickQuote();

		setInterval(this._pickQuote, 5000);
	},

	handleEvent: function(e) {
		switch (e.type) {
			case "hashchange":
				this._syncNav();
			break;

			case "click":
				switch (e.target) {
					case this._dom.createButton:
						this._create();
					break;

					case this._dom.decodeButton:
						this._decode();
					break;
				}
			break;
		}
	},

	_syncNav: function() {
		var h = location.hash;
		var s1 = "nav a[href='" + h + "']";
		var s2 = "nav a:not([href='" + h + "'])";

		var current = document.querySelector(s1);
		if (current) { current.className = "current"; }

		var inactive = document.querySelectorAll(s2);
		for (var i=0;i<inactive.length;i++) { inactive[i].className = ""; }
	},

	/*
	search \ hash | neni  | result | neco |
	      ano     | draw  |  draw  |  -   |
	      ne      | about |    -   |  -   |
	*/
	_load: function() {
		if (location.search.length > 1) { /* pre-fill with data from url */
			var hash = location.search.substring(1);
			this._jsstyle.fromHash(hash);
			/* auto-create */
			if (!location.hash || location.hash == "#badge") { this._create(); }
		} else if (!location.hash) {
		}
	},
	
	_decode: function() {
		var value = this._dom.decodeArea.value.trim();
		if (!value) {
			alert("Give me some data and try again...");
			return;
		}
		
		/* is it an url? */
		var r = value.match(/^(http.*\?)?([\-0-9]+)(#.*)?$/);
		if (r) {
			this._jsstyle.fromHash(r[2]);
			this._create();
			return;
		}
		
		/* is it a signature? */
		var r = value.match(/^\+-+\+\n[\s\S]+\+-+\+$/);
		if (r) {
			this._jsstyle.fromAA(value);
			this._create();
			return;
		}
		
		/* is it a JSON? */
		try {
			var data = JSON.parse(value);
			this._jsstyle.fromJSON(data);
			this._create();
			return;
		} catch (e) {};


		alert("Unable to decode pasted data :-(");
	},
	
	_create: function() {
		this._dom.badge.innerHTML = "";
		this._dom.badge.appendChild(this._dom.badgeHeading);
		
		var json = this._jsstyle.toJSON();
		var pre = document.createElement("pre");
		pre.innerHTML = JSON.stringify(json, null, "  ");
		this._buildBadgeItem("JSON", "Pure JSONified essence", pre);

		var url = "?" + this._jsstyle.toHash();
		var link = document.createElement("a");
		link.href = url;
		link.target = "_blank";
		link.innerHTML = "Click here";
		var img = document.createElement("img");
		img.src = "http://qr.kaywa.com/?s=7&d=" + encodeURIComponent(url);
		link.appendChild(img);
		this._buildBadgeItem("Permalink", "Link to this page", link);

		var aa = this._jsstyle.toAA();
		this._buildBadgeItem("Signature", "Hardcore ASCII art awesomeness. Select all, copy, paste!", aa);

		var canvas = this._jsstyle.toCanvas();
		this._buildBadgeItem("Image", "Right-click to save", canvas);

		var node = document.createElement("dl");
		var texts = this._jsstyle.toText();
		if (texts.length) {
			while (texts.length) {
				var text = texts.shift();
				var name = document.createElement("dt");
				name.innerHTML = text[0];
				var value = document.createElement("dd");
				value.innerHTML = text[1];

				[name, value].forEach(node.appendChild, node);
			}
			this._buildBadgeItem("Description", "", node);
		}

		location.hash = "badge";
	},
	
	_buildBadgeItem: function(label, title, node) {
		var box = document.createElement("div");
		if (title) { box.title = title; }
		
		var heading = document.createElement("h3");
		heading.innerHTML = label;
		
		[heading, node].forEach(box.appendChild, box);
		this._dom.badge.appendChild(box);
	},
	
	_pickQuote: function() {
		var current = null;
		var avail = [];
		var quotes = document.querySelectorAll("#about div");
		for (var i=0;i<quotes.length;i++) {
			var quote = quotes[i];
			if (quote.className) {
				current = quote;
			} else {
				avail.push(quote);
			}
		}
		
		if (current) { current.className = ""; }
		var index = ~~(Math.random()*avail.length);
		avail[index].className = "active";
	}
	
};
