const express = require('express');
const bodyParser = require('body-parser');
const db = require('./config');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/api/reservations', reservationRoutes);

const PORT = process.env.PORT || 3000;

db.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
