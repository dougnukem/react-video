/*
 * React Video - React component to load video from Vimeo or Youtube across any device
 * @version v1.5.3
 * @link https://github.com/pedronauck/react-video
 * @license MIT
 * @author Pedro Nauck (https://github.com/pedronauck)
*/

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactVideo"] = factory(require("react"));
	else
		root["ReactVideo"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var React = __webpack_require__(1);
	var classSet = __webpack_require__(2);
	var ajax = __webpack_require__(3);
	var PlayButton = __webpack_require__(4);
	var Spinner = __webpack_require__(5);
	var ReactPlayer = __webpack_require__(6);

	module.exports = React.createClass({
	  displayName: 'Video',
	  propTypes: {
	    from: React.PropTypes.oneOf(['youtube', 'vimeo']),
	    videoId: React.PropTypes.string.isRequired,
	    onError: React.PropTypes.func
	  },
	  getDefaultProps:function() {
	    return {
	      className: 'video'
	    };
	  },
	  getInitialState:function() {
	    return {
	      thumb: null,
	      imageLoaded: false,
	      showingVideo: false
	    };
	  },
	  isYoutube:function() {
	    return this.props.from === 'youtube' || isNaN(this.props.videoId);
	  },
	  isVimeo:function() {
	    return this.props.from === 'vimeo' || !isNaN(this.props.videoId);
	  },
	  componentWillReceiveProps:function(nextProps) {
	    if (nextProps.className !== this.props.className || nextProps.from !== this.props.from || nextProps.videoId !== this.props.videoId) {
	      this.setState({
	        thumb: null,
	        imageLoaded: false,
	        showingVideo: false
	      });
	    }
	  },
	  componentDidMount:function() {
	    if (!this.state.imageLoaded) {
	      this.isYoutube() && this.fetchYoutubeData();
	      this.isVimeo() && this.fetchVimeoData();
	    }
	  },
	  componentDidUpdate:function() {
	    if (!this.state.imageLoaded) {
	      this.isYoutube() && this.fetchYoutubeData();
	      this.isVimeo() && this.fetchVimeoData();
	    }
	  },
	  render:function() {
	    return (
	      React.createElement("div", {className: this.props.className}, 
	        !this.state.imageLoaded && React.createElement(Spinner, null), 
	        this.renderImage(), 
	        this.renderIframe()
	      )
	    );
	  },
	  renderImage:function() {
	    var style = {
	      backgroundImage: ("url(" + this.state.thumb + ")")
	    };

	    if (this.state.imageLoaded && !this.state.showingVideo) {
	      return (
	        React.createElement("div", {className: "video-image", style: style}, 
	          React.createElement(PlayButton, {onClick: this.playVideo})
	        )
	      );
	    }
	  },
	  renderIframe:function() {
	    var embedVideoStyle = {
	      display: this.state.showingVideo ? 'block' : 'none',
	      width: '100%',
	      height: '100%'
	    };

	    if (this.state.showingVideo) {

	      return (
	        React.createElement("div", {className: "video-embed", style: embedVideoStyle}, 
	          React.createElement(ReactPlayer, {url: getIframeUrl})
	        )
	      );
	    }
	  },
	  playVideo:function(ev) {
	    this.setState({ showingVideo: true });
	    ev.preventDefault();
	  },
	  getIframeUrl:function() {
	    if (this.isYoutube()) {
	      return ("//youtube.com/embed/" + this.props.videoId + "?autoplay=1")
	    }
	    else if (this.isVimeo()) {
	      return ("//player.vimeo.com/video/" + this.props.videoId + "?autoplay=1")
	    }
	  },
	  fetchYoutubeData:function() {
	    var id = this.props.videoId;
	    this.setState({
	      thumb: ("//img.youtube.com/vi/" + id + "/1.jpg"),
	      imageLoaded: true
	    })
	  },
	  fetchVimeoData:function() {
	    var id = this.props.videoId;
	    var that = this;

	    ajax.get({
	      url: ("//vimeo.com/api/v2/video/" + id + ".json"),
	      onSuccess:function(err, res) {
	        that.setState({
	          thumb: res[0].thumbnail_large,
	          imageLoaded: true
	        });
	      },
	      onError: that.props.onError
	    });
	  }
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	/** @jsx React.DOM *//**
	 * Produces the same result as React.addons.classSet
	 * @param  {object} classes
	 * @return {string}
	 *
	 * @author Ciro S. Costa <https://github.com/cirocosta>
	 */

	module.exports = function(classes)  {
	  return typeof classes !== 'object' ?
	    Array.prototype.join.call(arguments, ' ') :
	    Object.keys(classes).filter(function(className)  {return classes[className];}).join(' ');
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	/** @jsx React.DOM */exports.get = function(opts) {
	  var url = opts.url;
	  var successCb = opts.onSuccess;
	  var errorCb = opts.onError;
	  var req = false;

	  // XDomainRequest onload
	  var _oldIE = function () {
	    successCb(null, JSON.parse(req.responseText));
	  };

	  // XMLHttpRequest onload
	  var _onLoad = function () {
	    if (req.readyState !== 4) return;
	    if (req.status === 200) successCb(null, JSON.parse(req.responseText));
	    else {
	      var err = { error: 'Sorry, an error ocurred on the server' };

	      if (errorCb && typeof errorCb === 'function') return errorCb(err);
	      successCb(err, null);
	    }
	  };

	  var _onError = function() {
	    var err = { error: 'Sorry, an error ocurred on the server' };

	    if (errorCb && typeof errorCb === 'function') return errorCb(err);
	    successCb(err, null);
	  };

	  try {
	    req = new XDomainRequest();
	    req.onload = _oldIE;
	  }
	  catch (e) {
	    req = new XMLHttpRequest();
	    req.onreadystatechange = _onLoad;
	  }

	  req.onerror = _onError;
	  req.open('GET', url, true);
	  req.send();
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var React = __webpack_require__(1);

	module.exports = React.createClass({displayName: "exports",
	  propTypes: {
	    onClick: React.PropTypes.func
	  },
	  render:function() {
	    return (
	      React.createElement("button", {type: "button", className: "video-play-button", onClick: this.props.onClick}, 
	        React.createElement("svg", {xmlns: "http://www.w3.org/2000/svg", version: "1.1", viewBox: "0 0 100 100"}, 
	          React.createElement("path", {d: "M79.674,53.719c2.59-2.046,2.59-5.392,0-7.437L22.566,1.053C19.977-0.993,18,0.035,18,3.335v93.331c0,3.3,1.977,4.326,4.566,2.281L79.674,53.719z"})
	        )
	      )
	    );
	  }
	});


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */var React = __webpack_require__(1);

	module.exports = React.createClass({displayName: "exports",
	  render:function() {
	    return (
	      React.createElement("div", {className: "video-loading"}, 
	        React.createElement("svg", {xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 32 32", width: "32", height: "32"}, 
	          React.createElement("path", {opacity: ".25", d: "M16 0 A16 16 0 0 0 16 32 A16 16 0 0 0 16 0 M16 4 A12 12 0 0 1 16 28 A12 12 0 0 1 16 4"}), 
	          React.createElement("path", {d: "M16 0 A16 16 0 0 1 32 16 L28 16 A12 12 0 0 0 16 4z"})
	        )
	      )
	    );
	  }
	});


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	__webpack_require__(7);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _props = __webpack_require__(12);

	var _players = __webpack_require__(13);

	var _players2 = _interopRequireDefault(_players);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ReactPlayer = function (_Component) {
	  _inherits(ReactPlayer, _Component);

	  function ReactPlayer() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, ReactPlayer);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ReactPlayer)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.seekTo = function (fraction) {
	      var player = _this.refs.player;
	      if (player) {
	        player.seekTo(fraction);
	      }
	    }, _this.progress = function () {
	      if (_this.props.url && _this.refs.player) {
	        var progress = {};
	        var loaded = _this.refs.player.getFractionLoaded();
	        var played = _this.refs.player.getFractionPlayed();
	        if (loaded !== null && loaded !== _this.prevLoaded) {
	          progress.loaded = _this.prevLoaded = loaded;
	        }
	        if (played !== null && played !== _this.prevPlayed && _this.props.playing) {
	          progress.played = _this.prevPlayed = played;
	        }
	        if (progress.loaded || progress.played) {
	          _this.props.onProgress(progress);
	        }
	      }
	      _this.progressTimeout = setTimeout(_this.progress, _this.props.progressFrequency);
	    }, _this.renderPlayer = function (Player) {
	      var active = Player.canPlay(_this.props.url);
	      var _this$props = _this.props;
	      var youtubeConfig = _this$props.youtubeConfig;
	      var soundcloudConfig = _this$props.soundcloudConfig;
	      var vimeoConfig = _this$props.vimeoConfig;

	      var activeProps = _objectWithoutProperties(_this$props, ['youtubeConfig', 'soundcloudConfig', 'vimeoConfig']);

	      var props = active ? _extends({}, activeProps, { ref: 'player' }) : {};
	      return _react2.default.createElement(Player, _extends({
	        key: Player.displayName,
	        youtubeConfig: youtubeConfig,
	        soundcloudConfig: soundcloudConfig,
	        vimeoConfig: vimeoConfig
	      }, props));
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(ReactPlayer, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.progress();
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      clearTimeout(this.progressTimeout);
	    }
	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps) {
	      return this.props.url !== nextProps.url || this.props.playing !== nextProps.playing || this.props.volume !== nextProps.volume;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var style = {
	        width: this.props.width,
	        height: this.props.height
	      };
	      return _react2.default.createElement(
	        'div',
	        { style: style, className: this.props.className },
	        _players2.default.map(this.renderPlayer)
	      );
	    }
	  }], [{
	    key: 'canPlay',
	    value: function canPlay(url) {
	      return _players2.default.some(function (player) {
	        return player.canPlay(url);
	      });
	    }
	  }]);

	  return ReactPlayer;
	}(_react.Component);

	ReactPlayer.displayName = 'ReactPlayer';
	ReactPlayer.propTypes = _props.propTypes;
	ReactPlayer.defaultProps = _props.defaultProps;
	exports.default = ReactPlayer;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var require;var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process, global, module) {/** @jsx React.DOM *//*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   3.2.1
	 */

	(function() {
	    "use strict";
	    function lib$es6$promise$utils$$objectOrFunction(x) {
	      return typeof x === 'function' || (typeof x === 'object' && x !== null);
	    }

	    function lib$es6$promise$utils$$isFunction(x) {
	      return typeof x === 'function';
	    }

	    function lib$es6$promise$utils$$isMaybeThenable(x) {
	      return typeof x === 'object' && x !== null;
	    }

	    var lib$es6$promise$utils$$_isArray;
	    if (!Array.isArray) {
	      lib$es6$promise$utils$$_isArray = function (x) {
	        return Object.prototype.toString.call(x) === '[object Array]';
	      };
	    } else {
	      lib$es6$promise$utils$$_isArray = Array.isArray;
	    }

	    var lib$es6$promise$utils$$isArray = lib$es6$promise$utils$$_isArray;
	    var lib$es6$promise$asap$$len = 0;
	    var lib$es6$promise$asap$$vertxNext;
	    var lib$es6$promise$asap$$customSchedulerFn;

	    var lib$es6$promise$asap$$asap = function asap(callback, arg) {
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len] = callback;
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len + 1] = arg;
	      lib$es6$promise$asap$$len += 2;
	      if (lib$es6$promise$asap$$len === 2) {
	        // If len is 2, that means that we need to schedule an async flush.
	        // If additional callbacks are queued before the queue is flushed, they
	        // will be processed by this flush that we are scheduling.
	        if (lib$es6$promise$asap$$customSchedulerFn) {
	          lib$es6$promise$asap$$customSchedulerFn(lib$es6$promise$asap$$flush);
	        } else {
	          lib$es6$promise$asap$$scheduleFlush();
	        }
	      }
	    }

	    function lib$es6$promise$asap$$setScheduler(scheduleFn) {
	      lib$es6$promise$asap$$customSchedulerFn = scheduleFn;
	    }

	    function lib$es6$promise$asap$$setAsap(asapFn) {
	      lib$es6$promise$asap$$asap = asapFn;
	    }

	    var lib$es6$promise$asap$$browserWindow = (typeof window !== 'undefined') ? window : undefined;
	    var lib$es6$promise$asap$$browserGlobal = lib$es6$promise$asap$$browserWindow || {};
	    var lib$es6$promise$asap$$BrowserMutationObserver = lib$es6$promise$asap$$browserGlobal.MutationObserver || lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver;
	    var lib$es6$promise$asap$$isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

	    // test for web worker but not in IE10
	    var lib$es6$promise$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
	      typeof importScripts !== 'undefined' &&
	      typeof MessageChannel !== 'undefined';

	    // node
	    function lib$es6$promise$asap$$useNextTick() {
	      // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	      // see https://github.com/cujojs/when/issues/410 for details
	      return function() {
	        process.nextTick(lib$es6$promise$asap$$flush);
	      };
	    }

	    // vertx
	    function lib$es6$promise$asap$$useVertxTimer() {
	      return function() {
	        lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush);
	      };
	    }

	    function lib$es6$promise$asap$$useMutationObserver() {
	      var iterations = 0;
	      var observer = new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush);
	      var node = document.createTextNode('');
	      observer.observe(node, { characterData: true });

	      return function() {
	        node.data = (iterations = ++iterations % 2);
	      };
	    }

	    // web worker
	    function lib$es6$promise$asap$$useMessageChannel() {
	      var channel = new MessageChannel();
	      channel.port1.onmessage = lib$es6$promise$asap$$flush;
	      return function () {
	        channel.port2.postMessage(0);
	      };
	    }

	    function lib$es6$promise$asap$$useSetTimeout() {
	      return function() {
	        setTimeout(lib$es6$promise$asap$$flush, 1);
	      };
	    }

	    var lib$es6$promise$asap$$queue = new Array(1000);
	    function lib$es6$promise$asap$$flush() {
	      for (var i = 0; i < lib$es6$promise$asap$$len; i+=2) {
	        var callback = lib$es6$promise$asap$$queue[i];
	        var arg = lib$es6$promise$asap$$queue[i+1];

	        callback(arg);

	        lib$es6$promise$asap$$queue[i] = undefined;
	        lib$es6$promise$asap$$queue[i+1] = undefined;
	      }

	      lib$es6$promise$asap$$len = 0;
	    }

	    function lib$es6$promise$asap$$attemptVertx() {
	      try {
	        var r = require;
	        var vertx = __webpack_require__(10);
	        lib$es6$promise$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
	        return lib$es6$promise$asap$$useVertxTimer();
	      } catch(e) {
	        return lib$es6$promise$asap$$useSetTimeout();
	      }
	    }

	    var lib$es6$promise$asap$$scheduleFlush;
	    // Decide what async method to use to triggering processing of queued callbacks:
	    if (lib$es6$promise$asap$$isNode) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useNextTick();
	    } else if (lib$es6$promise$asap$$BrowserMutationObserver) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMutationObserver();
	    } else if (lib$es6$promise$asap$$isWorker) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMessageChannel();
	    } else if (lib$es6$promise$asap$$browserWindow === undefined && "function" === 'function') {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$attemptVertx();
	    } else {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useSetTimeout();
	    }
	    function lib$es6$promise$then$$then(onFulfillment, onRejection) {
	      var parent = this;

	      var child = new this.constructor(lib$es6$promise$$internal$$noop);

	      if (child[lib$es6$promise$$internal$$PROMISE_ID] === undefined) {
	        lib$es6$promise$$internal$$makePromise(child);
	      }

	      var state = parent._state;

	      if (state) {
	        var callback = arguments[state - 1];
	        lib$es6$promise$asap$$asap(function(){
	          lib$es6$promise$$internal$$invokeCallback(state, child, callback, parent._result);
	        });
	      } else {
	        lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection);
	      }

	      return child;
	    }
	    var lib$es6$promise$then$$default = lib$es6$promise$then$$then;
	    function lib$es6$promise$promise$resolve$$resolve(object) {
	      /*jshint validthis:true */
	      var Constructor = this;

	      if (object && typeof object === 'object' && object.constructor === Constructor) {
	        return object;
	      }

	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$resolve(promise, object);
	      return promise;
	    }
	    var lib$es6$promise$promise$resolve$$default = lib$es6$promise$promise$resolve$$resolve;
	    var lib$es6$promise$$internal$$PROMISE_ID = Math.random().toString(36).substring(16);

	    function lib$es6$promise$$internal$$noop() {}

	    var lib$es6$promise$$internal$$PENDING   = void 0;
	    var lib$es6$promise$$internal$$FULFILLED = 1;
	    var lib$es6$promise$$internal$$REJECTED  = 2;

	    var lib$es6$promise$$internal$$GET_THEN_ERROR = new lib$es6$promise$$internal$$ErrorObject();

	    function lib$es6$promise$$internal$$selfFulfillment() {
	      return new TypeError("You cannot resolve a promise with itself");
	    }

	    function lib$es6$promise$$internal$$cannotReturnOwn() {
	      return new TypeError('A promises callback cannot return that same promise.');
	    }

	    function lib$es6$promise$$internal$$getThen(promise) {
	      try {
	        return promise.then;
	      } catch(error) {
	        lib$es6$promise$$internal$$GET_THEN_ERROR.error = error;
	        return lib$es6$promise$$internal$$GET_THEN_ERROR;
	      }
	    }

	    function lib$es6$promise$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	      try {
	        then.call(value, fulfillmentHandler, rejectionHandler);
	      } catch(e) {
	        return e;
	      }
	    }

	    function lib$es6$promise$$internal$$handleForeignThenable(promise, thenable, then) {
	       lib$es6$promise$asap$$asap(function(promise) {
	        var sealed = false;
	        var error = lib$es6$promise$$internal$$tryThen(then, thenable, function(value) {
	          if (sealed) { return; }
	          sealed = true;
	          if (thenable !== value) {
	            lib$es6$promise$$internal$$resolve(promise, value);
	          } else {
	            lib$es6$promise$$internal$$fulfill(promise, value);
	          }
	        }, function(reason) {
	          if (sealed) { return; }
	          sealed = true;

	          lib$es6$promise$$internal$$reject(promise, reason);
	        }, 'Settle: ' + (promise._label || ' unknown promise'));

	        if (!sealed && error) {
	          sealed = true;
	          lib$es6$promise$$internal$$reject(promise, error);
	        }
	      }, promise);
	    }

	    function lib$es6$promise$$internal$$handleOwnThenable(promise, thenable) {
	      if (thenable._state === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, thenable._result);
	      } else if (thenable._state === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, thenable._result);
	      } else {
	        lib$es6$promise$$internal$$subscribe(thenable, undefined, function(value) {
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      }
	    }

	    function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable, then) {
	      if (maybeThenable.constructor === promise.constructor &&
	          then === lib$es6$promise$then$$default &&
	          constructor.resolve === lib$es6$promise$promise$resolve$$default) {
	        lib$es6$promise$$internal$$handleOwnThenable(promise, maybeThenable);
	      } else {
	        if (then === lib$es6$promise$$internal$$GET_THEN_ERROR) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$GET_THEN_ERROR.error);
	        } else if (then === undefined) {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        } else if (lib$es6$promise$utils$$isFunction(then)) {
	          lib$es6$promise$$internal$$handleForeignThenable(promise, maybeThenable, then);
	        } else {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        }
	      }
	    }

	    function lib$es6$promise$$internal$$resolve(promise, value) {
	      if (promise === value) {
	        lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$selfFulfillment());
	      } else if (lib$es6$promise$utils$$objectOrFunction(value)) {
	        lib$es6$promise$$internal$$handleMaybeThenable(promise, value, lib$es6$promise$$internal$$getThen(value));
	      } else {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      }
	    }

	    function lib$es6$promise$$internal$$publishRejection(promise) {
	      if (promise._onerror) {
	        promise._onerror(promise._result);
	      }

	      lib$es6$promise$$internal$$publish(promise);
	    }

	    function lib$es6$promise$$internal$$fulfill(promise, value) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }

	      promise._result = value;
	      promise._state = lib$es6$promise$$internal$$FULFILLED;

	      if (promise._subscribers.length !== 0) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, promise);
	      }
	    }

	    function lib$es6$promise$$internal$$reject(promise, reason) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }
	      promise._state = lib$es6$promise$$internal$$REJECTED;
	      promise._result = reason;

	      lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publishRejection, promise);
	    }

	    function lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
	      var subscribers = parent._subscribers;
	      var length = subscribers.length;

	      parent._onerror = null;

	      subscribers[length] = child;
	      subscribers[length + lib$es6$promise$$internal$$FULFILLED] = onFulfillment;
	      subscribers[length + lib$es6$promise$$internal$$REJECTED]  = onRejection;

	      if (length === 0 && parent._state) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, parent);
	      }
	    }

	    function lib$es6$promise$$internal$$publish(promise) {
	      var subscribers = promise._subscribers;
	      var settled = promise._state;

	      if (subscribers.length === 0) { return; }

	      var child, callback, detail = promise._result;

	      for (var i = 0; i < subscribers.length; i += 3) {
	        child = subscribers[i];
	        callback = subscribers[i + settled];

	        if (child) {
	          lib$es6$promise$$internal$$invokeCallback(settled, child, callback, detail);
	        } else {
	          callback(detail);
	        }
	      }

	      promise._subscribers.length = 0;
	    }

	    function lib$es6$promise$$internal$$ErrorObject() {
	      this.error = null;
	    }

	    var lib$es6$promise$$internal$$TRY_CATCH_ERROR = new lib$es6$promise$$internal$$ErrorObject();

	    function lib$es6$promise$$internal$$tryCatch(callback, detail) {
	      try {
	        return callback(detail);
	      } catch(e) {
	        lib$es6$promise$$internal$$TRY_CATCH_ERROR.error = e;
	        return lib$es6$promise$$internal$$TRY_CATCH_ERROR;
	      }
	    }

	    function lib$es6$promise$$internal$$invokeCallback(settled, promise, callback, detail) {
	      var hasCallback = lib$es6$promise$utils$$isFunction(callback),
	          value, error, succeeded, failed;

	      if (hasCallback) {
	        value = lib$es6$promise$$internal$$tryCatch(callback, detail);

	        if (value === lib$es6$promise$$internal$$TRY_CATCH_ERROR) {
	          failed = true;
	          error = value.error;
	          value = null;
	        } else {
	          succeeded = true;
	        }

	        if (promise === value) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$cannotReturnOwn());
	          return;
	        }

	      } else {
	        value = detail;
	        succeeded = true;
	      }

	      if (promise._state !== lib$es6$promise$$internal$$PENDING) {
	        // noop
	      } else if (hasCallback && succeeded) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      } else if (failed) {
	        lib$es6$promise$$internal$$reject(promise, error);
	      } else if (settled === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      } else if (settled === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, value);
	      }
	    }

	    function lib$es6$promise$$internal$$initializePromise(promise, resolver) {
	      try {
	        resolver(function resolvePromise(value){
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function rejectPromise(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      } catch(e) {
	        lib$es6$promise$$internal$$reject(promise, e);
	      }
	    }

	    var lib$es6$promise$$internal$$id = 0;
	    function lib$es6$promise$$internal$$nextId() {
	      return lib$es6$promise$$internal$$id++;
	    }

	    function lib$es6$promise$$internal$$makePromise(promise) {
	      promise[lib$es6$promise$$internal$$PROMISE_ID] = lib$es6$promise$$internal$$id++;
	      promise._state = undefined;
	      promise._result = undefined;
	      promise._subscribers = [];
	    }

	    function lib$es6$promise$promise$all$$all(entries) {
	      return new lib$es6$promise$enumerator$$default(this, entries).promise;
	    }
	    var lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all;
	    function lib$es6$promise$promise$race$$race(entries) {
	      /*jshint validthis:true */
	      var Constructor = this;

	      if (!lib$es6$promise$utils$$isArray(entries)) {
	        return new Constructor(function(resolve, reject) {
	          reject(new TypeError('You must pass an array to race.'));
	        });
	      } else {
	        return new Constructor(function(resolve, reject) {
	          var length = entries.length;
	          for (var i = 0; i < length; i++) {
	            Constructor.resolve(entries[i]).then(resolve, reject);
	          }
	        });
	      }
	    }
	    var lib$es6$promise$promise$race$$default = lib$es6$promise$promise$race$$race;
	    function lib$es6$promise$promise$reject$$reject(reason) {
	      /*jshint validthis:true */
	      var Constructor = this;
	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$reject(promise, reason);
	      return promise;
	    }
	    var lib$es6$promise$promise$reject$$default = lib$es6$promise$promise$reject$$reject;


	    function lib$es6$promise$promise$$needsResolver() {
	      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	    }

	    function lib$es6$promise$promise$$needsNew() {
	      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	    }

	    var lib$es6$promise$promise$$default = lib$es6$promise$promise$$Promise;
	    /**
	      Promise objects represent the eventual result of an asynchronous operation. The
	      primary way of interacting with a promise is through its `then` method, which
	      registers callbacks to receive either a promise's eventual value or the reason
	      why the promise cannot be fulfilled.

	      Terminology
	      -----------

	      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	      - `thenable` is an object or function that defines a `then` method.
	      - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	      - `exception` is a value that is thrown using the throw statement.
	      - `reason` is a value that indicates why a promise was rejected.
	      - `settled` the final resting state of a promise, fulfilled or rejected.

	      A promise can be in one of three states: pending, fulfilled, or rejected.

	      Promises that are fulfilled have a fulfillment value and are in the fulfilled
	      state.  Promises that are rejected have a rejection reason and are in the
	      rejected state.  A fulfillment value is never a thenable.

	      Promises can also be said to *resolve* a value.  If this value is also a
	      promise, then the original promise's settled state will match the value's
	      settled state.  So a promise that *resolves* a promise that rejects will
	      itself reject, and a promise that *resolves* a promise that fulfills will
	      itself fulfill.


	      Basic Usage:
	      ------------

	      ```js
	      var promise = new Promise(function(resolve, reject) {
	        // on success
	        resolve(value);

	        // on failure
	        reject(reason);
	      });

	      promise.then(function(value) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```

	      Advanced Usage:
	      ---------------

	      Promises shine when abstracting away asynchronous interactions such as
	      `XMLHttpRequest`s.

	      ```js
	      function getJSON(url) {
	        return new Promise(function(resolve, reject){
	          var xhr = new XMLHttpRequest();

	          xhr.open('GET', url);
	          xhr.onreadystatechange = handler;
	          xhr.responseType = 'json';
	          xhr.setRequestHeader('Accept', 'application/json');
	          xhr.send();

	          function handler() {
	            if (this.readyState === this.DONE) {
	              if (this.status === 200) {
	                resolve(this.response);
	              } else {
	                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	              }
	            }
	          };
	        });
	      }

	      getJSON('/posts.json').then(function(json) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```

	      Unlike callbacks, promises are great composable primitives.

	      ```js
	      Promise.all([
	        getJSON('/posts'),
	        getJSON('/comments')
	      ]).then(function(values){
	        values[0] // => postsJSON
	        values[1] // => commentsJSON

	        return values;
	      });
	      ```

	      @class Promise
	      @param {function} resolver
	      Useful for tooling.
	      @constructor
	    */
	    function lib$es6$promise$promise$$Promise(resolver) {
	      this[lib$es6$promise$$internal$$PROMISE_ID] = lib$es6$promise$$internal$$nextId();
	      this._result = this._state = undefined;
	      this._subscribers = [];

	      if (lib$es6$promise$$internal$$noop !== resolver) {
	        typeof resolver !== 'function' && lib$es6$promise$promise$$needsResolver();
	        this instanceof lib$es6$promise$promise$$Promise ? lib$es6$promise$$internal$$initializePromise(this, resolver) : lib$es6$promise$promise$$needsNew();
	      }
	    }

	    lib$es6$promise$promise$$Promise.all = lib$es6$promise$promise$all$$default;
	    lib$es6$promise$promise$$Promise.race = lib$es6$promise$promise$race$$default;
	    lib$es6$promise$promise$$Promise.resolve = lib$es6$promise$promise$resolve$$default;
	    lib$es6$promise$promise$$Promise.reject = lib$es6$promise$promise$reject$$default;
	    lib$es6$promise$promise$$Promise._setScheduler = lib$es6$promise$asap$$setScheduler;
	    lib$es6$promise$promise$$Promise._setAsap = lib$es6$promise$asap$$setAsap;
	    lib$es6$promise$promise$$Promise._asap = lib$es6$promise$asap$$asap;

	    lib$es6$promise$promise$$Promise.prototype = {
	      constructor: lib$es6$promise$promise$$Promise,

	    /**
	      The primary way of interacting with a promise is through its `then` method,
	      which registers callbacks to receive either a promise's eventual value or the
	      reason why the promise cannot be fulfilled.

	      ```js
	      findUser().then(function(user){
	        // user is available
	      }, function(reason){
	        // user is unavailable, and you are given the reason why
	      });
	      ```

	      Chaining
	      --------

	      The return value of `then` is itself a promise.  This second, 'downstream'
	      promise is resolved with the return value of the first promise's fulfillment
	      or rejection handler, or rejected if the handler throws an exception.

	      ```js
	      findUser().then(function (user) {
	        return user.name;
	      }, function (reason) {
	        return 'default name';
	      }).then(function (userName) {
	        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	        // will be `'default name'`
	      });

	      findUser().then(function (user) {
	        throw new Error('Found user, but still unhappy');
	      }, function (reason) {
	        throw new Error('`findUser` rejected and we're unhappy');
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	      });
	      ```
	      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.

	      ```js
	      findUser().then(function (user) {
	        throw new PedagogicalException('Upstream error');
	      }).then(function (value) {
	        // never reached
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // The `PedgagocialException` is propagated all the way down to here
	      });
	      ```

	      Assimilation
	      ------------

	      Sometimes the value you want to propagate to a downstream promise can only be
	      retrieved asynchronously. This can be achieved by returning a promise in the
	      fulfillment or rejection handler. The downstream promise will then be pending
	      until the returned promise is settled. This is called *assimilation*.

	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // The user's comments are now available
	      });
	      ```

	      If the assimliated promise rejects, then the downstream promise will also reject.

	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // If `findCommentsByAuthor` fulfills, we'll have the value here
	      }, function (reason) {
	        // If `findCommentsByAuthor` rejects, we'll have the reason here
	      });
	      ```

	      Simple Example
	      --------------

	      Synchronous Example

	      ```javascript
	      var result;

	      try {
	        result = findResult();
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```

	      Errback Example

	      ```js
	      findResult(function(result, err){
	        if (err) {
	          // failure
	        } else {
	          // success
	        }
	      });
	      ```

	      Promise Example;

	      ```javascript
	      findResult().then(function(result){
	        // success
	      }, function(reason){
	        // failure
	      });
	      ```

	      Advanced Example
	      --------------

	      Synchronous Example

	      ```javascript
	      var author, books;

	      try {
	        author = findAuthor();
	        books  = findBooksByAuthor(author);
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```

	      Errback Example

	      ```js

	      function foundBooks(books) {

	      }

	      function failure(reason) {

	      }

	      findAuthor(function(author, err){
	        if (err) {
	          failure(err);
	          // failure
	        } else {
	          try {
	            findBoooksByAuthor(author, function(books, err) {
	              if (err) {
	                failure(err);
	              } else {
	                try {
	                  foundBooks(books);
	                } catch(reason) {
	                  failure(reason);
	                }
	              }
	            });
	          } catch(error) {
	            failure(err);
	          }
	          // success
	        }
	      });
	      ```

	      Promise Example;

	      ```javascript
	      findAuthor().
	        then(findBooksByAuthor).
	        then(function(books){
	          // found books
	      }).catch(function(reason){
	        // something went wrong
	      });
	      ```

	      @method then
	      @param {Function} onFulfilled
	      @param {Function} onRejected
	      Useful for tooling.
	      @return {Promise}
	    */
	      then: lib$es6$promise$then$$default,

	    /**
	      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	      as the catch block of a try/catch statement.

	      ```js
	      function findAuthor(){
	        throw new Error('couldn't find that author');
	      }

	      // synchronous
	      try {
	        findAuthor();
	      } catch(reason) {
	        // something went wrong
	      }

	      // async with promises
	      findAuthor().catch(function(reason){
	        // something went wrong
	      });
	      ```

	      @method catch
	      @param {Function} onRejection
	      Useful for tooling.
	      @return {Promise}
	    */
	      'catch': function(onRejection) {
	        return this.then(null, onRejection);
	      }
	    };
	    var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator;
	    function lib$es6$promise$enumerator$$Enumerator(Constructor, input) {
	      this._instanceConstructor = Constructor;
	      this.promise = new Constructor(lib$es6$promise$$internal$$noop);

	      if (!this.promise[lib$es6$promise$$internal$$PROMISE_ID]) {
	        lib$es6$promise$$internal$$makePromise(this.promise);
	      }

	      if (lib$es6$promise$utils$$isArray(input)) {
	        this._input     = input;
	        this.length     = input.length;
	        this._remaining = input.length;

	        this._result = new Array(this.length);

	        if (this.length === 0) {
	          lib$es6$promise$$internal$$fulfill(this.promise, this._result);
	        } else {
	          this.length = this.length || 0;
	          this._enumerate();
	          if (this._remaining === 0) {
	            lib$es6$promise$$internal$$fulfill(this.promise, this._result);
	          }
	        }
	      } else {
	        lib$es6$promise$$internal$$reject(this.promise, lib$es6$promise$enumerator$$validationError());
	      }
	    }

	    function lib$es6$promise$enumerator$$validationError() {
	      return new Error('Array Methods must be provided an Array');
	    }

	    lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function() {
	      var length  = this.length;
	      var input   = this._input;

	      for (var i = 0; this._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	        this._eachEntry(input[i], i);
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
	      var c = this._instanceConstructor;
	      var resolve = c.resolve;

	      if (resolve === lib$es6$promise$promise$resolve$$default) {
	        var then = lib$es6$promise$$internal$$getThen(entry);

	        if (then === lib$es6$promise$then$$default &&
	            entry._state !== lib$es6$promise$$internal$$PENDING) {
	          this._settledAt(entry._state, i, entry._result);
	        } else if (typeof then !== 'function') {
	          this._remaining--;
	          this._result[i] = entry;
	        } else if (c === lib$es6$promise$promise$$default) {
	          var promise = new c(lib$es6$promise$$internal$$noop);
	          lib$es6$promise$$internal$$handleMaybeThenable(promise, entry, then);
	          this._willSettleAt(promise, i);
	        } else {
	          this._willSettleAt(new c(function(resolve) { resolve(entry); }), i);
	        }
	      } else {
	        this._willSettleAt(resolve(entry), i);
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
	      var promise = this.promise;

	      if (promise._state === lib$es6$promise$$internal$$PENDING) {
	        this._remaining--;

	        if (state === lib$es6$promise$$internal$$REJECTED) {
	          lib$es6$promise$$internal$$reject(promise, value);
	        } else {
	          this._result[i] = value;
	        }
	      }

	      if (this._remaining === 0) {
	        lib$es6$promise$$internal$$fulfill(promise, this._result);
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
	      var enumerator = this;

	      lib$es6$promise$$internal$$subscribe(promise, undefined, function(value) {
	        enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED, i, value);
	      }, function(reason) {
	        enumerator._settledAt(lib$es6$promise$$internal$$REJECTED, i, reason);
	      });
	    };
	    function lib$es6$promise$polyfill$$polyfill() {
	      var local;

	      if (typeof global !== 'undefined') {
	          local = global;
	      } else if (typeof self !== 'undefined') {
	          local = self;
	      } else {
	          try {
	              local = Function('return this')();
	          } catch (e) {
	              throw new Error('polyfill failed because global object is unavailable in this environment');
	          }
	      }

	      var P = local.Promise;

	      if (P && Object.prototype.toString.call(P.resolve()) === '[object Promise]' && !P.cast) {
	        return;
	      }

	      local.Promise = lib$es6$promise$promise$$default;
	    }
	    var lib$es6$promise$polyfill$$default = lib$es6$promise$polyfill$$polyfill;

	    var lib$es6$promise$umd$$ES6Promise = {
	      'Promise': lib$es6$promise$promise$$default,
	      'polyfill': lib$es6$promise$polyfill$$default
	    };

	    /* global define:true module:true window: true */
	    if ("function" === 'function' && __webpack_require__(11)['amd']) {
	      !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return lib$es6$promise$umd$$ES6Promise; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module['exports']) {
	      module['exports'] = lib$es6$promise$umd$$ES6Promise;
	    } else if (typeof this !== 'undefined') {
	      this['ES6Promise'] = lib$es6$promise$umd$$ES6Promise;
	    }

	    lib$es6$promise$polyfill$$default();
	}).call(this);


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8), (function() { return this; }()), __webpack_require__(9)(module)))

