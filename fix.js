const fs = require('fs');
let html = fs.readFileSync('valnera-plus.html', 'utf8');

html = html.replace(/<div class="card-icon">.*?<\/div>\s*<h3 class="card-title">AI Tools<\/h3>/g, '<div class="card-icon">?</div>\n                    <h3 class="card-title">AI Tools</h3>');
html = html.replace(/<div class="card-icon">.*?<\/div>\s*<h3 class="card-title">Productivity<\/h3>/g, '<div class="card-icon\">?</div>\n                    <h3 class="card-title">Productivity</h3>');
html = html.replace(/<div class="card-icon">.*?<\/div>\s*<h3 class="card-title">Entertainment<\/h3>/g, '<div class="card-icon">?</div>\n                    <h3 class="card-title">Entertainment</h3>');

html = html.replace(/<span class="check-icon">.*?<\/span>/g, '<span class="check-icon">?</span>');
html = html.replace(/<span class="check" style="color:var\(--color-blue\)">.*?<\/span>/g, '<span class="check" style="color:var(--color-blue)">?</span>');

html = html.replace(/<div class="b-icon">.*?<\/div>\s*<h3 class="b-title">Transparansi Paket<\/h3>/g, '<div class="b-icon">??</div>\n                    <h3 class="b-title">Transparansi Paket</h3>');
html = html.replace(/<div class="b-icon">.*?<\/div>\s*<h3 class="b-title">Trust Layer<\/h3>/g, '<div class="b-icon">??</div>\n                    <h3 class="b-title">Trust Layer</h3>');
html = html.replace(/<div class="b-icon">.*?<\/div>\s*<h3 class="b-title">Akses Bertanggung Jawab<\/h3>/g, '<div class="b-icon">???</div>\n                    <h3 class="b-title">Akses Bertanggung Jawab</h3>');
html = html.replace(/<div class="b-icon">.*?<\/div>\s*<h3 class="b-title">Proses Lebih Rapi<\/h3>/g, '<div class="b-icon">?</div>\n                    <h3 class="b-title">Proses Lebih Rapi</h3>');

fs.writeFileSync('valnera-plus.html', html, 'utf8');
console.log('Fixed');
