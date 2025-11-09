Feature: Recuperar contraseña

  @personaB
  Scenario: Acceder a la página de recuperación
    Given que estoy en la página de inicio de sesión de OrangeHRM
    When hago clic en el enlace "Forgot your password?"
    Then debería ver la página con el texto "Reset Password"