/***/ },
/* 8 */
/***/ function(module, exports) {

	/** @jsx React.DOM */// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 9 */
/***/ function(module, exports) {

	/** @jsx React.DOM */module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 10 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.defaultProps = exports.propTypes = undefined;

	var _react = __webpack_require__(1);

	var propTypes = exports.propTypes = {
	  url: _react.PropTypes.string,
	  playing: _react.PropTypes.bool,
	  loop: _react.PropTypes.bool,
	  controls: _react.PropTypes.bool,
	  volume: _react.PropTypes.number,
	  width: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
	  height: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
	  className: _react.PropTypes.string,
	  progressFrequency: _react.PropTypes.number,
	  soundcloudConfig: _react.PropTypes.shape({
	    clientId: _react.PropTypes.string
	  }),
	  youtubeConfig: _react.PropTypes.shape({
	    playerVars: _react.PropTypes.object,
	    preload: _react.PropTypes.bool
	  }),
	  vimeoConfig: _react.PropTypes.shape({
	    iframeParams: _react.PropTypes.object,
	    preload: _react.PropTypes.bool
	  }),
	  fileConfig: _react.PropTypes.shape({
	    attributes: _react.PropTypes.object
	  }),
	  onStart: _react.PropTypes.func,
	  onPlay: _react.PropTypes.func,
	  onPause: _react.PropTypes.func,
	  onBuffer: _react.PropTypes.func,
	  onEnded: _react.PropTypes.func,
	  onError: _react.PropTypes.func,
	  onDuration: _react.PropTypes.func,
	  onProgress: _react.PropTypes.func
	};

	var defaultProps = exports.defaultProps = {
	  playing: false,
	  loop: false,
	  controls: false,
	  volume: 0.8,
	  width: 640,
	  height: 360,
	  progressFrequency: 1000,
	  soundcloudConfig: {
	    clientId: 'e8b6f84fbcad14c301ca1355cae1dea2'
	  },
	  youtubeConfig: {
	    playerVars: {},
	    preload: false
	  },
	  vimeoConfig: {
	    iframeParams: {},
	    preload: false
	  },
	  fileConfig: {
	    attributes: {}
	  },
	  onStart: function onStart() {},
	  onPlay: function onPlay() {},
	  onPause: function onPause() {},
	  onBuffer: function onBuffer() {},
	  onEnded: function onEnded() {},
	  onError: function onError() {},
	  onDuration: function onDuration() {},
	  onProgress: function onProgress() {}
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _YouTube = __webpack_require__(14);

	var _YouTube2 = _interopRequireDefault(_YouTube);

	var _SoundCloud = __webpack_require__(18);

	var _SoundCloud2 = _interopRequireDefault(_SoundCloud);

	var _Vimeo = __webpack_require__(21);

	var _Vimeo2 = _interopRequireDefault(_Vimeo);

	var _FilePlayer = __webpack_require__(20);

	var _FilePlayer2 = _interopRequireDefault(_FilePlayer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = [_YouTube2.default, _SoundCloud2.default, _Vimeo2.default, _FilePlayer2.default];
	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _loadScript = __webpack_require__(15);

	var _loadScript2 = _interopRequireDefault(_loadScript);

	var _Base2 = __webpack_require__(16);

	var _Base3 = _interopRequireDefault(_Base2);

	var _utils = __webpack_require__(17);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SDK_URL = 'https://www.youtube.com/iframe_api';
	var SDK_GLOBAL = 'YT';
	var SDK_GLOBAL_READY = 'onYouTubeIframeAPIReady';
	var MATCH_URL = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
	var PLAYER_ID = 'youtube-player';
	var BLANK_VIDEO_URL = 'https://www.youtube.com/watch?v=GlCmAC4MHek';
	var DEFAULT_PLAYER_VARS = {
	  autoplay: 0,
	  playsinline: 1,
	  showinfo: 0,
	  rel: 0,
	  iv_load_policy: 3
	};

	var playerIdCount = 0;

	var YouTube = function (_Base) {
	  _inherits(YouTube, _Base);

	  function YouTube() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, YouTube);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(YouTube)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.playerId = PLAYER_ID + '-' + playerIdCount++, _this.onStateChange = function (_ref) {
	      var data = _ref.data;
	      var _window$SDK_GLOBAL$Pl = window[SDK_GLOBAL].PlayerState;
	      var PLAYING = _window$SDK_GLOBAL$Pl.PLAYING;
	      var PAUSED = _window$SDK_GLOBAL$Pl.PAUSED;
	      var BUFFERING = _window$SDK_GLOBAL$Pl.BUFFERING;
	      var ENDED = _window$SDK_GLOBAL$Pl.ENDED;
	      var CUED = _window$SDK_GLOBAL$Pl.CUED;

	      if (data === PLAYING) _this.onPlay();
	      if (data === PAUSED) _this.props.onPause();
	      if (data === BUFFERING) _this.props.onBuffer();
	      if (data === ENDED) _this.onEnded();
	      if (data === CUED) _this.onReady();
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(YouTube, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      if (!this.props.url && this.props.youtubeConfig.preload) {
	        this.preloading = true;
	        this.load(BLANK_VIDEO_URL);
	      }
	      _get(Object.getPrototypeOf(YouTube.prototype), 'componentDidMount', this).call(this);
	    }
	  }, {
	    key: 'getSDK',
	    value: function getSDK() {
	      if (window[SDK_GLOBAL]) {
	        return Promise.resolve(window[SDK_GLOBAL]);
	      }
	      return new Promise(function (resolve, reject) {
	        var previousOnReady = window[SDK_GLOBAL_READY];
	        window[SDK_GLOBAL_READY] = function () {
	          if (previousOnReady) previousOnReady();
	          resolve(window[SDK_GLOBAL]);
	        };
	        (0, _loadScript2.default)(SDK_URL, function (err) {
	          if (err) reject(err);
	        });
	      });
	    }
	  }, {
	    key: 'load',
	    value: function load(url) {
	      var _this2 = this;

	      var id = url && url.match(MATCH_URL)[1];
	      if (this.isReady) {
	        this.player.cueVideoById({
	          videoId: id,
	          startSeconds: (0, _utils.parseStartTime)(url)
	        });
	        return;
	      }
	      if (this.loadingSDK) {
	        this.loadOnReady = url;
	        return;
	      }
	      this.loadingSDK = true;
	      this.getSDK().then(function (YT) {
	        _this2.player = new YT.Player(_this2.playerId, {
	          width: '100%',
	          height: '100%',
	          videoId: id,
	          playerVars: _extends({}, DEFAULT_PLAYER_VARS, {
	            controls: _this2.props.controls ? 1 : 0
	          }, _this2.props.youtubeConfig.playerVars, {
	            start: (0, _utils.parseStartTime)(url),
	            origin: window.location.origin
	          }),
	          events: {
	            onReady: function onReady() {
	              _this2.loadingSDK = false;
	              _this2.onReady();
	            },
	            onStateChange: _this2.onStateChange,
	            onError: function onError(event) {
	              return _this2.props.onError(event.data);
	            }
	          }
	        });
	      }, this.props.onError);
	    }
	  }, {
	    key: 'play',
	    value: function play() {
	      if (!this.isReady || !this.player.playVideo) return;
	      this.player.playVideo();
	    }
	  }, {
	    key: 'pause',
	    value: function pause() {
	      if (!this.isReady || !this.player.pauseVideo) return;
	      this.player.pauseVideo();
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      if (!this.isReady || !this.player.stopVideo) return;
	      this.player.stopVideo();
	    }
	  }, {
	    key: 'seekTo',
	    value: function seekTo(fraction) {
	      _get(Object.getPrototypeOf(YouTube.prototype), 'seekTo', this).call(this, fraction);
	      if (!this.isReady || !this.player.seekTo) return;
	      this.player.seekTo(this.getDuration() * fraction);
	    }
	  }, {
	    key: 'setVolume',
	    value: function setVolume(fraction) {
	      if (!this.isReady || !this.player.setVolume) return;
	      this.player.setVolume(fraction * 100);
	    }
	  }, {
	    key: 'getDuration',
	    value: function getDuration() {
	      if (!this.isReady || !this.player.getDuration) return null;
	      return this.player.getDuration();
	    }
	  }, {
	    key: 'getFractionPlayed',
	    value: function getFractionPlayed() {
	      if (!this.isReady || !this.getDuration()) return null;
	      return this.player.getCurrentTime() / this.getDuration();
	    }
	  }, {
	    key: 'getFractionLoaded',
	    value: function getFractionLoaded() {
	      if (!this.isReady || !this.player.getVideoLoadedFraction) return null;
	      return this.player.getVideoLoadedFraction();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var style = {
	        height: '100%',
	        display: this.props.url ? 'block' : 'none'
	      };
	      return _react2.default.createElement(
	        'div',
	        { style: style },
	        _react2.default.createElement('div', { id: this.playerId })
	      );
	    }
	  }], [{
	    key: 'canPlay',
	    value: function canPlay(url) {
	      return MATCH_URL.test(url);
	    }
	  }]);

	  return YouTube;
	}(_Base3.default);

	YouTube.displayName = 'YouTube';
	exports.default = YouTube;
	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports) {

	/** @jsx React.DOM */
	module.exports = function load (src, opts, cb) {
	  var head = document.head || document.getElementsByTagName('head')[0]
	  var script = document.createElement('script')

	  if (typeof opts === 'function') {
	    cb = opts
	    opts = {}
	  }

	  opts = opts || {}
	  cb = cb || function() {}

	  script.type = opts.type || 'text/javascript'
	  script.charset = opts.charset || 'utf8';
	  script.async = 'async' in opts ? !!opts.async : true
	  script.src = src

	  if (opts.attrs) {
	    setAttributes(script, opts.attrs)
	  }

	  if (opts.text) {
	    script.text = '' + opts.text
	  }

	  var onend = 'onload' in script ? stdOnEnd : ieOnEnd
	  onend(script, cb)

	  // some good legacy browsers (firefox) fail the 'in' detection above
	  // so as a fallback we always set onload
	  // old IE will ignore this and new IE will set onload
	  if (!script.onload) {
	    stdOnEnd(script, cb);
	  }

	  head.appendChild(script)
	}

	function setAttributes(script, attrs) {
	  for (var attr in attrs) {
	    script.setAttribute(attr, attrs[attr]);
	  }
	}

	function stdOnEnd (script, cb) {
	  script.onload = function () {
	    this.onerror = this.onload = null
	    cb(null, script)
	  }
	  script.onerror = function () {
	    // this.onload = null here is necessary
	    // because even IE9 works not like others
	    this.onerror = this.onload = null
	    cb(new Error('Failed to load ' + this.src), script)
	  }
	}

	function ieOnEnd (script, cb) {
	  script.onreadystatechange = function () {
	    if (this.readyState != 'complete' && this.readyState != 'loaded') return
	    this.onreadystatechange = null
	    cb(null, script) // there is no way to catch loading errors in IE8
	  }
	}


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _props = __webpack_require__(12);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SEEK_ON_READY_EXPIRY = 5000;

	var Base = function (_Component) {
	  _inherits(Base, _Component);

	  function Base() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Base);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Base)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.isReady = false, _this.startOnPlay = true, _this.onPlay = function () {
	      if (_this.startOnPlay) {
	        _this.props.onStart();
	        _this.startOnPlay = false;
	      }
	      _this.props.onPlay();
	      _this.setVolume(_this.props.volume);
	      if (_this.seekOnReady) {
	        _this.seekTo(_this.seekOnReady);
	        _this.seekOnReady = null;
	      }
	      _this.props.onDuration(_this.getDuration());
	    }, _this.onReady = function () {
	      _this.isReady = true;
	      if (_this.props.playing || _this.preloading) {
	        _this.preloading = false;
	        if (_this.loadOnReady) {
	          _this.load(_this.loadOnReady);
	          _this.loadOnReady = null;
	        } else {
	          _this.play();
	        }
	      }
	    }, _this.onEnded = function () {
	      if (_this.props.loop) {
	        _this.seekTo(0);
	      }
	      _this.props.onEnded();
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Base, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      if (this.props.url) {
	        this.load(this.props.url);
	      }
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.stop();
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps(nextProps) {
	      // Invoke player methods based on incoming props
	      if (this.props.url !== nextProps.url && nextProps.url) {
	        this.seekOnReady = null;
	        this.startOnPlay = true;
	        this.load(nextProps.url);
	      } else if (this.props.url && !nextProps.url) {
	        this.stop();
	        clearTimeout(this.updateTimeout);
	      } else if (!this.props.playing && nextProps.playing) {
	        this.play();
	      } else if (this.props.playing && !nextProps.playing) {
	        this.pause();
	      } else if (this.props.volume !== nextProps.volume) {
	        this.setVolume(nextProps.volume);
	      }
	    }
	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps) {
	      return this.props.url !== nextProps.url;
	    }
	  }, {
	    key: 'seekTo',
	    value: function seekTo(fraction) {
	      var _this2 = this;

	      // When seeking before player is ready, store value and seek later
	      if (!this.isReady && fraction !== 0) {
	        this.seekOnReady = fraction;
	        setTimeout(function () {
	          _this2.seekOnReady = null;
	        }, SEEK_ON_READY_EXPIRY);
	      }
	    }
	  }]);

	  return Base;
	}(_react.Component);

	Base.propTypes = _props.propTypes;
	Base.defaultProps = _props.defaultProps;
	exports.default = Base;
	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports) {

	/** @jsx React.DOM */'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	exports.parseStartTime = parseStartTime;
	var MATCH_START_QUERY = /[\?&#](?:start|t)=([0-9hms]+)/;
	var MATCH_START_STAMP = /(\d+)(h|m|s)/g;
	var MATCH_NUMERIC = /^\d+$/;

	// Parse YouTube URL for a start time param, ie ?t=1h14m30s
	// and return the start time in seconds
	function parseStartTime(url) {
	  var match = url.match(MATCH_START_QUERY);
	  if (match) {
	    var stamp = match[1];
	    if (stamp.match(MATCH_START_STAMP)) {
	      return parseStartStamp(stamp);
	    }
	    if (MATCH_NUMERIC.test(stamp)) {
	      return parseInt(stamp, 10);
	    }
	  }
	  return 0;
	}

	function parseStartStamp(stamp) {
	  var seconds = 0;
	  var array = MATCH_START_STAMP.exec(stamp);
	  while (array !== null) {
	    var _array = array;

	    var _array2 = _slicedToArray(_array, 3);

	    var count = _array2[1];
	    var period = _array2[2];

	    if (period === 'h') seconds += parseInt(count, 10) * 60 * 60;
	    if (period === 'm') seconds += parseInt(count, 10) * 60;
	    if (period === 's') seconds += parseInt(count, 10);
	    array = MATCH_START_STAMP.exec(stamp);
	  }
	  return seconds;
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _fetchJsonp = __webpack_require__(19);

	var _fetchJsonp2 = _interopRequireDefault(_fetchJsonp);

	var _FilePlayer2 = __webpack_require__(20);

	var _FilePlayer3 = _interopRequireDefault(_FilePlayer2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var RESOLVE_URL = '//api.soundcloud.com/resolve.json';
	var MATCH_URL = /^https?:\/\/(soundcloud.com|snd.sc)\/([a-z0-9-_]+\/[a-z0-9-_]+)$/;

	var songData = {}; // Cache song data requests

	var SoundCloud = function (_FilePlayer) {
	  _inherits(SoundCloud, _FilePlayer);

	  function SoundCloud() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, SoundCloud);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(SoundCloud)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
	      image: null
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(SoundCloud, [{
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(nextProps, nextState) {
	      return _get(Object.getPrototypeOf(SoundCloud.prototype), 'shouldComponentUpdate', this).call(this, nextProps, nextState) || this.state.image !== nextState.image;
	    }
	  }, {
	    key: 'getSongData',
	    value: function getSongData(url) {
	      var _this2 = this;

	      if (songData[url]) {
	        return Promise.resolve(songData[url]);
	      }
	      return (0, _fetchJsonp2.default)(RESOLVE_URL + '?url=' + url + '&client_id=' + this.props.soundcloudConfig.clientId).then(function (response) {
	        if (response.ok) {
	          songData[url] = response.json();
	          return songData[url];
	        } else {
	          _this2.props.onError(new Error('SoundCloud track could not be resolved'));
	        }
	      });
	    }
	  }, {
	    key: 'load',
	    value: function load(url) {
	      var _this3 = this;

	      this.stop();
	      this.getSongData(url).then(function (data) {
	        if (url !== _this3.props.url) {
	          return; // Abort if url changes during async requests
	        }
	        if (!data.streamable) {
	          _this3.props.onError(new Error('SoundCloud track is not streamable'));
	          return;
	        }
	        var image = data.artwork_url || data.user.avatar_url;
	        if (image) {
	          _this3.setState({ image: image.replace('-large', '-t500x500') });
	        }
	        _this3.player.src = data.stream_url + '?client_id=' + _this3.props.soundcloudConfig.clientId;
	      }, this.props.onError);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var url = _props.url;
	      var controls = _props.controls;

	      var style = {
	        display: url ? 'block' : 'none',
	        height: '100%',
	        backgroundImage: this.state.image ? 'url(' + this.state.image + ')' : null,
	        backgroundSize: 'cover',
	        backgroundPosition: 'center'
	      };
	      return _react2.default.createElement(
	        'div',
	        { style: style },
	        _react2.default.createElement('audio', {
	          ref: 'player',
	          type: 'audio/mpeg',
	          preload: 'auto',
	          style: { width: '100%', height: '100%' },
	          controls: controls
	        })
	      );
	    }
	  }], [{
	    key: 'canPlay',
	    value: function canPlay(url) {
	      return MATCH_URL.test(url);
	    }
	  }]);

	  return SoundCloud;
	}(_FilePlayer3.default);

	SoundCloud.displayName = 'SoundCloud';
	exports.default = SoundCloud;
	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/** @jsx React.DOM */(function (global, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, module], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
	    factory(exports, module);
	  } else {
	    var mod = {
	      exports: {}
	    };
	    factory(mod.exports, mod);
	    global.fetchJsonp = mod.exports;
	  }
	})(this, function (exports, module) {
	  'use strict';

	  var defaultOptions = {
	    timeout: 5000,
	    jsonpCallback: 'callback',
	    jsonpCallbackFunction: null
	  };

	  function generateCallbackFunction() {
	    return 'jsonp_' + Date.now() + '_' + Math.ceil(Math.random() * 100000);
	  }

	  // Known issue: Will throw 'Uncaught ReferenceError: callback_*** is not defined' error if request timeout
	  function clearFunction(functionName) {
	    // IE8 throws an exception when you try to delete a property on window
	    // http://stackoverflow.com/a/1824228/751089
	    try {
	      delete window[functionName];
	    } catch (e) {
	      window[functionName] = undefined;
	    }
	  }

	  function removeScript(scriptId) {
	    var script = document.getElementById(scriptId);
	    document.getElementsByTagName('head')[0].removeChild(script);
	  }

	  var fetchJsonp = function fetchJsonp(url) {
	    var options = arguments[1] === undefined ? {} : arguments[1];

	    var timeout = options.timeout != null ? options.timeout : defaultOptions.timeout;
	    var jsonpCallback = options.jsonpCallback != null ? options.jsonpCallback : defaultOptions.jsonpCallback;

	    var timeoutId = undefined;

	    return new Promise(function (resolve, reject) {
	      var callbackFunction = options.jsonpCallbackFunction || generateCallbackFunction();

	      window[callbackFunction] = function (response) {
	        resolve({
	          ok: true,
	          // keep consistent with fetch API
	          json: function json() {
	            return Promise.resolve(response);
	          }
	        });

	        if (timeoutId) clearTimeout(timeoutId);

	        removeScript(jsonpCallback + '_' + callbackFunction);

	        clearFunction(callbackFunction);
	      };

	      // Check if the user set their own params, and if not add a ? to start a list of params
	      url += url.indexOf('?') === -1 ? '?' : '&';

	      var jsonpScript = document.createElement('script');
	      jsonpScript.setAttribute('src', url + jsonpCallback + '=' + callbackFunction);
	      jsonpScript.id = jsonpCallback + '_' + callbackFunction;
	      document.getElementsByTagName('head')[0].appendChild(jsonpScript);

	      timeoutId = setTimeout(function () {
	        reject(new Error('JSONP request to ' + url + ' timed out'));

	        clearFunction(callbackFunction);
	        removeScript(jsonpCallback + '_' + callbackFunction);
	      }, timeout);
	    });
	  };

	  // export as global function
	  /*
	  let local;
	  if (typeof global !== 'undefined') {
	    local = global;
	  } else if (typeof self !== 'undefined') {
	    local = self;
	  } else {
	    try {
	      local = Function('return this')();
	    } catch (e) {
	      throw new Error('polyfill failed because global object is unavailable in this environment');
	    }
	  }
	  
	  local.fetchJsonp = fetchJsonp;
	  */

	  module.exports = fetchJsonp;
	});

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Base2 = __webpack_require__(16);

	var _Base3 = _interopRequireDefault(_Base2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var VIDEO_EXTENSIONS = /\.(mp4|og[gv]|webm)($|\?)/;
	var AUDIO_EXTENSIONS = /\.(mp3|wav)($|\?)/;

	var FilePlayer = function (_Base) {
	  _inherits(FilePlayer, _Base);

	  function FilePlayer() {
	    _classCallCheck(this, FilePlayer);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(FilePlayer).apply(this, arguments));
	  }

	  _createClass(FilePlayer, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

	      this.player = this.refs.player;
	      this.player.oncanplay = this.onReady;
	      this.player.onplay = this.onPlay;
	      this.player.onpause = function () {
	        return _this2.props.onPause();
	      };
	      this.player.onended = function () {
	        return _this2.onEnded();
	      };
	      this.player.onerror = function (e) {
	        return _this2.props.onError(e);
	      };
	      this.player.setAttribute('webkit-playsinline', '');
	      _get(Object.getPrototypeOf(FilePlayer.prototype), 'componentDidMount', this).call(this);
	    }
	  }, {
	    key: 'load',
	    value: function load(url) {
	      this.player.src = url;
	    }
	  }, {
	    key: 'play',
	    value: function play() {
	      this.player.play();
	    }
	  }, {
	    key: 'pause',
	    value: function pause() {
	      this.player.pause();
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      this.player.removeAttribute('src');
	    }
	  }, {
	    key: 'seekTo',
	    value: function seekTo(fraction) {
	      _get(Object.getPrototypeOf(FilePlayer.prototype), 'seekTo', this).call(this, fraction);
	      this.player.currentTime = this.getDuration() * fraction;
	    }
	  }, {
	    key: 'setVolume',
	    value: function setVolume(fraction) {
	      this.player.volume = fraction;
	    }
	  }, {
	    key: 'getDuration',
	    value: function getDuration() {
	      if (!this.isReady) return null;
	      return this.player.duration;
	    }
	  }, {
	    key: 'getFractionPlayed',
	    value: function getFractionPlayed() {
	      if (!this.isReady) return null;
	      return this.player.currentTime / this.getDuration();
	    }
	  }, {
	    key: 'getFractionLoaded',
	    value: function getFractionLoaded() {
	      if (!this.isReady || this.player.buffered.length === 0) return null;
	      return this.player.buffered.end(0) / this.getDuration();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _props = this.props;
	      var controls = _props.controls;
	      var fileConfig = _props.fileConfig;

	      var Media = AUDIO_EXTENSIONS.test(this.props.url) ? 'audio' : 'video';
	      var style = {
	        width: '100%',
	        height: '100%',
	        display: this.props.url ? 'block' : 'none'
	      };
	      return _react2.default.createElement(Media, _extends({
	        ref: 'player',
	        style: style,
	        preload: 'auto',
	        controls: controls
	      }, fileConfig.attributes));
	    }
	  }], [{
	    key: 'canPlay',
	    value: function canPlay(url) {
	      return VIDEO_EXTENSIONS.test(url) || AUDIO_EXTENSIONS.test(url);
	    }
	  }]);

	  return FilePlayer;
	}(_Base3.default);

	FilePlayer.displayName = 'FilePlayer';
	exports.default = FilePlayer;
	module.exports = exports['default'];

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _queryString = __webpack_require__(22);

	var _Base2 = __webpack_require__(16);

	var _Base3 = _interopRequireDefault(_Base2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var IFRAME_SRC = 'https://player.vimeo.com/video/';
	var MATCH_URL = /https?:\/\/(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/([^\/]*)\/videos\/|album\/(\d+)\/video\/|video\/|)(\d+)(?:$|\/|\?)/;
	var MATCH_MESSAGE_ORIGIN = /^https?:\/\/player.vimeo.com/;
	var BLANK_VIDEO_URL = 'https://vimeo.com/127250231';
	var DEFAULT_IFRAME_PARAMS = {
	  api: 1,
	  autoplay: 0,
	  badge: 0,
	  byline: 0,
	  fullscreen: 1,
	  portrait: 0,
	  title: 0
	};

	var Vimeo = function (_Base) {
	  _inherits(Vimeo, _Base);

	  function Vimeo() {
	    var _Object$getPrototypeO;

	    var _temp, _this, _ret;

	    _classCallCheck(this, Vimeo);

	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Vimeo)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.onMessage = function (e) {
	      if (!MATCH_MESSAGE_ORIGIN.test(e.origin)) return;
	      _this.origin = _this.origin || e.origin;
	      var data = JSON.parse(e.data);
	      if (data.event === 'ready') {
	        _this.postMessage('getDuration');
	        _this.postMessage('addEventListener', 'playProgress');
	        _this.postMessage('addEventListener', 'loadProgress');
	        _this.postMessage('addEventListener', 'play');
	        _this.postMessage('addEventListener', 'pause');
	        _this.postMessage('addEventListener', 'finish');
	      }
	      if (data.event === 'playProgress') _this.fractionPlayed = data.data.percent;
	      if (data.event === 'loadProgress') _this.fractionLoaded = data.data.percent;
	      if (data.event === 'play') _this.onPlay();
	      if (data.event === 'pause') _this.props.onPause();
	      if (data.event === 'finish') _this.onEnded();
	      if (data.method === 'getDuration') {
	        _this.duration = data.value; // Store for use later
	        _this.onReady();
	      }
	    }, _this.postMessage = function (method, value) {
	      if (!_this.origin) return;
	      var data = JSON.stringify({ method: method, value: value });
	      return _this.iframe.contentWindow && _this.iframe.contentWindow.postMessage(data, _this.origin);
	    }, _temp), _possibleConstructorReturn(_this, _ret);
	  }

	  _createClass(Vimeo, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      window.addEventListener('message', this.onMessage, false);
	      this.iframe = this.refs.iframe;

	      if (!this.props.url && this.props.vimeoConfig.preload) {
	        this.preloading = true;
	        this.load(BLANK_VIDEO_URL);
	      }

	      _get(Object.getPrototypeOf(Vimeo.prototype), 'componentDidMount', this).call(this);
	    }
	  }, {
	    key: 'getIframeParams',
	    value: function getIframeParams() {
	      return _extends({}, DEFAULT_IFRAME_PARAMS, this.props.vimeoConfig.iframeParams);
	    }
	  }, {
	    key: 'load',
	    value: function load(url) {
	      var id = url.match(MATCH_URL)[3];
	      this.iframe.src = IFRAME_SRC + id + '?' + (0, _queryString.stringify)(this.getIframeParams());
	    }
	  }, {
	    key: 'play',
	    value: function play() {
	      this.postMessage('play');
	    }
	  }, {
	    key: 'pause',
	    value: function pause() {
	      this.postMessage('pause');
	    }
	  }, {
	    key: 'stop',
	    value: function stop() {
	      this.iframe.src = '';
	    }
	  }, {
	    key: 'seekTo',
	    value: function seekTo(fraction) {
	      _get(Object.getPrototypeOf(Vimeo.prototype), 'seekTo', this).call(this, fraction);
	      this.postMessage('seekTo', this.duration * fraction);
	    }
	  }, {
	    key: 'setVolume',
	    value: function setVolume(fraction) {
	      this.postMessage('setVolume', fraction);
	    }
	  }, {
	    key: 'getDuration',
	    value: function getDuration() {
	      return this.duration;
	    }
	  }, {
	    key: 'getFractionPlayed',
	    value: function getFractionPlayed() {
	      return this.fractionPlayed || null;
	    }
	  }, {
	    key: 'getFractionLoaded',
	    value: function getFractionLoaded() {
	      return this.fractionLoaded || null;
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var _getIframeParams = this.getIframeParams();

	      var fullscreen = _getIframeParams.fullscreen;

	      var style = {
	        display: this.props.url ? 'block' : 'none',
	        width: '100%',
	        height: '100%'
	      };
	      return _react2.default.createElement('iframe', { ref: 'iframe', frameBorder: '0', style: style, allowFullScreen: fullscreen });
	    }
	  }], [{
	    key: 'canPlay',
	    value: function canPlay(url) {
	      return MATCH_URL.test(url);
	    }
	  }]);

	  return Vimeo;
	}(_Base3.default);

	Vimeo.displayName = 'Vimeo';
	exports.default = Vimeo;
	module.exports = exports['default'];

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */'use strict';
	var strictUriEncode = __webpack_require__(23);

	function encode(value, strict) {
		return strict ? strictUriEncode(value) : encodeURIComponent(value);
	}

	exports.extract = function (str) {
		return str.split('?')[1] || '';
	};

	exports.parse = function (str) {
		// Create an object with no prototype
		// https://github.com/sindresorhus/query-string/issues/47
		var ret = Object.create(null);

		if (typeof str !== 'string') {
			return ret;
		}

		str = str.trim().replace(/^(\?|#|&)/, '');

		if (!str) {
			return ret;
		}

		str.split('&').forEach(function (param) {
			var parts = param.replace(/\+/g, ' ').split('=');
			// Firefox (pre 40) decodes `%3D` to `=`
			// https://github.com/sindresorhus/query-string/pull/37
			var key = parts.shift();
			var val = parts.length > 0 ? parts.join('=') : undefined;

			key = decodeURIComponent(key);

			// missing `=` should be `null`:
			// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
			val = val === undefined ? null : decodeURIComponent(val);

			if (ret[key] === undefined) {
				ret[key] = val;
			} else if (Array.isArray(ret[key])) {
				ret[key].push(val);
			} else {
				ret[key] = [ret[key], val];
			}
		});

		return ret;
	};

	exports.stringify = function (obj, opts) {
		opts = opts || {};

		var strict = opts.strict !== false;

		return obj ? Object.keys(obj).sort().map(function (key) {
			var val = obj[key];

			if (val === undefined) {
				return '';
			}

			if (val === null) {
				return key;
			}

			if (Array.isArray(val)) {
				var result = [];

				val.slice().sort().forEach(function (val2) {
					if (val2 === undefined) {
						return;
					}

					if (val2 === null) {
						result.push(encode(key, strict));
					} else {
						result.push(encode(key, strict) + '=' + encode(val2, strict));
					}
				});

				return result.join('&');
			}

			return encode(key, strict) + '=' + encode(val, strict);
		}).filter(function (x) {
			return x.length > 0;
		}).join('&') : '';
	};


/***/ },
/* 23 */
/***/ function(module, exports) {

	/** @jsx React.DOM */'use strict';
	module.exports = function (str) {
		return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
			return '%' + c.charCodeAt(0).toString(16).toUpperCase();
		});
	};


/***/ }
/******/ ])
});
;