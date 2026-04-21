const { Given, When, Then } = require('@cucumber/cucumber');
const { request } = require('playwright');

let apiResponse;
let apiContext;

Given('la API base es {string}', async function (url) {
  // 🔥 Forma correcta de crear contexto de API
  apiContext = await request.newContext({
    baseURL: url,
  });
});

// ==================== GET ====================
When('el usuario hace una peticion GET a {string}', async function (endpoint) {
  apiResponse = await apiContext.get(endpoint);
});

// ==================== CREATE ====================
When('el usuario crea un nuevo post con:', async function (dataTable) {
  const data = dataTable.rowsHash();
  apiResponse = await apiContext.post('/posts', {
    data: {
      userId: parseInt(data.userId),
      title: data.title,
      body: data.body
    }
  });
});

// ==================== UPDATE ====================
When('el usuario actualiza el post con ID {int} con:', async function (id, dataTable) {
  const data = dataTable.rowsHash();
  apiResponse = await apiContext.put(`/posts/${id}`, {
    data: {
      id: id,
      userId: parseInt(data.userId),
      title: data.title,
      body: data.body
    }
  });
});

// ==================== DELETE ====================
When('el usuario elimina el post con ID {int}', async function (id) {
  apiResponse = await apiContext.delete(`/posts/${id}`);
});

// ==================== THEN ====================
Then('la respuesta debe tener codigo {int}', async function (statusCode) {
  const actualStatus = apiResponse.status();
  if (actualStatus !== statusCode) {
    throw new Error(`Expected status ${statusCode}, but got ${actualStatus}`);
  }
});

Then('el campo {string} debe ser {int}', async function (field, expectedValue) {
  const body = await apiResponse.json();
  if (body[field] !== expectedValue) {
    throw new Error(`Expected ${field}=${expectedValue}, but got ${body[field]}`);
  }
});

Then('el campo {string} debe ser {string}', async function (field, expectedValue) {
  const body = await apiResponse.json();
  if (body[field] !== expectedValue) {
    throw new Error(`Expected ${field}=${expectedValue}, but got ${body[field]}`);
  }
});

Then('el campo {string} debe ser mayor que {int}', async function (field, minValue) {
  const body = await apiResponse.json();
  if (body[field] <= minValue) {
    throw new Error(`Expected ${field} > ${minValue}, but got ${body[field]}`);
  }
});

Then('la respuesta debe contener al menos {int} posts', async function (minCount) {
  const body = await apiResponse.json();
  if (!Array.isArray(body) || body.length < minCount) {
    throw new Error(`Expected at least ${minCount} posts, but got ${body.length}`);
  }
});