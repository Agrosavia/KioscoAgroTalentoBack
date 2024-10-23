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
            banner: 'https://kioscostorage.blob.core.windows.net/images/banner-agrosavia.jpg',
            logo: 'https://kioscostorage.blob.core.windows.net/images/logo-agrosavia.png',
            background: 'https://kioscostorage.blob.core.windows.net/images/bg-agrosavia.png',
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

async function createMultimedias() {
    await prisma.multimedia.deleteMany();
    const multimedia = await prisma.multimedia.create({
        data: {
            name: 'Imagen de Prueba 1',
            url: 'https://kioscostorage.blob.core.windows.net/images/1725227278066-istockphoto-153737841-612x612.jpg',
            multimediaType: { connect: { id: 2 } },
            tags: {
                connect: [
                    { id: 7 }
                ]
            }
        }
    })
    const multimedia2 = await prisma.multimedia.create({
        data: {
            name: 'Imagen de Prueba 2',
            url: 'https://kioscostorage.blob.core.windows.net/images/1725227278066-istockphoto-153737841-612x612.jpg',
            multimediaType: { connect: { id: 2 } },
            tags: {
                connect: [
                    { id: 7 }
                ]
            }
        }
    })
    const multimedia3 = await prisma.multimedia.create({
        data: {
            name: 'Imagen de Prueba 3',
            url: 'https://kioscostorage.blob.core.windows.net/images/1725227278066-istockphoto-153737841-612x612.jpg',
            multimediaType: { connect: { id: 2 } },
            tags: {
                connect: [
                    { id: 7 }
                ]
            }
        }
    })

    
    const videoFresa1 = await prisma.multimedia.create({
        data: {
            name: 'Video de Fresa 1',
            url: 'https://www.youtube.com/watch?v=6v2L2UGZJAM',
            multimediaType: { connect: { id: 1 } },
            tags: {
                connect: [
                    { id: 2 }
                ]
            }
        }
    })
    
    const videoFresa2 = await prisma.multimedia.create({
        data: {
            name: 'Video de Fresa 2',
            url: 'https://www.youtube.com/watch?v=MMCbCvZ2pnU',
            multimediaType: { connect: { id: 1 } },
            tags: {
                connect: [
                    { id: 2 }
                ]
            }
        }
    })
    
    const videoPapa1 = await prisma.multimedia.create({
        data: {
            name: 'Video de Papa 1',
            url: 'https://www.youtube.com/watch?v=XAWaTo4PHig',
            multimediaType: { connect: { id: 1 } },
            tags: {
                connect: [
                    { id: 1 }
                ]
            }
        }
    })
    
    const videoPapa2 = await prisma.multimedia.create({
        data: {
            name: 'Video de Papa 2',
            url: 'https://www.youtube.com/watch?v=ZAWdrJ_pO30',
            multimediaType: { connect: { id: 1 } },
            tags: {
                connect: [
                    { id: 1 }
                ]
            }
        }
    })

    const imgTrigo1 = await prisma.multimedia.create({
        data: {
            name: 'Imagen de Trigo 1',
            url: 'https://kioscostorage.blob.core.windows.net/images/1725227887445-istockphoto-479629438-612x612.jpg',
            multimediaType: { connect: { id: 2 } },
            tags: {
                connect: [
                    { id: 7 }
                ]
            }
        }
    })
    const imgTrigo2 = await prisma.multimedia.create({
        data: {
            name: 'Imagen de Trigo 2',
            url: 'https://kioscostorage.blob.core.windows.net/images/1725227887445-istockphoto-479629438-612x612.jpg',
            multimediaType: { connect: { id: 2 } },
            tags: {
                connect: [
                    { id: 7 }
                ]
            }
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

    console.log('Seeding multimedia...')
    await createMultimedias()
    console.log('Multimedia seeded!')
}

main()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
