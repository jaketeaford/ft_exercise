// CSRF token setup as per Django docs

var csrftoken = Cookies.get('csrftoken');
function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function (xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});

// KnockoutJS
function House(data) {
	this.mls = ko.observable(data.mls);
	this.address = ko.observable(data.address);
	this.city_state = ko.observable(data.city_state);
	this.zip = ko.observable(data.zip);
	this.neighborhood = ko.observable(data.neighborhood);
	this.price = ko.observable(data.price);
	this.list_date = ko.observable(data.list_date);
	this.bedrooms = ko.observable(data.bedrooms);
	this.bathrooms = ko.observable(data.bathrooms);
	this.photos = ko.observableArray(data.photos);
	this.garage_size = ko.observable(data.garage_size);
	this.sqft = ko.observable(data.sqft);
	this.lot_size = ko.observable(data.lot_size);
	this.description = ko.observable(data.description);
}

function Photo(data) {
	this.img_src = ko.observable(data.url);
}

function HouseSearchViewModel() {
	// data for search form
	var self = this;
	self.mlsQuery = ko.observable();
	self.cityQuery = ko.observable();
	self.stateQuery = ko.observable();
	self.zipQuery = ko.observable();
	self.bedsQuery = ko.observable();
	self.bathsQuery = ko.observable();
	self.sqFtQuery = ko.observable();
	self.houseResults = ko.observableArray([]);

	// functionality
	self.submitSearch = function() {
		var data = {
			"mls": self.mlsQuery,
			"city": self.cityQuery,
			"state": self.stateQuery,
			"zip": self.zipQuery,
			"beds": self.bedsQuery,
			"baths": self.bathsQuery,
			"sqft": self.sqFtQuery
		}

		$.ajax({
			url: 'search/',
			type: 'GET',
			data: data,
			contentType: "application/json; charset=utf-8",
			success: function(result){
				for (var i = 0; i < result.length; i++) {
					// first we need to create an array of photo objects
					var photos = ko.observableArray([]);

					if (result[i]['photos'].length > 0) {
						for (var j = 0; j < result[i]['photos'].length; j++){
							var formattedPhotoSrc = "/media/" + result[i]['photos'][j]['photo'];
							photos.push(new Photo({ url: formattedPhotoSrc }))
						}
					}

					// format street address
					var address = result[i]['street1'];

					if (result[i]['street2'] != ""){
						address += " " + result[i]['street2'];
					}

					var cityState = result[i]['city'] + ", " + result[i]['state'];

					var houseData = {
						mls: result[i]['mls_num'],
						address: address,
						city_state: cityState,
						zip: result[i]['zip_code'],
						neighborhood: result[i]['neighborhood'],
						price: result[i]['sales_price'],
						list_date: result[i]['list_date'],
						bedrooms: result[i]['beds'],
						bathrooms: result[i]['baths'],
						photos: photos(),
						garage_size: result[i]['garage_size'],
						sqft: result[i]['sq_ft'],
						lot_size: result[i]['lot_size'],
						description: result[i]['description']
					}

					self.houseResults.push(new House(houseData));
				}
			}
		});
	}

}

ko.applyBindings(new HouseSearchViewModel());