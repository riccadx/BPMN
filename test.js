var src = $.NSString.stringWithContentsOfFileEncodingError('index.html', $.NSUTF8StringEncoding, null).js;
var js = src.match(/<script[\s\S]*?>([\s\S]*?)<\/script>/gi).map(function(s) {
    return s.replace(/<script[\s\S]*?>/, '').replace(/<\/script>/, '');
}).join('\n');
try {
    eval(js);
    "Syntax OK!"
} catch(e) {
    "Error: " + e.message;
}
