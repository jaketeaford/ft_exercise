function House(data) {
	this.mls = ko.observable(data.mls);
	this.address = ko.observable(data.address);
	this.city = ko.observable(data.city);
	this.state = ko.observable(data.state);
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