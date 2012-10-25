var DATA = [
	{
		id: " ",
		name: "Whitespace",
		options: [
			{
				id: "s",
				name: "Spaces FTW"
			},
			{
				id: "t",
				name: "Tabs, please"
			},
			{
				id: "b",
				name: "Both, mix as necessary"
			},
			{
				id: "B",
				name: "Tabs for indentation, spaces for alignment"
			},
			{
				id: "?",
				name: "I don't give a damn"
			}
		]
	},
	{
		id: ".",
		name: "Extending prototype of built-in objects",
		options: [
			{
				id: "-",
				name: "That is inherently evil"
			},
			{
				id: "+",
				name: "Kicks ass, but not on <code>Object</code>"
			},
			{
				id: "!",
				name: "Kicks ass, including <code>Object</code>"
			}
		]
	},
	{
		id: "{}",
		name: "Object iteration",
		options: [
			{
				id: ".",
				name: "<code>for..in</code> (<code>of</code> in CoffeeScript)"
			},
			{
				id: "o",
				name: "<code>for..in</code> + <code>hasOwnProperty</code>"
			},
			{
				id: "f",
				name: "Functional (<code>$.each</code> or similar)"
			}
		]
	},
	{
		id: "[]",
		name: "Array iteration",
		options: [
			{
				id: ".",
				name: "<code>for..in</code>"
			},
			{
				id: "o",
				name: "<code>for..in + hasOwnProperty</code>"
			},
			{
				id: "1",
				name: "Indexed (<code>for i=0</code> or <code>while</code> or <code>in</code> in CoffeeScript)"
			},
			{
				id: "f",
				name: "Functional (<code>forEach</code> or similar)"
			}
		]
	},
	{
		id: ";",
		name: "Semicolons",
		options: [
			{
				id: "-",
				name: "Never"
			},
			{
				id: "+",
				name: "All the time"
			},
			{
				id: "=",
				name: "Sometimes"
			}
		]
	},
	{
		id: "()",
		name: "Methods defined",
		options: [
			{
				id: "p",
				name: "In prototype: <code>Stuff.prototype.work = ...</code>"
			},
			{
				id: "i",
				name: "In instance: <code>this.work = ...</code>"
			},
			{
				id: "?",
				name: "Using an abstraction: <code>defineMethod({work: ...})</code> or similar"
			}
		]
	},
	{
		id: "^",
		name: "Inheritance",
		options: [
			{
				id: "-",
				name: "What the F*$% is inheritance?"
			},
			{
				id: "+",
				name: "Native: <code>Child.prototype = Object.create(Parent.prototype)</code>"
			},
			{
				id: "?",
				name: "Using an abstraction: <code>extend(Child, Parent)</code> or similar"
			}
		]
	},
	{
		id: ">",
		name: "Preprocessing",
		options: [
			{
				id: "j",
				name: "Pure JS"
			},
			{
				id: "c",
				name: "(Iced)CoffeeScript"
			},
			{
				id: "l",
				name: "LiveScript"
			},
			{
				id: "d",
				name: "Dart"
			},
			{
				id: "t",
				name: "TypeScript"
			},
			{
				id: "?",
				name: "Other"
			}
		]
	},
	{
		id: "=>",
		name: "Closures",
		options: [
			{
				id: "-",
				name: "Never"
			},
			{
				id: "+",
				name: "All the time"
			},
			{
				id: "=",
				name: "Only when necessary"
			}
		]
	},
	{
		id: "=",
		name: "Comparison",
		options: [
			{
				id: "2",
				name: "Always <code>==</code>"
			},
			{
				id: "3",
				name: "Always <code>===</code>"
			},
			{
				id: "=",
				name: "Mixed, as necessary"
			}
		]
	},
	{
		id: ",",
		name: "Multi-line lists (arrays, objects, arguments)",
		options: [
			{
				id: "1",
				name: "Comma at the beginning"
			},
			{
				id: "n",
				name: "Comma at the end"
			}
		]
	},
	{
		id: "L",
		name: "Array length caching",
		options: [
			{
				id: "+",
				name: "Always"
			},
			{
				id: "-",
				name: "Never"
			},
			{
				id: "=",
				name: "For certain (long/hot) loops"
			}
		]
	},
	{
		id: "_",
		name: "Private names",
		options: [
			{
				id: "-",
				name: "Not used at all"
			},
			{
				id: "1",
				name: "Underscore(s) at the beginning"
			},
			{
				id: "n",
				name: "Underscore(s) at the end"
			},
			{
				id: "?",
				name: "Other"
			}
		]
	},
	{
		id: "v",
		name: "Variable declaration",
		options: [
			{
				id: "1",
				name: "At the beginning of a function"
			},
			{
				id: "*",
				name: "At the beginning of a function, except for loop iterators"
			},
			{
				id: "n",
				name: "As necessary"
			}
		]
	},
	{
		id: "W",
		name: "Where",
		options: [
			{
				id: "c",
				name: "Client"
			},
			{
				id: "s",
				name: "Server"
			},
			{
				id: "b",
				name: "Both"
			}
		]
	}
];
  
