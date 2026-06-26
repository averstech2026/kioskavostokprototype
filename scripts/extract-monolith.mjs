import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const lines = fs.readFileSync(path.join(root, 'index.html'), 'utf8').split(/\r?\n/);

const css1 = lines.slice(31, 907).join('\n'); // inside first <style>
const css2 = lines.slice(3410, 3449).join('\n'); // inside second <style>
const body = lines.slice(909, 1612).join('\n'); // after </head> through wrapper close
const js = lines.slice(1614, 3408).join('\n'); // inside main <script>

const dedent = (text) => text.replace(/^    /gm, '');

const srcDir = path.join(root, 'src');
fs.mkdirSync(srcDir, { recursive: true });
fs.writeFileSync(path.join(srcDir, 'styles.css'), `${css1}\n\n${css2}`);
fs.writeFileSync(path.join(srcDir, '_extracted-body.html'), body);
fs.writeFileSync(path.join(srcDir, '_extracted-app.js'), dedent(js));

console.log('CSS lines:', css1.split('\n').length + css2.split('\n').length);
console.log('Body lines:', body.split('\n').length);
console.log('JS lines:', dedent(js).split('\n').length);
