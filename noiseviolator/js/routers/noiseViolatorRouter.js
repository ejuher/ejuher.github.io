NoiseViolator.Routers.NoiseViolatorRouter = Backbone.Router.extend({
	initialize: function(options) {
		NoiseViolator.noiseViolations = new NoiseViolator.Collections.NoiseViolations();
		NoiseViolator.threshold = $('.slider').val();

		this.$threshold = options.$threshold;
		this.$tbody = options.$tbody;
	},

	routes: {
		'' : 'index'
	},

	index: function() {
		var thresholdView = new NoiseViolator.Views.MeterForm();
		var violationsView = new NoiseViolator.Views.TopNoiseViolations({
			collection: NoiseViolator.noiseViolations
		});
		this._swapViews(this.$threshold, thresholdView);
		this._swapViews(this.$tbody, violationsView);
	},

	_swapViews: function($target, view) {
		var id = $target.attr('id');
		this.currentViews = this.currentViews || {}
		if (id in this.currentViews) { this.currentViews[id].remove(); }
		this.currentViews[id] = view;
		$target.html(this.currentViews[id].render().$el);
	}
})