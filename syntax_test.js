const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const js = html.match(/<script[\s\S]*?>([\s\S]*?)<\/script>/gi);
let combinedJs = '';
if (js) {
  js.forEach(scriptTag => {
    let content = scriptTag.replace(/<script[\s\S]*?>/, '').replace(/<\/script>/, '');
    combinedJs += content + '\n';
  });
  try {
    new Function(combinedJs);
    console.log("Syntax is valid!");
  } catch (e) {
    console.error("Syntax error in JS: ", e);
  }
}
