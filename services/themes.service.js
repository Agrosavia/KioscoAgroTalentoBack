const { PrismaClient } = require("@prisma/client");
const path = require("path");
const azureBlobService = require("./azureBlobService");

const prisma = new PrismaClient();

async function getThemes(name) {
    const filter = { where: {} };

    if (name) {
        filter.where.name = {
            contains: name,
            mode: "insensitive",
        };
    }

    return await prisma.theme.findMany(filter);
}

async function createTheme(
    name,
    primaryColor,
    secondaryColor,
    tertiaryColor,
    bannerUrl,
    backgroundUrl,
    logoUrl
) {

    return await prisma.theme.create({
        data: {
            name,
            primaryColor,
            secondaryColor,
            tertiaryColor,
            banner: bannerUrl,
            background: backgroundUrl,
            logo: logoUrl,
        },
    });
}


async function getThemeById(id) {
    return await prisma.theme.findUnique({
        where: {
            id: +id,
        },
    });
}

async function updateTheme(
    id,
    name,
    primaryColor,
    secondaryColor,
    tertiaryColor,
    banner,
    background,
    logo
) {
    const existingTheme = await getThemeById(id);
    if (!existingTheme) {
        throw new Error("Theme not found");
    }

    let bannerUrl = banner ?? existingTheme.banner;
    let backgroundUrl = background ?? existingTheme.background;
    let logoUrl = logo ?? existingTheme.logo;

    return await prisma.theme.update({
        where: {
            id: +id,
        },
        data: {
            name,
            primaryColor,
            secondaryColor,
            tertiaryColor,
            banner: bannerUrl,
            background: backgroundUrl,
            logo: logoUrl,
        },
    });
}


async function deleteTheme(id) {
    // Delete the files from Azure Blob Storage
    const theme = await prisma.theme.findUnique({
        where: {
            id: +id,
        },
    });

    if (!theme) {
        throw new Error("Theme not found");
    }

    return await prisma.theme.delete({
        where: {
            id: +id,
        },
    });
}


module.exports = {
    getThemes,
    createTheme,
    getThemeById,
    updateTheme,
    deleteTheme,
};

