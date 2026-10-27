// Surse: recenzia Cochrane retrasă nu mai e prezentată ca dovadă. Rulare: node tests/surse.test.mjs (static)
import fs from 'node:fs'; import path from 'node:path'; import {fileURLToPath} from 'node:url';
const HERE = path.dirname(fileURLToPath(import.meta.url)); const h = fs.readFileSync(path.join(HERE, '..', 'index.html'), 'utf8');
let ok = 0, bad = 0; const t = (n, c, x) => { if (c) { ok++; console.log('  ok  ', n); } else { bad++; console.log('  FAIL', n, x ?? ''); } };
const blocks = h.match(/Cochrane Database Syst Rev<\\?\/em>, CD002766[^<]*<\\?\/?strong>[^<]*<\\?\/strong>/g) || [];
t('8 limbi: referința Cochrane marcată ca retrasă', (h.match(/CD002766 \(DOI 10\.1002\/14651858\.CD002766\.pub6\) — <\\?\/?strong>/g) || []).length === 8 || blocks.length === 8, blocks.length);
t('nota citează notificarea Cochrane', (h.match(/withdrawn due to serious concerns over the validity of included studies/g) || []).length === 8);
t('fără formularea veche „2016;(5):CD002766"', !/2016;\(5\):CD002766/.test(h));
t('rezumatele nu mai spun că recenzia Cochrane a găsit/nu a găsit dovezi', !/(Cochrane review found no evidence|recenzia Cochrane nu a găsit|revue Cochrane n’a trouvé|revisione Cochrane non ha trovato|revisión Cochrane no halló|revisão Cochrane não encontrou|Cochrane-Review fand keine|Cochrane-áttekintés nem talált)/.test(h));
t('DOI Jain & Mills prezent în 8 limbi', (h.match(/10\.1007\/s12529-009-9062-4/g) || []).length === 8);
const meta = JSON.parse(fs.readFileSync(path.join(HERE, '..', 'app.json'), 'utf8'));
t('versiune 2.0.2', meta.version === '2.0.2');
console.log(`\n${ok} reușite, ${bad} eșuate`); process.exit(bad ? 1 : 0);
