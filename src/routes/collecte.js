const router = require('express').Router();
const db = require('../models');
const verify = require('../middleware/verifyToken');

// Planifier une collecte
router.post('/planifier', verify, async (req, res) => {
    const collecte = {
        projet_collecte_id: req.body.projet_collecte_id,
        collecteur_id: req.body.collecteur_id,
        point_de_collecte: req.body.point_de_collecte,
        date_heure: req.body.date_heure,
        statut: 'planifiée'
    };

    try {
        const savedCollecte = await db.Collecte.create(collecte);
        res.send(savedCollecte);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Mettre à jour le statut de la collecte
router.put('/mettre_a_jour/:collecteId', verify, async (req, res) => {
    try {
        const updatedCollecte = await db.Collecte.update(
            { statut: req.body.statut },
            { where: { id: req.params.collecteId } }
        );
        res.json(updatedCollecte);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Obtenir toutes les collectes pour un collecteur
router.get('/collecteur/:collecteurId', verify, async (req, res) => {
    try {
        const collectes = await db.Collecte.findAll({ where: { collecteur_id: req.params.collecteurId } });
        res.json(collectes);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
