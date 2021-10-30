const express = require('express')
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!')
});

//listen to port 3000 by default
app.listen(process.env.PORT || 3000);
 
module.exports = app;