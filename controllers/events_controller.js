// DEPENDENCIES
const events = require('express').Router()
const { OP } = require('sequelize')
const db = require('../models')
const { Event, Stage, Set_time, Meet_greet } = db 
   
// FIND ALL Events
events.get('/', async (req, res) => {
    try {
        const foundEvents = await Event.findAll({
            order: [ [ 'available_start_time', 'ASC' ] ],
            where: {
                name: { [Op.like]: `%${req.query.name ? req.query.name : ''}%` },
            },
        })
        res.status(200).json(foundEvents)
    } catch (error) {
        res.status(500).json(error)
    }
})

// FIND A SPECIFIC Event
events.get('/:name', async (req, res) => {
    try {
        const foundEvent = await Event.findOne({
            where: { name: req.params.name }, 
            include: [
                {
                    model: Meet_greet,
                    as: 'meet_greets',
                    include: {
                        model: Stage, 
                        as: 'stage',
                        where: { 
                            name: { 
                                [Op.like]: `%${req.query.name ? req.query.name : ''}%`,
                            },
                        },
                    },
                },
                {
                    model: Set_time,
                    as: 'set_times',
                    include: { 
                        model: Stage, 
                        as: 'stage',
                    where: {
                        name: {
                            [Op.like]: `%${req.query.stage ? req.query.stage : ''}%`,
                        },
                    },
                },
                },
            ]
        })
        res.status(200).json(foundEvent)
    } catch (error) {
        res.status(500).json(error)
    }
})

// CREATE A Event
events.post('/', async (req, res) => {
    try {
        const newEvent = await Event.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new event',
            data: newEvent
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// UPDATE A Event
events.put('/:id', async (req, res) => {
    try {
        const updatedEvents = await Event.update(req.body, {
            where: {
                event_id: req.params.id
            },
        })
        res.status(200).json({
            message: `Successfully updated ${updatedEvents} event(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// DELETE A Event
events.delete('/:id', async (req, res) => {
    try {
        const deletedEvents = await Event.destroy({
            where: {
                event_id: req.params.id
            },
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedEvents} event(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

// EXPORT
module.exports = events