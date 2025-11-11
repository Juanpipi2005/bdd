PARA CORRER TODO USA : 
# Playwright (automatización de navegador)
npm install --save-dev @playwright/test
npx playwright install

# Cucumber (BDD)
npm install --save-dev @cucumber/cucumber

# TypeScript y soporte para Node
npm install --save-dev typescript ts-node @types/node

mkdir features steps pages

npm install --save-dev multiple-cucumber-html-reporter

# PARA CORRER TODO O SOLO LAS DE PEÑA O YO
npm run test:bdd

# Solo ejecutar tests de personaA
npm run test:personaA

# Solo ejecutar tests de personaB
npm run test:personaB

# O usando npx directamente
npx cucumber-js --tags @personaA

npx cucumber-js --tags @personaB

npm run report

start reports/html/index.html
