const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

// Crear una reserva
router.post('/', async (req, res) => {
    try {
        const reservation = await Reservation.create(req.body);
        res.status(201).json(reservation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obtener todas las reservas
router.get('/', async (req, res) => {
    try {
        const reservations = await Reservation.findAll();
        res.status(200).json(reservations);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Obtener una reserva por ID
router.get('/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findByPk(req.params.id);
        if (reservation) {
            res.status(200).json(reservation);
        } else {
            res.status(404).json({ error: 'Reservation not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Actualizar una reserva
router.put('/:id', async (req, res) => {
    try {
        const reservation = await Reservation.update(req.body, {
            where: { id: req.params.id }
        });
        res.status(200).json(reservation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Eliminar una reserva
router.delete('/:id', async (req, res) => {
    try {
        await Reservation.destroy({
            where: { id: req.params.id }
        });
        res.status(204).end();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
