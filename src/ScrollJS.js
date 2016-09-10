/*
 * MIT License
 * 
 * Copyright (c) 2016 Romain Flacher
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */


this.rootedit = this.rootedit || {};

(function () {
	function ScrollJS() {
		throw("ScrollJS cannot be instantiated.")
	}

	ScrollJS.parallaxTween = [];

	ScrollJS.paralax = function (obj, delta) {
		obj = (typeof obj === 'string') ? document.querySelector(obj) : obj;
		if (null == obj)
			return;
		delta = -delta || -0.1
		if (obj.style.position == '')
			obj.style.position = 'relative';
		h = obj.getBoundingClientRect().height
		ScrollJS.parallaxTween.push(createjs.Tween
				.get(obj, {css: true, paused: true})
				.to({'background-position-y': h * delta}, window.innerHeight + h));
	}
	ScrollJS.scrollLeft = function (obj, easing) {
		obj = (typeof obj === 'string') ? document.querySelector(obj) : obj;
		if (null == obj)
			return;
		if (obj.style.position == '')
			obj.style.position = 'relative';
		bounds = obj.getBoundingClientRect()
		obj.style.left = -bounds.width + 'px'
		ScrollJS.parallaxTween.push(createjs.Tween
				.get(obj, {css: true, paused: true})
				.to({'left': 0}, bounds.height));
	}
	ScrollJS.scrollRight = function (obj, easing) {
		obj = (typeof obj === 'string') ? document.querySelector(obj) : obj;
		if (null == obj)
			return;
		if (obj.style.position == '')
			obj.style.position = 'relative';
		bounds = obj.getBoundingClientRect()
		obj.style.right = -bounds.width + 'px'
		ScrollJS.parallaxTween.push(createjs.Tween
				.get(obj, {css: true, paused: true})
				.to({'right': 0}, bounds.height));
	}
	ScrollJS.scrollScale = function (obj, scaleFactor, topReferer = false) {
		var tw;
		obj = (typeof obj === 'string') ? document.querySelector(obj) : obj;
		if (null == obj)
			return;
		if (obj.style.position == '')
			obj.style.position = 'relative';
		bounds = obj.getBoundingClientRect()
		obj.style.width = bounds.width + 'px'
		obj.style.height = bounds.height + 'px'
		tw = createjs.Tween.get(obj, {css: true, paused: true})
				.to({'width': bounds.width * scaleFactor}, bounds.height)
		tw.topReferer = topReferer;
		tw.y0 = bounds.top;
		ScrollJS.parallaxTween.push(tw);
		tw = createjs.Tween.get(obj, {css: true, paused: true})
				.to({'height': bounds.height * scaleFactor}, bounds.height);
		tw.topReferer = topReferer;
		tw.y0 = bounds.top;
		ScrollJS.parallaxTween.push(tw)
	}


	ScrollJS.ScrollTween = function (tween, topReferer = false) {
		tween.setPaused(true);
		tween.topReferer = topReferer;
		ScrollJS.parallaxTween.push(tween)
	}

	ScrollJS.scrollHandler = function () {
		var decal = 0.7;
		var res;
		var scroll = window.innerHeight * decal;
		for (var i = ScrollJS.parallaxTween.length - 1; i >= 0; i--) {
			var tw = ScrollJS.parallaxTween[i];
			if (tw.topReferer) {
				res = window.pageYOffset + tw.y0;
				res = (res < 0) ? 0 : res;
				tw.setPosition(res);
			} else {
				tw.setPosition(-tw.target.getBoundingClientRect().top + scroll);
			}
		}
	}
	window.addEventListener("scroll", ScrollJS.scrollHandler, false);
	window.addEventListener("resize", ScrollJS.scrollHandler, false);
	window.addEventListener("load", ScrollJS.scrollHandler, false);
	rootedit.ScrollJS = ScrollJS
}());

(function () {
	"use strict";

	function CSSPlugin() {
		throw("CSSPlugin cannot be instantiated.")
	}

	CSSPlugin.cssSuffixMap = {top: "px", left: "px", bottom: "px", right: "px", width: "px", height: "px", opacity: "", 'background-position': 'px', 'background-position-y': 'px'};

	CSSPlugin.priority = -100; // very low priority, should run last


	CSSPlugin.install = function () {
		var arr = [], map = CSSPlugin.cssSuffixMap;
		for (var n in map) {
			arr.push(n);
		}
		createjs.Tween.installPlugin(CSSPlugin, arr);
	}

	CSSPlugin.init = function (tween, prop, value) {
		var sfx0, sfx1, style, map = CSSPlugin.cssSuffixMap;
		if ((sfx0 = map[prop]) == null || !(style = tween.target.style)) {
			return value;
		}
		var str = style[prop];

		if (!str) {
			return 0;
		} // no style set.
		var i = str.length - sfx0.length;
		if ((sfx1 = str.substr(i)) != sfx0) {
			throw("CSSPlugin Error: Suffixes do not match. (" + sfx0 + ":" + sfx1 + ")");
		} else {
			return parseInt(str.substr(0, i));
		}
	}

	CSSPlugin.step = function (tween, prop, startValue, endValue, injectProps) {
		// unused
	}

	CSSPlugin.tween = function (tween, prop, value, startValues, endValues, ratio, wait, end) {
		var style, map = CSSPlugin.cssSuffixMap;
		if (map[prop] == null || !(style = tween.target.style)) {
			return value;
		}
		if (prop == 'background-position-y') {
			style.setProperty('background-position', window.getComputedStyle(tween.target, null).getPropertyValue("background-position").split(' ')[0] + ' ' + (value + map[prop]));
		} else
			style[prop] = value + map[prop];
		return createjs.Tween.IGNORE;
	}

	rootedit.CSSPlugin = CSSPlugin;
	rootedit.CSSPlugin.install()
}());

