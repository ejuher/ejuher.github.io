NoiseViolator.Views.TopNoiseViolations = Backbone.CompositeView.extend({
	template: _.template(
			"<thead>" +
	 		"<tr>" +
	 			"<td>Rank</td>" +
		 		"<td>Volume Output</td>" +
		 		"<td>Timestamp</td>" +
	 		"</tr>" +
		"</thead>" +
		"<tbody>" +
			"<tr><td>1</td><td>---</td><td>---</td></tr>" +
			"<tr><td>2</td><td>---</td><td>---</td></tr>" +
			"<tr><td>3</td><td>---</td><td>---</td></tr>" +
		"</tbody>" 
	),
	tagName: "table",

	initialize: function () {
		this.listenTo(this.collection, 'add', this.render);
	},

	addViolation: function (violation) {
		var violationView = new NoiseViolator.Views.NoiseViolationShow({ model: violation });
		this.$el.find('tbody').append(violationView.render().$el);
	},

	render: function () {
		this.$el.html(this.template);
		this.collection.each(this.addViolation.bind(this)); // pass ranking
		return this;
	},

	addAndRender: function (violation) {
		this.addViolation(violation);
		this.render();
	}
})