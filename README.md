# dsRoute - Discus Route
[![logo Discus Tecnologia](https://www.discustecnologia.com.br/images/logo_pq.png)](http://www.discustecnologia.com.br)

Route system for SPA (Single Page Applications)

---

Use less data traffic and make your application faster
* Resources:
  * Lazy loading templates using ajax
  *	Optional cache for loaded templates
  *	Define a default route and error code routes
 
* Dependencies:
  * [Crossroads.js](https://millermedeiros.github.io/crossroads.js/)
  * [Hasher](https://github.com/millermedeiros/hasher/)
  * [js-signals](https://github.com/millermedeiros/js-signals)
  *	[jQuery](https://jquery.com/)

## Example

index.html
```html
!DOCTYPE html>
<html>
<head>
	<title>dsRoute Example</title>
	<meta charset="UTF-8">
</head>
<body>
	<div>
		<h1>Base application</h1>
	</div>
	<div id="content"></div>
</body>
	<script src="signals.min.js"></script>
	<script src="crossroads.min.js"></script>
	<script src="hasher.min.js"></script>
	<script src="jquery.min.js"></script>
	<script src="dsRoute.js"></script>
	<script src="app.js"></script>
</html>
```
app.js
```js
fooController = function(id){
	console.log('load view foo');
};

barController = function(id, slug){
	console.log('load view bar with parameters', id, slug);

dsRoute.setRoutes({
	//index route
	'' : {templateUrl : 'home.html', controller : 'fooController'},
	//Route no cached template
	'foo' : {templateUrl : 'foo.html', controller : 'fooController', nocache : true},
	//Route with parameter and optional parameter
	'bar/{id}/:slug:' : {templateUrl : 'bar.html', controller : 'barController'},
	//Route called when get 404 code error. You can use others code errors.
	'404' : {templateUrl : '404.html', controller : 'fooController'},
	//Called when no route matched
	'default' : {templateUrl : 'default.html', controller : 'fooController'}
});
```
The template by default are showed on element #content. If you need to change the default element use:
```js
dsRoute.setElRouteView('#maincontent');
```

## Install

via npm
```sh
npm install dsroute --save
```
via bower
```sh
bower install dsroute --save
```
  
## License ##

Copyright © 2017 [Discus Tecnologia][1]

Released under the [MIT license](http://www.opensource.org/licenses/mit-license.php).

  [1]: https//www.discustecnologia.com.br