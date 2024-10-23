const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

async function getTags(name) {
    
        const filter = {where: {}};
    
        if (name) {
            filter.where.name = {
                contains: name,
                mode: 'insensitive'
            };
        }
    
        return await prisma.tag.findMany(filter);
}

async function getTagByName(name) {
    return await prisma.tag.findUnique({
        where: {
            name
        }
    });
}

async function createTag(name, verboseName) {

    const existingTag = await getTagByName(name);
    if (existingTag) {
        throw new UniqueFieldViolationException('name');
    }

    return await prisma.tag.create({
        data: {
            name,
            verboseName
        }
    });
}

async function updateTag(id, name, verboseName) {
    return await prisma.tag.update({
        where: {
            id
        },
        data: {
            name,
            verboseName
        }
    });
}

async function deleteTag(id) {
    return await prisma.tag.delete({
        where: {
            id
        }
    });
}

module.exports = {
    getTags,
    getTagByName,
    createTag,
    updateTag,
    deleteTag
};
