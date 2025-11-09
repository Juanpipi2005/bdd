Feature: Intentar iniciar sesión con campos vacíos

  @personaA
  Scenario: Login sin ingresar datos
    Given que estoy en la página de inicio de sesión de OrangeHRM
    When hago clic en el botón "Login"
    Then debería ver el mensaje de error "Required"
