const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

async function getMultimediaTypes(tipoMultimedia, url, iconClass, tags) {
    const filter = {where: {}};

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

    if (tags?.length > 0) {
        // check if any tag name contained in the tags array is present in the multimedia tags
        filter.where.tags = {
            some: {
                name: {
                    in: tags
                }
            }
        }
    }
    
    return await prisma.multimediaType.findMany(filter);
}

async function getMultimediaTypeById(id) {
    return await prisma.multimediaType.findUnique({
        where: {
            id
        }
    });
}


module.exports = {
    getMultimediaTypes,
    getMultimediaTypeById
};