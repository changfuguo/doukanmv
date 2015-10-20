/*
*  base.js ,base for all the model
*
*/
'use strict';
const API_BASE = 'http://doukantv.com/api';

class BaseModel {
	constructor(baseUrl){
		this._base = baseUrl || API_BASE;
	}
	getData(url, param){
		url = url.indexOf('?') > -1 ? url : url + '?';
		var params = [];
		for (var  attr  in  param) {
			  param.hasOwnProperty(attr) && params.push(attr + '=' + encodeURIComponent(param[attr]));
		}
		url = url + params.join('&');
		url = API_BASE + url;
		//here is all json data ,so we 
		return new Promise((resolve, reject) => {
			fetch(url)
			  .then((response) => response.json())
			  .then((responseData) => {
				//console.log(responseData);
				resolve(responseData);
			  })
			  .catch((error) => {
				console.error(error);
				resolve(null);
			  });
		});
	 
	}

	postData(url,body) {
		
	}
}
module.exports = BaseModel;
