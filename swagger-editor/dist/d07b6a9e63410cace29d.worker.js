/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var yaml = __webpack_require__(1).yaml;
	var jsyaml = __webpack_require__(6);
	
	/**
	 * Worker message listener.
	 *
	 * @param  {object} message Web Workr message object
	 *
	 * # Message format:
	 * `message` is an array. first argument in the array is the method name string
	 * and the rest of items are arguments to that method
	 */
	
	/* eslint-env worker */
	onmessage = function onmessage(message) {
	  if (!Array.isArray(message.data) || message.data.length < 2) {
	    throw new TypeError('data should be an array with method and arguments');
	  }
	
	  var method = message.data[0];
	  var args = message.data.slice(1);
	  var result = null;
	  var error = null;
	  var YAML;
	
	  // select YAML engine based on method name
	  if (method === 'compose_all' || method === 'compose') {
	    YAML = yaml;
	  } else {
	    YAML = jsyaml;
	  }
	
	  if (typeof YAML[method] !== 'function') {
	    throw new TypeError('unknown method name');
	  }
	
	  try {
	    result = YAML[method].apply(null, args);
	  } catch (err) {
	    error = err;
	  }
	
	  postMessage({
	    result: result,
	    error: error
	  });
	};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, Buffer) {(function() {
	    var root = this, modules, require_from, register, error;
	    if (typeof global == "undefined") {
	        var global = typeof window === "undefined" ? root : window;
	    }
	    modules = {};
	    require_from = function(parent, from) {
	        return function(name) {
	            if (modules[from] && modules[from][name]) {
	                modules[from][name].parent = parent;
	                if (modules[from][name].initialize) {
	                    modules[from][name].initialize();
	                }
	                return modules[from][name].exports;
	            } else {
	                return error(name, from);
	            }
	        };
	    };
	    register = function(names, directory, callback) {
	        var module = {
	            exports: {},
	            initialize: function() {
	                callback.call(module.exports, global, module, module.exports, require_from(module, directory), undefined);
	                delete module.initialize;
	            },
	            parent: null
	        };
	        for (var from in names) {
	            modules[from] = modules[from] || {};
	            for (var j in names[from]) {
	                var name = names[from][j];
	                modules[from][name] = module;
	            }
	        }
	    };
	    error = function anonymous(name, from) {
	        var message = "Warn: could not find module " + name;
	        console.log(message);
	    };
	    register({
	        "0": [ "./events" ]
	    }, 0, function(global, module, exports, require, window) {
	        (function() {
	            var extend = function(child, parent) {
	                for (var key in parent) {
	                    if (hasProp.call(parent, key)) child[key] = parent[key];
	                }
	                function ctor() {
	                    this.constructor = child;
	                }
	                ctor.prototype = parent.prototype;
	                child.prototype = new ctor;
	                child.__super__ = parent.prototype;
	                return child;
	            }, hasProp = {}.hasOwnProperty;
	            this.Event = function() {
	                function Event(start_mark, end_mark) {
	                    this.start_mark = start_mark;
	                    this.end_mark = end_mark;
	                }
	                return Event;
	            }();
	            this.NodeEvent = function(superClass) {
	                extend(NodeEvent, superClass);
	                function NodeEvent(anchor, start_mark, end_mark) {
	                    this.anchor = anchor;
	                    this.start_mark = start_mark;
	                    this.end_mark = end_mark;
	                }
	                return NodeEvent;
	            }(this.Event);
	            this.CollectionStartEvent = function(superClass) {
	                extend(CollectionStartEvent, superClass);
	                function CollectionStartEvent(anchor, tag, implicit, start_mark, end_mark, flow_style) {
	                    this.anchor = anchor;
	                    this.tag = tag;
	                    this.implicit = implicit;
	                    this.start_mark = start_mark;
	                    this.end_mark = end_mark;
	                    this.flow_style = flow_style;
	                }
	                return CollectionStartEvent;
	            }(this.NodeEvent);
	            this.CollectionEndEvent = function(superClass) {
	                extend(CollectionEndEvent, superClass);
	                function CollectionEndEvent() {
	                    return CollectionEndEvent.__super__.constructor.apply(this, arguments);
	                }
	                return CollectionEndEvent;
	            }(this.Event);
	            this.StreamStartEvent = function(superClass) {
	                extend(StreamStartEvent, superClass);
	                function StreamStartEvent(start_mark, end_mark, encoding) {
	                    this.start_mark = start_mark;
	                    this.end_mark = end_mark;
	                    this.encoding = encoding;
	                }
	                return StreamStartEvent;
	            }(this.Event);
	            this.StreamEndEvent = function(superClass) {
	                extend(StreamEndEvent, superClass);
	                function StreamEndEvent() {
	                    return StreamEndEvent.__super__.constructor.apply(this, arguments);
	                }
	                return StreamEndEvent;
	            }(this.Event);
	            this.DocumentStartEvent = function(superClass) {
	                extend(DocumentStartEvent, superClass);
	                function DocumentStartEvent(start_mark, end_mark, explicit, version, tags) {
	                    this.start_mark = start_mark;
	                    this.end_mark = end_mark;
	                    this.explicit = explicit;
	                    this.version = version;
	                    this.tags = tags;
	                }
	                return DocumentStartEvent;
	            }(this.Event);
	            this.DocumentEndEvent = function(superClass) {
	                extend(DocumentEndEvent, superClass);
	                function DocumentEndEvent(start_mark, end_mark, explicit) {
	                    this.start_mark = start_mark;
	                    this.end_mark = end_mark;
	                    this.explicit = explicit;
	                }
	                return DocumentEndEvent;
	            }(this.Event);
	            this.AliasEvent = function(superClass) {
	                extend(AliasEvent, superClass);
	                function AliasEvent() {
	                    return AliasEvent.__super__.constructor.apply(this, arguments);
	                }
	                return AliasEvent;
	            }(this.NodeEvent);
	            this.ScalarEvent = function(superClass) {
	                extend(ScalarEvent, superClass);
	                function ScalarEvent(anchor, tag, implicit, value, start_mark, end_mark, style) {
	                    this.anchor = anchor;
	                    this.tag = tag;
	                    this.implicit = implicit;
	                    this.value = value;
	                    this.start_mark = start_mark;
	                    this.end_mark = end_mark;
	                    this.style = style;
	                }
	                return ScalarEvent;
	            }(this.NodeEvent);
	            this.SequenceStartEvent = function(superClass) {
	                extend(SequenceStartEvent, superClass);
	                function SequenceStartEvent() {
	                    return SequenceStartEvent.__super__.constructor.apply(this, arguments);
	                }
	                return SequenceStartEvent;
	            }(this.CollectionStartEvent);
	            this.SequenceEndEvent = function(superClass) {
	                extend(SequenceEndEvent, superClass);
	                function SequenceEndEvent() {
	                    return SequenceEndEvent.__super__.constructor.apply(this, arguments);
	                }
	                return SequenceEndEvent;
	            }(this.CollectionEndEvent);
	            this.MappingStartEvent = function(superClass) {
	                extend(MappingStartEvent, superClass);
	                function MappingStartEvent() {
	                    return MappingStartEvent.__super__.constructor.apply(this, arguments);
	                }
	                return MappingStartEvent;
	            }(this.CollectionStartEvent);
	            this.MappingEndEvent = function(superClass) {
	                extend(MappingEndEvent, superClass);
	                function MappingEndEvent() {
	                    return MappingEndEvent.__super__.constructor.apply(this, arguments);
	                }
	                return MappingEndEvent;
	            }(this.CollectionEndEvent);
	        }).call(this);
	    });
	    register({
	        "0": [ "./errors" ]
	    }, 0, function(global, module, exports, require, window) {
	        (function() {
	            var indexOf = [].indexOf || function(item) {
	                for (var i = 0, l = this.length; i < l; i++) {
	                    if (i in this && this[i] === item) return i;
	                }
	                return -1;
	            }, extend = function(child, parent) {
	                for (var key in parent) {
	                    if (hasProp.call(parent, key)) child[key] = parent[key];
	                }
	                function ctor() {
	                    this.constructor = child;
	                }
	                ctor.prototype = parent.prototype;
	                child.prototype = new ctor;
	                child.__super__ = parent.prototype;
	                return child;
	            }, hasProp = {}.hasOwnProperty;
	            this.Mark = function() {
	                function Mark(line, column, buffer, pointer) {
	                    this.line = line;
	                    this.column = column;
	                    this.buffer = buffer;
	                    this.pointer = pointer;
	                }
	                Mark.prototype.get_snippet = function(indent, max_length) {
	                    var break_chars, end, head, ref, ref1, start, tail;
	                    if (indent == null) {
	                        indent = 4;
	                    }
	                    if (max_length == null) {
	                        max_length = 75;
	                    }
	                    if (this.buffer == null) {
	                        return null;
	                    }
	                    break_chars = "\0\r\n\u2028\u2029";
	                    head = "";
	                    start = this.pointer;
	                    while (start > 0 && (ref = this.buffer[start - 1], indexOf.call(break_chars, ref) < 0)) {
	                        start--;
	                        if (this.pointer - start > max_length / 2 - 1) {
	                            head = " ... ";
	                            start += 5;
	                            break;
	                        }
	                    }
	                    tail = "";
	                    end = this.pointer;
	                    while (end < this.buffer.length && (ref1 = this.buffer[end], indexOf.call(break_chars, ref1) < 0)) {
	                        end++;
	                        if (end - this.pointer > max_length / 2 - 1) {
	                            tail = " ... ";
	                            end -= 5;
	                            break;
	                        }
	                    }
	                    return "" + (new Array(indent)).join(" ") + head + this.buffer.slice(start, end) + tail + "\n" + (new Array(indent + this.pointer - start + head.length)).join(" ") + "^";
	                };
	                Mark.prototype.toString = function() {
	                    var snippet, where;
	                    snippet = this.get_snippet();
	                    where = "  on line " + (this.line + 1) + ", column " + (this.column + 1);
	                    if (snippet) {
	                        return where;
	                    } else {
	                        return where + ":\n" + snippet;
	                    }
	                };
	                return Mark;
	            }();
	            this.YAMLError = function(superClass) {
	                extend(YAMLError, superClass);
	                function YAMLError(message) {
	                    this.message = message;
	                    YAMLError.__super__.constructor.call(this);
	                    this.stack = this.toString() + "\n" + (new Error).stack.split("\n").slice(1).join("\n");
	                }
	                YAMLError.prototype.toString = function() {
	                    return this.message;
	                };
	                return YAMLError;
	            }(Error);
	            this.MarkedYAMLError = function(superClass) {
	                extend(MarkedYAMLError, superClass);
	                function MarkedYAMLError(context, context_mark, problem, problem_mark, note) {
	                    this.context = context;
	                    this.context_mark = context_mark;
	                    this.problem = problem;
	                    this.problem_mark = problem_mark;
	                    this.note = note;
	                    MarkedYAMLError.__super__.constructor.call(this);
	                }
	                MarkedYAMLError.prototype.toString = function() {
	                    var lines;
	                    lines = [];
	                    if (this.context != null) {
	                        lines.push(this.context);
	                    }
	                    if (this.context_mark != null && (this.problem == null || this.problem_mark == null || this.context_mark.line !== this.problem_mark.line || this.context_mark.column !== this.problem_mark.column)) {
	                        lines.push(this.context_mark.toString());
	                    }
	                    if (this.problem != null) {
	                        lines.push(this.problem);
	                    }
	                    if (this.problem_mark != null) {
	                        lines.push(this.problem_mark.toString());
	                    }
	                    if (this.note != null) {
	                        lines.push(this.note);
	                    }
	                    return lines.join("\n");
	                };
	                return MarkedYAMLError;
	            }(this.YAMLError);
	        }).call(this);
	    });
	    register({
	        "0": [ "./nodes" ]
	    }, 0, function(global, module, exports, require, window) {
	        (function() {
	            var unique_id, extend = function(child, parent) {
	                for (var key in parent) {
	                    if (hasProp.call(parent, key)) child[key] = parent[key];
	                }
	                function ctor() {
	                    this.constructor = child;
	                }
	                ctor.prototype = parent.prototype;
	                child.prototype = new ctor;
	                child.__super__ = parent.prototype;
	                return child;
	            }, hasProp = {}.hasOwnProperty;
	            unique_id = 0;
	            this.Node = function() {
	                function Node(tag, value, start_mark, end_mark) {
	                    this.tag = tag;
	                    this.value = value;
	                    this.start_mark = start_mark;
	                    this.end_mark = end_mark;
	                    this.unique_id = "node_" + unique_id++;
	                }
	                return Node;
	            }();
	            this.ScalarNode = function(superClass) {
	                extend(ScalarNode, superClass);
	                ScalarNode.prototype.id = "scalar";
	                function ScalarNode(tag, value, start_mark, end_mark, style) {
	                    this.tag = tag;
	                    this.value = value;
	                    this.start_mark = start_mark;
	                    this.end_mark = end_mark;
	                    this.style = style;
	                    ScalarNode.__super__.constructor.apply(this, arguments);
	                }
	                return ScalarNode;
	            }(this.Node);
	            this.CollectionNode = function(superClass) {
	                extend(CollectionNode, superClass);
	                function CollectionNode(tag, value, start_mark, end_mark, flow_style) {
	                    this.tag = tag;
	                    this.value = value;
	                    this.start_mark = start_mark;
	                    this.end_mark = end_mark;
	                    this.flow_style = flow_style;
	                    CollectionNode.__super__.constructor.apply(this, arguments);
	                }
	                return CollectionNode;
	            }(this.Node);
	            this.SequenceNode = function(superClass) {
	                extend(SequenceNode, superClass);
	                function SequenceNode() {
	                    return SequenceNode.__super__.constructor.apply(this, arguments);
	                }
	                SequenceNode.prototype.id = "sequence";
	                return SequenceNode;
	            }(this.CollectionNode);
	            this.MappingNode = function(superClass) {
	                extend(MappingNode, superClass);
	                function MappingNode() {
	                    return MappingNode.__super__.constructor.apply(this, arguments);
	                }
	                MappingNode.prototype.id = "mapping";
	                return MappingNode;
	            }(this.CollectionNode);
	        }).call(this);
	    });
	    register({
	        "0": [ "./composer" ]
	    }, 0, function(global, module, exports, require, window) {
	        (function() {
	            var MarkedYAMLError, events, nodes, extend = function(child, parent) {
	                for (var key in parent) {
	                    if (hasProp.call(parent, key)) child[key] = parent[key];
	                }
	                function ctor() {
	                    this.constructor = child;
	                }
	                ctor.prototype = parent.prototype;
	                child.prototype = new ctor;
	                child.__super__ = parent.prototype;
	                return child;
	            }, hasProp = {}.hasOwnProperty;
	            events = require("./events");
	            MarkedYAMLError = require("./errors").MarkedYAMLError;
	            nodes = require("./nodes");
	            this.ComposerError = function(superClass) {
	                extend(ComposerError, superClass);
	                function ComposerError() {
	                    return ComposerError.__super__.constructor.apply(this, arguments);
	                }
	                return ComposerError;
	            }(MarkedYAMLError);
	            this.Composer = function() {
	                function Composer() {
	                    this.anchors = {};
	                }
	                Composer.prototype.check_node = function() {
	                    if (this.check_event(events.StreamStartEvent)) {
	                        this.get_event();
	                    }
	                    return !this.check_event(events.StreamEndEvent);
	                };
	                Composer.prototype.get_node = function() {
	                    if (!this.check_event(events.StreamEndEvent)) {
	                        return this.compose_document();
	                    }
	                };
	                Composer.prototype.get_single_node = function() {
	                    var document, event;
	                    this.get_event();
	                    document = null;
	                    if (!this.check_event(events.StreamEndEvent)) {
	                        document = this.compose_document();
	                    }
	                    if (!this.check_event(events.StreamEndEvent)) {
	                        event = this.get_event();
	                        throw new exports.ComposerError("expected a single document in the stream", document.start_mark, "but found another document", event.start_mark);
	                    }
	                    this.get_event();
	                    return document;
	                };
	                Composer.prototype.compose_document = function() {
	                    var node;
	                    this.get_event();
	                    node = this.compose_node();
	                    this.get_event();
	                    this.anchors = {};
	                    return node;
	                };
	                Composer.prototype.compose_node = function(parent, index) {
	                    var anchor, event, node;
	                    if (this.check_event(events.AliasEvent)) {
	                        event = this.get_event();
	                        anchor = event.anchor;
	                        if (!(anchor in this.anchors)) {
	                            throw new exports.ComposerError(null, null, "found undefined alias " + anchor, event.start_mark);
	                        }
	                        return this.anchors[anchor];
	                    }
	                    event = this.peek_event();
	                    anchor = event.anchor;
	                    if (anchor !== null && anchor in this.anchors) {
	                        throw new exports.ComposerError("found duplicate anchor " + anchor + "; first occurence", this.anchors[anchor].start_mark, "second occurrence", event.start_mark);
	                    }
	                    this.descend_resolver(parent, index);
	                    if (this.check_event(events.ScalarEvent)) {
	                        node = this.compose_scalar_node(anchor);
	                    } else if (this.check_event(events.SequenceStartEvent)) {
	                        node = this.compose_sequence_node(anchor);
	                    } else if (this.check_event(events.MappingStartEvent)) {
	                        node = this.compose_mapping_node(anchor);
	                    }
	                    this.ascend_resolver();
	                    return node;
	                };
	                Composer.prototype.compose_scalar_node = function(anchor) {
	                    var event, node, tag;
	                    event = this.get_event();
	                    tag = event.tag;
	                    if (tag === null || tag === "!") {
	                        tag = this.resolve(nodes.ScalarNode, event.value, event.implicit);
	                    }
	                    node = new nodes.ScalarNode(tag, event.value, event.start_mark, event.end_mark, event.style);
	                    if (anchor !== null) {
	                        this.anchors[anchor] = node;
	                    }
	                    return node;
	                };
	                Composer.prototype.compose_sequence_node = function(anchor) {
	                    var end_event, index, node, start_event, tag;
	                    start_event = this.get_event();
	                    tag = start_event.tag;
	                    if (tag === null || tag === "!") {
	                        tag = this.resolve(nodes.SequenceNode, null, start_event.implicit);
	                    }
	                    node = new nodes.SequenceNode(tag, [], start_event.start_mark, null, start_event.flow_style);
	                    if (anchor !== null) {
	                        this.anchors[anchor] = node;
	                    }
	                    index = 0;
	                    while (!this.check_event(events.SequenceEndEvent)) {
	                        node.value.push(this.compose_node(node, index));
	                        index++;
	                    }
	                    end_event = this.get_event();
	                    node.end_mark = end_event.end_mark;
	                    return node;
	                };
	                Composer.prototype.compose_mapping_node = function(anchor) {
	                    var end_event, item_key, item_value, node, start_event, tag;
	                    start_event = this.get_event();
	                    tag = start_event.tag;
	                    if (tag === null || tag === "!") {
	                        tag = this.resolve(nodes.MappingNode, null, start_event.implicit);
	                    }
	                    node = new nodes.MappingNode(tag, [], start_event.start_mark, null, start_event.flow_style);
	                    if (anchor !== null) {
	                        this.anchors[anchor] = node;
	                    }
	                    while (!this.check_event(events.MappingEndEvent)) {
	                        item_key = this.compose_node(node);
	                        item_value = this.compose_node(node, item_key);
	                        node.value.push([ item_key, item_value ]);
	                    }
	                    end_event = this.get_event();
	                    node.end_mark = end_event.end_mark;
	                    return node;
	                };
	                return Composer;
	            }();
	        }).call(this);
	    });
	    register({
	        "0": [ "./util" ]
	    }, 0, function(global, module, exports, require, window) {
	        (function() {
	            var ref, ref1, ref2, slice = [].slice, hasProp = {}.hasOwnProperty;
	            this.StringStream = function() {
	                function StringStream() {
	                    this.string = "";
	                }
	                StringStream.prototype.write = function(chunk) {
	                    return this.string += chunk;
	                };
	                return StringStream;
	            }();
	            this.clone = function(_this) {
	                return function(obj) {
	                    return _this.extend({}, obj);
	                };
	            }(this);
	            this.extend = function() {
	                var destination, i, k, len, source, sources, v;
	                destination = arguments[0], sources = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	                for (i = 0, len = sources.length; i < len; i++) {
	                    source = sources[i];
	                    for (k in source) {
	                        v = source[k];
	                        destination[k] = v;
	                    }
	                }
	                return destination;
	            };
	            this.is_empty = function(obj) {
	                var key;
	                if (Array.isArray(obj) || typeof obj === "string") {
	                    return obj.length === 0;
	                }
	                for (key in obj) {
	                    if (!hasProp.call(obj, key)) continue;
	                    return false;
	                }
	                return true;
	            };
	            this.inspect = (ref = (ref1 = (ref2 = require("util")) != null ? ref2.inspect : void 0) != null ? ref1 : global.inspect) != null ? ref : function(a) {
	                return "" + a;
	            };
	            this.pad_left = function(str, char, length) {
	                str = String(str);
	                if (str.length >= length) {
	                    return str;
	                } else if (str.length + 1 === length) {
	                    return "" + char + str;
	                } else {
	                    return "" + (new Array(length - str.length + 1)).join(char) + str;
	                }
	            };
	            this.to_hex = function(num) {
	                if (typeof num === "string") {
	                    num = num.charCodeAt(0);
	                }
	                return num.toString(16);
	            };
	        }).call(this);
	    });
	    register({
	        "0": [ "./constructor" ]
	    }, 0, function(global, module, exports, require, window) {
	        (function() {
	            var MarkedYAMLError, nodes, util, extend = function(child, parent) {
	                for (var key in parent) {
	                    if (hasProp.call(parent, key)) child[key] = parent[key];
	                }
	                function ctor() {
	                    this.constructor = child;
	                }
	                ctor.prototype = parent.prototype;
	                child.prototype = new ctor;
	                child.__super__ = parent.prototype;
	                return child;
	            }, hasProp = {}.hasOwnProperty, indexOf = [].indexOf || function(item) {
	                for (var i = 0, l = this.length; i < l; i++) {
	                    if (i in this && this[i] === item) return i;
	                }
	                return -1;
	            };
	            MarkedYAMLError = require("./errors").MarkedYAMLError;
	            nodes = require("./nodes");
	            util = require("./util");
	            this.ConstructorError = function(superClass) {
	                extend(ConstructorError, superClass);
	                function ConstructorError() {
	                    return ConstructorError.__super__.constructor.apply(this, arguments);
	                }
	                return ConstructorError;
	            }(MarkedYAMLError);
	            this.BaseConstructor = function() {
	                BaseConstructor.prototype.yaml_constructors = {};
	                BaseConstructor.prototype.yaml_multi_constructors = {};
	                BaseConstructor.add_constructor = function(tag, constructor) {
	                    if (!this.prototype.hasOwnProperty("yaml_constructors")) {
	                        this.prototype.yaml_constructors = util.extend({}, this.prototype.yaml_constructors);
	                    }
	                    return this.prototype.yaml_constructors[tag] = constructor;
	                };
	                BaseConstructor.add_multi_constructor = function(tag_prefix, multi_constructor) {
	                    if (!this.prototype.hasOwnProperty("yaml_multi_constructors")) {
	                        this.prototype.yaml_multi_constructors = util.extend({}, this.prototype.yaml_multi_constructors);
	                    }
	                    return this.prototype.yaml_multi_constructors[tag_prefix] = multi_constructor;
	                };
	                function BaseConstructor() {
	                    this.constructed_objects = {};
	                    this.constructing_nodes = [];
	                    this.deferred_constructors = [];
	                }
	                BaseConstructor.prototype.check_data = function() {
	                    return this.check_node();
	                };
	                BaseConstructor.prototype.get_data = function() {
	                    if (this.check_node()) {
	                        return this.construct_document(this.get_node());
	                    }
	                };
	                BaseConstructor.prototype.get_single_data = function() {
	                    var node;
	                    node = this.get_single_node();
	                    if (node != null) {
	                        return this.construct_document(node);
	                    }
	                    return null;
	                };
	                BaseConstructor.prototype.construct_document = function(node) {
	                    var data;
	                    data = this.construct_object(node);
	                    while (!util.is_empty(this.deferred_constructors)) {
	                        this.deferred_constructors.pop()();
	                    }
	                    return data;
	                };
	                BaseConstructor.prototype.defer = function(f) {
	                    return this.deferred_constructors.push(f);
	                };
	                BaseConstructor.prototype.construct_object = function(node) {
	                    var constructor, object, ref, tag_prefix, tag_suffix;
	                    if (node.unique_id in this.constructed_objects) {
	                        return this.constructed_objects[node.unique_id];
	                    }
	                    if (ref = node.unique_id, indexOf.call(this.constructing_nodes, ref) >= 0) {
	                        throw new exports.ConstructorError(null, null, "found unconstructable recursive node", node.start_mark);
	                    }
	                    this.constructing_nodes.push(node.unique_id);
	                    constructor = null;
	                    tag_suffix = null;
	                    if (node.tag in this.yaml_constructors) {
	                        constructor = this.yaml_constructors[node.tag];
	                    } else {
	                        for (tag_prefix in this.yaml_multi_constructors) {
	                            if (node.tag.indexOf(tag_prefix === 0)) {
	                                tag_suffix = node.tag.slice(tag_prefix.length);
	                                constructor = this.yaml_multi_constructors[tag_prefix];
	                                break;
	                            }
	                        }
	                        if (constructor == null) {
	                            if (null in this.yaml_multi_constructors) {
	                                tag_suffix = node.tag;
	                                constructor = this.yaml_multi_constructors[null];
	                            } else if (null in this.yaml_constructors) {
	                                constructor = this.yaml_constructors[null];
	                            } else if (node instanceof nodes.ScalarNode) {
	                                constructor = this.construct_scalar;
	                            } else if (node instanceof nodes.SequenceNode) {
	                                constructor = this.construct_sequence;
	                            } else if (node instanceof nodes.MappingNode) {
	                                constructor = this.construct_mapping;
	                            }
	                        }
	                    }
	                    object = constructor.call(this, tag_suffix != null ? tag_suffix : node, node);
	                    this.constructed_objects[node.unique_id] = object;
	                    this.constructing_nodes.pop();
	                    return object;
	                };
	                BaseConstructor.prototype.construct_scalar = function(node) {
	                    if (!(node instanceof nodes.ScalarNode)) {
	                        throw new exports.ConstructorError(null, null, "expected a scalar node but found " + node.id, node.start_mark);
	                    }
	                    return node.value;
	                };
	                BaseConstructor.prototype.construct_sequence = function(node) {
	                    var child, i, len, ref, results;
	                    if (!(node instanceof nodes.SequenceNode)) {
	                        throw new exports.ConstructorError(null, null, "expected a sequence node but found " + node.id, node.start_mark);
	                    }
	                    ref = node.value;
	                    results = [];
	                    for (i = 0, len = ref.length; i < len; i++) {
	                        child = ref[i];
	                        results.push(this.construct_object(child));
	                    }
	                    return results;
	                };
	                BaseConstructor.prototype.construct_mapping = function(node) {
	                    var i, key, key_node, len, mapping, ref, ref1, value, value_node;
	                    if (!(node instanceof nodes.MappingNode)) {
	                        throw new ConstructorError(null, null, "expected a mapping node but found " + node.id, node.start_mark);
	                    }
	                    mapping = {};
	                    ref = node.value;
	                    for (i = 0, len = ref.length; i < len; i++) {
	                        ref1 = ref[i], key_node = ref1[0], value_node = ref1[1];
	                        key = this.construct_object(key_node);
	                        if (typeof key === "object") {
	                            throw new exports.ConstructorError("while constructing a mapping", node.start_mark, "found unhashable key", key_node.start_mark);
	                        }
	                        value = this.construct_object(value_node);
	                        mapping[key] = value;
	                    }
	                    return mapping;
	                };
	                BaseConstructor.prototype.construct_pairs = function(node) {
	                    var i, key, key_node, len, pairs, ref, ref1, value, value_node;
	                    if (!(node instanceof nodes.MappingNode)) {
	                        throw new exports.ConstructorError(null, null, "expected a mapping node but found " + node.id, node.start_mark);
	                    }
	                    pairs = [];
	                    ref = node.value;
	                    for (i = 0, len = ref.length; i < len; i++) {
	                        ref1 = ref[i], key_node = ref1[0], value_node = ref1[1];
	                        key = this.construct_object(key_node);
	                        value = this.construct_object(value_node);
	                        pairs.push([ key, value ]);
	                    }
	                    return pairs;
	                };
	                return BaseConstructor;
	            }();
	            this.Constructor = function(superClass) {
	                var BOOL_VALUES, TIMESTAMP_PARTS, TIMESTAMP_REGEX;
	                extend(Constructor, superClass);
	                function Constructor() {
	                    return Constructor.__super__.constructor.apply(this, arguments);
	                }
	                BOOL_VALUES = {
	                    on: true,
	                    off: false,
	                    "true": true,
	                    "false": false,
	                    yes: true,
	                    no: false
	                };
	                TIMESTAMP_REGEX = /^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:(?:[Tt]|[\x20\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\.([0-9]*))?(?:[\x20\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?)?$/;
	                TIMESTAMP_PARTS = {
	                    year: 1,
	                    month: 2,
	                    day: 3,
	                    hour: 4,
	                    minute: 5,
	                    second: 6,
	                    fraction: 7,
	                    tz: 8,
	                    tz_sign: 9,
	                    tz_hour: 10,
	                    tz_minute: 11
	                };
	                Constructor.prototype.construct_scalar = function(node) {
	                    var i, key_node, len, ref, ref1, value_node;
	                    if (node instanceof nodes.MappingNode) {
	                        ref = node.value;
	                        for (i = 0, len = ref.length; i < len; i++) {
	                            ref1 = ref[i], key_node = ref1[0], value_node = ref1[1];
	                            if (key_node.tag === "tag:yaml.org,2002:value") {
	                                return this.construct_scalar(value_node);
	                            }
	                        }
	                    }
	                    return Constructor.__super__.construct_scalar.call(this, node);
	                };
	                Constructor.prototype.flatten_mapping = function(node) {
	                    var i, index, j, key_node, len, len1, merge, ref, ref1, submerge, subnode, value, value_node;
	                    merge = [];
	                    index = 0;
	                    while (index < node.value.length) {
	                        ref = node.value[index], key_node = ref[0], value_node = ref[1];
	                        if (key_node.tag === "tag:yaml.org,2002:merge") {
	                            node.value.splice(index, 1);
	                            if (value_node instanceof nodes.MappingNode) {
	                                this.flatten_mapping(value_node);
	                                merge = merge.concat(value_node.value);
	                            } else if (value_node instanceof nodes.SequenceNode) {
	                                submerge = [];
	                                ref1 = value_node.value;
	                                for (i = 0, len = ref1.length; i < len; i++) {
	                                    subnode = ref1[i];
	                                    if (!(subnode instanceof nodes.MappingNode)) {
	                                        throw new exports.ConstructorError("while constructing a mapping", node.start_mark, "expected a mapping for merging, but found " + subnode.id, subnode.start_mark);
	                                    }
	                                    this.flatten_mapping(subnode);
	                                    submerge.push(subnode.value);
	                                }
	                                submerge.reverse();
	                                for (j = 0, len1 = submerge.length; j < len1; j++) {
	                                    value = submerge[j];
	                                    merge = merge.concat(value);
	                                }
	                            } else {
	                                throw new exports.ConstructorError("while constructing a mapping", node.start_mark, "expected a mapping or list of mappings for merging but found " + value_node.id, value_node.start_mark);
	                            }
	                        } else if (key_node.tag === "tag:yaml.org,2002:value") {
	                            key_node.tag = "tag:yaml.org,2002:str";
	                            index++;
	                        } else {
	                            index++;
	                        }
	                    }
	                    if (merge.length) {
	                        return node.value = merge.concat(node.value);
	                    }
	                };
	                Constructor.prototype.construct_mapping = function(node) {
	                    if (node instanceof nodes.MappingNode) {
	                        this.flatten_mapping(node);
	                    }
	                    return Constructor.__super__.construct_mapping.call(this, node);
	                };
	                Constructor.prototype.construct_yaml_null = function(node) {
	                    this.construct_scalar(node);
	                    return null;
	                };
	                Constructor.prototype.construct_yaml_bool = function(node) {
	                    var value;
	                    value = this.construct_scalar(node);
	                    return BOOL_VALUES[value.toLowerCase()];
	                };
	                Constructor.prototype.construct_yaml_int = function(node) {
	                    var base, digit, digits, i, len, part, ref, sign, value;
	                    value = this.construct_scalar(node);
	                    value = value.replace(/_/g, "");
	                    sign = value[0] === "-" ? -1 : 1;
	                    if (ref = value[0], indexOf.call("+-", ref) >= 0) {
	                        value = value.slice(1);
	                    }
	                    if (value === "0") {
	                        return 0;
	                    } else if (value.indexOf("0b") === 0) {
	                        return sign * parseInt(value.slice(2), 2);
	                    } else if (value.indexOf("0x") === 0) {
	                        return sign * parseInt(value.slice(2), 16);
	                    } else if (value.indexOf("0o") === 0) {
	                        return sign * parseInt(value.slice(2), 8);
	                    } else if (value[0] === "0") {
	                        return sign * parseInt(value, 8);
	                    } else if (indexOf.call(value, ":") >= 0) {
	                        digits = function() {
	                            var i, len, ref1, results;
	                            ref1 = value.split(/:/g);
	                            results = [];
	                            for (i = 0, len = ref1.length; i < len; i++) {
	                                part = ref1[i];
	                                results.push(parseInt(part));
	                            }
	                            return results;
	                        }();
	                        digits.reverse();
	                        base = 1;
	                        value = 0;
	                        for (i = 0, len = digits.length; i < len; i++) {
	                            digit = digits[i];
	                            value += digit * base;
	                            base *= 60;
	                        }
	                        return sign * value;
	                    } else {
	                        return sign * parseInt(value);
	                    }
	                };
	                Constructor.prototype.construct_yaml_float = function(node) {
	                    var base, digit, digits, i, len, part, ref, sign, value;
	                    value = this.construct_scalar(node);
	                    value = value.replace(/_/g, "").toLowerCase();
	                    sign = value[0] === "-" ? -1 : 1;
	                    if (ref = value[0], indexOf.call("+-", ref) >= 0) {
	                        value = value.slice(1);
	                    }
	                    if (value === ".inf") {
	                        return sign * Infinity;
	                    } else if (value === ".nan") {
	                        return NaN;
	                    } else if (indexOf.call(value, ":") >= 0) {
	                        digits = function() {
	                            var i, len, ref1, results;
	                            ref1 = value.split(/:/g);
	                            results = [];
	                            for (i = 0, len = ref1.length; i < len; i++) {
	                                part = ref1[i];
	                                results.push(parseFloat(part));
	                            }
	                            return results;
	                        }();
	                        digits.reverse();
	                        base = 1;
	                        value = 0;
	                        for (i = 0, len = digits.length; i < len; i++) {
	                            digit = digits[i];
	                            value += digit * base;
	                            base *= 60;
	                        }
	                        return sign * value;
	                    } else {
	                        return sign * parseFloat(value);
	                    }
	                };
	                Constructor.prototype.construct_yaml_binary = function(node) {
	                    var error, value;
	                    value = this.construct_scalar(node);
	                    try {
	                        if (typeof window !== "undefined" && window !== null) {
	                            return atob(value);
	                        }
	                        return (new Buffer(value, "base64")).toString("ascii");
	                    } catch (_error) {
	                        error = _error;
	                        throw new exports.ConstructorError(null, null, "failed to decode base64 data: " + error, node.start_mark);
	                    }
	                };
	                Constructor.prototype.construct_yaml_timestamp = function(node) {
	                    var date, day, fraction, hour, index, key, match, millisecond, minute, month, second, tz_hour, tz_minute, tz_sign, value, values, year;
	                    value = this.construct_scalar(node);
	                    match = node.value.match(TIMESTAMP_REGEX);
	                    values = {};
	                    for (key in TIMESTAMP_PARTS) {
	                        index = TIMESTAMP_PARTS[key];
	                        values[key] = match[index];
	                    }
	                    year = parseInt(values.year);
	                    month = parseInt(values.month) - 1;
	                    day = parseInt(values.day);
	                    if (!values.hour) {
	                        return new Date(Date.UTC(year, month, day));
	                    }
	                    hour = parseInt(values.hour);
	                    minute = parseInt(values.minute);
	                    second = parseInt(values.second);
	                    millisecond = 0;
	                    if (values.fraction) {
	                        fraction = values.fraction.slice(0, 6);
	                        while (fraction.length < 6) {
	                            fraction += "0";
	                        }
	                        fraction = parseInt(fraction);
	                        millisecond = Math.round(fraction / 1e3);
	                    }
	                    if (values.tz_sign) {
	                        tz_sign = values.tz_sign === "-" ? 1 : -1;
	                        if (tz_hour = parseInt(values.tz_hour)) {
	                            hour += tz_sign * tz_hour;
	                        }
	                        if (tz_minute = parseInt(values.tz_minute)) {
	                            minute += tz_sign * tz_minute;
	                        }
	                    }
	                    date = new Date(Date.UTC(year, month, day, hour, minute, second, millisecond));
	                    return date;
	                };
	                Constructor.prototype.construct_yaml_pair_list = function(type, node) {
	                    var list;
	                    list = [];
	                    if (!(node instanceof nodes.SequenceNode)) {
	                        throw new exports.ConstructorError("while constructing " + type, node.start_mark, "expected a sequence but found " + node.id, node.start_mark);
	                    }
	                    this.defer(function(_this) {
	                        return function() {
	                            var i, key, key_node, len, ref, ref1, results, subnode, value, value_node;
	                            ref = node.value;
	                            results = [];
	                            for (i = 0, len = ref.length; i < len; i++) {
	                                subnode = ref[i];
	                                if (!(subnode instanceof nodes.MappingNode)) {
	                                    throw new exports.ConstructorError("while constructing " + type, node.start_mark, "expected a mapping of length 1 but found " + subnode.id, subnode.start_mark);
	                                }
	                                if (subnode.value.length !== 1) {
	                                    throw new exports.ConstructorError("while constructing " + type, node.start_mark, "expected a mapping of length 1 but found " + subnode.id, subnode.start_mark);
	                                }
	                                ref1 = subnode.value[0], key_node = ref1[0], value_node = ref1[1];
	                                key = _this.construct_object(key_node);
	                                value = _this.construct_object(value_node);
	                                results.push(list.push([ key, value ]));
	                            }
	                            return results;
	                        };
	                    }(this));
	                    return list;
	                };
	                Constructor.prototype.construct_yaml_omap = function(node) {
	                    return this.construct_yaml_pair_list("an ordered map", node);
	                };
	                Constructor.prototype.construct_yaml_pairs = function(node) {
	                    return this.construct_yaml_pair_list("pairs", node);
	                };
	                Constructor.prototype.construct_yaml_set = function(node) {
	                    var data;
	                    data = [];
	                    this.defer(function(_this) {
	                        return function() {
	                            var item, results;
	                            results = [];
	                            for (item in _this.construct_mapping(node)) {
	                                results.push(data.push(item));
	                            }
	                            return results;
	                        };
	                    }(this));
	                    return data;
	                };
	                Constructor.prototype.construct_yaml_str = function(node) {
	                    return this.construct_scalar(node);
	                };
	                Constructor.prototype.construct_yaml_seq = function(node) {
	                    var data;
	                    data = [];
	                    this.defer(function(_this) {
	                        return function() {
	                            var i, item, len, ref, results;
	                            ref = _this.construct_sequence(node);
	                            results = [];
	                            for (i = 0, len = ref.length; i < len; i++) {
	                                item = ref[i];
	                                results.push(data.push(item));
	                            }
	                            return results;
	                        };
	                    }(this));
	                    return data;
	                };
	                Constructor.prototype.construct_yaml_map = function(node) {
	                    var data;
	                    data = {};
	                    this.defer(function(_this) {
	                        return function() {
	                            var key, ref, results, value;
	                            ref = _this.construct_mapping(node);
	                            results = [];
	                            for (key in ref) {
	                                value = ref[key];
	                                results.push(data[key] = value);
	                            }
	                            return results;
	                        };
	                    }(this));
	                    return data;
	                };
	                Constructor.prototype.construct_yaml_object = function(node, klass) {
	                    var data;
	                    data = new klass;
	                    this.defer(function(_this) {
	                        return function() {
	                            var key, ref, results, value;
	                            ref = _this.construct_mapping(node, true);
	                            results = [];
	                            for (key in ref) {
	                                value = ref[key];
	                                results.push(data[key] = value);
	                            }
	                            return results;
	                        };
	                    }(this));
	                    return data;
	                };
	                Constructor.prototype.construct_undefined = function(node) {
	                    throw new exports.ConstructorError(null, null, "could not determine a constructor for the tag " + node.tag, node.start_mark);
	                };
	                return Constructor;
	            }(this.BaseConstructor);
	            this.Constructor.add_constructor("tag:yaml.org,2002:null", this.Constructor.prototype.construct_yaml_null);
	            this.Constructor.add_constructor("tag:yaml.org,2002:bool", this.Constructor.prototype.construct_yaml_bool);
	            this.Constructor.add_constructor("tag:yaml.org,2002:int", this.Constructor.prototype.construct_yaml_int);
	            this.Constructor.add_constructor("tag:yaml.org,2002:float", this.Constructor.prototype.construct_yaml_float);
	            this.Constructor.add_constructor("tag:yaml.org,2002:binary", this.Constructor.prototype.construct_yaml_binary);
	            this.Constructor.add_constructor("tag:yaml.org,2002:timestamp", this.Constructor.prototype.construct_yaml_timestamp);
	            this.Constructor.add_constructor("tag:yaml.org,2002:omap", this.Constructor.prototype.construct_yaml_omap);
	            this.Constructor.add_constructor("tag:yaml.org,2002:pairs", this.Constructor.prototype.construct_yaml_pairs);
	            this.Constructor.add_constructor("tag:yaml.org,2002:set", this.Constructor.prototype.construct_yaml_set);
	            this.Constructor.add_constructor("tag:yaml.org,2002:str", this.Constructor.prototype.construct_yaml_str);
	            this.Constructor.add_constructor("tag:yaml.org,2002:seq", this.Constructor.prototype.construct_yaml_seq);
	            this.Constructor.add_constructor("tag:yaml.org,2002:map", this.Constructor.prototype.construct_yaml_map);
	            this.Constructor.add_constructor(null, this.Constructor.prototype.construct_undefined);
	        }).call(this);
	    });
	    register({
	        "0": [ "./emitter" ]
	    }, 0, function(global, module, exports, require, window) {
	        (function() {
	            var ScalarAnalysis, YAMLError, events, util, extend = function(child, parent) {
	                for (var key in parent) {
	                    if (hasProp.call(parent, key)) child[key] = parent[key];
	                }
	                function ctor() {
	                    this.constructor = child;
	                }
	                ctor.prototype = parent.prototype;
	                child.prototype = new ctor;
	                child.__super__ = parent.prototype;
	                return child;
	            }, hasProp = {}.hasOwnProperty, indexOf = [].indexOf || function(item) {
	                for (var i = 0, l = this.length; i < l; i++) {
	                    if (i in this && this[i] === item) return i;
	                }
	                return -1;
	            };
	            events = require("./events");
	            util = require("./util");
	            YAMLError = require("./errors").YAMLError;
	            this.EmitterError = function(superClass) {
	                extend(EmitterError, superClass);
	                function EmitterError() {
	                    return EmitterError.__super__.constructor.apply(this, arguments);
	                }
	                return EmitterError;
	            }(YAMLError);
	            this.Emitter = function() {
	                var C_WHITESPACE, DEFAULT_TAG_PREFIXES, ESCAPE_REPLACEMENTS;
	                C_WHITESPACE = "\0 	\r\n\u2028\u2029";
	                DEFAULT_TAG_PREFIXES = {
	                    "!": "!",
	                    "tag:yaml.org,2002:": "!!"
	                };
	                ESCAPE_REPLACEMENTS = {
	                    "\0": "0",
	                    "": "a",
	                    "\b": "b",
	                    "	": "t",
	                    "\n": "n",
	                    "": "v",
	                    "\f": "f",
	                    "\r": "r",
	                    "": "e",
	                    '"': '"',
	                    "\\": "\\",
	                    "": "N",
	                    " ": "_",
	                    "\u2028": "L",
	                    "\u2029": "P"
	                };
	                function Emitter(stream, options) {
	                    var ref;
	                    this.stream = stream;
	                    this.encoding = null;
	                    this.states = [];
	                    this.state = this.expect_stream_start;
	                    this.events = [];
	                    this.event = null;
	                    this.indents = [];
	                    this.indent = null;
	                    this.flow_level = 0;
	                    this.root_context = false;
	                    this.sequence_context = false;
	                    this.mapping_context = false;
	                    this.simple_key_context = false;
	                    this.line = 0;
	                    this.column = 0;
	                    this.whitespace = true;
	                    this.indentation = true;
	                    this.open_ended = false;
	                    this.canonical = options.canonical, this.allow_unicode = options.allow_unicode;
	                    if (this.canonical == null) {
	                        this.canonical = false;
	                    }
	                    if (this.allow_unicode == null) {
	                        this.allow_unicode = true;
	                    }
	                    this.best_indent = 1 < options.indent && options.indent < 10 ? options.indent : 2;
	                    this.best_width = options.width > this.indent * 2 ? options.width : 80;
	                    this.best_line_break = (ref = options.line_break) === "\r" || ref === "\n" || ref === "\r\n" ? options.line_break : "\n";
	                    this.tag_prefixes = null;
	                    this.prepared_anchor = null;
	                    this.prepared_tag = null;
	                    this.analysis = null;
	                    this.style = null;
	                }
	                Emitter.prototype.dispose = function() {
	                    this.states = [];
	                    return this.state = null;
	                };
	                Emitter.prototype.emit = function(event) {
	                    var results;
	                    this.events.push(event);
	                    results = [];
	                    while (!this.need_more_events()) {
	                        this.event = this.events.shift();
	                        this.state();
	                        results.push(this.event = null);
	                    }
	                    return results;
	                };
	                Emitter.prototype.need_more_events = function() {
	                    var event;
	                    if (this.events.length === 0) {
	                        return true;
	                    }
	                    event = this.events[0];
	                    if (event instanceof events.DocumentStartEvent) {
	                        return this.need_events(1);
	                    } else if (event instanceof events.SequenceStartEvent) {
	                        return this.need_events(2);
	                    } else if (event instanceof events.MappingStartEvent) {
	                        return this.need_events(3);
	                    } else {
	                        return false;
	                    }
	                };
	                Emitter.prototype.need_events = function(count) {
	                    var event, i, len, level, ref;
	                    level = 0;
	                    ref = this.events.slice(1);
	                    for (i = 0, len = ref.length; i < len; i++) {
	                        event = ref[i];
	                        if (event instanceof events.DocumentStartEvent || event instanceof events.CollectionStartEvent) {
	                            level++;
	                        } else if (event instanceof events.DocumentEndEvent || event instanceof events.CollectionEndEvent) {
	                            level--;
	                        } else if (event instanceof events.StreamEndEvent) {
	                            level = -1;
	                        }
	                        if (level < 0) {
	                            return false;
	                        }
	                    }
	                    return this.events.length < count + 1;
	                };
	                Emitter.prototype.increase_indent = function(options) {
	                    if (options == null) {
	                        options = {};
	                    }
	                    this.indents.push(this.indent);
	                    if (this.indent == null) {
	                        return this.indent = options.flow ? this.best_indent : 0;
	                    } else if (!options.indentless) {
	                        return this.indent += this.best_indent;
	                    }
	                };
	                Emitter.prototype.expect_stream_start = function() {
	                    if (this.event instanceof events.StreamStartEvent) {
	                        if (this.event.encoding && !("encoding" in this.stream)) {
	                            this.encoding = this.event.encoding;
	                        }
	                        this.write_stream_start();
	                        return this.state = this.expect_first_document_start;
	                    } else {
	                        return this.error("expected StreamStartEvent, but got", this.event);
	                    }
	                };
	                Emitter.prototype.expect_nothing = function() {
	                    return this.error("expected nothing, but got", this.event);
	                };
	                Emitter.prototype.expect_first_document_start = function() {
	                    return this.expect_document_start(true);
	                };
	                Emitter.prototype.expect_document_start = function(first) {
	                    var explicit, handle, i, k, len, prefix, ref;
	                    if (first == null) {
	                        first = false;
	                    }
	                    if (this.event instanceof events.DocumentStartEvent) {
	                        if ((this.event.version || this.event.tags) && this.open_ended) {
	                            this.write_indicator("...", true);
	                            this.write_indent();
	                        }
	                        if (this.event.version) {
	                            this.write_version_directive(this.prepare_version(this.event.version));
	                        }
	                        this.tag_prefixes = util.clone(DEFAULT_TAG_PREFIXES);
	                        if (this.event.tags) {
	                            ref = function() {
	                                var ref, results;
	                                ref = this.event.tags;
	                                results = [];
	                                for (k in ref) {
	                                    if (!hasProp.call(ref, k)) continue;
	                                    results.push(k);
	                                }
	                                return results;
	                            }.call(this).sort();
	                            for (i = 0, len = ref.length; i < len; i++) {
	                                handle = ref[i];
	                                prefix = this.event.tags[handle];
	                                this.tag_prefixes[prefix] = handle;
	                                this.write_tag_directive(this.prepare_tag_handle(handle), this.prepare_tag_prefix(prefix));
	                            }
	                        }
	                        explicit = !first || this.event.explicit || this.canonical || this.event.version || this.event.tags || this.check_empty_document();
	                        if (explicit) {
	                            this.write_indent();
	                            this.write_indicator("---", true);
	                            if (this.canonical) {
	                                this.write_indent();
	                            }
	                        }
	                        return this.state = this.expect_document_root;
	                    } else if (this.event instanceof events.StreamEndEvent) {
	                        if (this.open_ended) {
	                            this.write_indicator("...", true);
	                            this.write_indent();
	                        }
	                        this.write_stream_end();
	                        return this.state = this.expect_nothing;
	                    } else {
	                        return this.error("expected DocumentStartEvent, but got", this.event);
	                    }
	                };
	                Emitter.prototype.expect_document_end = function() {
	                    if (this.event instanceof events.DocumentEndEvent) {
	                        this.write_indent();
	                        if (this.event.explicit) {
	                            this.write_indicator("...", true);
	                            this.write_indent();
	                        }
	                        this.flush_stream();
	                        return this.state = this.expect_document_start;
	                    } else {
	                        return this.error("expected DocumentEndEvent, but got", this.event);
	                    }
	                };
	                Emitter.prototype.expect_document_root = function() {
	                    this.states.push(this.expect_document_end);
	                    return this.expect_node({
	                        root: true
	                    });
	                };
	                Emitter.prototype.expect_node = function(expect) {
	                    if (expect == null) {
	                        expect = {};
	                    }
	                    this.root_context = !!expect.root;
	                    this.sequence_context = !!expect.sequence;
	                    this.mapping_context = !!expect.mapping;
	                    this.simple_key_context = !!expect.simple_key;
	                    if (this.event instanceof events.AliasEvent) {
	                        return this.expect_alias();
	                    } else if (this.event instanceof events.ScalarEvent || this.event instanceof events.CollectionStartEvent) {
	                        this.process_anchor("&");
	                        this.process_tag();
	                        if (this.event instanceof events.ScalarEvent) {
	                            return this.expect_scalar();
	                        } else if (this.event instanceof events.SequenceStartEvent) {
	                            if (this.flow_level || this.canonical || this.event.flow_style || this.check_empty_sequence()) {
	                                return this.expect_flow_sequence();
	                            } else {
	                                return this.expect_block_sequence();
	                            }
	                        } else if (this.event instanceof events.MappingStartEvent) {
	                            if (this.flow_level || this.canonical || this.event.flow_style || this.check_empty_mapping()) {
	                                return this.expect_flow_mapping();
	                            } else {
	                                return this.expect_block_mapping();
	                            }
	                        }
	                    } else {
	                        return this.error("expected NodeEvent, but got", this.event);
	                    }
	                };
	                Emitter.prototype.expect_alias = function() {
	                    if (!this.event.anchor) {
	                        this.error("anchor is not specified for alias");
	                    }
	                    this.process_anchor("*");
	                    return this.state = this.states.pop();
	                };
	                Emitter.prototype.expect_scalar = function() {
	                    this.increase_indent({
	                        flow: true
	                    });
	                    this.process_scalar();
	                    this.indent = this.indents.pop();
	                    return this.state = this.states.pop();
	                };
	                Emitter.prototype.expect_flow_sequence = function() {
	                    this.write_indicator("[", true, {
	                        whitespace: true
	                    });
	                    this.flow_level++;
	                    this.increase_indent({
	                        flow: true
	                    });
	                    return this.state = this.expect_first_flow_sequence_item;
	                };
	                Emitter.prototype.expect_first_flow_sequence_item = function() {
	                    if (this.event instanceof events.SequenceEndEvent) {
	                        this.indent = this.indents.pop();
	                        this.flow_level--;
	                        this.write_indicator("]", false);
	                        return this.state = this.states.pop();
	                    } else {
	                        if (this.canonical || this.column > this.best_width) {
	                            this.write_indent();
	                        }
	                        this.states.push(this.expect_flow_sequence_item);
	                        return this.expect_node({
	                            sequence: true
	                        });
	                    }
	                };
	                Emitter.prototype.expect_flow_sequence_item = function() {
	                    if (this.event instanceof events.SequenceEndEvent) {
	                        this.indent = this.indents.pop();
	                        this.flow_level--;
	                        if (this.canonical) {
	                            this.write_indicator(",", false);
	                            this.write_indent();
	                        }
	                        this.write_indicator("]", false);
	                        return this.state = this.states.pop();
	                    } else {
	                        this.write_indicator(",", false);
	                        if (this.canonical || this.column > this.best_width) {
	                            this.write_indent();
	                        }
	                        this.states.push(this.expect_flow_sequence_item);
	                        return this.expect_node({
	                            sequence: true
	                        });
	                    }
	                };
	                Emitter.prototype.expect_flow_mapping = function() {
	                    this.write_indicator("{", true, {
	                        whitespace: true
	                    });
	                    this.flow_level++;
	                    this.increase_indent({
	                        flow: true
	                    });
	                    return this.state = this.expect_first_flow_mapping_key;
	                };
	                Emitter.prototype.expect_first_flow_mapping_key = function() {
	                    if (this.event instanceof events.MappingEndEvent) {
	                        this.indent = this.indents.pop();
	                        this.flow_level--;
	                        this.write_indicator("}", false);
	                        return this.state = this.states.pop();
	                    } else {
	                        if (this.canonical || this.column > this.best_width) {
	                            this.write_indent();
	                        }
	                        if (!this.canonical && this.check_simple_key()) {
	                            this.states.push(this.expect_flow_mapping_simple_value);
	                            return this.expect_node({
	                                mapping: true,
	                                simple_key: true
	                            });
	                        } else {
	                            this.write_indicator("?", true);
	                            this.states.push(this.expect_flow_mapping_value);
	                            return this.expect_node({
	                                mapping: true
	                            });
	                        }
	                    }
	                };
	                Emitter.prototype.expect_flow_mapping_key = function() {
	                    if (this.event instanceof events.MappingEndEvent) {
	                        this.indent = this.indents.pop();
	                        this.flow_level--;
	                        if (this.canonical) {
	                            this.write_indicator(",", false);
	                            this.write_indent();
	                        }
	                        this.write_indicator("}", false);
	                        return this.state = this.states.pop();
	                    } else {
	                        this.write_indicator(",", false);
	                        if (this.canonical || this.column > this.best_width) {
	                            this.write_indent();
	                        }
	                        if (!this.canonical && this.check_simple_key()) {
	                            this.states.push(this.expect_flow_mapping_simple_value);
	                            return this.expect_node({
	                                mapping: true,
	                                simple_key: true
	                            });
	                        } else {
	                            this.write_indicator("?", true);
	                            this.states.push(this.expect_flow_mapping_value);
	                            return this.expect_node({
	                                mapping: true
	                            });
	                        }
	                    }
	                };
	                Emitter.prototype.expect_flow_mapping_simple_value = function() {
	                    this.write_indicator(":", false);
	                    this.states.push(this.expect_flow_mapping_key);
	                    return this.expect_node({
	                        mapping: true
	                    });
	                };
	                Emitter.prototype.expect_flow_mapping_value = function() {
	                    if (this.canonical || this.column > this.best_width) {
	                        this.write_indent();
	                    }
	                    this.write_indicator(":", true);
	                    this.states.push(this.expect_flow_mapping_key);
	                    return this.expect_node({
	                        mapping: true
	                    });
	                };
	                Emitter.prototype.expect_block_sequence = function() {
	                    var indentless;
	                    indentless = this.mapping_context && !this.indentation;
	                    this.increase_indent({
	                        indentless: indentless
	                    });
	                    return this.state = this.expect_first_block_sequence_item;
	                };
	                Emitter.prototype.expect_first_block_sequence_item = function() {
	                    return this.expect_block_sequence_item(true);
	                };
	                Emitter.prototype.expect_block_sequence_item = function(first) {
	                    if (first == null) {
	                        first = false;
	                    }
	                    if (!first && this.event instanceof events.SequenceEndEvent) {
	                        this.indent = this.indents.pop();
	                        return this.state = this.states.pop();
	                    } else {
	                        this.write_indent();
	                        this.write_indicator("-", true, {
	                            indentation: true
	                        });
	                        this.states.push(this.expect_block_sequence_item);
	                        return this.expect_node({
	                            sequence: true
	                        });
	                    }
	                };
	                Emitter.prototype.expect_block_mapping = function() {
	                    this.increase_indent();
	                    return this.state = this.expect_first_block_mapping_key;
	                };
	                Emitter.prototype.expect_first_block_mapping_key = function() {
	                    return this.expect_block_mapping_key(true);
	                };
	                Emitter.prototype.expect_block_mapping_key = function(first) {
	                    if (first == null) {
	                        first = false;
	                    }
	                    if (!first && this.event instanceof events.MappingEndEvent) {
	                        this.indent = this.indents.pop();
	                        return this.state = this.states.pop();
	                    } else {
	                        this.write_indent();
	                        if (this.check_simple_key()) {
	                            this.states.push(this.expect_block_mapping_simple_value);
	                            return this.expect_node({
	                                mapping: true,
	                                simple_key: true
	                            });
	                        } else {
	                            this.write_indicator("?", true, {
	                                indentation: true
	                            });
	                            this.states.push(this.expect_block_mapping_value);
	                            return this.expect_node({
	                                mapping: true
	                            });
	                        }
	                    }
	                };
	                Emitter.prototype.expect_block_mapping_simple_value = function() {
	                    this.write_indicator(":", false);
	                    this.states.push(this.expect_block_mapping_key);
	                    return this.expect_node({
	                        mapping: true
	                    });
	                };
	                Emitter.prototype.expect_block_mapping_value = function() {
	                    this.write_indent();
	                    this.write_indicator(":", true, {
	                        indentation: true
	                    });
	                    this.states.push(this.expect_block_mapping_key);
	                    return this.expect_node({
	                        mapping: true
	                    });
	                };
	                Emitter.prototype.check_empty_document = function() {
	                    var event;
	                    if (!(this.event instanceof events.DocumentStartEvent) || this.events.length === 0) {
	                        return false;
	                    }
	                    event = this.events[0];
	                    return event instanceof events.ScalarEvent && event.anchor == null && event.tag == null && event.implicit && event.value === "";
	                };
	                Emitter.prototype.check_empty_sequence = function() {
	                    return this.event instanceof events.SequenceStartEvent && this.events[0] instanceof events.SequenceEndEvent;
	                };
	                Emitter.prototype.check_empty_mapping = function() {
	                    return this.event instanceof events.MappingStartEvent && this.events[0] instanceof events.MappingEndEvent;
	                };
	                Emitter.prototype.check_simple_key = function() {
	                    var length;
	                    length = 0;
	                    if (this.event instanceof events.NodeEvent && this.event.anchor != null) {
	                        if (this.prepared_anchor == null) {
	                            this.prepared_anchor = this.prepare_anchor(this.event.anchor);
	                        }
	                        length += this.prepared_anchor.length;
	                    }
	                    if (this.event.tag != null && (this.event instanceof events.ScalarEvent || this.event instanceof events.CollectionStartEvent)) {
	                        if (this.prepared_tag == null) {
	                            this.prepared_tag = this.prepare_tag(this.event.tag);
	                        }
	                        length += this.prepared_tag.length;
	                    }
	                    if (this.event instanceof events.ScalarEvent) {
	                        if (this.analysis == null) {
	                            this.analysis = this.analyze_scalar(this.event.value);
	                        }
	                        length += this.analysis.scalar.length;
	                    }
	                    return length < 128 && (this.event instanceof events.AliasEvent || this.event instanceof events.ScalarEvent && !this.analysis.empty && !this.analysis.multiline || this.check_empty_sequence() || this.check_empty_mapping());
	                };
	                Emitter.prototype.process_anchor = function(indicator) {
	                    if (this.event.anchor == null) {
	                        this.prepared_anchor = null;
	                        return;
	                    }
	                    if (this.prepared_anchor == null) {
	                        this.prepared_anchor = this.prepare_anchor(this.event.anchor);
	                    }
	                    if (this.prepared_anchor) {
	                        this.write_indicator("" + indicator + this.prepared_anchor, true);
	                    }
	                    return this.prepared_anchor = null;
	                };
	                Emitter.prototype.process_tag = function() {
	                    var tag;
	                    tag = this.event.tag;
	                    if (this.event instanceof events.ScalarEvent) {
	                        if (this.style == null) {
	                            this.style = this.choose_scalar_style();
	                        }
	                        if ((!this.canonical || tag == null) && (this.style === "" && this.event.implicit[0] || this.style !== "" && this.event.implicit[1])) {
	                            this.prepared_tag = null;
	                            return;
	                        }
	                        if (this.event.implicit[0] && tag == null) {
	                            tag = "!";
	                            this.prepared_tag = null;
	                        }
	                    } else if ((!this.canonical || tag == null) && this.event.implicit) {
	                        this.prepared_tag = null;
	                        return;
	                    }
	                    if (tag == null) {
	                        this.error("tag is not specified");
	                    }
	                    if (this.prepared_tag == null) {
	                        this.prepared_tag = this.prepare_tag(tag);
	                    }
	                    this.write_indicator(this.prepared_tag, true);
	                    return this.prepared_tag = null;
	                };
	                Emitter.prototype.process_scalar = function() {
	                    var split;
	                    if (this.analysis == null) {
	                        this.analysis = this.analyze_scalar(this.event.value);
	                    }
	                    if (this.style == null) {
	                        this.style = this.choose_scalar_style();
	                    }
	                    split = !this.simple_key_context;
	                    switch (this.style) {
	                      case '"':
	                        this.write_double_quoted(this.analysis.scalar, split);
	                        break;
	                      case "'":
	                        this.write_single_quoted(this.analysis.scalar, split);
	                        break;
	                      case ">":
	                        this.write_folded(this.analysis.scalar);
	                        break;
	                      case "|":
	                        this.write_literal(this.analysis.scalar);
	                        break;
	                      default:
	                        this.write_plain(this.analysis.scalar, split);
	                    }
	                    this.analysis = null;
	                    return this.style = null;
	                };
	                Emitter.prototype.choose_scalar_style = function() {
	                    var ref;
	                    if (this.analysis == null) {
	                        this.analysis = this.analyze_scalar(this.event.value);
	                    }
	                    if (this.event.style === '"' || this.canonical) {
	                        return '"';
	                    }
	                    if (!this.event.style && this.event.implicit[0] && !(this.simple_key_context && (this.analysis.empty || this.analysis.multiline)) && (this.flow_level && this.analysis.allow_flow_plain || !this.flow_level && this.analysis.allow_block_plain)) {
	                        return "";
	                    }
	                    if (this.event.style && (ref = this.event.style, indexOf.call("|>", ref) >= 0) && !this.flow_level && !this.simple_key_context && this.analysis.allow_block) {
	                        return this.event.style;
	                    }
	                    if ((!this.event.style || this.event.style === "'") && this.analysis.allow_single_quoted && !(this.simple_key_context && this.analysis.multiline)) {
	                        return "'";
	                    }
	                    return '"';
	                };
	                Emitter.prototype.prepare_version = function(arg) {
	                    var major, minor, version;
	                    major = arg[0], minor = arg[1];
	                    version = major + "." + minor;
	                    if (major === 1) {
	                        return version;
	                    } else {
	                        return this.error("unsupported YAML version", version);
	                    }
	                };
	                Emitter.prototype.prepare_tag_handle = function(handle) {
	                    var char, i, len, ref;
	                    if (!handle) {
	                        this.error("tag handle must not be empty");
	                    }
	                    if (handle[0] !== "!" || handle.slice(-1) !== "!") {
	                        this.error("tag handle must start and end with '!':", handle);
	                    }
	                    ref = handle.slice(1, -1);
	                    for (i = 0, len = ref.length; i < len; i++) {
	                        char = ref[i];
	                        if (!("0" <= char && char <= "9" || "A" <= char && char <= "Z" || "a" <= char && char <= "z" || indexOf.call("-_", char) >= 0)) {
	                            this.error("invalid character '" + char + "' in the tag handle:", handle);
	                        }
	                    }
	                    return handle;
	                };
	                Emitter.prototype.prepare_tag_prefix = function(prefix) {
	                    var char, chunks, end, start;
	                    if (!prefix) {
	                        this.error("tag prefix must not be empty");
	                    }
	                    chunks = [];
	                    start = 0;
	                    end = +(prefix[0] === "!");
	                    while (end < prefix.length) {
	                        char = prefix[end];
	                        if ("0" <= char && char <= "9" || "A" <= char && char <= "Z" || "a" <= char && char <= "z" || indexOf.call("-;/?!:@&=+$,_.~*'()[]", char) >= 0) {
	                            end++;
	                        } else {
	                            if (start < end) {
	                                chunks.push(prefix.slice(start, end));
	                            }
	                            start = end = end + 1;
	                            chunks.push(char);
	                        }
	                    }
	                    if (start < end) {
	                        chunks.push(prefix.slice(start, end));
	                    }
	                    return chunks.join("");
	                };
	                Emitter.prototype.prepare_tag = function(tag) {
	                    var char, chunks, end, handle, i, k, len, prefix, ref, start, suffix, suffix_text;
	                    if (!tag) {
	                        this.error("tag must not be empty");
	                    }
	                    if (tag === "!") {
	                        return tag;
	                    }
	                    handle = null;
	                    suffix = tag;
	                    ref = function() {
	                        var ref, results;
	                        ref = this.tag_prefixes;
	                        results = [];
	                        for (k in ref) {
	                            if (!hasProp.call(ref, k)) continue;
	                            results.push(k);
	                        }
	                        return results;
	                    }.call(this).sort();
	                    for (i = 0, len = ref.length; i < len; i++) {
	                        prefix = ref[i];
	                        if (tag.indexOf(prefix) === 0 && (prefix === "!" || prefix.length < tag.length)) {
	                            handle = this.tag_prefixes[prefix];
	                            suffix = tag.slice(prefix.length);
	                        }
	                    }
	                    chunks = [];
	                    start = end = 0;
	                    while (end < suffix.length) {
	                        char = suffix[end];
	                        if ("0" <= char && char <= "9" || "A" <= char && char <= "Z" || "a" <= char && char <= "z" || indexOf.call("-;/?!:@&=+$,_.~*'()[]", char) >= 0 || char === "!" && handle !== "!") {
	                            end++;
	                        } else {
	                            if (start < end) {
	                                chunks.push(suffix.slice(start, end));
	                            }
	                            start = end = end + 1;
	                            chunks.push(char);
	                        }
	                    }
	                    if (start < end) {
	                        chunks.push(suffix.slice(start, end));
	                    }
	                    suffix_text = chunks.join("");
	                    if (handle) {
	                        return "" + handle + suffix_text;
	                    } else {
	                        return "!<" + suffix_text + ">";
	                    }
	                };
	                Emitter.prototype.prepare_anchor = function(anchor) {
	                    var char, i, len;
	                    if (!anchor) {
	                        this.error("anchor must not be empty");
	                    }
	                    for (i = 0, len = anchor.length; i < len; i++) {
	                        char = anchor[i];
	                        if (!("0" <= char && char <= "9" || "A" <= char && char <= "Z" || "a" <= char && char <= "z" || indexOf.call("-_", char) >= 0)) {
	                            this.error("invalid character '" + char + "' in the anchor:", anchor);
	                        }
	                    }
	                    return anchor;
	                };
	                Emitter.prototype.analyze_scalar = function(scalar) {
	                    var allow_block, allow_block_plain, allow_double_quoted, allow_flow_plain, allow_single_quoted, block_indicators, break_space, char, flow_indicators, followed_by_whitespace, i, index, leading_break, leading_space, len, line_breaks, preceded_by_whitespace, previous_break, previous_space, ref, ref1, space_break, special_characters, trailing_break, trailing_space, unicode_characters;
	                    if (!scalar) {
	                        new ScalarAnalysis(scalar, true, false, false, true, true, true, false);
	                    }
	                    block_indicators = false;
	                    flow_indicators = false;
	                    line_breaks = false;
	                    special_characters = false;
	                    unicode_characters = false;
	                    leading_space = false;
	                    leading_break = false;
	                    trailing_space = false;
	                    trailing_break = false;
	                    break_space = false;
	                    space_break = false;
	                    if (scalar.indexOf("---") === 0 || scalar.indexOf("...") === 0) {
	                        block_indicators = true;
	                        flow_indicators = true;
	                    }
	                    preceded_by_whitespace = true;
	                    followed_by_whitespace = scalar.length === 1 || (ref = scalar[1], indexOf.call("\0 	\r\n\u2028\u2029", ref) >= 0);
	                    previous_space = false;
	                    previous_break = false;
	                    index = 0;
	                    for (index = i = 0, len = scalar.length; i < len; index = ++i) {
	                        char = scalar[index];
	                        if (index === 0) {
	                            if (indexOf.call("#,[]{}&*!|>'\"%@`", char) >= 0 || char === "-" && followed_by_whitespace) {
	                                flow_indicators = true;
	                                block_indicators = true;
	                            } else if (indexOf.call("?:", char) >= 0) {
	                                flow_indicators = true;
	                                if (followed_by_whitespace) {
	                                    block_indicators = true;
	                                }
	                            }
	                        } else {
	                            if (indexOf.call(",?[]{}", char) >= 0) {
	                                flow_indicators = true;
	                            } else if (char === ":") {
	                                flow_indicators = true;
	                                if (followed_by_whitespace) {
	                                    block_indicators = true;
	                                }
	                            } else if (char === "#" && preceded_by_whitespace) {
	                                flow_indicators = true;
	                                block_indicators = true;
	                            }
	                        }
	                        if (indexOf.call("\n\u2028\u2029", char) >= 0) {
	                            line_breaks = true;
	                        }
	                        if (!(char === "\n" || " " <= char && char <= "~")) {
	                            if (char !== "﻿" && (char === "" || " " <= char && char <= "퟿" || "" <= char && char <= "�")) {
	                                unicode_characters = true;
	                                if (!this.allow_unicode) {
	                                    special_characters = true;
	                                }
	                            } else {
	                                special_characters = true;
	                            }
	                        }
	                        if (char === " ") {
	                            if (index === 0) {
	                                leading_space = true;
	                            }
	                            if (index === scalar.length - 1) {
	                                trailing_space = true;
	                            }
	                            if (previous_break) {
	                                break_space = true;
	                            }
	                            previous_break = false;
	                            previous_space = true;
	                        } else if (indexOf.call("\n\u2028\u2029", char) >= 0) {
	                            if (index === 0) {
	                                leading_break = true;
	                            }
	                            if (index === scalar.length - 1) {
	                                trailing_break = true;
	                            }
	                            if (previous_space) {
	                                space_break = true;
	                            }
	                            previous_break = true;
	                            previous_space = false;
	                        } else {
	                            previous_break = false;
	                            previous_space = false;
	                        }
	                        preceded_by_whitespace = indexOf.call(C_WHITESPACE, char) >= 0;
	                        followed_by_whitespace = index + 2 >= scalar.length || (ref1 = scalar[index + 2], indexOf.call(C_WHITESPACE, ref1) >= 0);
	                    }
	                    allow_flow_plain = true;
	                    allow_block_plain = true;
	                    allow_single_quoted = true;
	                    allow_double_quoted = true;
	                    allow_block = true;
	                    if (leading_space || leading_break || trailing_space || trailing_break) {
	                        allow_flow_plain = allow_block_plain = false;
	                    }
	                    if (trailing_space) {
	                        allow_block = false;
	                    }
	                    if (break_space) {
	                        allow_flow_plain = allow_block_plain = allow_single_quoted = false;
	                    }
	                    if (space_break || special_characters) {
	                        allow_flow_plain = allow_block_plain = allow_single_quoted = allow_block = false;
	                    }
	                    if (line_breaks) {
	                        allow_flow_plain = allow_block_plain = false;
	                    }
	                    if (flow_indicators) {
	                        allow_flow_plain = false;
	                    }
	                    if (block_indicators) {
	                        allow_block_plain = false;
	                    }
	                    return new ScalarAnalysis(scalar, false, line_breaks, allow_flow_plain, allow_block_plain, allow_single_quoted, allow_double_quoted, allow_block);
	                };
	                Emitter.prototype.write_stream_start = function() {
	                    if (this.encoding && this.encoding.indexOf("utf-16") === 0) {
	                        return this.stream.write("﻿", this.encoding);
	                    }
	                };
	                Emitter.prototype.write_stream_end = function() {
	                    return this.flush_stream();
	                };
	                Emitter.prototype.write_indicator = function(indicator, need_whitespace, options) {
	                    var data;
	                    if (options == null) {
	                        options = {};
	                    }
	                    data = this.whitespace || !need_whitespace ? indicator : " " + indicator;
	                    this.whitespace = !!options.whitespace;
	                    this.indentation && (this.indentation = !!options.indentation);
	                    this.column += data.length;
	                    this.open_ended = false;
	                    return this.stream.write(data, this.encoding);
	                };
	                Emitter.prototype.write_indent = function() {
	                    var data, indent, ref;
	                    indent = (ref = this.indent) != null ? ref : 0;
	                    if (!this.indentation || this.column > indent || this.column === indent && !this.whitespace) {
	                        this.write_line_break();
	                    }
	                    if (this.column < indent) {
	                        this.whitespace = true;
	                        data = (new Array(indent - this.column + 1)).join(" ");
	                        this.column = indent;
	                        return this.stream.write(data, this.encoding);
	                    }
	                };
	                Emitter.prototype.write_line_break = function(data) {
	                    this.whitespace = true;
	                    this.indentation = true;
	                    this.line += 1;
	                    this.column = 0;
	                    return this.stream.write(data != null ? data : this.best_line_break, this.encoding);
	                };
	                Emitter.prototype.write_version_directive = function(version_text) {
	                    this.stream.write("%YAML " + version_text, this.encoding);
	                    return this.write_line_break();
	                };
	                Emitter.prototype.write_tag_directive = function(handle_text, prefix_text) {
	                    this.stream.write("%TAG " + handle_text + " " + prefix_text, this.encoding);
	                    return this.write_line_break();
	                };
	                Emitter.prototype.write_single_quoted = function(text, split) {
	                    var br, breaks, char, data, end, i, len, ref, spaces, start;
	                    if (split == null) {
	                        split = true;
	                    }
	                    this.write_indicator("'", true);
	                    spaces = false;
	                    breaks = false;
	                    start = end = 0;
	                    while (end <= text.length) {
	                        char = text[end];
	                        if (spaces) {
	                            if (char == null || char !== " ") {
	                                if (start + 1 === end && this.column > this.best_width && split && start !== 0 && end !== text.length) {
	                                    this.write_indent();
	                                } else {
	                                    data = text.slice(start, end);
	                                    this.column += data.length;
	                                    this.stream.write(data, this.encoding);
	                                }
	                                start = end;
	                            }
	                        } else if (breaks) {
	                            if (char == null || indexOf.call("\n\u2028\u2029", char) < 0) {
	                                if (text[start] === "\n") {
	                                    this.write_line_break();
	                                }
	                                ref = text.slice(start, end);
	                                for (i = 0, len = ref.length; i < len; i++) {
	                                    br = ref[i];
	                                    if (br === "\n") {
	                                        this.write_line_break();
	                                    } else {
	                                        this.write_line_break(br);
	                                    }
	                                }
	                                this.write_indent();
	                                start = end;
	                            }
	                        } else if ((char == null || indexOf.call(" \n\u2028\u2029", char) >= 0 || char === "'") && start < end) {
	                            data = text.slice(start, end);
	                            this.column += data.length;
	                            this.stream.write(data, this.encoding);
	                            start = end;
	                        }
	                        if (char === "'") {
	                            this.column += 2;
	                            this.stream.write("''", this.encoding);
	                            start = end + 1;
	                        }
	                        if (char != null) {
	                            spaces = char === " ";
	                            breaks = indexOf.call("\n\u2028\u2029", char) >= 0;
	                        }
	                        end++;
	                    }
	                    return this.write_indicator("'", false);
	                };
	                Emitter.prototype.write_double_quoted = function(text, split) {
	                    var char, data, end, start;
	                    if (split == null) {
	                        split = true;
	                    }
	                    this.write_indicator('"', true);
	                    start = end = 0;
	                    while (end <= text.length) {
	                        char = text[end];
	                        if (char == null || indexOf.call('"\\\u2028\u2029﻿', char) >= 0 || !(" " <= char && char <= "~" || this.allow_unicode && (" " <= char && char <= "퟿" || "" <= char && char <= "�"))) {
	                            if (start < end) {
	                                data = text.slice(start, end);
	                                this.column += data.length;
	                                this.stream.write(data, this.encoding);
	                                start = end;
	                            }
	                            if (char != null) {
	                                data = char in ESCAPE_REPLACEMENTS ? "\\" + ESCAPE_REPLACEMENTS[char] : char <= "ÿ" ? "\\x" + util.pad_left(util.to_hex(char), "0", 2) : char <= "￿" ? "\\u" + util.pad_left(util.to_hex(char), "0", 4) : "\\U" + util.pad_left(util.to_hex(char), "0", 16);
	                                this.column += data.length;
	                                this.stream.write(data, this.encoding);
	                                start = end + 1;
	                            }
	                        }
	                        if (split && 0 < end && end < text.length - 1 && (char === " " || start >= end) && this.column + (end - start) > this.best_width) {
	                            data = text.slice(start, end) + "\\";
	                            if (start < end) {
	                                start = end;
	                            }
	                            this.column += data.length;
	                            this.stream.write(data, this.encoding);
	                            this.write_indent();
	                            this.whitespace = false;
	                            this.indentation = false;
	                            if (text[start] === " ") {
	                                data = "\\";
	                                this.column += data.length;
	                                this.stream.write(data, this.encoding);
	                            }
	                        }
	                        end++;
	                    }
	                    return this.write_indicator('"', false);
	                };
	                Emitter.prototype.write_folded = function(text) {
	                    var br, breaks, char, data, end, hints, i, leading_space, len, ref, results, spaces, start;
	                    hints = this.determine_block_hints(text);
	                    this.write_indicator(">" + hints, true);
	                    if (hints.slice(-1) === "+") {
	                        this.open_ended = true;
	                    }
	                    this.write_line_break();
	                    leading_space = true;
	                    breaks = true;
	                    spaces = false;
	                    start = end = 0;
	                    results = [];
	                    while (end <= text.length) {
	                        char = text[end];
	                        if (breaks) {
	                            if (char == null || indexOf.call("\n\u2028\u2029", char) < 0) {
	                                if (!leading_space && char != null && char !== " " && text[start] === "\n") {
	                                    this.write_line_break();
	                                }
	                                leading_space = char === " ";
	                                ref = text.slice(start, end);
	                                for (i = 0, len = ref.length; i < len; i++) {
	                                    br = ref[i];
	                                    if (br === "\n") {
	                                        this.write_line_break();
	                                    } else {
	                                        this.write_line_break(br);
	                                    }
	                                }
	                                if (char != null) {
	                                    this.write_indent();
	                                }
	                                start = end;
	                            }
	                        } else if (spaces) {
	                            if (char !== " ") {
	                                if (start + 1 === end && this.column > this.best_width) {
	                                    this.write_indent();
	                                } else {
	                                    data = text.slice(start, end);
	                                    this.column += data.length;
	                                    this.stream.write(data, this.encoding);
	                                }
	                                start = end;
	                            }
	                        } else if (char == null || indexOf.call(" \n\u2028\u2029", char) >= 0) {
	                            data = text.slice(start, end);
	                            this.column += data.length;
	                            this.stream.write(data, this.encoding);
	                            if (char == null) {
	                                this.write_line_break();
	                            }
	                            start = end;
	                        }
	                        if (char != null) {
	                            breaks = indexOf.call("\n\u2028\u2029", char) >= 0;
	                            spaces = char === " ";
	                        }
	                        results.push(end++);
	                    }
	                    return results;
	                };
	                Emitter.prototype.write_literal = function(text) {
	                    var br, breaks, char, data, end, hints, i, len, ref, results, start;
	                    hints = this.determine_block_hints(text);
	                    this.write_indicator("|" + hints, true);
	                    if (hints.slice(-1) === "+") {
	                        this.open_ended = true;
	                    }
	                    this.write_line_break();
	                    breaks = true;
	                    start = end = 0;
	                    results = [];
	                    while (end <= text.length) {
	                        char = text[end];
	                        if (breaks) {
	                            if (char == null || indexOf.call("\n\u2028\u2029", char) < 0) {
	                                ref = text.slice(start, end);
	                                for (i = 0, len = ref.length; i < len; i++) {
	                                    br = ref[i];
	                                    if (br === "\n") {
	                                        this.write_line_break();
	                                    } else {
	                                        this.write_line_break(br);
	                                    }
	                                }
	                                if (char != null) {
	                                    this.write_indent();
	                                }
	                                start = end;
	                            }
	                        } else {
	                            if (char == null || indexOf.call("\n\u2028\u2029", char) >= 0) {
	                                data = text.slice(start, end);
	                                this.stream.write(data, this.encoding);
	                                if (char == null) {
	                                    this.write_line_break();
	                                }
	                                start = end;
	                            }
	                        }
	                        if (char != null) {
	                            breaks = indexOf.call("\n\u2028\u2029", char) >= 0;
	                        }
	                        results.push(end++);
	                    }
	                    return results;
	                };
	                Emitter.prototype.write_plain = function(text, split) {
	                    var br, breaks, char, data, end, i, len, ref, results, spaces, start;
	                    if (split == null) {
	                        split = true;
	                    }
	                    if (!text) {
	                        return;
	                    }
	                    if (this.root_context) {
	                        this.open_ended = true;
	                    }
	                    if (!this.whitespace) {
	                        data = " ";
	                        this.column += data.length;
	                        this.stream.write(data, this.encoding);
	                    }
	                    this.whitespace = false;
	                    this.indentation = false;
	                    spaces = false;
	                    breaks = false;
	                    start = end = 0;
	                    results = [];
	                    while (end <= text.length) {
	                        char = text[end];
	                        if (spaces) {
	                            if (char !== " ") {
	                                if (start + 1 === end && this.column > this.best_width && split) {
	                                    this.write_indent();
	                                    this.whitespace = false;
	                                    this.indentation = false;
	                                } else {
	                                    data = text.slice(start, end);
	                                    this.column += data.length;
	                                    this.stream.write(data, this.encoding);
	                                }
	                                start = end;
	                            }
	                        } else if (breaks) {
	                            if (indexOf.call("\n\u2028\u2029", char) < 0) {
	                                if (text[start] === "\n") {
	                                    this.write_line_break();
	                                }
	                                ref = text.slice(start, end);
	                                for (i = 0, len = ref.length; i < len; i++) {
	                                    br = ref[i];
	                                    if (br === "\n") {
	                                        this.write_line_break();
	                                    } else {
	                                        this.write_line_break(br);
	                                    }
	                                }
	                                this.write_indent();
	                                this.whitespace = false;
	                                this.indentation = false;
	                                start = end;
	                            }
	                        } else {
	                            if (char == null || indexOf.call(" \n\u2028\u2029", char) >= 0) {
	                                data = text.slice(start, end);
	                                this.column += data.length;
	                                this.stream.write(data, this.encoding);
	                                start = end;
	                            }
	                        }
	                        if (char != null) {
	                            spaces = char === " ";
	                            breaks = indexOf.call("\n\u2028\u2029", char) >= 0;
	                        }
	                        results.push(end++);
	                    }
	                    return results;
	                };
	                Emitter.prototype.determine_block_hints = function(text) {
	                    var first, hints, i, last, penultimate;
	                    hints = "";
	                    first = text[0], i = text.length - 2, penultimate = text[i++], last = text[i++];
	                    if (indexOf.call(" \n\u2028\u2029", first) >= 0) {
	                        hints += this.best_indent;
	                    }
	                    if (indexOf.call("\n\u2028\u2029", last) < 0) {
	                        hints += "-";
	                    } else if (text.length === 1 || indexOf.call("\n\u2028\u2029", penultimate) >= 0) {
	                        hints += "+";
	                    }
	                    return hints;
	                };
	                Emitter.prototype.flush_stream = function() {
	                    var base;
	                    return typeof (base = this.stream).flush === "function" ? base.flush() : void 0;
	                };
	                Emitter.prototype.error = function(message, context) {
	                    var ref, ref1;
	                    if (context) {
	                        context = (ref = context != null ? (ref1 = context.constructor) != null ? ref1.name : void 0 : void 0) != null ? ref : util.inspect(context);
	                    }
	                    throw new exports.EmitterError("" + message + (context ? " " + context : ""));
	                };
	                return Emitter;
	            }();
	            ScalarAnalysis = function() {
	                function ScalarAnalysis(scalar1, empty, multiline, allow_flow_plain1, allow_block_plain1, allow_single_quoted1, allow_double_quoted1, allow_block1) {
	                    this.scalar = scalar1;
	                    this.empty = empty;
	                    this.multiline = multiline;
	                    this.allow_flow_plain = allow_flow_plain1;
	                    this.allow_block_plain = allow_block_plain1;
	                    this.allow_single_quoted = allow_single_quoted1;
	                    this.allow_double_quoted = allow_double_quoted1;
	                    this.allow_block = allow_block1;
	                }
	                return ScalarAnalysis;
	            }();
	        }).call(this);
	    });
	    register({
	        "0": [ "./serializer" ]
	    }, 0, function(global, module, exports, require, window) {
	        (function() {
	            var YAMLError, events, nodes, util, extend = function(child, parent) {
	                for (var key in parent) {
	                    if (hasProp.call(parent, key)) child[key] = parent[key];
	                }
	                function ctor() {
	                    this.constructor = child;
	                }
	                ctor.prototype = parent.prototype;
	                child.prototype = new ctor;
	                child.__super__ = parent.prototype;
	                return child;
	            }, hasProp = {}.hasOwnProperty;
	            events = require("./events");
	            nodes = require("./nodes");
	            util = require("./util");
	            YAMLError = require("./errors").YAMLError;
	            this.SerializerError = function(superClass) {
	                extend(SerializerError, superClass);
	                function SerializerError() {
	                    return SerializerError.__super__.constructor.apply(this, arguments);
	                }
	                return SerializerError;
	            }(YAMLError);
	            this.Serializer = function() {
	                function Serializer(arg) {
	                    var ref;
	                    ref = arg != null ? arg : {}, this.encoding = ref.encoding, this.explicit_start = ref.explicit_start, this.explicit_end = ref.explicit_end, this.version = ref.version, this.tags = ref.tags;
	                    this.serialized_nodes = {};
	                    this.anchors = {};
	                    this.last_anchor_id = 0;
	                    this.closed = null;
	                }
	                Serializer.prototype.open = function() {
	                    if (this.closed === null) {
	                        this.emit(new events.StreamStartEvent(this.encoding));
	                        return this.closed = false;
	                    } else if (this.closed) {
	                        throw new SerializerError("serializer is closed");
	                    } else {
	                        throw new SerializerError("serializer is already open");
	                    }
	                };
	                Serializer.prototype.close = function() {
	                    if (this.closed === null) {
	                        throw new SerializerError("serializer is not opened");
	                    } else if (!this.closed) {
	                        this.emit(new events.StreamEndEvent);
	                        return this.closed = true;
	                    }
	                };
	                Serializer.prototype.serialize = function(node) {
	                    if (this.closed === null) {
	                        throw new SerializerError("serializer is not opened");
	                    } else if (this.closed) {
	                        throw new SerializerError("serializer is closed");
	                    }
	                    if (node != null) {
	                        this.emit(new events.DocumentStartEvent(void 0, void 0, this.explicit_start, this.version, this.tags));
	                        this.anchor_node(node);
	                        this.serialize_node(node);
	                        this.emit(new events.DocumentEndEvent(void 0, void 0, this.explicit_end));
	                    }
	                    this.serialized_nodes = {};
	                    this.anchors = {};
	                    return this.last_anchor_id = 0;
	                };
	                Serializer.prototype.anchor_node = function(node) {
	                    var base, i, item, j, key, len, len1, name, ref, ref1, ref2, results, results1, value;
	                    if (node.unique_id in this.anchors) {
	                        return (base = this.anchors)[name = node.unique_id] != null ? base[name] : base[name] = this.generate_anchor(node);
	                    } else {
	                        this.anchors[node.unique_id] = null;
	                        if (node instanceof nodes.SequenceNode) {
	                            ref = node.value;
	                            results = [];
	                            for (i = 0, len = ref.length; i < len; i++) {
	                                item = ref[i];
	                                results.push(this.anchor_node(item));
	                            }
	                            return results;
	                        } else if (node instanceof nodes.MappingNode) {
	                            ref1 = node.value;
	                            results1 = [];
	                            for (j = 0, len1 = ref1.length; j < len1; j++) {
	                                ref2 = ref1[j], key = ref2[0], value = ref2[1];
	                                this.anchor_node(key);
	                                results1.push(this.anchor_node(value));
	                            }
	                            return results1;
	                        }
	                    }
	                };
	                Serializer.prototype.generate_anchor = function(node) {
	                    return "id" + util.pad_left(++this.last_anchor_id, "0", 4);
	                };
	                Serializer.prototype.serialize_node = function(node, parent, index) {
	                    var alias, default_tag, detected_tag, i, implicit, item, j, key, len, len1, ref, ref1, ref2, value;
	                    alias = this.anchors[node.unique_id];
	                    if (node.unique_id in this.serialized_nodes) {
	                        return this.emit(new events.AliasEvent(alias));
	                    } else {
	                        this.serialized_nodes[node.unique_id] = true;
	                        this.descend_resolver(parent, index);
	                        if (node instanceof nodes.ScalarNode) {
	                            detected_tag = this.resolve(nodes.ScalarNode, node.value, [ true, false ]);
	                            default_tag = this.resolve(nodes.ScalarNode, node.value, [ false, true ]);
	                            implicit = [ node.tag === detected_tag, node.tag === default_tag ];
	                            this.emit(new events.ScalarEvent(alias, node.tag, implicit, node.value, void 0, void 0, node.style));
	                        } else if (node instanceof nodes.SequenceNode) {
	                            implicit = node.tag === this.resolve(nodes.SequenceNode, node.value, true);
	                            this.emit(new events.SequenceStartEvent(alias, node.tag, implicit, void 0, void 0, node.flow_style));
	                            ref = node.value;
	                            for (index = i = 0, len = ref.length; i < len; index = ++i) {
	                                item = ref[index];
	                                this.serialize_node(item, node, index);
	                            }
	                            this.emit(new events.SequenceEndEvent);
	                        } else if (node instanceof nodes.MappingNode) {
	                            implicit = node.tag === this.resolve(nodes.MappingNode, node.value, true);
	                            this.emit(new events.MappingStartEvent(alias, node.tag, implicit, void 0, void 0, node.flow_style));
	                            ref1 = node.value;
	                            for (j = 0, len1 = ref1.length; j < len1; j++) {
	                                ref2 = ref1[j], key = ref2[0], value = ref2[1];
	                                this.serialize_node(key, node, null);
	                                this.serialize_node(value, node, key);
	                            }
	                            this.emit(new events.MappingEndEvent);
	                        }
	                        return this.ascend_resolver();
	                    }
	                };
	                return Serializer;
	            }();
	        }).call(this);
	    });
	    register({
	        "0": [ "./representer" ]
	    }, 0, function(global, module, exports, require, window) {
	        (function() {
	            var YAMLError, nodes, extend = function(child, parent) {
	                for (var key in parent) {
	                    if (hasProp.call(parent, key)) child[key] = parent[key];
	                }
	                function ctor() {
	                    this.constructor = child;
	                }
	                ctor.prototype = parent.prototype;
	                child.prototype = new ctor;
	                child.__super__ = parent.prototype;
	                return child;
	            }, hasProp = {}.hasOwnProperty;
	            nodes = require("./nodes");
	            YAMLError = require("./errors").YAMLError;
	            this.RepresenterError = function(superClass) {
	                extend(RepresenterError, superClass);
	                function RepresenterError() {
	                    return RepresenterError.__super__.constructor.apply(this, arguments);
	                }
	                return RepresenterError;
	            }(YAMLError);
	            this.BaseRepresenter = function() {
	                BaseRepresenter.prototype.yaml_representers_types = [];
	                BaseRepresenter.prototype.yaml_representers_handlers = [];
	                BaseRepresenter.prototype.yaml_multi_representers_types = [];
	                BaseRepresenter.prototype.yaml_multi_representers_handlers = [];
	                BaseRepresenter.add_representer = function(data_type, handler) {
	                    if (!this.prototype.hasOwnProperty("yaml_representers_types")) {
	                        this.prototype.yaml_representers_types = [].concat(this.prototype.yaml_representers_types);
	                    }
	                    if (!this.prototype.hasOwnProperty("yaml_representers_handlers")) {
	                        this.prototype.yaml_representers_handlers = [].concat(this.prototype.yaml_representers_handlers);
	                    }
	                    this.prototype.yaml_representers_types.push(data_type);
	                    return this.prototype.yaml_representers_handlers.push(handler);
	                };
	                BaseRepresenter.add_multi_representer = function(data_type, handler) {
	                    if (!this.prototype.hasOwnProperty("yaml_multi_representers_types")) {
	                        this.prototype.yaml_multi_representers_types = [].concat(this.prototype.yaml_multi_representers_types);
	                    }
	                    if (!this.prototype.hasOwnProperty("yaml_multi_representers_handlers")) {
	                        this.prototype.yaml_multi_representers_handlers = [].concat(this.prototype.yaml_multi_representers_handlers);
	                    }
	                    this.prototype.yaml_multi_representers_types.push(data_type);
	                    return this.prototype.yaml_multi_representers_handlers.push(handler);
	                };
	                function BaseRepresenter(arg) {
	                    var ref;
	                    ref = arg != null ? arg : {}, this.default_style = ref.default_style, this.default_flow_style = ref.default_flow_style;
	                    this.represented_objects = {};
	                    this.object_keeper = [];
	                    this.alias_key = null;
	                }
	                BaseRepresenter.prototype.represent = function(data) {
	                    var node;
	                    node = this.represent_data(data);
	                    this.serialize(node);
	                    this.represented_objects = {};
	                    this.object_keeper = [];
	                    return this.alias_key = null;
	                };
	                BaseRepresenter.prototype.represent_data = function(data) {
	                    var data_type, i, j, len, ref, representer, type;
	                    if (this.ignore_aliases(data)) {
	                        this.alias_key = null;
	                    } else if ((i = this.object_keeper.indexOf(data)) !== -1) {
	                        this.alias_key = i;
	                        if (this.alias_key in this.represented_objects) {
	                            return this.represented_objects[this.alias_key];
	                        }
	                    } else {
	                        this.alias_key = this.object_keeper.length;
	                        this.object_keeper.push(data);
	                    }
	                    representer = null;
	                    data_type = data === null ? "null" : typeof data;
	                    if (data_type === "object") {
	                        data_type = data.constructor;
	                    }
	                    if ((i = this.yaml_representers_types.lastIndexOf(data_type)) !== -1) {
	                        representer = this.yaml_representers_handlers[i];
	                    }
	                    if (representer == null) {
	                        ref = this.yaml_multi_representers_types;
	                        for (i = j = 0, len = ref.length; j < len; i = ++j) {
	                            type = ref[i];
	                            if (!(data instanceof type)) {
	                                continue;
	                            }
	                            representer = this.yaml_multi_representers_handlers[i];
	                            break;
	                        }
	                    }
	                    if (representer == null) {
	                        if ((i = this.yaml_multi_representers_types.lastIndexOf(void 0)) !== -1) {
	                            representer = this.yaml_multi_representers_handlers[i];
	                        } else if ((i = this.yaml_representers_types.lastIndexOf(void 0)) !== -1) {
	                            representer = this.yaml_representers_handlers[i];
	                        }
	                    }
	                    if (representer != null) {
	                        return representer.call(this, data);
	                    } else {
	                        return new nodes.ScalarNode(null, "" + data);
	                    }
	                };
	                BaseRepresenter.prototype.represent_scalar = function(tag, value, style) {
	                    var node;
	                    if (style == null) {
	                        style = this.default_style;
	                    }
	                    node = new nodes.ScalarNode(tag, value, null, null, style);
	                    if (this.alias_key != null) {
	                        this.represented_objects[this.alias_key] = node;
	                    }
	                    return node;
	                };
	                BaseRepresenter.prototype.represent_sequence = function(tag, sequence, flow_style) {
	                    var best_style, item, j, len, node, node_item, ref, value;
	                    value = [];
	                    node = new nodes.SequenceNode(tag, value, null, null, flow_style);
	                    if (this.alias_key != null) {
	                        this.represented_objects[this.alias_key] = node;
	                    }
	                    best_style = true;
	                    for (j = 0, len = sequence.length; j < len; j++) {
	                        item = sequence[j];
	                        node_item = this.represent_data(item);
	                        if (!(node_item instanceof nodes.ScalarNode || node_item.style)) {
	                            best_style = false;
	                        }
	                        value.push(node_item);
	                    }
	                    if (flow_style == null) {
	                        node.flow_style = (ref = this.default_flow_style) != null ? ref : best_style;
	                    }
	                    return node;
	                };
	                BaseRepresenter.prototype.represent_mapping = function(tag, mapping, flow_style) {
	                    var best_style, item_key, item_value, node, node_key, node_value, ref, value;
	                    value = [];
	                    node = new nodes.MappingNode(tag, value, flow_style);
	                    if (this.alias_key) {
	                        this.represented_objects[this.alias_key] = node;
	                    }
	                    best_style = true;
	                    for (item_key in mapping) {
	                        if (!hasProp.call(mapping, item_key)) continue;
	                        item_value = mapping[item_key];
	                        node_key = this.represent_data(item_key);
	                        node_value = this.represent_data(item_value);
	                        if (!(node_key instanceof nodes.ScalarNode || node_key.style)) {
	                            best_style = false;
	                        }
	                        if (!(node_value instanceof nodes.ScalarNode || node_value.style)) {
	                            best_style = false;
	                        }
	                        value.push([ node_key, node_value ]);
	                    }
	                    if (!flow_style) {
	                        node.flow_style = (ref = this.default_flow_style) != null ? ref : best_style;
	                    }
	                    return node;
	                };
	                BaseRepresenter.prototype.ignore_aliases = function(data) {
	                    return false;
	                };
	                return BaseRepresenter;
	            }();
	            this.Representer = function(superClass) {
	                extend(Representer, superClass);
	                function Representer() {
	                    return Representer.__super__.constructor.apply(this, arguments);
	                }
	                Representer.prototype.represent_boolean = function(data) {
	                    return this.represent_scalar("tag:yaml.org,2002:bool", data ? "true" : "false");
	                };
	                Representer.prototype.represent_null = function(data) {
	                    return this.represent_scalar("tag:yaml.org,2002:null", "null");
	                };
	                Representer.prototype.represent_number = function(data) {
	                    var tag, value;
	                    tag = "tag:yaml.org,2002:" + (data % 1 === 0 ? "int" : "float");
	                    value = data !== data ? ".nan" : data === Infinity ? ".inf" : data === -Infinity ? "-.inf" : data.toString();
	                    return this.represent_scalar(tag, value);
	                };
	                Representer.prototype.represent_string = function(data) {
	                    return this.represent_scalar("tag:yaml.org,2002:str", data);
	                };
	                Representer.prototype.represent_array = function(data) {
	                    return this.represent_sequence("tag:yaml.org,2002:seq", data);
	                };
	                Representer.prototype.represent_date = function(data) {
	                    return this.represent_scalar("tag:yaml.org,2002:timestamp", data.toISOString());
	                };
	                Representer.prototype.represent_object = function(data) {
	                    return this.represent_mapping("tag:yaml.org,2002:map", data);
	                };
	                Representer.prototype.represent_undefined = function(data) {
	                    throw new exports.RepresenterError("cannot represent an onbject: " + data);
	                };
	                Representer.prototype.ignore_aliases = function(data) {
	                    var ref;
	                    if (data == null) {
	                        return true;
	                    }
	                    if ((ref = typeof data) === "boolean" || ref === "number" || ref === "string") {
	                        return true;
	                    }
	                    return false;
	                };
	                return Representer;
	            }(this.BaseRepresenter);
	            this.Representer.add_representer("boolean", this.Representer.prototype.represent_boolean);
	            this.Representer.add_representer("null", this.Representer.prototype.represent_null);
	            this.Representer.add_representer("number", this.Representer.prototype.represent_number);
	            this.Representer.add_representer("string", this.Representer.prototype.represent_string);
	            this.Representer.add_representer(Array, this.Representer.prototype.represent_array);
	            this.Representer.add_representer(Date, this.Representer.prototype.represent_date);
	            this.Representer.add_representer(Object, this.Representer.prototype.represent_object);
	            this.Representer.add_representer(null, this.Representer.prototype.represent_undefined);
	        }).call(this);
	    });
	    register({
	        "0": [ "./resolver" ]
	    }, 0, function(global, module, exports, require, window) {
	        (function() {
	            var YAMLError, nodes, util, extend = function(child, parent) {
	                for (var key in parent) {
	                    if (hasProp.call(parent, key)) child[key] = parent[key];
	                }
	                function ctor() {
	                    this.constructor = child;
	                }
	                ctor.prototype = parent.prototype;
	                child.prototype = new ctor;
	                child.__super__ = parent.prototype;
	                return child;
	            }, hasProp = {}.hasOwnProperty, indexOf = [].indexOf || function(item) {
	                for (var i = 0, l = this.length; i < l; i++) {
	                    if (i in this && this[i] === item) return i;
	                }
	                return -1;
	            };
	            nodes = require("./nodes");
	            util = require("./util");
	            YAMLError = require("./errors").YAMLError;
	            this.ResolverError = function(superClass) {
	                extend(ResolverError, superClass);
	                function ResolverError() {
	                    return ResolverError.__super__.constructor.apply(this, arguments);
	                }
	                return ResolverError;
	            }(YAMLError);
	            this.BaseResolver = function() {
	                var DEFAULT_MAPPING_TAG, DEFAULT_SCALAR_TAG, DEFAULT_SEQUENCE_TAG;
	                DEFAULT_SCALAR_TAG = "tag:yaml.org,2002:str";
	                DEFAULT_SEQUENCE_TAG = "tag:yaml.org,2002:seq";
	                DEFAULT_MAPPING_TAG = "tag:yaml.org,2002:map";
	                BaseResolver.prototype.yaml_implicit_resolvers = {};
	                BaseResolver.prototype.yaml_path_resolvers = {};
	                BaseResolver.add_implicit_resolver = function(tag, regexp, first) {
	                    var base, char, i, len, results;
	                    if (first == null) {
	                        first = [ null ];
	                    }
	                    if (!this.prototype.hasOwnProperty("yaml_implicit_resolvers")) {
	                        this.prototype.yaml_implicit_resolvers = util.extend({}, this.prototype.yaml_implicit_resolvers);
	                    }
	                    results = [];
	                    for (i = 0, len = first.length; i < len; i++) {
	                        char = first[i];
	                        results.push(((base = this.prototype.yaml_implicit_resolvers)[char] != null ? base[char] : base[char] = []).push([ tag, regexp ]));
	                    }
	                    return results;
	                };
	                function BaseResolver() {
	                    this.resolver_exact_paths = [];
	                    this.resolver_prefix_paths = [];
	                }
	                BaseResolver.prototype.descend_resolver = function(current_node, current_index) {
	                    var depth, exact_paths, i, j, kind, len, len1, path, prefix_paths, ref, ref1, ref2, ref3;
	                    if (util.is_empty(this.yaml_path_resolvers)) {
	                        return;
	                    }
	                    exact_paths = {};
	                    prefix_paths = [];
	                    if (current_node) {
	                        depth = this.resolver_prefix_paths.length;
	                        ref = this.resolver_prefix_paths.slice(-1)[0];
	                        for (i = 0, len = ref.length; i < len; i++) {
	                            ref1 = ref[i], path = ref1[0], kind = ref1[1];
	                            if (this.check_resolver_prefix(depth, path, kind, current_node, current_index)) {
	                                if (path.length > depth) {
	                                    prefix_paths.push([ path, kind ]);
	                                } else {
	                                    exact_paths[kind] = this.yaml_path_resolvers[path][kind];
	                                }
	                            }
	                        }
	                    } else {
	                        ref2 = this.yaml_path_resolvers;
	                        for (j = 0, len1 = ref2.length; j < len1; j++) {
	                            ref3 = ref2[j], path = ref3[0], kind = ref3[1];
	                            if (!path) {
	                                exact_paths[kind] = this.yaml_path_resolvers[path][kind];
	                            } else {
	                                prefix_paths.push([ path, kind ]);
	                            }
	                        }
	                    }
	                    this.resolver_exact_paths.push(exact_paths);
	                    return this.resolver_prefix_paths.push(prefix_paths);
	                };
	                BaseResolver.prototype.ascend_resolver = function() {
	                    if (util.is_empty(this.yaml_path_resolvers)) {
	                        return;
	                    }
	                    this.resolver_exact_paths.pop();
	                    return this.resolver_prefix_paths.pop();
	                };
	                BaseResolver.prototype.check_resolver_prefix = function(depth, path, kind, current_node, current_index) {
	                    var index_check, node_check, ref;
	                    ref = path[depth - 1], node_check = ref[0], index_check = ref[1];
	                    if (typeof node_check === "string") {
	                        if (current_node.tag !== node_check) {
	                            return;
	                        }
	                    } else if (node_check !== null) {
	                        if (!(current_node instanceof node_check)) {
	                            return;
	                        }
	                    }
	                    if (index_check === true && current_index !== null) {
	                        return;
	                    }
	                    if ((index_check === false || index_check === null) && current_index === null) {
	                        return;
	                    }
	                    if (typeof index_check === "string") {
	                        if (!(current_index instanceof nodes.ScalarNode) && index_check === current_index.value) {
	                            return;
	                        }
	                    } else if (typeof index_check === "number") {
	                        if (index_check !== current_index) {
	                            return;
	                        }
	                    }
	                    return true;
	                };
	                BaseResolver.prototype.resolve = function(kind, value, implicit) {
	                    var empty, exact_paths, i, k, len, ref, ref1, ref2, ref3, regexp, resolvers, tag;
	                    if (kind === nodes.ScalarNode && implicit[0]) {
	                        if (value === "") {
	                            resolvers = (ref = this.yaml_implicit_resolvers[""]) != null ? ref : [];
	                        } else {
	                            resolvers = (ref1 = this.yaml_implicit_resolvers[value[0]]) != null ? ref1 : [];
	                        }
	                        resolvers = resolvers.concat((ref2 = this.yaml_implicit_resolvers[null]) != null ? ref2 : []);
	                        for (i = 0, len = resolvers.length; i < len; i++) {
	                            ref3 = resolvers[i], tag = ref3[0], regexp = ref3[1];
	                            if (value.match(regexp)) {
	                                return tag;
	                            }
	                        }
	                        implicit = implicit[1];
	                    }
	                    empty = true;
	                    for (k in this.yaml_path_resolvers) {
	                        if ({}[k] == null) {
	                            empty = false;
	                        }
	                    }
	                    if (!empty) {
	                        exact_paths = this.resolver_exact_paths.slice(-1)[0];
	                        if (indexOf.call(exact_paths, kind) >= 0) {
	                            return exact_paths[kind];
	                        }
	                        if (indexOf.call(exact_paths, null) >= 0) {
	                            return exact_paths[null];
	                        }
	                    }
	                    if (kind === nodes.ScalarNode) {
	                        return DEFAULT_SCALAR_TAG;
	                    }
	                    if (kind === nodes.SequenceNode) {
	                        return DEFAULT_SEQUENCE_TAG;
	                    }
	                    if (kind === nodes.MappingNode) {
	                        return DEFAULT_MAPPING_TAG;
	                    }
	                };
	                return BaseResolver;
	            }();
	            this.Resolver = function(superClass) {
	                extend(Resolver, superClass);
	                function Resolver() {
	                    return Resolver.__super__.constructor.apply(this, arguments);
	                }
	                return Resolver;
	            }(this.BaseResolver);
	            this.Resolver.add_implicit_resolver("tag:yaml.org,2002:bool", /^(?:yes|Yes|YES|true|True|TRUE|on|On|ON|no|No|NO|false|False|FALSE|off|Off|OFF)$/, "yYnNtTfFoO");
	            this.Resolver.add_implicit_resolver("tag:yaml.org,2002:float", /^(?:[-+]?(?:[0-9][0-9_]*)\.[0-9_]*(?:[eE][-+][0-9]+)?|\.[0-9_]+(?:[eE][-+][0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*|[-+]?\.(?:inf|Inf|INF)|\.(?:nan|NaN|NAN))$/, "-+0123456789.");
	            this.Resolver.add_implicit_resolver("tag:yaml.org,2002:int", /^(?:[-+]?0b[01_]+|[-+]?0[0-7_]+|[-+]?(?:0|[1-9][0-9_]*)|[-+]?0x[0-9a-fA-F_]+|[-+]?0o[0-7_]+|[-+]?[1-9][0-9_]*(?::[0-5]?[0-9])+)$/, "-+0123456789");
	            this.Resolver.add_implicit_resolver("tag:yaml.org,2002:merge", /^(?:<<)$/, "<");
	            this.Resolver.add_implicit_resolver("tag:yaml.org,2002:null", /^(?:~|null|Null|NULL|)$/, [ "~", "n", "N", "" ]);
	            this.Resolver.add_implicit_resolver("tag:yaml.org,2002:timestamp", /^(?:[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]|[0-9][0-9][0-9][0-9]-[0-9][0-9]?-[0-9][0-9]?(?:[Tt]|[\x20\t]+)[0-9][0-9]?:[0-9][0-9]:[0-9][0-9](?:\.[0-9]*)?(?:[\x20\t]*(?:Z|[-+][0-9][0-9]?(?::[0-9][0-9])?))?)$/, "0123456789");
	            this.Resolver.add_implicit_resolver("tag:yaml.org,2002:value", /^(?:=)$/, "=");
	            this.Resolver.add_implicit_resolver("tag:yaml.org,2002:yaml", /^(?:!|&|\*)$/, "!&*");
	        }).call(this);
	    });
	    register({
	        "0": [ "./dumper" ]
	    }, 0, function(global, module, exports, require, window) {
	        (function() {
	            var emitter, representer, resolver, serializer, util, slice = [].slice;
	            util = require("./util");
	            emitter = require("./emitter");
	            serializer = require("./serializer");
	            representer = require("./representer");
	            resolver = require("./resolver");
	            this.make_dumper = function(Emitter, Serializer, Representer, Resolver) {
	                var Dumper, components;
	                if (Emitter == null) {
	                    Emitter = emitter.Emitter;
	                }
	                if (Serializer == null) {
	                    Serializer = serializer.Serializer;
	                }
	                if (Representer == null) {
	                    Representer = representer.Representer;
	                }
	                if (Resolver == null) {
	                    Resolver = resolver.Resolver;
	                }
	                components = [ Emitter, Serializer, Representer, Resolver ];
	                return Dumper = function() {
	                    var component;
	                    util.extend.apply(util, [ Dumper.prototype ].concat(slice.call(function() {
	                        var i, len, results;
	                        results = [];
	                        for (i = 0, len = components.length; i < len; i++) {
	                            component = components[i];
	                            results.push(component.prototype);
	                        }
	                        return results;
	                    }())));
	                    function Dumper(stream, options) {
	                        var i, len, ref;
	                        if (options == null) {
	                            options = {};
	                        }
	                        components[0].call(this, stream, options);
	                        ref = components.slice(1);
	                        for (i = 0, len = ref.length; i < len; i++) {
	                            component = ref[i];
	                            component.call(this, options);
	                        }
	                    }
	                    return Dumper;
	                }();
	            };
	            this.Dumper = this.make_dumper();
	        }).call(this);
	    });
	    register({
	        "0": [ "./reader" ]
	    }, 0, function(global, module, exports, require, window) {
	        (function() {
	            var Mark, YAMLError, ref, extend = function(child, parent) {
	                for (var key in parent) {
	                    if (hasProp.call(parent, key)) child[key] = parent[key];
	                }
	                function ctor() {
	                    this.constructor = child;
	                }
	                ctor.prototype = parent.prototype;
	                child.prototype = new ctor;
	                child.__super__ = parent.prototype;
	                return child;
	            }, hasProp = {}.hasOwnProperty, indexOf = [].indexOf || function(item) {
	                for (var i = 0, l = this.length; i < l; i++) {
	                    if (i in this && this[i] === item) return i;
	                }
	                return -1;
	            };
	            ref = require("./errors"), Mark = ref.Mark, YAMLError = ref.YAMLError;
	            this.ReaderError = function(superClass) {
	                extend(ReaderError, superClass);
	                function ReaderError(position1, character1, reason) {
	                    this.position = position1;
	                    this.character = character1;
	                    this.reason = reason;
	                    ReaderError.__super__.constructor.call(this);
	                }
	                ReaderError.prototype.toString = function() {
	                    return "unacceptable character " + this.character.charCodeAt() + ": " + this.reason + "\n  position " + this.position;
	                };
	                return ReaderError;
	            }(YAMLError);
	            this.Reader = function() {
	                var NON_PRINTABLE;
	                NON_PRINTABLE = /[^\x09\x0A\x0D\x20-\x7E\x85\xA0-\uD7FF\uE000-\uFFFD]/;
	                function Reader(string) {
	                    this.string = string;
	                    this.line = 0;
	                    this.column = 0;
	                    this.index = 0;
	                    this.check_printable();
	                    this.string += "\0";
	                }
	                Reader.prototype.peek = function(index) {
	                    if (index == null) {
	                        index = 0;
	                    }
	                    return this.string[this.index + index];
	                };
	                Reader.prototype.prefix = function(length) {
	                    if (length == null) {
	                        length = 1;
	                    }
	                    return this.string.slice(this.index, this.index + length);
	                };
	                Reader.prototype.forward = function(length) {
	                    var char, results;
	                    if (length == null) {
	                        length = 1;
	                    }
	                    results = [];
	                    while (length) {
	                        char = this.string[this.index];
	                        this.index++;
	                        if (indexOf.call("\n₂\u2029", char) >= 0 || char === "\r" && this.string[this.index] !== "\n") {
	                            this.line++;
	                            this.column = 0;
	                        } else {
	                            this.column++;
	                        }
	                        results.push(length--);
	                    }
	                    return results;
	                };
	                Reader.prototype.get_mark = function() {
	                    return new Mark(this.line, this.column, this.string, this.index);
	                };
	                Reader.prototype.check_printable = function() {
	                    var character, match, position;
	                    match = NON_PRINTABLE.exec(this.string);
	                    if (match) {
	                        character = match[0];
	                        position = this.string.length - this.index + match.index;
	                        throw new exports.ReaderError(position, character.charCodeAt(), "special characters are not allowed");
	                    }
	                };
	                return Reader;
	            }();
	        }).call(this);
	    });
	    register({
	        "0": [ "./tokens" ]
	    }, 0, function(global, module, exports, require, window) {
	        (function() {
	            var extend = function(child, parent) {
	                for (var key in parent) {
	                    if (hasProp.call(parent, key)) child[key] = parent[key];
	                }
	                function ctor() {
	                    this.constructor = child;
	                }
	                ctor.prototype = parent.prototype;
	                child.prototype = new ctor;
	                child.__super__ = parent.prototype;
	                return child;
	            }, hasProp = {}.hasOwnProperty;
	            this.Token = function() {
	                function Token(start_mark, end_mark) {
	                    this.start_mark = start_mark;
	                    this.end_mark = end_mark;
	                }
	                return Token;
	            }();
	            this.DirectiveToken = function(superClass) {
	                extend(DirectiveToken, superClass);
	                DirectiveToken.prototype.id = "<directive>";
	                function DirectiveToken(name, value, start_mark, end_mark) {
	                    this.name = name;
	                    this.value = value;
	                    this.start_mark = start_mark;
	                    this.end_mark = end_mark;
	                }
	                return DirectiveToken;
	            }(this.Token);
	            this.DocumentStartToken = function(superClass) {
	                extend(DocumentStartToken, superClass);
	                function DocumentStartToken() {
	                    return DocumentStartToken.__super__.constructor.apply(this, arguments);
	                }
	                DocumentStartToken.prototype.id = "<document start>";
	                return DocumentStartToken;
	            }(this.Token);
	            this.DocumentEndToken = function(superClass) {
	                extend(DocumentEndToken, superClass);
	                function DocumentEndToken() {
	                    return DocumentEndToken.__super__.constructor.apply(this, arguments);
	                }
	                DocumentEndToken.prototype.id = "<document end>";
	                return DocumentEndToken;
	            }(this.Token);
	            this.StreamStartToken = function(superClass) {
	                extend(StreamStartToken, superClass);
	                StreamStartToken.prototype.id = "<stream start>";
	                function StreamStartToken(start_mark, end_mark, encoding) {
	                    this.start_mark = start_mark;
	                    this.end_mark = end_mark;
	                    this.encoding = encoding;
	                }
	                return StreamStartToken;
	            }(this.Token);
	            this.StreamEndToken = function(superClass) {
	                extend(StreamEndToken, superClass);
	                function StreamEndToken() {
	                    return StreamEndToken.__super__.constructor.apply(this, arguments);
	                }
	                StreamEndToken.prototype.id = "<stream end>";
	                return StreamEndToken;
	            }(this.Token);
	            this.BlockSequenceStartToken = function(superClass) {
	                extend(BlockSequenceStartToken, superClass);
	                function BlockSequenceStartToken() {
	                    return BlockSequenceStartToken.__super__.constructor.apply(this, arguments);
	                }
	                BlockSequenceStartToken.prototype.id = "<block sequence start>";
	                return BlockSequenceStartToken;
	            }(this.Token);
	            this.BlockMappingStartToken = function(superClass) {
	                extend(BlockMappingStartToken, superClass);
	                function BlockMappingStartToken() {
	                    return BlockMappingStartToken.__super__.constructor.apply(this, arguments);
	                }
	                BlockMappingStartToken.prototype.id = "<block mapping end>";
	                return BlockMappingStartToken;
	            }(this.Token);
	            this.BlockEndToken = function(superClass) {
	                extend(BlockEndToken, superClass);
	                function BlockEndToken() {
	                    return BlockEndToken.__super__.constructor.apply(this, arguments);
	                }
	                BlockEndToken.prototype.id = "<block end>";
	                return BlockEndToken;
	            }(this.Token);
	            this.FlowSequenceStartToken = function(superClass) {
	                extend(FlowSequenceStartToken, superClass);
	                function FlowSequenceStartToken() {
	                    return FlowSequenceStartToken.__super__.constructor.apply(this, arguments);
	                }
	                FlowSequenceStartToken.prototype.id = "[";
	                return FlowSequenceStartToken;
	            }(this.Token);
	            this.FlowMappingStartToken = function(superClass) {
	                extend(FlowMappingStartToken, superClass);
	                function FlowMappingStartToken() {
	                    return FlowMappingStartToken.__super__.constructor.apply(this, arguments);
	                }
	                FlowMappingStartToken.prototype.id = "{";
	                return FlowMappingStartToken;
	            }(this.Token);
	            this.FlowSequenceEndToken = function(superClass) {
	                extend(FlowSequenceEndToken, superClass);
	                function FlowSequenceEndToken() {
	                    return FlowSequenceEndToken.__super__.constructor.apply(this, arguments);
	                }
	                FlowSequenceEndToken.prototype.id = "]";
	                return FlowSequenceEndToken;
	            }(this.Token);
	            this.FlowMappingEndToken = function(superClass) {
	                extend(FlowMappingEndToken, superClass);
	                function FlowMappingEndToken() {
	                    return FlowMappingEndToken.__super__.constructor.apply(this, arguments);
	                }
	                FlowMappingEndToken.prototype.id = "}";
	                return FlowMappingEndToken;
	            }(this.Token);
	            this.KeyToken = function(superClass) {
	                extend(KeyToken, superClass);
	                function KeyToken() {
	                    return KeyToken.__super__.constructor.apply(this, arguments);
	                }
	                KeyToken.prototype.id = "?";
	                return KeyToken;
	            }(this.Token);
	            this.ValueToken = function(superClass) {
	                extend(ValueToken, superClass);
	                function ValueToken() {
	                    return ValueToken.__super__.constructor.apply(this, arguments);
	                }
	                ValueToken.prototype.id = ":";
	                return ValueToken;
	            }(this.Token);
	            this.BlockEntryToken = function(superClass) {
	                extend(BlockEntryToken, superClass);
	                function BlockEntryToken() {
	                    return BlockEntryToken.__super__.constructor.apply(this, arguments);
	                }
	                BlockEntryToken.prototype.id = "-";
	                return BlockEntryToken;
	            }(this.Token);
	            this.FlowEntryToken = function(superClass) {
	                extend(FlowEntryToken, superClass);
	                function FlowEntryToken() {
	                    return FlowEntryToken.__super__.constructor.apply(this, arguments);
	                }
	                FlowEntryToken.prototype.id = ",";
	                return FlowEntryToken;
	            }(this.Token);
	            this.AliasToken = function(superClass) {
	                extend(AliasToken, superClass);
	                AliasToken.prototype.id = "<alias>";
	                function AliasToken(value, start_mark, end_mark) {
	                    this.value = value;
	                    this.start_mark = start_mark;
	                    this.end_mark = end_mark;
	                }
	                return AliasToken;
	            }(this.Token);
	            this.AnchorToken = function(superClass) {
	                extend(AnchorToken, superClass);
	                AnchorToken.prototype.id = "<anchor>";
	                function AnchorToken(value, start_mark, end_mark) {
	                    this.value = value;
	                    this.start_mark = start_mark;
	                    this.end_mark = end_mark;
	                }
	                return AnchorToken;
	            }(this.Token);
	            this.TagToken = function(superClass) {
	                extend(TagToken, superClass);
	                TagToken.prototype.id = "<tag>";
	                function TagToken(value, start_mark, end_mark) {
	                    this.value = value;
	                    this.start_mark = start_mark;
	                    this.end_mark = end_mark;
	                }
	                return TagToken;
	            }(this.Token);
	            this.ScalarToken = function(superClass) {
	                extend(ScalarToken, superClass);
	                ScalarToken.prototype.id = "<scalar>";
	                function ScalarToken(value, plain, start_mark, end_mark, style) {
	                    this.value = value;
	                    this.plain = plain;
	                    this.start_mark = start_mark;
	                    this.end_mark = end_mark;
	                    this.style = style;
	                }
	                return ScalarToken;
	            }(this.Token);
	        }).call(this);
	    });
	    register({
	        "0": [ "./scanner" ]
	    }, 0, function(global, module, exports, require, window) {
	        (function() {
	            var MarkedYAMLError, SimpleKey, tokens, util, extend = function(child, parent) {
	                for (var key in parent) {
	                    if (hasProp.call(parent, key)) child[key] = parent[key];
	                }
	                function ctor() {
	                    this.constructor = child;
	                }
	                ctor.prototype = parent.prototype;
	                child.prototype = new ctor;
	                child.__super__ = parent.prototype;
	                return child;
	            }, hasProp = {}.hasOwnProperty, slice = [].slice, indexOf = [].indexOf || function(item) {
	                for (var i = 0, l = this.length; i < l; i++) {
	                    if (i in this && this[i] === item) return i;
	                }
	                return -1;
	            };
	            MarkedYAMLError = require("./errors").MarkedYAMLError;
	            tokens = require("./tokens");
	            util = require("./util");
	            this.ScannerError = function(superClass) {
	                extend(ScannerError, superClass);
	                function ScannerError() {
	                    return ScannerError.__super__.constructor.apply(this, arguments);
	                }
	                return ScannerError;
	            }(MarkedYAMLError);
	            SimpleKey = function() {
	                function SimpleKey(token_number1, required1, index, line, column1, mark1) {
	                    this.token_number = token_number1;
	                    this.required = required1;
	                    this.index = index;
	                    this.line = line;
	                    this.column = column1;
	                    this.mark = mark1;
	                }
	                return SimpleKey;
	            }();
	            this.Scanner = function() {
	                var C_LB, C_NUMBERS, C_WS, ESCAPE_CODES, ESCAPE_REPLACEMENTS;
	                C_LB = "\r\n\u2028\u2029";
	                C_WS = "	 ";
	                C_NUMBERS = "0123456789";
	                ESCAPE_REPLACEMENTS = {
	                    "0": "\0",
	                    a: "",
	                    b: "\b",
	                    t: "	",
	                    "	": "	",
	                    n: "\n",
	                    v: "",
	                    f: "\f",
	                    r: "\r",
	                    e: "",
	                    " ": " ",
	                    '"': '"',
	                    "\\": "\\",
	                    N: "",
	                    _: " ",
	                    L: "\u2028",
	                    P: "\u2029"
	                };
	                ESCAPE_CODES = {
	                    x: 2,
	                    u: 4,
	                    U: 8
	                };
	                function Scanner() {
	                    this.done = false;
	                    this.flow_level = 0;
	                    this.tokens = [];
	                    this.fetch_stream_start();
	                    this.tokens_taken = 0;
	                    this.indent = -1;
	                    this.indents = [];
	                    this.allow_simple_key = true;
	                    this.possible_simple_keys = {};
	                }
	                Scanner.prototype.check_token = function() {
	                    var choice, choices, i, len;
	                    choices = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	                    while (this.need_more_tokens()) {
	                        this.fetch_more_tokens();
	                    }
	                    if (this.tokens.length !== 0) {
	                        if (choices.length === 0) {
	                            return true;
	                        }
	                        for (i = 0, len = choices.length; i < len; i++) {
	                            choice = choices[i];
	                            if (this.tokens[0] instanceof choice) {
	                                return true;
	                            }
	                        }
	                    }
	                    return false;
	                };
	                Scanner.prototype.peek_token = function() {
	                    while (this.need_more_tokens()) {
	                        this.fetch_more_tokens();
	                    }
	                    if (this.tokens.length !== 0) {
	                        return this.tokens[0];
	                    }
	                };
	                Scanner.prototype.get_token = function() {
	                    while (this.need_more_tokens()) {
	                        this.fetch_more_tokens();
	                    }
	                    if (this.tokens.length !== 0) {
	                        this.tokens_taken++;
	                        return this.tokens.shift();
	                    }
	                };
	                Scanner.prototype.need_more_tokens = function() {
	                    if (this.done) {
	                        return false;
	                    }
	                    if (this.tokens.length === 0) {
	                        return true;
	                    }
	                    this.stale_possible_simple_keys();
	                    if (this.next_possible_simple_key() === this.tokens_taken) {
	                        return true;
	                    }
	                    return false;
	                };
	                Scanner.prototype.fetch_more_tokens = function() {
	                    var char;
	                    this.scan_to_next_token();
	                    this.stale_possible_simple_keys();
	                    this.unwind_indent(this.column);
	                    char = this.peek();
	                    if (char === "\0") {
	                        return this.fetch_stream_end();
	                    }
	                    if (char === "%" && this.check_directive()) {
	                        return this.fetch_directive();
	                    }
	                    if (char === "-" && this.check_document_start()) {
	                        return this.fetch_document_start();
	                    }
	                    if (char === "." && this.check_document_end()) {
	                        return this.fetch_document_end();
	                    }
	                    if (char === "[") {
	                        return this.fetch_flow_sequence_start();
	                    }
	                    if (char === "{") {
	                        return this.fetch_flow_mapping_start();
	                    }
	                    if (char === "]") {
	                        return this.fetch_flow_sequence_end();
	                    }
	                    if (char === "}") {
	                        return this.fetch_flow_mapping_end();
	                    }
	                    if (char === ",") {
	                        return this.fetch_flow_entry();
	                    }
	                    if (char === "-" && this.check_block_entry()) {
	                        return this.fetch_block_entry();
	                    }
	                    if (char === "?" && this.check_key()) {
	                        return this.fetch_key();
	                    }
	                    if (char === ":" && this.check_value()) {
	                        return this.fetch_value();
	                    }
	                    if (char === "*") {
	                        return this.fetch_alias();
	                    }
	                    if (char === "&") {
	                        return this.fetch_anchor();
	                    }
	                    if (char === "!") {
	                        return this.fetch_tag();
	                    }
	                    if (char === "|" && this.flow_level === 0) {
	                        return this.fetch_literal();
	                    }
	                    if (char === ">" && this.flow_level === 0) {
	                        return this.fetch_folded();
	                    }
	                    if (char === "'") {
	                        return this.fetch_single();
	                    }
	                    if (char === '"') {
	                        return this.fetch_double();
	                    }
	                    if (this.check_plain()) {
	                        return this.fetch_plain();
	                    }
	                    throw new exports.ScannerError("while scanning for the next token", null, "found character " + char + " that cannot start any token", this.get_mark());
	                };
	                Scanner.prototype.next_possible_simple_key = function() {
	                    var key, level, min_token_number, ref;
	                    min_token_number = null;
	                    ref = this.possible_simple_keys;
	                    for (level in ref) {
	                        if (!hasProp.call(ref, level)) continue;
	                        key = ref[level];
	                        if (min_token_number === null || key.token_number < min_token_number) {
	                            min_token_number = key.token_number;
	                        }
	                    }
	                    return min_token_number;
	                };
	                Scanner.prototype.stale_possible_simple_keys = function() {
	                    var key, level, ref, results;
	                    ref = this.possible_simple_keys;
	                    results = [];
	                    for (level in ref) {
	                        if (!hasProp.call(ref, level)) continue;
	                        key = ref[level];
	                        if (key.line === this.line && this.index - key.index <= 1024) {
	                            continue;
	                        }
	                        if (!key.required) {
	                            results.push(delete this.possible_simple_keys[level]);
	                        } else {
	                            throw new exports.ScannerError("while scanning a simple key", key.mark, "could not find expected ':'", this.get_mark());
	                        }
	                    }
	                    return results;
	                };
	                Scanner.prototype.save_possible_simple_key = function() {
	                    var required, token_number;
	                    required = this.flow_level === 0 && this.indent === this.column;
	                    if (required && !this.allow_simple_key) {
	                        throw new Error("logic failure");
	                    }
	                    if (!this.allow_simple_key) {
	                        return;
	                    }
	                    this.remove_possible_simple_key();
	                    token_number = this.tokens_taken + this.tokens.length;
	                    return this.possible_simple_keys[this.flow_level] = new SimpleKey(token_number, required, this.index, this.line, this.column, this.get_mark());
	                };
	                Scanner.prototype.remove_possible_simple_key = function() {
	                    var key;
	                    if (!(key = this.possible_simple_keys[this.flow_level])) {
	                        return;
	                    }
	                    if (!key.required) {
	                        return delete this.possible_simple_keys[this.flow_level];
	                    } else {
	                        throw new exports.ScannerError("while scanning a simple key", key.mark, "could not find expected ':'", this.get_mark());
	                    }
	                };
	                Scanner.prototype.unwind_indent = function(column) {
	                    var mark, results;
	                    if (this.flow_level !== 0) {
	                        return;
	                    }
	                    results = [];
	                    while (this.indent > column) {
	                        mark = this.get_mark();
	                        this.indent = this.indents.pop();
	                        results.push(this.tokens.push(new tokens.BlockEndToken(mark, mark)));
	                    }
	                    return results;
	                };
	                Scanner.prototype.add_indent = function(column) {
	                    if (!(column > this.indent)) {
	                        return false;
	                    }
	                    this.indents.push(this.indent);
	                    this.indent = column;
	                    return true;
	                };
	                Scanner.prototype.fetch_stream_start = function() {
	                    var mark;
	                    mark = this.get_mark();
	                    return this.tokens.push(new tokens.StreamStartToken(mark, mark, this.encoding));
	                };
	                Scanner.prototype.fetch_stream_end = function() {
	                    var mark;
	                    this.unwind_indent(-1);
	                    this.remove_possible_simple_key();
	                    this.allow_possible_simple_key = false;
	                    this.possible_simple_keys = {};
	                    mark = this.get_mark();
	                    this.tokens.push(new tokens.StreamEndToken(mark, mark));
	                    return this.done = true;
	                };
	                Scanner.prototype.fetch_directive = function() {
	                    this.unwind_indent(-1);
	                    this.remove_possible_simple_key();
	                    this.allow_simple_key = false;
	                    return this.tokens.push(this.scan_directive());
	                };
	                Scanner.prototype.fetch_document_start = function() {
	                    return this.fetch_document_indicator(tokens.DocumentStartToken);
	                };
	                Scanner.prototype.fetch_document_end = function() {
	                    return this.fetch_document_indicator(tokens.DocumentEndToken);
	                };
	                Scanner.prototype.fetch_document_indicator = function(TokenClass) {
	                    var start_mark;
	                    this.unwind_indent(-1);
	                    this.remove_possible_simple_key();
	                    this.allow_simple_key = false;
	                    start_mark = this.get_mark();
	                    this.forward(3);
	                    return this.tokens.push(new TokenClass(start_mark, this.get_mark()));
	                };
	                Scanner.prototype.fetch_flow_sequence_start = function() {
	                    return this.fetch_flow_collection_start(tokens.FlowSequenceStartToken);
	                };
	                Scanner.prototype.fetch_flow_mapping_start = function() {
	                    return this.fetch_flow_collection_start(tokens.FlowMappingStartToken);
	                };
	                Scanner.prototype.fetch_flow_collection_start = function(TokenClass) {
	                    var start_mark;
	                    this.save_possible_simple_key();
	                    this.flow_level++;
	                    this.allow_simple_key = true;
	                    start_mark = this.get_mark();
	                    this.forward();
	                    return this.tokens.push(new TokenClass(start_mark, this.get_mark()));
	                };
	                Scanner.prototype.fetch_flow_sequence_end = function() {
	                    return this.fetch_flow_collection_end(tokens.FlowSequenceEndToken);
	                };
	                Scanner.prototype.fetch_flow_mapping_end = function() {
	                    return this.fetch_flow_collection_end(tokens.FlowMappingEndToken);
	                };
	                Scanner.prototype.fetch_flow_collection_end = function(TokenClass) {
	                    var start_mark;
	                    this.remove_possible_simple_key();
	                    this.flow_level--;
	                    this.allow_simple_key = false;
	                    start_mark = this.get_mark();
	                    this.forward();
	                    return this.tokens.push(new TokenClass(start_mark, this.get_mark()));
	                };
	                Scanner.prototype.fetch_flow_entry = function() {
	                    var start_mark;
	                    this.allow_simple_key = true;
	                    this.remove_possible_simple_key();
	                    start_mark = this.get_mark();
	                    this.forward();
	                    return this.tokens.push(new tokens.FlowEntryToken(start_mark, this.get_mark()));
	                };
	                Scanner.prototype.fetch_block_entry = function() {
	                    var mark, start_mark;
	                    if (this.flow_level === 0) {
	                        if (!this.allow_simple_key) {
	                            throw new exports.ScannerError(null, null, "sequence entries are not allowed here", this.get_mark());
	                        }
	                        if (this.add_indent(this.column)) {
	                            mark = this.get_mark();
	                            this.tokens.push(new tokens.BlockSequenceStartToken(mark, mark));
	                        }
	                    }
	                    this.allow_simple_key = true;
	                    this.remove_possible_simple_key();
	                    start_mark = this.get_mark();
	                    this.forward();
	                    return this.tokens.push(new tokens.BlockEntryToken(start_mark, this.get_mark()));
	                };
	                Scanner.prototype.fetch_key = function() {
	                    var mark, start_mark;
	                    if (this.flow_level === 0) {
	                        if (!this.allow_simple_key) {
	                            throw new exports.ScannerError(null, null, "mapping keys are not allowed here", this.get_mark());
	                        }
	                        if (this.add_indent(this.column)) {
	                            mark = this.get_mark();
	                            this.tokens.push(new tokens.BlockMappingStartToken(mark, mark));
	                        }
	                    }
	                    this.allow_simple_key = !this.flow_level;
	                    this.remove_possible_simple_key();
	                    start_mark = this.get_mark();
	                    this.forward();
	                    return this.tokens.push(new tokens.KeyToken(start_mark, this.get_mark()));
	                };
	                Scanner.prototype.fetch_value = function() {
	                    var key, mark, start_mark;
	                    if (key = this.possible_simple_keys[this.flow_level]) {
	                        delete this.possible_simple_keys[this.flow_level];
	                        this.tokens.splice(key.token_number - this.tokens_taken, 0, new tokens.KeyToken(key.mark, key.mark));
	                        if (this.flow_level === 0) {
	                            if (this.add_indent(key.column)) {
	                                this.tokens.splice(key.token_number - this.tokens_taken, 0, new tokens.BlockMappingStartToken(key.mark, key.mark));
	                            }
	                        }
	                        this.allow_simple_key = false;
	                    } else {
	                        if (this.flow_level === 0) {
	                            if (!this.allow_simple_key) {
	                                throw new exports.ScannerError(null, null, "mapping values are not allowed here", this.get_mark());
	                            }
	                            if (this.add_indent(this.column)) {
	                                mark = this.get_mark();
	                                this.tokens.push(new tokens.BlockMappingStartToken(mark, mark));
	                            }
	                        }
	                        this.allow_simple_key = !this.flow_level;
	                        this.remove_possible_simple_key();
	                    }
	                    start_mark = this.get_mark();
	                    this.forward();
	                    return this.tokens.push(new tokens.ValueToken(start_mark, this.get_mark()));
	                };
	                Scanner.prototype.fetch_alias = function() {
	                    this.save_possible_simple_key();
	                    this.allow_simple_key = false;
	                    return this.tokens.push(this.scan_anchor(tokens.AliasToken));
	                };
	                Scanner.prototype.fetch_anchor = function() {
	                    this.save_possible_simple_key();
	                    this.allow_simple_key = false;
	                    return this.tokens.push(this.scan_anchor(tokens.AnchorToken));
	                };
	                Scanner.prototype.fetch_tag = function() {
	                    this.save_possible_simple_key();
	                    this.allow_simple_key = false;
	                    return this.tokens.push(this.scan_tag());
	                };
	                Scanner.prototype.fetch_literal = function() {
	                    return this.fetch_block_scalar("|");
	                };
	                Scanner.prototype.fetch_folded = function() {
	                    return this.fetch_block_scalar(">");
	                };
	                Scanner.prototype.fetch_block_scalar = function(style) {
	                    this.allow_simple_key = true;
	                    this.remove_possible_simple_key();
	                    return this.tokens.push(this.scan_block_scalar(style));
	                };
	                Scanner.prototype.fetch_single = function() {
	                    return this.fetch_flow_scalar("'");
	                };
	                Scanner.prototype.fetch_double = function() {
	                    return this.fetch_flow_scalar('"');
	                };
	                Scanner.prototype.fetch_flow_scalar = function(style) {
	                    this.save_possible_simple_key();
	                    this.allow_simple_key = false;
	                    return this.tokens.push(this.scan_flow_scalar(style));
	                };
	                Scanner.prototype.fetch_plain = function() {
	                    this.save_possible_simple_key();
	                    this.allow_simple_key = false;
	                    return this.tokens.push(this.scan_plain());
	                };
	                Scanner.prototype.check_directive = function() {
	                    if (this.column === 0) {
	                        return true;
	                    }
	                    return false;
	                };
	                Scanner.prototype.check_document_start = function() {
	                    var ref;
	                    if (this.column === 0 && this.prefix(3) === "---" && (ref = this.peek(3), indexOf.call(C_LB + C_WS + "\0", ref) >= 0)) {
	                        return true;
	                    }
	                    return false;
	                };
	                Scanner.prototype.check_document_end = function() {
	                    var ref;
	                    if (this.column === 0 && this.prefix(3) === "..." && (ref = this.peek(3), indexOf.call(C_LB + C_WS + "\0", ref) >= 0)) {
	                        return true;
	                    }
	                    return false;
	                };
	                Scanner.prototype.check_block_entry = function() {
	                    var ref;
	                    return ref = this.peek(1), indexOf.call(C_LB + C_WS + "\0", ref) >= 0;
	                };
	                Scanner.prototype.check_key = function() {
	                    var ref;
	                    if (this.flow_level !== 0) {
	                        return true;
	                    }
	                    return ref = this.peek(1), indexOf.call(C_LB + C_WS + "\0", ref) >= 0;
	                };
	                Scanner.prototype.check_value = function() {
	                    var ref;
	                    if (this.flow_level !== 0) {
	                        return true;
	                    }
	                    return ref = this.peek(1), indexOf.call(C_LB + C_WS + "\0", ref) >= 0;
	                };
	                Scanner.prototype.check_plain = function() {
	                    var char, ref;
	                    char = this.peek();
	                    return indexOf.call(C_LB + C_WS + "\0-?:,[]{}#&*!|>'\"%@`", char) < 0 || (ref = this.peek(1), indexOf.call(C_LB + C_WS + "\0", ref) < 0) && (char === "-" || this.flow_level === 0 && indexOf.call("?:", char) >= 0);
	                };
	                Scanner.prototype.scan_to_next_token = function() {
	                    var found, ref, results;
	                    if (this.index === 0 && this.peek() === "﻿") {
	                        this.forward();
	                    }
	                    found = false;
	                    results = [];
	                    while (!found) {
	                        while (this.peek() === " ") {
	                            this.forward();
	                        }
	                        if (this.peek() === "#") {
	                            while (ref = this.peek(), indexOf.call(C_LB + "\0", ref) < 0) {
	                                this.forward();
	                            }
	                        }
	                        if (this.scan_line_break()) {
	                            if (this.flow_level === 0) {
	                                results.push(this.allow_simple_key = true);
	                            } else {
	                                results.push(void 0);
	                            }
	                        } else {
	                            results.push(found = true);
	                        }
	                    }
	                    return results;
	                };
	                Scanner.prototype.scan_directive = function() {
	                    var end_mark, name, ref, start_mark, value;
	                    start_mark = this.get_mark();
	                    this.forward();
	                    name = this.scan_directive_name(start_mark);
	                    value = null;
	                    if (name === "YAML") {
	                        value = this.scan_yaml_directive_value(start_mark);
	                        end_mark = this.get_mark();
	                    } else if (name === "TAG") {
	                        value = this.scan_tag_directive_value(start_mark);
	                        end_mark = this.get_mark();
	                    } else {
	                        end_mark = this.get_mark();
	                        while (ref = this.peek(), indexOf.call(C_LB + "\0", ref) < 0) {
	                            this.forward();
	                        }
	                    }
	                    this.scan_directive_ignored_line(start_mark);
	                    return new tokens.DirectiveToken(name, value, start_mark, end_mark);
	                };
	                Scanner.prototype.scan_directive_name = function(start_mark) {
	                    var char, length, value;
	                    length = 0;
	                    char = this.peek(length);
	                    while ("0" <= char && char <= "9" || "A" <= char && char <= "Z" || "a" <= char && char <= "z" || indexOf.call("-_", char) >= 0) {
	                        length++;
	                        char = peek(length);
	                    }
	                    throw new exports.ScannerError("while scanning a directive", start_mark, "expected alphanumeric or numeric character but found " + char, length === 0 ? this.get_mark() : void 0);
	                    value = this.prefix(length);
	                    this.forward(length);
	                    char = this.peek();
	                    throw new exports.ScannerError("while scanning a directive", start_mark, "expected alphanumeric or numeric character but found " + char, indexOf.call(C_LB + "\0 ", char) < 0 ? this.get_mark() : void 0);
	                    return value;
	                };
	                Scanner.prototype.scan_yaml_directive_value = function(start_mark) {
	                    var major, minor, ref;
	                    while (this.peek() === " ") {
	                        this.forward();
	                    }
	                    major = this.scan_yaml_directive_number(start_mark);
	                    throw new exports.ScannerError("while scanning a directive", start_mark, "expected a digit or '.' but found " + this.peek(), this.peek() !== "." ? this.get_mark() : void 0);
	                    this.forward();
	                    minor = this.scan_yaml_directive_number(start_mark);
	                    throw new exports.ScannerError("while scanning a directive", start_mark, "expected a digit or ' ' but found " + this.peek(), (ref = this.peek(), indexOf.call(C_LB + "\0 ", ref) < 0) ? this.get_mark() : void 0);
	                    return [ major, minor ];
	                };
	                Scanner.prototype.scan_yaml_directive_number = function(start_mark) {
	                    var char, length, ref, value;
	                    char = this.peek();
	                    throw new exports.ScannerError("while scanning a directive", start_mark, "expected a digit but found " + char, !("0" <= char && char <= "9") ? this.get_mark() : void 0);
	                    length = 0;
	                    while ("0" <= (ref = this.peek(length)) && ref <= "9") {
	                        length++;
	                    }
	                    value = parseInt(this.prefix(length));
	                    this.forward(length);
	                    return value;
	                };
	                Scanner.prototype.scan_tag_directive_value = function(start_mark) {
	                    var handle, prefix;
	                    while (this.peek() === " ") {
	                        this.forward();
	                    }
	                    handle = this.scan_tag_directive_handle(start_mark);
	                    while (this.peek() === " ") {
	                        this.forward();
	                    }
	                    prefix = this.scan_tag_directive_prefix(start_mark);
	                    return [ handle, prefix ];
	                };
	                Scanner.prototype.scan_tag_directive_handle = function(start_mark) {
	                    var char, value;
	                    value = this.scan_tag_handle("directive", start_mark);
	                    char = this.peek();
	                    throw new exports.ScannerError("while scanning a directive", start_mark, "expected ' ' but found " + char, char !== " " ? this.get_mark() : void 0);
	                    return value;
	                };
	                Scanner.prototype.scan_tag_directive_prefix = function(start_mark) {
	                    var char, value;
	                    value = this.scan_tag_uri("directive", start_mark);
	                    char = this.peek();
	                    throw new exports.ScannerError("while scanning a directive", start_mark, "expected ' ' but found " + char, indexOf.call(C_LB + "\0 ", char) < 0 ? this.get_mark() : void 0);
	                    return value;
	                };
	                Scanner.prototype.scan_directive_ignored_line = function(start_mark) {
	                    var char, ref;
	                    while (this.peek() === " ") {
	                        this.forward();
	                    }
	                    if (this.peek() === "#") {
	                        while (ref = this.peek(), indexOf.call(C_LB + "\0", ref) < 0) {
	                            this.forward();
	                        }
	                    }
	                    char = this.peek();
	                    throw new exports.ScannerError("while scanning a directive", start_mark, "expected a comment or a line break but found " + char, indexOf.call(C_LB + "\0", char) < 0 ? this.get_mark() : void 0);
	                    return this.scan_line_break();
	                };
	                Scanner.prototype.scan_anchor = function(TokenClass) {
	                    var char, indicator, length, name, start_mark, value;
	                    start_mark = this.get_mark();
	                    indicator = this.peek();
	                    if (indicator === "*") {
	                        name = "alias";
	                    } else {
	                        name = "anchor";
	                    }
	                    this.forward();
	                    length = 0;
	                    char = this.peek(length);
	                    while ("0" <= char && char <= "9" || "A" <= char && char <= "Z" || "a" <= char && char <= "z" || indexOf.call("-_", char) >= 0) {
	                        length++;
	                        char = this.peek(length);
	                    }
	                    if (length === 0) {
	                        throw new exports.ScannerError("while scanning an " + name, start_mark, "expected alphabetic or numeric character but found '" + char + "'", this.get_mark());
	                    }
	                    value = this.prefix(length);
	                    this.forward(length);
	                    char = this.peek();
	                    if (indexOf.call(C_LB + C_WS + "\0" + "?:,]}%@`", char) < 0) {
	                        throw new exports.ScannerError("while scanning an " + name, start_mark, "expected alphabetic or numeric character but found '" + char + "'", this.get_mark());
	                    }
	                    return new TokenClass(value, start_mark, this.get_mark());
	                };
	                Scanner.prototype.scan_tag = function() {
	                    var char, handle, length, start_mark, suffix, use_handle;
	                    start_mark = this.get_mark();
	                    char = this.peek(1);
	                    if (char === "<") {
	                        handle = null;
	                        this.forward(2);
	                        suffix = this.scan_tag_uri("tag", start_mark);
	                        if (this.peek() !== ">") {
	                            throw new exports.ScannerError("while parsing a tag", start_mark, "expected '>' but found " + this.peek(), this.get_mark());
	                        }
	                        this.forward();
	                    } else if (indexOf.call(C_LB + C_WS + "\0", char) >= 0) {
	                        handle = null;
	                        suffix = "!";
	                        this.forward();
	                    } else {
	                        length = 1;
	                        use_handle = false;
	                        while (indexOf.call(C_LB + "\0 ", char) < 0) {
	                            if (char === "!") {
	                                use_handle = true;
	                                break;
	                            }
	                            length++;
	                            char = this.peek(length);
	                        }
	                        if (use_handle) {
	                            handle = this.scan_tag_handle("tag", start_mark);
	                        } else {
	                            handle = "!";
	                            this.forward();
	                        }
	                        suffix = this.scan_tag_uri("tag", start_mark);
	                    }
	                    char = this.peek();
	                    if (indexOf.call(C_LB + "\0 ", char) < 0) {
	                        throw new exports.ScannerError("while scanning a tag", start_mark, "expected ' ' but found " + char, this.get_mark());
	                    }
	                    return new tokens.TagToken([ handle, suffix ], start_mark, this.get_mark());
	                };
	                Scanner.prototype.scan_block_scalar = function(style) {
	                    var breaks, chomping, chunks, end_mark, folded, increment, indent, leading_non_space, length, line_break, max_indent, min_indent, ref, ref1, ref2, ref3, ref4, ref5, ref6, start_mark;
	                    folded = style === ">";
	                    chunks = [];
	                    start_mark = this.get_mark();
	                    this.forward();
	                    ref = this.scan_block_scalar_indicators(start_mark), chomping = ref[0], increment = ref[1];
	                    this.scan_block_scalar_ignored_line(start_mark);
	                    min_indent = this.indent + 1;
	                    if (min_indent < 1) {
	                        min_indent = 1;
	                    }
	                    if (increment == null) {
	                        ref1 = this.scan_block_scalar_indentation(), breaks = ref1[0], max_indent = ref1[1], end_mark = ref1[2];
	                        indent = Math.max(min_indent, max_indent);
	                    } else {
	                        indent = min_indent + increment - 1;
	                        ref2 = this.scan_block_scalar_breaks(indent), breaks = ref2[0], end_mark = ref2[1];
	                    }
	                    line_break = "";
	                    while (this.column === indent && this.peek() !== "\0") {
	                        chunks = chunks.concat(breaks);
	                        leading_non_space = (ref3 = this.peek(), indexOf.call(" 	", ref3) < 0);
	                        length = 0;
	                        while (ref4 = this.peek(length), indexOf.call(C_LB + "\0", ref4) < 0) {
	                            length++;
	                        }
	                        chunks.push(this.prefix(length));
	                        this.forward(length);
	                        line_break = this.scan_line_break();
	                        ref5 = this.scan_block_scalar_breaks(indent), breaks = ref5[0], end_mark = ref5[1];
	                        if (this.column === indent && this.peek() !== "\0") {
	                            if (folded && line_break === "\n" && leading_non_space && (ref6 = this.peek(), indexOf.call(" 	", ref6) < 0)) {
	                                if (util.is_empty(breaks)) {
	                                    chunks.push(" ");
	                                }
	                            } else {
	                                chunks.push(line_break);
	                            }
	                        } else {
	                            break;
	                        }
	                    }
	                    if (chomping !== false) {
	                        chunks.push(line_break);
	                    }
	                    if (chomping === true) {
	                        chunks = chunks.concat(breaks);
	                    }
	                    return new tokens.ScalarToken(chunks.join(""), false, start_mark, end_mark, style);
	                };
	                Scanner.prototype.scan_block_scalar_indicators = function(start_mark) {
	                    var char, chomping, increment;
	                    chomping = null;
	                    increment = null;
	                    char = this.peek();
	                    if (indexOf.call("+-", char) >= 0) {
	                        chomping = char === "+";
	                        this.forward();
	                        char = this.peek();
	                        if (indexOf.call(C_NUMBERS, char) >= 0) {
	                            increment = parseInt(char);
	                            if (increment === 0) {
	                                throw new exports.ScannerError("while scanning a block scalar", start_mark, "expected indentation indicator in the range 1-9 but found 0", this.get_mark());
	                            }
	                            this.forward();
	                        }
	                    } else if (indexOf.call(C_NUMBERS, char) >= 0) {
	                        increment = parseInt(char);
	                        if (increment === 0) {
	                            throw new exports.ScannerError("while scanning a block scalar", start_mark, "expected indentation indicator in the range 1-9 but found 0", this.get_mark());
	                        }
	                        this.forward();
	                        char = this.peek();
	                        if (indexOf.call("+-", char) >= 0) {
	                            chomping = char === "+";
	                            this.forward();
	                        }
	                    }
	                    char = this.peek();
	                    if (indexOf.call(C_LB + "\0 ", char) < 0) {
	                        throw new exports.ScannerError("while scanning a block scalar", start_mark, "expected chomping or indentation indicators, but found " + char, this.get_mark());
	                    }
	                    return [ chomping, increment ];
	                };
	                Scanner.prototype.scan_block_scalar_ignored_line = function(start_mark) {
	                    var char, ref;
	                    while (this.peek() === " ") {
	                        this.forward();
	                    }
	                    if (this.peek() === "#") {
	                        while (ref = this.peek(), indexOf.call(C_LB + "\0", ref) < 0) {
	                            this.forward();
	                        }
	                    }
	                    char = this.peek();
	                    if (indexOf.call(C_LB + "\0", char) < 0) {
	                        throw new exports.ScannerError("while scanning a block scalar", start_mark, "expected a comment or a line break but found " + char, this.get_mark());
	                    }
	                    return this.scan_line_break();
	                };
	                Scanner.prototype.scan_block_scalar_indentation = function() {
	                    var chunks, end_mark, max_indent, ref;
	                    chunks = [];
	                    max_indent = 0;
	                    end_mark = this.get_mark();
	                    while (ref = this.peek(), indexOf.call(C_LB + " ", ref) >= 0) {
	                        if (this.peek() !== " ") {
	                            chunks.push(this.scan_line_break());
	                            end_mark = this.get_mark();
	                        } else {
	                            this.forward();
	                            if (this.column > max_indent) {
	                                max_indent = this.column;
	                            }
	                        }
	                    }
	                    return [ chunks, max_indent, end_mark ];
	                };
	                Scanner.prototype.scan_block_scalar_breaks = function(indent) {
	                    var chunks, end_mark, ref;
	                    chunks = [];
	                    end_mark = this.get_mark();
	                    while (this.column < indent && this.peek() === " ") {
	                        this.forward();
	                    }
	                    while (ref = this.peek(), indexOf.call(C_LB, ref) >= 0) {
	                        chunks.push(this.scan_line_break());
	                        end_mark = this.get_mark();
	                        while (this.column < indent && this.peek() === " ") {
	                            this.forward();
	                        }
	                    }
	                    return [ chunks, end_mark ];
	                };
	                Scanner.prototype.scan_flow_scalar = function(style) {
	                    var chunks, double, quote, start_mark;
	                    double = style === '"';
	                    chunks = [];
	                    start_mark = this.get_mark();
	                    quote = this.peek();
	                    this.forward();
	                    chunks = chunks.concat(this.scan_flow_scalar_non_spaces(double, start_mark));
	                    while (this.peek() !== quote) {
	                        chunks = chunks.concat(this.scan_flow_scalar_spaces(double, start_mark));
	                        chunks = chunks.concat(this.scan_flow_scalar_non_spaces(double, start_mark));
	                    }
	                    this.forward();
	                    return new tokens.ScalarToken(chunks.join(""), false, start_mark, this.get_mark(), style);
	                };
	                Scanner.prototype.scan_flow_scalar_non_spaces = function(double, start_mark) {
	                    var char, chunks, code, i, k, length, ref, ref1, ref2;
	                    chunks = [];
	                    while (true) {
	                        length = 0;
	                        while (ref = this.peek(length), indexOf.call(C_LB + C_WS + "'\"\\\0", ref) < 0) {
	                            length++;
	                        }
	                        if (length !== 0) {
	                            chunks.push(this.prefix(length));
	                            this.forward(length);
	                        }
	                        char = this.peek();
	                        if (!double && char === "'" && this.peek(1) === "'") {
	                            chunks.push("'");
	                            this.forward(2);
	                        } else if (double && char === "'" || !double && indexOf.call('"\\', char) >= 0) {
	                            chunks.push(char);
	                            this.forward();
	                        } else if (double && char === "\\") {
	                            this.forward();
	                            char = this.peek();
	                            if (char in ESCAPE_REPLACEMENTS) {
	                                chunks.push(ESCAPE_REPLACEMENTS[char]);
	                                this.forward();
	                            } else if (char in ESCAPE_CODES) {
	                                length = ESCAPE_CODES[char];
	                                this.forward();
	                                for (k = i = 0, ref1 = length; 0 <= ref1 ? i < ref1 : i > ref1; k = 0 <= ref1 ? ++i : --i) {
	                                    if (ref2 = this.peek(k), indexOf.call(C_NUMBERS + "ABCDEFabcdef", ref2) < 0) {
	                                        throw new exports.ScannerError("while scanning a double-quoted scalar", start_mark, "expected escape sequence of " + length + " hexadecimal numbers, but found " + this.peek(k), this.get_mark());
	                                    }
	                                }
	                                code = parseInt(this.prefix(length), 16);
	                                chunks.push(String.fromCharCode(code));
	                                this.forward(length);
	                            } else if (indexOf.call(C_LB, char) >= 0) {
	                                this.scan_line_break();
	                                chunks = chunks.concat(this.scan_flow_scalar_breaks(double, start_mark));
	                            } else {
	                                throw new exports.ScannerError("while scanning a double-quoted scalar", start_mark, "found unknown escape character " + char, this.get_mark());
	                            }
	                        } else {
	                            return chunks;
	                        }
	                    }
	                };
	                Scanner.prototype.scan_flow_scalar_spaces = function(double, start_mark) {
	                    var breaks, char, chunks, length, line_break, ref, whitespaces;
	                    chunks = [];
	                    length = 0;
	                    while (ref = this.peek(length), indexOf.call(C_WS, ref) >= 0) {
	                        length++;
	                    }
	                    whitespaces = this.prefix(length);
	                    this.forward(length);
	                    char = this.peek();
	                    if (char === "\0") {
	                        throw new exports.ScannerError("while scanning a quoted scalar", start_mark, "found unexpected end of stream", this.get_mark());
	                    }
	                    if (indexOf.call(C_LB, char) >= 0) {
	                        line_break = this.scan_line_break();
	                        breaks = this.scan_flow_scalar_breaks(double, start_mark);
	                        if (line_break !== "\n") {
	                            chunks.push(line_break);
	                        } else if (breaks.length === 0) {
	                            chunks.push(" ");
	                        }
	                        chunks = chunks.concat(breaks);
	                    } else {
	                        chunks.push(whitespaces);
	                    }
	                    return chunks;
	                };
	                Scanner.prototype.scan_flow_scalar_breaks = function(double, start_mark) {
	                    var chunks, prefix, ref, ref1, ref2;
	                    chunks = [];
	                    while (true) {
	                        prefix = this.prefix(3);
	                        if (prefix === "---" || prefix === "..." && (ref = this.peek(3), indexOf.call(C_LB + C_WS + "\0", ref) >= 0)) {
	                            throw new exports.ScannerError("while scanning a quoted scalar", start_mark, "found unexpected document separator", this.get_mark());
	                        }
	                        while (ref1 = this.peek(), indexOf.call(C_WS, ref1) >= 0) {
	                            this.forward();
	                        }
	                        if (ref2 = this.peek(), indexOf.call(C_LB, ref2) >= 0) {
	                            chunks.push(this.scan_line_break());
	                        } else {
	                            return chunks;
	                        }
	                    }
	                };
	                Scanner.prototype.scan_plain = function() {
	                    var char, chunks, end_mark, indent, length, ref, ref1, spaces, start_mark;
	                    chunks = [];
	                    start_mark = end_mark = this.get_mark();
	                    indent = this.indent + 1;
	                    spaces = [];
	                    while (true) {
	                        length = 0;
	                        if (this.peek() === "#") {
	                            break;
	                        }
	                        while (true) {
	                            char = this.peek(length);
	                            if (indexOf.call(C_LB + C_WS + "\0", char) >= 0 || this.flow_level === 0 && char === ":" && (ref = this.peek(length + 1), indexOf.call(C_LB + C_WS + "\0", ref) >= 0) || this.flow_level !== 0 && indexOf.call(",:?[]{}", char) >= 0) {
	                                break;
	                            }
	                            length++;
	                        }
	                        if (this.flow_level !== 0 && char === ":" && (ref1 = this.peek(length + 1), indexOf.call(C_LB + C_WS + "\0,[]{}", ref1) < 0)) {
	                            this.forward(length);
	                            throw new exports.ScannerError("while scanning a plain scalar", start_mark, "found unexpected ':'", this.get_mark(), "Please check http://pyyaml.org/wiki/YAMLColonInFlowContext");
	                        }
	                        if (length === 0) {
	                            break;
	                        }
	                        this.allow_simple_key = false;
	                        chunks = chunks.concat(spaces);
	                        chunks.push(this.prefix(length));
	                        this.forward(length);
	                        end_mark = this.get_mark();
	                        spaces = this.scan_plain_spaces(indent, start_mark);
	                        if (spaces == null || spaces.length === 0 || this.peek() === "#" || this.flow_level === 0 && this.column < indent) {
	                            break;
	                        }
	                    }
	                    return new tokens.ScalarToken(chunks.join(""), true, start_mark, end_mark);
	                };
	                Scanner.prototype.scan_plain_spaces = function(indent, start_mark) {
	                    var breaks, char, chunks, length, line_break, prefix, ref, ref1, ref2, ref3, whitespaces;
	                    chunks = [];
	                    length = 0;
	                    while (ref = this.peek(length), indexOf.call(" ", ref) >= 0) {
	                        length++;
	                    }
	                    whitespaces = this.prefix(length);
	                    this.forward(length);
	                    char = this.peek();
	                    if (indexOf.call(C_LB, char) >= 0) {
	                        line_break = this.scan_line_break();
	                        this.allow_simple_key = true;
	                        prefix = this.prefix(3);
	                        if (prefix === "---" || prefix === "..." && (ref1 = this.peek(3), indexOf.call(C_LB + C_WS + "\0", ref1) >= 0)) {
	                            return;
	                        }
	                        breaks = [];
	                        while (ref3 = this.peek(), indexOf.call(C_LB + " ", ref3) >= 0) {
	                            if (this.peek() === " ") {
	                                this.forward();
	                            } else {
	                                breaks.push(this.scan_line_break());
	                                prefix = this.prefix(3);
	                                if (prefix === "---" || prefix === "..." && (ref2 = this.peek(3), indexOf.call(C_LB + C_WS + "\0", ref2) >= 0)) {
	                                    return;
	                                }
	                            }
	                        }
	                        if (line_break !== "\n") {
	                            chunks.push(line_break);
	                        } else if (breaks.length === 0) {
	                            chunks.push(" ");
	                        }
	                        chunks = chunks.concat(breaks);
	                    } else if (whitespaces) {
	                        chunks.push(whitespaces);
	                    }
	                    return chunks;
	                };
	                Scanner.prototype.scan_tag_handle = function(name, start_mark) {
	                    var char, length, value;
	                    char = this.peek();
	                    if (char !== "!") {
	                        throw new exports.ScannerError("while scanning a " + name, start_mark, "expected '!' but found " + char, this.get_mark());
	                    }
	                    length = 1;
	                    char = this.peek(length);
	                    if (char !== " ") {
	                        while ("0" <= char && char <= "9" || "A" <= char && char <= "Z" || "a" <= char && char <= "z" || indexOf.call("-_", char) >= 0) {
	                            length++;
	                            char = this.peek(length);
	                        }
	                        if (char !== "!") {
	                            this.forward(length);
	                            throw new exports.ScannerError("while scanning a " + name, start_mark, "expected '!' but found " + char, this.get_mark());
	                        }
	                        length++;
	                    }
	                    value = this.prefix(length);
	                    this.forward(length);
	                    return value;
	                };
	                Scanner.prototype.scan_tag_uri = function(name, start_mark) {
	                    var char, chunks, length;
	                    chunks = [];
	                    length = 0;
	                    char = this.peek(length);
	                    while ("0" <= char && char <= "9" || "A" <= char && char <= "Z" || "a" <= char && char <= "z" || indexOf.call("-;/?:@&=+$,_.!~*'()[]%", char) >= 0) {
	                        if (char === "%") {
	                            chunks.push(this.prefix(length));
	                            this.forward(length);
	                            length = 0;
	                            chunks.push(this.scan_uri_escapes(name, start_mark));
	                        } else {
	                            length++;
	                        }
	                        char = this.peek(length);
	                    }
	                    if (length !== 0) {
	                        chunks.push(this.prefix(length));
	                        this.forward(length);
	                        length = 0;
	                    }
	                    if (chunks.length === 0) {
	                        throw new exports.ScannerError("while parsing a " + name, start_mark, "expected URI but found " + char, this.get_mark());
	                    }
	                    return chunks.join("");
	                };
	                Scanner.prototype.scan_uri_escapes = function(name, start_mark) {
	                    var bytes, i, k, mark;
	                    bytes = [];
	                    mark = this.get_mark();
	                    while (this.peek() === "%") {
	                        this.forward();
	                        for (k = i = 0; i <= 2; k = ++i) {
	                            throw new exports.ScannerError("while scanning a " + name, start_mark, "expected URI escape sequence of 2 hexadecimal numbers but found " + this.peek(k), this.get_mark());
	                        }
	                        bytes.push(String.fromCharCode(parseInt(this.prefix(2), 16)));
	                        this.forward(2);
	                    }
	                    return bytes.join("");
	                };
	                Scanner.prototype.scan_line_break = function() {
	                    var char;
	                    char = this.peek();
	                    if (indexOf.call("\r\n", char) >= 0) {
	                        if (this.prefix(2) === "\r\n") {
	                            this.forward(2);
	                        } else {
	                            this.forward();
	                        }
	                        return "\n";
	                    } else if (indexOf.call("\u2028\u2029", char) >= 0) {
	                        this.forward();
	                        return char;
	                    }
	                    return "";
	                };
	                return Scanner;
	            }();
	        }).call(this);
	    });
	    register({
	        "0": [ "./parser" ]
	    }, 0, function(global, module, exports, require, window) {
	        (function() {
	            var MarkedYAMLError, events, tokens, extend = function(child, parent) {
	                for (var key in parent) {
	                    if (hasProp.call(parent, key)) child[key] = parent[key];
	                }
	                function ctor() {
	                    this.constructor = child;
	                }
	                ctor.prototype = parent.prototype;
	                child.prototype = new ctor;
	                child.__super__ = parent.prototype;
	                return child;
	            }, hasProp = {}.hasOwnProperty, slice = [].slice;
	            events = require("./events");
	            MarkedYAMLError = require("./errors").MarkedYAMLError;
	            tokens = require("./tokens");
	            this.ParserError = function(superClass) {
	                extend(ParserError, superClass);
	                function ParserError() {
	                    return ParserError.__super__.constructor.apply(this, arguments);
	                }
	                return ParserError;
	            }(MarkedYAMLError);
	            this.Parser = function() {
	                var DEFAULT_TAGS;
	                DEFAULT_TAGS = {
	                    "!": "!",
	                    "!!": "tag:yaml.org,2002:"
	                };
	                function Parser() {
	                    this.current_event = null;
	                    this.yaml_version = null;
	                    this.tag_handles = {};
	                    this.states = [];
	                    this.marks = [];
	                    this.state = "parse_stream_start";
	                }
	                Parser.prototype.dispose = function() {
	                    this.states = [];
	                    return this.state = null;
	                };
	                Parser.prototype.check_event = function() {
	                    var choice, choices, i, len;
	                    choices = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	                    if (this.current_event === null) {
	                        if (this.state != null) {
	                            this.current_event = this[this.state]();
	                        }
	                    }
	                    if (this.current_event !== null) {
	                        if (choices.length === 0) {
	                            return true;
	                        }
	                        for (i = 0, len = choices.length; i < len; i++) {
	                            choice = choices[i];
	                            if (this.current_event instanceof choice) {
	                                return true;
	                            }
	                        }
	                    }
	                    return false;
	                };
	                Parser.prototype.peek_event = function() {
	                    if (this.current_event === null && this.state != null) {
	                        this.current_event = this[this.state]();
	                    }
	                    return this.current_event;
	                };
	                Parser.prototype.get_event = function() {
	                    var event;
	                    if (this.current_event === null && this.state != null) {
	                        this.current_event = this[this.state]();
	                    }
	                    event = this.current_event;
	                    this.current_event = null;
	                    return event;
	                };
	                Parser.prototype.parse_stream_start = function() {
	                    var event, token;
	                    token = this.get_token();
	                    event = new events.StreamStartEvent(token.start_mark, token.end_mark);
	                    this.state = "parse_implicit_document_start";
	                    return event;
	                };
	                Parser.prototype.parse_implicit_document_start = function() {
	                    var end_mark, event, start_mark, token;
	                    if (!this.check_token(tokens.DirectiveToken, tokens.DocumentStartToken, tokens.StreamEndToken)) {
	                        this.tag_handles = DEFAULT_TAGS;
	                        token = this.peek_token();
	                        start_mark = end_mark = token.start_mark;
	                        event = new events.DocumentStartEvent(start_mark, end_mark, false);
	                        this.states.push("parse_document_end");
	                        this.state = "parse_block_node";
	                        return event;
	                    } else {
	                        return this.parse_document_start();
	                    }
	                };
	                Parser.prototype.parse_document_start = function() {
	                    var end_mark, event, ref, start_mark, tags, token, version;
	                    while (this.check_token(tokens.DocumentEndToken)) {
	                        this.get_token();
	                    }
	                    if (!this.check_token(tokens.StreamEndToken)) {
	                        start_mark = this.peek_token().start_mark;
	                        ref = this.process_directives(), version = ref[0], tags = ref[1];
	                        if (!this.check_token(tokens.DocumentStartToken)) {
	                            throw new exports.ParserError("expected '<document start>', but found " + this.peek_token().id, this.peek_token().start_mark);
	                        }
	                        token = this.get_token();
	                        end_mark = token.end_mark;
	                        event = new events.DocumentStartEvent(start_mark, end_mark, true, version, tags);
	                        this.states.push("parse_document_end");
	                        this.state = "parse_document_content";
	                    } else {
	                        token = this.get_token();
	                        event = new events.StreamEndEvent(token.start_mark, token.end_mark);
	                        if (this.states.length !== 0) {
	                            throw new Error("assertion error, states should be empty");
	                        }
	                        if (this.marks.length !== 0) {
	                            throw new Error("assertion error, marks should be empty");
	                        }
	                        this.state = null;
	                    }
	                    return event;
	                };
	                Parser.prototype.parse_document_end = function() {
	                    var end_mark, event, explicit, start_mark, token;
	                    token = this.peek_token();
	                    start_mark = end_mark = token.start_mark;
	                    explicit = false;
	                    if (this.check_token(tokens.DocumentEndToken)) {
	                        token = this.get_token();
	                        end_mark = token.end_mark;
	                        explicit = true;
	                    }
	                    event = new events.DocumentEndEvent(start_mark, end_mark, explicit);
	                    this.state = "parse_document_start";
	                    return event;
	                };
	                Parser.prototype.parse_document_content = function() {
	                    var event;
	                    if (this.check_token(tokens.DirectiveToken, tokens.DocumentStartToken, tokens.DocumentEndToken, tokens.StreamEndToken)) {
	                        event = this.process_empty_scalar(this.peek_token().start_mark);
	                        this.state = this.states.pop();
	                        return event;
	                    } else {
	                        return this.parse_block_node();
	                    }
	                };
	                Parser.prototype.process_directives = function() {
	                    var handle, major, minor, prefix, ref, ref1, ref2, tag_handles_copy, token, value;
	                    this.yaml_version = null;
	                    this.tag_handles = {};
	                    while (this.check_token(tokens.DirectiveToken)) {
	                        token = this.get_token();
	                        if (token.name === "YAML") {
	                            if (this.yaml_version !== null) {
	                                throw new exports.ParserError(null, null, "found duplicate YAML directive", token.start_mark);
	                            }
	                            ref = token.value, major = ref[0], minor = ref[1];
	                            if (major !== 1) {
	                                throw new exports.ParserError(null, null, "found incompatible YAML document (version 1.* is required)", token.start_mark);
	                            }
	                            this.yaml_version = token.value;
	                        } else if (token.name === "TAG") {
	                            ref1 = this.tag_handles, handle = ref1[0], prefix = ref1[1];
	                            if (handle in this.tag_handles) {
	                                throw new exports.ParserError(null, null, "duplicate tag handle " + handle, token.start_mark);
	                            }
	                            this.tag_handles[handle] = prefix;
	                        }
	                    }
	                    tag_handles_copy = null;
	                    ref2 = this.tag_handles;
	                    for (handle in ref2) {
	                        if (!hasProp.call(ref2, handle)) continue;
	                        prefix = ref2[handle];
	                        if (tag_handles_copy == null) {
	                            tag_handles_copy = {};
	                        }
	                        tag_handles_copy[handle] = prefix;
	                    }
	                    value = [ this.yaml_version, tag_handles_copy ];
	                    for (handle in DEFAULT_TAGS) {
	                        if (!hasProp.call(DEFAULT_TAGS, handle)) continue;
	                        prefix = DEFAULT_TAGS[handle];
	                        if (!(prefix in this.tag_handles)) {
	                            this.tag_handles[handle] = prefix;
	                        }
	                    }
	                    return value;
	                };
	                Parser.prototype.parse_block_node = function() {
	                    return this.parse_node(true);
	                };
	                Parser.prototype.parse_flow_node = function() {
	                    return this.parse_node();
	                };
	                Parser.prototype.parse_block_node_or_indentless_sequence = function() {
	                    return this.parse_node(true, true);
	                };
	                Parser.prototype.parse_node = function(block, indentless_sequence) {
	                    var anchor, end_mark, event, handle, implicit, node, start_mark, suffix, tag, tag_mark, token;
	                    if (block == null) {
	                        block = false;
	                    }
	                    if (indentless_sequence == null) {
	                        indentless_sequence = false;
	                    }
	                    if (this.check_token(tokens.AliasToken)) {
	                        token = this.get_token();
	                        event = new events.AliasEvent(token.value, token.start_mark, token.end_mark);
	                        this.state = this.states.pop();
	                    } else {
	                        anchor = null;
	                        tag = null;
	                        start_mark = end_mark = tag_mark = null;
	                        if (this.check_token(tokens.AnchorToken)) {
	                            token = this.get_token();
	                            start_mark = token.start_mark;
	                            end_mark = token.end_mark;
	                            anchor = token.value;
	                            if (this.check_token(tokens.TagToken)) {
	                                token = this.get_token();
	                                tag_mark = token.start_mark;
	                                end_mark = token.end_mark;
	                                tag = token.value;
	                            }
	                        } else if (this.check_token(tokens.TagToken)) {
	                            token = this.get_token();
	                            start_mark = tag_mark = token.start_mark;
	                            end_mark = token.end_mark;
	                            tag = token.value;
	                            if (this.check_token(tokens.AnchorToken)) {
	                                token = this.get_token();
	                                end_mark = token.end_mark;
	                                anchor = token.value;
	                            }
	                        }
	                        if (tag !== null) {
	                            handle = tag[0], suffix = tag[1];
	                            if (handle !== null) {
	                                if (!(handle in this.tag_handles)) {
	                                    throw new exports.ParserError("while parsing a node", start_mark, "found undefined tag handle " + handle, tag_mark);
	                                }
	                                tag = this.tag_handles[handle] + suffix;
	                            } else {
	                                tag = suffix;
	                            }
	                        }
	                        if (start_mark === null) {
	                            start_mark = end_mark = this.peek_token().start_mark;
	                        }
	                        event = null;
	                        implicit = tag === null || tag === "!";
	                        if (indentless_sequence && this.check_token(tokens.BlockEntryToken)) {
	                            end_mark = this.peek_token().end_mark;
	                            event = new events.SequenceStartEvent(anchor, tag, implicit, start_mark, end_mark);
	                            this.state = "parse_indentless_sequence_entry";
	                        } else {
	                            if (this.check_token(tokens.ScalarToken)) {
	                                token = this.get_token();
	                                end_mark = token.end_mark;
	                                if (token.plain && tag === null || tag === "!") {
	                                    implicit = [ true, false ];
	                                } else if (tag === null) {
	                                    implicit = [ false, true ];
	                                } else {
	                                    implicit = [ false, false ];
	                                }
	                                event = new events.ScalarEvent(anchor, tag, implicit, token.value, start_mark, end_mark, token.style);
	                                this.state = this.states.pop();
	                            } else if (this.check_token(tokens.FlowSequenceStartToken)) {
	                                end_mark = this.peek_token().end_mark;
	                                event = new events.SequenceStartEvent(anchor, tag, implicit, start_mark, end_mark, true);
	                                this.state = "parse_flow_sequence_first_entry";
	                            } else if (this.check_token(tokens.FlowMappingStartToken)) {
	                                end_mark = this.peek_token().end_mark;
	                                event = new events.MappingStartEvent(anchor, tag, implicit, start_mark, end_mark, true);
	                                this.state = "parse_flow_mapping_first_key";
	                            } else if (block && this.check_token(tokens.BlockSequenceStartToken)) {
	                                end_mark = this.peek_token().end_mark;
	                                event = new events.SequenceStartEvent(anchor, tag, implicit, start_mark, end_mark, false);
	                                this.state = "parse_block_sequence_first_entry";
	                            } else if (block && this.check_token(tokens.BlockMappingStartToken)) {
	                                end_mark = this.peek_token().end_mark;
	                                event = new events.MappingStartEvent(anchor, tag, implicit, start_mark, end_mark, false);
	                                this.state = "parse_block_mapping_first_key";
	                            } else if (anchor !== null || tag !== null) {
	                                event = new events.ScalarEvent(anchor, tag, [ implicit, false ], "", start_mark, end_mark);
	                                this.state = this.states.pop();
	                            } else {
	                                if (block) {
	                                    node = "block";
	                                } else {
	                                    node = "flow";
	                                }
	                                token = this.peek_token();
	                                throw new exports.ParserError("while parsing a " + node + " node", start_mark, "expected the node content, but found " + token.id, token.start_mark);
	                            }
	                        }
	                    }
	                    return event;
	                };
	                Parser.prototype.parse_block_sequence_first_entry = function() {
	                    var token;
	                    token = this.get_token();
	                    this.marks.push(token.start_mark);
	                    return this.parse_block_sequence_entry();
	                };
	                Parser.prototype.parse_block_sequence_entry = function() {
	                    var event, token;
	                    if (this.check_token(tokens.BlockEntryToken)) {
	                        token = this.get_token();
	                        if (!this.check_token(tokens.BlockEntryToken, tokens.BlockEndToken)) {
	                            this.states.push("parse_block_sequence_entry");
	                            return this.parse_block_node();
	                        } else {
	                            this.state = "parse_block_sequence_entry";
	                            return this.process_empty_scalar(token.end_mark);
	                        }
	                    }
	                    if (!this.check_token(tokens.BlockEndToken)) {
	                        token = this.peek_token();
	                        throw new exports.ParserError("while parsing a block collection", this.marks.slice(-1)[0], "expected <block end>, but found " + token.id, token.start_mark);
	                    }
	                    token = this.get_token();
	                    event = new events.SequenceEndEvent(token.start_mark, token.end_mark);
	                    this.state = this.states.pop();
	                    this.marks.pop();
	                    return event;
	                };
	                Parser.prototype.parse_indentless_sequence_entry = function() {
	                    var event, token;
	                    if (this.check_token(tokens.BlockEntryToken)) {
	                        token = this.get_token();
	                        if (!this.check_token(tokens.BlockEntryToken, tokens.KeyToken, tokens.ValueToken, tokens.BlockEndToken)) {
	                            this.states.push("parse_indentless_sequence_entry");
	                            return this.parse_block_node();
	                        } else {
	                            this.state = "parse_indentless_sequence_entry";
	                            return this.process_empty_scalar(token.end_mark);
	                        }
	                    }
	                    token = this.peek_token();
	                    event = new events.SequenceEndEvent(token.start_mark, token.start_mark);
	                    this.state = this.states.pop();
	                    return event;
	                };
	                Parser.prototype.parse_block_mapping_first_key = function() {
	                    var token;
	                    token = this.get_token();
	                    this.marks.push(token.start_mark);
	                    return this.parse_block_mapping_key();
	                };
	                Parser.prototype.parse_block_mapping_key = function() {
	                    var event, token;
	                    if (this.check_token(tokens.KeyToken)) {
	                        token = this.get_token();
	                        if (!this.check_token(tokens.KeyToken, tokens.ValueToken, tokens.BlockEndToken)) {
	                            this.states.push("parse_block_mapping_value");
	                            return this.parse_block_node_or_indentless_sequence();
	                        } else {
	                            this.state = "parse_block_mapping_value";
	                            return this.process_empty_scalar(token.end_mark);
	                        }
	                    }
	                    if (!this.check_token(tokens.BlockEndToken)) {
	                        token = this.peek_token();
	                        throw new exports.ParserError("while parsing a block mapping", this.marks.slice(-1)[0], "expected <block end>, but found " + token.id, token.start_mark);
	                    }
	                    token = this.get_token();
	                    event = new events.MappingEndEvent(token.start_mark, token.end_mark);
	                    this.state = this.states.pop();
	                    this.marks.pop();
	                    return event;
	                };
	                Parser.prototype.parse_block_mapping_value = function() {
	                    var token;
	                    if (this.check_token(tokens.ValueToken)) {
	                        token = this.get_token();
	                        if (!this.check_token(tokens.KeyToken, tokens.ValueToken, tokens.BlockEndToken)) {
	                            this.states.push("parse_block_mapping_key");
	                            return this.parse_block_node_or_indentless_sequence();
	                        } else {
	                            this.state = "parse_block_mapping_key";
	                            return this.process_empty_scalar(token.end_mark);
	                        }
	                    } else {
	                        this.state = "parse_block_mapping_key";
	                        token = this.peek_token();
	                        return this.process_empty_scalar(token.start_mark);
	                    }
	                };
	                Parser.prototype.parse_flow_sequence_first_entry = function() {
	                    var token;
	                    token = this.get_token();
	                    this.marks.push(token.start_mark);
	                    return this.parse_flow_sequence_entry(true);
	                };
	                Parser.prototype.parse_flow_sequence_entry = function(first) {
	                    var event, token;
	                    if (first == null) {
	                        first = false;
	                    }
	                    if (!this.check_token(tokens.FlowSequenceEndToken)) {
	                        if (!first) {
	                            if (this.check_token(tokens.FlowEntryToken)) {
	                                this.get_token();
	                            } else {
	                                token = this.peek_token();
	                                throw new exports.ParserError("while parsing a flow sequence", this.marks.slice(-1)[0], "expected ',' or ']', but got " + token.id, token.start_mark);
	                            }
	                        }
	                        if (this.check_token(tokens.KeyToken)) {
	                            token = this.peek_token();
	                            event = new events.MappingStartEvent(null, null, true, token.start_mark, token.end_mark, true);
	                            this.state = "parse_flow_sequence_entry_mapping_key";
	                            return event;
	                        } else if (!this.check_token(tokens.FlowSequenceEndToken)) {
	                            this.states.push("parse_flow_sequence_entry");
	                            return this.parse_flow_node();
	                        }
	                    }
	                    token = this.get_token();
	                    event = new events.SequenceEndEvent(token.start_mark, token.end_mark);
	                    this.state = this.states.pop();
	                    this.marks.pop();
	                    return event;
	                };
	                Parser.prototype.parse_flow_sequence_entry_mapping_key = function() {
	                    var token;
	                    token = this.get_token();
	                    if (!this.check_token(tokens.ValueToken, tokens.FlowEntryToken, tokens.FlowSequenceEndToken)) {
	                        this.states.push("parse_flow_sequence_entry_mapping_value");
	                        return this.parse_flow_node();
	                    } else {
	                        this.state = "parse_flow_sequence_entry_mapping_value";
	                        return this.process_empty_scalar(token.end_mark);
	                    }
	                };
	                Parser.prototype.parse_flow_sequence_entry_mapping_value = function() {
	                    var token;
	                    if (this.check_token(tokens.ValueToken)) {
	                        token = this.get_token();
	                        if (!this.check_token(tokens.FlowEntryToken, tokens.FlowSequenceEndToken)) {
	                            this.states.push("parse_flow_sequence_entry_mapping_end");
	                            return this.parse_flow_node();
	                        } else {
	                            this.state = "parse_flow_sequence_entry_mapping_end";
	                            return this.process_empty_scalar(token.end_mark);
	                        }
	                    } else {
	                        this.state = "parse_flow_sequence_entry_mapping_end";
	                        token = this.peek_token();
	                        return this.process_empty_scalar(token.start_mark);
	                    }
	                };
	                Parser.prototype.parse_flow_sequence_entry_mapping_end = function() {
	                    var token;
	                    this.state = "parse_flow_sequence_entry";
	                    token = this.peek_token();
	                    return new events.MappingEndEvent(token.start_mark, token.start_mark);
	                };
	                Parser.prototype.parse_flow_mapping_first_key = function() {
	                    var token;
	                    token = this.get_token();
	                    this.marks.push(token.start_mark);
	                    return this.parse_flow_mapping_key(true);
	                };
	                Parser.prototype.parse_flow_mapping_key = function(first) {
	                    var event, token;
	                    if (first == null) {
	                        first = false;
	                    }
	                    if (!this.check_token(tokens.FlowMappingEndToken)) {
	                        if (!first) {
	                            if (this.check_token(tokens.FlowEntryToken)) {
	                                this.get_token();
	                            } else {
	                                token = this.peek_token();
	                                throw new exports.ParserError("while parsing a flow mapping", this.marks.slice(-1)[0], "expected ',' or '}', but got " + token.id, token.start_mark);
	                            }
	                        }
	                        if (this.check_token(tokens.KeyToken)) {
	                            token = this.get_token();
	                            if (!this.check_token(tokens.ValueToken, tokens.FlowEntryToken, tokens.FlowMappingEndToken)) {
	                                this.states.push("parse_flow_mapping_value");
	                                return this.parse_flow_node();
	                            } else {
	                                this.state = "parse_flow_mapping_value";
	                                return this.process_empty_scalar(token.end_mark);
	                            }
	                        } else if (!this.check_token(tokens.FlowMappingEndToken)) {
	                            this.states.push("parse_flow_mapping_empty_value");
	                            return this.parse_flow_node();
	                        }
	                    }
	                    token = this.get_token();
	                    event = new events.MappingEndEvent(token.start_mark, token.end_mark);
	                    this.state = this.states.pop();
	                    this.marks.pop();
	                    return event;
	                };
	                Parser.prototype.parse_flow_mapping_value = function() {
	                    var token;
	                    if (this.check_token(tokens.ValueToken)) {
	                        token = this.get_token();
	                        if (!this.check_token(tokens.FlowEntryToken, tokens.FlowMappingEndToken)) {
	                            this.states.push("parse_flow_mapping_key");
	                            return this.parse_flow_node();
	                        } else {
	                            this.state = "parse_flow_mapping_key";
	                            return this.process_empty_scalar(token.end_mark);
	                        }
	                    } else {
	                        this.state = "parse_flow_mapping_key";
	                        token = this.peek_token();
	                        return this.process_empty_scalar(token.start_mark);
	                    }
	                };
	                Parser.prototype.parse_flow_mapping_empty_value = function() {
	                    this.state = "parse_flow_mapping_key";
	                    return this.process_empty_scalar(this.peek_token().start_mark);
	                };
	                Parser.prototype.process_empty_scalar = function(mark) {
	                    return new events.ScalarEvent(null, null, [ true, false ], "", mark, mark);
	                };
	                return Parser;
	            }();
	        }).call(this);
	    });
	    register({
	        "0": [ "./loader" ]
	    }, 0, function(global, module, exports, require, window) {
	        (function() {
	            var composer, constructor, parser, reader, resolver, scanner, util, slice = [].slice;
	            util = require("./util");
	            reader = require("./reader");
	            scanner = require("./scanner");
	            parser = require("./parser");
	            composer = require("./composer");
	            resolver = require("./resolver");
	            constructor = require("./constructor");
	            this.make_loader = function(Reader, Scanner, Parser, Composer, Resolver, Constructor) {
	                var Loader, components;
	                if (Reader == null) {
	                    Reader = reader.Reader;
	                }
	                if (Scanner == null) {
	                    Scanner = scanner.Scanner;
	                }
	                if (Parser == null) {
	                    Parser = parser.Parser;
	                }
	                if (Composer == null) {
	                    Composer = composer.Composer;
	                }
	                if (Resolver == null) {
	                    Resolver = resolver.Resolver;
	                }
	                if (Constructor == null) {
	                    Constructor = constructor.Constructor;
	                }
	                components = [ Reader, Scanner, Parser, Composer, Resolver, Constructor ];
	                return Loader = function() {
	                    var component;
	                    util.extend.apply(util, [ Loader.prototype ].concat(slice.call(function() {
	                        var i, len, results;
	                        results = [];
	                        for (i = 0, len = components.length; i < len; i++) {
	                            component = components[i];
	                            results.push(component.prototype);
	                        }
	                        return results;
	                    }())));
	                    function Loader(stream) {
	                        var i, len, ref;
	                        components[0].call(this, stream);
	                        ref = components.slice(1);
	                        for (i = 0, len = ref.length; i < len; i++) {
	                            component = ref[i];
	                            component.call(this);
	                        }
	                    }
	                    return Loader;
	                }();
	            };
	            this.Loader = this.make_loader();
	        }).call(this);
	    });
	    register({
	        "": [ "yaml" ]
	    }, 0, function(global, module, exports, require, window) {
	        (function() {
	            var composer, constructor, dumper, errors, events, fs, loader, nodes, parser, reader, resolver, scanner, tokens, util;
	            composer = require("./composer");
	            constructor = require("./constructor");
	            dumper = require("./dumper");
	            errors = require("./errors");
	            events = require("./events");
	            loader = require("./loader");
	            nodes = require("./nodes");
	            parser = require("./parser");
	            reader = require("./reader");
	            resolver = require("./resolver");
	            scanner = require("./scanner");
	            tokens = require("./tokens");
	            util = require("./util");
	            this.scan = function(stream, Loader) {
	                var _loader, results;
	                if (Loader == null) {
	                    Loader = loader.Loader;
	                }
	                _loader = new Loader(stream);
	                results = [];
	                while (_loader.check_token()) {
	                    results.push(_loader.get_token());
	                }
	                return results;
	            };
	            this.parse = function(stream, Loader) {
	                var _loader, results;
	                if (Loader == null) {
	                    Loader = loader.Loader;
	                }
	                _loader = new Loader(stream);
	                results = [];
	                while (_loader.check_event()) {
	                    results.push(_loader.get_event());
	                }
	                return results;
	            };
	            this.compose = function(stream, Loader) {
	                var _loader;
	                if (Loader == null) {
	                    Loader = loader.Loader;
	                }
	                _loader = new Loader(stream);
	                return _loader.get_single_node();
	            };
	            this.compose_all = function(stream, Loader) {
	                var _loader, results;
	                if (Loader == null) {
	                    Loader = loader.Loader;
	                }
	                _loader = new Loader(stream);
	                results = [];
	                while (_loader.check_node()) {
	                    results.push(_loader.get_node());
	                }
	                return results;
	            };
	            this.load = function(stream, Loader) {
	                var _loader;
	                if (Loader == null) {
	                    Loader = loader.Loader;
	                }
	                _loader = new Loader(stream);
	                return _loader.get_single_data();
	            };
	            this.load_all = function(stream, Loader) {
	                var _loader, results;
	                if (Loader == null) {
	                    Loader = loader.Loader;
	                }
	                _loader = new Loader(stream);
	                results = [];
	                while (_loader.check_data()) {
	                    results.push(_loader.get_data());
	                }
	                return results;
	            };
	            this.emit = function(events, stream, Dumper, options) {
	                var _dumper, dest, event, i, len;
	                if (Dumper == null) {
	                    Dumper = dumper.Dumper;
	                }
	                if (options == null) {
	                    options = {};
	                }
	                dest = stream || new util.StringStream;
	                _dumper = new Dumper(dest, options);
	                try {
	                    for (i = 0, len = events.length; i < len; i++) {
	                        event = events[i];
	                        _dumper.emit(event);
	                    }
	                } finally {
	                    _dumper.dispose();
	                }
	                return stream || dest.string;
	            };
	            this.serialize = function(node, stream, Dumper, options) {
	                if (Dumper == null) {
	                    Dumper = dumper.Dumper;
	                }
	                if (options == null) {
	                    options = {};
	                }
	                return exports.serialize_all([ node ], stream, Dumper, options);
	            };
	            this.serialize_all = function(nodes, stream, Dumper, options) {
	                var _dumper, dest, i, len, node;
	                if (Dumper == null) {
	                    Dumper = dumper.Dumper;
	                }
	                if (options == null) {
	                    options = {};
	                }
	                dest = stream || new util.StringStream;
	                _dumper = new Dumper(dest, options);
	                try {
	                    _dumper.open();
	                    for (i = 0, len = nodes.length; i < len; i++) {
	                        node = nodes[i];
	                        _dumper.serialize(node);
	                    }
	                    _dumper.close();
	                } finally {
	                    _dumper.dispose();
	                }
	                return stream || dest.string;
	            };
	            this.dump = function(data, stream, Dumper, options) {
	                if (Dumper == null) {
	                    Dumper = dumper.Dumper;
	                }
	                if (options == null) {
	                    options = {};
	                }
	                return exports.dump_all([ data ], stream, Dumper, options);
	            };
	            this.dump_all = function(documents, stream, Dumper, options) {
	                var _dumper, dest, document, i, len;
	                if (Dumper == null) {
	                    Dumper = dumper.Dumper;
	                }
	                if (options == null) {
	                    options = {};
	                }
	                dest = stream || new util.StringStream;
	                _dumper = new Dumper(dest, options);
	                try {
	                    _dumper.open();
	                    for (i = 0, len = documents.length; i < len; i++) {
	                        document = documents[i];
	                        _dumper.represent(document);
	                    }
	                    _dumper.close();
	                } finally {
	                    _dumper.dispose();
	                }
	                return stream || dest.string;
	            };
	            if (typeof require !== "undefined" && require !== null ? require.extensions : void 0) {
	                fs = require("fs");
	                require.extensions[".yml"] = require.extensions[".yaml"] = function(module, filename) {
	                    return module.exports = exports.load_all(fs.readFileSync(filename, "utf8"));
	                };
	            }
	        }).call(this);
	    });
	    root["yaml"] = require_from(null, "")("yaml");
	}).call(this);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(2).Buffer))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */
	
	'use strict'
	
	var base64 = __webpack_require__(3)
	var ieee754 = __webpack_require__(4)
	var isArray = __webpack_require__(5)
	
	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	
	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.
	
	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()
	
	/*
	 * Export kMaxLength after typed array support is determined.
	 */
	exports.kMaxLength = kMaxLength()
	
	function typedArraySupport () {
	  try {
	    var arr = new Uint8Array(1)
	    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
	    return arr.foo() === 42 && // typed array instances can be augmented
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}
	
	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}
	
	function createBuffer (that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length')
	  }
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length)
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer(length)
	    }
	    that.length = length
	  }
	
	  return that
	}
	
	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */
	
	function Buffer (arg, encodingOrOffset, length) {
	  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	    return new Buffer(arg, encodingOrOffset, length)
	  }
	
	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error(
	        'If encoding is specified then the first argument must be a string'
	      )
	    }
	    return allocUnsafe(this, arg)
	  }
	  return from(this, arg, encodingOrOffset, length)
	}
	
	Buffer.poolSize = 8192 // not used by this implementation
	
	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer._augment = function (arr) {
	  arr.__proto__ = Buffer.prototype
	  return arr
	}
	
	function from (that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }
	
	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length)
	  }
	
	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset)
	  }
	
	  return fromObject(that, value)
	}
	
	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length)
	}
	
	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	  if (typeof Symbol !== 'undefined' && Symbol.species &&
	      Buffer[Symbol.species] === Buffer) {
	    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
	    Object.defineProperty(Buffer, Symbol.species, {
	      value: null,
	      configurable: true
	    })
	  }
	}
	
	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number')
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative')
	  }
	}
	
	function alloc (that, size, fill, encoding) {
	  assertSize(size)
	  if (size <= 0) {
	    return createBuffer(that, size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(that, size).fill(fill, encoding)
	      : createBuffer(that, size).fill(fill)
	  }
	  return createBuffer(that, size)
	}
	
	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding)
	}
	
	function allocUnsafe (that, size) {
	  assertSize(size)
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0
	    }
	  }
	  return that
	}
	
	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(null, size)
	}
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size)
	}
	
	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8'
	  }
	
	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding')
	  }
	
	  var length = byteLength(string, encoding) | 0
	  that = createBuffer(that, length)
	
	  var actual = that.write(string, encoding)
	
	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual)
	  }
	
	  return that
	}
	
	function fromArrayLike (that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0
	  that = createBuffer(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	function fromArrayBuffer (that, array, byteOffset, length) {
	  array.byteLength // this throws if `array` is not a valid ArrayBuffer
	
	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds')
	  }
	
	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds')
	  }
	
	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array)
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset)
	  } else {
	    array = new Uint8Array(array, byteOffset, length)
	  }
	
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array)
	  }
	  return that
	}
	
	function fromObject (that, obj) {
	  if (Buffer.isBuffer(obj)) {
	    var len = checked(obj.length) | 0
	    that = createBuffer(that, len)
	
	    if (that.length === 0) {
	      return that
	    }
	
	    obj.copy(that, 0, 0, len)
	    return that
	  }
	
	  if (obj) {
	    if ((typeof ArrayBuffer !== 'undefined' &&
	        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0)
	      }
	      return fromArrayLike(that, obj)
	    }
	
	    if (obj.type === 'Buffer' && isArray(obj.data)) {
	      return fromArrayLike(that, obj.data)
	    }
	  }
	
	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
	}
	
	function checked (length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}
	
	function SlowBuffer (length) {
	  if (+length != length) { // eslint-disable-line eqeqeq
	    length = 0
	  }
	  return Buffer.alloc(+length)
	}
	
	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}
	
	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }
	
	  if (a === b) return 0
	
	  var x = a.length
	  var y = b.length
	
	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i]
	      y = b[i]
	      break
	    }
	  }
	
	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}
	
	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}
	
	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }
	
	  if (list.length === 0) {
	    return Buffer.alloc(0)
	  }
	
	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length
	    }
	  }
	
	  var buffer = Buffer.allocUnsafe(length)
	  var pos = 0
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i]
	    if (!Buffer.isBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos)
	    pos += buf.length
	  }
	  return buffer
	}
	
	function byteLength (string, encoding) {
	  if (Buffer.isBuffer(string)) {
	    return string.length
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
	      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    string = '' + string
	  }
	
	  var len = string.length
	  if (len === 0) return 0
	
	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength
	
	function slowToString (encoding, start, end) {
	  var loweredCase = false
	
	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.
	
	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }
	
	  if (end === undefined || end > this.length) {
	    end = this.length
	  }
	
	  if (end <= 0) {
	    return ''
	  }
	
	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0
	  start >>>= 0
	
	  if (end <= start) {
	    return ''
	  }
	
	  if (!encoding) encoding = 'utf8'
	
	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)
	
	      case 'ascii':
	        return asciiSlice(this, start, end)
	
	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)
	
	      case 'base64':
	        return base64Slice(this, start, end)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)
	
	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer.prototype._isBuffer = true
	
	function swap (b, n, m) {
	  var i = b[n]
	  b[n] = b[m]
	  b[m] = i
	}
	
	Buffer.prototype.swap16 = function swap16 () {
	  var len = this.length
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1)
	  }
	  return this
	}
	
	Buffer.prototype.swap32 = function swap32 () {
	  var len = this.length
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3)
	    swap(this, i + 1, i + 2)
	  }
	  return this
	}
	
	Buffer.prototype.swap64 = function swap64 () {
	  var len = this.length
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7)
	    swap(this, i + 1, i + 6)
	    swap(this, i + 2, i + 5)
	    swap(this, i + 3, i + 4)
	  }
	  return this
	}
	
	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}
	
	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}
	
	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}
	
	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (!Buffer.isBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer')
	  }
	
	  if (start === undefined) {
	    start = 0
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0
	  }
	  if (thisStart === undefined) {
	    thisStart = 0
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length
	  }
	
	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }
	
	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }
	
	  start >>>= 0
	  end >>>= 0
	  thisStart >>>= 0
	  thisEnd >>>= 0
	
	  if (this === target) return 0
	
	  var x = thisEnd - thisStart
	  var y = end - start
	  var len = Math.min(x, y)
	
	  var thisCopy = this.slice(thisStart, thisEnd)
	  var targetCopy = target.slice(start, end)
	
	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i]
	      y = targetCopy[i]
	      break
	    }
	  }
	
	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}
	
	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1
	
	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset
	    byteOffset = 0
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000
	  }
	  byteOffset = +byteOffset  // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1)
	  }
	
	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0
	    else return -1
	  }
	
	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding)
	  }
	
	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (Buffer.isBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF // Search for a byte value [0-255]
	    if (Buffer.TYPED_ARRAY_SUPPORT &&
	        typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	  }
	
	  throw new TypeError('val must be string, number or Buffer')
	}
	
	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1
	  var arrLength = arr.length
	  var valLength = val.length
	
	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase()
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2
	      arrLength /= 2
	      valLength /= 2
	      byteOffset /= 2
	    }
	  }
	
	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }
	
	  var i
	  if (dir) {
	    var foundIndex = -1
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex
	        foundIndex = -1
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false
	          break
	        }
	      }
	      if (found) return i
	    }
	  }
	
	  return -1
	}
	
	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	}
	
	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	}
	
	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	}
	
	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }
	
	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')
	
	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) return i
	    buf[offset + i] = parsed
	  }
	  return i
	}
	
	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}
	
	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}
	
	function latin1Write (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}
	
	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}
	
	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}
	
	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }
	
	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining
	
	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }
	
	  if (!encoding) encoding = 'utf8'
	
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)
	
	      case 'ascii':
	        return asciiWrite(this, string, offset, length)
	
	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)
	
	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)
	
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)
	
	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	
	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}
	
	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}
	
	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []
	
	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1
	
	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint
	
	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }
	
	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }
	
	    res.push(codePoint)
	    i += bytesPerSequence
	  }
	
	  return decodeCodePointsArray(res)
	}
	
	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000
	
	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }
	
	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}
	
	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}
	
	function latin1Slice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}
	
	function hexSlice (buf, start, end) {
	  var len = buf.length
	
	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len
	
	  var out = ''
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i])
	  }
	  return out
	}
	
	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}
	
	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end
	
	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }
	
	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }
	
	  if (end < start) end = start
	
	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = this.subarray(start, end)
	    newBuf.__proto__ = Buffer.prototype
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start]
	    }
	  }
	
	  return newBuf
	}
	
	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}
	
	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	
	  return val
	}
	
	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }
	
	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }
	
	  return val
	}
	
	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}
	
	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}
	
	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}
	
	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}
	
	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}
	
	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80
	
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)
	
	  return val
	}
	
	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)
	
	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80
	
	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)
	
	  return val
	}
	
	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}
	
	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}
	
	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}
	
	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	
	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}
	
	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}
	
	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}
	
	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}
	
	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}
	
	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}
	
	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }
	
	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }
	
	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}
	
	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}
	
	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}
	
	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}
	
	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)
	
	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }
	
	  var i = 0
	  var mul = 1
	  var sub = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)
	
	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }
	
	  var i = byteLength - 1
	  var mul = 1
	  var sub = 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }
	
	  return offset + byteLength
	}
	
	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}
	
	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}
	
	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}
	
	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}
	
	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}
	
	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}
	
	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}
	
	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}
	
	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}
	
	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}
	
	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start
	
	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0
	
	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')
	
	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }
	
	  var len = end - start
	  var i
	
	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, start + len),
	      targetStart
	    )
	  }
	
	  return len
	}
	
	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start
	      start = 0
	      end = this.length
	    } else if (typeof end === 'string') {
	      encoding = end
	      end = this.length
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0)
	      if (code < 256) {
	        val = code
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255
	  }
	
	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }
	
	  if (end <= start) {
	    return this
	  }
	
	  start = start >>> 0
	  end = end === undefined ? this.length : end >>> 0
	
	  if (!val) val = 0
	
	  var i
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val
	    }
	  } else {
	    var bytes = Buffer.isBuffer(val)
	      ? val
	      : utf8ToBytes(new Buffer(val, encoding).toString())
	    var len = bytes.length
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len]
	    }
	  }
	
	  return this
	}
	
	// HELPER FUNCTIONS
	// ================
	
	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g
	
	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}
	
	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}
	
	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}
	
	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []
	
	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i)
	
	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }
	
	        // valid lead
	        leadSurrogate = codePoint
	
	        continue
	      }
	
	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }
	
	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }
	
	    leadSurrogate = null
	
	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }
	
	  return bytes
	}
	
	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}
	
	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break
	
	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }
	
	  return byteArray
	}
	
	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}
	
	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}
	
	function isnan (val) {
	  return val !== val // eslint-disable-line no-self-compare
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2).Buffer, (function() { return this; }())))

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict'
	
	exports.toByteArray = toByteArray
	exports.fromByteArray = fromByteArray
	
	var lookup = []
	var revLookup = []
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array
	
	function init () {
	  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
	  for (var i = 0, len = code.length; i < len; ++i) {
	    lookup[i] = code[i]
	    revLookup[code.charCodeAt(i)] = i
	  }
	
	  revLookup['-'.charCodeAt(0)] = 62
	  revLookup['_'.charCodeAt(0)] = 63
	}
	
	init()
	
	function toByteArray (b64) {
	  var i, j, l, tmp, placeHolders, arr
	  var len = b64.length
	
	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4')
	  }
	
	  // the number of equal signs (place holders)
	  // if there are two placeholders, than the two characters before it
	  // represent one byte
	  // if there is only one, then the three characters before it represent 2 bytes
	  // this is just a cheap hack to not do indexOf twice
	  placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
	
	  // base64 is 4/3 + up to two characters of the original data
	  arr = new Arr(len * 3 / 4 - placeHolders)
	
	  // if there are placeholders, only get up to the last complete 4 chars
	  l = placeHolders > 0 ? len - 4 : len
	
	  var L = 0
	
	  for (i = 0, j = 0; i < l; i += 4, j += 3) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
	    arr[L++] = (tmp >> 16) & 0xFF
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }
	
	  if (placeHolders === 2) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
	    arr[L++] = tmp & 0xFF
	  } else if (placeHolders === 1) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }
	
	  return arr
	}
	
	function tripletToBase64 (num) {
	  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
	}
	
	function encodeChunk (uint8, start, end) {
	  var tmp
	  var output = []
	  for (var i = start; i < end; i += 3) {
	    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
	    output.push(tripletToBase64(tmp))
	  }
	  return output.join('')
	}
	
	function fromByteArray (uint8) {
	  var tmp
	  var len = uint8.length
	  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
	  var output = ''
	  var parts = []
	  var maxChunkLength = 16383 // must be multiple of 3
	
	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
	  }
	
	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1]
	    output += lookup[tmp >> 2]
	    output += lookup[(tmp << 4) & 0x3F]
	    output += '=='
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
	    output += lookup[tmp >> 10]
	    output += lookup[(tmp >> 4) & 0x3F]
	    output += lookup[(tmp << 2) & 0x3F]
	    output += '='
	  }
	
	  parts.push(output)
	
	  return parts.join('')
	}


/***/ },
/* 4 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]
	
	  i += d
	
	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}
	
	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}
	
	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}
	
	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0
	
	  value = Math.abs(value)
	
	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }
	
	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }
	
	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}
	
	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}
	
	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	
	var yaml = __webpack_require__(7);
	
	
	module.exports = yaml;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	
	var loader = __webpack_require__(8);
	var dumper = __webpack_require__(36);
	
	
	function deprecated(name) {
	  return function () {
	    throw new Error('Function ' + name + ' is deprecated and cannot be used.');
	  };
	}
	
	
	module.exports.Type                = __webpack_require__(14);
	module.exports.Schema              = __webpack_require__(13);
	module.exports.FAILSAFE_SCHEMA     = __webpack_require__(17);
	module.exports.JSON_SCHEMA         = __webpack_require__(16);
	module.exports.CORE_SCHEMA         = __webpack_require__(15);
	module.exports.DEFAULT_SAFE_SCHEMA = __webpack_require__(12);
	module.exports.DEFAULT_FULL_SCHEMA = __webpack_require__(31);
	module.exports.load                = loader.load;
	module.exports.loadAll             = loader.loadAll;
	module.exports.safeLoad            = loader.safeLoad;
	module.exports.safeLoadAll         = loader.safeLoadAll;
	module.exports.dump                = dumper.dump;
	module.exports.safeDump            = dumper.safeDump;
	module.exports.YAMLException       = __webpack_require__(10);
	
	// Deprecated schema names from JS-YAML 2.0.x
	module.exports.MINIMAL_SCHEMA = __webpack_require__(17);
	module.exports.SAFE_SCHEMA    = __webpack_require__(12);
	module.exports.DEFAULT_SCHEMA = __webpack_require__(31);
	
	// Deprecated functions from JS-YAML 1.x.x
	module.exports.scan           = deprecated('scan');
	module.exports.parse          = deprecated('parse');
	module.exports.compose        = deprecated('compose');
	module.exports.addConstructor = deprecated('addConstructor');


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/*eslint-disable max-len,no-use-before-define*/
	
	var common              = __webpack_require__(9);
	var YAMLException       = __webpack_require__(10);
	var Mark                = __webpack_require__(11);
	var DEFAULT_SAFE_SCHEMA = __webpack_require__(12);
	var DEFAULT_FULL_SCHEMA = __webpack_require__(31);
	
	
	var _hasOwnProperty = Object.prototype.hasOwnProperty;
	
	
	var CONTEXT_FLOW_IN   = 1;
	var CONTEXT_FLOW_OUT  = 2;
	var CONTEXT_BLOCK_IN  = 3;
	var CONTEXT_BLOCK_OUT = 4;
	
	
	var CHOMPING_CLIP  = 1;
	var CHOMPING_STRIP = 2;
	var CHOMPING_KEEP  = 3;
	
	
	var PATTERN_NON_PRINTABLE         = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
	var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
	var PATTERN_FLOW_INDICATORS       = /[,\[\]\{\}]/;
	var PATTERN_TAG_HANDLE            = /^(?:!|!!|![a-z\-]+!)$/i;
	var PATTERN_TAG_URI               = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
	
	
	function is_EOL(c) {
	  return (c === 0x0A/* LF */) || (c === 0x0D/* CR */);
	}
	
	function is_WHITE_SPACE(c) {
	  return (c === 0x09/* Tab */) || (c === 0x20/* Space */);
	}
	
	function is_WS_OR_EOL(c) {
	  return (c === 0x09/* Tab */) ||
	         (c === 0x20/* Space */) ||
	         (c === 0x0A/* LF */) ||
	         (c === 0x0D/* CR */);
	}
	
	function is_FLOW_INDICATOR(c) {
	  return c === 0x2C/* , */ ||
	         c === 0x5B/* [ */ ||
	         c === 0x5D/* ] */ ||
	         c === 0x7B/* { */ ||
	         c === 0x7D/* } */;
	}
	
	function fromHexCode(c) {
	  var lc;
	
	  if ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) {
	    return c - 0x30;
	  }
	
	  /*eslint-disable no-bitwise*/
	  lc = c | 0x20;
	
	  if ((0x61/* a */ <= lc) && (lc <= 0x66/* f */)) {
	    return lc - 0x61 + 10;
	  }
	
	  return -1;
	}
	
	function escapedHexLen(c) {
	  if (c === 0x78/* x */) { return 2; }
	  if (c === 0x75/* u */) { return 4; }
	  if (c === 0x55/* U */) { return 8; }
	  return 0;
	}
	
	function fromDecimalCode(c) {
	  if ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) {
	    return c - 0x30;
	  }
	
	  return -1;
	}
	
	function simpleEscapeSequence(c) {
	  return (c === 0x30/* 0 */) ? '\x00' :
	        (c === 0x61/* a */) ? '\x07' :
	        (c === 0x62/* b */) ? '\x08' :
	        (c === 0x74/* t */) ? '\x09' :
	        (c === 0x09/* Tab */) ? '\x09' :
	        (c === 0x6E/* n */) ? '\x0A' :
	        (c === 0x76/* v */) ? '\x0B' :
	        (c === 0x66/* f */) ? '\x0C' :
	        (c === 0x72/* r */) ? '\x0D' :
	        (c === 0x65/* e */) ? '\x1B' :
	        (c === 0x20/* Space */) ? ' ' :
	        (c === 0x22/* " */) ? '\x22' :
	        (c === 0x2F/* / */) ? '/' :
	        (c === 0x5C/* \ */) ? '\x5C' :
	        (c === 0x4E/* N */) ? '\x85' :
	        (c === 0x5F/* _ */) ? '\xA0' :
	        (c === 0x4C/* L */) ? '\u2028' :
	        (c === 0x50/* P */) ? '\u2029' : '';
	}
	
	function charFromCodepoint(c) {
	  if (c <= 0xFFFF) {
	    return String.fromCharCode(c);
	  }
	  // Encode UTF-16 surrogate pair
	  // https://en.wikipedia.org/wiki/UTF-16#Code_points_U.2B010000_to_U.2B10FFFF
	  return String.fromCharCode(((c - 0x010000) >> 10) + 0xD800,
	                             ((c - 0x010000) & 0x03FF) + 0xDC00);
	}
	
	var simpleEscapeCheck = new Array(256); // integer, for fast access
	var simpleEscapeMap = new Array(256);
	for (var i = 0; i < 256; i++) {
	  simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
	  simpleEscapeMap[i] = simpleEscapeSequence(i);
	}
	
	
	function State(input, options) {
	  this.input = input;
	
	  this.filename  = options['filename']  || null;
	  this.schema    = options['schema']    || DEFAULT_FULL_SCHEMA;
	  this.onWarning = options['onWarning'] || null;
	  this.legacy    = options['legacy']    || false;
	  this.json      = options['json']      || false;
	  this.listener  = options['listener']  || null;
	
	  this.implicitTypes = this.schema.compiledImplicit;
	  this.typeMap       = this.schema.compiledTypeMap;
	
	  this.length     = input.length;
	  this.position   = 0;
	  this.line       = 0;
	  this.lineStart  = 0;
	  this.lineIndent = 0;
	
	  this.documents = [];
	
	  /*
	  this.version;
	  this.checkLineBreaks;
	  this.tagMap;
	  this.anchorMap;
	  this.tag;
	  this.anchor;
	  this.kind;
	  this.result;*/
	
	}
	
	
	function generateError(state, message) {
	  return new YAMLException(
	    message,
	    new Mark(state.filename, state.input, state.position, state.line, (state.position - state.lineStart)));
	}
	
	function throwError(state, message) {
	  throw generateError(state, message);
	}
	
	function throwWarning(state, message) {
	  if (state.onWarning) {
	    state.onWarning.call(null, generateError(state, message));
	  }
	}
	
	
	var directiveHandlers = {
	
	  YAML: function handleYamlDirective(state, name, args) {
	
	    var match, major, minor;
	
	    if (state.version !== null) {
	      throwError(state, 'duplication of %YAML directive');
	    }
	
	    if (args.length !== 1) {
	      throwError(state, 'YAML directive accepts exactly one argument');
	    }
	
	    match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
	
	    if (match === null) {
	      throwError(state, 'ill-formed argument of the YAML directive');
	    }
	
	    major = parseInt(match[1], 10);
	    minor = parseInt(match[2], 10);
	
	    if (major !== 1) {
	      throwError(state, 'unacceptable YAML version of the document');
	    }
	
	    state.version = args[0];
	    state.checkLineBreaks = (minor < 2);
	
	    if (minor !== 1 && minor !== 2) {
	      throwWarning(state, 'unsupported YAML version of the document');
	    }
	  },
	
	  TAG: function handleTagDirective(state, name, args) {
	
	    var handle, prefix;
	
	    if (args.length !== 2) {
	      throwError(state, 'TAG directive accepts exactly two arguments');
	    }
	
	    handle = args[0];
	    prefix = args[1];
	
	    if (!PATTERN_TAG_HANDLE.test(handle)) {
	      throwError(state, 'ill-formed tag handle (first argument) of the TAG directive');
	    }
	
	    if (_hasOwnProperty.call(state.tagMap, handle)) {
	      throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
	    }
	
	    if (!PATTERN_TAG_URI.test(prefix)) {
	      throwError(state, 'ill-formed tag prefix (second argument) of the TAG directive');
	    }
	
	    state.tagMap[handle] = prefix;
	  }
	};
	
	
	function captureSegment(state, start, end, checkJson) {
	  var _position, _length, _character, _result;
	
	  if (start < end) {
	    _result = state.input.slice(start, end);
	
	    if (checkJson) {
	      for (_position = 0, _length = _result.length;
	           _position < _length;
	           _position += 1) {
	        _character = _result.charCodeAt(_position);
	        if (!(_character === 0x09 ||
	              (0x20 <= _character && _character <= 0x10FFFF))) {
	          throwError(state, 'expected valid JSON character');
	        }
	      }
	    } else if (PATTERN_NON_PRINTABLE.test(_result)) {
	      throwError(state, 'the stream contains non-printable characters');
	    }
	
	    state.result += _result;
	  }
	}
	
	function mergeMappings(state, destination, source, overridableKeys) {
	  var sourceKeys, key, index, quantity;
	
	  if (!common.isObject(source)) {
	    throwError(state, 'cannot merge mappings; the provided source object is unacceptable');
	  }
	
	  sourceKeys = Object.keys(source);
	
	  for (index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
	    key = sourceKeys[index];
	
	    if (!_hasOwnProperty.call(destination, key)) {
	      destination[key] = source[key];
	      overridableKeys[key] = true;
	    }
	  }
	}
	
	function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode) {
	  var index, quantity;
	
	  keyNode = String(keyNode);
	
	  if (_result === null) {
	    _result = {};
	  }
	
	  if (keyTag === 'tag:yaml.org,2002:merge') {
	    if (Array.isArray(valueNode)) {
	      for (index = 0, quantity = valueNode.length; index < quantity; index += 1) {
	        mergeMappings(state, _result, valueNode[index], overridableKeys);
	      }
	    } else {
	      mergeMappings(state, _result, valueNode, overridableKeys);
	    }
	  } else {
	    if (!state.json &&
	        !_hasOwnProperty.call(overridableKeys, keyNode) &&
	        _hasOwnProperty.call(_result, keyNode)) {
	      throwError(state, 'duplicated mapping key');
	    }
	    _result[keyNode] = valueNode;
	    delete overridableKeys[keyNode];
	  }
	
	  return _result;
	}
	
	function readLineBreak(state) {
	  var ch;
	
	  ch = state.input.charCodeAt(state.position);
	
	  if (ch === 0x0A/* LF */) {
	    state.position++;
	  } else if (ch === 0x0D/* CR */) {
	    state.position++;
	    if (state.input.charCodeAt(state.position) === 0x0A/* LF */) {
	      state.position++;
	    }
	  } else {
	    throwError(state, 'a line break is expected');
	  }
	
	  state.line += 1;
	  state.lineStart = state.position;
	}
	
	function skipSeparationSpace(state, allowComments, checkIndent) {
	  var lineBreaks = 0,
	      ch = state.input.charCodeAt(state.position);
	
	  while (ch !== 0) {
	    while (is_WHITE_SPACE(ch)) {
	      ch = state.input.charCodeAt(++state.position);
	    }
	
	    if (allowComments && ch === 0x23/* # */) {
	      do {
	        ch = state.input.charCodeAt(++state.position);
	      } while (ch !== 0x0A/* LF */ && ch !== 0x0D/* CR */ && ch !== 0);
	    }
	
	    if (is_EOL(ch)) {
	      readLineBreak(state);
	
	      ch = state.input.charCodeAt(state.position);
	      lineBreaks++;
	      state.lineIndent = 0;
	
	      while (ch === 0x20/* Space */) {
	        state.lineIndent++;
	        ch = state.input.charCodeAt(++state.position);
	      }
	    } else {
	      break;
	    }
	  }
	
	  if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
	    throwWarning(state, 'deficient indentation');
	  }
	
	  return lineBreaks;
	}
	
	function testDocumentSeparator(state) {
	  var _position = state.position,
	      ch;
	
	  ch = state.input.charCodeAt(_position);
	
	  // Condition state.position === state.lineStart is tested
	  // in parent on each call, for efficiency. No needs to test here again.
	  if ((ch === 0x2D/* - */ || ch === 0x2E/* . */) &&
	      ch === state.input.charCodeAt(_position + 1) &&
	      ch === state.input.charCodeAt(_position + 2)) {
	
	    _position += 3;
	
	    ch = state.input.charCodeAt(_position);
	
	    if (ch === 0 || is_WS_OR_EOL(ch)) {
	      return true;
	    }
	  }
	
	  return false;
	}
	
	function writeFoldedLines(state, count) {
	  if (count === 1) {
	    state.result += ' ';
	  } else if (count > 1) {
	    state.result += common.repeat('\n', count - 1);
	  }
	}
	
	
	function readPlainScalar(state, nodeIndent, withinFlowCollection) {
	  var preceding,
	      following,
	      captureStart,
	      captureEnd,
	      hasPendingContent,
	      _line,
	      _lineStart,
	      _lineIndent,
	      _kind = state.kind,
	      _result = state.result,
	      ch;
	
	  ch = state.input.charCodeAt(state.position);
	
	  if (is_WS_OR_EOL(ch)      ||
	      is_FLOW_INDICATOR(ch) ||
	      ch === 0x23/* # */    ||
	      ch === 0x26/* & */    ||
	      ch === 0x2A/* * */    ||
	      ch === 0x21/* ! */    ||
	      ch === 0x7C/* | */    ||
	      ch === 0x3E/* > */    ||
	      ch === 0x27/* ' */    ||
	      ch === 0x22/* " */    ||
	      ch === 0x25/* % */    ||
	      ch === 0x40/* @ */    ||
	      ch === 0x60/* ` */) {
	    return false;
	  }
	
	  if (ch === 0x3F/* ? */ || ch === 0x2D/* - */) {
	    following = state.input.charCodeAt(state.position + 1);
	
	    if (is_WS_OR_EOL(following) ||
	        withinFlowCollection && is_FLOW_INDICATOR(following)) {
	      return false;
	    }
	  }
	
	  state.kind = 'scalar';
	  state.result = '';
	  captureStart = captureEnd = state.position;
	  hasPendingContent = false;
	
	  while (ch !== 0) {
	    if (ch === 0x3A/* : */) {
	      following = state.input.charCodeAt(state.position + 1);
	
	      if (is_WS_OR_EOL(following) ||
	          withinFlowCollection && is_FLOW_INDICATOR(following)) {
	        break;
	      }
	
	    } else if (ch === 0x23/* # */) {
	      preceding = state.input.charCodeAt(state.position - 1);
	
	      if (is_WS_OR_EOL(preceding)) {
	        break;
	      }
	
	    } else if ((state.position === state.lineStart && testDocumentSeparator(state)) ||
	               withinFlowCollection && is_FLOW_INDICATOR(ch)) {
	      break;
	
	    } else if (is_EOL(ch)) {
	      _line = state.line;
	      _lineStart = state.lineStart;
	      _lineIndent = state.lineIndent;
	      skipSeparationSpace(state, false, -1);
	
	      if (state.lineIndent >= nodeIndent) {
	        hasPendingContent = true;
	        ch = state.input.charCodeAt(state.position);
	        continue;
	      } else {
	        state.position = captureEnd;
	        state.line = _line;
	        state.lineStart = _lineStart;
	        state.lineIndent = _lineIndent;
	        break;
	      }
	    }
	
	    if (hasPendingContent) {
	      captureSegment(state, captureStart, captureEnd, false);
	      writeFoldedLines(state, state.line - _line);
	      captureStart = captureEnd = state.position;
	      hasPendingContent = false;
	    }
	
	    if (!is_WHITE_SPACE(ch)) {
	      captureEnd = state.position + 1;
	    }
	
	    ch = state.input.charCodeAt(++state.position);
	  }
	
	  captureSegment(state, captureStart, captureEnd, false);
	
	  if (state.result) {
	    return true;
	  }
	
	  state.kind = _kind;
	  state.result = _result;
	  return false;
	}
	
	function readSingleQuotedScalar(state, nodeIndent) {
	  var ch,
	      captureStart, captureEnd;
	
	  ch = state.input.charCodeAt(state.position);
	
	  if (ch !== 0x27/* ' */) {
	    return false;
	  }
	
	  state.kind = 'scalar';
	  state.result = '';
	  state.position++;
	  captureStart = captureEnd = state.position;
	
	  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
	    if (ch === 0x27/* ' */) {
	      captureSegment(state, captureStart, state.position, true);
	      ch = state.input.charCodeAt(++state.position);
	
	      if (ch === 0x27/* ' */) {
	        captureStart = captureEnd = state.position;
	        state.position++;
	      } else {
	        return true;
	      }
	
	    } else if (is_EOL(ch)) {
	      captureSegment(state, captureStart, captureEnd, true);
	      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
	      captureStart = captureEnd = state.position;
	
	    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
	      throwError(state, 'unexpected end of the document within a single quoted scalar');
	
	    } else {
	      state.position++;
	      captureEnd = state.position;
	    }
	  }
	
	  throwError(state, 'unexpected end of the stream within a single quoted scalar');
	}
	
	function readDoubleQuotedScalar(state, nodeIndent) {
	  var captureStart,
	      captureEnd,
	      hexLength,
	      hexResult,
	      tmp,
	      ch;
	
	  ch = state.input.charCodeAt(state.position);
	
	  if (ch !== 0x22/* " */) {
	    return false;
	  }
	
	  state.kind = 'scalar';
	  state.result = '';
	  state.position++;
	  captureStart = captureEnd = state.position;
	
	  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
	    if (ch === 0x22/* " */) {
	      captureSegment(state, captureStart, state.position, true);
	      state.position++;
	      return true;
	
	    } else if (ch === 0x5C/* \ */) {
	      captureSegment(state, captureStart, state.position, true);
	      ch = state.input.charCodeAt(++state.position);
	
	      if (is_EOL(ch)) {
	        skipSeparationSpace(state, false, nodeIndent);
	
	        // TODO: rework to inline fn with no type cast?
	      } else if (ch < 256 && simpleEscapeCheck[ch]) {
	        state.result += simpleEscapeMap[ch];
	        state.position++;
	
	      } else if ((tmp = escapedHexLen(ch)) > 0) {
	        hexLength = tmp;
	        hexResult = 0;
	
	        for (; hexLength > 0; hexLength--) {
	          ch = state.input.charCodeAt(++state.position);
	
	          if ((tmp = fromHexCode(ch)) >= 0) {
	            hexResult = (hexResult << 4) + tmp;
	
	          } else {
	            throwError(state, 'expected hexadecimal character');
	          }
	        }
	
	        state.result += charFromCodepoint(hexResult);
	
	        state.position++;
	
	      } else {
	        throwError(state, 'unknown escape sequence');
	      }
	
	      captureStart = captureEnd = state.position;
	
	    } else if (is_EOL(ch)) {
	      captureSegment(state, captureStart, captureEnd, true);
	      writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
	      captureStart = captureEnd = state.position;
	
	    } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
	      throwError(state, 'unexpected end of the document within a double quoted scalar');
	
	    } else {
	      state.position++;
	      captureEnd = state.position;
	    }
	  }
	
	  throwError(state, 'unexpected end of the stream within a double quoted scalar');
	}
	
	function readFlowCollection(state, nodeIndent) {
	  var readNext = true,
	      _line,
	      _tag     = state.tag,
	      _result,
	      _anchor  = state.anchor,
	      following,
	      terminator,
	      isPair,
	      isExplicitPair,
	      isMapping,
	      overridableKeys = {},
	      keyNode,
	      keyTag,
	      valueNode,
	      ch;
	
	  ch = state.input.charCodeAt(state.position);
	
	  if (ch === 0x5B/* [ */) {
	    terminator = 0x5D;/* ] */
	    isMapping = false;
	    _result = [];
	  } else if (ch === 0x7B/* { */) {
	    terminator = 0x7D;/* } */
	    isMapping = true;
	    _result = {};
	  } else {
	    return false;
	  }
	
	  if (state.anchor !== null) {
	    state.anchorMap[state.anchor] = _result;
	  }
	
	  ch = state.input.charCodeAt(++state.position);
	
	  while (ch !== 0) {
	    skipSeparationSpace(state, true, nodeIndent);
	
	    ch = state.input.charCodeAt(state.position);
	
	    if (ch === terminator) {
	      state.position++;
	      state.tag = _tag;
	      state.anchor = _anchor;
	      state.kind = isMapping ? 'mapping' : 'sequence';
	      state.result = _result;
	      return true;
	    } else if (!readNext) {
	      throwError(state, 'missed comma between flow collection entries');
	    }
	
	    keyTag = keyNode = valueNode = null;
	    isPair = isExplicitPair = false;
	
	    if (ch === 0x3F/* ? */) {
	      following = state.input.charCodeAt(state.position + 1);
	
	      if (is_WS_OR_EOL(following)) {
	        isPair = isExplicitPair = true;
	        state.position++;
	        skipSeparationSpace(state, true, nodeIndent);
	      }
	    }
	
	    _line = state.line;
	    composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
	    keyTag = state.tag;
	    keyNode = state.result;
	    skipSeparationSpace(state, true, nodeIndent);
	
	    ch = state.input.charCodeAt(state.position);
	
	    if ((isExplicitPair || state.line === _line) && ch === 0x3A/* : */) {
	      isPair = true;
	      ch = state.input.charCodeAt(++state.position);
	      skipSeparationSpace(state, true, nodeIndent);
	      composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
	      valueNode = state.result;
	    }
	
	    if (isMapping) {
	      storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode);
	    } else if (isPair) {
	      _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode));
	    } else {
	      _result.push(keyNode);
	    }
	
	    skipSeparationSpace(state, true, nodeIndent);
	
	    ch = state.input.charCodeAt(state.position);
	
	    if (ch === 0x2C/* , */) {
	      readNext = true;
	      ch = state.input.charCodeAt(++state.position);
	    } else {
	      readNext = false;
	    }
	  }
	
	  throwError(state, 'unexpected end of the stream within a flow collection');
	}
	
	function readBlockScalar(state, nodeIndent) {
	  var captureStart,
	      folding,
	      chomping       = CHOMPING_CLIP,
	      didReadContent = false,
	      detectedIndent = false,
	      textIndent     = nodeIndent,
	      emptyLines     = 0,
	      atMoreIndented = false,
	      tmp,
	      ch;
	
	  ch = state.input.charCodeAt(state.position);
	
	  if (ch === 0x7C/* | */) {
	    folding = false;
	  } else if (ch === 0x3E/* > */) {
	    folding = true;
	  } else {
	    return false;
	  }
	
	  state.kind = 'scalar';
	  state.result = '';
	
	  while (ch !== 0) {
	    ch = state.input.charCodeAt(++state.position);
	
	    if (ch === 0x2B/* + */ || ch === 0x2D/* - */) {
	      if (CHOMPING_CLIP === chomping) {
	        chomping = (ch === 0x2B/* + */) ? CHOMPING_KEEP : CHOMPING_STRIP;
	      } else {
	        throwError(state, 'repeat of a chomping mode identifier');
	      }
	
	    } else if ((tmp = fromDecimalCode(ch)) >= 0) {
	      if (tmp === 0) {
	        throwError(state, 'bad explicit indentation width of a block scalar; it cannot be less than one');
	      } else if (!detectedIndent) {
	        textIndent = nodeIndent + tmp - 1;
	        detectedIndent = true;
	      } else {
	        throwError(state, 'repeat of an indentation width identifier');
	      }
	
	    } else {
	      break;
	    }
	  }
	
	  if (is_WHITE_SPACE(ch)) {
	    do { ch = state.input.charCodeAt(++state.position); }
	    while (is_WHITE_SPACE(ch));
	
	    if (ch === 0x23/* # */) {
	      do { ch = state.input.charCodeAt(++state.position); }
	      while (!is_EOL(ch) && (ch !== 0));
	    }
	  }
	
	  while (ch !== 0) {
	    readLineBreak(state);
	    state.lineIndent = 0;
	
	    ch = state.input.charCodeAt(state.position);
	
	    while ((!detectedIndent || state.lineIndent < textIndent) &&
	           (ch === 0x20/* Space */)) {
	      state.lineIndent++;
	      ch = state.input.charCodeAt(++state.position);
	    }
	
	    if (!detectedIndent && state.lineIndent > textIndent) {
	      textIndent = state.lineIndent;
	    }
	
	    if (is_EOL(ch)) {
	      emptyLines++;
	      continue;
	    }
	
	    // End of the scalar.
	    if (state.lineIndent < textIndent) {
	
	      // Perform the chomping.
	      if (chomping === CHOMPING_KEEP) {
	        state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);
	      } else if (chomping === CHOMPING_CLIP) {
	        if (didReadContent) { // i.e. only if the scalar is not empty.
	          state.result += '\n';
	        }
	      }
	
	      // Break this `while` cycle and go to the funciton's epilogue.
	      break;
	    }
	
	    // Folded style: use fancy rules to handle line breaks.
	    if (folding) {
	
	      // Lines starting with white space characters (more-indented lines) are not folded.
	      if (is_WHITE_SPACE(ch)) {
	        atMoreIndented = true;
	        // except for the first content line (cf. Example 8.1)
	        state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);
	
	      // End of more-indented block.
	      } else if (atMoreIndented) {
	        atMoreIndented = false;
	        state.result += common.repeat('\n', emptyLines + 1);
	
	      // Just one line break - perceive as the same line.
	      } else if (emptyLines === 0) {
	        if (didReadContent) { // i.e. only if we have already read some scalar content.
	          state.result += ' ';
	        }
	
	      // Several line breaks - perceive as different lines.
	      } else {
	        state.result += common.repeat('\n', emptyLines);
	      }
	
	    // Literal style: just add exact number of line breaks between content lines.
	    } else {
	      // Keep all line breaks except the header line break.
	      state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);
	    }
	
	    didReadContent = true;
	    detectedIndent = true;
	    emptyLines = 0;
	    captureStart = state.position;
	
	    while (!is_EOL(ch) && (ch !== 0)) {
	      ch = state.input.charCodeAt(++state.position);
	    }
	
	    captureSegment(state, captureStart, state.position, false);
	  }
	
	  return true;
	}
	
	function readBlockSequence(state, nodeIndent) {
	  var _line,
	      _tag      = state.tag,
	      _anchor   = state.anchor,
	      _result   = [],
	      following,
	      detected  = false,
	      ch;
	
	  if (state.anchor !== null) {
	    state.anchorMap[state.anchor] = _result;
	  }
	
	  ch = state.input.charCodeAt(state.position);
	
	  while (ch !== 0) {
	
	    if (ch !== 0x2D/* - */) {
	      break;
	    }
	
	    following = state.input.charCodeAt(state.position + 1);
	
	    if (!is_WS_OR_EOL(following)) {
	      break;
	    }
	
	    detected = true;
	    state.position++;
	
	    if (skipSeparationSpace(state, true, -1)) {
	      if (state.lineIndent <= nodeIndent) {
	        _result.push(null);
	        ch = state.input.charCodeAt(state.position);
	        continue;
	      }
	    }
	
	    _line = state.line;
	    composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
	    _result.push(state.result);
	    skipSeparationSpace(state, true, -1);
	
	    ch = state.input.charCodeAt(state.position);
	
	    if ((state.line === _line || state.lineIndent > nodeIndent) && (ch !== 0)) {
	      throwError(state, 'bad indentation of a sequence entry');
	    } else if (state.lineIndent < nodeIndent) {
	      break;
	    }
	  }
	
	  if (detected) {
	    state.tag = _tag;
	    state.anchor = _anchor;
	    state.kind = 'sequence';
	    state.result = _result;
	    return true;
	  }
	  return false;
	}
	
	function readBlockMapping(state, nodeIndent, flowIndent) {
	  var following,
	      allowCompact,
	      _line,
	      _tag          = state.tag,
	      _anchor       = state.anchor,
	      _result       = {},
	      overridableKeys = {},
	      keyTag        = null,
	      keyNode       = null,
	      valueNode     = null,
	      atExplicitKey = false,
	      detected      = false,
	      ch;
	
	  if (state.anchor !== null) {
	    state.anchorMap[state.anchor] = _result;
	  }
	
	  ch = state.input.charCodeAt(state.position);
	
	  while (ch !== 0) {
	    following = state.input.charCodeAt(state.position + 1);
	    _line = state.line; // Save the current line.
	
	    //
	    // Explicit notation case. There are two separate blocks:
	    // first for the key (denoted by "?") and second for the value (denoted by ":")
	    //
	    if ((ch === 0x3F/* ? */ || ch === 0x3A/* : */) && is_WS_OR_EOL(following)) {
	
	      if (ch === 0x3F/* ? */) {
	        if (atExplicitKey) {
	          storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
	          keyTag = keyNode = valueNode = null;
	        }
	
	        detected = true;
	        atExplicitKey = true;
	        allowCompact = true;
	
	      } else if (atExplicitKey) {
	        // i.e. 0x3A/* : */ === character after the explicit key.
	        atExplicitKey = false;
	        allowCompact = true;
	
	      } else {
	        throwError(state, 'incomplete explicit mapping pair; a key node is missed');
	      }
	
	      state.position += 1;
	      ch = following;
	
	    //
	    // Implicit notation case. Flow-style node as the key first, then ":", and the value.
	    //
	    } else if (composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
	
	      if (state.line === _line) {
	        ch = state.input.charCodeAt(state.position);
	
	        while (is_WHITE_SPACE(ch)) {
	          ch = state.input.charCodeAt(++state.position);
	        }
	
	        if (ch === 0x3A/* : */) {
	          ch = state.input.charCodeAt(++state.position);
	
	          if (!is_WS_OR_EOL(ch)) {
	            throwError(state, 'a whitespace character is expected after the key-value separator within a block mapping');
	          }
	
	          if (atExplicitKey) {
	            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
	            keyTag = keyNode = valueNode = null;
	          }
	
	          detected = true;
	          atExplicitKey = false;
	          allowCompact = false;
	          keyTag = state.tag;
	          keyNode = state.result;
	
	        } else if (detected) {
	          throwError(state, 'can not read an implicit mapping pair; a colon is missed');
	
	        } else {
	          state.tag = _tag;
	          state.anchor = _anchor;
	          return true; // Keep the result of `composeNode`.
	        }
	
	      } else if (detected) {
	        throwError(state, 'can not read a block mapping entry; a multiline key may not be an implicit key');
	
	      } else {
	        state.tag = _tag;
	        state.anchor = _anchor;
	        return true; // Keep the result of `composeNode`.
	      }
	
	    } else {
	      break; // Reading is done. Go to the epilogue.
	    }
	
	    //
	    // Common reading code for both explicit and implicit notations.
	    //
	    if (state.line === _line || state.lineIndent > nodeIndent) {
	      if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
	        if (atExplicitKey) {
	          keyNode = state.result;
	        } else {
	          valueNode = state.result;
	        }
	      }
	
	      if (!atExplicitKey) {
	        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode);
	        keyTag = keyNode = valueNode = null;
	      }
	
	      skipSeparationSpace(state, true, -1);
	      ch = state.input.charCodeAt(state.position);
	    }
	
	    if (state.lineIndent > nodeIndent && (ch !== 0)) {
	      throwError(state, 'bad indentation of a mapping entry');
	    } else if (state.lineIndent < nodeIndent) {
	      break;
	    }
	  }
	
	  //
	  // Epilogue.
	  //
	
	  // Special case: last mapping's node contains only the key in explicit notation.
	  if (atExplicitKey) {
	    storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
	  }
	
	  // Expose the resulting mapping.
	  if (detected) {
	    state.tag = _tag;
	    state.anchor = _anchor;
	    state.kind = 'mapping';
	    state.result = _result;
	  }
	
	  return detected;
	}
	
	function readTagProperty(state) {
	  var _position,
	      isVerbatim = false,
	      isNamed    = false,
	      tagHandle,
	      tagName,
	      ch;
	
	  ch = state.input.charCodeAt(state.position);
	
	  if (ch !== 0x21/* ! */) return false;
	
	  if (state.tag !== null) {
	    throwError(state, 'duplication of a tag property');
	  }
	
	  ch = state.input.charCodeAt(++state.position);
	
	  if (ch === 0x3C/* < */) {
	    isVerbatim = true;
	    ch = state.input.charCodeAt(++state.position);
	
	  } else if (ch === 0x21/* ! */) {
	    isNamed = true;
	    tagHandle = '!!';
	    ch = state.input.charCodeAt(++state.position);
	
	  } else {
	    tagHandle = '!';
	  }
	
	  _position = state.position;
	
	  if (isVerbatim) {
	    do { ch = state.input.charCodeAt(++state.position); }
	    while (ch !== 0 && ch !== 0x3E/* > */);
	
	    if (state.position < state.length) {
	      tagName = state.input.slice(_position, state.position);
	      ch = state.input.charCodeAt(++state.position);
	    } else {
	      throwError(state, 'unexpected end of the stream within a verbatim tag');
	    }
	  } else {
	    while (ch !== 0 && !is_WS_OR_EOL(ch)) {
	
	      if (ch === 0x21/* ! */) {
	        if (!isNamed) {
	          tagHandle = state.input.slice(_position - 1, state.position + 1);
	
	          if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
	            throwError(state, 'named tag handle cannot contain such characters');
	          }
	
	          isNamed = true;
	          _position = state.position + 1;
	        } else {
	          throwError(state, 'tag suffix cannot contain exclamation marks');
	        }
	      }
	
	      ch = state.input.charCodeAt(++state.position);
	    }
	
	    tagName = state.input.slice(_position, state.position);
	
	    if (PATTERN_FLOW_INDICATORS.test(tagName)) {
	      throwError(state, 'tag suffix cannot contain flow indicator characters');
	    }
	  }
	
	  if (tagName && !PATTERN_TAG_URI.test(tagName)) {
	    throwError(state, 'tag name cannot contain such characters: ' + tagName);
	  }
	
	  if (isVerbatim) {
	    state.tag = tagName;
	
	  } else if (_hasOwnProperty.call(state.tagMap, tagHandle)) {
	    state.tag = state.tagMap[tagHandle] + tagName;
	
	  } else if (tagHandle === '!') {
	    state.tag = '!' + tagName;
	
	  } else if (tagHandle === '!!') {
	    state.tag = 'tag:yaml.org,2002:' + tagName;
	
	  } else {
	    throwError(state, 'undeclared tag handle "' + tagHandle + '"');
	  }
	
	  return true;
	}
	
	function readAnchorProperty(state) {
	  var _position,
	      ch;
	
	  ch = state.input.charCodeAt(state.position);
	
	  if (ch !== 0x26/* & */) return false;
	
	  if (state.anchor !== null) {
	    throwError(state, 'duplication of an anchor property');
	  }
	
	  ch = state.input.charCodeAt(++state.position);
	  _position = state.position;
	
	  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
	    ch = state.input.charCodeAt(++state.position);
	  }
	
	  if (state.position === _position) {
	    throwError(state, 'name of an anchor node must contain at least one character');
	  }
	
	  state.anchor = state.input.slice(_position, state.position);
	  return true;
	}
	
	function readAlias(state) {
	  var _position, alias,
	      ch;
	
	  ch = state.input.charCodeAt(state.position);
	
	  if (ch !== 0x2A/* * */) return false;
	
	  ch = state.input.charCodeAt(++state.position);
	  _position = state.position;
	
	  while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
	    ch = state.input.charCodeAt(++state.position);
	  }
	
	  if (state.position === _position) {
	    throwError(state, 'name of an alias node must contain at least one character');
	  }
	
	  alias = state.input.slice(_position, state.position);
	
	  if (!state.anchorMap.hasOwnProperty(alias)) {
	    throwError(state, 'unidentified alias "' + alias + '"');
	  }
	
	  state.result = state.anchorMap[alias];
	  skipSeparationSpace(state, true, -1);
	  return true;
	}
	
	function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
	  var allowBlockStyles,
	      allowBlockScalars,
	      allowBlockCollections,
	      indentStatus = 1, // 1: this>parent, 0: this=parent, -1: this<parent
	      atNewLine  = false,
	      hasContent = false,
	      typeIndex,
	      typeQuantity,
	      type,
	      flowIndent,
	      blockIndent;
	
	  if (state.listener !== null) {
	    state.listener('open', state);
	  }
	
	  state.tag    = null;
	  state.anchor = null;
	  state.kind   = null;
	  state.result = null;
	
	  allowBlockStyles = allowBlockScalars = allowBlockCollections =
	    CONTEXT_BLOCK_OUT === nodeContext ||
	    CONTEXT_BLOCK_IN  === nodeContext;
	
	  if (allowToSeek) {
	    if (skipSeparationSpace(state, true, -1)) {
	      atNewLine = true;
	
	      if (state.lineIndent > parentIndent) {
	        indentStatus = 1;
	      } else if (state.lineIndent === parentIndent) {
	        indentStatus = 0;
	      } else if (state.lineIndent < parentIndent) {
	        indentStatus = -1;
	      }
	    }
	  }
	
	  if (indentStatus === 1) {
	    while (readTagProperty(state) || readAnchorProperty(state)) {
	      if (skipSeparationSpace(state, true, -1)) {
	        atNewLine = true;
	        allowBlockCollections = allowBlockStyles;
	
	        if (state.lineIndent > parentIndent) {
	          indentStatus = 1;
	        } else if (state.lineIndent === parentIndent) {
	          indentStatus = 0;
	        } else if (state.lineIndent < parentIndent) {
	          indentStatus = -1;
	        }
	      } else {
	        allowBlockCollections = false;
	      }
	    }
	  }
	
	  if (allowBlockCollections) {
	    allowBlockCollections = atNewLine || allowCompact;
	  }
	
	  if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
	    if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
	      flowIndent = parentIndent;
	    } else {
	      flowIndent = parentIndent + 1;
	    }
	
	    blockIndent = state.position - state.lineStart;
	
	    if (indentStatus === 1) {
	      if (allowBlockCollections &&
	          (readBlockSequence(state, blockIndent) ||
	           readBlockMapping(state, blockIndent, flowIndent)) ||
	          readFlowCollection(state, flowIndent)) {
	        hasContent = true;
	      } else {
	        if ((allowBlockScalars && readBlockScalar(state, flowIndent)) ||
	            readSingleQuotedScalar(state, flowIndent) ||
	            readDoubleQuotedScalar(state, flowIndent)) {
	          hasContent = true;
	
	        } else if (readAlias(state)) {
	          hasContent = true;
	
	          if (state.tag !== null || state.anchor !== null) {
	            throwError(state, 'alias node should not have any properties');
	          }
	
	        } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
	          hasContent = true;
	
	          if (state.tag === null) {
	            state.tag = '?';
	          }
	        }
	
	        if (state.anchor !== null) {
	          state.anchorMap[state.anchor] = state.result;
	        }
	      }
	    } else if (indentStatus === 0) {
	      // Special case: block sequences are allowed to have same indentation level as the parent.
	      // http://www.yaml.org/spec/1.2/spec.html#id2799784
	      hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
	    }
	  }
	
	  if (state.tag !== null && state.tag !== '!') {
	    if (state.tag === '?') {
	      for (typeIndex = 0, typeQuantity = state.implicitTypes.length;
	           typeIndex < typeQuantity;
	           typeIndex += 1) {
	        type = state.implicitTypes[typeIndex];
	
	        // Implicit resolving is not allowed for non-scalar types, and '?'
	        // non-specific tag is only assigned to plain scalars. So, it isn't
	        // needed to check for 'kind' conformity.
	
	        if (type.resolve(state.result)) { // `state.result` updated in resolver if matched
	          state.result = type.construct(state.result);
	          state.tag = type.tag;
	          if (state.anchor !== null) {
	            state.anchorMap[state.anchor] = state.result;
	          }
	          break;
	        }
	      }
	    } else if (_hasOwnProperty.call(state.typeMap, state.tag)) {
	      type = state.typeMap[state.tag];
	
	      if (state.result !== null && type.kind !== state.kind) {
	        throwError(state, 'unacceptable node kind for !<' + state.tag + '> tag; it should be "' + type.kind + '", not "' + state.kind + '"');
	      }
	
	      if (!type.resolve(state.result)) { // `state.result` updated in resolver if matched
	        throwError(state, 'cannot resolve a node with !<' + state.tag + '> explicit tag');
	      } else {
	        state.result = type.construct(state.result);
	        if (state.anchor !== null) {
	          state.anchorMap[state.anchor] = state.result;
	        }
	      }
	    } else {
	      throwError(state, 'unknown tag !<' + state.tag + '>');
	    }
	  }
	
	  if (state.listener !== null) {
	    state.listener('close', state);
	  }
	  return state.tag !== null ||  state.anchor !== null || hasContent;
	}
	
	function readDocument(state) {
	  var documentStart = state.position,
	      _position,
	      directiveName,
	      directiveArgs,
	      hasDirectives = false,
	      ch;
	
	  state.version = null;
	  state.checkLineBreaks = state.legacy;
	  state.tagMap = {};
	  state.anchorMap = {};
	
	  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
	    skipSeparationSpace(state, true, -1);
	
	    ch = state.input.charCodeAt(state.position);
	
	    if (state.lineIndent > 0 || ch !== 0x25/* % */) {
	      break;
	    }
	
	    hasDirectives = true;
	    ch = state.input.charCodeAt(++state.position);
	    _position = state.position;
	
	    while (ch !== 0 && !is_WS_OR_EOL(ch)) {
	      ch = state.input.charCodeAt(++state.position);
	    }
	
	    directiveName = state.input.slice(_position, state.position);
	    directiveArgs = [];
	
	    if (directiveName.length < 1) {
	      throwError(state, 'directive name must not be less than one character in length');
	    }
	
	    while (ch !== 0) {
	      while (is_WHITE_SPACE(ch)) {
	        ch = state.input.charCodeAt(++state.position);
	      }
	
	      if (ch === 0x23/* # */) {
	        do { ch = state.input.charCodeAt(++state.position); }
	        while (ch !== 0 && !is_EOL(ch));
	        break;
	      }
	
	      if (is_EOL(ch)) break;
	
	      _position = state.position;
	
	      while (ch !== 0 && !is_WS_OR_EOL(ch)) {
	        ch = state.input.charCodeAt(++state.position);
	      }
	
	      directiveArgs.push(state.input.slice(_position, state.position));
	    }
	
	    if (ch !== 0) readLineBreak(state);
	
	    if (_hasOwnProperty.call(directiveHandlers, directiveName)) {
	      directiveHandlers[directiveName](state, directiveName, directiveArgs);
	    } else {
	      throwWarning(state, 'unknown document directive "' + directiveName + '"');
	    }
	  }
	
	  skipSeparationSpace(state, true, -1);
	
	  if (state.lineIndent === 0 &&
	      state.input.charCodeAt(state.position)     === 0x2D/* - */ &&
	      state.input.charCodeAt(state.position + 1) === 0x2D/* - */ &&
	      state.input.charCodeAt(state.position + 2) === 0x2D/* - */) {
	    state.position += 3;
	    skipSeparationSpace(state, true, -1);
	
	  } else if (hasDirectives) {
	    throwError(state, 'directives end mark is expected');
	  }
	
	  composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
	  skipSeparationSpace(state, true, -1);
	
	  if (state.checkLineBreaks &&
	      PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
	    throwWarning(state, 'non-ASCII line breaks are interpreted as content');
	  }
	
	  state.documents.push(state.result);
	
	  if (state.position === state.lineStart && testDocumentSeparator(state)) {
	
	    if (state.input.charCodeAt(state.position) === 0x2E/* . */) {
	      state.position += 3;
	      skipSeparationSpace(state, true, -1);
	    }
	    return;
	  }
	
	  if (state.position < (state.length - 1)) {
	    throwError(state, 'end of the stream or a document separator is expected');
	  } else {
	    return;
	  }
	}
	
	
	function loadDocuments(input, options) {
	  input = String(input);
	  options = options || {};
	
	  if (input.length !== 0) {
	
	    // Add tailing `\n` if not exists
	    if (input.charCodeAt(input.length - 1) !== 0x0A/* LF */ &&
	        input.charCodeAt(input.length - 1) !== 0x0D/* CR */) {
	      input += '\n';
	    }
	
	    // Strip BOM
	    if (input.charCodeAt(0) === 0xFEFF) {
	      input = input.slice(1);
	    }
	  }
	
	  var state = new State(input, options);
	
	  // Use 0 as string terminator. That significantly simplifies bounds check.
	  state.input += '\0';
	
	  while (state.input.charCodeAt(state.position) === 0x20/* Space */) {
	    state.lineIndent += 1;
	    state.position += 1;
	  }
	
	  while (state.position < (state.length - 1)) {
	    readDocument(state);
	  }
	
	  return state.documents;
	}
	
	
	function loadAll(input, iterator, options) {
	  var documents = loadDocuments(input, options), index, length;
	
	  for (index = 0, length = documents.length; index < length; index += 1) {
	    iterator(documents[index]);
	  }
	}
	
	
	function load(input, options) {
	  var documents = loadDocuments(input, options);
	
	  if (documents.length === 0) {
	    /*eslint-disable no-undefined*/
	    return undefined;
	  } else if (documents.length === 1) {
	    return documents[0];
	  }
	  throw new YAMLException('expected a single document in the stream, but found more');
	}
	
	
	function safeLoadAll(input, output, options) {
	  loadAll(input, output, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options));
	}
	
	
	function safeLoad(input, options) {
	  return load(input, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options));
	}
	
	
	module.exports.loadAll     = loadAll;
	module.exports.load        = load;
	module.exports.safeLoadAll = safeLoadAll;
	module.exports.safeLoad    = safeLoad;


/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	
	function isNothing(subject) {
	  return (typeof subject === 'undefined') || (subject === null);
	}
	
	
	function isObject(subject) {
	  return (typeof subject === 'object') && (subject !== null);
	}
	
	
	function toArray(sequence) {
	  if (Array.isArray(sequence)) return sequence;
	  else if (isNothing(sequence)) return [];
	
	  return [ sequence ];
	}
	
	
	function extend(target, source) {
	  var index, length, key, sourceKeys;
	
	  if (source) {
	    sourceKeys = Object.keys(source);
	
	    for (index = 0, length = sourceKeys.length; index < length; index += 1) {
	      key = sourceKeys[index];
	      target[key] = source[key];
	    }
	  }
	
	  return target;
	}
	
	
	function repeat(string, count) {
	  var result = '', cycle;
	
	  for (cycle = 0; cycle < count; cycle += 1) {
	    result += string;
	  }
	
	  return result;
	}
	
	
	function isNegativeZero(number) {
	  return (number === 0) && (Number.NEGATIVE_INFINITY === 1 / number);
	}
	
	
	module.exports.isNothing      = isNothing;
	module.exports.isObject       = isObject;
	module.exports.toArray        = toArray;
	module.exports.repeat         = repeat;
	module.exports.isNegativeZero = isNegativeZero;
	module.exports.extend         = extend;


/***/ },
/* 10 */
/***/ function(module, exports) {

	// YAML error class. http://stackoverflow.com/questions/8458984
	//
	'use strict';
	
	function YAMLException(reason, mark) {
	  // Super constructor
	  Error.call(this);
	
	  // Include stack trace in error object
	  if (Error.captureStackTrace) {
	    // Chrome and NodeJS
	    Error.captureStackTrace(this, this.constructor);
	  } else {
	    // FF, IE 10+ and Safari 6+. Fallback for others
	    this.stack = (new Error()).stack || '';
	  }
	
	  this.name = 'YAMLException';
	  this.reason = reason;
	  this.mark = mark;
	  this.message = (this.reason || '(unknown reason)') + (this.mark ? ' ' + this.mark.toString() : '');
	}
	
	
	// Inherit from Error
	YAMLException.prototype = Object.create(Error.prototype);
	YAMLException.prototype.constructor = YAMLException;
	
	
	YAMLException.prototype.toString = function toString(compact) {
	  var result = this.name + ': ';
	
	  result += this.reason || '(unknown reason)';
	
	  if (!compact && this.mark) {
	    result += ' ' + this.mark.toString();
	  }
	
	  return result;
	};
	
	
	module.exports = YAMLException;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	
	var common = __webpack_require__(9);
	
	
	function Mark(name, buffer, position, line, column) {
	  this.name     = name;
	  this.buffer   = buffer;
	  this.position = position;
	  this.line     = line;
	  this.column   = column;
	}
	
	
	Mark.prototype.getSnippet = function getSnippet(indent, maxLength) {
	  var head, start, tail, end, snippet;
	
	  if (!this.buffer) return null;
	
	  indent = indent || 4;
	  maxLength = maxLength || 75;
	
	  head = '';
	  start = this.position;
	
	  while (start > 0 && '\x00\r\n\x85\u2028\u2029'.indexOf(this.buffer.charAt(start - 1)) === -1) {
	    start -= 1;
	    if (this.position - start > (maxLength / 2 - 1)) {
	      head = ' ... ';
	      start += 5;
	      break;
	    }
	  }
	
	  tail = '';
	  end = this.position;
	
	  while (end < this.buffer.length && '\x00\r\n\x85\u2028\u2029'.indexOf(this.buffer.charAt(end)) === -1) {
	    end += 1;
	    if (end - this.position > (maxLength / 2 - 1)) {
	      tail = ' ... ';
	      end -= 5;
	      break;
	    }
	  }
	
	  snippet = this.buffer.slice(start, end);
	
	  return common.repeat(' ', indent) + head + snippet + tail + '\n' +
	         common.repeat(' ', indent + this.position - start + head.length) + '^';
	};
	
	
	Mark.prototype.toString = function toString(compact) {
	  var snippet, where = '';
	
	  if (this.name) {
	    where += 'in "' + this.name + '" ';
	  }
	
	  where += 'at line ' + (this.line + 1) + ', column ' + (this.column + 1);
	
	  if (!compact) {
	    snippet = this.getSnippet();
	
	    if (snippet) {
	      where += ':\n' + snippet;
	    }
	  }
	
	  return where;
	};
	
	
	module.exports = Mark;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// JS-YAML's default schema for `safeLoad` function.
	// It is not described in the YAML specification.
	//
	// This schema is based on standard YAML's Core schema and includes most of
	// extra types described at YAML tag repository. (http://yaml.org/type/)
	
	
	'use strict';
	
	
	var Schema = __webpack_require__(13);
	
	
	module.exports = new Schema({
	  include: [
	    __webpack_require__(15)
	  ],
	  implicit: [
	    __webpack_require__(25),
	    __webpack_require__(26)
	  ],
	  explicit: [
	    __webpack_require__(27),
	    __webpack_require__(28),
	    __webpack_require__(29),
	    __webpack_require__(30)
	  ]
	});


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/*eslint-disable max-len*/
	
	var common        = __webpack_require__(9);
	var YAMLException = __webpack_require__(10);
	var Type          = __webpack_require__(14);
	
	
	function compileList(schema, name, result) {
	  var exclude = [];
	
	  schema.include.forEach(function (includedSchema) {
	    result = compileList(includedSchema, name, result);
	  });
	
	  schema[name].forEach(function (currentType) {
	    result.forEach(function (previousType, previousIndex) {
	      if (previousType.tag === currentType.tag) {
	        exclude.push(previousIndex);
	      }
	    });
	
	    result.push(currentType);
	  });
	
	  return result.filter(function (type, index) {
	    return exclude.indexOf(index) === -1;
	  });
	}
	
	
	function compileMap(/* lists... */) {
	  var result = {}, index, length;
	
	  function collectType(type) {
	    result[type.tag] = type;
	  }
	
	  for (index = 0, length = arguments.length; index < length; index += 1) {
	    arguments[index].forEach(collectType);
	  }
	
	  return result;
	}
	
	
	function Schema(definition) {
	  this.include  = definition.include  || [];
	  this.implicit = definition.implicit || [];
	  this.explicit = definition.explicit || [];
	
	  this.implicit.forEach(function (type) {
	    if (type.loadKind && type.loadKind !== 'scalar') {
	      throw new YAMLException('There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.');
	    }
	  });
	
	  this.compiledImplicit = compileList(this, 'implicit', []);
	  this.compiledExplicit = compileList(this, 'explicit', []);
	  this.compiledTypeMap  = compileMap(this.compiledImplicit, this.compiledExplicit);
	}
	
	
	Schema.DEFAULT = null;
	
	
	Schema.create = function createSchema() {
	  var schemas, types;
	
	  switch (arguments.length) {
	    case 1:
	      schemas = Schema.DEFAULT;
	      types = arguments[0];
	      break;
	
	    case 2:
	      schemas = arguments[0];
	      types = arguments[1];
	      break;
	
	    default:
	      throw new YAMLException('Wrong number of arguments for Schema.create function');
	  }
	
	  schemas = common.toArray(schemas);
	  types = common.toArray(types);
	
	  if (!schemas.every(function (schema) { return schema instanceof Schema; })) {
	    throw new YAMLException('Specified list of super schemas (or a single Schema object) contains a non-Schema object.');
	  }
	
	  if (!types.every(function (type) { return type instanceof Type; })) {
	    throw new YAMLException('Specified list of YAML types (or a single Type object) contains a non-Type object.');
	  }
	
	  return new Schema({
	    include: schemas,
	    explicit: types
	  });
	};
	
	
	module.exports = Schema;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var YAMLException = __webpack_require__(10);
	
	var TYPE_CONSTRUCTOR_OPTIONS = [
	  'kind',
	  'resolve',
	  'construct',
	  'instanceOf',
	  'predicate',
	  'represent',
	  'defaultStyle',
	  'styleAliases'
	];
	
	var YAML_NODE_KINDS = [
	  'scalar',
	  'sequence',
	  'mapping'
	];
	
	function compileStyleAliases(map) {
	  var result = {};
	
	  if (map !== null) {
	    Object.keys(map).forEach(function (style) {
	      map[style].forEach(function (alias) {
	        result[String(alias)] = style;
	      });
	    });
	  }
	
	  return result;
	}
	
	function Type(tag, options) {
	  options = options || {};
	
	  Object.keys(options).forEach(function (name) {
	    if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
	      throw new YAMLException('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
	    }
	  });
	
	  // TODO: Add tag format check.
	  this.tag          = tag;
	  this.kind         = options['kind']         || null;
	  this.resolve      = options['resolve']      || function () { return true; };
	  this.construct    = options['construct']    || function (data) { return data; };
	  this.instanceOf   = options['instanceOf']   || null;
	  this.predicate    = options['predicate']    || null;
	  this.represent    = options['represent']    || null;
	  this.defaultStyle = options['defaultStyle'] || null;
	  this.styleAliases = compileStyleAliases(options['styleAliases'] || null);
	
	  if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
	    throw new YAMLException('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
	  }
	}
	
	module.exports = Type;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// Standard YAML's Core schema.
	// http://www.yaml.org/spec/1.2/spec.html#id2804923
	//
	// NOTE: JS-YAML does not support schema-specific tag resolution restrictions.
	// So, Core schema has no distinctions from JSON schema is JS-YAML.
	
	
	'use strict';
	
	
	var Schema = __webpack_require__(13);
	
	
	module.exports = new Schema({
	  include: [
	    __webpack_require__(16)
	  ]
	});


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// Standard YAML's JSON schema.
	// http://www.yaml.org/spec/1.2/spec.html#id2803231
	//
	// NOTE: JS-YAML does not support schema-specific tag resolution restrictions.
	// So, this schema is not such strict as defined in the YAML specification.
	// It allows numbers in binary notaion, use `Null` and `NULL` as `null`, etc.
	
	
	'use strict';
	
	
	var Schema = __webpack_require__(13);
	
	
	module.exports = new Schema({
	  include: [
	    __webpack_require__(17)
	  ],
	  implicit: [
	    __webpack_require__(21),
	    __webpack_require__(22),
	    __webpack_require__(23),
	    __webpack_require__(24)
	  ]
	});


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// Standard YAML's Failsafe schema.
	// http://www.yaml.org/spec/1.2/spec.html#id2802346
	
	
	'use strict';
	
	
	var Schema = __webpack_require__(13);
	
	
	module.exports = new Schema({
	  explicit: [
	    __webpack_require__(18),
	    __webpack_require__(19),
	    __webpack_require__(20)
	  ]
	});


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Type = __webpack_require__(14);
	
	module.exports = new Type('tag:yaml.org,2002:str', {
	  kind: 'scalar',
	  construct: function (data) { return data !== null ? data : ''; }
	});


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Type = __webpack_require__(14);
	
	module.exports = new Type('tag:yaml.org,2002:seq', {
	  kind: 'sequence',
	  construct: function (data) { return data !== null ? data : []; }
	});


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Type = __webpack_require__(14);
	
	module.exports = new Type('tag:yaml.org,2002:map', {
	  kind: 'mapping',
	  construct: function (data) { return data !== null ? data : {}; }
	});


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Type = __webpack_require__(14);
	
	function resolveYamlNull(data) {
	  if (data === null) return true;
	
	  var max = data.length;
	
	  return (max === 1 && data === '~') ||
	         (max === 4 && (data === 'null' || data === 'Null' || data === 'NULL'));
	}
	
	function constructYamlNull() {
	  return null;
	}
	
	function isNull(object) {
	  return object === null;
	}
	
	module.exports = new Type('tag:yaml.org,2002:null', {
	  kind: 'scalar',
	  resolve: resolveYamlNull,
	  construct: constructYamlNull,
	  predicate: isNull,
	  represent: {
	    canonical: function () { return '~';    },
	    lowercase: function () { return 'null'; },
	    uppercase: function () { return 'NULL'; },
	    camelcase: function () { return 'Null'; }
	  },
	  defaultStyle: 'lowercase'
	});


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Type = __webpack_require__(14);
	
	function resolveYamlBoolean(data) {
	  if (data === null) return false;
	
	  var max = data.length;
	
	  return (max === 4 && (data === 'true' || data === 'True' || data === 'TRUE')) ||
	         (max === 5 && (data === 'false' || data === 'False' || data === 'FALSE'));
	}
	
	function constructYamlBoolean(data) {
	  return data === 'true' ||
	         data === 'True' ||
	         data === 'TRUE';
	}
	
	function isBoolean(object) {
	  return Object.prototype.toString.call(object) === '[object Boolean]';
	}
	
	module.exports = new Type('tag:yaml.org,2002:bool', {
	  kind: 'scalar',
	  resolve: resolveYamlBoolean,
	  construct: constructYamlBoolean,
	  predicate: isBoolean,
	  represent: {
	    lowercase: function (object) { return object ? 'true' : 'false'; },
	    uppercase: function (object) { return object ? 'TRUE' : 'FALSE'; },
	    camelcase: function (object) { return object ? 'True' : 'False'; }
	  },
	  defaultStyle: 'lowercase'
	});


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var common = __webpack_require__(9);
	var Type   = __webpack_require__(14);
	
	function isHexCode(c) {
	  return ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) ||
	         ((0x41/* A */ <= c) && (c <= 0x46/* F */)) ||
	         ((0x61/* a */ <= c) && (c <= 0x66/* f */));
	}
	
	function isOctCode(c) {
	  return ((0x30/* 0 */ <= c) && (c <= 0x37/* 7 */));
	}
	
	function isDecCode(c) {
	  return ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */));
	}
	
	function resolveYamlInteger(data) {
	  if (data === null) return false;
	
	  var max = data.length,
	      index = 0,
	      hasDigits = false,
	      ch;
	
	  if (!max) return false;
	
	  ch = data[index];
	
	  // sign
	  if (ch === '-' || ch === '+') {
	    ch = data[++index];
	  }
	
	  if (ch === '0') {
	    // 0
	    if (index + 1 === max) return true;
	    ch = data[++index];
	
	    // base 2, base 8, base 16
	
	    if (ch === 'b') {
	      // base 2
	      index++;
	
	      for (; index < max; index++) {
	        ch = data[index];
	        if (ch === '_') continue;
	        if (ch !== '0' && ch !== '1') return false;
	        hasDigits = true;
	      }
	      return hasDigits;
	    }
	
	
	    if (ch === 'x') {
	      // base 16
	      index++;
	
	      for (; index < max; index++) {
	        ch = data[index];
	        if (ch === '_') continue;
	        if (!isHexCode(data.charCodeAt(index))) return false;
	        hasDigits = true;
	      }
	      return hasDigits;
	    }
	
	    // base 8
	    for (; index < max; index++) {
	      ch = data[index];
	      if (ch === '_') continue;
	      if (!isOctCode(data.charCodeAt(index))) return false;
	      hasDigits = true;
	    }
	    return hasDigits;
	  }
	
	  // base 10 (except 0) or base 60
	
	  for (; index < max; index++) {
	    ch = data[index];
	    if (ch === '_') continue;
	    if (ch === ':') break;
	    if (!isDecCode(data.charCodeAt(index))) {
	      return false;
	    }
	    hasDigits = true;
	  }
	
	  if (!hasDigits) return false;
	
	  // if !base60 - done;
	  if (ch !== ':') return true;
	
	  // base60 almost not used, no needs to optimize
	  return /^(:[0-5]?[0-9])+$/.test(data.slice(index));
	}
	
	function constructYamlInteger(data) {
	  var value = data, sign = 1, ch, base, digits = [];
	
	  if (value.indexOf('_') !== -1) {
	    value = value.replace(/_/g, '');
	  }
	
	  ch = value[0];
	
	  if (ch === '-' || ch === '+') {
	    if (ch === '-') sign = -1;
	    value = value.slice(1);
	    ch = value[0];
	  }
	
	  if (value === '0') return 0;
	
	  if (ch === '0') {
	    if (value[1] === 'b') return sign * parseInt(value.slice(2), 2);
	    if (value[1] === 'x') return sign * parseInt(value, 16);
	    return sign * parseInt(value, 8);
	  }
	
	  if (value.indexOf(':') !== -1) {
	    value.split(':').forEach(function (v) {
	      digits.unshift(parseInt(v, 10));
	    });
	
	    value = 0;
	    base = 1;
	
	    digits.forEach(function (d) {
	      value += (d * base);
	      base *= 60;
	    });
	
	    return sign * value;
	
	  }
	
	  return sign * parseInt(value, 10);
	}
	
	function isInteger(object) {
	  return (Object.prototype.toString.call(object)) === '[object Number]' &&
	         (object % 1 === 0 && !common.isNegativeZero(object));
	}
	
	module.exports = new Type('tag:yaml.org,2002:int', {
	  kind: 'scalar',
	  resolve: resolveYamlInteger,
	  construct: constructYamlInteger,
	  predicate: isInteger,
	  represent: {
	    binary:      function (object) { return '0b' + object.toString(2); },
	    octal:       function (object) { return '0'  + object.toString(8); },
	    decimal:     function (object) { return        object.toString(10); },
	    hexadecimal: function (object) { return '0x' + object.toString(16).toUpperCase(); }
	  },
	  defaultStyle: 'decimal',
	  styleAliases: {
	    binary:      [ 2,  'bin' ],
	    octal:       [ 8,  'oct' ],
	    decimal:     [ 10, 'dec' ],
	    hexadecimal: [ 16, 'hex' ]
	  }
	});


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var common = __webpack_require__(9);
	var Type   = __webpack_require__(14);
	
	var YAML_FLOAT_PATTERN = new RegExp(
	  '^(?:[-+]?(?:[0-9][0-9_]*)\\.[0-9_]*(?:[eE][-+][0-9]+)?' +
	  '|\\.[0-9_]+(?:[eE][-+][0-9]+)?' +
	  '|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*' +
	  '|[-+]?\\.(?:inf|Inf|INF)' +
	  '|\\.(?:nan|NaN|NAN))$');
	
	function resolveYamlFloat(data) {
	  if (data === null) return false;
	
	  if (!YAML_FLOAT_PATTERN.test(data)) return false;
	
	  return true;
	}
	
	function constructYamlFloat(data) {
	  var value, sign, base, digits;
	
	  value  = data.replace(/_/g, '').toLowerCase();
	  sign   = value[0] === '-' ? -1 : 1;
	  digits = [];
	
	  if ('+-'.indexOf(value[0]) >= 0) {
	    value = value.slice(1);
	  }
	
	  if (value === '.inf') {
	    return (sign === 1) ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
	
	  } else if (value === '.nan') {
	    return NaN;
	
	  } else if (value.indexOf(':') >= 0) {
	    value.split(':').forEach(function (v) {
	      digits.unshift(parseFloat(v, 10));
	    });
	
	    value = 0.0;
	    base = 1;
	
	    digits.forEach(function (d) {
	      value += d * base;
	      base *= 60;
	    });
	
	    return sign * value;
	
	  }
	  return sign * parseFloat(value, 10);
	}
	
	
	var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
	
	function representYamlFloat(object, style) {
	  var res;
	
	  if (isNaN(object)) {
	    switch (style) {
	      case 'lowercase': return '.nan';
	      case 'uppercase': return '.NAN';
	      case 'camelcase': return '.NaN';
	    }
	  } else if (Number.POSITIVE_INFINITY === object) {
	    switch (style) {
	      case 'lowercase': return '.inf';
	      case 'uppercase': return '.INF';
	      case 'camelcase': return '.Inf';
	    }
	  } else if (Number.NEGATIVE_INFINITY === object) {
	    switch (style) {
	      case 'lowercase': return '-.inf';
	      case 'uppercase': return '-.INF';
	      case 'camelcase': return '-.Inf';
	    }
	  } else if (common.isNegativeZero(object)) {
	    return '-0.0';
	  }
	
	  res = object.toString(10);
	
	  // JS stringifier can build scientific format without dots: 5e-100,
	  // while YAML requres dot: 5.e-100. Fix it with simple hack
	
	  return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace('e', '.e') : res;
	}
	
	function isFloat(object) {
	  return (Object.prototype.toString.call(object) === '[object Number]') &&
	         (object % 1 !== 0 || common.isNegativeZero(object));
	}
	
	module.exports = new Type('tag:yaml.org,2002:float', {
	  kind: 'scalar',
	  resolve: resolveYamlFloat,
	  construct: constructYamlFloat,
	  predicate: isFloat,
	  represent: representYamlFloat,
	  defaultStyle: 'lowercase'
	});


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Type = __webpack_require__(14);
	
	var YAML_DATE_REGEXP = new RegExp(
	  '^([0-9][0-9][0-9][0-9])'          + // [1] year
	  '-([0-9][0-9])'                    + // [2] month
	  '-([0-9][0-9])$');                   // [3] day
	
	var YAML_TIMESTAMP_REGEXP = new RegExp(
	  '^([0-9][0-9][0-9][0-9])'          + // [1] year
	  '-([0-9][0-9]?)'                   + // [2] month
	  '-([0-9][0-9]?)'                   + // [3] day
	  '(?:[Tt]|[ \\t]+)'                 + // ...
	  '([0-9][0-9]?)'                    + // [4] hour
	  ':([0-9][0-9])'                    + // [5] minute
	  ':([0-9][0-9])'                    + // [6] second
	  '(?:\\.([0-9]*))?'                 + // [7] fraction
	  '(?:[ \\t]*(Z|([-+])([0-9][0-9]?)' + // [8] tz [9] tz_sign [10] tz_hour
	  '(?::([0-9][0-9]))?))?$');           // [11] tz_minute
	
	function resolveYamlTimestamp(data) {
	  if (data === null) return false;
	  if (YAML_DATE_REGEXP.exec(data) !== null) return true;
	  if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
	  return false;
	}
	
	function constructYamlTimestamp(data) {
	  var match, year, month, day, hour, minute, second, fraction = 0,
	      delta = null, tz_hour, tz_minute, date;
	
	  match = YAML_DATE_REGEXP.exec(data);
	  if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(data);
	
	  if (match === null) throw new Error('Date resolve error');
	
	  // match: [1] year [2] month [3] day
	
	  year = +(match[1]);
	  month = +(match[2]) - 1; // JS month starts with 0
	  day = +(match[3]);
	
	  if (!match[4]) { // no hour
	    return new Date(Date.UTC(year, month, day));
	  }
	
	  // match: [4] hour [5] minute [6] second [7] fraction
	
	  hour = +(match[4]);
	  minute = +(match[5]);
	  second = +(match[6]);
	
	  if (match[7]) {
	    fraction = match[7].slice(0, 3);
	    while (fraction.length < 3) { // milli-seconds
	      fraction += '0';
	    }
	    fraction = +fraction;
	  }
	
	  // match: [8] tz [9] tz_sign [10] tz_hour [11] tz_minute
	
	  if (match[9]) {
	    tz_hour = +(match[10]);
	    tz_minute = +(match[11] || 0);
	    delta = (tz_hour * 60 + tz_minute) * 60000; // delta in mili-seconds
	    if (match[9] === '-') delta = -delta;
	  }
	
	  date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
	
	  if (delta) date.setTime(date.getTime() - delta);
	
	  return date;
	}
	
	function representYamlTimestamp(object /*, style*/) {
	  return object.toISOString();
	}
	
	module.exports = new Type('tag:yaml.org,2002:timestamp', {
	  kind: 'scalar',
	  resolve: resolveYamlTimestamp,
	  construct: constructYamlTimestamp,
	  instanceOf: Date,
	  represent: representYamlTimestamp
	});


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Type = __webpack_require__(14);
	
	function resolveYamlMerge(data) {
	  return data === '<<' || data === null;
	}
	
	module.exports = new Type('tag:yaml.org,2002:merge', {
	  kind: 'scalar',
	  resolve: resolveYamlMerge
	});


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var require;'use strict';
	
	/*eslint-disable no-bitwise*/
	
	var NodeBuffer;
	
	try {
	  // A trick for browserified version, to not include `Buffer` shim
	  var _require = require;
	  NodeBuffer = __webpack_require__(2).Buffer;
	} catch (__) {}
	
	var Type       = __webpack_require__(14);
	
	
	// [ 64, 65, 66 ] -> [ padding, CR, LF ]
	var BASE64_MAP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r';
	
	
	function resolveYamlBinary(data) {
	  if (data === null) return false;
	
	  var code, idx, bitlen = 0, max = data.length, map = BASE64_MAP;
	
	  // Convert one by one.
	  for (idx = 0; idx < max; idx++) {
	    code = map.indexOf(data.charAt(idx));
	
	    // Skip CR/LF
	    if (code > 64) continue;
	
	    // Fail on illegal characters
	    if (code < 0) return false;
	
	    bitlen += 6;
	  }
	
	  // If there are any bits left, source was corrupted
	  return (bitlen % 8) === 0;
	}
	
	function constructYamlBinary(data) {
	  var idx, tailbits,
	      input = data.replace(/[\r\n=]/g, ''), // remove CR/LF & padding to simplify scan
	      max = input.length,
	      map = BASE64_MAP,
	      bits = 0,
	      result = [];
	
	  // Collect by 6*4 bits (3 bytes)
	
	  for (idx = 0; idx < max; idx++) {
	    if ((idx % 4 === 0) && idx) {
	      result.push((bits >> 16) & 0xFF);
	      result.push((bits >> 8) & 0xFF);
	      result.push(bits & 0xFF);
	    }
	
	    bits = (bits << 6) | map.indexOf(input.charAt(idx));
	  }
	
	  // Dump tail
	
	  tailbits = (max % 4) * 6;
	
	  if (tailbits === 0) {
	    result.push((bits >> 16) & 0xFF);
	    result.push((bits >> 8) & 0xFF);
	    result.push(bits & 0xFF);
	  } else if (tailbits === 18) {
	    result.push((bits >> 10) & 0xFF);
	    result.push((bits >> 2) & 0xFF);
	  } else if (tailbits === 12) {
	    result.push((bits >> 4) & 0xFF);
	  }
	
	  // Wrap into Buffer for NodeJS and leave Array for browser
	  if (NodeBuffer) return new NodeBuffer(result);
	
	  return result;
	}
	
	function representYamlBinary(object /*, style*/) {
	  var result = '', bits = 0, idx, tail,
	      max = object.length,
	      map = BASE64_MAP;
	
	  // Convert every three bytes to 4 ASCII characters.
	
	  for (idx = 0; idx < max; idx++) {
	    if ((idx % 3 === 0) && idx) {
	      result += map[(bits >> 18) & 0x3F];
	      result += map[(bits >> 12) & 0x3F];
	      result += map[(bits >> 6) & 0x3F];
	      result += map[bits & 0x3F];
	    }
	
	    bits = (bits << 8) + object[idx];
	  }
	
	  // Dump tail
	
	  tail = max % 3;
	
	  if (tail === 0) {
	    result += map[(bits >> 18) & 0x3F];
	    result += map[(bits >> 12) & 0x3F];
	    result += map[(bits >> 6) & 0x3F];
	    result += map[bits & 0x3F];
	  } else if (tail === 2) {
	    result += map[(bits >> 10) & 0x3F];
	    result += map[(bits >> 4) & 0x3F];
	    result += map[(bits << 2) & 0x3F];
	    result += map[64];
	  } else if (tail === 1) {
	    result += map[(bits >> 2) & 0x3F];
	    result += map[(bits << 4) & 0x3F];
	    result += map[64];
	    result += map[64];
	  }
	
	  return result;
	}
	
	function isBinary(object) {
	  return NodeBuffer && NodeBuffer.isBuffer(object);
	}
	
	module.exports = new Type('tag:yaml.org,2002:binary', {
	  kind: 'scalar',
	  resolve: resolveYamlBinary,
	  construct: constructYamlBinary,
	  predicate: isBinary,
	  represent: representYamlBinary
	});


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Type = __webpack_require__(14);
	
	var _hasOwnProperty = Object.prototype.hasOwnProperty;
	var _toString       = Object.prototype.toString;
	
	function resolveYamlOmap(data) {
	  if (data === null) return true;
	
	  var objectKeys = [], index, length, pair, pairKey, pairHasKey,
	      object = data;
	
	  for (index = 0, length = object.length; index < length; index += 1) {
	    pair = object[index];
	    pairHasKey = false;
	
	    if (_toString.call(pair) !== '[object Object]') return false;
	
	    for (pairKey in pair) {
	      if (_hasOwnProperty.call(pair, pairKey)) {
	        if (!pairHasKey) pairHasKey = true;
	        else return false;
	      }
	    }
	
	    if (!pairHasKey) return false;
	
	    if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
	    else return false;
	  }
	
	  return true;
	}
	
	function constructYamlOmap(data) {
	  return data !== null ? data : [];
	}
	
	module.exports = new Type('tag:yaml.org,2002:omap', {
	  kind: 'sequence',
	  resolve: resolveYamlOmap,
	  construct: constructYamlOmap
	});


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Type = __webpack_require__(14);
	
	var _toString = Object.prototype.toString;
	
	function resolveYamlPairs(data) {
	  if (data === null) return true;
	
	  var index, length, pair, keys, result,
	      object = data;
	
	  result = new Array(object.length);
	
	  for (index = 0, length = object.length; index < length; index += 1) {
	    pair = object[index];
	
	    if (_toString.call(pair) !== '[object Object]') return false;
	
	    keys = Object.keys(pair);
	
	    if (keys.length !== 1) return false;
	
	    result[index] = [ keys[0], pair[keys[0]] ];
	  }
	
	  return true;
	}
	
	function constructYamlPairs(data) {
	  if (data === null) return [];
	
	  var index, length, pair, keys, result,
	      object = data;
	
	  result = new Array(object.length);
	
	  for (index = 0, length = object.length; index < length; index += 1) {
	    pair = object[index];
	
	    keys = Object.keys(pair);
	
	    result[index] = [ keys[0], pair[keys[0]] ];
	  }
	
	  return result;
	}
	
	module.exports = new Type('tag:yaml.org,2002:pairs', {
	  kind: 'sequence',
	  resolve: resolveYamlPairs,
	  construct: constructYamlPairs
	});


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Type = __webpack_require__(14);
	
	var _hasOwnProperty = Object.prototype.hasOwnProperty;
	
	function resolveYamlSet(data) {
	  if (data === null) return true;
	
	  var key, object = data;
	
	  for (key in object) {
	    if (_hasOwnProperty.call(object, key)) {
	      if (object[key] !== null) return false;
	    }
	  }
	
	  return true;
	}
	
	function constructYamlSet(data) {
	  return data !== null ? data : {};
	}
	
	module.exports = new Type('tag:yaml.org,2002:set', {
	  kind: 'mapping',
	  resolve: resolveYamlSet,
	  construct: constructYamlSet
	});


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	// JS-YAML's default schema for `load` function.
	// It is not described in the YAML specification.
	//
	// This schema is based on JS-YAML's default safe schema and includes
	// JavaScript-specific types: !!js/undefined, !!js/regexp and !!js/function.
	//
	// Also this schema is used as default base schema at `Schema.create` function.
	
	
	'use strict';
	
	
	var Schema = __webpack_require__(13);
	
	
	module.exports = Schema.DEFAULT = new Schema({
	  include: [
	    __webpack_require__(12)
	  ],
	  explicit: [
	    __webpack_require__(32),
	    __webpack_require__(33),
	    __webpack_require__(34)
	  ]
	});


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Type = __webpack_require__(14);
	
	function resolveJavascriptUndefined() {
	  return true;
	}
	
	function constructJavascriptUndefined() {
	  /*eslint-disable no-undefined*/
	  return undefined;
	}
	
	function representJavascriptUndefined() {
	  return '';
	}
	
	function isUndefined(object) {
	  return typeof object === 'undefined';
	}
	
	module.exports = new Type('tag:yaml.org,2002:js/undefined', {
	  kind: 'scalar',
	  resolve: resolveJavascriptUndefined,
	  construct: constructJavascriptUndefined,
	  predicate: isUndefined,
	  represent: representJavascriptUndefined
	});


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Type = __webpack_require__(14);
	
	function resolveJavascriptRegExp(data) {
	  if (data === null) return false;
	  if (data.length === 0) return false;
	
	  var regexp = data,
	      tail   = /\/([gim]*)$/.exec(data),
	      modifiers = '';
	
	  // if regexp starts with '/' it can have modifiers and must be properly closed
	  // `/foo/gim` - modifiers tail can be maximum 3 chars
	  if (regexp[0] === '/') {
	    if (tail) modifiers = tail[1];
	
	    if (modifiers.length > 3) return false;
	    // if expression starts with /, is should be properly terminated
	    if (regexp[regexp.length - modifiers.length - 1] !== '/') return false;
	  }
	
	  return true;
	}
	
	function constructJavascriptRegExp(data) {
	  var regexp = data,
	      tail   = /\/([gim]*)$/.exec(data),
	      modifiers = '';
	
	  // `/foo/gim` - tail can be maximum 4 chars
	  if (regexp[0] === '/') {
	    if (tail) modifiers = tail[1];
	    regexp = regexp.slice(1, regexp.length - modifiers.length - 1);
	  }
	
	  return new RegExp(regexp, modifiers);
	}
	
	function representJavascriptRegExp(object /*, style*/) {
	  var result = '/' + object.source + '/';
	
	  if (object.global) result += 'g';
	  if (object.multiline) result += 'm';
	  if (object.ignoreCase) result += 'i';
	
	  return result;
	}
	
	function isRegExp(object) {
	  return Object.prototype.toString.call(object) === '[object RegExp]';
	}
	
	module.exports = new Type('tag:yaml.org,2002:js/regexp', {
	  kind: 'scalar',
	  resolve: resolveJavascriptRegExp,
	  construct: constructJavascriptRegExp,
	  predicate: isRegExp,
	  represent: representJavascriptRegExp
	});


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var require;'use strict';
	
	var esprima;
	
	// Browserified version does not have esprima
	//
	// 1. For node.js just require module as deps
	// 2. For browser try to require mudule via external AMD system.
	//    If not found - try to fallback to window.esprima. If not
	//    found too - then fail to parse.
	//
	try {
	  // workaround to exclude package from browserify list.
	  var _require = require;
	  esprima = __webpack_require__(35);
	} catch (_) {
	  /*global window */
	  if (typeof window !== 'undefined') esprima = window.esprima;
	}
	
	var Type = __webpack_require__(14);
	
	function resolveJavascriptFunction(data) {
	  if (data === null) return false;
	
	  try {
	    var source = '(' + data + ')',
	        ast    = esprima.parse(source, { range: true });
	
	    if (ast.type                    !== 'Program'             ||
	        ast.body.length             !== 1                     ||
	        ast.body[0].type            !== 'ExpressionStatement' ||
	        ast.body[0].expression.type !== 'FunctionExpression') {
	      return false;
	    }
	
	    return true;
	  } catch (err) {
	    return false;
	  }
	}
	
	function constructJavascriptFunction(data) {
	  /*jslint evil:true*/
	
	  var source = '(' + data + ')',
	      ast    = esprima.parse(source, { range: true }),
	      params = [],
	      body;
	
	  if (ast.type                    !== 'Program'             ||
	      ast.body.length             !== 1                     ||
	      ast.body[0].type            !== 'ExpressionStatement' ||
	      ast.body[0].expression.type !== 'FunctionExpression') {
	    throw new Error('Failed to resolve function');
	  }
	
	  ast.body[0].expression.params.forEach(function (param) {
	    params.push(param.name);
	  });
	
	  body = ast.body[0].expression.body.range;
	
	  // Esprima's ranges include the first '{' and the last '}' characters on
	  // function expressions. So cut them out.
	  /*eslint-disable no-new-func*/
	  return new Function(params, source.slice(body[0] + 1, body[1] - 1));
	}
	
	function representJavascriptFunction(object /*, style*/) {
	  return object.toString();
	}
	
	function isFunction(object) {
	  return Object.prototype.toString.call(object) === '[object Function]';
	}
	
	module.exports = new Type('tag:yaml.org,2002:js/function', {
	  kind: 'scalar',
	  resolve: resolveJavascriptFunction,
	  construct: constructJavascriptFunction,
	  predicate: isFunction,
	  represent: representJavascriptFunction
	});


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
	  Copyright (c) jQuery Foundation, Inc. and Contributors, All Rights Reserved.
	
	  Redistribution and use in source and binary forms, with or without
	  modification, are permitted provided that the following conditions are met:
	
	    * Redistributions of source code must retain the above copyright
	      notice, this list of conditions and the following disclaimer.
	    * Redistributions in binary form must reproduce the above copyright
	      notice, this list of conditions and the following disclaimer in the
	      documentation and/or other materials provided with the distribution.
	
	  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
	  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
	  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
	  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
	  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
	  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
	  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
	  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
	  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/
	
	(function (root, factory) {
	    'use strict';
	
	    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js,
	    // Rhino, and plain browser loading.
	
	    /* istanbul ignore next */
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof exports !== 'undefined') {
	        factory(exports);
	    } else {
	        factory((root.esprima = {}));
	    }
	}(this, function (exports) {
	    'use strict';
	
	    var Token,
	        TokenName,
	        FnExprTokens,
	        Syntax,
	        PlaceHolders,
	        Messages,
	        Regex,
	        source,
	        strict,
	        index,
	        lineNumber,
	        lineStart,
	        hasLineTerminator,
	        lastIndex,
	        lastLineNumber,
	        lastLineStart,
	        startIndex,
	        startLineNumber,
	        startLineStart,
	        scanning,
	        length,
	        lookahead,
	        state,
	        extra,
	        isBindingElement,
	        isAssignmentTarget,
	        firstCoverInitializedNameError;
	
	    Token = {
	        BooleanLiteral: 1,
	        EOF: 2,
	        Identifier: 3,
	        Keyword: 4,
	        NullLiteral: 5,
	        NumericLiteral: 6,
	        Punctuator: 7,
	        StringLiteral: 8,
	        RegularExpression: 9,
	        Template: 10
	    };
	
	    TokenName = {};
	    TokenName[Token.BooleanLiteral] = 'Boolean';
	    TokenName[Token.EOF] = '<end>';
	    TokenName[Token.Identifier] = 'Identifier';
	    TokenName[Token.Keyword] = 'Keyword';
	    TokenName[Token.NullLiteral] = 'Null';
	    TokenName[Token.NumericLiteral] = 'Numeric';
	    TokenName[Token.Punctuator] = 'Punctuator';
	    TokenName[Token.StringLiteral] = 'String';
	    TokenName[Token.RegularExpression] = 'RegularExpression';
	    TokenName[Token.Template] = 'Template';
	
	    // A function following one of those tokens is an expression.
	    FnExprTokens = ['(', '{', '[', 'in', 'typeof', 'instanceof', 'new',
	                    'return', 'case', 'delete', 'throw', 'void',
	                    // assignment operators
	                    '=', '+=', '-=', '*=', '/=', '%=', '<<=', '>>=', '>>>=',
	                    '&=', '|=', '^=', ',',
	                    // binary/unary operators
	                    '+', '-', '*', '/', '%', '++', '--', '<<', '>>', '>>>', '&',
	                    '|', '^', '!', '~', '&&', '||', '?', ':', '===', '==', '>=',
	                    '<=', '<', '>', '!=', '!=='];
	
	    Syntax = {
	        AssignmentExpression: 'AssignmentExpression',
	        AssignmentPattern: 'AssignmentPattern',
	        ArrayExpression: 'ArrayExpression',
	        ArrayPattern: 'ArrayPattern',
	        ArrowFunctionExpression: 'ArrowFunctionExpression',
	        BlockStatement: 'BlockStatement',
	        BinaryExpression: 'BinaryExpression',
	        BreakStatement: 'BreakStatement',
	        CallExpression: 'CallExpression',
	        CatchClause: 'CatchClause',
	        ClassBody: 'ClassBody',
	        ClassDeclaration: 'ClassDeclaration',
	        ClassExpression: 'ClassExpression',
	        ConditionalExpression: 'ConditionalExpression',
	        ContinueStatement: 'ContinueStatement',
	        DoWhileStatement: 'DoWhileStatement',
	        DebuggerStatement: 'DebuggerStatement',
	        EmptyStatement: 'EmptyStatement',
	        ExportAllDeclaration: 'ExportAllDeclaration',
	        ExportDefaultDeclaration: 'ExportDefaultDeclaration',
	        ExportNamedDeclaration: 'ExportNamedDeclaration',
	        ExportSpecifier: 'ExportSpecifier',
	        ExpressionStatement: 'ExpressionStatement',
	        ForStatement: 'ForStatement',
	        ForOfStatement: 'ForOfStatement',
	        ForInStatement: 'ForInStatement',
	        FunctionDeclaration: 'FunctionDeclaration',
	        FunctionExpression: 'FunctionExpression',
	        Identifier: 'Identifier',
	        IfStatement: 'IfStatement',
	        ImportDeclaration: 'ImportDeclaration',
	        ImportDefaultSpecifier: 'ImportDefaultSpecifier',
	        ImportNamespaceSpecifier: 'ImportNamespaceSpecifier',
	        ImportSpecifier: 'ImportSpecifier',
	        Literal: 'Literal',
	        LabeledStatement: 'LabeledStatement',
	        LogicalExpression: 'LogicalExpression',
	        MemberExpression: 'MemberExpression',
	        MetaProperty: 'MetaProperty',
	        MethodDefinition: 'MethodDefinition',
	        NewExpression: 'NewExpression',
	        ObjectExpression: 'ObjectExpression',
	        ObjectPattern: 'ObjectPattern',
	        Program: 'Program',
	        Property: 'Property',
	        RestElement: 'RestElement',
	        ReturnStatement: 'ReturnStatement',
	        SequenceExpression: 'SequenceExpression',
	        SpreadElement: 'SpreadElement',
	        Super: 'Super',
	        SwitchCase: 'SwitchCase',
	        SwitchStatement: 'SwitchStatement',
	        TaggedTemplateExpression: 'TaggedTemplateExpression',
	        TemplateElement: 'TemplateElement',
	        TemplateLiteral: 'TemplateLiteral',
	        ThisExpression: 'ThisExpression',
	        ThrowStatement: 'ThrowStatement',
	        TryStatement: 'TryStatement',
	        UnaryExpression: 'UnaryExpression',
	        UpdateExpression: 'UpdateExpression',
	        VariableDeclaration: 'VariableDeclaration',
	        VariableDeclarator: 'VariableDeclarator',
	        WhileStatement: 'WhileStatement',
	        WithStatement: 'WithStatement',
	        YieldExpression: 'YieldExpression'
	    };
	
	    PlaceHolders = {
	        ArrowParameterPlaceHolder: 'ArrowParameterPlaceHolder'
	    };
	
	    // Error messages should be identical to V8.
	    Messages = {
	        UnexpectedToken: 'Unexpected token %0',
	        UnexpectedNumber: 'Unexpected number',
	        UnexpectedString: 'Unexpected string',
	        UnexpectedIdentifier: 'Unexpected identifier',
	        UnexpectedReserved: 'Unexpected reserved word',
	        UnexpectedTemplate: 'Unexpected quasi %0',
	        UnexpectedEOS: 'Unexpected end of input',
	        NewlineAfterThrow: 'Illegal newline after throw',
	        InvalidRegExp: 'Invalid regular expression',
	        UnterminatedRegExp: 'Invalid regular expression: missing /',
	        InvalidLHSInAssignment: 'Invalid left-hand side in assignment',
	        InvalidLHSInForIn: 'Invalid left-hand side in for-in',
	        InvalidLHSInForLoop: 'Invalid left-hand side in for-loop',
	        MultipleDefaultsInSwitch: 'More than one default clause in switch statement',
	        NoCatchOrFinally: 'Missing catch or finally after try',
	        UnknownLabel: 'Undefined label \'%0\'',
	        Redeclaration: '%0 \'%1\' has already been declared',
	        IllegalContinue: 'Illegal continue statement',
	        IllegalBreak: 'Illegal break statement',
	        IllegalReturn: 'Illegal return statement',
	        StrictModeWith: 'Strict mode code may not include a with statement',
	        StrictCatchVariable: 'Catch variable may not be eval or arguments in strict mode',
	        StrictVarName: 'Variable name may not be eval or arguments in strict mode',
	        StrictParamName: 'Parameter name eval or arguments is not allowed in strict mode',
	        StrictParamDupe: 'Strict mode function may not have duplicate parameter names',
	        StrictFunctionName: 'Function name may not be eval or arguments in strict mode',
	        StrictOctalLiteral: 'Octal literals are not allowed in strict mode.',
	        StrictDelete: 'Delete of an unqualified identifier in strict mode.',
	        StrictLHSAssignment: 'Assignment to eval or arguments is not allowed in strict mode',
	        StrictLHSPostfix: 'Postfix increment/decrement may not have eval or arguments operand in strict mode',
	        StrictLHSPrefix: 'Prefix increment/decrement may not have eval or arguments operand in strict mode',
	        StrictReservedWord: 'Use of future reserved word in strict mode',
	        TemplateOctalLiteral: 'Octal literals are not allowed in template strings.',
	        ParameterAfterRestParameter: 'Rest parameter must be last formal parameter',
	        DefaultRestParameter: 'Unexpected token =',
	        ObjectPatternAsRestParameter: 'Unexpected token {',
	        DuplicateProtoProperty: 'Duplicate __proto__ fields are not allowed in object literals',
	        ConstructorSpecialMethod: 'Class constructor may not be an accessor',
	        DuplicateConstructor: 'A class may only have one constructor',
	        StaticPrototype: 'Classes may not have static property named prototype',
	        MissingFromClause: 'Unexpected token',
	        NoAsAfterImportNamespace: 'Unexpected token',
	        InvalidModuleSpecifier: 'Unexpected token',
	        IllegalImportDeclaration: 'Unexpected token',
	        IllegalExportDeclaration: 'Unexpected token',
	        DuplicateBinding: 'Duplicate binding %0'
	    };
	
	    // See also tools/generate-unicode-regex.js.
	    Regex = {
	        // ECMAScript 6/Unicode v7.0.0 NonAsciiIdentifierStart:
	        NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B2\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDE00-\uDE11\uDE13-\uDE2B\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF5D-\uDF61]|\uD805[\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDE00-\uDE2F\uDE44\uDE80-\uDEAA]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF98]|\uD809[\uDC00-\uDC6E]|[\uD80C\uD840-\uD868\uD86A-\uD86C][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D]|\uD87E[\uDC00-\uDE1D]/,
	
	        // ECMAScript 6/Unicode v7.0.0 NonAsciiIdentifierPart:
	        NonAsciiIdentifierPart: /[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B2\u08E4-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA69D\uA69F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2D\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDD0-\uDDDA\uDE00-\uDE11\uDE13-\uDE37\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF01-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF98]|\uD809[\uDC00-\uDC6E]|[\uD80C\uD840-\uD868\uD86A-\uD86C][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/
	    };
	
	    // Ensure the condition is true, otherwise throw an error.
	    // This is only to have a better contract semantic, i.e. another safety net
	    // to catch a logic error. The condition shall be fulfilled in normal case.
	    // Do NOT use this to enforce a certain condition on any user input.
	
	    function assert(condition, message) {
	        /* istanbul ignore if */
	        if (!condition) {
	            throw new Error('ASSERT: ' + message);
	        }
	    }
	
	    function isDecimalDigit(ch) {
	        return (ch >= 0x30 && ch <= 0x39);   // 0..9
	    }
	
	    function isHexDigit(ch) {
	        return '0123456789abcdefABCDEF'.indexOf(ch) >= 0;
	    }
	
	    function isOctalDigit(ch) {
	        return '01234567'.indexOf(ch) >= 0;
	    }
	
	    function octalToDecimal(ch) {
	        // \0 is not octal escape sequence
	        var octal = (ch !== '0'), code = '01234567'.indexOf(ch);
	
	        if (index < length && isOctalDigit(source[index])) {
	            octal = true;
	            code = code * 8 + '01234567'.indexOf(source[index++]);
	
	            // 3 digits are only allowed when string starts
	            // with 0, 1, 2, 3
	            if ('0123'.indexOf(ch) >= 0 &&
	                    index < length &&
	                    isOctalDigit(source[index])) {
	                code = code * 8 + '01234567'.indexOf(source[index++]);
	            }
	        }
	
	        return {
	            code: code,
	            octal: octal
	        };
	    }
	
	    // ECMA-262 11.2 White Space
	
	    function isWhiteSpace(ch) {
	        return (ch === 0x20) || (ch === 0x09) || (ch === 0x0B) || (ch === 0x0C) || (ch === 0xA0) ||
	            (ch >= 0x1680 && [0x1680, 0x180E, 0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200A, 0x202F, 0x205F, 0x3000, 0xFEFF].indexOf(ch) >= 0);
	    }
	
	    // ECMA-262 11.3 Line Terminators
	
	    function isLineTerminator(ch) {
	        return (ch === 0x0A) || (ch === 0x0D) || (ch === 0x2028) || (ch === 0x2029);
	    }
	
	    // ECMA-262 11.6 Identifier Names and Identifiers
	
	    function fromCodePoint(cp) {
	        return (cp < 0x10000) ? String.fromCharCode(cp) :
	            String.fromCharCode(0xD800 + ((cp - 0x10000) >> 10)) +
	            String.fromCharCode(0xDC00 + ((cp - 0x10000) & 1023));
	    }
	
	    function isIdentifierStart(ch) {
	        return (ch === 0x24) || (ch === 0x5F) ||  // $ (dollar) and _ (underscore)
	            (ch >= 0x41 && ch <= 0x5A) ||         // A..Z
	            (ch >= 0x61 && ch <= 0x7A) ||         // a..z
	            (ch === 0x5C) ||                      // \ (backslash)
	            ((ch >= 0x80) && Regex.NonAsciiIdentifierStart.test(fromCodePoint(ch)));
	    }
	
	    function isIdentifierPart(ch) {
	        return (ch === 0x24) || (ch === 0x5F) ||  // $ (dollar) and _ (underscore)
	            (ch >= 0x41 && ch <= 0x5A) ||         // A..Z
	            (ch >= 0x61 && ch <= 0x7A) ||         // a..z
	            (ch >= 0x30 && ch <= 0x39) ||         // 0..9
	            (ch === 0x5C) ||                      // \ (backslash)
	            ((ch >= 0x80) && Regex.NonAsciiIdentifierPart.test(fromCodePoint(ch)));
	    }
	
	    // ECMA-262 11.6.2.2 Future Reserved Words
	
	    function isFutureReservedWord(id) {
	        switch (id) {
	        case 'enum':
	        case 'export':
	        case 'import':
	        case 'super':
	            return true;
	        default:
	            return false;
	        }
	    }
	
	    function isStrictModeReservedWord(id) {
	        switch (id) {
	        case 'implements':
	        case 'interface':
	        case 'package':
	        case 'private':
	        case 'protected':
	        case 'public':
	        case 'static':
	        case 'yield':
	        case 'let':
	            return true;
	        default:
	            return false;
	        }
	    }
	
	    function isRestrictedWord(id) {
	        return id === 'eval' || id === 'arguments';
	    }
	
	    // ECMA-262 11.6.2.1 Keywords
	
	    function isKeyword(id) {
	        switch (id.length) {
	        case 2:
	            return (id === 'if') || (id === 'in') || (id === 'do');
	        case 3:
	            return (id === 'var') || (id === 'for') || (id === 'new') ||
	                (id === 'try') || (id === 'let');
	        case 4:
	            return (id === 'this') || (id === 'else') || (id === 'case') ||
	                (id === 'void') || (id === 'with') || (id === 'enum');
	        case 5:
	            return (id === 'while') || (id === 'break') || (id === 'catch') ||
	                (id === 'throw') || (id === 'const') || (id === 'yield') ||
	                (id === 'class') || (id === 'super');
	        case 6:
	            return (id === 'return') || (id === 'typeof') || (id === 'delete') ||
	                (id === 'switch') || (id === 'export') || (id === 'import');
	        case 7:
	            return (id === 'default') || (id === 'finally') || (id === 'extends');
	        case 8:
	            return (id === 'function') || (id === 'continue') || (id === 'debugger');
	        case 10:
	            return (id === 'instanceof');
	        default:
	            return false;
	        }
	    }
	
	    // ECMA-262 11.4 Comments
	
	    function addComment(type, value, start, end, loc) {
	        var comment;
	
	        assert(typeof start === 'number', 'Comment must have valid position');
	
	        state.lastCommentStart = start;
	
	        comment = {
	            type: type,
	            value: value
	        };
	        if (extra.range) {
	            comment.range = [start, end];
	        }
	        if (extra.loc) {
	            comment.loc = loc;
	        }
	        extra.comments.push(comment);
	        if (extra.attachComment) {
	            extra.leadingComments.push(comment);
	            extra.trailingComments.push(comment);
	        }
	        if (extra.tokenize) {
	            comment.type = comment.type + 'Comment';
	            if (extra.delegate) {
	                comment = extra.delegate(comment);
	            }
	            extra.tokens.push(comment);
	        }
	    }
	
	    function skipSingleLineComment(offset) {
	        var start, loc, ch, comment;
	
	        start = index - offset;
	        loc = {
	            start: {
	                line: lineNumber,
	                column: index - lineStart - offset
	            }
	        };
	
	        while (index < length) {
	            ch = source.charCodeAt(index);
	            ++index;
	            if (isLineTerminator(ch)) {
	                hasLineTerminator = true;
	                if (extra.comments) {
	                    comment = source.slice(start + offset, index - 1);
	                    loc.end = {
	                        line: lineNumber,
	                        column: index - lineStart - 1
	                    };
	                    addComment('Line', comment, start, index - 1, loc);
	                }
	                if (ch === 13 && source.charCodeAt(index) === 10) {
	                    ++index;
	                }
	                ++lineNumber;
	                lineStart = index;
	                return;
	            }
	        }
	
	        if (extra.comments) {
	            comment = source.slice(start + offset, index);
	            loc.end = {
	                line: lineNumber,
	                column: index - lineStart
	            };
	            addComment('Line', comment, start, index, loc);
	        }
	    }
	
	    function skipMultiLineComment() {
	        var start, loc, ch, comment;
	
	        if (extra.comments) {
	            start = index - 2;
	            loc = {
	                start: {
	                    line: lineNumber,
	                    column: index - lineStart - 2
	                }
	            };
	        }
	
	        while (index < length) {
	            ch = source.charCodeAt(index);
	            if (isLineTerminator(ch)) {
	                if (ch === 0x0D && source.charCodeAt(index + 1) === 0x0A) {
	                    ++index;
	                }
	                hasLineTerminator = true;
	                ++lineNumber;
	                ++index;
	                lineStart = index;
	            } else if (ch === 0x2A) {
	                // Block comment ends with '*/'.
	                if (source.charCodeAt(index + 1) === 0x2F) {
	                    ++index;
	                    ++index;
	                    if (extra.comments) {
	                        comment = source.slice(start + 2, index - 2);
	                        loc.end = {
	                            line: lineNumber,
	                            column: index - lineStart
	                        };
	                        addComment('Block', comment, start, index, loc);
	                    }
	                    return;
	                }
	                ++index;
	            } else {
	                ++index;
	            }
	        }
	
	        // Ran off the end of the file - the whole thing is a comment
	        if (extra.comments) {
	            loc.end = {
	                line: lineNumber,
	                column: index - lineStart
	            };
	            comment = source.slice(start + 2, index);
	            addComment('Block', comment, start, index, loc);
	        }
	        tolerateUnexpectedToken();
	    }
	
	    function skipComment() {
	        var ch, start;
	        hasLineTerminator = false;
	
	        start = (index === 0);
	        while (index < length) {
	            ch = source.charCodeAt(index);
	
	            if (isWhiteSpace(ch)) {
	                ++index;
	            } else if (isLineTerminator(ch)) {
	                hasLineTerminator = true;
	                ++index;
	                if (ch === 0x0D && source.charCodeAt(index) === 0x0A) {
	                    ++index;
	                }
	                ++lineNumber;
	                lineStart = index;
	                start = true;
	            } else if (ch === 0x2F) { // U+002F is '/'
	                ch = source.charCodeAt(index + 1);
	                if (ch === 0x2F) {
	                    ++index;
	                    ++index;
	                    skipSingleLineComment(2);
	                    start = true;
	                } else if (ch === 0x2A) {  // U+002A is '*'
	                    ++index;
	                    ++index;
	                    skipMultiLineComment();
	                } else {
	                    break;
	                }
	            } else if (start && ch === 0x2D) { // U+002D is '-'
	                // U+003E is '>'
	                if ((source.charCodeAt(index + 1) === 0x2D) && (source.charCodeAt(index + 2) === 0x3E)) {
	                    // '-->' is a single-line comment
	                    index += 3;
	                    skipSingleLineComment(3);
	                } else {
	                    break;
	                }
	            } else if (ch === 0x3C) { // U+003C is '<'
	                if (source.slice(index + 1, index + 4) === '!--') {
	                    ++index; // `<`
	                    ++index; // `!`
	                    ++index; // `-`
	                    ++index; // `-`
	                    skipSingleLineComment(4);
	                } else {
	                    break;
	                }
	            } else {
	                break;
	            }
	        }
	    }
	
	    function scanHexEscape(prefix) {
	        var i, len, ch, code = 0;
	
	        len = (prefix === 'u') ? 4 : 2;
	        for (i = 0; i < len; ++i) {
	            if (index < length && isHexDigit(source[index])) {
	                ch = source[index++];
	                code = code * 16 + '0123456789abcdef'.indexOf(ch.toLowerCase());
	            } else {
	                return '';
	            }
	        }
	        return String.fromCharCode(code);
	    }
	
	    function scanUnicodeCodePointEscape() {
	        var ch, code;
	
	        ch = source[index];
	        code = 0;
	
	        // At least, one hex digit is required.
	        if (ch === '}') {
	            throwUnexpectedToken();
	        }
	
	        while (index < length) {
	            ch = source[index++];
	            if (!isHexDigit(ch)) {
	                break;
	            }
	            code = code * 16 + '0123456789abcdef'.indexOf(ch.toLowerCase());
	        }
	
	        if (code > 0x10FFFF || ch !== '}') {
	            throwUnexpectedToken();
	        }
	
	        return fromCodePoint(code);
	    }
	
	    function codePointAt(i) {
	        var cp, first, second;
	
	        cp = source.charCodeAt(i);
	        if (cp >= 0xD800 && cp <= 0xDBFF) {
	            second = source.charCodeAt(i + 1);
	            if (second >= 0xDC00 && second <= 0xDFFF) {
	                first = cp;
	                cp = (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
	            }
	        }
	
	        return cp;
	    }
	
	    function getComplexIdentifier() {
	        var cp, ch, id;
	
	        cp = codePointAt(index);
	        id = fromCodePoint(cp);
	        index += id.length;
	
	        // '\u' (U+005C, U+0075) denotes an escaped character.
	        if (cp === 0x5C) {
	            if (source.charCodeAt(index) !== 0x75) {
	                throwUnexpectedToken();
	            }
	            ++index;
	            if (source[index] === '{') {
	                ++index;
	                ch = scanUnicodeCodePointEscape();
	            } else {
	                ch = scanHexEscape('u');
	                cp = ch.charCodeAt(0);
	                if (!ch || ch === '\\' || !isIdentifierStart(cp)) {
	                    throwUnexpectedToken();
	                }
	            }
	            id = ch;
	        }
	
	        while (index < length) {
	            cp = codePointAt(index);
	            if (!isIdentifierPart(cp)) {
	                break;
	            }
	            ch = fromCodePoint(cp);
	            id += ch;
	            index += ch.length;
	
	            // '\u' (U+005C, U+0075) denotes an escaped character.
	            if (cp === 0x5C) {
	                id = id.substr(0, id.length - 1);
	                if (source.charCodeAt(index) !== 0x75) {
	                    throwUnexpectedToken();
	                }
	                ++index;
	                if (source[index] === '{') {
	                    ++index;
	                    ch = scanUnicodeCodePointEscape();
	                } else {
	                    ch = scanHexEscape('u');
	                    cp = ch.charCodeAt(0);
	                    if (!ch || ch === '\\' || !isIdentifierPart(cp)) {
	                        throwUnexpectedToken();
	                    }
	                }
	                id += ch;
	            }
	        }
	
	        return id;
	    }
	
	    function getIdentifier() {
	        var start, ch;
	
	        start = index++;
	        while (index < length) {
	            ch = source.charCodeAt(index);
	            if (ch === 0x5C) {
	                // Blackslash (U+005C) marks Unicode escape sequence.
	                index = start;
	                return getComplexIdentifier();
	            } else if (ch >= 0xD800 && ch < 0xDFFF) {
	                // Need to handle surrogate pairs.
	                index = start;
	                return getComplexIdentifier();
	            }
	            if (isIdentifierPart(ch)) {
	                ++index;
	            } else {
	                break;
	            }
	        }
	
	        return source.slice(start, index);
	    }
	
	    function scanIdentifier() {
	        var start, id, type;
	
	        start = index;
	
	        // Backslash (U+005C) starts an escaped character.
	        id = (source.charCodeAt(index) === 0x5C) ? getComplexIdentifier() : getIdentifier();
	
	        // There is no keyword or literal with only one character.
	        // Thus, it must be an identifier.
	        if (id.length === 1) {
	            type = Token.Identifier;
	        } else if (isKeyword(id)) {
	            type = Token.Keyword;
	        } else if (id === 'null') {
	            type = Token.NullLiteral;
	        } else if (id === 'true' || id === 'false') {
	            type = Token.BooleanLiteral;
	        } else {
	            type = Token.Identifier;
	        }
	
	        return {
	            type: type,
	            value: id,
	            lineNumber: lineNumber,
	            lineStart: lineStart,
	            start: start,
	            end: index
	        };
	    }
	
	
	    // ECMA-262 11.7 Punctuators
	
	    function scanPunctuator() {
	        var token, str;
	
	        token = {
	            type: Token.Punctuator,
	            value: '',
	            lineNumber: lineNumber,
	            lineStart: lineStart,
	            start: index,
	            end: index
	        };
	
	        // Check for most common single-character punctuators.
	        str = source[index];
	        switch (str) {
	
	        case '(':
	            if (extra.tokenize) {
	                extra.openParenToken = extra.tokenValues.length;
	            }
	            ++index;
	            break;
	
	        case '{':
	            if (extra.tokenize) {
	                extra.openCurlyToken = extra.tokenValues.length;
	            }
	            state.curlyStack.push('{');
	            ++index;
	            break;
	
	        case '.':
	            ++index;
	            if (source[index] === '.' && source[index + 1] === '.') {
	                // Spread operator: ...
	                index += 2;
	                str = '...';
	            }
	            break;
	
	        case '}':
	            ++index;
	            state.curlyStack.pop();
	            break;
	        case ')':
	        case ';':
	        case ',':
	        case '[':
	        case ']':
	        case ':':
	        case '?':
	        case '~':
	            ++index;
	            break;
	
	        default:
	            // 4-character punctuator.
	            str = source.substr(index, 4);
	            if (str === '>>>=') {
	                index += 4;
	            } else {
	
	                // 3-character punctuators.
	                str = str.substr(0, 3);
	                if (str === '===' || str === '!==' || str === '>>>' ||
	                    str === '<<=' || str === '>>=') {
	                    index += 3;
	                } else {
	
	                    // 2-character punctuators.
	                    str = str.substr(0, 2);
	                    if (str === '&&' || str === '||' || str === '==' || str === '!=' ||
	                        str === '+=' || str === '-=' || str === '*=' || str === '/=' ||
	                        str === '++' || str === '--' || str === '<<' || str === '>>' ||
	                        str === '&=' || str === '|=' || str === '^=' || str === '%=' ||
	                        str === '<=' || str === '>=' || str === '=>') {
	                        index += 2;
	                    } else {
	
	                        // 1-character punctuators.
	                        str = source[index];
	                        if ('<>=!+-*%&|^/'.indexOf(str) >= 0) {
	                            ++index;
	                        }
	                    }
	                }
	            }
	        }
	
	        if (index === token.start) {
	            throwUnexpectedToken();
	        }
	
	        token.end = index;
	        token.value = str;
	        return token;
	    }
	
	    // ECMA-262 11.8.3 Numeric Literals
	
	    function scanHexLiteral(start) {
	        var number = '';
	
	        while (index < length) {
	            if (!isHexDigit(source[index])) {
	                break;
	            }
	            number += source[index++];
	        }
	
	        if (number.length === 0) {
	            throwUnexpectedToken();
	        }
	
	        if (isIdentifierStart(source.charCodeAt(index))) {
	            throwUnexpectedToken();
	        }
	
	        return {
	            type: Token.NumericLiteral,
	            value: parseInt('0x' + number, 16),
	            lineNumber: lineNumber,
	            lineStart: lineStart,
	            start: start,
	            end: index
	        };
	    }
	
	    function scanBinaryLiteral(start) {
	        var ch, number;
	
	        number = '';
	
	        while (index < length) {
	            ch = source[index];
	            if (ch !== '0' && ch !== '1') {
	                break;
	            }
	            number += source[index++];
	        }
	
	        if (number.length === 0) {
	            // only 0b or 0B
	            throwUnexpectedToken();
	        }
	
	        if (index < length) {
	            ch = source.charCodeAt(index);
	            /* istanbul ignore else */
	            if (isIdentifierStart(ch) || isDecimalDigit(ch)) {
	                throwUnexpectedToken();
	            }
	        }
	
	        return {
	            type: Token.NumericLiteral,
	            value: parseInt(number, 2),
	            lineNumber: lineNumber,
	            lineStart: lineStart,
	            start: start,
	            end: index
	        };
	    }
	
	    function scanOctalLiteral(prefix, start) {
	        var number, octal;
	
	        if (isOctalDigit(prefix)) {
	            octal = true;
	            number = '0' + source[index++];
	        } else {
	            octal = false;
	            ++index;
	            number = '';
	        }
	
	        while (index < length) {
	            if (!isOctalDigit(source[index])) {
	                break;
	            }
	            number += source[index++];
	        }
	
	        if (!octal && number.length === 0) {
	            // only 0o or 0O
	            throwUnexpectedToken();
	        }
	
	        if (isIdentifierStart(source.charCodeAt(index)) || isDecimalDigit(source.charCodeAt(index))) {
	            throwUnexpectedToken();
	        }
	
	        return {
	            type: Token.NumericLiteral,
	            value: parseInt(number, 8),
	            octal: octal,
	            lineNumber: lineNumber,
	            lineStart: lineStart,
	            start: start,
	            end: index
	        };
	    }
	
	    function isImplicitOctalLiteral() {
	        var i, ch;
	
	        // Implicit octal, unless there is a non-octal digit.
	        // (Annex B.1.1 on Numeric Literals)
	        for (i = index + 1; i < length; ++i) {
	            ch = source[i];
	            if (ch === '8' || ch === '9') {
	                return false;
	            }
	            if (!isOctalDigit(ch)) {
	                return true;
	            }
	        }
	
	        return true;
	    }
	
	    function scanNumericLiteral() {
	        var number, start, ch;
	
	        ch = source[index];
	        assert(isDecimalDigit(ch.charCodeAt(0)) || (ch === '.'),
	            'Numeric literal must start with a decimal digit or a decimal point');
	
	        start = index;
	        number = '';
	        if (ch !== '.') {
	            number = source[index++];
	            ch = source[index];
	
	            // Hex number starts with '0x'.
	            // Octal number starts with '0'.
	            // Octal number in ES6 starts with '0o'.
	            // Binary number in ES6 starts with '0b'.
	            if (number === '0') {
	                if (ch === 'x' || ch === 'X') {
	                    ++index;
	                    return scanHexLiteral(start);
	                }
	                if (ch === 'b' || ch === 'B') {
	                    ++index;
	                    return scanBinaryLiteral(start);
	                }
	                if (ch === 'o' || ch === 'O') {
	                    return scanOctalLiteral(ch, start);
	                }
	
	                if (isOctalDigit(ch)) {
	                    if (isImplicitOctalLiteral()) {
	                        return scanOctalLiteral(ch, start);
	                    }
	                }
	            }
	
	            while (isDecimalDigit(source.charCodeAt(index))) {
	                number += source[index++];
	            }
	            ch = source[index];
	        }
	
	        if (ch === '.') {
	            number += source[index++];
	            while (isDecimalDigit(source.charCodeAt(index))) {
	                number += source[index++];
	            }
	            ch = source[index];
	        }
	
	        if (ch === 'e' || ch === 'E') {
	            number += source[index++];
	
	            ch = source[index];
	            if (ch === '+' || ch === '-') {
	                number += source[index++];
	            }
	            if (isDecimalDigit(source.charCodeAt(index))) {
	                while (isDecimalDigit(source.charCodeAt(index))) {
	                    number += source[index++];
	                }
	            } else {
	                throwUnexpectedToken();
	            }
	        }
	
	        if (isIdentifierStart(source.charCodeAt(index))) {
	            throwUnexpectedToken();
	        }
	
	        return {
	            type: Token.NumericLiteral,
	            value: parseFloat(number),
	            lineNumber: lineNumber,
	            lineStart: lineStart,
	            start: start,
	            end: index
	        };
	    }
	
	    // ECMA-262 11.8.4 String Literals
	
	    function scanStringLiteral() {
	        var str = '', quote, start, ch, unescaped, octToDec, octal = false;
	
	        quote = source[index];
	        assert((quote === '\'' || quote === '"'),
	            'String literal must starts with a quote');
	
	        start = index;
	        ++index;
	
	        while (index < length) {
	            ch = source[index++];
	
	            if (ch === quote) {
	                quote = '';
	                break;
	            } else if (ch === '\\') {
	                ch = source[index++];
	                if (!ch || !isLineTerminator(ch.charCodeAt(0))) {
	                    switch (ch) {
	                    case 'u':
	                    case 'x':
	                        if (source[index] === '{') {
	                            ++index;
	                            str += scanUnicodeCodePointEscape();
	                        } else {
	                            unescaped = scanHexEscape(ch);
	                            if (!unescaped) {
	                                throw throwUnexpectedToken();
	                            }
	                            str += unescaped;
	                        }
	                        break;
	                    case 'n':
	                        str += '\n';
	                        break;
	                    case 'r':
	                        str += '\r';
	                        break;
	                    case 't':
	                        str += '\t';
	                        break;
	                    case 'b':
	                        str += '\b';
	                        break;
	                    case 'f':
	                        str += '\f';
	                        break;
	                    case 'v':
	                        str += '\x0B';
	                        break;
	                    case '8':
	                    case '9':
	                        str += ch;
	                        tolerateUnexpectedToken();
	                        break;
	
	                    default:
	                        if (isOctalDigit(ch)) {
	                            octToDec = octalToDecimal(ch);
	
	                            octal = octToDec.octal || octal;
	                            str += String.fromCharCode(octToDec.code);
	                        } else {
	                            str += ch;
	                        }
	                        break;
	                    }
	                } else {
	                    ++lineNumber;
	                    if (ch === '\r' && source[index] === '\n') {
	                        ++index;
	                    }
	                    lineStart = index;
	                }
	            } else if (isLineTerminator(ch.charCodeAt(0))) {
	                break;
	            } else {
	                str += ch;
	            }
	        }
	
	        if (quote !== '') {
	            index = start;
	            throwUnexpectedToken();
	        }
	
	        return {
	            type: Token.StringLiteral,
	            value: str,
	            octal: octal,
	            lineNumber: startLineNumber,
	            lineStart: startLineStart,
	            start: start,
	            end: index
	        };
	    }
	
	    // ECMA-262 11.8.6 Template Literal Lexical Components
	
	    function scanTemplate() {
	        var cooked = '', ch, start, rawOffset, terminated, head, tail, restore, unescaped;
	
	        terminated = false;
	        tail = false;
	        start = index;
	        head = (source[index] === '`');
	        rawOffset = 2;
	
	        ++index;
	
	        while (index < length) {
	            ch = source[index++];
	            if (ch === '`') {
	                rawOffset = 1;
	                tail = true;
	                terminated = true;
	                break;
	            } else if (ch === '$') {
	                if (source[index] === '{') {
	                    state.curlyStack.push('${');
	                    ++index;
	                    terminated = true;
	                    break;
	                }
	                cooked += ch;
	            } else if (ch === '\\') {
	                ch = source[index++];
	                if (!isLineTerminator(ch.charCodeAt(0))) {
	                    switch (ch) {
	                    case 'n':
	                        cooked += '\n';
	                        break;
	                    case 'r':
	                        cooked += '\r';
	                        break;
	                    case 't':
	                        cooked += '\t';
	                        break;
	                    case 'u':
	                    case 'x':
	                        if (source[index] === '{') {
	                            ++index;
	                            cooked += scanUnicodeCodePointEscape();
	                        } else {
	                            restore = index;
	                            unescaped = scanHexEscape(ch);
	                            if (unescaped) {
	                                cooked += unescaped;
	                            } else {
	                                index = restore;
	                                cooked += ch;
	                            }
	                        }
	                        break;
	                    case 'b':
	                        cooked += '\b';
	                        break;
	                    case 'f':
	                        cooked += '\f';
	                        break;
	                    case 'v':
	                        cooked += '\v';
	                        break;
	
	                    default:
	                        if (ch === '0') {
	                            if (isDecimalDigit(source.charCodeAt(index))) {
	                                // Illegal: \01 \02 and so on
	                                throwError(Messages.TemplateOctalLiteral);
	                            }
	                            cooked += '\0';
	                        } else if (isOctalDigit(ch)) {
	                            // Illegal: \1 \2
	                            throwError(Messages.TemplateOctalLiteral);
	                        } else {
	                            cooked += ch;
	                        }
	                        break;
	                    }
	                } else {
	                    ++lineNumber;
	                    if (ch === '\r' && source[index] === '\n') {
	                        ++index;
	                    }
	                    lineStart = index;
	                }
	            } else if (isLineTerminator(ch.charCodeAt(0))) {
	                ++lineNumber;
	                if (ch === '\r' && source[index] === '\n') {
	                    ++index;
	                }
	                lineStart = index;
	                cooked += '\n';
	            } else {
	                cooked += ch;
	            }
	        }
	
	        if (!terminated) {
	            throwUnexpectedToken();
	        }
	
	        if (!head) {
	            state.curlyStack.pop();
	        }
	
	        return {
	            type: Token.Template,
	            value: {
	                cooked: cooked,
	                raw: source.slice(start + 1, index - rawOffset)
	            },
	            head: head,
	            tail: tail,
	            lineNumber: lineNumber,
	            lineStart: lineStart,
	            start: start,
	            end: index
	        };
	    }
	
	    // ECMA-262 11.8.5 Regular Expression Literals
	
	    function testRegExp(pattern, flags) {
	        // The BMP character to use as a replacement for astral symbols when
	        // translating an ES6 "u"-flagged pattern to an ES5-compatible
	        // approximation.
	        // Note: replacing with '\uFFFF' enables false positives in unlikely
	        // scenarios. For example, `[\u{1044f}-\u{10440}]` is an invalid
	        // pattern that would not be detected by this substitution.
	        var astralSubstitute = '\uFFFF',
	            tmp = pattern;
	
	        if (flags.indexOf('u') >= 0) {
	            tmp = tmp
	                // Replace every Unicode escape sequence with the equivalent
	                // BMP character or a constant ASCII code point in the case of
	                // astral symbols. (See the above note on `astralSubstitute`
	                // for more information.)
	                .replace(/\\u\{([0-9a-fA-F]+)\}|\\u([a-fA-F0-9]{4})/g, function ($0, $1, $2) {
	                    var codePoint = parseInt($1 || $2, 16);
	                    if (codePoint > 0x10FFFF) {
	                        throwUnexpectedToken(null, Messages.InvalidRegExp);
	                    }
	                    if (codePoint <= 0xFFFF) {
	                        return String.fromCharCode(codePoint);
	                    }
	                    return astralSubstitute;
	                })
	                // Replace each paired surrogate with a single ASCII symbol to
	                // avoid throwing on regular expressions that are only valid in
	                // combination with the "u" flag.
	                .replace(
	                    /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
	                    astralSubstitute
	                );
	        }
	
	        // First, detect invalid regular expressions.
	        try {
	            RegExp(tmp);
	        } catch (e) {
	            throwUnexpectedToken(null, Messages.InvalidRegExp);
	        }
	
	        // Return a regular expression object for this pattern-flag pair, or
	        // `null` in case the current environment doesn't support the flags it
	        // uses.
	        try {
	            return new RegExp(pattern, flags);
	        } catch (exception) {
	            /* istanbul ignore next */
	            return null;
	        }
	    }
	
	    function scanRegExpBody() {
	        var ch, str, classMarker, terminated, body;
	
	        ch = source[index];
	        assert(ch === '/', 'Regular expression literal must start with a slash');
	        str = source[index++];
	
	        classMarker = false;
	        terminated = false;
	        while (index < length) {
	            ch = source[index++];
	            str += ch;
	            if (ch === '\\') {
	                ch = source[index++];
	                // ECMA-262 7.8.5
	                if (isLineTerminator(ch.charCodeAt(0))) {
	                    throwUnexpectedToken(null, Messages.UnterminatedRegExp);
	                }
	                str += ch;
	            } else if (isLineTerminator(ch.charCodeAt(0))) {
	                throwUnexpectedToken(null, Messages.UnterminatedRegExp);
	            } else if (classMarker) {
	                if (ch === ']') {
	                    classMarker = false;
	                }
	            } else {
	                if (ch === '/') {
	                    terminated = true;
	                    break;
	                } else if (ch === '[') {
	                    classMarker = true;
	                }
	            }
	        }
	
	        if (!terminated) {
	            throwUnexpectedToken(null, Messages.UnterminatedRegExp);
	        }
	
	        // Exclude leading and trailing slash.
	        body = str.substr(1, str.length - 2);
	        return {
	            value: body,
	            literal: str
	        };
	    }
	
	    function scanRegExpFlags() {
	        var ch, str, flags, restore;
	
	        str = '';
	        flags = '';
	        while (index < length) {
	            ch = source[index];
	            if (!isIdentifierPart(ch.charCodeAt(0))) {
	                break;
	            }
	
	            ++index;
	            if (ch === '\\' && index < length) {
	                ch = source[index];
	                if (ch === 'u') {
	                    ++index;
	                    restore = index;
	                    ch = scanHexEscape('u');
	                    if (ch) {
	                        flags += ch;
	                        for (str += '\\u'; restore < index; ++restore) {
	                            str += source[restore];
	                        }
	                    } else {
	                        index = restore;
	                        flags += 'u';
	                        str += '\\u';
	                    }
	                    tolerateUnexpectedToken();
	                } else {
	                    str += '\\';
	                    tolerateUnexpectedToken();
	                }
	            } else {
	                flags += ch;
	                str += ch;
	            }
	        }
	
	        return {
	            value: flags,
	            literal: str
	        };
	    }
	
	    function scanRegExp() {
	        var start, body, flags, value;
	        scanning = true;
	
	        lookahead = null;
	        skipComment();
	        start = index;
	
	        body = scanRegExpBody();
	        flags = scanRegExpFlags();
	        value = testRegExp(body.value, flags.value);
	        scanning = false;
	        if (extra.tokenize) {
	            return {
	                type: Token.RegularExpression,
	                value: value,
	                regex: {
	                    pattern: body.value,
	                    flags: flags.value
	                },
	                lineNumber: lineNumber,
	                lineStart: lineStart,
	                start: start,
	                end: index
	            };
	        }
	
	        return {
	            literal: body.literal + flags.literal,
	            value: value,
	            regex: {
	                pattern: body.value,
	                flags: flags.value
	            },
	            start: start,
	            end: index
	        };
	    }
	
	    function collectRegex() {
	        var pos, loc, regex, token;
	
	        skipComment();
	
	        pos = index;
	        loc = {
	            start: {
	                line: lineNumber,
	                column: index - lineStart
	            }
	        };
	
	        regex = scanRegExp();
	
	        loc.end = {
	            line: lineNumber,
	            column: index - lineStart
	        };
	
	        /* istanbul ignore next */
	        if (!extra.tokenize) {
	            // Pop the previous token, which is likely '/' or '/='
	            if (extra.tokens.length > 0) {
	                token = extra.tokens[extra.tokens.length - 1];
	                if (token.range[0] === pos && token.type === 'Punctuator') {
	                    if (token.value === '/' || token.value === '/=') {
	                        extra.tokens.pop();
	                    }
	                }
	            }
	
	            extra.tokens.push({
	                type: 'RegularExpression',
	                value: regex.literal,
	                regex: regex.regex,
	                range: [pos, index],
	                loc: loc
	            });
	        }
	
	        return regex;
	    }
	
	    function isIdentifierName(token) {
	        return token.type === Token.Identifier ||
	            token.type === Token.Keyword ||
	            token.type === Token.BooleanLiteral ||
	            token.type === Token.NullLiteral;
	    }
	
	    // Using the following algorithm:
	    // https://github.com/mozilla/sweet.js/wiki/design
	
	    function advanceSlash() {
	        var regex, previous, check;
	
	        function testKeyword(value) {
	            return value && (value.length > 1) && (value[0] >= 'a') && (value[0] <= 'z');
	        }
	
	        previous = extra.tokenValues[extra.tokenValues.length - 1];
	        regex = (previous !== null);
	
	        switch (previous) {
	        case 'this':
	        case ']':
	            regex = false;
	            break;
	
	        case ')':
	            check = extra.tokenValues[extra.openParenToken - 1];
	            regex = (check === 'if' || check === 'while' || check === 'for' || check === 'with');
	            break;
	
	        case '}':
	            // Dividing a function by anything makes little sense,
	            // but we have to check for that.
	            regex = false;
	            if (testKeyword(extra.tokenValues[extra.openCurlyToken - 3])) {
	                // Anonymous function, e.g. function(){} /42
	                check = extra.tokenValues[extra.openCurlyToken - 4];
	                regex = check ? (FnExprTokens.indexOf(check) < 0) : false;
	            } else if (testKeyword(extra.tokenValues[extra.openCurlyToken - 4])) {
	                // Named function, e.g. function f(){} /42/
	                check = extra.tokenValues[extra.openCurlyToken - 5];
	                regex = check ? (FnExprTokens.indexOf(check) < 0) : true;
	            }
	        }
	
	        return regex ? collectRegex() : scanPunctuator();
	    }
	
	    function advance() {
	        var cp, token;
	
	        if (index >= length) {
	            return {
	                type: Token.EOF,
	                lineNumber: lineNumber,
	                lineStart: lineStart,
	                start: index,
	                end: index
	            };
	        }
	
	        cp = source.charCodeAt(index);
	
	        if (isIdentifierStart(cp)) {
	            token = scanIdentifier();
	            if (strict && isStrictModeReservedWord(token.value)) {
	                token.type = Token.Keyword;
	            }
	            return token;
	        }
	
	        // Very common: ( and ) and ;
	        if (cp === 0x28 || cp === 0x29 || cp === 0x3B) {
	            return scanPunctuator();
	        }
	
	        // String literal starts with single quote (U+0027) or double quote (U+0022).
	        if (cp === 0x27 || cp === 0x22) {
	            return scanStringLiteral();
	        }
	
	        // Dot (.) U+002E can also start a floating-point number, hence the need
	        // to check the next character.
	        if (cp === 0x2E) {
	            if (isDecimalDigit(source.charCodeAt(index + 1))) {
	                return scanNumericLiteral();
	            }
	            return scanPunctuator();
	        }
	
	        if (isDecimalDigit(cp)) {
	            return scanNumericLiteral();
	        }
	
	        // Slash (/) U+002F can also start a regex.
	        if (extra.tokenize && cp === 0x2F) {
	            return advanceSlash();
	        }
	
	        // Template literals start with ` (U+0060) for template head
	        // or } (U+007D) for template middle or template tail.
	        if (cp === 0x60 || (cp === 0x7D && state.curlyStack[state.curlyStack.length - 1] === '${')) {
	            return scanTemplate();
	        }
	
	        // Possible identifier start in a surrogate pair.
	        if (cp >= 0xD800 && cp < 0xDFFF) {
	            cp = codePointAt(index);
	            if (isIdentifierStart(cp)) {
	                return scanIdentifier();
	            }
	        }
	
	        return scanPunctuator();
	    }
	
	    function collectToken() {
	        var loc, token, value, entry;
	
	        loc = {
	            start: {
	                line: lineNumber,
	                column: index - lineStart
	            }
	        };
	
	        token = advance();
	        loc.end = {
	            line: lineNumber,
	            column: index - lineStart
	        };
	
	        if (token.type !== Token.EOF) {
	            value = source.slice(token.start, token.end);
	            entry = {
	                type: TokenName[token.type],
	                value: value,
	                range: [token.start, token.end],
	                loc: loc
	            };
	            if (token.regex) {
	                entry.regex = {
	                    pattern: token.regex.pattern,
	                    flags: token.regex.flags
	                };
	            }
	            if (extra.tokenValues) {
	                extra.tokenValues.push((entry.type === 'Punctuator' || entry.type === 'Keyword') ? entry.value : null);
	            }
	            if (extra.tokenize) {
	                if (!extra.range) {
	                    delete entry.range;
	                }
	                if (!extra.loc) {
	                    delete entry.loc;
	                }
	                if (extra.delegate) {
	                    entry = extra.delegate(entry);
	                }
	            }
	            extra.tokens.push(entry);
	        }
	
	        return token;
	    }
	
	    function lex() {
	        var token;
	        scanning = true;
	
	        lastIndex = index;
	        lastLineNumber = lineNumber;
	        lastLineStart = lineStart;
	
	        skipComment();
	
	        token = lookahead;
	
	        startIndex = index;
	        startLineNumber = lineNumber;
	        startLineStart = lineStart;
	
	        lookahead = (typeof extra.tokens !== 'undefined') ? collectToken() : advance();
	        scanning = false;
	        return token;
	    }
	
	    function peek() {
	        scanning = true;
	
	        skipComment();
	
	        lastIndex = index;
	        lastLineNumber = lineNumber;
	        lastLineStart = lineStart;
	
	        startIndex = index;
	        startLineNumber = lineNumber;
	        startLineStart = lineStart;
	
	        lookahead = (typeof extra.tokens !== 'undefined') ? collectToken() : advance();
	        scanning = false;
	    }
	
	    function Position() {
	        this.line = startLineNumber;
	        this.column = startIndex - startLineStart;
	    }
	
	    function SourceLocation() {
	        this.start = new Position();
	        this.end = null;
	    }
	
	    function WrappingSourceLocation(startToken) {
	        this.start = {
	            line: startToken.lineNumber,
	            column: startToken.start - startToken.lineStart
	        };
	        this.end = null;
	    }
	
	    function Node() {
	        if (extra.range) {
	            this.range = [startIndex, 0];
	        }
	        if (extra.loc) {
	            this.loc = new SourceLocation();
	        }
	    }
	
	    function WrappingNode(startToken) {
	        if (extra.range) {
	            this.range = [startToken.start, 0];
	        }
	        if (extra.loc) {
	            this.loc = new WrappingSourceLocation(startToken);
	        }
	    }
	
	    WrappingNode.prototype = Node.prototype = {
	
	        processComment: function () {
	            var lastChild,
	                innerComments,
	                leadingComments,
	                trailingComments,
	                bottomRight = extra.bottomRightStack,
	                i,
	                comment,
	                last = bottomRight[bottomRight.length - 1];
	
	            if (this.type === Syntax.Program) {
	                if (this.body.length > 0) {
	                    return;
	                }
	            }
	            /**
	             * patch innnerComments for properties empty block
	             * `function a() {/** comments **\/}`
	             */
	
	            if (this.type === Syntax.BlockStatement && this.body.length === 0) {
	                innerComments = [];
	                for (i = extra.leadingComments.length - 1; i >= 0; --i) {
	                    comment = extra.leadingComments[i];
	                    if (this.range[1] >= comment.range[1]) {
	                        innerComments.unshift(comment);
	                        extra.leadingComments.splice(i, 1);
	                        extra.trailingComments.splice(i, 1);
	                    }
	                }
	                if (innerComments.length) {
	                    this.innerComments = innerComments;
	                    //bottomRight.push(this);
	                    return;
	                }
	            }
	
	            if (extra.trailingComments.length > 0) {
	                trailingComments = [];
	                for (i = extra.trailingComments.length - 1; i >= 0; --i) {
	                    comment = extra.trailingComments[i];
	                    if (comment.range[0] >= this.range[1]) {
	                        trailingComments.unshift(comment);
	                        extra.trailingComments.splice(i, 1);
	                    }
	                }
	                extra.trailingComments = [];
	            } else {
	                if (last && last.trailingComments && last.trailingComments[0].range[0] >= this.range[1]) {
	                    trailingComments = last.trailingComments;
	                    delete last.trailingComments;
	                }
	            }
	
	            // Eating the stack.
	            while (last && last.range[0] >= this.range[0]) {
	                lastChild = bottomRight.pop();
	                last = bottomRight[bottomRight.length - 1];
	            }
	
	            if (lastChild) {
	                if (lastChild.leadingComments) {
	                    leadingComments = [];
	                    for (i = lastChild.leadingComments.length - 1; i >= 0; --i) {
	                        comment = lastChild.leadingComments[i];
	                        if (comment.range[1] <= this.range[0]) {
	                            leadingComments.unshift(comment);
	                            lastChild.leadingComments.splice(i, 1);
	                        }
	                    }
	
	                    if (!lastChild.leadingComments.length) {
	                        lastChild.leadingComments = undefined;
	                    }
	                }
	            } else if (extra.leadingComments.length > 0) {
	                leadingComments = [];
	                for (i = extra.leadingComments.length - 1; i >= 0; --i) {
	                    comment = extra.leadingComments[i];
	                    if (comment.range[1] <= this.range[0]) {
	                        leadingComments.unshift(comment);
	                        extra.leadingComments.splice(i, 1);
	                    }
	                }
	            }
	
	
	            if (leadingComments && leadingComments.length > 0) {
	                this.leadingComments = leadingComments;
	            }
	            if (trailingComments && trailingComments.length > 0) {
	                this.trailingComments = trailingComments;
	            }
	
	            bottomRight.push(this);
	        },
	
	        finish: function () {
	            if (extra.range) {
	                this.range[1] = lastIndex;
	            }
	            if (extra.loc) {
	                this.loc.end = {
	                    line: lastLineNumber,
	                    column: lastIndex - lastLineStart
	                };
	                if (extra.source) {
	                    this.loc.source = extra.source;
	                }
	            }
	
	            if (extra.attachComment) {
	                this.processComment();
	            }
	        },
	
	        finishArrayExpression: function (elements) {
	            this.type = Syntax.ArrayExpression;
	            this.elements = elements;
	            this.finish();
	            return this;
	        },
	
	        finishArrayPattern: function (elements) {
	            this.type = Syntax.ArrayPattern;
	            this.elements = elements;
	            this.finish();
	            return this;
	        },
	
	        finishArrowFunctionExpression: function (params, defaults, body, expression) {
	            this.type = Syntax.ArrowFunctionExpression;
	            this.id = null;
	            this.params = params;
	            this.defaults = defaults;
	            this.body = body;
	            this.generator = false;
	            this.expression = expression;
	            this.finish();
	            return this;
	        },
	
	        finishAssignmentExpression: function (operator, left, right) {
	            this.type = Syntax.AssignmentExpression;
	            this.operator = operator;
	            this.left = left;
	            this.right = right;
	            this.finish();
	            return this;
	        },
	
	        finishAssignmentPattern: function (left, right) {
	            this.type = Syntax.AssignmentPattern;
	            this.left = left;
	            this.right = right;
	            this.finish();
	            return this;
	        },
	
	        finishBinaryExpression: function (operator, left, right) {
	            this.type = (operator === '||' || operator === '&&') ? Syntax.LogicalExpression : Syntax.BinaryExpression;
	            this.operator = operator;
	            this.left = left;
	            this.right = right;
	            this.finish();
	            return this;
	        },
	
	        finishBlockStatement: function (body) {
	            this.type = Syntax.BlockStatement;
	            this.body = body;
	            this.finish();
	            return this;
	        },
	
	        finishBreakStatement: function (label) {
	            this.type = Syntax.BreakStatement;
	            this.label = label;
	            this.finish();
	            return this;
	        },
	
	        finishCallExpression: function (callee, args) {
	            this.type = Syntax.CallExpression;
	            this.callee = callee;
	            this.arguments = args;
	            this.finish();
	            return this;
	        },
	
	        finishCatchClause: function (param, body) {
	            this.type = Syntax.CatchClause;
	            this.param = param;
	            this.body = body;
	            this.finish();
	            return this;
	        },
	
	        finishClassBody: function (body) {
	            this.type = Syntax.ClassBody;
	            this.body = body;
	            this.finish();
	            return this;
	        },
	
	        finishClassDeclaration: function (id, superClass, body) {
	            this.type = Syntax.ClassDeclaration;
	            this.id = id;
	            this.superClass = superClass;
	            this.body = body;
	            this.finish();
	            return this;
	        },
	
	        finishClassExpression: function (id, superClass, body) {
	            this.type = Syntax.ClassExpression;
	            this.id = id;
	            this.superClass = superClass;
	            this.body = body;
	            this.finish();
	            return this;
	        },
	
	        finishConditionalExpression: function (test, consequent, alternate) {
	            this.type = Syntax.ConditionalExpression;
	            this.test = test;
	            this.consequent = consequent;
	            this.alternate = alternate;
	            this.finish();
	            return this;
	        },
	
	        finishContinueStatement: function (label) {
	            this.type = Syntax.ContinueStatement;
	            this.label = label;
	            this.finish();
	            return this;
	        },
	
	        finishDebuggerStatement: function () {
	            this.type = Syntax.DebuggerStatement;
	            this.finish();
	            return this;
	        },
	
	        finishDoWhileStatement: function (body, test) {
	            this.type = Syntax.DoWhileStatement;
	            this.body = body;
	            this.test = test;
	            this.finish();
	            return this;
	        },
	
	        finishEmptyStatement: function () {
	            this.type = Syntax.EmptyStatement;
	            this.finish();
	            return this;
	        },
	
	        finishExpressionStatement: function (expression) {
	            this.type = Syntax.ExpressionStatement;
	            this.expression = expression;
	            this.finish();
	            return this;
	        },
	
	        finishForStatement: function (init, test, update, body) {
	            this.type = Syntax.ForStatement;
	            this.init = init;
	            this.test = test;
	            this.update = update;
	            this.body = body;
	            this.finish();
	            return this;
	        },
	
	        finishForOfStatement: function (left, right, body) {
	            this.type = Syntax.ForOfStatement;
	            this.left = left;
	            this.right = right;
	            this.body = body;
	            this.finish();
	            return this;
	        },
	
	        finishForInStatement: function (left, right, body) {
	            this.type = Syntax.ForInStatement;
	            this.left = left;
	            this.right = right;
	            this.body = body;
	            this.each = false;
	            this.finish();
	            return this;
	        },
	
	        finishFunctionDeclaration: function (id, params, defaults, body, generator) {
	            this.type = Syntax.FunctionDeclaration;
	            this.id = id;
	            this.params = params;
	            this.defaults = defaults;
	            this.body = body;
	            this.generator = generator;
	            this.expression = false;
	            this.finish();
	            return this;
	        },
	
	        finishFunctionExpression: function (id, params, defaults, body, generator) {
	            this.type = Syntax.FunctionExpression;
	            this.id = id;
	            this.params = params;
	            this.defaults = defaults;
	            this.body = body;
	            this.generator = generator;
	            this.expression = false;
	            this.finish();
	            return this;
	        },
	
	        finishIdentifier: function (name) {
	            this.type = Syntax.Identifier;
	            this.name = name;
	            this.finish();
	            return this;
	        },
	
	        finishIfStatement: function (test, consequent, alternate) {
	            this.type = Syntax.IfStatement;
	            this.test = test;
	            this.consequent = consequent;
	            this.alternate = alternate;
	            this.finish();
	            return this;
	        },
	
	        finishLabeledStatement: function (label, body) {
	            this.type = Syntax.LabeledStatement;
	            this.label = label;
	            this.body = body;
	            this.finish();
	            return this;
	        },
	
	        finishLiteral: function (token) {
	            this.type = Syntax.Literal;
	            this.value = token.value;
	            this.raw = source.slice(token.start, token.end);
	            if (token.regex) {
	                this.regex = token.regex;
	            }
	            this.finish();
	            return this;
	        },
	
	        finishMemberExpression: function (accessor, object, property) {
	            this.type = Syntax.MemberExpression;
	            this.computed = accessor === '[';
	            this.object = object;
	            this.property = property;
	            this.finish();
	            return this;
	        },
	
	        finishMetaProperty: function (meta, property) {
	            this.type = Syntax.MetaProperty;
	            this.meta = meta;
	            this.property = property;
	            this.finish();
	            return this;
	        },
	
	        finishNewExpression: function (callee, args) {
	            this.type = Syntax.NewExpression;
	            this.callee = callee;
	            this.arguments = args;
	            this.finish();
	            return this;
	        },
	
	        finishObjectExpression: function (properties) {
	            this.type = Syntax.ObjectExpression;
	            this.properties = properties;
	            this.finish();
	            return this;
	        },
	
	        finishObjectPattern: function (properties) {
	            this.type = Syntax.ObjectPattern;
	            this.properties = properties;
	            this.finish();
	            return this;
	        },
	
	        finishPostfixExpression: function (operator, argument) {
	            this.type = Syntax.UpdateExpression;
	            this.operator = operator;
	            this.argument = argument;
	            this.prefix = false;
	            this.finish();
	            return this;
	        },
	
	        finishProgram: function (body, sourceType) {
	            this.type = Syntax.Program;
	            this.body = body;
	            this.sourceType = sourceType;
	            this.finish();
	            return this;
	        },
	
	        finishProperty: function (kind, key, computed, value, method, shorthand) {
	            this.type = Syntax.Property;
	            this.key = key;
	            this.computed = computed;
	            this.value = value;
	            this.kind = kind;
	            this.method = method;
	            this.shorthand = shorthand;
	            this.finish();
	            return this;
	        },
	
	        finishRestElement: function (argument) {
	            this.type = Syntax.RestElement;
	            this.argument = argument;
	            this.finish();
	            return this;
	        },
	
	        finishReturnStatement: function (argument) {
	            this.type = Syntax.ReturnStatement;
	            this.argument = argument;
	            this.finish();
	            return this;
	        },
	
	        finishSequenceExpression: function (expressions) {
	            this.type = Syntax.SequenceExpression;
	            this.expressions = expressions;
	            this.finish();
	            return this;
	        },
	
	        finishSpreadElement: function (argument) {
	            this.type = Syntax.SpreadElement;
	            this.argument = argument;
	            this.finish();
	            return this;
	        },
	
	        finishSwitchCase: function (test, consequent) {
	            this.type = Syntax.SwitchCase;
	            this.test = test;
	            this.consequent = consequent;
	            this.finish();
	            return this;
	        },
	
	        finishSuper: function () {
	            this.type = Syntax.Super;
	            this.finish();
	            return this;
	        },
	
	        finishSwitchStatement: function (discriminant, cases) {
	            this.type = Syntax.SwitchStatement;
	            this.discriminant = discriminant;
	            this.cases = cases;
	            this.finish();
	            return this;
	        },
	
	        finishTaggedTemplateExpression: function (tag, quasi) {
	            this.type = Syntax.TaggedTemplateExpression;
	            this.tag = tag;
	            this.quasi = quasi;
	            this.finish();
	            return this;
	        },
	
	        finishTemplateElement: function (value, tail) {
	            this.type = Syntax.TemplateElement;
	            this.value = value;
	            this.tail = tail;
	            this.finish();
	            return this;
	        },
	
	        finishTemplateLiteral: function (quasis, expressions) {
	            this.type = Syntax.TemplateLiteral;
	            this.quasis = quasis;
	            this.expressions = expressions;
	            this.finish();
	            return this;
	        },
	
	        finishThisExpression: function () {
	            this.type = Syntax.ThisExpression;
	            this.finish();
	            return this;
	        },
	
	        finishThrowStatement: function (argument) {
	            this.type = Syntax.ThrowStatement;
	            this.argument = argument;
	            this.finish();
	            return this;
	        },
	
	        finishTryStatement: function (block, handler, finalizer) {
	            this.type = Syntax.TryStatement;
	            this.block = block;
	            this.guardedHandlers = [];
	            this.handlers = handler ? [handler] : [];
	            this.handler = handler;
	            this.finalizer = finalizer;
	            this.finish();
	            return this;
	        },
	
	        finishUnaryExpression: function (operator, argument) {
	            this.type = (operator === '++' || operator === '--') ? Syntax.UpdateExpression : Syntax.UnaryExpression;
	            this.operator = operator;
	            this.argument = argument;
	            this.prefix = true;
	            this.finish();
	            return this;
	        },
	
	        finishVariableDeclaration: function (declarations) {
	            this.type = Syntax.VariableDeclaration;
	            this.declarations = declarations;
	            this.kind = 'var';
	            this.finish();
	            return this;
	        },
	
	        finishLexicalDeclaration: function (declarations, kind) {
	            this.type = Syntax.VariableDeclaration;
	            this.declarations = declarations;
	            this.kind = kind;
	            this.finish();
	            return this;
	        },
	
	        finishVariableDeclarator: function (id, init) {
	            this.type = Syntax.VariableDeclarator;
	            this.id = id;
	            this.init = init;
	            this.finish();
	            return this;
	        },
	
	        finishWhileStatement: function (test, body) {
	            this.type = Syntax.WhileStatement;
	            this.test = test;
	            this.body = body;
	            this.finish();
	            return this;
	        },
	
	        finishWithStatement: function (object, body) {
	            this.type = Syntax.WithStatement;
	            this.object = object;
	            this.body = body;
	            this.finish();
	            return this;
	        },
	
	        finishExportSpecifier: function (local, exported) {
	            this.type = Syntax.ExportSpecifier;
	            this.exported = exported || local;
	            this.local = local;
	            this.finish();
	            return this;
	        },
	
	        finishImportDefaultSpecifier: function (local) {
	            this.type = Syntax.ImportDefaultSpecifier;
	            this.local = local;
	            this.finish();
	            return this;
	        },
	
	        finishImportNamespaceSpecifier: function (local) {
	            this.type = Syntax.ImportNamespaceSpecifier;
	            this.local = local;
	            this.finish();
	            return this;
	        },
	
	        finishExportNamedDeclaration: function (declaration, specifiers, src) {
	            this.type = Syntax.ExportNamedDeclaration;
	            this.declaration = declaration;
	            this.specifiers = specifiers;
	            this.source = src;
	            this.finish();
	            return this;
	        },
	
	        finishExportDefaultDeclaration: function (declaration) {
	            this.type = Syntax.ExportDefaultDeclaration;
	            this.declaration = declaration;
	            this.finish();
	            return this;
	        },
	
	        finishExportAllDeclaration: function (src) {
	            this.type = Syntax.ExportAllDeclaration;
	            this.source = src;
	            this.finish();
	            return this;
	        },
	
	        finishImportSpecifier: function (local, imported) {
	            this.type = Syntax.ImportSpecifier;
	            this.local = local || imported;
	            this.imported = imported;
	            this.finish();
	            return this;
	        },
	
	        finishImportDeclaration: function (specifiers, src) {
	            this.type = Syntax.ImportDeclaration;
	            this.specifiers = specifiers;
	            this.source = src;
	            this.finish();
	            return this;
	        },
	
	        finishYieldExpression: function (argument, delegate) {
	            this.type = Syntax.YieldExpression;
	            this.argument = argument;
	            this.delegate = delegate;
	            this.finish();
	            return this;
	        }
	    };
	
	
	    function recordError(error) {
	        var e, existing;
	
	        for (e = 0; e < extra.errors.length; e++) {
	            existing = extra.errors[e];
	            // Prevent duplicated error.
	            /* istanbul ignore next */
	            if (existing.index === error.index && existing.message === error.message) {
	                return;
	            }
	        }
	
	        extra.errors.push(error);
	    }
	
	    function constructError(msg, column) {
	        var error = new Error(msg);
	        try {
	            throw error;
	        } catch (base) {
	            /* istanbul ignore else */
	            if (Object.create && Object.defineProperty) {
	                error = Object.create(base);
	                Object.defineProperty(error, 'column', { value: column });
	            }
	        } finally {
	            return error;
	        }
	    }
	
	    function createError(line, pos, description) {
	        var msg, column, error;
	
	        msg = 'Line ' + line + ': ' + description;
	        column = pos - (scanning ? lineStart : lastLineStart) + 1;
	        error = constructError(msg, column);
	        error.lineNumber = line;
	        error.description = description;
	        error.index = pos;
	        return error;
	    }
	
	    // Throw an exception
	
	    function throwError(messageFormat) {
	        var args, msg;
	
	        args = Array.prototype.slice.call(arguments, 1);
	        msg = messageFormat.replace(/%(\d)/g,
	            function (whole, idx) {
	                assert(idx < args.length, 'Message reference must be in range');
	                return args[idx];
	            }
	        );
	
	        throw createError(lastLineNumber, lastIndex, msg);
	    }
	
	    function tolerateError(messageFormat) {
	        var args, msg, error;
	
	        args = Array.prototype.slice.call(arguments, 1);
	        /* istanbul ignore next */
	        msg = messageFormat.replace(/%(\d)/g,
	            function (whole, idx) {
	                assert(idx < args.length, 'Message reference must be in range');
	                return args[idx];
	            }
	        );
	
	        error = createError(lineNumber, lastIndex, msg);
	        if (extra.errors) {
	            recordError(error);
	        } else {
	            throw error;
	        }
	    }
	
	    // Throw an exception because of the token.
	
	    function unexpectedTokenError(token, message) {
	        var value, msg = message || Messages.UnexpectedToken;
	
	        if (token) {
	            if (!message) {
	                msg = (token.type === Token.EOF) ? Messages.UnexpectedEOS :
	                    (token.type === Token.Identifier) ? Messages.UnexpectedIdentifier :
	                    (token.type === Token.NumericLiteral) ? Messages.UnexpectedNumber :
	                    (token.type === Token.StringLiteral) ? Messages.UnexpectedString :
	                    (token.type === Token.Template) ? Messages.UnexpectedTemplate :
	                    Messages.UnexpectedToken;
	
	                if (token.type === Token.Keyword) {
	                    if (isFutureReservedWord(token.value)) {
	                        msg = Messages.UnexpectedReserved;
	                    } else if (strict && isStrictModeReservedWord(token.value)) {
	                        msg = Messages.StrictReservedWord;
	                    }
	                }
	            }
	
	            value = (token.type === Token.Template) ? token.value.raw : token.value;
	        } else {
	            value = 'ILLEGAL';
	        }
	
	        msg = msg.replace('%0', value);
	
	        return (token && typeof token.lineNumber === 'number') ?
	            createError(token.lineNumber, token.start, msg) :
	            createError(scanning ? lineNumber : lastLineNumber, scanning ? index : lastIndex, msg);
	    }
	
	    function throwUnexpectedToken(token, message) {
	        throw unexpectedTokenError(token, message);
	    }
	
	    function tolerateUnexpectedToken(token, message) {
	        var error = unexpectedTokenError(token, message);
	        if (extra.errors) {
	            recordError(error);
	        } else {
	            throw error;
	        }
	    }
	
	    // Expect the next token to match the specified punctuator.
	    // If not, an exception will be thrown.
	
	    function expect(value) {
	        var token = lex();
	        if (token.type !== Token.Punctuator || token.value !== value) {
	            throwUnexpectedToken(token);
	        }
	    }
	
	    /**
	     * @name expectCommaSeparator
	     * @description Quietly expect a comma when in tolerant mode, otherwise delegates
	     * to <code>expect(value)</code>
	     * @since 2.0
	     */
	    function expectCommaSeparator() {
	        var token;
	
	        if (extra.errors) {
	            token = lookahead;
	            if (token.type === Token.Punctuator && token.value === ',') {
	                lex();
	            } else if (token.type === Token.Punctuator && token.value === ';') {
	                lex();
	                tolerateUnexpectedToken(token);
	            } else {
	                tolerateUnexpectedToken(token, Messages.UnexpectedToken);
	            }
	        } else {
	            expect(',');
	        }
	    }
	
	    // Expect the next token to match the specified keyword.
	    // If not, an exception will be thrown.
	
	    function expectKeyword(keyword) {
	        var token = lex();
	        if (token.type !== Token.Keyword || token.value !== keyword) {
	            throwUnexpectedToken(token);
	        }
	    }
	
	    // Return true if the next token matches the specified punctuator.
	
	    function match(value) {
	        return lookahead.type === Token.Punctuator && lookahead.value === value;
	    }
	
	    // Return true if the next token matches the specified keyword
	
	    function matchKeyword(keyword) {
	        return lookahead.type === Token.Keyword && lookahead.value === keyword;
	    }
	
	    // Return true if the next token matches the specified contextual keyword
	    // (where an identifier is sometimes a keyword depending on the context)
	
	    function matchContextualKeyword(keyword) {
	        return lookahead.type === Token.Identifier && lookahead.value === keyword;
	    }
	
	    // Return true if the next token is an assignment operator
	
	    function matchAssign() {
	        var op;
	
	        if (lookahead.type !== Token.Punctuator) {
	            return false;
	        }
	        op = lookahead.value;
	        return op === '=' ||
	            op === '*=' ||
	            op === '/=' ||
	            op === '%=' ||
	            op === '+=' ||
	            op === '-=' ||
	            op === '<<=' ||
	            op === '>>=' ||
	            op === '>>>=' ||
	            op === '&=' ||
	            op === '^=' ||
	            op === '|=';
	    }
	
	    function consumeSemicolon() {
	        // Catch the very common case first: immediately a semicolon (U+003B).
	        if (source.charCodeAt(startIndex) === 0x3B || match(';')) {
	            lex();
	            return;
	        }
	
	        if (hasLineTerminator) {
	            return;
	        }
	
	        // FIXME(ikarienator): this is seemingly an issue in the previous location info convention.
	        lastIndex = startIndex;
	        lastLineNumber = startLineNumber;
	        lastLineStart = startLineStart;
	
	        if (lookahead.type !== Token.EOF && !match('}')) {
	            throwUnexpectedToken(lookahead);
	        }
	    }
	
	    // Cover grammar support.
	    //
	    // When an assignment expression position starts with an left parenthesis, the determination of the type
	    // of the syntax is to be deferred arbitrarily long until the end of the parentheses pair (plus a lookahead)
	    // or the first comma. This situation also defers the determination of all the expressions nested in the pair.
	    //
	    // There are three productions that can be parsed in a parentheses pair that needs to be determined
	    // after the outermost pair is closed. They are:
	    //
	    //   1. AssignmentExpression
	    //   2. BindingElements
	    //   3. AssignmentTargets
	    //
	    // In order to avoid exponential backtracking, we use two flags to denote if the production can be
	    // binding element or assignment target.
	    //
	    // The three productions have the relationship:
	    //
	    //   BindingElements ⊆ AssignmentTargets ⊆ AssignmentExpression
	    //
	    // with a single exception that CoverInitializedName when used directly in an Expression, generates
	    // an early error. Therefore, we need the third state, firstCoverInitializedNameError, to track the
	    // first usage of CoverInitializedName and report it when we reached the end of the parentheses pair.
	    //
	    // isolateCoverGrammar function runs the given parser function with a new cover grammar context, and it does not
	    // effect the current flags. This means the production the parser parses is only used as an expression. Therefore
	    // the CoverInitializedName check is conducted.
	    //
	    // inheritCoverGrammar function runs the given parse function with a new cover grammar context, and it propagates
	    // the flags outside of the parser. This means the production the parser parses is used as a part of a potential
	    // pattern. The CoverInitializedName check is deferred.
	    function isolateCoverGrammar(parser) {
	        var oldIsBindingElement = isBindingElement,
	            oldIsAssignmentTarget = isAssignmentTarget,
	            oldFirstCoverInitializedNameError = firstCoverInitializedNameError,
	            result;
	        isBindingElement = true;
	        isAssignmentTarget = true;
	        firstCoverInitializedNameError = null;
	        result = parser();
	        if (firstCoverInitializedNameError !== null) {
	            throwUnexpectedToken(firstCoverInitializedNameError);
	        }
	        isBindingElement = oldIsBindingElement;
	        isAssignmentTarget = oldIsAssignmentTarget;
	        firstCoverInitializedNameError = oldFirstCoverInitializedNameError;
	        return result;
	    }
	
	    function inheritCoverGrammar(parser) {
	        var oldIsBindingElement = isBindingElement,
	            oldIsAssignmentTarget = isAssignmentTarget,
	            oldFirstCoverInitializedNameError = firstCoverInitializedNameError,
	            result;
	        isBindingElement = true;
	        isAssignmentTarget = true;
	        firstCoverInitializedNameError = null;
	        result = parser();
	        isBindingElement = isBindingElement && oldIsBindingElement;
	        isAssignmentTarget = isAssignmentTarget && oldIsAssignmentTarget;
	        firstCoverInitializedNameError = oldFirstCoverInitializedNameError || firstCoverInitializedNameError;
	        return result;
	    }
	
	    // ECMA-262 13.3.3 Destructuring Binding Patterns
	
	    function parseArrayPattern(params, kind) {
	        var node = new Node(), elements = [], rest, restNode;
	        expect('[');
	
	        while (!match(']')) {
	            if (match(',')) {
	                lex();
	                elements.push(null);
	            } else {
	                if (match('...')) {
	                    restNode = new Node();
	                    lex();
	                    params.push(lookahead);
	                    rest = parseVariableIdentifier(kind);
	                    elements.push(restNode.finishRestElement(rest));
	                    break;
	                } else {
	                    elements.push(parsePatternWithDefault(params, kind));
	                }
	                if (!match(']')) {
	                    expect(',');
	                }
	            }
	
	        }
	
	        expect(']');
	
	        return node.finishArrayPattern(elements);
	    }
	
	    function parsePropertyPattern(params, kind) {
	        var node = new Node(), key, keyToken, computed = match('['), init;
	        if (lookahead.type === Token.Identifier) {
	            keyToken = lookahead;
	            key = parseVariableIdentifier();
	            if (match('=')) {
	                params.push(keyToken);
	                lex();
	                init = parseAssignmentExpression();
	
	                return node.finishProperty(
	                    'init', key, false,
	                    new WrappingNode(keyToken).finishAssignmentPattern(key, init), false, true);
	            } else if (!match(':')) {
	                params.push(keyToken);
	                return node.finishProperty('init', key, false, key, false, true);
	            }
	        } else {
	            key = parseObjectPropertyKey();
	        }
	        expect(':');
	        init = parsePatternWithDefault(params, kind);
	        return node.finishProperty('init', key, computed, init, false, false);
	    }
	
	    function parseObjectPattern(params, kind) {
	        var node = new Node(), properties = [];
	
	        expect('{');
	
	        while (!match('}')) {
	            properties.push(parsePropertyPattern(params, kind));
	            if (!match('}')) {
	                expect(',');
	            }
	        }
	
	        lex();
	
	        return node.finishObjectPattern(properties);
	    }
	
	    function parsePattern(params, kind) {
	        if (match('[')) {
	            return parseArrayPattern(params, kind);
	        } else if (match('{')) {
	            return parseObjectPattern(params, kind);
	        } else if (matchKeyword('let')) {
	            if (kind === 'const' || kind === 'let') {
	                tolerateUnexpectedToken(lookahead, Messages.UnexpectedToken);
	            }
	        }
	
	        params.push(lookahead);
	        return parseVariableIdentifier(kind);
	    }
	
	    function parsePatternWithDefault(params, kind) {
	        var startToken = lookahead, pattern, previousAllowYield, right;
	        pattern = parsePattern(params, kind);
	        if (match('=')) {
	            lex();
	            previousAllowYield = state.allowYield;
	            state.allowYield = true;
	            right = isolateCoverGrammar(parseAssignmentExpression);
	            state.allowYield = previousAllowYield;
	            pattern = new WrappingNode(startToken).finishAssignmentPattern(pattern, right);
	        }
	        return pattern;
	    }
	
	    // ECMA-262 12.2.5 Array Initializer
	
	    function parseArrayInitializer() {
	        var elements = [], node = new Node(), restSpread;
	
	        expect('[');
	
	        while (!match(']')) {
	            if (match(',')) {
	                lex();
	                elements.push(null);
	            } else if (match('...')) {
	                restSpread = new Node();
	                lex();
	                restSpread.finishSpreadElement(inheritCoverGrammar(parseAssignmentExpression));
	
	                if (!match(']')) {
	                    isAssignmentTarget = isBindingElement = false;
	                    expect(',');
	                }
	                elements.push(restSpread);
	            } else {
	                elements.push(inheritCoverGrammar(parseAssignmentExpression));
	
	                if (!match(']')) {
	                    expect(',');
	                }
	            }
	        }
	
	        lex();
	
	        return node.finishArrayExpression(elements);
	    }
	
	    // ECMA-262 12.2.6 Object Initializer
	
	    function parsePropertyFunction(node, paramInfo, isGenerator) {
	        var previousStrict, body;
	
	        isAssignmentTarget = isBindingElement = false;
	
	        previousStrict = strict;
	        body = isolateCoverGrammar(parseFunctionSourceElements);
	
	        if (strict && paramInfo.firstRestricted) {
	            tolerateUnexpectedToken(paramInfo.firstRestricted, paramInfo.message);
	        }
	        if (strict && paramInfo.stricted) {
	            tolerateUnexpectedToken(paramInfo.stricted, paramInfo.message);
	        }
	
	        strict = previousStrict;
	        return node.finishFunctionExpression(null, paramInfo.params, paramInfo.defaults, body, isGenerator);
	    }
	
	    function parsePropertyMethodFunction() {
	        var params, method, node = new Node(),
	            previousAllowYield = state.allowYield;
	
	        state.allowYield = false;
	        params = parseParams();
	        state.allowYield = previousAllowYield;
	
	        state.allowYield = false;
	        method = parsePropertyFunction(node, params, false);
	        state.allowYield = previousAllowYield;
	
	        return method;
	    }
	
	    function parseObjectPropertyKey() {
	        var token, node = new Node(), expr;
	
	        token = lex();
	
	        // Note: This function is called only from parseObjectProperty(), where
	        // EOF and Punctuator tokens are already filtered out.
	
	        switch (token.type) {
	        case Token.StringLiteral:
	        case Token.NumericLiteral:
	            if (strict && token.octal) {
	                tolerateUnexpectedToken(token, Messages.StrictOctalLiteral);
	            }
	            return node.finishLiteral(token);
	        case Token.Identifier:
	        case Token.BooleanLiteral:
	        case Token.NullLiteral:
	        case Token.Keyword:
	            return node.finishIdentifier(token.value);
	        case Token.Punctuator:
	            if (token.value === '[') {
	                expr = isolateCoverGrammar(parseAssignmentExpression);
	                expect(']');
	                return expr;
	            }
	            break;
	        }
	        throwUnexpectedToken(token);
	    }
	
	    function lookaheadPropertyName() {
	        switch (lookahead.type) {
	        case Token.Identifier:
	        case Token.StringLiteral:
	        case Token.BooleanLiteral:
	        case Token.NullLiteral:
	        case Token.NumericLiteral:
	        case Token.Keyword:
	            return true;
	        case Token.Punctuator:
	            return lookahead.value === '[';
	        }
	        return false;
	    }
	
	    // This function is to try to parse a MethodDefinition as defined in 14.3. But in the case of object literals,
	    // it might be called at a position where there is in fact a short hand identifier pattern or a data property.
	    // This can only be determined after we consumed up to the left parentheses.
	    //
	    // In order to avoid back tracking, it returns `null` if the position is not a MethodDefinition and the caller
	    // is responsible to visit other options.
	    function tryParseMethodDefinition(token, key, computed, node) {
	        var value, options, methodNode, params,
	            previousAllowYield = state.allowYield;
	
	        if (token.type === Token.Identifier) {
	            // check for `get` and `set`;
	
	            if (token.value === 'get' && lookaheadPropertyName()) {
	                computed = match('[');
	                key = parseObjectPropertyKey();
	                methodNode = new Node();
	                expect('(');
	                expect(')');
	
	                state.allowYield = false;
	                value = parsePropertyFunction(methodNode, {
	                    params: [],
	                    defaults: [],
	                    stricted: null,
	                    firstRestricted: null,
	                    message: null
	                }, false);
	                state.allowYield = previousAllowYield;
	
	                return node.finishProperty('get', key, computed, value, false, false);
	            } else if (token.value === 'set' && lookaheadPropertyName()) {
	                computed = match('[');
	                key = parseObjectPropertyKey();
	                methodNode = new Node();
	                expect('(');
	
	                options = {
	                    params: [],
	                    defaultCount: 0,
	                    defaults: [],
	                    firstRestricted: null,
	                    paramSet: {}
	                };
	                if (match(')')) {
	                    tolerateUnexpectedToken(lookahead);
	                } else {
	                    state.allowYield = false;
	                    parseParam(options);
	                    state.allowYield = previousAllowYield;
	                    if (options.defaultCount === 0) {
	                        options.defaults = [];
	                    }
	                }
	                expect(')');
	
	                state.allowYield = false;
	                value = parsePropertyFunction(methodNode, options, false);
	                state.allowYield = previousAllowYield;
	
	                return node.finishProperty('set', key, computed, value, false, false);
	            }
	        } else if (token.type === Token.Punctuator && token.value === '*' && lookaheadPropertyName()) {
	            computed = match('[');
	            key = parseObjectPropertyKey();
	            methodNode = new Node();
	
	            state.allowYield = true;
	            params = parseParams();
	            state.allowYield = previousAllowYield;
	
	            state.allowYield = false;
	            value = parsePropertyFunction(methodNode, params, true);
	            state.allowYield = previousAllowYield;
	
	            return node.finishProperty('init', key, computed, value, true, false);
	        }
	
	        if (key && match('(')) {
	            value = parsePropertyMethodFunction();
	            return node.finishProperty('init', key, computed, value, true, false);
	        }
	
	        // Not a MethodDefinition.
	        return null;
	    }
	
	    function parseObjectProperty(hasProto) {
	        var token = lookahead, node = new Node(), computed, key, maybeMethod, proto, value;
	
	        computed = match('[');
	        if (match('*')) {
	            lex();
	        } else {
	            key = parseObjectPropertyKey();
	        }
	        maybeMethod = tryParseMethodDefinition(token, key, computed, node);
	        if (maybeMethod) {
	            return maybeMethod;
	        }
	
	        if (!key) {
	            throwUnexpectedToken(lookahead);
	        }
	
	        // Check for duplicated __proto__
	        if (!computed) {
	            proto = (key.type === Syntax.Identifier && key.name === '__proto__') ||
	                (key.type === Syntax.Literal && key.value === '__proto__');
	            if (hasProto.value && proto) {
	                tolerateError(Messages.DuplicateProtoProperty);
	            }
	            hasProto.value |= proto;
	        }
	
	        if (match(':')) {
	            lex();
	            value = inheritCoverGrammar(parseAssignmentExpression);
	            return node.finishProperty('init', key, computed, value, false, false);
	        }
	
	        if (token.type === Token.Identifier) {
	            if (match('=')) {
	                firstCoverInitializedNameError = lookahead;
	                lex();
	                value = isolateCoverGrammar(parseAssignmentExpression);
	                return node.finishProperty('init', key, computed,
	                    new WrappingNode(token).finishAssignmentPattern(key, value), false, true);
	            }
	            return node.finishProperty('init', key, computed, key, false, true);
	        }
	
	        throwUnexpectedToken(lookahead);
	    }
	
	    function parseObjectInitializer() {
	        var properties = [], hasProto = {value: false}, node = new Node();
	
	        expect('{');
	
	        while (!match('}')) {
	            properties.push(parseObjectProperty(hasProto));
	
	            if (!match('}')) {
	                expectCommaSeparator();
	            }
	        }
	
	        expect('}');
	
	        return node.finishObjectExpression(properties);
	    }
	
	    function reinterpretExpressionAsPattern(expr) {
	        var i;
	        switch (expr.type) {
	        case Syntax.Identifier:
	        case Syntax.MemberExpression:
	        case Syntax.RestElement:
	        case Syntax.AssignmentPattern:
	            break;
	        case Syntax.SpreadElement:
	            expr.type = Syntax.RestElement;
	            reinterpretExpressionAsPattern(expr.argument);
	            break;
	        case Syntax.ArrayExpression:
	            expr.type = Syntax.ArrayPattern;
	            for (i = 0; i < expr.elements.length; i++) {
	                if (expr.elements[i] !== null) {
	                    reinterpretExpressionAsPattern(expr.elements[i]);
	                }
	            }
	            break;
	        case Syntax.ObjectExpression:
	            expr.type = Syntax.ObjectPattern;
	            for (i = 0; i < expr.properties.length; i++) {
	                reinterpretExpressionAsPattern(expr.properties[i].value);
	            }
	            break;
	        case Syntax.AssignmentExpression:
	            expr.type = Syntax.AssignmentPattern;
	            reinterpretExpressionAsPattern(expr.left);
	            break;
	        default:
	            // Allow other node type for tolerant parsing.
	            break;
	        }
	    }
	
	    // ECMA-262 12.2.9 Template Literals
	
	    function parseTemplateElement(option) {
	        var node, token;
	
	        if (lookahead.type !== Token.Template || (option.head && !lookahead.head)) {
	            throwUnexpectedToken();
	        }
	
	        node = new Node();
	        token = lex();
	
	        return node.finishTemplateElement({ raw: token.value.raw, cooked: token.value.cooked }, token.tail);
	    }
	
	    function parseTemplateLiteral() {
	        var quasi, quasis, expressions, node = new Node();
	
	        quasi = parseTemplateElement({ head: true });
	        quasis = [quasi];
	        expressions = [];
	
	        while (!quasi.tail) {
	            expressions.push(parseExpression());
	            quasi = parseTemplateElement({ head: false });
	            quasis.push(quasi);
	        }
	
	        return node.finishTemplateLiteral(quasis, expressions);
	    }
	
	    // ECMA-262 12.2.10 The Grouping Operator
	
	    function parseGroupExpression() {
	        var expr, expressions, startToken, i, params = [];
	
	        expect('(');
	
	        if (match(')')) {
	            lex();
	            if (!match('=>')) {
	                expect('=>');
	            }
	            return {
	                type: PlaceHolders.ArrowParameterPlaceHolder,
	                params: [],
	                rawParams: []
	            };
	        }
	
	        startToken = lookahead;
	        if (match('...')) {
	            expr = parseRestElement(params);
	            expect(')');
	            if (!match('=>')) {
	                expect('=>');
	            }
	            return {
	                type: PlaceHolders.ArrowParameterPlaceHolder,
	                params: [expr]
	            };
	        }
	
	        isBindingElement = true;
	        expr = inheritCoverGrammar(parseAssignmentExpression);
	
	        if (match(',')) {
	            isAssignmentTarget = false;
	            expressions = [expr];
	
	            while (startIndex < length) {
	                if (!match(',')) {
	                    break;
	                }
	                lex();
	
	                if (match('...')) {
	                    if (!isBindingElement) {
	                        throwUnexpectedToken(lookahead);
	                    }
	                    expressions.push(parseRestElement(params));
	                    expect(')');
	                    if (!match('=>')) {
	                        expect('=>');
	                    }
	                    isBindingElement = false;
	                    for (i = 0; i < expressions.length; i++) {
	                        reinterpretExpressionAsPattern(expressions[i]);
	                    }
	                    return {
	                        type: PlaceHolders.ArrowParameterPlaceHolder,
	                        params: expressions
	                    };
	                }
	
	                expressions.push(inheritCoverGrammar(parseAssignmentExpression));
	            }
	
	            expr = new WrappingNode(startToken).finishSequenceExpression(expressions);
	        }
	
	
	        expect(')');
	
	        if (match('=>')) {
	            if (expr.type === Syntax.Identifier && expr.name === 'yield') {
	                return {
	                    type: PlaceHolders.ArrowParameterPlaceHolder,
	                    params: [expr]
	                };
	            }
	
	            if (!isBindingElement) {
	                throwUnexpectedToken(lookahead);
	            }
	
	            if (expr.type === Syntax.SequenceExpression) {
	                for (i = 0; i < expr.expressions.length; i++) {
	                    reinterpretExpressionAsPattern(expr.expressions[i]);
	                }
	            } else {
	                reinterpretExpressionAsPattern(expr);
	            }
	
	            expr = {
	                type: PlaceHolders.ArrowParameterPlaceHolder,
	                params: expr.type === Syntax.SequenceExpression ? expr.expressions : [expr]
	            };
	        }
	        isBindingElement = false;
	        return expr;
	    }
	
	
	    // ECMA-262 12.2 Primary Expressions
	
	    function parsePrimaryExpression() {
	        var type, token, expr, node;
	
	        if (match('(')) {
	            isBindingElement = false;
	            return inheritCoverGrammar(parseGroupExpression);
	        }
	
	        if (match('[')) {
	            return inheritCoverGrammar(parseArrayInitializer);
	        }
	
	        if (match('{')) {
	            return inheritCoverGrammar(parseObjectInitializer);
	        }
	
	        type = lookahead.type;
	        node = new Node();
	
	        if (type === Token.Identifier) {
	            if (state.sourceType === 'module' && lookahead.value === 'await') {
	                tolerateUnexpectedToken(lookahead);
	            }
	            expr = node.finishIdentifier(lex().value);
	        } else if (type === Token.StringLiteral || type === Token.NumericLiteral) {
	            isAssignmentTarget = isBindingElement = false;
	            if (strict && lookahead.octal) {
	                tolerateUnexpectedToken(lookahead, Messages.StrictOctalLiteral);
	            }
	            expr = node.finishLiteral(lex());
	        } else if (type === Token.Keyword) {
	            if (!strict && state.allowYield && matchKeyword('yield')) {
	                return parseNonComputedProperty();
	            }
	            if (!strict && matchKeyword('let')) {
	                return node.finishIdentifier(lex().value);
	            }
	            isAssignmentTarget = isBindingElement = false;
	            if (matchKeyword('function')) {
	                return parseFunctionExpression();
	            }
	            if (matchKeyword('this')) {
	                lex();
	                return node.finishThisExpression();
	            }
	            if (matchKeyword('class')) {
	                return parseClassExpression();
	            }
	            throwUnexpectedToken(lex());
	        } else if (type === Token.BooleanLiteral) {
	            isAssignmentTarget = isBindingElement = false;
	            token = lex();
	            token.value = (token.value === 'true');
	            expr = node.finishLiteral(token);
	        } else if (type === Token.NullLiteral) {
	            isAssignmentTarget = isBindingElement = false;
	            token = lex();
	            token.value = null;
	            expr = node.finishLiteral(token);
	        } else if (match('/') || match('/=')) {
	            isAssignmentTarget = isBindingElement = false;
	            index = startIndex;
	
	            if (typeof extra.tokens !== 'undefined') {
	                token = collectRegex();
	            } else {
	                token = scanRegExp();
	            }
	            lex();
	            expr = node.finishLiteral(token);
	        } else if (type === Token.Template) {
	            expr = parseTemplateLiteral();
	        } else {
	            throwUnexpectedToken(lex());
	        }
	
	        return expr;
	    }
	
	    // ECMA-262 12.3 Left-Hand-Side Expressions
	
	    function parseArguments() {
	        var args = [], expr;
	
	        expect('(');
	
	        if (!match(')')) {
	            while (startIndex < length) {
	                if (match('...')) {
	                    expr = new Node();
	                    lex();
	                    expr.finishSpreadElement(isolateCoverGrammar(parseAssignmentExpression));
	                } else {
	                    expr = isolateCoverGrammar(parseAssignmentExpression);
	                }
	                args.push(expr);
	                if (match(')')) {
	                    break;
	                }
	                expectCommaSeparator();
	            }
	        }
	
	        expect(')');
	
	        return args;
	    }
	
	    function parseNonComputedProperty() {
	        var token, node = new Node();
	
	        token = lex();
	
	        if (!isIdentifierName(token)) {
	            throwUnexpectedToken(token);
	        }
	
	        return node.finishIdentifier(token.value);
	    }
	
	    function parseNonComputedMember() {
	        expect('.');
	
	        return parseNonComputedProperty();
	    }
	
	    function parseComputedMember() {
	        var expr;
	
	        expect('[');
	
	        expr = isolateCoverGrammar(parseExpression);
	
	        expect(']');
	
	        return expr;
	    }
	
	    // ECMA-262 12.3.3 The new Operator
	
	    function parseNewExpression() {
	        var callee, args, node = new Node();
	
	        expectKeyword('new');
	
	        if (match('.')) {
	            lex();
	            if (lookahead.type === Token.Identifier && lookahead.value === 'target') {
	                if (state.inFunctionBody) {
	                    lex();
	                    return node.finishMetaProperty('new', 'target');
	                }
	            }
	            throwUnexpectedToken(lookahead);
	        }
	
	        callee = isolateCoverGrammar(parseLeftHandSideExpression);
	        args = match('(') ? parseArguments() : [];
	
	        isAssignmentTarget = isBindingElement = false;
	
	        return node.finishNewExpression(callee, args);
	    }
	
	    // ECMA-262 12.3.4 Function Calls
	
	    function parseLeftHandSideExpressionAllowCall() {
	        var quasi, expr, args, property, startToken, previousAllowIn = state.allowIn;
	
	        startToken = lookahead;
	        state.allowIn = true;
	
	        if (matchKeyword('super') && state.inFunctionBody) {
	            expr = new Node();
	            lex();
	            expr = expr.finishSuper();
	            if (!match('(') && !match('.') && !match('[')) {
	                throwUnexpectedToken(lookahead);
	            }
	        } else {
	            expr = inheritCoverGrammar(matchKeyword('new') ? parseNewExpression : parsePrimaryExpression);
	        }
	
	        for (;;) {
	            if (match('.')) {
	                isBindingElement = false;
	                isAssignmentTarget = true;
	                property = parseNonComputedMember();
	                expr = new WrappingNode(startToken).finishMemberExpression('.', expr, property);
	            } else if (match('(')) {
	                isBindingElement = false;
	                isAssignmentTarget = false;
	                args = parseArguments();
	                expr = new WrappingNode(startToken).finishCallExpression(expr, args);
	            } else if (match('[')) {
	                isBindingElement = false;
	                isAssignmentTarget = true;
	                property = parseComputedMember();
	                expr = new WrappingNode(startToken).finishMemberExpression('[', expr, property);
	            } else if (lookahead.type === Token.Template && lookahead.head) {
	                quasi = parseTemplateLiteral();
	                expr = new WrappingNode(startToken).finishTaggedTemplateExpression(expr, quasi);
	            } else {
	                break;
	            }
	        }
	        state.allowIn = previousAllowIn;
	
	        return expr;
	    }
	
	    // ECMA-262 12.3 Left-Hand-Side Expressions
	
	    function parseLeftHandSideExpression() {
	        var quasi, expr, property, startToken;
	        assert(state.allowIn, 'callee of new expression always allow in keyword.');
	
	        startToken = lookahead;
	
	        if (matchKeyword('super') && state.inFunctionBody) {
	            expr = new Node();
	            lex();
	            expr = expr.finishSuper();
	            if (!match('[') && !match('.')) {
	                throwUnexpectedToken(lookahead);
	            }
	        } else {
	            expr = inheritCoverGrammar(matchKeyword('new') ? parseNewExpression : parsePrimaryExpression);
	        }
	
	        for (;;) {
	            if (match('[')) {
	                isBindingElement = false;
	                isAssignmentTarget = true;
	                property = parseComputedMember();
	                expr = new WrappingNode(startToken).finishMemberExpression('[', expr, property);
	            } else if (match('.')) {
	                isBindingElement = false;
	                isAssignmentTarget = true;
	                property = parseNonComputedMember();
	                expr = new WrappingNode(startToken).finishMemberExpression('.', expr, property);
	            } else if (lookahead.type === Token.Template && lookahead.head) {
	                quasi = parseTemplateLiteral();
	                expr = new WrappingNode(startToken).finishTaggedTemplateExpression(expr, quasi);
	            } else {
	                break;
	            }
	        }
	        return expr;
	    }
	
	    // ECMA-262 12.4 Postfix Expressions
	
	    function parsePostfixExpression() {
	        var expr, token, startToken = lookahead;
	
	        expr = inheritCoverGrammar(parseLeftHandSideExpressionAllowCall);
	
	        if (!hasLineTerminator && lookahead.type === Token.Punctuator) {
	            if (match('++') || match('--')) {
	                // ECMA-262 11.3.1, 11.3.2
	                if (strict && expr.type === Syntax.Identifier && isRestrictedWord(expr.name)) {
	                    tolerateError(Messages.StrictLHSPostfix);
	                }
	
	                if (!isAssignmentTarget) {
	                    tolerateError(Messages.InvalidLHSInAssignment);
	                }
	
	                isAssignmentTarget = isBindingElement = false;
	
	                token = lex();
	                expr = new WrappingNode(startToken).finishPostfixExpression(token.value, expr);
	            }
	        }
	
	        return expr;
	    }
	
	    // ECMA-262 12.5 Unary Operators
	
	    function parseUnaryExpression() {
	        var token, expr, startToken;
	
	        if (lookahead.type !== Token.Punctuator && lookahead.type !== Token.Keyword) {
	            expr = parsePostfixExpression();
	        } else if (match('++') || match('--')) {
	            startToken = lookahead;
	            token = lex();
	            expr = inheritCoverGrammar(parseUnaryExpression);
	            // ECMA-262 11.4.4, 11.4.5
	            if (strict && expr.type === Syntax.Identifier && isRestrictedWord(expr.name)) {
	                tolerateError(Messages.StrictLHSPrefix);
	            }
	
	            if (!isAssignmentTarget) {
	                tolerateError(Messages.InvalidLHSInAssignment);
	            }
	            expr = new WrappingNode(startToken).finishUnaryExpression(token.value, expr);
	            isAssignmentTarget = isBindingElement = false;
	        } else if (match('+') || match('-') || match('~') || match('!')) {
	            startToken = lookahead;
	            token = lex();
	            expr = inheritCoverGrammar(parseUnaryExpression);
	            expr = new WrappingNode(startToken).finishUnaryExpression(token.value, expr);
	            isAssignmentTarget = isBindingElement = false;
	        } else if (matchKeyword('delete') || matchKeyword('void') || matchKeyword('typeof')) {
	            startToken = lookahead;
	            token = lex();
	            expr = inheritCoverGrammar(parseUnaryExpression);
	            expr = new WrappingNode(startToken).finishUnaryExpression(token.value, expr);
	            if (strict && expr.operator === 'delete' && expr.argument.type === Syntax.Identifier) {
	                tolerateError(Messages.StrictDelete);
	            }
	            isAssignmentTarget = isBindingElement = false;
	        } else {
	            expr = parsePostfixExpression();
	        }
	
	        return expr;
	    }
	
	    function binaryPrecedence(token, allowIn) {
	        var prec = 0;
	
	        if (token.type !== Token.Punctuator && token.type !== Token.Keyword) {
	            return 0;
	        }
	
	        switch (token.value) {
	        case '||':
	            prec = 1;
	            break;
	
	        case '&&':
	            prec = 2;
	            break;
	
	        case '|':
	            prec = 3;
	            break;
	
	        case '^':
	            prec = 4;
	            break;
	
	        case '&':
	            prec = 5;
	            break;
	
	        case '==':
	        case '!=':
	        case '===':
	        case '!==':
	            prec = 6;
	            break;
	
	        case '<':
	        case '>':
	        case '<=':
	        case '>=':
	        case 'instanceof':
	            prec = 7;
	            break;
	
	        case 'in':
	            prec = allowIn ? 7 : 0;
	            break;
	
	        case '<<':
	        case '>>':
	        case '>>>':
	            prec = 8;
	            break;
	
	        case '+':
	        case '-':
	            prec = 9;
	            break;
	
	        case '*':
	        case '/':
	        case '%':
	            prec = 11;
	            break;
	
	        default:
	            break;
	        }
	
	        return prec;
	    }
	
	    // ECMA-262 12.6 Multiplicative Operators
	    // ECMA-262 12.7 Additive Operators
	    // ECMA-262 12.8 Bitwise Shift Operators
	    // ECMA-262 12.9 Relational Operators
	    // ECMA-262 12.10 Equality Operators
	    // ECMA-262 12.11 Binary Bitwise Operators
	    // ECMA-262 12.12 Binary Logical Operators
	
	    function parseBinaryExpression() {
	        var marker, markers, expr, token, prec, stack, right, operator, left, i;
	
	        marker = lookahead;
	        left = inheritCoverGrammar(parseUnaryExpression);
	
	        token = lookahead;
	        prec = binaryPrecedence(token, state.allowIn);
	        if (prec === 0) {
	            return left;
	        }
	        isAssignmentTarget = isBindingElement = false;
	        token.prec = prec;
	        lex();
	
	        markers = [marker, lookahead];
	        right = isolateCoverGrammar(parseUnaryExpression);
	
	        stack = [left, token, right];
	
	        while ((prec = binaryPrecedence(lookahead, state.allowIn)) > 0) {
	
	            // Reduce: make a binary expression from the three topmost entries.
	            while ((stack.length > 2) && (prec <= stack[stack.length - 2].prec)) {
	                right = stack.pop();
	                operator = stack.pop().value;
	                left = stack.pop();
	                markers.pop();
	                expr = new WrappingNode(markers[markers.length - 1]).finishBinaryExpression(operator, left, right);
	                stack.push(expr);
	            }
	
	            // Shift.
	            token = lex();
	            token.prec = prec;
	            stack.push(token);
	            markers.push(lookahead);
	            expr = isolateCoverGrammar(parseUnaryExpression);
	            stack.push(expr);
	        }
	
	        // Final reduce to clean-up the stack.
	        i = stack.length - 1;
	        expr = stack[i];
	        markers.pop();
	        while (i > 1) {
	            expr = new WrappingNode(markers.pop()).finishBinaryExpression(stack[i - 1].value, stack[i - 2], expr);
	            i -= 2;
	        }
	
	        return expr;
	    }
	
	
	    // ECMA-262 12.13 Conditional Operator
	
	    function parseConditionalExpression() {
	        var expr, previousAllowIn, consequent, alternate, startToken;
	
	        startToken = lookahead;
	
	        expr = inheritCoverGrammar(parseBinaryExpression);
	        if (match('?')) {
	            lex();
	            previousAllowIn = state.allowIn;
	            state.allowIn = true;
	            consequent = isolateCoverGrammar(parseAssignmentExpression);
	            state.allowIn = previousAllowIn;
	            expect(':');
	            alternate = isolateCoverGrammar(parseAssignmentExpression);
	
	            expr = new WrappingNode(startToken).finishConditionalExpression(expr, consequent, alternate);
	            isAssignmentTarget = isBindingElement = false;
	        }
	
	        return expr;
	    }
	
	    // ECMA-262 14.2 Arrow Function Definitions
	
	    function parseConciseBody() {
	        if (match('{')) {
	            return parseFunctionSourceElements();
	        }
	        return isolateCoverGrammar(parseAssignmentExpression);
	    }
	
	    function checkPatternParam(options, param) {
	        var i;
	        switch (param.type) {
	        case Syntax.Identifier:
	            validateParam(options, param, param.name);
	            break;
	        case Syntax.RestElement:
	            checkPatternParam(options, param.argument);
	            break;
	        case Syntax.AssignmentPattern:
	            checkPatternParam(options, param.left);
	            break;
	        case Syntax.ArrayPattern:
	            for (i = 0; i < param.elements.length; i++) {
	                if (param.elements[i] !== null) {
	                    checkPatternParam(options, param.elements[i]);
	                }
	            }
	            break;
	        case Syntax.YieldExpression:
	            break;
	        default:
	            assert(param.type === Syntax.ObjectPattern, 'Invalid type');
	            for (i = 0; i < param.properties.length; i++) {
	                checkPatternParam(options, param.properties[i].value);
	            }
	            break;
	        }
	    }
	    function reinterpretAsCoverFormalsList(expr) {
	        var i, len, param, params, defaults, defaultCount, options, token;
	
	        defaults = [];
	        defaultCount = 0;
	        params = [expr];
	
	        switch (expr.type) {
	        case Syntax.Identifier:
	            break;
	        case PlaceHolders.ArrowParameterPlaceHolder:
	            params = expr.params;
	            break;
	        default:
	            return null;
	        }
	
	        options = {
	            paramSet: {}
	        };
	
	        for (i = 0, len = params.length; i < len; i += 1) {
	            param = params[i];
	            switch (param.type) {
	            case Syntax.AssignmentPattern:
	                params[i] = param.left;
	                if (param.right.type === Syntax.YieldExpression) {
	                    if (param.right.argument) {
	                        throwUnexpectedToken(lookahead);
	                    }
	                    param.right.type = Syntax.Identifier;
	                    param.right.name = 'yield';
	                    delete param.right.argument;
	                    delete param.right.delegate;
	                }
	                defaults.push(param.right);
	                ++defaultCount;
	                checkPatternParam(options, param.left);
	                break;
	            default:
	                checkPatternParam(options, param);
	                params[i] = param;
	                defaults.push(null);
	                break;
	            }
	        }
	
	        if (strict || !state.allowYield) {
	            for (i = 0, len = params.length; i < len; i += 1) {
	                param = params[i];
	                if (param.type === Syntax.YieldExpression) {
	                    throwUnexpectedToken(lookahead);
	                }
	            }
	        }
	
	        if (options.message === Messages.StrictParamDupe) {
	            token = strict ? options.stricted : options.firstRestricted;
	            throwUnexpectedToken(token, options.message);
	        }
	
	        if (defaultCount === 0) {
	            defaults = [];
	        }
	
	        return {
	            params: params,
	            defaults: defaults,
	            stricted: options.stricted,
	            firstRestricted: options.firstRestricted,
	            message: options.message
	        };
	    }
	
	    function parseArrowFunctionExpression(options, node) {
	        var previousStrict, previousAllowYield, body;
	
	        if (hasLineTerminator) {
	            tolerateUnexpectedToken(lookahead);
	        }
	        expect('=>');
	
	        previousStrict = strict;
	        previousAllowYield = state.allowYield;
	        state.allowYield = true;
	
	        body = parseConciseBody();
	
	        if (strict && options.firstRestricted) {
	            throwUnexpectedToken(options.firstRestricted, options.message);
	        }
	        if (strict && options.stricted) {
	            tolerateUnexpectedToken(options.stricted, options.message);
	        }
	
	        strict = previousStrict;
	        state.allowYield = previousAllowYield;
	
	        return node.finishArrowFunctionExpression(options.params, options.defaults, body, body.type !== Syntax.BlockStatement);
	    }
	
	    // ECMA-262 14.4 Yield expression
	
	    function parseYieldExpression() {
	        var argument, expr, delegate, previousAllowYield;
	
	        argument = null;
	        expr = new Node();
	        delegate = false;
	
	        expectKeyword('yield');
	
	        if (!hasLineTerminator) {
	            previousAllowYield = state.allowYield;
	            state.allowYield = false;
	            delegate = match('*');
	            if (delegate) {
	                lex();
	                argument = parseAssignmentExpression();
	            } else {
	                if (!match(';') && !match('}') && !match(')') && lookahead.type !== Token.EOF) {
	                    argument = parseAssignmentExpression();
	                }
	            }
	            state.allowYield = previousAllowYield;
	        }
	
	        return expr.finishYieldExpression(argument, delegate);
	    }
	
	    // ECMA-262 12.14 Assignment Operators
	
	    function parseAssignmentExpression() {
	        var token, expr, right, list, startToken;
	
	        startToken = lookahead;
	        token = lookahead;
	
	        if (!state.allowYield && matchKeyword('yield')) {
	            return parseYieldExpression();
	        }
	
	        expr = parseConditionalExpression();
	
	        if (expr.type === PlaceHolders.ArrowParameterPlaceHolder || match('=>')) {
	            isAssignmentTarget = isBindingElement = false;
	            list = reinterpretAsCoverFormalsList(expr);
	
	            if (list) {
	                firstCoverInitializedNameError = null;
	                return parseArrowFunctionExpression(list, new WrappingNode(startToken));
	            }
	
	            return expr;
	        }
	
	        if (matchAssign()) {
	            if (!isAssignmentTarget) {
	                tolerateError(Messages.InvalidLHSInAssignment);
	            }
	
	            // ECMA-262 12.1.1
	            if (strict && expr.type === Syntax.Identifier) {
	                if (isRestrictedWord(expr.name)) {
	                    tolerateUnexpectedToken(token, Messages.StrictLHSAssignment);
	                }
	                if (isStrictModeReservedWord(expr.name)) {
	                    tolerateUnexpectedToken(token, Messages.StrictReservedWord);
	                }
	            }
	
	            if (!match('=')) {
	                isAssignmentTarget = isBindingElement = false;
	            } else {
	                reinterpretExpressionAsPattern(expr);
	            }
	
	            token = lex();
	            right = isolateCoverGrammar(parseAssignmentExpression);
	            expr = new WrappingNode(startToken).finishAssignmentExpression(token.value, expr, right);
	            firstCoverInitializedNameError = null;
	        }
	
	        return expr;
	    }
	
	    // ECMA-262 12.15 Comma Operator
	
	    function parseExpression() {
	        var expr, startToken = lookahead, expressions;
	
	        expr = isolateCoverGrammar(parseAssignmentExpression);
	
	        if (match(',')) {
	            expressions = [expr];
	
	            while (startIndex < length) {
	                if (!match(',')) {
	                    break;
	                }
	                lex();
	                expressions.push(isolateCoverGrammar(parseAssignmentExpression));
	            }
	
	            expr = new WrappingNode(startToken).finishSequenceExpression(expressions);
	        }
	
	        return expr;
	    }
	
	    // ECMA-262 13.2 Block
	
	    function parseStatementListItem() {
	        if (lookahead.type === Token.Keyword) {
	            switch (lookahead.value) {
	            case 'export':
	                if (state.sourceType !== 'module') {
	                    tolerateUnexpectedToken(lookahead, Messages.IllegalExportDeclaration);
	                }
	                return parseExportDeclaration();
	            case 'import':
	                if (state.sourceType !== 'module') {
	                    tolerateUnexpectedToken(lookahead, Messages.IllegalImportDeclaration);
	                }
	                return parseImportDeclaration();
	            case 'const':
	                return parseLexicalDeclaration({inFor: false});
	            case 'function':
	                return parseFunctionDeclaration(new Node());
	            case 'class':
	                return parseClassDeclaration();
	            }
	        }
	
	        if (matchKeyword('let') && isLexicalDeclaration()) {
	            return parseLexicalDeclaration({inFor: false});
	        }
	
	        return parseStatement();
	    }
	
	    function parseStatementList() {
	        var list = [];
	        while (startIndex < length) {
	            if (match('}')) {
	                break;
	            }
	            list.push(parseStatementListItem());
	        }
	
	        return list;
	    }
	
	    function parseBlock() {
	        var block, node = new Node();
	
	        expect('{');
	
	        block = parseStatementList();
	
	        expect('}');
	
	        return node.finishBlockStatement(block);
	    }
	
	    // ECMA-262 13.3.2 Variable Statement
	
	    function parseVariableIdentifier(kind) {
	        var token, node = new Node();
	
	        token = lex();
	
	        if (token.type === Token.Keyword && token.value === 'yield') {
	            if (strict) {
	                tolerateUnexpectedToken(token, Messages.StrictReservedWord);
	            } if (!state.allowYield) {
	                throwUnexpectedToken(token);
	            }
	        } else if (token.type !== Token.Identifier) {
	            if (strict && token.type === Token.Keyword && isStrictModeReservedWord(token.value)) {
	                tolerateUnexpectedToken(token, Messages.StrictReservedWord);
	            } else {
	                if (strict || token.value !== 'let' || kind !== 'var') {
	                    throwUnexpectedToken(token);
	                }
	            }
	        } else if (state.sourceType === 'module' && token.type === Token.Identifier && token.value === 'await') {
	            tolerateUnexpectedToken(token);
	        }
	
	        return node.finishIdentifier(token.value);
	    }
	
	    function parseVariableDeclaration(options) {
	        var init = null, id, node = new Node(), params = [];
	
	        id = parsePattern(params, 'var');
	
	        // ECMA-262 12.2.1
	        if (strict && isRestrictedWord(id.name)) {
	            tolerateError(Messages.StrictVarName);
	        }
	
	        if (match('=')) {
	            lex();
	            init = isolateCoverGrammar(parseAssignmentExpression);
	        } else if (id.type !== Syntax.Identifier && !options.inFor) {
	            expect('=');
	        }
	
	        return node.finishVariableDeclarator(id, init);
	    }
	
	    function parseVariableDeclarationList(options) {
	        var opt, list;
	
	        opt = { inFor: options.inFor };
	        list = [parseVariableDeclaration(opt)];
	
	        while (match(',')) {
	            lex();
	            list.push(parseVariableDeclaration(opt));
	        }
	
	        return list;
	    }
	
	    function parseVariableStatement(node) {
	        var declarations;
	
	        expectKeyword('var');
	
	        declarations = parseVariableDeclarationList({ inFor: false });
	
	        consumeSemicolon();
	
	        return node.finishVariableDeclaration(declarations);
	    }
	
	    // ECMA-262 13.3.1 Let and Const Declarations
	
	    function parseLexicalBinding(kind, options) {
	        var init = null, id, node = new Node(), params = [];
	
	        id = parsePattern(params, kind);
	
	        // ECMA-262 12.2.1
	        if (strict && id.type === Syntax.Identifier && isRestrictedWord(id.name)) {
	            tolerateError(Messages.StrictVarName);
	        }
	
	        if (kind === 'const') {
	            if (!matchKeyword('in') && !matchContextualKeyword('of')) {
	                expect('=');
	                init = isolateCoverGrammar(parseAssignmentExpression);
	            }
	        } else if ((!options.inFor && id.type !== Syntax.Identifier) || match('=')) {
	            expect('=');
	            init = isolateCoverGrammar(parseAssignmentExpression);
	        }
	
	        return node.finishVariableDeclarator(id, init);
	    }
	
	    function parseBindingList(kind, options) {
	        var list = [parseLexicalBinding(kind, options)];
	
	        while (match(',')) {
	            lex();
	            list.push(parseLexicalBinding(kind, options));
	        }
	
	        return list;
	    }
	
	
	    function tokenizerState() {
	        return {
	            index: index,
	            lineNumber: lineNumber,
	            lineStart: lineStart,
	            hasLineTerminator: hasLineTerminator,
	            lastIndex: lastIndex,
	            lastLineNumber: lastLineNumber,
	            lastLineStart: lastLineStart,
	            startIndex: startIndex,
	            startLineNumber: startLineNumber,
	            startLineStart: startLineStart,
	            lookahead: lookahead,
	            tokenCount: extra.tokens ? extra.tokens.length : 0
	        };
	    }
	
	    function resetTokenizerState(ts) {
	        index = ts.index;
	        lineNumber = ts.lineNumber;
	        lineStart = ts.lineStart;
	        hasLineTerminator = ts.hasLineTerminator;
	        lastIndex = ts.lastIndex;
	        lastLineNumber = ts.lastLineNumber;
	        lastLineStart = ts.lastLineStart;
	        startIndex = ts.startIndex;
	        startLineNumber = ts.startLineNumber;
	        startLineStart = ts.startLineStart;
	        lookahead = ts.lookahead;
	        if (extra.tokens) {
	            extra.tokens.splice(ts.tokenCount, extra.tokens.length);
	        }
	    }
	
	    function isLexicalDeclaration() {
	        var lexical, ts;
	
	        ts = tokenizerState();
	
	        lex();
	        lexical = (lookahead.type === Token.Identifier) || match('[') || match('{') ||
	            matchKeyword('let') || matchKeyword('yield');
	
	        resetTokenizerState(ts);
	
	        return lexical;
	    }
	
	    function parseLexicalDeclaration(options) {
	        var kind, declarations, node = new Node();
	
	        kind = lex().value;
	        assert(kind === 'let' || kind === 'const', 'Lexical declaration must be either let or const');
	
	        declarations = parseBindingList(kind, options);
	
	        consumeSemicolon();
	
	        return node.finishLexicalDeclaration(declarations, kind);
	    }
	
	    function parseRestElement(params) {
	        var param, node = new Node();
	
	        lex();
	
	        if (match('{')) {
	            throwError(Messages.ObjectPatternAsRestParameter);
	        }
	
	        params.push(lookahead);
	
	        param = parseVariableIdentifier();
	
	        if (match('=')) {
	            throwError(Messages.DefaultRestParameter);
	        }
	
	        if (!match(')')) {
	            throwError(Messages.ParameterAfterRestParameter);
	        }
	
	        return node.finishRestElement(param);
	    }
	
	    // ECMA-262 13.4 Empty Statement
	
	    function parseEmptyStatement(node) {
	        expect(';');
	        return node.finishEmptyStatement();
	    }
	
	    // ECMA-262 12.4 Expression Statement
	
	    function parseExpressionStatement(node) {
	        var expr = parseExpression();
	        consumeSemicolon();
	        return node.finishExpressionStatement(expr);
	    }
	
	    // ECMA-262 13.6 If statement
	
	    function parseIfStatement(node) {
	        var test, consequent, alternate;
	
	        expectKeyword('if');
	
	        expect('(');
	
	        test = parseExpression();
	
	        expect(')');
	
	        consequent = parseStatement();
	
	        if (matchKeyword('else')) {
	            lex();
	            alternate = parseStatement();
	        } else {
	            alternate = null;
	        }
	
	        return node.finishIfStatement(test, consequent, alternate);
	    }
	
	    // ECMA-262 13.7 Iteration Statements
	
	    function parseDoWhileStatement(node) {
	        var body, test, oldInIteration;
	
	        expectKeyword('do');
	
	        oldInIteration = state.inIteration;
	        state.inIteration = true;
	
	        body = parseStatement();
	
	        state.inIteration = oldInIteration;
	
	        expectKeyword('while');
	
	        expect('(');
	
	        test = parseExpression();
	
	        expect(')');
	
	        if (match(';')) {
	            lex();
	        }
	
	        return node.finishDoWhileStatement(body, test);
	    }
	
	    function parseWhileStatement(node) {
	        var test, body, oldInIteration;
	
	        expectKeyword('while');
	
	        expect('(');
	
	        test = parseExpression();
	
	        expect(')');
	
	        oldInIteration = state.inIteration;
	        state.inIteration = true;
	
	        body = parseStatement();
	
	        state.inIteration = oldInIteration;
	
	        return node.finishWhileStatement(test, body);
	    }
	
	    function parseForStatement(node) {
	        var init, forIn, initSeq, initStartToken, test, update, left, right, kind, declarations,
	            body, oldInIteration, previousAllowIn = state.allowIn;
	
	        init = test = update = null;
	        forIn = true;
	
	        expectKeyword('for');
	
	        expect('(');
	
	        if (match(';')) {
	            lex();
	        } else {
	            if (matchKeyword('var')) {
	                init = new Node();
	                lex();
	
	                state.allowIn = false;
	                declarations = parseVariableDeclarationList({ inFor: true });
	                state.allowIn = previousAllowIn;
	
	                if (declarations.length === 1 && matchKeyword('in')) {
	                    init = init.finishVariableDeclaration(declarations);
	                    lex();
	                    left = init;
	                    right = parseExpression();
	                    init = null;
	                } else if (declarations.length === 1 && declarations[0].init === null && matchContextualKeyword('of')) {
	                    init = init.finishVariableDeclaration(declarations);
	                    lex();
	                    left = init;
	                    right = parseAssignmentExpression();
	                    init = null;
	                    forIn = false;
	                } else {
	                    init = init.finishVariableDeclaration(declarations);
	                    expect(';');
	                }
	            } else if (matchKeyword('const') || matchKeyword('let')) {
	                init = new Node();
	                kind = lex().value;
	
	                if (!strict && lookahead.value === 'in') {
	                    init = init.finishIdentifier(kind);
	                    lex();
	                    left = init;
	                    right = parseExpression();
	                    init = null;
	                } else {
	                    state.allowIn = false;
	                    declarations = parseBindingList(kind, {inFor: true});
	                    state.allowIn = previousAllowIn;
	
	                    if (declarations.length === 1 && declarations[0].init === null && matchKeyword('in')) {
	                        init = init.finishLexicalDeclaration(declarations, kind);
	                        lex();
	                        left = init;
	                        right = parseExpression();
	                        init = null;
	                    } else if (declarations.length === 1 && declarations[0].init === null && matchContextualKeyword('of')) {
	                        init = init.finishLexicalDeclaration(declarations, kind);
	                        lex();
	                        left = init;
	                        right = parseAssignmentExpression();
	                        init = null;
	                        forIn = false;
	                    } else {
	                        consumeSemicolon();
	                        init = init.finishLexicalDeclaration(declarations, kind);
	                    }
	                }
	            } else {
	                initStartToken = lookahead;
	                state.allowIn = false;
	                init = inheritCoverGrammar(parseAssignmentExpression);
	                state.allowIn = previousAllowIn;
	
	                if (matchKeyword('in')) {
	                    if (!isAssignmentTarget) {
	                        tolerateError(Messages.InvalidLHSInForIn);
	                    }
	
	                    lex();
	                    reinterpretExpressionAsPattern(init);
	                    left = init;
	                    right = parseExpression();
	                    init = null;
	                } else if (matchContextualKeyword('of')) {
	                    if (!isAssignmentTarget) {
	                        tolerateError(Messages.InvalidLHSInForLoop);
	                    }
	
	                    lex();
	                    reinterpretExpressionAsPattern(init);
	                    left = init;
	                    right = parseAssignmentExpression();
	                    init = null;
	                    forIn = false;
	                } else {
	                    if (match(',')) {
	                        initSeq = [init];
	                        while (match(',')) {
	                            lex();
	                            initSeq.push(isolateCoverGrammar(parseAssignmentExpression));
	                        }
	                        init = new WrappingNode(initStartToken).finishSequenceExpression(initSeq);
	                    }
	                    expect(';');
	                }
	            }
	        }
	
	        if (typeof left === 'undefined') {
	
	            if (!match(';')) {
	                test = parseExpression();
	            }
	            expect(';');
	
	            if (!match(')')) {
	                update = parseExpression();
	            }
	        }
	
	        expect(')');
	
	        oldInIteration = state.inIteration;
	        state.inIteration = true;
	
	        body = isolateCoverGrammar(parseStatement);
	
	        state.inIteration = oldInIteration;
	
	        return (typeof left === 'undefined') ?
	                node.finishForStatement(init, test, update, body) :
	                forIn ? node.finishForInStatement(left, right, body) :
	                    node.finishForOfStatement(left, right, body);
	    }
	
	    // ECMA-262 13.8 The continue statement
	
	    function parseContinueStatement(node) {
	        var label = null, key;
	
	        expectKeyword('continue');
	
	        // Optimize the most common form: 'continue;'.
	        if (source.charCodeAt(startIndex) === 0x3B) {
	            lex();
	
	            if (!state.inIteration) {
	                throwError(Messages.IllegalContinue);
	            }
	
	            return node.finishContinueStatement(null);
	        }
	
	        if (hasLineTerminator) {
	            if (!state.inIteration) {
	                throwError(Messages.IllegalContinue);
	            }
	
	            return node.finishContinueStatement(null);
	        }
	
	        if (lookahead.type === Token.Identifier) {
	            label = parseVariableIdentifier();
	
	            key = '$' + label.name;
	            if (!Object.prototype.hasOwnProperty.call(state.labelSet, key)) {
	                throwError(Messages.UnknownLabel, label.name);
	            }
	        }
	
	        consumeSemicolon();
	
	        if (label === null && !state.inIteration) {
	            throwError(Messages.IllegalContinue);
	        }
	
	        return node.finishContinueStatement(label);
	    }
	
	    // ECMA-262 13.9 The break statement
	
	    function parseBreakStatement(node) {
	        var label = null, key;
	
	        expectKeyword('break');
	
	        // Catch the very common case first: immediately a semicolon (U+003B).
	        if (source.charCodeAt(lastIndex) === 0x3B) {
	            lex();
	
	            if (!(state.inIteration || state.inSwitch)) {
	                throwError(Messages.IllegalBreak);
	            }
	
	            return node.finishBreakStatement(null);
	        }
	
	        if (hasLineTerminator) {
	            if (!(state.inIteration || state.inSwitch)) {
	                throwError(Messages.IllegalBreak);
	            }
	        } else if (lookahead.type === Token.Identifier) {
	            label = parseVariableIdentifier();
	
	            key = '$' + label.name;
	            if (!Object.prototype.hasOwnProperty.call(state.labelSet, key)) {
	                throwError(Messages.UnknownLabel, label.name);
	            }
	        }
	
	        consumeSemicolon();
	
	        if (label === null && !(state.inIteration || state.inSwitch)) {
	            throwError(Messages.IllegalBreak);
	        }
	
	        return node.finishBreakStatement(label);
	    }
	
	    // ECMA-262 13.10 The return statement
	
	    function parseReturnStatement(node) {
	        var argument = null;
	
	        expectKeyword('return');
	
	        if (!state.inFunctionBody) {
	            tolerateError(Messages.IllegalReturn);
	        }
	
	        // 'return' followed by a space and an identifier is very common.
	        if (source.charCodeAt(lastIndex) === 0x20) {
	            if (isIdentifierStart(source.charCodeAt(lastIndex + 1))) {
	                argument = parseExpression();
	                consumeSemicolon();
	                return node.finishReturnStatement(argument);
	            }
	        }
	
	        if (hasLineTerminator) {
	            // HACK
	            return node.finishReturnStatement(null);
	        }
	
	        if (!match(';')) {
	            if (!match('}') && lookahead.type !== Token.EOF) {
	                argument = parseExpression();
	            }
	        }
	
	        consumeSemicolon();
	
	        return node.finishReturnStatement(argument);
	    }
	
	    // ECMA-262 13.11 The with statement
	
	    function parseWithStatement(node) {
	        var object, body;
	
	        if (strict) {
	            tolerateError(Messages.StrictModeWith);
	        }
	
	        expectKeyword('with');
	
	        expect('(');
	
	        object = parseExpression();
	
	        expect(')');
	
	        body = parseStatement();
	
	        return node.finishWithStatement(object, body);
	    }
	
	    // ECMA-262 13.12 The switch statement
	
	    function parseSwitchCase() {
	        var test, consequent = [], statement, node = new Node();
	
	        if (matchKeyword('default')) {
	            lex();
	            test = null;
	        } else {
	            expectKeyword('case');
	            test = parseExpression();
	        }
	        expect(':');
	
	        while (startIndex < length) {
	            if (match('}') || matchKeyword('default') || matchKeyword('case')) {
	                break;
	            }
	            statement = parseStatementListItem();
	            consequent.push(statement);
	        }
	
	        return node.finishSwitchCase(test, consequent);
	    }
	
	    function parseSwitchStatement(node) {
	        var discriminant, cases, clause, oldInSwitch, defaultFound;
	
	        expectKeyword('switch');
	
	        expect('(');
	
	        discriminant = parseExpression();
	
	        expect(')');
	
	        expect('{');
	
	        cases = [];
	
	        if (match('}')) {
	            lex();
	            return node.finishSwitchStatement(discriminant, cases);
	        }
	
	        oldInSwitch = state.inSwitch;
	        state.inSwitch = true;
	        defaultFound = false;
	
	        while (startIndex < length) {
	            if (match('}')) {
	                break;
	            }
	            clause = parseSwitchCase();
	            if (clause.test === null) {
	                if (defaultFound) {
	                    throwError(Messages.MultipleDefaultsInSwitch);
	                }
	                defaultFound = true;
	            }
	            cases.push(clause);
	        }
	
	        state.inSwitch = oldInSwitch;
	
	        expect('}');
	
	        return node.finishSwitchStatement(discriminant, cases);
	    }
	
	    // ECMA-262 13.14 The throw statement
	
	    function parseThrowStatement(node) {
	        var argument;
	
	        expectKeyword('throw');
	
	        if (hasLineTerminator) {
	            throwError(Messages.NewlineAfterThrow);
	        }
	
	        argument = parseExpression();
	
	        consumeSemicolon();
	
	        return node.finishThrowStatement(argument);
	    }
	
	    // ECMA-262 13.15 The try statement
	
	    function parseCatchClause() {
	        var param, params = [], paramMap = {}, key, i, body, node = new Node();
	
	        expectKeyword('catch');
	
	        expect('(');
	        if (match(')')) {
	            throwUnexpectedToken(lookahead);
	        }
	
	        param = parsePattern(params);
	        for (i = 0; i < params.length; i++) {
	            key = '$' + params[i].value;
	            if (Object.prototype.hasOwnProperty.call(paramMap, key)) {
	                tolerateError(Messages.DuplicateBinding, params[i].value);
	            }
	            paramMap[key] = true;
	        }
	
	        // ECMA-262 12.14.1
	        if (strict && isRestrictedWord(param.name)) {
	            tolerateError(Messages.StrictCatchVariable);
	        }
	
	        expect(')');
	        body = parseBlock();
	        return node.finishCatchClause(param, body);
	    }
	
	    function parseTryStatement(node) {
	        var block, handler = null, finalizer = null;
	
	        expectKeyword('try');
	
	        block = parseBlock();
	
	        if (matchKeyword('catch')) {
	            handler = parseCatchClause();
	        }
	
	        if (matchKeyword('finally')) {
	            lex();
	            finalizer = parseBlock();
	        }
	
	        if (!handler && !finalizer) {
	            throwError(Messages.NoCatchOrFinally);
	        }
	
	        return node.finishTryStatement(block, handler, finalizer);
	    }
	
	    // ECMA-262 13.16 The debugger statement
	
	    function parseDebuggerStatement(node) {
	        expectKeyword('debugger');
	
	        consumeSemicolon();
	
	        return node.finishDebuggerStatement();
	    }
	
	    // 13 Statements
	
	    function parseStatement() {
	        var type = lookahead.type,
	            expr,
	            labeledBody,
	            key,
	            node;
	
	        if (type === Token.EOF) {
	            throwUnexpectedToken(lookahead);
	        }
	
	        if (type === Token.Punctuator && lookahead.value === '{') {
	            return parseBlock();
	        }
	        isAssignmentTarget = isBindingElement = true;
	        node = new Node();
	
	        if (type === Token.Punctuator) {
	            switch (lookahead.value) {
	            case ';':
	                return parseEmptyStatement(node);
	            case '(':
	                return parseExpressionStatement(node);
	            default:
	                break;
	            }
	        } else if (type === Token.Keyword) {
	            switch (lookahead.value) {
	            case 'break':
	                return parseBreakStatement(node);
	            case 'continue':
	                return parseContinueStatement(node);
	            case 'debugger':
	                return parseDebuggerStatement(node);
	            case 'do':
	                return parseDoWhileStatement(node);
	            case 'for':
	                return parseForStatement(node);
	            case 'function':
	                return parseFunctionDeclaration(node);
	            case 'if':
	                return parseIfStatement(node);
	            case 'return':
	                return parseReturnStatement(node);
	            case 'switch':
	                return parseSwitchStatement(node);
	            case 'throw':
	                return parseThrowStatement(node);
	            case 'try':
	                return parseTryStatement(node);
	            case 'var':
	                return parseVariableStatement(node);
	            case 'while':
	                return parseWhileStatement(node);
	            case 'with':
	                return parseWithStatement(node);
	            default:
	                break;
	            }
	        }
	
	        expr = parseExpression();
	
	        // ECMA-262 12.12 Labelled Statements
	        if ((expr.type === Syntax.Identifier) && match(':')) {
	            lex();
	
	            key = '$' + expr.name;
	            if (Object.prototype.hasOwnProperty.call(state.labelSet, key)) {
	                throwError(Messages.Redeclaration, 'Label', expr.name);
	            }
	
	            state.labelSet[key] = true;
	            labeledBody = parseStatement();
	            delete state.labelSet[key];
	            return node.finishLabeledStatement(expr, labeledBody);
	        }
	
	        consumeSemicolon();
	
	        return node.finishExpressionStatement(expr);
	    }
	
	    // ECMA-262 14.1 Function Definition
	
	    function parseFunctionSourceElements() {
	        var statement, body = [], token, directive, firstRestricted,
	            oldLabelSet, oldInIteration, oldInSwitch, oldInFunctionBody,
	            node = new Node();
	
	        expect('{');
	
	        while (startIndex < length) {
	            if (lookahead.type !== Token.StringLiteral) {
	                break;
	            }
	            token = lookahead;
	
	            statement = parseStatementListItem();
	            body.push(statement);
	            if (statement.expression.type !== Syntax.Literal) {
	                // this is not directive
	                break;
	            }
	            directive = source.slice(token.start + 1, token.end - 1);
	            if (directive === 'use strict') {
	                strict = true;
	                if (firstRestricted) {
	                    tolerateUnexpectedToken(firstRestricted, Messages.StrictOctalLiteral);
	                }
	            } else {
	                if (!firstRestricted && token.octal) {
	                    firstRestricted = token;
	                }
	            }
	        }
	
	        oldLabelSet = state.labelSet;
	        oldInIteration = state.inIteration;
	        oldInSwitch = state.inSwitch;
	        oldInFunctionBody = state.inFunctionBody;
	
	        state.labelSet = {};
	        state.inIteration = false;
	        state.inSwitch = false;
	        state.inFunctionBody = true;
	
	        while (startIndex < length) {
	            if (match('}')) {
	                break;
	            }
	            body.push(parseStatementListItem());
	        }
	
	        expect('}');
	
	        state.labelSet = oldLabelSet;
	        state.inIteration = oldInIteration;
	        state.inSwitch = oldInSwitch;
	        state.inFunctionBody = oldInFunctionBody;
	
	        return node.finishBlockStatement(body);
	    }
	
	    function validateParam(options, param, name) {
	        var key = '$' + name;
	        if (strict) {
	            if (isRestrictedWord(name)) {
	                options.stricted = param;
	                options.message = Messages.StrictParamName;
	            }
	            if (Object.prototype.hasOwnProperty.call(options.paramSet, key)) {
	                options.stricted = param;
	                options.message = Messages.StrictParamDupe;
	            }
	        } else if (!options.firstRestricted) {
	            if (isRestrictedWord(name)) {
	                options.firstRestricted = param;
	                options.message = Messages.StrictParamName;
	            } else if (isStrictModeReservedWord(name)) {
	                options.firstRestricted = param;
	                options.message = Messages.StrictReservedWord;
	            } else if (Object.prototype.hasOwnProperty.call(options.paramSet, key)) {
	                options.stricted = param;
	                options.message = Messages.StrictParamDupe;
	            }
	        }
	        options.paramSet[key] = true;
	    }
	
	    function parseParam(options) {
	        var token, param, params = [], i, def;
	
	        token = lookahead;
	        if (token.value === '...') {
	            param = parseRestElement(params);
	            validateParam(options, param.argument, param.argument.name);
	            options.params.push(param);
	            options.defaults.push(null);
	            return false;
	        }
	
	        param = parsePatternWithDefault(params);
	        for (i = 0; i < params.length; i++) {
	            validateParam(options, params[i], params[i].value);
	        }
	
	        if (param.type === Syntax.AssignmentPattern) {
	            def = param.right;
	            param = param.left;
	            ++options.defaultCount;
	        }
	
	        options.params.push(param);
	        options.defaults.push(def);
	
	        return !match(')');
	    }
	
	    function parseParams(firstRestricted) {
	        var options;
	
	        options = {
	            params: [],
	            defaultCount: 0,
	            defaults: [],
	            firstRestricted: firstRestricted
	        };
	
	        expect('(');
	
	        if (!match(')')) {
	            options.paramSet = {};
	            while (startIndex < length) {
	                if (!parseParam(options)) {
	                    break;
	                }
	                expect(',');
	            }
	        }
	
	        expect(')');
	
	        if (options.defaultCount === 0) {
	            options.defaults = [];
	        }
	
	        return {
	            params: options.params,
	            defaults: options.defaults,
	            stricted: options.stricted,
	            firstRestricted: options.firstRestricted,
	            message: options.message
	        };
	    }
	
	    function parseFunctionDeclaration(node, identifierIsOptional) {
	        var id = null, params = [], defaults = [], body, token, stricted, tmp, firstRestricted, message, previousStrict,
	            isGenerator, previousAllowYield;
	
	        previousAllowYield = state.allowYield;
	
	        expectKeyword('function');
	
	        isGenerator = match('*');
	        if (isGenerator) {
	            lex();
	        }
	
	        if (!identifierIsOptional || !match('(')) {
	            token = lookahead;
	            id = parseVariableIdentifier();
	            if (strict) {
	                if (isRestrictedWord(token.value)) {
	                    tolerateUnexpectedToken(token, Messages.StrictFunctionName);
	                }
	            } else {
	                if (isRestrictedWord(token.value)) {
	                    firstRestricted = token;
	                    message = Messages.StrictFunctionName;
	                } else if (isStrictModeReservedWord(token.value)) {
	                    firstRestricted = token;
	                    message = Messages.StrictReservedWord;
	                }
	            }
	        }
	
	        state.allowYield = !isGenerator;
	        tmp = parseParams(firstRestricted);
	        params = tmp.params;
	        defaults = tmp.defaults;
	        stricted = tmp.stricted;
	        firstRestricted = tmp.firstRestricted;
	        if (tmp.message) {
	            message = tmp.message;
	        }
	
	
	        previousStrict = strict;
	        body = parseFunctionSourceElements();
	        if (strict && firstRestricted) {
	            throwUnexpectedToken(firstRestricted, message);
	        }
	        if (strict && stricted) {
	            tolerateUnexpectedToken(stricted, message);
	        }
	
	        strict = previousStrict;
	        state.allowYield = previousAllowYield;
	
	        return node.finishFunctionDeclaration(id, params, defaults, body, isGenerator);
	    }
	
	    function parseFunctionExpression() {
	        var token, id = null, stricted, firstRestricted, message, tmp,
	            params = [], defaults = [], body, previousStrict, node = new Node(),
	            isGenerator, previousAllowYield;
	
	        previousAllowYield = state.allowYield;
	
	        expectKeyword('function');
	
	        isGenerator = match('*');
	        if (isGenerator) {
	            lex();
	        }
	
	        state.allowYield = !isGenerator;
	        if (!match('(')) {
	            token = lookahead;
	            id = (!strict && !isGenerator && matchKeyword('yield')) ? parseNonComputedProperty() : parseVariableIdentifier();
	            if (strict) {
	                if (isRestrictedWord(token.value)) {
	                    tolerateUnexpectedToken(token, Messages.StrictFunctionName);
	                }
	            } else {
	                if (isRestrictedWord(token.value)) {
	                    firstRestricted = token;
	                    message = Messages.StrictFunctionName;
	                } else if (isStrictModeReservedWord(token.value)) {
	                    firstRestricted = token;
	                    message = Messages.StrictReservedWord;
	                }
	            }
	        }
	
	        tmp = parseParams(firstRestricted);
	        params = tmp.params;
	        defaults = tmp.defaults;
	        stricted = tmp.stricted;
	        firstRestricted = tmp.firstRestricted;
	        if (tmp.message) {
	            message = tmp.message;
	        }
	
	        previousStrict = strict;
	        body = parseFunctionSourceElements();
	        if (strict && firstRestricted) {
	            throwUnexpectedToken(firstRestricted, message);
	        }
	        if (strict && stricted) {
	            tolerateUnexpectedToken(stricted, message);
	        }
	        strict = previousStrict;
	        state.allowYield = previousAllowYield;
	
	        return node.finishFunctionExpression(id, params, defaults, body, isGenerator);
	    }
	
	    // ECMA-262 14.5 Class Definitions
	
	    function parseClassBody() {
	        var classBody, token, isStatic, hasConstructor = false, body, method, computed, key;
	
	        classBody = new Node();
	
	        expect('{');
	        body = [];
	        while (!match('}')) {
	            if (match(';')) {
	                lex();
	            } else {
	                method = new Node();
	                token = lookahead;
	                isStatic = false;
	                computed = match('[');
	                if (match('*')) {
	                    lex();
	                } else {
	                    key = parseObjectPropertyKey();
	                    if (key.name === 'static' && (lookaheadPropertyName() || match('*'))) {
	                        token = lookahead;
	                        isStatic = true;
	                        computed = match('[');
	                        if (match('*')) {
	                            lex();
	                        } else {
	                            key = parseObjectPropertyKey();
	                        }
	                    }
	                }
	                method = tryParseMethodDefinition(token, key, computed, method);
	                if (method) {
	                    method['static'] = isStatic; // jscs:ignore requireDotNotation
	                    if (method.kind === 'init') {
	                        method.kind = 'method';
	                    }
	                    if (!isStatic) {
	                        if (!method.computed && (method.key.name || method.key.value.toString()) === 'constructor') {
	                            if (method.kind !== 'method' || !method.method || method.value.generator) {
	                                throwUnexpectedToken(token, Messages.ConstructorSpecialMethod);
	                            }
	                            if (hasConstructor) {
	                                throwUnexpectedToken(token, Messages.DuplicateConstructor);
	                            } else {
	                                hasConstructor = true;
	                            }
	                            method.kind = 'constructor';
	                        }
	                    } else {
	                        if (!method.computed && (method.key.name || method.key.value.toString()) === 'prototype') {
	                            throwUnexpectedToken(token, Messages.StaticPrototype);
	                        }
	                    }
	                    method.type = Syntax.MethodDefinition;
	                    delete method.method;
	                    delete method.shorthand;
	                    body.push(method);
	                } else {
	                    throwUnexpectedToken(lookahead);
	                }
	            }
	        }
	        lex();
	        return classBody.finishClassBody(body);
	    }
	
	    function parseClassDeclaration(identifierIsOptional) {
	        var id = null, superClass = null, classNode = new Node(), classBody, previousStrict = strict;
	        strict = true;
	
	        expectKeyword('class');
	
	        if (!identifierIsOptional || lookahead.type === Token.Identifier) {
	            id = parseVariableIdentifier();
	        }
	
	        if (matchKeyword('extends')) {
	            lex();
	            superClass = isolateCoverGrammar(parseLeftHandSideExpressionAllowCall);
	        }
	        classBody = parseClassBody();
	        strict = previousStrict;
	
	        return classNode.finishClassDeclaration(id, superClass, classBody);
	    }
	
	    function parseClassExpression() {
	        var id = null, superClass = null, classNode = new Node(), classBody, previousStrict = strict;
	        strict = true;
	
	        expectKeyword('class');
	
	        if (lookahead.type === Token.Identifier) {
	            id = parseVariableIdentifier();
	        }
	
	        if (matchKeyword('extends')) {
	            lex();
	            superClass = isolateCoverGrammar(parseLeftHandSideExpressionAllowCall);
	        }
	        classBody = parseClassBody();
	        strict = previousStrict;
	
	        return classNode.finishClassExpression(id, superClass, classBody);
	    }
	
	    // ECMA-262 15.2 Modules
	
	    function parseModuleSpecifier() {
	        var node = new Node();
	
	        if (lookahead.type !== Token.StringLiteral) {
	            throwError(Messages.InvalidModuleSpecifier);
	        }
	        return node.finishLiteral(lex());
	    }
	
	    // ECMA-262 15.2.3 Exports
	
	    function parseExportSpecifier() {
	        var exported, local, node = new Node(), def;
	        if (matchKeyword('default')) {
	            // export {default} from 'something';
	            def = new Node();
	            lex();
	            local = def.finishIdentifier('default');
	        } else {
	            local = parseVariableIdentifier();
	        }
	        if (matchContextualKeyword('as')) {
	            lex();
	            exported = parseNonComputedProperty();
	        }
	        return node.finishExportSpecifier(local, exported);
	    }
	
	    function parseExportNamedDeclaration(node) {
	        var declaration = null,
	            isExportFromIdentifier,
	            src = null, specifiers = [];
	
	        // non-default export
	        if (lookahead.type === Token.Keyword) {
	            // covers:
	            // export var f = 1;
	            switch (lookahead.value) {
	                case 'let':
	                case 'const':
	                    declaration = parseLexicalDeclaration({inFor: false});
	                    return node.finishExportNamedDeclaration(declaration, specifiers, null);
	                case 'var':
	                case 'class':
	                case 'function':
	                    declaration = parseStatementListItem();
	                    return node.finishExportNamedDeclaration(declaration, specifiers, null);
	            }
	        }
	
	        expect('{');
	        while (!match('}')) {
	            isExportFromIdentifier = isExportFromIdentifier || matchKeyword('default');
	            specifiers.push(parseExportSpecifier());
	            if (!match('}')) {
	                expect(',');
	                if (match('}')) {
	                    break;
	                }
	            }
	        }
	        expect('}');
	
	        if (matchContextualKeyword('from')) {
	            // covering:
	            // export {default} from 'foo';
	            // export {foo} from 'foo';
	            lex();
	            src = parseModuleSpecifier();
	            consumeSemicolon();
	        } else if (isExportFromIdentifier) {
	            // covering:
	            // export {default}; // missing fromClause
	            throwError(lookahead.value ?
	                    Messages.UnexpectedToken : Messages.MissingFromClause, lookahead.value);
	        } else {
	            // cover
	            // export {foo};
	            consumeSemicolon();
	        }
	        return node.finishExportNamedDeclaration(declaration, specifiers, src);
	    }
	
	    function parseExportDefaultDeclaration(node) {
	        var declaration = null,
	            expression = null;
	
	        // covers:
	        // export default ...
	        expectKeyword('default');
	
	        if (matchKeyword('function')) {
	            // covers:
	            // export default function foo () {}
	            // export default function () {}
	            declaration = parseFunctionDeclaration(new Node(), true);
	            return node.finishExportDefaultDeclaration(declaration);
	        }
	        if (matchKeyword('class')) {
	            declaration = parseClassDeclaration(true);
	            return node.finishExportDefaultDeclaration(declaration);
	        }
	
	        if (matchContextualKeyword('from')) {
	            throwError(Messages.UnexpectedToken, lookahead.value);
	        }
	
	        // covers:
	        // export default {};
	        // export default [];
	        // export default (1 + 2);
	        if (match('{')) {
	            expression = parseObjectInitializer();
	        } else if (match('[')) {
	            expression = parseArrayInitializer();
	        } else {
	            expression = parseAssignmentExpression();
	        }
	        consumeSemicolon();
	        return node.finishExportDefaultDeclaration(expression);
	    }
	
	    function parseExportAllDeclaration(node) {
	        var src;
	
	        // covers:
	        // export * from 'foo';
	        expect('*');
	        if (!matchContextualKeyword('from')) {
	            throwError(lookahead.value ?
	                    Messages.UnexpectedToken : Messages.MissingFromClause, lookahead.value);
	        }
	        lex();
	        src = parseModuleSpecifier();
	        consumeSemicolon();
	
	        return node.finishExportAllDeclaration(src);
	    }
	
	    function parseExportDeclaration() {
	        var node = new Node();
	        if (state.inFunctionBody) {
	            throwError(Messages.IllegalExportDeclaration);
	        }
	
	        expectKeyword('export');
	
	        if (matchKeyword('default')) {
	            return parseExportDefaultDeclaration(node);
	        }
	        if (match('*')) {
	            return parseExportAllDeclaration(node);
	        }
	        return parseExportNamedDeclaration(node);
	    }
	
	    // ECMA-262 15.2.2 Imports
	
	    function parseImportSpecifier() {
	        // import {<foo as bar>} ...;
	        var local, imported, node = new Node();
	
	        imported = parseNonComputedProperty();
	        if (matchContextualKeyword('as')) {
	            lex();
	            local = parseVariableIdentifier();
	        }
	
	        return node.finishImportSpecifier(local, imported);
	    }
	
	    function parseNamedImports() {
	        var specifiers = [];
	        // {foo, bar as bas}
	        expect('{');
	        while (!match('}')) {
	            specifiers.push(parseImportSpecifier());
	            if (!match('}')) {
	                expect(',');
	                if (match('}')) {
	                    break;
	                }
	            }
	        }
	        expect('}');
	        return specifiers;
	    }
	
	    function parseImportDefaultSpecifier() {
	        // import <foo> ...;
	        var local, node = new Node();
	
	        local = parseNonComputedProperty();
	
	        return node.finishImportDefaultSpecifier(local);
	    }
	
	    function parseImportNamespaceSpecifier() {
	        // import <* as foo> ...;
	        var local, node = new Node();
	
	        expect('*');
	        if (!matchContextualKeyword('as')) {
	            throwError(Messages.NoAsAfterImportNamespace);
	        }
	        lex();
	        local = parseNonComputedProperty();
	
	        return node.finishImportNamespaceSpecifier(local);
	    }
	
	    function parseImportDeclaration() {
	        var specifiers = [], src, node = new Node();
	
	        if (state.inFunctionBody) {
	            throwError(Messages.IllegalImportDeclaration);
	        }
	
	        expectKeyword('import');
	
	        if (lookahead.type === Token.StringLiteral) {
	            // import 'foo';
	            src = parseModuleSpecifier();
	        } else {
	
	            if (match('{')) {
	                // import {bar}
	                specifiers = specifiers.concat(parseNamedImports());
	            } else if (match('*')) {
	                // import * as foo
	                specifiers.push(parseImportNamespaceSpecifier());
	            } else if (isIdentifierName(lookahead) && !matchKeyword('default')) {
	                // import foo
	                specifiers.push(parseImportDefaultSpecifier());
	                if (match(',')) {
	                    lex();
	                    if (match('*')) {
	                        // import foo, * as foo
	                        specifiers.push(parseImportNamespaceSpecifier());
	                    } else if (match('{')) {
	                        // import foo, {bar}
	                        specifiers = specifiers.concat(parseNamedImports());
	                    } else {
	                        throwUnexpectedToken(lookahead);
	                    }
	                }
	            } else {
	                throwUnexpectedToken(lex());
	            }
	
	            if (!matchContextualKeyword('from')) {
	                throwError(lookahead.value ?
	                        Messages.UnexpectedToken : Messages.MissingFromClause, lookahead.value);
	            }
	            lex();
	            src = parseModuleSpecifier();
	        }
	
	        consumeSemicolon();
	        return node.finishImportDeclaration(specifiers, src);
	    }
	
	    // ECMA-262 15.1 Scripts
	
	    function parseScriptBody() {
	        var statement, body = [], token, directive, firstRestricted;
	
	        while (startIndex < length) {
	            token = lookahead;
	            if (token.type !== Token.StringLiteral) {
	                break;
	            }
	
	            statement = parseStatementListItem();
	            body.push(statement);
	            if (statement.expression.type !== Syntax.Literal) {
	                // this is not directive
	                break;
	            }
	            directive = source.slice(token.start + 1, token.end - 1);
	            if (directive === 'use strict') {
	                strict = true;
	                if (firstRestricted) {
	                    tolerateUnexpectedToken(firstRestricted, Messages.StrictOctalLiteral);
	                }
	            } else {
	                if (!firstRestricted && token.octal) {
	                    firstRestricted = token;
	                }
	            }
	        }
	
	        while (startIndex < length) {
	            statement = parseStatementListItem();
	            /* istanbul ignore if */
	            if (typeof statement === 'undefined') {
	                break;
	            }
	            body.push(statement);
	        }
	        return body;
	    }
	
	    function parseProgram() {
	        var body, node;
	
	        peek();
	        node = new Node();
	
	        body = parseScriptBody();
	        return node.finishProgram(body, state.sourceType);
	    }
	
	    function filterTokenLocation() {
	        var i, entry, token, tokens = [];
	
	        for (i = 0; i < extra.tokens.length; ++i) {
	            entry = extra.tokens[i];
	            token = {
	                type: entry.type,
	                value: entry.value
	            };
	            if (entry.regex) {
	                token.regex = {
	                    pattern: entry.regex.pattern,
	                    flags: entry.regex.flags
	                };
	            }
	            if (extra.range) {
	                token.range = entry.range;
	            }
	            if (extra.loc) {
	                token.loc = entry.loc;
	            }
	            tokens.push(token);
	        }
	
	        extra.tokens = tokens;
	    }
	
	    function tokenize(code, options, delegate) {
	        var toString,
	            tokens;
	
	        toString = String;
	        if (typeof code !== 'string' && !(code instanceof String)) {
	            code = toString(code);
	        }
	
	        source = code;
	        index = 0;
	        lineNumber = (source.length > 0) ? 1 : 0;
	        lineStart = 0;
	        startIndex = index;
	        startLineNumber = lineNumber;
	        startLineStart = lineStart;
	        length = source.length;
	        lookahead = null;
	        state = {
	            allowIn: true,
	            allowYield: true,
	            labelSet: {},
	            inFunctionBody: false,
	            inIteration: false,
	            inSwitch: false,
	            lastCommentStart: -1,
	            curlyStack: []
	        };
	
	        extra = {};
	
	        // Options matching.
	        options = options || {};
	
	        // Of course we collect tokens here.
	        options.tokens = true;
	        extra.tokens = [];
	        extra.tokenValues = [];
	        extra.tokenize = true;
	        extra.delegate = delegate;
	
	        // The following two fields are necessary to compute the Regex tokens.
	        extra.openParenToken = -1;
	        extra.openCurlyToken = -1;
	
	        extra.range = (typeof options.range === 'boolean') && options.range;
	        extra.loc = (typeof options.loc === 'boolean') && options.loc;
	
	        if (typeof options.comment === 'boolean' && options.comment) {
	            extra.comments = [];
	        }
	        if (typeof options.tolerant === 'boolean' && options.tolerant) {
	            extra.errors = [];
	        }
	
	        try {
	            peek();
	            if (lookahead.type === Token.EOF) {
	                return extra.tokens;
	            }
	
	            lex();
	            while (lookahead.type !== Token.EOF) {
	                try {
	                    lex();
	                } catch (lexError) {
	                    if (extra.errors) {
	                        recordError(lexError);
	                        // We have to break on the first error
	                        // to avoid infinite loops.
	                        break;
	                    } else {
	                        throw lexError;
	                    }
	                }
	            }
	
	            tokens = extra.tokens;
	            if (typeof extra.errors !== 'undefined') {
	                tokens.errors = extra.errors;
	            }
	        } catch (e) {
	            throw e;
	        } finally {
	            extra = {};
	        }
	        return tokens;
	    }
	
	    function parse(code, options) {
	        var program, toString;
	
	        toString = String;
	        if (typeof code !== 'string' && !(code instanceof String)) {
	            code = toString(code);
	        }
	
	        source = code;
	        index = 0;
	        lineNumber = (source.length > 0) ? 1 : 0;
	        lineStart = 0;
	        startIndex = index;
	        startLineNumber = lineNumber;
	        startLineStart = lineStart;
	        length = source.length;
	        lookahead = null;
	        state = {
	            allowIn: true,
	            allowYield: true,
	            labelSet: {},
	            inFunctionBody: false,
	            inIteration: false,
	            inSwitch: false,
	            lastCommentStart: -1,
	            curlyStack: [],
	            sourceType: 'script'
	        };
	        strict = false;
	
	        extra = {};
	        if (typeof options !== 'undefined') {
	            extra.range = (typeof options.range === 'boolean') && options.range;
	            extra.loc = (typeof options.loc === 'boolean') && options.loc;
	            extra.attachComment = (typeof options.attachComment === 'boolean') && options.attachComment;
	
	            if (extra.loc && options.source !== null && options.source !== undefined) {
	                extra.source = toString(options.source);
	            }
	
	            if (typeof options.tokens === 'boolean' && options.tokens) {
	                extra.tokens = [];
	            }
	            if (typeof options.comment === 'boolean' && options.comment) {
	                extra.comments = [];
	            }
	            if (typeof options.tolerant === 'boolean' && options.tolerant) {
	                extra.errors = [];
	            }
	            if (extra.attachComment) {
	                extra.range = true;
	                extra.comments = [];
	                extra.bottomRightStack = [];
	                extra.trailingComments = [];
	                extra.leadingComments = [];
	            }
	            if (options.sourceType === 'module') {
	                // very restrictive condition for now
	                state.sourceType = options.sourceType;
	                strict = true;
	            }
	        }
	
	        try {
	            program = parseProgram();
	            if (typeof extra.comments !== 'undefined') {
	                program.comments = extra.comments;
	            }
	            if (typeof extra.tokens !== 'undefined') {
	                filterTokenLocation();
	                program.tokens = extra.tokens;
	            }
	            if (typeof extra.errors !== 'undefined') {
	                program.errors = extra.errors;
	            }
	        } catch (e) {
	            throw e;
	        } finally {
	            extra = {};
	        }
	
	        return program;
	    }
	
	    // Sync with *.json manifests.
	    exports.version = '2.7.3';
	
	    exports.tokenize = tokenize;
	
	    exports.parse = parse;
	
	    // Deep copy.
	    /* istanbul ignore next */
	    exports.Syntax = (function () {
	        var name, types = {};
	
	        if (typeof Object.create === 'function') {
	            types = Object.create(null);
	        }
	
	        for (name in Syntax) {
	            if (Syntax.hasOwnProperty(name)) {
	                types[name] = Syntax[name];
	            }
	        }
	
	        if (typeof Object.freeze === 'function') {
	            Object.freeze(types);
	        }
	
	        return types;
	    }());
	
	}));
	/* vim: set sw=4 ts=4 et tw=80 : */


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/*eslint-disable no-use-before-define*/
	
	var common              = __webpack_require__(9);
	var YAMLException       = __webpack_require__(10);
	var DEFAULT_FULL_SCHEMA = __webpack_require__(31);
	var DEFAULT_SAFE_SCHEMA = __webpack_require__(12);
	
	var _toString       = Object.prototype.toString;
	var _hasOwnProperty = Object.prototype.hasOwnProperty;
	
	var CHAR_TAB                  = 0x09; /* Tab */
	var CHAR_LINE_FEED            = 0x0A; /* LF */
	var CHAR_SPACE                = 0x20; /* Space */
	var CHAR_EXCLAMATION          = 0x21; /* ! */
	var CHAR_DOUBLE_QUOTE         = 0x22; /* " */
	var CHAR_SHARP                = 0x23; /* # */
	var CHAR_PERCENT              = 0x25; /* % */
	var CHAR_AMPERSAND            = 0x26; /* & */
	var CHAR_SINGLE_QUOTE         = 0x27; /* ' */
	var CHAR_ASTERISK             = 0x2A; /* * */
	var CHAR_COMMA                = 0x2C; /* , */
	var CHAR_MINUS                = 0x2D; /* - */
	var CHAR_COLON                = 0x3A; /* : */
	var CHAR_GREATER_THAN         = 0x3E; /* > */
	var CHAR_QUESTION             = 0x3F; /* ? */
	var CHAR_COMMERCIAL_AT        = 0x40; /* @ */
	var CHAR_LEFT_SQUARE_BRACKET  = 0x5B; /* [ */
	var CHAR_RIGHT_SQUARE_BRACKET = 0x5D; /* ] */
	var CHAR_GRAVE_ACCENT         = 0x60; /* ` */
	var CHAR_LEFT_CURLY_BRACKET   = 0x7B; /* { */
	var CHAR_VERTICAL_LINE        = 0x7C; /* | */
	var CHAR_RIGHT_CURLY_BRACKET  = 0x7D; /* } */
	
	var ESCAPE_SEQUENCES = {};
	
	ESCAPE_SEQUENCES[0x00]   = '\\0';
	ESCAPE_SEQUENCES[0x07]   = '\\a';
	ESCAPE_SEQUENCES[0x08]   = '\\b';
	ESCAPE_SEQUENCES[0x09]   = '\\t';
	ESCAPE_SEQUENCES[0x0A]   = '\\n';
	ESCAPE_SEQUENCES[0x0B]   = '\\v';
	ESCAPE_SEQUENCES[0x0C]   = '\\f';
	ESCAPE_SEQUENCES[0x0D]   = '\\r';
	ESCAPE_SEQUENCES[0x1B]   = '\\e';
	ESCAPE_SEQUENCES[0x22]   = '\\"';
	ESCAPE_SEQUENCES[0x5C]   = '\\\\';
	ESCAPE_SEQUENCES[0x85]   = '\\N';
	ESCAPE_SEQUENCES[0xA0]   = '\\_';
	ESCAPE_SEQUENCES[0x2028] = '\\L';
	ESCAPE_SEQUENCES[0x2029] = '\\P';
	
	var DEPRECATED_BOOLEANS_SYNTAX = [
	  'y', 'Y', 'yes', 'Yes', 'YES', 'on', 'On', 'ON',
	  'n', 'N', 'no', 'No', 'NO', 'off', 'Off', 'OFF'
	];
	
	function compileStyleMap(schema, map) {
	  var result, keys, index, length, tag, style, type;
	
	  if (map === null) return {};
	
	  result = {};
	  keys = Object.keys(map);
	
	  for (index = 0, length = keys.length; index < length; index += 1) {
	    tag = keys[index];
	    style = String(map[tag]);
	
	    if (tag.slice(0, 2) === '!!') {
	      tag = 'tag:yaml.org,2002:' + tag.slice(2);
	    }
	
	    type = schema.compiledTypeMap[tag];
	
	    if (type && _hasOwnProperty.call(type.styleAliases, style)) {
	      style = type.styleAliases[style];
	    }
	
	    result[tag] = style;
	  }
	
	  return result;
	}
	
	function encodeHex(character) {
	  var string, handle, length;
	
	  string = character.toString(16).toUpperCase();
	
	  if (character <= 0xFF) {
	    handle = 'x';
	    length = 2;
	  } else if (character <= 0xFFFF) {
	    handle = 'u';
	    length = 4;
	  } else if (character <= 0xFFFFFFFF) {
	    handle = 'U';
	    length = 8;
	  } else {
	    throw new YAMLException('code point within a string may not be greater than 0xFFFFFFFF');
	  }
	
	  return '\\' + handle + common.repeat('0', length - string.length) + string;
	}
	
	function State(options) {
	  this.schema       = options['schema'] || DEFAULT_FULL_SCHEMA;
	  this.indent       = Math.max(1, (options['indent'] || 2));
	  this.skipInvalid  = options['skipInvalid'] || false;
	  this.flowLevel    = (common.isNothing(options['flowLevel']) ? -1 : options['flowLevel']);
	  this.styleMap     = compileStyleMap(this.schema, options['styles'] || null);
	  this.sortKeys     = options['sortKeys'] || false;
	  this.lineWidth    = options['lineWidth'] || 80;
	  this.noRefs       = options['noRefs'] || false;
	  this.noCompatMode = options['noCompatMode'] || false;
	
	  this.implicitTypes = this.schema.compiledImplicit;
	  this.explicitTypes = this.schema.compiledExplicit;
	
	  this.tag = null;
	  this.result = '';
	
	  this.duplicates = [];
	  this.usedDuplicates = null;
	}
	
	// Indents every line in a string. Empty lines (\n only) are not indented.
	function indentString(string, spaces) {
	  var ind = common.repeat(' ', spaces),
	      position = 0,
	      next = -1,
	      result = '',
	      line,
	      length = string.length;
	
	  while (position < length) {
	    next = string.indexOf('\n', position);
	    if (next === -1) {
	      line = string.slice(position);
	      position = length;
	    } else {
	      line = string.slice(position, next + 1);
	      position = next + 1;
	    }
	
	    if (line.length && line !== '\n') result += ind;
	
	    result += line;
	  }
	
	  return result;
	}
	
	function generateNextLine(state, level) {
	  return '\n' + common.repeat(' ', state.indent * level);
	}
	
	function testImplicitResolving(state, str) {
	  var index, length, type;
	
	  for (index = 0, length = state.implicitTypes.length; index < length; index += 1) {
	    type = state.implicitTypes[index];
	
	    if (type.resolve(str)) {
	      return true;
	    }
	  }
	
	  return false;
	}
	
	// [33] s-white ::= s-space | s-tab
	function isWhitespace(c) {
	  return c === CHAR_SPACE || c === CHAR_TAB;
	}
	
	// Returns true if the character can be printed without escaping.
	// From YAML 1.2: "any allowed characters known to be non-printable
	// should also be escaped. [However,] This isn’t mandatory"
	// Derived from nb-char - \t - #x85 - #xA0 - #x2028 - #x2029.
	function isPrintable(c) {
	  return  (0x00020 <= c && c <= 0x00007E)
	      || ((0x000A1 <= c && c <= 0x00D7FF) && c !== 0x2028 && c !== 0x2029)
	      || ((0x0E000 <= c && c <= 0x00FFFD) && c !== 0xFEFF /* BOM */)
	      ||  (0x10000 <= c && c <= 0x10FFFF);
	}
	
	// Simplified test for values allowed after the first character in plain style.
	function isPlainSafe(c) {
	  // Uses a subset of nb-char - c-flow-indicator - ":" - "#"
	  // where nb-char ::= c-printable - b-char - c-byte-order-mark.
	  return isPrintable(c) && c !== 0xFEFF
	    // - c-flow-indicator
	    && c !== CHAR_COMMA
	    && c !== CHAR_LEFT_SQUARE_BRACKET
	    && c !== CHAR_RIGHT_SQUARE_BRACKET
	    && c !== CHAR_LEFT_CURLY_BRACKET
	    && c !== CHAR_RIGHT_CURLY_BRACKET
	    // - ":" - "#"
	    && c !== CHAR_COLON
	    && c !== CHAR_SHARP;
	}
	
	// Simplified test for values allowed as the first character in plain style.
	function isPlainSafeFirst(c) {
	  // Uses a subset of ns-char - c-indicator
	  // where ns-char = nb-char - s-white.
	  return isPrintable(c) && c !== 0xFEFF
	    && !isWhitespace(c) // - s-white
	    // - (c-indicator ::=
	    // “-” | “?” | “:” | “,” | “[” | “]” | “{” | “}”
	    && c !== CHAR_MINUS
	    && c !== CHAR_QUESTION
	    && c !== CHAR_COLON
	    && c !== CHAR_COMMA
	    && c !== CHAR_LEFT_SQUARE_BRACKET
	    && c !== CHAR_RIGHT_SQUARE_BRACKET
	    && c !== CHAR_LEFT_CURLY_BRACKET
	    && c !== CHAR_RIGHT_CURLY_BRACKET
	    // | “#” | “&” | “*” | “!” | “|” | “>” | “'” | “"”
	    && c !== CHAR_SHARP
	    && c !== CHAR_AMPERSAND
	    && c !== CHAR_ASTERISK
	    && c !== CHAR_EXCLAMATION
	    && c !== CHAR_VERTICAL_LINE
	    && c !== CHAR_GREATER_THAN
	    && c !== CHAR_SINGLE_QUOTE
	    && c !== CHAR_DOUBLE_QUOTE
	    // | “%” | “@” | “`”)
	    && c !== CHAR_PERCENT
	    && c !== CHAR_COMMERCIAL_AT
	    && c !== CHAR_GRAVE_ACCENT;
	}
	
	var STYLE_PLAIN   = 1,
	    STYLE_SINGLE  = 2,
	    STYLE_LITERAL = 3,
	    STYLE_FOLDED  = 4,
	    STYLE_DOUBLE  = 5;
	
	// Determines which scalar styles are possible and returns the preferred style.
	// lineWidth = -1 => no limit.
	// Pre-conditions: str.length > 0.
	// Post-conditions:
	//    STYLE_PLAIN or STYLE_SINGLE => no \n are in the string.
	//    STYLE_LITERAL => no lines are suitable for folding (or lineWidth is -1).
	//    STYLE_FOLDED => a line > lineWidth and can be folded (and lineWidth != -1).
	function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType) {
	  var i;
	  var char;
	  var hasLineBreak = false;
	  var hasFoldableLine = false; // only checked if shouldTrackWidth
	  var shouldTrackWidth = lineWidth !== -1;
	  var previousLineBreak = -1; // count the first line correctly
	  var plain = isPlainSafeFirst(string.charCodeAt(0))
	          && !isWhitespace(string.charCodeAt(string.length - 1));
	
	  if (singleLineOnly) {
	    // Case: no block styles.
	    // Check for disallowed characters to rule out plain and single.
	    for (i = 0; i < string.length; i++) {
	      char = string.charCodeAt(i);
	      if (!isPrintable(char)) {
	        return STYLE_DOUBLE;
	      }
	      plain = plain && isPlainSafe(char);
	    }
	  } else {
	    // Case: block styles permitted.
	    for (i = 0; i < string.length; i++) {
	      char = string.charCodeAt(i);
	      if (char === CHAR_LINE_FEED) {
	        hasLineBreak = true;
	        // Check if any line can be folded.
	        if (shouldTrackWidth) {
	          hasFoldableLine = hasFoldableLine ||
	            // Foldable line = too long, and not more-indented.
	            (i - previousLineBreak - 1 > lineWidth &&
	             string[previousLineBreak + 1] !== ' ');
	          previousLineBreak = i;
	        }
	      } else if (!isPrintable(char)) {
	        return STYLE_DOUBLE;
	      }
	      plain = plain && isPlainSafe(char);
	    }
	    // in case the end is missing a \n
	    hasFoldableLine = hasFoldableLine || (shouldTrackWidth &&
	      (i - previousLineBreak - 1 > lineWidth &&
	       string[previousLineBreak + 1] !== ' '));
	  }
	  // Although every style can represent \n without escaping, prefer block styles
	  // for multiline, since they're more readable and they don't add empty lines.
	  // Also prefer folding a super-long line.
	  if (!hasLineBreak && !hasFoldableLine) {
	    // Strings interpretable as another type have to be quoted;
	    // e.g. the string 'true' vs. the boolean true.
	    return plain && !testAmbiguousType(string)
	      ? STYLE_PLAIN : STYLE_SINGLE;
	  }
	  // Edge case: block indentation indicator can only have one digit.
	  if (string[0] === ' ' && indentPerLevel > 9) {
	    return STYLE_DOUBLE;
	  }
	  // At this point we know block styles are valid.
	  // Prefer literal style unless we want to fold.
	  return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
	}
	
	// Note: line breaking/folding is implemented for only the folded style.
	// NB. We drop the last trailing newline (if any) of a returned block scalar
	//  since the dumper adds its own newline. This always works:
	//    • No ending newline => unaffected; already using strip "-" chomping.
	//    • Ending newline    => removed then restored.
	//  Importantly, this keeps the "+" chomp indicator from gaining an extra line.
	function writeScalar(state, string, level, iskey) {
	  state.dump = (function () {
	    if (string.length === 0) {
	      return "''";
	    }
	    if (!state.noCompatMode &&
	        DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1) {
	      return "'" + string + "'";
	    }
	
	    var indent = state.indent * Math.max(1, level); // no 0-indent scalars
	    // As indentation gets deeper, let the width decrease monotonically
	    // to the lower bound min(state.lineWidth, 40).
	    // Note that this implies
	    //  state.lineWidth ≤ 40 + state.indent: width is fixed at the lower bound.
	    //  state.lineWidth > 40 + state.indent: width decreases until the lower bound.
	    // This behaves better than a constant minimum width which disallows narrower options,
	    // or an indent threshold which causes the width to suddenly increase.
	    var lineWidth = state.lineWidth === -1
	      ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);
	
	    // Without knowing if keys are implicit/explicit, assume implicit for safety.
	    var singleLineOnly = iskey
	      // No block styles in flow mode.
	      || (state.flowLevel > -1 && level >= state.flowLevel);
	    function testAmbiguity(string) {
	      return testImplicitResolving(state, string);
	    }
	
	    switch (chooseScalarStyle(string, singleLineOnly, state.indent, lineWidth, testAmbiguity)) {
	      case STYLE_PLAIN:
	        return string;
	      case STYLE_SINGLE:
	        return "'" + string.replace(/'/g, "''") + "'";
	      case STYLE_LITERAL:
	        return '|' + blockHeader(string, state.indent)
	          + dropEndingNewline(indentString(string, indent));
	      case STYLE_FOLDED:
	        return '>' + blockHeader(string, state.indent)
	          + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
	      case STYLE_DOUBLE:
	        return '"' + escapeString(string, lineWidth) + '"';
	      default:
	        throw new YAMLException('impossible error: invalid scalar style');
	    }
	  }());
	}
	
	// Pre-conditions: string is valid for a block scalar, 1 <= indentPerLevel <= 9.
	function blockHeader(string, indentPerLevel) {
	  var indentIndicator = (string[0] === ' ') ? String(indentPerLevel) : '';
	
	  // note the special case: the string '\n' counts as a "trailing" empty line.
	  var clip =          string[string.length - 1] === '\n';
	  var keep = clip && (string[string.length - 2] === '\n' || string === '\n');
	  var chomp = keep ? '+' : (clip ? '' : '-');
	
	  return indentIndicator + chomp + '\n';
	}
	
	// (See the note for writeScalar.)
	function dropEndingNewline(string) {
	  return string[string.length - 1] === '\n' ? string.slice(0, -1) : string;
	}
	
	// Note: a long line without a suitable break point will exceed the width limit.
	// Pre-conditions: every char in str isPrintable, str.length > 0, width > 0.
	function foldString(string, width) {
	  // In folded style, $k$ consecutive newlines output as $k+1$ newlines—
	  // unless they're before or after a more-indented line, or at the very
	  // beginning or end, in which case $k$ maps to $k$.
	  // Therefore, parse each chunk as newline(s) followed by a content line.
	  var lineRe = /(\n+)([^\n]*)/g;
	
	  // first line (possibly an empty line)
	  var result = (function () {
	    var nextLF = string.indexOf('\n');
	    nextLF = nextLF !== -1 ? nextLF : string.length;
	    lineRe.lastIndex = nextLF;
	    return foldLine(string.slice(0, nextLF), width);
	  }());
	  // If we haven't reached the first content line yet, don't add an extra \n.
	  var prevMoreIndented = string[0] === '\n' || string[0] === ' ';
	  var moreIndented;
	
	  // rest of the lines
	  var match;
	  while ((match = lineRe.exec(string))) {
	    var prefix = match[1], line = match[2];
	    moreIndented = (line[0] === ' ');
	    result += prefix
	      + (!prevMoreIndented && !moreIndented && line !== ''
	        ? '\n' : '')
	      + foldLine(line, width);
	    prevMoreIndented = moreIndented;
	  }
	
	  return result;
	}
	
	// Greedy line breaking.
	// Picks the longest line under the limit each time,
	// otherwise settles for the shortest line over the limit.
	// NB. More-indented lines *cannot* be folded, as that would add an extra \n.
	function foldLine(line, width) {
	  if (line === '' || line[0] === ' ') return line;
	
	  // Since a more-indented line adds a \n, breaks can't be followed by a space.
	  var breakRe = / [^ ]/g; // note: the match index will always be <= length-2.
	  var match;
	  // start is an inclusive index. end, curr, and next are exclusive.
	  var start = 0, end, curr = 0, next = 0;
	  var result = '';
	
	  // Invariants: 0 <= start <= length-1.
	  //   0 <= curr <= next <= max(0, length-2). curr - start <= width.
	  // Inside the loop:
	  //   A match implies length >= 2, so curr and next are <= length-2.
	  while ((match = breakRe.exec(line))) {
	    next = match.index;
	    // maintain invariant: curr - start <= width
	    if (next - start > width) {
	      end = (curr > start) ? curr : next; // derive end <= length-2
	      result += '\n' + line.slice(start, end);
	      // skip the space that was output as \n
	      start = end + 1;                    // derive start <= length-1
	    }
	    curr = next;
	  }
	
	  // By the invariants, start <= length-1, so there is something left over.
	  // It is either the whole string or a part starting from non-whitespace.
	  result += '\n';
	  // Insert a break if the remainder is too long and there is a break available.
	  if (line.length - start > width && curr > start) {
	    result += line.slice(start, curr) + '\n' + line.slice(curr + 1);
	  } else {
	    result += line.slice(start);
	  }
	
	  return result.slice(1); // drop extra \n joiner
	}
	
	// Escapes a double-quoted string.
	function escapeString(string) {
	  var result = '';
	  var char;
	  var escapeSeq;
	
	  for (var i = 0; i < string.length; i++) {
	    char = string.charCodeAt(i);
	    escapeSeq = ESCAPE_SEQUENCES[char];
	    result += !escapeSeq && isPrintable(char)
	      ? string[i]
	      : escapeSeq || encodeHex(char);
	  }
	
	  return result;
	}
	
	function writeFlowSequence(state, level, object) {
	  var _result = '',
	      _tag    = state.tag,
	      index,
	      length;
	
	  for (index = 0, length = object.length; index < length; index += 1) {
	    // Write only valid elements.
	    if (writeNode(state, level, object[index], false, false)) {
	      if (index !== 0) _result += ', ';
	      _result += state.dump;
	    }
	  }
	
	  state.tag = _tag;
	  state.dump = '[' + _result + ']';
	}
	
	function writeBlockSequence(state, level, object, compact) {
	  var _result = '',
	      _tag    = state.tag,
	      index,
	      length;
	
	  for (index = 0, length = object.length; index < length; index += 1) {
	    // Write only valid elements.
	    if (writeNode(state, level + 1, object[index], true, true)) {
	      if (!compact || index !== 0) {
	        _result += generateNextLine(state, level);
	      }
	      _result += '- ' + state.dump;
	    }
	  }
	
	  state.tag = _tag;
	  state.dump = _result || '[]'; // Empty sequence if no valid values.
	}
	
	function writeFlowMapping(state, level, object) {
	  var _result       = '',
	      _tag          = state.tag,
	      objectKeyList = Object.keys(object),
	      index,
	      length,
	      objectKey,
	      objectValue,
	      pairBuffer;
	
	  for (index = 0, length = objectKeyList.length; index < length; index += 1) {
	    pairBuffer = '';
	
	    if (index !== 0) pairBuffer += ', ';
	
	    objectKey = objectKeyList[index];
	    objectValue = object[objectKey];
	
	    if (!writeNode(state, level, objectKey, false, false)) {
	      continue; // Skip this pair because of invalid key;
	    }
	
	    if (state.dump.length > 1024) pairBuffer += '? ';
	
	    pairBuffer += state.dump + ': ';
	
	    if (!writeNode(state, level, objectValue, false, false)) {
	      continue; // Skip this pair because of invalid value.
	    }
	
	    pairBuffer += state.dump;
	
	    // Both key and value are valid.
	    _result += pairBuffer;
	  }
	
	  state.tag = _tag;
	  state.dump = '{' + _result + '}';
	}
	
	function writeBlockMapping(state, level, object, compact) {
	  var _result       = '',
	      _tag          = state.tag,
	      objectKeyList = Object.keys(object),
	      index,
	      length,
	      objectKey,
	      objectValue,
	      explicitPair,
	      pairBuffer;
	
	  // Allow sorting keys so that the output file is deterministic
	  if (state.sortKeys === true) {
	    // Default sorting
	    objectKeyList.sort();
	  } else if (typeof state.sortKeys === 'function') {
	    // Custom sort function
	    objectKeyList.sort(state.sortKeys);
	  } else if (state.sortKeys) {
	    // Something is wrong
	    throw new YAMLException('sortKeys must be a boolean or a function');
	  }
	
	  for (index = 0, length = objectKeyList.length; index < length; index += 1) {
	    pairBuffer = '';
	
	    if (!compact || index !== 0) {
	      pairBuffer += generateNextLine(state, level);
	    }
	
	    objectKey = objectKeyList[index];
	    objectValue = object[objectKey];
	
	    if (!writeNode(state, level + 1, objectKey, true, true, true)) {
	      continue; // Skip this pair because of invalid key.
	    }
	
	    explicitPair = (state.tag !== null && state.tag !== '?') ||
	                   (state.dump && state.dump.length > 1024);
	
	    if (explicitPair) {
	      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
	        pairBuffer += '?';
	      } else {
	        pairBuffer += '? ';
	      }
	    }
	
	    pairBuffer += state.dump;
	
	    if (explicitPair) {
	      pairBuffer += generateNextLine(state, level);
	    }
	
	    if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
	      continue; // Skip this pair because of invalid value.
	    }
	
	    if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
	      pairBuffer += ':';
	    } else {
	      pairBuffer += ': ';
	    }
	
	    pairBuffer += state.dump;
	
	    // Both key and value are valid.
	    _result += pairBuffer;
	  }
	
	  state.tag = _tag;
	  state.dump = _result || '{}'; // Empty mapping if no valid pairs.
	}
	
	function detectType(state, object, explicit) {
	  var _result, typeList, index, length, type, style;
	
	  typeList = explicit ? state.explicitTypes : state.implicitTypes;
	
	  for (index = 0, length = typeList.length; index < length; index += 1) {
	    type = typeList[index];
	
	    if ((type.instanceOf  || type.predicate) &&
	        (!type.instanceOf || ((typeof object === 'object') && (object instanceof type.instanceOf))) &&
	        (!type.predicate  || type.predicate(object))) {
	
	      state.tag = explicit ? type.tag : '?';
	
	      if (type.represent) {
	        style = state.styleMap[type.tag] || type.defaultStyle;
	
	        if (_toString.call(type.represent) === '[object Function]') {
	          _result = type.represent(object, style);
	        } else if (_hasOwnProperty.call(type.represent, style)) {
	          _result = type.represent[style](object, style);
	        } else {
	          throw new YAMLException('!<' + type.tag + '> tag resolver accepts not "' + style + '" style');
	        }
	
	        state.dump = _result;
	      }
	
	      return true;
	    }
	  }
	
	  return false;
	}
	
	// Serializes `object` and writes it to global `result`.
	// Returns true on success, or false on invalid object.
	//
	function writeNode(state, level, object, block, compact, iskey) {
	  state.tag = null;
	  state.dump = object;
	
	  if (!detectType(state, object, false)) {
	    detectType(state, object, true);
	  }
	
	  var type = _toString.call(state.dump);
	
	  if (block) {
	    block = (state.flowLevel < 0 || state.flowLevel > level);
	  }
	
	  var objectOrArray = type === '[object Object]' || type === '[object Array]',
	      duplicateIndex,
	      duplicate;
	
	  if (objectOrArray) {
	    duplicateIndex = state.duplicates.indexOf(object);
	    duplicate = duplicateIndex !== -1;
	  }
	
	  if ((state.tag !== null && state.tag !== '?') || duplicate || (state.indent !== 2 && level > 0)) {
	    compact = false;
	  }
	
	  if (duplicate && state.usedDuplicates[duplicateIndex]) {
	    state.dump = '*ref_' + duplicateIndex;
	  } else {
	    if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
	      state.usedDuplicates[duplicateIndex] = true;
	    }
	    if (type === '[object Object]') {
	      if (block && (Object.keys(state.dump).length !== 0)) {
	        writeBlockMapping(state, level, state.dump, compact);
	        if (duplicate) {
	          state.dump = '&ref_' + duplicateIndex + state.dump;
	        }
	      } else {
	        writeFlowMapping(state, level, state.dump);
	        if (duplicate) {
	          state.dump = '&ref_' + duplicateIndex + ' ' + state.dump;
	        }
	      }
	    } else if (type === '[object Array]') {
	      if (block && (state.dump.length !== 0)) {
	        writeBlockSequence(state, level, state.dump, compact);
	        if (duplicate) {
	          state.dump = '&ref_' + duplicateIndex + state.dump;
	        }
	      } else {
	        writeFlowSequence(state, level, state.dump);
	        if (duplicate) {
	          state.dump = '&ref_' + duplicateIndex + ' ' + state.dump;
	        }
	      }
	    } else if (type === '[object String]') {
	      if (state.tag !== '?') {
	        writeScalar(state, state.dump, level, iskey);
	      }
	    } else {
	      if (state.skipInvalid) return false;
	      throw new YAMLException('unacceptable kind of an object to dump ' + type);
	    }
	
	    if (state.tag !== null && state.tag !== '?') {
	      state.dump = '!<' + state.tag + '> ' + state.dump;
	    }
	  }
	
	  return true;
	}
	
	function getDuplicateReferences(object, state) {
	  var objects = [],
	      duplicatesIndexes = [],
	      index,
	      length;
	
	  inspectNode(object, objects, duplicatesIndexes);
	
	  for (index = 0, length = duplicatesIndexes.length; index < length; index += 1) {
	    state.duplicates.push(objects[duplicatesIndexes[index]]);
	  }
	  state.usedDuplicates = new Array(length);
	}
	
	function inspectNode(object, objects, duplicatesIndexes) {
	  var objectKeyList,
	      index,
	      length;
	
	  if (object !== null && typeof object === 'object') {
	    index = objects.indexOf(object);
	    if (index !== -1) {
	      if (duplicatesIndexes.indexOf(index) === -1) {
	        duplicatesIndexes.push(index);
	      }
	    } else {
	      objects.push(object);
	
	      if (Array.isArray(object)) {
	        for (index = 0, length = object.length; index < length; index += 1) {
	          inspectNode(object[index], objects, duplicatesIndexes);
	        }
	      } else {
	        objectKeyList = Object.keys(object);
	
	        for (index = 0, length = objectKeyList.length; index < length; index += 1) {
	          inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
	        }
	      }
	    }
	  }
	}
	
	function dump(input, options) {
	  options = options || {};
	
	  var state = new State(options);
	
	  if (!state.noRefs) getDuplicateReferences(input, state);
	
	  if (writeNode(state, 0, input, true, true)) return state.dump + '\n';
	
	  return '';
	}
	
	function safeDump(input, options) {
	  return dump(input, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options));
	}
	
	module.exports.dump     = dump;
	module.exports.safeDump = safeDump;


/***/ }
/******/ ]);
//# sourceMappingURL=d07b6a9e63410cace29d.worker.js.map