const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function getMultimedias(tipoMultimedia, url, iconClass, tags, fetchRelated) {
    const filter = { where: {} };

    if (tipoMultimedia) {
        filter.where.tipoMultimedia = {
            contains: tipoMultimedia,
            mode: 'insensitive'
        };
    }

    if (url) {
        filter.where.url = {
            contains: url,
            mode: 'insensitive'
        };
    }

    if (iconClass) {
        filter.where.iconClass = {
            contains: iconClass,
            mode: 'insensitive'
        };
    }

    if (tags.length > 0) {
        // check if any tag name contained in the tags array is present in the multimedia tags
        filter.where.tags = {
            some: {
                name: {
                    in: tags
                }
            }
        }
    }
    return await prisma.multimedia.findMany({...filter, include: fetchRelated ? {
        tags: true,
        multimediaType: true
    } : {}});
}

async function getMultimediaById(id) {
    return await prisma.multimedia.findUnique({
        where: {
            id
        },
        include: {
            tags: true,
            multimediaType: true
        }
    });
}

async function createMultimedia(name, multimediaType, tagIds, url, file) {
    if (file) {
        // Construct the URL to the file in Blob Storage
        url = file.filename;
    }
    
    return await prisma.multimedia.create({
        data: {
            multimediaType: {
                connect: {
                    id: +multimediaType
                }
            },
            url,
            name,
            tags: {
                connect: tagIds.map(tagId => ({
                    id: +tagId
                }))
            }
        }
    });
}

async function updateMultimedia(id, name, tipoMultimedia, url, iconClass, tagIds) {
    return await prisma.multimedia.update({
        where: {
            id
        },
        data: {
            name,
            tipoMultimedia,
            url,
            iconClass,
            tags: {
                set: tagIds.map(tagId => ({
                    id: +tagId
                }))
            }
        }
    });
}

async function deleteMultimedia(id) {
    // Delete the file from Azure Blob Storage
    const multimedia = await prisma.multimedia.findUnique({
        where: {
            id: +id
        }
    });

    console.log(multimedia);

    return await prisma.multimedia.delete({
        where: {
            id: +id
        }
    });
}

module.exports = {
    getMultimedias,
    createMultimedia,
    getMultimediaById,
    updateMultimedia,
    deleteMultimedia
};
