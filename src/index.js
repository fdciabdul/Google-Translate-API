const axios = require("axios");
const qs = require('querystring');
const languages = require('./language.js');

module.exports = {

	getSentence: async (text, word) => {

		word = word || {};

		var e;
		[word.from, word.to].forEach(function(lang) {
			if (lang && !languages.isSupported(lang)) {
				e = new Error();
				e.code = 400;
				e.message = 'The language \'' + lang + '\' is not supported';
			}
		});
		if (e) {
			return new Promise(function(resolve, reject) {
				reject(e);
			});
		}

		word.from = word.from || 'auto';
		word.to = word.to || 'en';

		word.from = languages.getCode(word.from);
		word.to = languages.getCode(word.to);

		const url = "https://translate.google.com/translate_a/single" +
			"?client=at&dt=t&dt=ld&dt=qca&dt=rm&dt=bd&dj=1&hl=" + word.to + "&ie=UTF-8" +
			"&oe=UTF-8&inputm=2&otf=2&iid=1dd3b944-fa62-4b55-b330-74909a99969e";


		const data = {
			'sl': word.from,
			'tl': word.to,
			'q': text,
		};

		try {
			const result = await axios(url, {
				method: 'POST',
				encoding: 'UTF-8',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
					'User-Agent': 'AndroidTranslate/5.3.0.RC02.130475354-53000263 5.1 phone TRANSLATE_OPM5_TEST_1',
				},
				data: qs.stringify(data)
			})

			let output = result.data.sentences[0];
			let sentence = {
				text: output.orig,
				transaltion: output.trans,

			}
			return sentence;
		} catch (e) {
			return e
		}
	},
	getDictionary: async (text, word) => {

		word = word || {};

		var e;
		[word.from, word.to].forEach(function(lang) {
			if (lang && !languages.isSupported(lang)) {
				e = new Error();
				e.code = 400;
				e.message = 'The language \'' + lang + '\' is not supported';
			}
		});
		if (e) {
			return new Promise(function(resolve, reject) {
				reject(e);
			});
		}

		word.from = word.from || 'auto';
		word.to = word.to || 'en';

		word.from = languages.getCode(word.from);
		word.to = languages.getCode(word.to);

		const url = "https://translate.google.com/translate_a/single" +
			"?client=at&dt=t&dt=ld&dt=qca&dt=rm&dt=bd&dj=1&hl=" + word.to + "&ie=UTF-8" +
			"&oe=UTF-8&inputm=2&otf=2&iid=1dd3b944-fa62-4b55-b330-74909a99969e";


		const data = {
			'sl': word.from,
			'tl': word.to,
			'q': text,
		};

		try {
			const result = await axios(url, {
				method: 'POST',
				encoding: 'UTF-8',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
					'User-Agent': 'AndroidTranslate/5.3.0.RC02.130475354-53000263 5.1 phone TRANSLATE_OPM5_TEST_1',
				},
				data: qs.stringify(data)
			})

			let output = result.data.dict[0];
			
			return output;
		} catch (e) {
			return e
		}
	},
	
	
}
