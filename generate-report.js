const report = require('multiple-cucumber-html-reporter');

report.generate({
  jsonDir: './reports/',
  reportPath: './reports/html/',
  metadata: {
    browser: {
      name: 'chromium',
      version: '130'
    },
    device: 'Local test machine',
    platform: {
      name: 'Windows',
      version: '11'
    }
  },
  customData: {
    title: 'Pruebas Automatizadas OrangeHRM',
    data: [
      { label: 'Proyecto', value: 'OrangeHRM BDD Tests' },
      { label: 'Versión', value: '1.0.0' },
      { label: 'Ciclo', value: 'Entrega 4' },
      { label: 'Ejecutado por', value: 'Equipo QA' }
    ]
  }
});

console.log('✅ Reporte HTML generado en: reports/html/index.html');
