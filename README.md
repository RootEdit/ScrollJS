# ScrollJS
A Javascript library for scroll and parallax effect using  TweenJS.

This plugin use the scroll value in place of time to control the tween animation.

## installation

* First include tweenjs script.
* After include scrollJS.
* you'r ready to go.

```html
	<script src="/js/tweenjs-0.6.2.min.js" type="text/javascript" charset="utf-8"></script>
	<script src="/js/ScrollJS.js" type="text/javascript" charset="utf-8"></script>
```
##usage

### Scroll animating from right
```javascript
	rootedit.ScrollJS.scrollRight('#IdOfElement')
```

### Scroll animating from left
```javascript
	rootedit.ScrollJS.scrollLeft('#IdOfElement')
```

### Scroll animating scale
the second parameter is the scale delta.
```javascript
	rootedit.ScrollJS.scrollScale('#IdOfElement',0.33);
```

### Scroll paralax effect
the second parameter is the paralax speed, negative value invert the scroll direction.
```javascript         
	rootedit.ScrollJS.paralax('#IdOfElement');
	rootedit.ScrollJS.paralax('#IdOfElement2', -0.4);
```
### Scroll any tweenJS

```javascript         
	var tween = createjs.Tween.get(myTarget)
		.to({x:300},400)
		.set({label:"hello!"})
		.wait(500).to({alpha:0,visible:false},1000)
		.call(onComplete);
	rootedit.ScrollJS.ScrollTween(tween);
```

###All together

```javascript         
(function () {
	window.addEventListener("load", function () {
		rootedit.ScrollJS.scrollRight('#IdOfElement');
		rootedit.ScrollJS.scrollLeft('#IdOfElement');
		rootedit.ScrollJS.scrollScale('#IdOfElement',0.33);
		rootedit.ScrollJS.paralax('#IdOfElement');
		rootedit.ScrollJS.paralax('#IdOfElement2', -0.4);
    }, false);
}());
```
