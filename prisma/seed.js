const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function createMultimediatypes() {
    // delete all multimedia types
    await prisma.multimediaType.deleteMany();
    const youtubeVideo = await prisma.multimediaType.create({
        data: {
            id: 1,
            name: 'YOUTUBE_VIDEO',
            verboseName: 'Video Youtube',
            iconClass: 'fa-brands fa-youtube'
        }
    })
    const image = await prisma.multimediaType.create({
        data: {
            id: 2,
            name: 'IMAGE',
            verboseName: 'Imagen',
            iconClass: 'fa-solid fa-image'
        }
    })
    const file = await prisma.multimediaType.create({
        data: {
            id: 3,
            name: 'FILE',
            verboseName: 'Archivo',
            iconClass: 'fa-solid fa-file-pdf'
        }
    })
}

async function createThemes() {
    // delete all themes
    await prisma.theme.deleteMany();
    const defaultTheme = await prisma.theme.create({
        data: {
            id: 1,
            name: 'DEFAULT',
            primaryColor: '#079646',
            secondaryColor: '#0F5AA3',
            tertiaryColor: '#F7F7F7',
            banner: 'static/1741020063030-banneragrotalento.jpeg.jpeg',
            logo: 'static/1741020085652-logo agrosavia white.png.png',
            background: 'static/1741020041603-backgroundagro.png.png',
        }
    })
}

async function createTags() {
    await prisma.tag.deleteMany();
    const tag1 = await prisma.tag.create({
        data: {
            id: 1,
            name: 'papa',
            verboseName: 'Papa',
        }
    })
    const tag2 = await prisma.tag.create({
        data: {
            id: 2,
            name: 'fruit',
            verboseName: 'Frutas',
        }
    })
    const tag3 = await prisma.tag.create({
        data: {
            id: 3,
            name: 'vegetable',
            verboseName: 'Vegetales',
        }
    })
    const tag4 = await prisma.tag.create({
        data: {
            id: 4,
            name: 'tomato',
            verboseName: 'Tomate',
        }
    })
    const tag5 = await prisma.tag.create({
        data: {
            id: 5,
            name: 'bzzz',
            verboseName: 'Apicultura',
        }
    })
    const tag6 = await prisma.tag.create({
        data: {
            id: 6,
            name: 'soil',
            verboseName: 'Suelo',
        }
    })
    const tag7 = await prisma.tag.create({
        data: {
            id: 7,
            name: 'grain',
            verboseName: 'Granos',
        }
    })
}

async function main() {
    console.log('Seeding multimedia types...')
    await createMultimediatypes()
    console.log('Multimedia types seeded!')

    console.log('Seeding themes...')
    await createThemes()
    console.log('Themes seeded!')

    console.log('Seeding tags...')
    await createTags()
    console.log('Tags seeded!')

}

main()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
