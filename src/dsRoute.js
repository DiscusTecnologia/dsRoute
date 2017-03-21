/**
 * dsRoute - Discus Route
 * Route system for SPA (Single Page Applications)
 * Use less data traffic and make your application faster
 * Resources:
 * 		Lazy loading templates using ajax
 * 		Optional cache for loaded templates
 * 		Define a default route and error code routes
 * Requirements:
 * 		hasher: https://github.com/millermedeiros/hasher/
 *		crosroads: https://millermedeiros.github.io/crossroads.js/
 * 		jQuery: https://jquery.com/
 * @author Rodrigo Ramos <rodrigoramos@discustecnologia.com.br>
 * @name dsRoute - Discus Route
 * @version 1.0.0
 */

dsRoute = new function(){

	routes = {}; //defined routes
	elRouteView = '#content'; //element to show route template
	templatesUrlLoaded = []; //urls cacheds
	templatesLoaded = {}; //templates cache

	//method to modify element to show route template
	this.setElRouteView = function(el) {
		elRouteView = el;
	};

	//add routes object and initialize route system
	this.setRoutes = function(routes) {
		this.routes = routes;
		
		for(var route in routes) {
			crossroads.addRoute(route);
		}

		//listener for change routes
		crossroads.routed.add(function(request, data, first) {
			controller = eval(routes[data.route._pattern].controller);
			url = routes[data.route._pattern].templateUrl;
			nocache = routes[data.route._pattern].nocache != undefined ? routes[data.route._pattern].nocache : false;

			if($.inArray(data.route._pattern, templatesUrlLoaded) == -1 || nocache) {

				//Not loaded. Load from server
				$.ajax({
					url : url,
					type : 'GET',
					success: function(remoteData, status, xhr) {
						templatesUrlLoaded.push(data.route._pattern);
						templatesLoaded[data.route._pattern] = remoteData;
						$(elRouteView).html(remoteData);
					},
					error: function(xhr, textStatus) {
						if(routes[xhr.status] != undefined) { //if exist route error code
							hasher.setHash(xhr.status);
						} else {
							if(routes['default'] != undefined) { //if exist default route
								hasher.setHash('default');
							} else { //without default route and error route
								$(elRouteView).html('<div style="background-color: #F2DEDE; color: #843534">' +
									'<h3>Error for route "' + request +'"</h3>' +
									'<p>Status code error: ' + xhr.status + ' ' + xhr.statusText + '</p></div>');
							}
						}
			        }
				});

			}else {
				//show previous route loaded
				$(elRouteView).html(templatesLoaded[data.route._pattern]);
			}

			//pass parameters
			controller.apply(this, data.params);
		});

		//get routes not defined
		crossroads.bypassed.add(function(request){
			if(routes['404'] != undefined) { //if not exist not found route
				hasher.setHash('404');
			} else {
				if(routes['default'] != undefined) { //if exist default route
					hasher.setHash('default');
				} else { //without default route and error route
					$(elRouteView).html('<div style="background-color: #F2DEDE; color: #843534">' +
						'<h3>Error for route "' + request +'"</h3>' +
						'<p>Route not found: error code 404</p></div>');
				}
			}
		});

		//setup hasher to save history state and update browser url
		function parseHash(newHash, oldHash){
		  crossroads.parse(newHash);
		}
		hasher.initialized.add(parseHash);
		hasher.changed.add(parseHash);
		hasher.init();
	};

};