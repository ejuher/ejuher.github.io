NoiseViolator.Collections.NoiseViolations = Backbone.Collection.extend({
	model: NoiseViolator.Models.NoiseViolation,

	initialize: function () {
		for (var i = 1; i < 4; i++) {
			var violation = new NoiseViolator.Models.NoiseViolation({
				volume: [],
				time: '---',
			})
			this.add(violation);
		}
	},

	comparator: function (noiseViolation) {
		return -noiseViolation.get('output');
	},

	isTopViolation: function (violation) {
		var outputs = this.pluck('output');
		return outputs[outputs.length - 1] < violation.get('output');
	}
})