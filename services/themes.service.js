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
    banner,
    background,
    logo
) {

    const bannerBlobName = `${Date.now()}-${path.basename(banner.originalname)}`;
    const backgroundBlobName = `${Date.now()}-${path.basename(
        background.originalname
    )}`;
    const logoBlobName = `${Date.now()}-${path.basename(logo.originalname)}`;
    const bannerUrl = await azureBlobService.uploadFile(
        "images",
        banner.path,
        bannerBlobName
    );
    const backgroundUrl = await azureBlobService.uploadFile(
        "images",
        background.path,
        backgroundBlobName
    );
    const logoUrl = await azureBlobService.uploadFile(
        "images",
        logo.path,
        logoBlobName
    );

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

    let bannerUrl = existingTheme.banner;
    let backgroundUrl = existingTheme.background;
    let logoUrl = existingTheme.logo;

    if (banner) {
        const bannerBlobName = `${Date.now()}-${path.basename(banner.originalname)}`;
        bannerUrl = await azureBlobService.uploadFile("images", banner.path, bannerBlobName);
    }

    if (background) {
        const backgroundBlobName = `${Date.now()}-${path.basename(background.originalname)}`;
        backgroundUrl = await azureBlobService.uploadFile("images", background.path, backgroundBlobName);
    }

    if (logo) {
        const logoBlobName = `${Date.now()}-${path.basename(logo.originalname)}`;
        logoUrl = await azureBlobService.uploadFile("images", logo.path, logoBlobName);
    }

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

    await azureBlobService.deleteFile('images', path.basename(new URL(theme.banner).pathname));
    await azureBlobService.deleteFile('images', path.basename(new URL(theme.background).pathname));

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

