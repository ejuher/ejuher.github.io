NoiseViolator.Collections.NoiseViolations = Backbone.Collection.extend({
	model: NoiseViolator.Models.NoiseViolation,

	comparator: function(noiseViolation) {
		return -noiseViolation.get('output');
	},

	isTopViolation: function (violation) {
		var outputs = this.pluck('output');
		return outputs[outputs.length - 1] < violation.get('output');
	}
})