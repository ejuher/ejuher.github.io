NoiseViolator.Views.NoiseViolationShow = Backbone.View.extend({
	template: _.template(
		"<td><%= noiseViolation.output() %></td>" +
		"<td><%= noiseViolation.escape('time') %></td>"
	),
	tagName: "tr",

	render: function () {
		var renderContent = this.template({ noiseViolation: this.model });
		this.$el.html(renderContent);
		return this;
	}
})