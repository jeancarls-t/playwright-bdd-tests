Feature: Login

  Background:
    Given que el usuario está en la página de login

  @ui
  Scenario: Login exitoso con credenciales válidas
    When ingresa email "hugooviedo@gmail.com" y contraseña "Password123"
    Then debería ver el mensaje "Welcome to our store"

  @ui
  Scenario: Login exitoso con credenciales válidas
    When ingresa email "hugooviedo@gmail.com" y contraseña "Pas56"
    Then debería ver el mensaje de error "The credentials provided are incorrect"

  @ui
  Scenario: Login exitoso con credenciales válidas
    When ingresa email "oviedo@gmail.com" y contraseña "Password123"
    Then debería ver el mensaje de error "No customer account found"