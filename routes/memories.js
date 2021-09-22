const express = require("express");
const Memory = require("../models/Memory");
const route = express.Router();
const auth = require("../middleware/auth");
const { body, validationResult } = require("express-validator");
const { cloudinary } = require("../config/cloudinary");
const fs = require("fs");

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

route.post(
    "/",
    [
        auth,
        [
            body("title", "Please enter the title").not().isEmpty(),
            body("desc", "Please enter the Description").not().isEmpty(),
        ],
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }
        const { title, desc, meter, pic } = req.body;
        var photo = {};
        try {
            photo = await cloudinary.uploader.upload(pic, {
                upload_preset: "ml_default",
            });
        } catch (error) {
            res.status(500).send(error);
        }

        try {
            let memory = new Memory({
                title,
                desc,
                meter,
                photo,
                user: req.user,
            });
            console.log({ memory });
            await memory.save();
            res.json(memory);
        } catch (err) {
            console.error(err.message);
            res.status(500).send("server error");
        }
    }
);

route.put("/:id", auth, async (req, res) => {
    const { title, desc, meter, photo } = req.body;

    const newFields = {};
    if (title) newFields.title = title;
    if (photo) newFields.photo = photo;
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
