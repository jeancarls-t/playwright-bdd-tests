@api
Feature: JSONPlaceholder API Tests

  Background:
    Given la API base es "https://jsonplaceholder.typicode.com"

  @api
  Scenario: Obtener un post existente
    When el usuario hace una peticion GET a "/posts/1"
    Then la respuesta debe tener codigo 200
    And el campo "userId" debe ser 1
    And el campo "id" debe ser 1

  @api
  Scenario: Obtener todos los posts
    When el usuario hace una peticion GET a "/posts"
    Then la respuesta debe tener codigo 200
    And la respuesta debe contener al menos 100 posts

  @api
  Scenario: Crear un nuevo post
    When el usuario crea un nuevo post con:
      | userId | 1 |
      | title | Test Post |
      | body | This is a test post |
    Then la respuesta debe tener codigo 201
    And el campo "id" debe ser mayor que 100

  @api
  Scenario: Actualizar un post existente
    When el usuario actualiza el post con ID 1 con:
      | userId | 1 |
      | title | Updated Title |
      | body | Updated body content |
    Then la respuesta debe tener codigo 200
    And el campo "title" debe ser "Updated Title"

  @api
  Scenario: Eliminar un post existente
    When el usuario elimina el post con ID 1
    Then la respuesta debe tener codigo 200