NoiseViolator.Collections.NoiseViolations = Backbone.Collection.extend({
	model: NoiseViolator.Models.NoiseViolation,

	comparator: function(noiseViolation) {
		return entry.get('output');
	}
})