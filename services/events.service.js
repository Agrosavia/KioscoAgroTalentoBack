const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getEvents(name, active) {

    const filter = { where: {} };

    if (name) {
        filter.where.name = {
            contains: name,
            mode: 'insensitive'
        };
    }

    if (active) {
        filter.where.active = active;
    }

    return await prisma.event.findMany(filter);
}

async function getEventById(id) {
    return await prisma.event.findUnique({
        where: {
            id: +id
        }
    });
}

async function createEvent(name, description, active, date, theme, imageUrl) {

    return await prisma.event.create({
        data: {
            name,
            description,
            active: active || false,
            date,
            theme: theme ? { connect: { id: +theme } } : { connect: { id: 1 } },
            image: imageUrl || undefined
        }
    });
}

async function updateEvent(id, name, description, active, date, theme, image) {
    let imageUrl;
    //check if event exists
    const event = await prisma.event.findUnique({
        where: {
            id: +id
        }
    });
    
    const existingImage = event.image;

    console.log(theme)
    return await prisma.event.update({
        where: {
            id: +id
        },
        data: {
            name,
            description,
            active,
            date,
            theme: theme ? { connect: { id: +theme } } : { connect: { id: 1 } },
            image: imageUrl || existingImage || undefined
        }
    });
}

async function deleteEvent(id) {
    return await prisma.event.delete({
        where: {
            id: +id
        }
    });
}

async function getMultimediaForEvent(eventId) {
    return await prisma.event.findUnique({
        where: {
            id: +eventId
        },
        select: {
            multimedias: {
                select: {
                    multimedia: {
                        include: {
                            multimediaType: true
                        }
                    },
                    iconClass: true,
                    isCarrousel: true
                }
            }
        }
    });
}

async function addMultimediaForEvent(eventId, multimediaId, iconClass, isCarrousel, sortingOrder) {
    // check if multimedia exists already for event, if so, check if sorting order is identical
    const multimediaForEvent = await prisma.multimediaOnEvent.findFirst({
        where: {
            eventId: +eventId,
            multimediaId: +multimediaId
        }
    });

    if (multimediaForEvent && multimediaForEvent.sortingOrder === sortingOrder) {
        return multimediaForEvent;
    }
    

    // if sortingOrder is not provided, set it to last available
    if (!sortingOrder) {
        const multimedia = await prisma.event.findUnique({
            where: {
                id: +eventId,
            },
            select: {
                multimedias: {
                    select: {
                        sortingOrder: true,
                    },
                    where: {
                        isCarrousel: isCarrousel
                    }
                    
                }
            }
        });
        console.log(multimedia.multimedias.map(mm => mm.sortingOrder))
        sortingOrder = Math.max(0, ...multimedia.multimedias.map(mm => mm.sortingOrder)) + 1;
    }
    // if sortingOrder is provided, update all other sorting orders
    else {
        const multimedia = await prisma.event.findUnique({
            where: {
                id: +eventId
            },
            select: {
                multimedias: {
                    select: {
                        id: true,
                        sortingOrder: true
                    }
                }
            }
        });
        const multimediaToUpdate = multimedia.multimedias.filter(m => m.sortingOrder >= sortingOrder);
        multimediaToUpdate.forEach(async m => {
            await prisma.multimedia.update({
                where: {
                    id: m.id
                },
                data: {
                    sortingOrder: m.sortingOrder + 1
                }
            });
        });
    }
    return await prisma.event.update({
        where: {
            id: +eventId
        },
        data: {
            multimedias: {
                create: [
                    {
                        multimedia: { connect: { id: +multimediaId } },
                        iconClass,
                        isCarrousel,
                        sortingOrder
                    }
                ]
            }
        }
    });
}

async function deleteMultimediaFromEvent(eventId, multimediaId) {
    // update sorting orders before deleting
    const multimedia = await prisma.event.findUnique({
        where: {
            id: +eventId
        },
        select: {
            multimedias: {
                select: {
                    id: true,
                    sortingOrder: true,
                    multimediaId: true
                }
            }
        }
    });
    const sortingOrder = multimedia.multimedias.find(m => m.multimediaId === +multimediaId).sortingOrder;
    const multimediaToUpdate = multimedia.multimedias.filter(m => m.sortingOrder > sortingOrder);
    multimediaToUpdate.forEach(async m => {
        await prisma.multimediaOnEvent.update({
            where: {
                multimediaId_eventId: {
                    multimediaId: m.multimediaId,
                    eventId: +eventId
                }
            },
            data: {
                sortingOrder: m.sortingOrder - 1
            }
        });
    });
    return await prisma.multimediaOnEvent.deleteMany({
        where: {
            eventId: +eventId,
            multimediaId: +multimediaId
        }
    });
}




module.exports = {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
    getMultimediaForEvent,
    addMultimediaForEvent,
    deleteMultimediaFromEvent
}
