// utils/reset-project.js
const fs = require('fs');
const path = require('path');

const APP_DIR = path.resolve(__dirname, '../app');
const EXAMPLE_DIR = path.resolve(__dirname, '../app-example');

function reset() {
    if (fs.existsSync(EXAMPLE_DIR)) {
        console.error('❌ app-example existiert bereits. Bitte zuerst löschen.');
        process.exit(1);
    }

    if (!fs.existsSync(APP_DIR)) {
        console.error('❌ Kein app-Verzeichnis zum Reset gefunden.');
        process.exit(1);
    }

    // Umbenennen
    fs.renameSync(APP_DIR, EXAMPLE_DIR);
    console.log('✅ Bestehendes app-Verzeichnis nach app-example verschoben.');

    // Neues leeres app-Verzeichnis erstellen
    fs.mkdirSync(APP_DIR);
    fs.writeFileSync(
        path.join(APP_DIR, 'index.tsx'),
        `// Neue leere Startseite\nexport default function Index() {\n  return null;\n}\n`
    );
    console.log('✅ Neues leeres app-Verzeichnis mit index.tsx erstellt.');
}

reset();
