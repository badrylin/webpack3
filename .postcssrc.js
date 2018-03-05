module.exports = {
    "plugins": {
		// to edit target browsers: use "browserslist" field in package.json
		"autoprefixer": {},
		"postcss-sprites":{
			filterBy: function(image) {
				// Allow only png /sprites/
				if (!/\/sprites\//.test(image.url)) {
					return Promise.reject();
				} 
				return Promise.resolve();
			},
			spritePath:"./dist/img"
		}
	}
  }
  