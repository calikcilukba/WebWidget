requirejs.config({
	"baseUrl": 'js',
	"paths": {
		"script": "http://intern.vutura.io/widget/embedded/www/js/app/script.js",
		"jquery": [
			'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min',
			'https://code.jquery.com/jquery-3.5.1.min'
		],
		"socketIo": 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.3.0/socket.io',
		"MaterializeJs": 'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min',
		"@firebase/app": 'https://www.gstatic.com/firebasejs/7.15.5/firebase-app',
		"@firebase/storage": 'https://www.gstatic.com/firebasejs/7.15.5/firebase-storage'
	}

});