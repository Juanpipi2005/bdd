Feature: Intentar iniciar sesión con credenciales inválidas

  @personaA
  Scenario: Login con credenciales incorrectas
    Given que estoy en la página de inicio de sesión de OrangeHRM
    When ingreso el usuario "Admin" y la contraseña "contraseña_invalida"
    And hago clic en el botón "Login"
    Then debería ver el mensaje de error "Invalid credentials"
