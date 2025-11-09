Feature: Buscar empleado

  @personaB
  Scenario: Buscar empleado por nombre
    Given que he iniciado sesión correctamente en OrangeHRM
    When navego al módulo "PIM"
    And busco el empleado "Carlos Ruiz"
    Then debería ver resultados que contengan el nombre "Carlos Ruiz"

