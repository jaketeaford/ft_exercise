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
	this.city_state = ko.observable(data.city + ", " + data.state);
	this.zip = ko.observable(data.zip);
	this.neighborhood = ko.observable(data.neighborhood);
	this.price = ko.observable(data.price);
	this.list_date = ko.observable(data.list_date);
	this.bedrooms = ko.observable(data.bedrooms);
	this.bathrooms = ko.observable(data.bathrooms);
	this.photos = ko.observableArray([]);
	this.garage_size = ko.observable(data.garage_size);
	this.sqft = ko.observable(data.sqft);
	this.lot_size = ko.observable(data.lot_size);
	this.description = ko.observable(data.description);
}

function Photo(url) {
	this.img_src = ko.observable(url);
}

function HouseSearchViewModel() {
	// data for search form
	var self = this;
	self.mlsQuery = ko.observable();
	self.cityQuery = ko.observable();
	self.stateQuery = ko.observable(undefined);
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
				console.log("yay");
			}
		});
	}

}

ko.applyBindings(new HouseSearchViewModel());