// netlify/functions/counter.js
const fs = require('fs');
const path = require('path');

// archivo JSON que guarda el contador
const COUNTER_FILE = path.join(__dirname, 'counter.json');

// función handler
exports.handler = async function(event, context) {
  let counter = 0;

  try {
    // lee el JSON si existe
    if (fs.existsSync(COUNTER_FILE)) {
      const data = fs.readFileSync(COUNTER_FILE, 'utf8');
      counter = JSON.parse(data).value || 0;
    }

    // incrementa
    counter++;

    // guarda el nuevo valor
    fs.writeFileSync(COUNTER_FILE, JSON.stringify({ value: counter }));

  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'No se pudo actualizar contador' })
    }
  }

  // devuelve el contador actualizado
  return {
    statusCode: 200,
    body: JSON.stringify({ value: counter })
  }
}
