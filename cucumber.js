module.exports = {
  default: {
    requireModule: ["ts-node/register"],
    require: ["./steps/*.ts"],
    format: [
      "progress-bar",                              // Barra de progreso visual
      "html:reports/cucumber-html-report.html",    // Reporte HTML con Gherkin
      "json:reports/cucumber-report.json",         // JSON para reporte personalizado
      "rerun:reports/rerun.txt",                   // Para re-ejecutar tests fallidos
      "@cucumber/pretty-formatter"                 // Muestra Gherkin en consola de forma bonita
    ],
    formatOptions: {
      snippetInterface: "async-await"
    },
    paths: ["./features/*.feature"],
    publishQuiet: true,
    timeout: 60000 // Aumentar timeout global a 60 segundos
  },
};
