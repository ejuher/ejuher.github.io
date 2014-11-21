NoiseViolator.Views.NoiseViolationShow = Backbone.CompositeView.extend({
	template: _.template(
		"<td></td>" +
		"<td><%= noiseViolation.escape('output') === '0' ? '---' : '0' %></td>" +
		"<td><%= noiseViolation.escape('time') %></td>"
	),

	tagName: "tr",

	render: function () {
		var renderContent = this.template({ noiseViolation: this.model });
		this.$el.html(renderContent);
		return this;
	}
})