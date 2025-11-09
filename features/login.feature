Feature: Inicio de sesión exitoso en OrangeHRM

  @personaA
  Scenario: Login exitoso
    Given que estoy en la página de inicio de sesión de OrangeHRM
    When ingreso el usuario "Admin" y la contraseña "admin123"
    And hago clic en el botón "Login"
    Then debería ver el panel de control con el título "Dashboard"
