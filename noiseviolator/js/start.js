var router = new NoiseViolator.Routers.NoiseViolatorRouter({
	$artist: $('#artist-form'),
	$threshold: $('#threshold-form'),
	$tbody: $('#violations')
})
Backbone.history.start();