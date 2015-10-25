
var URLRegEx =
    // protocol identifier
    '(?:(?:https?|ftp)://)' +
    // user:pass authentication
    '(?:\\S+(?::\\S*)?@)?' +
    '((?:' +
        // IP address exclusion
        // private & local networks
        '(?!(?:10|127)(?:\\.\\d{1,3}){3})' +
        '(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})' +
        '(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})' +
        // IP address dotted notation octets
        // excludes loopback network 0.0.0.0
        // excludes reserved space >= 224.0.0.0
        // excludes network & broacast addresses
        // (first & last IP address of each class)
        '(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])' +
        '(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}' +
        '(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))' +
    '|' +
        // host name
        '(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)' +
        // domain name
        '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*' +
        // TLD identifier
        '(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))' +
    '))' +
    // port number
    '(?::\\d{2,5})?' +
    // resource path
    '(?:/\\S*)?';

var one = new RegExp('^' + URLRegEx +'$', 'i');
var many = new RegExp(URLRegEx, 'ig');


var VideoHelper = {

    getSource(url){
        var match = one.exec(url);
        var domain = null;
        if(!match) return domain;
        var sources =  VideoHelper.source();
        domain = match[1];
        domain = sources.filter(function(source){return domain.indexOf(source.value) > -1;});
        return domain.length > 0 && domain[0];
    },
    source(){
        return [{
                name : "腾讯",
                value: "qq"
            },{
                name:'风行',
                value: 'funshion'
            },{
                value: 'sohu',
                name: '搜狐'
            },{
                value: 'youku',
                name: '优酷'
            },{
                value: 'letv',
                name: '乐视'
            },{
                value: 'iqiyi',
                name: '爱奇艺'
            },{
                value: 'tudou',
                name: '土豆'
            },{
                value:'pptv',
                name: 'PPLive'
            }];
    }
};

module.exports = VideoHelper;