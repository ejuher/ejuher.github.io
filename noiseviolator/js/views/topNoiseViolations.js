NoiseViolator.Views.TopNoiseViolations = Backbone.CompositeView.extend({
	template: _.template(
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

	initialize: function () {
		this.listenTo(this.collection, 'add', this.render);
	},

	addViolation: function (violation) {
		var violationView = new NoiseViolator.Views.NoiseViolationShow({ model: violation });
		this.$el.find('tbody').append(violationView.render().$el);
	},

	render: function () {
		this.$el.html(this.template);
		this.collection.each(this.addViolation.bind(this)); 
		return this;
	},

	addAndRender: function (violation) {
		this.addViolation(violation);
		this.render();
	}
})