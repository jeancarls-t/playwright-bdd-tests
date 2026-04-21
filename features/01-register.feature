Feature: Registro de usuario

  Background:
    Given que el usuario está en la página de registro

  @ui
  Scenario: Registro exitoso con datos válidos
    When ingresa los siguientes datos:
      | Genero   | Masculino |
      | Nombre   | Juan      |
      | Apellido | Perez     |
      | Email    | Puan.jerez@test.com |
      | Password | Password123 |
    Then debería ver el mensaje "Your registration completed"

  @ui
  Scenario: Registro existente con datos válidos
    When ingresa los siguientes datos:
      | Genero   | Masculino |
      | Nombre   | Juan      |
      | Apellido | Perez     |
      | Email    | juan.perez@test.com |
      | Password | Password123 |
    Then debería ver el mensaje de error "The specified email already exists"