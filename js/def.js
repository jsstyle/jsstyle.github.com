var DATA = [
	{
		name: "Whitespace",
		options: [
			{
				name: "Spaces FTW"
			},
			{
				name: "Tabs, please"
			},
			{
				name: "Both, mix as necessary"
			},
			{
				name: "Tabs for indentation, spaces for alignment"
			},
			{
				name: "I don't give a damn"
			}
		]
	},
	{
		name: "Extending prototype of built-in objects",
		options: [
			{
				name: "That is inherently evil"
			},
			{
				name: "Kicks ass, but not on <code>Object</code>"
			},
			{
				name: "Kicks ass, including <code>Object</code>"
			}
		]
	},
	{
		name: "Object iteration",
		options: [
			{
				name: "<code>for..in</code>"
			},
			{
				name: "<code>for..in</code> + <code>hasOwnProperty</code>"
			},
			{
				name: "Functional (<code>$.each</code> or similar)"
			}
		]
	},
	{
		name: "Array iteration",
		options: [
			{
				name: "<code>for..in</code>"
			},
			{
				name: "<code>for..in + hasOwnProperty</code>"
			},
			{
				name: "Indexed (<code>for i=0</code> or <code>while</code>)"
			},
			{
				name: "Functional (<code>forEach</code> or similar)"
			}
		]
	},
	{
		name: "Semicolons",
		options: [
			{
				name: "Never"
			},
			{
				name: "All the time"
			},
			{
				name: "Sometimes"
			}
		]
	},
	{
		name: "Methods defined",
		options: [
			{
				name: "In prototype: <code>Stuff.prototype.work = ...</code>"
			},
			{
				name: "In instance: <code>this.work = ...</code>"
			},
			{
				name: "Using an abstraction: <code>defineMethod({work: ...})</code> or similar"
			}
		]
	},
	{
		name: "Inheritance",
		options: [
			{
				name: "Native: <code>Child.prototype = Object.create(Parent.prototype)</code>"
			},
			{
				name: "Using an abstraction: <code>extend(Child, Parent)</code> or similar"
			}
		]
	},
	{
		name: "Preprocessing",
		options: [
			{
				name: "Pure JS"
			},
			{
				name: "CoffeeScript"
			},
			{
				name: "LiveScript"
			},
			{
				name: "Dart"
			},
			{
				name: "TypeScript"
			},
			{
				name: "Other"
			}
		]
	},
	{
		name: "Closures",
		options: [
			{
				name: "Never"
			},
			{
				name: "All the time"
			},
			{
				name: "Only when necessary"
			}
		]
	},
	{
		name: "Comparison",
		options: [
			{
				name: "Always <code>==</code>"
			},
			{
				name: "Always <code>===</code>"
			},
			{
				name: "Mixed, as necessary"
			}
		]
	},
	{
		name: "Multi-line lists (arrays, objects, arguments)",
		options: [
			{
				name: "Comma at the end"
			},
			{
				name: "Comma at the beginning"
			}
		]
	},
	{
		name: "Array length caching",
		options: [
			{
				name: "Always"
			},
			{
				name: "Never"
			},
			{
				name: "For certain (long/hot) loops"
			}
		]
	},
	{
		name: "Private names",
		options: [
			{
				name: "Not used at all"
			},
			{
				name: "Underscore(s) at the beginning"
			},
			{
				name: "Underscore(s) at the end"
			},
			{
				name: "Other"
			}
		]
	},
	{
		name: "Variable declaration",
		options: [
			{
				name: "At the beginning of a function"
			},
			{
				name: "At the beginning of a function, except for loop iterators"
			},
			{
				name: "As necessary"
			}
		]
	},
	{
		name: "Where",
		options: [
			{
				name: "Client"
			},
			{
				name: "Server"
			},
			{
				name: "Both"
			}
		]
	}
];
  
