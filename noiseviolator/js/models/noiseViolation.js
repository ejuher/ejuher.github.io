NoiseViolator.Models.NoiseViolation = Backbone.Model.extend({

	initialize: function () {
		this.set('output', this.calculateOutput());
	},

	calculateOutput: function () {
		var output = 0;
		var volumes = this.get('volume');
		for (var i = 0, len = volumes.length; i < len; i++) {
			output += Number(volumes[i]);
		}
		return output;
	}
})