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
		this._dom.text = document.querySelector("#text");
		this._dom.decodeArea = document.querySelector("#decode textarea");
		this._dom.createButton = document.querySelector("#create button");
		this._dom.decodeButton = document.querySelector("#decode button");
		this._dom.badgeHeading = document.querySelector("#badge h2");
		this._dom.textHeading = document.querySelector("#text h2");
		
		this._dom.createButton.addEventListener("click", this);
		this._dom.decodeButton.addEventListener("click", this);

		try {
			this._jsstyle = new JSStyle(DATA);
			this._jsstyle.build(this._dom.create);
		} catch (e) {
			alert(e.message);
			return;
		}

		var xhr = new XMLHttpRequest();
		xhr.open("get", "http://ondras.zarovi.cz/jsstyle-stats/stats.json", true);
		xhr.onreadystatechange = function() {
			if (xhr.readyState != 4 || xhr.status != 200) { return; }
			try {
				var stats = JSON.parse(xhr.responseText);
				this._jsstyle.setStats(stats);
			} catch (e) {}
		}.bind(this);
		xhr.send(null);

		
		this._dom.create.appendChild(this._dom.createButton);
		
		this._load();
		this._pickQuote();

		setInterval(this._pickQuote, 5000);
	},

	handleEvent: function(e) {
		switch (e.target) {
			case this._dom.createButton:
				this._createText();
				this._createBadge();

				/* beacon */
				var url = "http://ondras.zarovi.cz/jsstyle-stats/?json=";
				url += encodeURIComponent(JSON.stringify(this._jsstyle.toJSON()));
				var xhr = new (window.XDomainRequest || window.XMLHttpRequest)();
				xhr.open("get", url, true);
				xhr.send(null);

				var url = "?" + this._jsstyle.toHash() + "#badge";
				if (history.pushState) {
					history.pushState({}, null, url);
					this._show(""); /* chrome bug */
					this._show("badge"); /* chrome bug */
				} else { /* wait a bit for the request */
					setTimeout(function() { location.href = url; }, 500);
				}

			break;

			case this._dom.decodeButton:
				this._decode();
			break;
		}
	},

	_show: function(what) {
		location.hash = "#" + what;
	},

	_load: function() {
		if (location.search.length > 1) { /* pre-fill with data from url */
			var hash = location.search.substring(1);
			this._jsstyle.fromHash(hash);
			this._createBadge();
			this._createText();

			/* auto-create */
			if (!location.hash) { this._show("text"); } /* FIXME badge/text? */
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
			this._createText();
			this._show("text");
			return;
		}
		
		/* is it a signature? */
		var r = value.match(/^\s*(-- \n)?\s*(\+-+\+\n[\s\S]+\+-+\+)/);
		if (r) {
			this._jsstyle.fromAA(r[2]);
			this._createText();
			this._show("text");
			return;
		}
		
		/* is it a JSON? */
		try {
			var data = JSON.parse(value);
			this._jsstyle.fromJSON(data);
			this._createText();
			this._show("text");
			return;
		} catch (e) {};

		alert("Unable to decode pasted data :-(");
	},
	
	_createBadge: function() {
		this._dom.badge.innerHTML = "";
		this._dom.badge.appendChild(this._dom.badgeHeading);
/*		
		var json = this._jsstyle.toJSON();
		var pre = document.createElement("pre");
		pre.innerHTML = JSON.stringify(json, null, "  ");
		this._buildBadgeItem("JSON", "Pure JSONified essence", pre);
*/
		var aa = this._jsstyle.toAA();
		aa.addEventListener("click", function(e) { e.target.select && e.target.select(); });
		this._buildBadgeItem("Signature", "Hardcore ASCII art awesomeness.<br/>Select all, copy, paste!", aa);

		var canvas = this._jsstyle.toCanvas();
		this._buildBadgeItem("Image", "Right-click to save<br/>(<a href='code.google.com/p/chromium/issues/detail?id=69357'>issue 69357</a> in Chrome)", canvas);

		var url = "?" + this._jsstyle.toHash() + "#text";
		var a = document.createElement("a");
		a.href = url;  /* trick: use .href to canonicalize */
		url = a.href;

		var links = document.createElement("ul");
		this._buildBadgeLink(links, url, "Your personal answers");
		this._buildBadgeItem("Links", "Share the fame!", links);

		if (window.gapi) { /* G+ */
			var li = document.createElement("li");
			links.appendChild(li);
			var span = document.createElement("span");
			li.appendChild(span);
			gapi.plusone.render(span, {href:url, annotation:"bubble"});
		}

		/* twitter */
		var li = document.createElement("li");
		var a = document.createElement("a");
		a.href = "https://twitter.com/intent/tweet?button_hashtag=jsstyle&text=My%20JavaScript%20Style%20Badge";
		a.className = "twitter-hashtag-button";
		a.setAttribute("data-size", "large");
		a.setAttribute("data-url", url); 
		a.setAttribute("data-related", "0ndras");
		a.innerHTML = "Tweet #jsstyle";
		li.appendChild(a);
		links.appendChild(li);
		var script = document.createElement("script");
		script.src = "//platform.twitter.com/widgets.js";
		document.body.appendChild(script);

		if (window.IN) { /* linkedin */
			var li = document.createElement("li");
			var s = document.createElement("script");
			s.type = "IN/Share";
			s.setAttribute("data-url", url);
			s.setAttribute("data-counter", "right");
			li.appendChild(s);
			links.appendChild(li);
			try { IN.parse(); } catch (e) {};
		}
	},

	_createText: function() {
		this._dom.text.innerHTML = "";
		this._dom.text.appendChild(this._dom.textHeading);
		
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
		}

		this._dom.text.appendChild(node);
	},

	_buildBadgeLink: function(parent, url, label) {
		var li = document.createElement("li");
		var a = document.createElement("a");
		a.innerHTML = label;
		a.href = url;
		li.appendChild(a);
		parent.appendChild(li);
	},

	_buildBadgeItem: function(label, desc, node) {
		var box = document.createElement("div");
		
		var heading = document.createElement("h3");
		heading.innerHTML = label;

		var description = document.createElement("p");
		description.innerHTML = desc;
		
		[heading, description, node].forEach(box.appendChild, box);
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
