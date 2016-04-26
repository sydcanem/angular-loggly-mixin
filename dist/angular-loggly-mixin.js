/*! lodash.iserror - v3.1.1
 * https://lodash.com/
 * Copyright (c) 2015 Focusvision Worldwide; Licensed MIT
 */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//
// format - printf-like string formatting for JavaScript
// github.com/samsonjs/format
// @_sjs
//
// Copyright 2010 - 2013 Sami Samhuri <sami@samhuri.net>
//
// MIT License
// http://sjs.mit-license.org
//

;(function() {

  //// Export the API
  var namespace;

  // CommonJS / Node module
  if (typeof module !== 'undefined') {
    namespace = module.exports = format;
  }

  // Browsers and other environments
  else {
    // Get the global object. Works in ES3, ES5, and ES5 strict mode.
    namespace = (function(){ return this || (1,eval)('this') }());
  }

  namespace.format = format;
  namespace.vsprintf = vsprintf;

  if (typeof console !== 'undefined' && typeof console.log === 'function') {
    namespace.printf = printf;
  }

  function printf(/* ... */) {
    console.log(format.apply(null, arguments));
  }

  function vsprintf(fmt, replacements) {
    return format.apply(null, [fmt].concat(replacements));
  }

  function format(fmt) {
    var argIndex = 1 // skip initial format argument
      , args = [].slice.call(arguments)
      , i = 0
      , n = fmt.length
      , result = ''
      , c
      , escaped = false
      , arg
      , tmp
      , leadingZero = false
      , precision
      , nextArg = function() { return args[argIndex++]; }
      , slurpNumber = function() {
          var digits = '';
          while (/\d/.test(fmt[i])) {
            digits += fmt[i++];
            c = fmt[i];
          }
          return digits.length > 0 ? parseInt(digits) : null;
        }
      ;
    for (; i < n; ++i) {
      c = fmt[i];
      if (escaped) {
        escaped = false;
        if (c == '.') {
          leadingZero = false;
          c = fmt[++i];
        }
        else if (c == '0' && fmt[i + 1] == '.') {
          leadingZero = true;
          i += 2;
          c = fmt[i];
        }
        else {
          leadingZero = true;
        }
        precision = slurpNumber();
        switch (c) {
        case 'b': // number in binary
          result += parseInt(nextArg(), 10).toString(2);
          break;
        case 'c': // character
          arg = nextArg();
          if (typeof arg === 'string' || arg instanceof String)
            result += arg;
          else
            result += String.fromCharCode(parseInt(arg, 10));
          break;
        case 'd': // number in decimal
          result += parseInt(nextArg(), 10);
          break;
        case 'f': // floating point number
          tmp = String(parseFloat(nextArg()).toFixed(precision || 6));
          result += leadingZero ? tmp : tmp.replace(/^0/, '');
          break;
        case 'j': // JSON
          result += JSON.stringify(nextArg());
          break;
        case 'o': // number in octal
          result += '0' + parseInt(nextArg(), 10).toString(8);
          break;
        case 's': // string
          result += nextArg();
          break;
        case 'x': // lowercase hexadecimal
          result += '0x' + parseInt(nextArg(), 10).toString(16);
          break;
        case 'X': // uppercase hexadecimal
          result += '0x' + parseInt(nextArg(), 10).toString(16).toUpperCase();
          break;
        default:
          result += c;
          break;
        }
      } else if (c === '%') {
        escaped = true;
      } else {
        result += c;
      }
    }
    return result;
  }

}());

},{}],2:[function(require,module,exports){
/**
 * lodash 3.1.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var errorTag = '[object Error]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
 * `SyntaxError`, `TypeError`, or `URIError` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
 * @example
 *
 * _.isError(new Error);
 * // => true
 *
 * _.isError(Error);
 * // => false
 */
function isError(value) {
  if (!isObjectLike(value)) {
    return false;
  }
  return (objectToString.call(value) == errorTag) ||
    (typeof value.message == 'string' && typeof value.name == 'string');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = isError;

},{}],3:[function(require,module,exports){
(function (global){
'use strict';

$logDecorator.$inject = ["$delegate", "$loggly"];
var _ref = typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null;

var isDefined = _ref.isDefined;
var isFunction = _ref.isFunction;
var isUndefined = _ref.isUndefined;
var bind = _ref.bind;
var extend = _ref.extend;
var isObject = _ref.isObject;
var forEach = _ref.forEach;


var formatString = require('format');
var isError = require('lodash.iserror');

// @ngInject
function $logDecorator($delegate, $loggly) {
  var providerConfig = $loggly.config.providerConfig;

  var levelMapping = providerConfig.levelMapping;
  var timers = $delegate.$$timers = {};

  /**
   * Creates a function which calls Loggly, then passes thru to $log service.
   * @param {string} methodName Method name to create; used when calling Loggly
   * @param {Function} originalMethod Method in $log service to call thru to
   * @returns {Function} New proxy function
   */
  function createProxy(methodName, originalMethod) {
    var format = bind(null, providerConfig.formatter, methodName);

    function logglyLog(msg) {
      if (!isError(msg) || isError(msg) && providerConfig.allowUncaught) {
        var data = void 0;
        var desc = void 0;
        if (isObject(msg)) {
          data = msg;
          desc = undefined;
        } else {
          for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          if (isObject(args[args.length - 1])) {
            data = args.pop();
          }
          desc = formatString.apply(undefined, [msg].concat(args));
        }
        var payload = isUndefined(desc) ? data : extend({ desc: desc }, data);

        $loggly.send(format(payload));
      }
      return logglyLog.$$originalMethod.call(this, msg);
    }

    logglyLog.$$originalMethod = originalMethod;

    return logglyLog;
  }

  /**
   * Starts a timer with given label.
   * @param {string} label Some label for the timer
   */
  $delegate.timer = function timer() {
    var label = arguments.length <= 0 || arguments[0] === undefined ? '__default__' : arguments[0];

    var timestamp = Date.now();
    timers[label] = timestamp;
    $loggly.$emit('timer-started', {
      label: label,
      timestamp: timestamp
    });
  };

  /**
   * Ends a timer with given label.
   * @param {string} label Some label used via {@link $delegate.time}
   * @param {(string|Object)} [msg] Log message, or just `data` object
   * @param {...*} [args] Extra data to send
   */
  $delegate.timerEnd = function timerEnd() {
    var label = arguments.length <= 0 || arguments[0] === undefined ? '__default__' : arguments[0];
    var msg = arguments[1];

    var now = Date.now();
    if (isObject(label)) {
      msg = label;
      label = '__default__';
    }
    var ms = now - (timers[label] || now);
    var data = void 0;

    for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
      args[_key2 - 2] = arguments[_key2];
    }

    if (isObject(msg)) {
      data = msg;
    } else {
      if (args.length && isObject(args[args.length - 1])) {
        data = args[args.length - 1];
      } else {
        data = {};
        if (isDefined(msg)) {
          args.push(data);
        } else {
          msg = data;
        }
      }
    }

    delete timers[label];
    $loggly.$emit('timer-stopped', {
      label: label,
      ms: ms
    });

    data.ms = ms;
    data.label = label;

    return this[levelMapping[providerConfig.timeLevel]].apply(this, [msg].concat(args));
  };

  // ensure we have something for timerEnd() to use
  if (!levelMapping.hasOwnProperty(providerConfig.timeLevel)) {
    providerConfig.timeLevel = 'time';
    levelMapping.time = 'log';
  }

  // we need to save the reference to the original 'log' function,
  // because it has properties which we'll need to move over to our proxy.
  var log = $delegate.log;

  forEach(levelMapping, function (methodName, originalMethodName) {
    if (isFunction($delegate[originalMethodName])) {
      $delegate[methodName] = createProxy(methodName, $delegate[originalMethodName]);
    }
  });

  // this takes the properties out of the original $log.log and stuffs them
  // into the new one.
  extend($delegate.log, log);

  return $delegate;
}

module.exports = $logDecorator;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"format":1,"lodash.iserror":2}],4:[function(require,module,exports){
(function (global){
'use strict';

$logglyProvider.$inject = ["$provide", "$$logglyMixinNamespace"];
var _ref = typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null;

var isString = _ref.isString;
var isDefined = _ref.isDefined;
var isObject = _ref.isObject;
var isFunction = _ref.isFunction;
var extend = _ref.extend;

/**
 * Format a message for sending to Loggly
 * @param {string} level Log level (debug, info, warn, etc)
 * @param {Object} [body={}] Extra message body
 * @param {string} [body.desc='(no description)'] Message description
 * @returns {Object}
 */

function defaultFormatter() {
  var level = arguments.length <= 0 || arguments[0] === undefined ? 'unknown' : arguments[0];
  var body = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  body.desc = body.desc || '(no description)';
  return extend({ level: level }, body);
}

// @ngInject
function $logglyProvider($provide, $$logglyMixinNamespace) {
  var logglyConfig = {
    logglyKey: '',
    sendConsoleErrors: true,
    tag: '',
    useDomainProxy: false
  };

  var providerConfig = {
    allowUncaught: true,
    timerLevel: 'time',
    logglyUrl: '//cloudfront.loggly.com/js/loggly.tracker-2.1.min.js',
    levelMapping: {
      debug: 'debug',
      log: 'log',
      info: 'info',
      warn: 'warn',
      error: 'error',
      time: 'log'
    },
    formatter: defaultFormatter,
    $namespace: $$logglyMixinNamespace
  };

  return {
    /**
     * Set the Loggly API key.  This must be set for operation.
     * @param {string} [value] API key
     * @this $logglyProvider
     * @returns {$logglyProvider} $logglyProvider
     */

    logglyKey: function logglyKey(value) {
      if (isString(value)) {
        logglyConfig.logglyKey = value;
      }
      return this;
    },

    /**
     * Set the Loggly endpoint URL.
     * @param {string} [value] URL; defaults to
     * `//cloudfront.loggly.com/js/loggly.tracker.js`
     * @this $logglyProvider
     * @returns {$logglyProvider} $logglyProvider
     */
    logglyUrl: function logglyUrl(value) {
      if (isString(value)) {
        providerConfig.logglyUrl = value;
      }
      return this;
    },

    /**
     * Set whether or not to pass thrown Errors through to Loggly.
     * @param {boolean} [value] True/false
     * @this $logglyProvider
     * @returns {$logglyProvider} $logglyProvider
     */
    allowUncaught: function allowUncaught(value) {
      if (isDefined(value)) {
        providerConfig.allowUncaught = Boolean(value);
      }
      return this;
    },

    /**
     * Set whether or not Loggly should trap calls to console.error()
     * @param {boolean} [value] True/false
     * @this $logglyProvider
     * @returns {$logglyProvider} $logglyProvider
     */
    sendConsoleErrors: function sendConsoleErrors(value) {
      if (isDefined(value)) {
        logglyConfig.sendConsoleErrors = Boolean(value);
      }
      return this;
    },

    /**
     * Set the level mapping.  The level mapping is an object where the keys
     * are the new method names, and the values are the method names in the
     * original $log service.
     * @param {Object} [value] Level mapping
     * @this $logglyProvider
     * @returns {$logglyProvider} $logglyProvider
     * @example
     * myModule.config($logglyProvider => {
     *   $logglyProvider.levelMapping({omg: 'error'});
     * })
     *   .run($log => {
     *     $log.omg('a terrible error!', {extra: 'data'});
     *   });
     */
    levelMapping: function levelMapping(value) {
      if (isObject(value)) {
        extend(providerConfig.levelMapping, value);
      }
      return this;
    },

    /**
     * Convenience method to map a level.
     * @param {string} [methodName='log'] New method name
     * @param {string} [originalMethodName='log'] Original method name
     * @this $logglyProvider
     * @returns {$logglyProvider} $logglyProvider
     */
    mapLevel: function mapLevel() {
      var methodName = arguments.length <= 0 || arguments[0] === undefined ? 'log' : arguments[0];
      var originalMethodName = arguments.length <= 1 || arguments[1] === undefined ? 'log' : arguments[1];

      providerConfig.levelMapping[methodName] = originalMethodName;
      return this;
    },

    /**
     * Use a custom formatting function to munge data before sending it
     * to Loggly.
     * @param {Function} [func] Formatting function.  This function should
     * accept two (2) parameters:
     * - `level`: The "level" of the $log call.  `debug`, `warn`, `error`, etc.
     * - `body`: An object containing the rest of the message body.  By default
     * we use the following fields:
     *   - `label`: A "label" for the log message
     *   - `desc`: The `string` log message itself
     *   - `data`: An object with extra data in it
     * `func` should then return a complete `Object` to send to Loggly.
     * @this $logglyProvider
     * @returns {$logglyProvider} $logglyProvider
     */
    formatter: function formatter(func) {
      if (isFunction(func)) {
        providerConfig.formatter = func;
      }
      return this;
    },


    /**
     * Decorates $log with the configuration.  Must be called during
     * config() phase.
     */
    decorate: function decorate() {
      $provide.decorator('$log', require('./log-decorator'));
    },


    /**
     * Sets the level used by `$log.timerEnd()` method.
     * @param {string} [value] Should correspond to a key in the level mapping
     * @this $logglyProvider
     * @returns {$logglyProvider}
     */
    timerLevel: function timerLevel(value) {
      if (isDefined(value)) {
        providerConfig.timerLevel = value;
      }
      return this;
    },


    /**
     * Sets the tags Loggly will apply to all log messages
     * @param {...string} [values] One or more tags to apply
     * @this $logglyProvider
     * @returns {$logglyProvider}
     */
    tags: function tags() {
      for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
        values[_key] = arguments[_key];
      }

      if (values.length) {
        logglyConfig.tag = values.join(',');
      }
      return this;
    },


    /**
     * Whether or not to use a domain proxy
     * @param {boolean} [value] True/false
     * @this $logglyProvider
     * @returns {$logglyProvider}
     */
    useDomainProxy: function useDomainProxy(value) {
      if (isDefined(value)) {
        logglyConfig.useDomainProxy = Boolean(value);
      }
      return this;
    },


    $get: require('./loggly-service')({
      logglyConfig: logglyConfig,
      providerConfig: providerConfig
    }),

    config: {
      logglyConfig: logglyConfig,
      providerConfig: providerConfig
    }
  };
}

module.exports = $logglyProvider;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./log-decorator":3,"./loggly-service":5}],5:[function(require,module,exports){
(function (global){
'use strict';

var _ref = typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null;

var element = _ref.element;


function $logglyServiceFactory(config) {
  $logglyService.$inject = ["$window", "$document", "$injector"];
  var namespace = config.providerConfig.$namespace;

  // @ngInject
  function $logglyService($window, $document, $injector) {
    $window._LTracker = [];

    return {
      $tracker: $window._LTracker,
      /**
       * Bootstraps the service by loading the Loggly script from
       * {@link providerConfig.logglyUrl}, and initiating the tracker.
       * This is done automatically.
       * @todo Support for multiple trackers
       * @param {Object} [logglyConfig] Alternative Loggly configuration
       * @param {Object} [providerConfig] Alternative service configuration
       * @private
       */
      $bootstrap: function $bootstrap() {
        var logglyConfig = arguments.length <= 0 || arguments[0] === undefined ? config.logglyConfig : arguments[0];
        var providerConfig = arguments.length <= 1 || arguments[1] === undefined ? config.providerConfig : arguments[1];

        var script = element('<script>').prop('async', true).attr('src', providerConfig.logglyUrl);
        $document.find('head').append(script);
        this.send(logglyConfig);
        this.$emit('ready');
      },

      /**
       * Emits some event w data on `$rootScope`.
       * @param {string} event Event name
       * @param {...*} [data] Extra data
       * @private
       * @returns {Object} Event object
       */
      $emit: function $emit(event) {
        var _$injector$get;

        for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          data[_key - 1] = arguments[_key];
        }

        return (_$injector$get = $injector.get('$rootScope')).$emit.apply(_$injector$get, [namespace + ':' + event].concat(data));
      },

      /**
       * Sends data to Loggly by pushing to the tracker array.
       * @param {...*} data Data to send
       */
      send: function send(payload) {
        $window._LTracker.push(payload);
      },

      config: config
    };
  }

  return $logglyService;
}

module.exports = $logglyServiceFactory;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],6:[function(require,module,exports){
(function (global){
'use strict';

var angular = typeof window !== "undefined" ? window['angular'] : typeof global !== "undefined" ? global['angular'] : null;
var moduleName = 'fv.loggly-mixin';
var logglyMixin = angular.module(moduleName, []);

logglyMixin.constant('$$logglyMixinNamespace', moduleName).provider('$loggly', require('./loggly-provider')).run(["$loggly", function ($loggly) {
  $loggly.$bootstrap();
}]);

module.exports = moduleName;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./loggly-provider":4}]},{},[6]);
