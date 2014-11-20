NoiseViolator.Views.TopNoiseViolations = Backbone.CompositeView.extend({
	template: _.template(
		"<thead>" +
			"<tr>" + 
			"<thead>" +
	 		"<tr>" +
		 		"<td>Output</td>" +
		 		"<td>Time</td>" +
	 		"</tr>" +
		"</thead>" +
		"<tbody>" +
		"</tbody>" 
	),
	tagName: "table",

	intialize: function() {
		this.listenTo(this.collection, 'add', this.addViolation); // may have to switch to rendering
	},

	addViolation: function(violation) {
		console.log('view knows you added');
		var violationView = new NoiseViolator.Views.noiseViolationShow({ model: feed });
		this.addSubview("tbody", violationView);
	},

	render: function () {
		this.collection.each(this.addViolation.bind(this));
		this.$el.html(this.template);
		this.attachSubviews();
		return this;
	}
})