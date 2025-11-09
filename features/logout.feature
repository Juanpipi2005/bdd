Feature: Cerrar sesión

  @personaB
  Scenario: Logout exitoso
    Given que he iniciado sesión correctamente en OrangeHRM
    When hago clic en el menú de usuario
    And selecciono la opción "Logout"
    Then debería volver a la página de inicio de sesión
