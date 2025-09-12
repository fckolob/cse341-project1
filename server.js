const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongodb = require('./routes/data/database');

app.use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.error('Failed to connect to the database');
    process.exit(1);
  } else {
    app.listen(port, () => {
      console.log(`Database is connected. Server is running at http://localhost:${port}`);
    });
  }
});
