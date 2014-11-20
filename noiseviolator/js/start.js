var router = new NoiseViolator.Routers.NoiseViolatorRouter({
	$threshold: $('#threshold-form'),
	$tbody: $('#violations')
})
Backbone.history.start();