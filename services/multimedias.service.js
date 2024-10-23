const { PrismaClient } = require('@prisma/client');
const path = require('path');
const azureBlobService = require('./azureBlobService');
const { connect } = require('http2');

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
        const blobName = `${Date.now()}-${path.basename(file.originalname)}`;

        // Use azureBlobService to upload the file to Azure Blob Storage`
        const resultUrl = await azureBlobService.uploadFile('images', file.path, blobName);
        
        // Construct the URL to the file in Blob Storage
        url = resultUrl;
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

    if (multimedia.url && multimedia.multimediaTypeId !== 1) {
        const blobName = path.basename(new URL(multimedia.url).pathname);
        await azureBlobService.deleteFile('images', blobName);
    }

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