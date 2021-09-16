const express = require("express");
const Memory = require("../models/Memory");
const route = express.Router();
const auth = require("../middleware/auth");
const { body, validationResult } = require("express-validator");
const multer = require("multer");

route.get("/", auth, async (req, res) => {
    try {
        const memories = await Memory.find({
            user: req._id,
        }).sort({
            date: -1,
        });
        res.json(memories);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

route.get("/:id", auth, async (req, res) => {
    try {
        let memory = await Memory.findById(req.params.id);

        if (!memory) {
            return res.status(404).json({
                msg: "Not Found",
            });
        }
        if (memory._id.toString() !== req.params.id) {
            return res.status(401).json({
                msg: "Not authorized",
            });
        }

        res.json(memory);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname);
    },
});

const upload = multer({
    storage: fileStorageEngine,
});

route.post(
    "/",
    [
        auth,
        // [
        //     body("title", "Please enter the title").not().isEmpty(),
        //     body("desc", "Please enter the Description").not().isEmpty(),
        // ],
    ],
    upload.array("photos", 10),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }

        const photos = req.files;

        const { title, desc, meter } = req.body;

        try {
            let memory = new Memory({
                title,
                desc,
                meter,
                photos,
                user: req.id,
            });

            await memory.save();
            res.json(memory);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("server error");
        }
    }
);

route.put("/:id", auth, async (req, res) => {
    const { title, desc, meter } = req.body;

    const newFields = {};
    if (title) newFields.title = title;
    if (desc) newFields.desc = desc;
    if (meter) newFields.meter = meter;

    try {
        let memory = await Memory.findById(req.params.id);

        if (!memory) {
            return res.status(404).json({
                msg: "Not Found",
            });
        }
        if (memory._id.toString() !== req.params.id) {
            return res.status(401).json({
                msg: "Not authorized",
            });
        }

        memory = await Memory.findByIdAndUpdate(
            req.params.id,
            {
                $set: newFields,
            },
            {
                new: true,
            }
        );

        res.json(memory);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

route.delete("/:id", auth, async (req, res) => {
    try {
        let memory = await Memory.findById(req.params.id);

        if (!memory) {
            return res.status(404).json({
                msg: "Not Found",
            });
        }

        if (memory._id.toString() !== req.params.id) {
            return res.status(401).json({
                msg: "Not authorized",
            });
        }

        await Memory.findByIdAndRemove(req.params.id);

        res.json({
            msg: "Contact removed",
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

module.exports = route;
