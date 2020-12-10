# Front-end start-kit

### Install bower components

```bash
bower install
```

Every bower component that you are using, please copy to vendor or plugins folder (vendor for JS files, plugins for SCSS files).

### Install npm modules faster
Executing the following before an ```npm install``` dramatically speeds up the process:

```bash
npm set progress=false
rm -rf node_modules
time npm install
```

## Gulp tasks

#### Default
Watchers and compilers: **SCSS**, **JavaScript** and **Browser Sync**
```bash
gulp
```

#### Build CSS and JS dist file
Tasks: **buildCSSltr**, **buildCSSrtl**, **buildJS**
```bash
gulp build
```

#### List all Gulp tasks
```bash
gulp --tasks
```

## Plugins.js file example
Gulpfile uses ```plugins.js``` to concat all files listed in it into one file: ```static/js/js.js```.
```javascript
module.exports = {
	scripts: [
		// PLUGINS
		'static/js/vendor/jquery.js',
		'static/js/vendor/is.js',
		// CUSTOM
		'static/js/custom/alterClass.js',
		'static/js/custom/main.js'
	]
};
```

## JS file example
```javascript
var webJS = {
	common: {}
};

webJS.common = (function (window, document) {

	function mainFunction() {
		console.log('hello');
	}

	return {
		mainFunction: mainFunction
	};

})(window, document);

$(function () {
	webJS.common.mainFunction();
});
```

## How to write SCSS/CSS (BEM)

The Block, Element, Modifier methodology (commonly referred to as BEM) is a popular naming convention for classes in HTML and CSS. Developed by the team at Yandex, its goal is to help developers better understand the relationship between the HTML and CSS in a given project.

##### Example:
```css
/* Block component */
.btn {}

/* Element that depends upon the block */ 
.btn__price {}

/* Modifier that changes the style of the block */
.btn--orange {} 
.btn--big {}
```

In this CSS methodology a block is a top-level abstraction of a new component, for example a button: ```.btn { }```. This block should be thought of as a parent. Child items, or elements, can be placed inside and these are denoted by two underscores following the name of the block like ```.btn__price { }```. Finally, modifiers can manipulate the block so that we can theme or style that particular component without inflicting changes on a completely unrelated module. This is done by appending two hyphens to the name of the block just like ```btn--orange```.

The markup might then look like this:
```html
<a class="btn btn--big btn--orange" href="#">
  <span class="btn__price">$9.99</span>
  <span class="btn__text">Subscribe</span>
</a>
```

#Brick boilerplate
https://github.com/Riccardo-Zanutta/brick