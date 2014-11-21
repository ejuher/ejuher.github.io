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
		this._setRanks();
		return this;
	},

	_setRanks: function () {
		ranks = this.$el.find('tbody td:first-child');
		for (var i = 0; i < 3; i++) {
			ranks[i].innerHTML = i + 1;
		}
	}
})