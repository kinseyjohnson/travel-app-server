const router = require('express').Router();
const {DestinationModel} = require('../models');
const {validateSession} = require('../middleware');


//Create
router.post('/create', validateSession, async (req, res) => {
    const {
        city,
        country,
        attractions,
        notes, 
        rating
    } = req.body.destination;

    try {
        const Destination = await DestinationModel.create({
            city,
            country,
            attractions,
            notes,
            rating
        });

        res.status(201).json({
            message: "Destination successfully created",
            Destination
        });
    } catch (err) {
        res.status(500).json({
            message: `Failed to create destination: ${err}`
        });
    }
});

//Find All
router.get("/all", validateSession, async (req, res) => {
    try {
        const allDestinations = await DestinationModel.findAll();

        res.status(200).json(allDestinations);
    } catch (err) {
        res.status(500).json({
            error: err,
        });
    }
});

//Find One (need help)
router.get("/:city", validateSession, async (req, res) => {
    try {
        const locatedCity = await DestinationModel.findOne({
            where: {
                city: req.params.city
            },
        });
        res.status(200).json({
            message: "Destination successfully retrieved",
            locatedCity
        });
    } catch (err) {
        res.status(500).json({
            message: `Failled to review destination: ${err}`
        });
    }
});

//Delete
router.delete('/delete/:id', validateSession, async (req, res) => {
    try {
        await DestinationModel.destroy({
            where: {
                id: req.params.id
            },
        }).then((result) => {
            res.status(200).json({
                message: "Destination successfully deleted",
                deletedDestination: result,
            });
        });
        } catch (err) {
            res.status(500).json({
                message: `Failed to delete destination ${err}`,
            });
        }
    });

//Update
router.put('/update/:id', validateSession, async (req, res) => {
    const {
        city,
        country,
        attractions,
        notes, 
        rating
    } = req.body.destination;

    try {
        await DestinationModel.update(
            {
                city,
                country,
                attractions,
                notes,
                rating
            },
            { where: {id: req.params.id}, returning: true }
        ).then((result) => {
            res.status(200).json({
                message: "Destination successfully updated",
                updatedDestination: result,
            });
        });
    } catch (err) {
        res.status(500).json({
            message: `Failed to update destination: ${err}`
        });
    }
});

module.exports = router;