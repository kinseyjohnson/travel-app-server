const router = require('express').Router();
const {ForumModel} = require('../models');
const {validateSession} = require('../middleware');


//Create
router.post('/create', validateSession, async (req, res) => {
    const {
        firstName,
        lastName,
        comment,
    } = req.body.forum;

    try {
        const Forum = await ForumModel.create({
            firstName,
            lastName,
            comment,
        });

        res.status(201).json({
            message: "Comment successfully created",
            Forum
        });
    } catch (err) {
        res.status(500).json({
            message: `Failed to create comment ${err}`
        });
    }
});

//Find All
router.get("/all", validateSession, async (req, res) => {
    try {
        const allForum = await ForumModel.findAll();

        res.status(200).json(allForum);
    } catch (err) {
        res.status(500).json({
            error: err,
        });
    }
});


//Find One (need help)
router.get("/:id", validateSession, async (req, res) => {
    try {
        const locatedForum = await ForumModel.findOne({
            where: {
                comment: req.params.forum
            },
        });
        res.status(200).json({
            message: "Forum successfully retrieved",
            locatedForum
        });
    } catch (err) {
        res.status(500).json({
            message: `Failled to review forum: ${err}`
        });
    }
});

router.delete('/delete/:id', validateSession, async (req, res) => {
    try {
        await ForumModel.destroy({
            where: {
                id: req.params.id
            },
        }).then((result) => {
            res.status(200).json({
                message: "Forum successfully deleted",
                deletedForum: result,
            });
        });
        } catch (err) {
            res.status(500).json({
                message: `Failed to delete Forum ${err}`,
            });
        }
    });

//Update
router.put('/update/:id', validateSession, async (req, res) => {
    const {
        firstName,
        lastName,
        comment,
    } = req.body.forum;

    try {
        await ForumModel.update(
            {
                firstName,
                lastName,
                comment,
            },
            { where: {id: req.params.id}, returning: true }
        ).then((result) => {
            res.status(200).json({
                message: "Forum successfully updated",
                updatedDestination: result,
            });
        });
    } catch (err) {
        res.status(500).json({
            message: `Failed to update forum: ${err}`
        });
    }
});


module.exports = router;