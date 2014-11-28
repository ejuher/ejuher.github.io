NoiseViolator.Views.ArtistForm = Backbone.View.extend({
	template: _.template(
		"<label for='cell-number'>Cellphone Number</label>" +
		"<input id='cell-number' type='tel'><input type='button' value='Add Contact' class='button'>"
	),

	render: function() {
		this.$el.html(this.template);
		return this;
	}
})