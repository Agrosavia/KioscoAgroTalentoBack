import { expect } from 'chai';
import sinon from 'sinon';
import * as multimediaService from '../services/multimedias.service.js'; // Ensure this path is correct
import { PrismaClient } from '@prisma/client';
import * as azureBlobService from '../services/azureBlobService.js';

describe('Multimedia Service', function () {
    let prismaClientStub, prismaMultimediaStub, uploadFileStub, deleteFileStub;

    before(function () {
        // Mock environment variable for testing purposes
        process.env.AZURE_STORAGE_CONNECTION_STRING = 'DefaultEndpointsProtocol=https;AccountName=mockAccountName;AccountKey=mockAccountKey;EndpointSuffix=core.windows.net';

        // Create a stub for Prisma Client
        prismaClientStub = {
            multimedia: {
                findMany: sinon.stub().resolves([]),
                findUnique: sinon.stub().resolves(null),
                create: sinon.stub().resolves({}),
                update: sinon.stub().resolves({}),
                delete: sinon.stub().resolves({})
            }
        };

        // Replace Prisma Client instance in multimediaService with the stub
        sinon.stub(multimediaService, 'prisma').value(prismaClientStub);

        // Stub Azure Blob Service methods
        uploadFileStub = sinon.stub(azureBlobService, 'uploadFile').resolves('https://mockaccountname.blob.core.windows.net/documents/file.txt');
        deleteFileStub = sinon.stub(azureBlobService, 'deleteFile').resolves();
    });

    after(function () {
        sinon.restore(); // Restore original methods to clean up after tests
    });

    describe('getMultimedias', function () {
        it('should retrieve multimedia items with filters', async function () {
            const filter = {
                tipoMultimedia: 'video',
                url: 'http://example.com',
                iconClass: 'icon',
                tags: ['tag1', 'tag2']
            };

            prismaClientStub.multimedia.findMany.resolves([{ id: 1, ...filter }]);

            const result = await multimediaService.getMultimedias('video', 'http://example.com', 'icon', ['tag1', 'tag2']);

            expect(prismaClientStub.multimedia.findMany.calledOnce).to.be.true;
            expect(result).to.deep.equal([{ id: 1, ...filter }]);
        });
    });

    describe('getMultimediaById', function () {
        it('should retrieve multimedia by ID', async function () {
            const id = 1;
            const multimediaItem = { id, name: 'Item' };

            prismaClientStub.multimedia.findUnique.resolves(multimediaItem);

            const result = await multimediaService.getMultimediaById(id);

            expect(prismaClientStub.multimedia.findUnique.calledWith({ where: { id } })).to.be.true;
            expect(result).to.equal(multimediaItem);
        });
    });

    describe('createMultimedia', function () {
        it('should create multimedia and upload file if provided', async function () {
            const multimediaData = {
                name: 'New Multimedia',
                multimediaType: 'video',
                iconClass: 'icon',
                tagNames: ['tag1', 'tag2'],
                url: 'http://example.com',
                file: { path: '/path/to/file.txt', originalname: 'file.txt' }
            };

            const createdItem = { id: 1, ...multimediaData };

            prismaClientStub.multimedia.create.resolves(createdItem);

            const result = await multimediaService.createMultimedia(
                multimediaData.name,
                multimediaData.multimediaType,
                multimediaData.iconClass,
                multimediaData.tagNames,
                multimediaData.url,
                multimediaData.file
            );

            expect(uploadFileStub.calledOnce).to.be.true;
            expect(prismaClientStub.multimedia.create.calledOnce).to.be.true;
            expect(result).to.deep.equal(createdItem);
        });

        it('should create multimedia without uploading file', async function () {
            const multimediaData = {
                name: 'New Multimedia',
                multimediaType: 'video',
                iconClass: 'icon',
                tagNames: ['tag1', 'tag2'],
                url: 'http://example.com',
                file: null
            };

            const createdItem = { id: 1, ...multimediaData };

            prismaClientStub.multimedia.create.resolves(createdItem);

            const result = await multimediaService.createMultimedia(
                multimediaData.name,
                multimediaData.multimediaType,
                multimediaData.iconClass,
                multimediaData.tagNames,
                multimediaData.url,
                multimediaData.file
            );

            expect(uploadFileStub.notCalled).to.be.true;
            expect(prismaClientStub.multimedia.create.calledOnce).to.be.true;
            expect(result).to.deep.equal(createdItem);
        });
    });

    describe('updateMultimedia', function () {
        it('should update multimedia details', async function () {
            const id = 1;
            const updateData = { name: 'Updated Multimedia', url: 'http://newexample.com' };

            prismaClientStub.multimedia.update.resolves({ id, ...updateData });

            const result = await multimediaService.updateMultimedia(id, updateData.name, updateData.url, updateData.iconClass, []);

            expect(prismaClientStub.multimedia.update.calledWith({
                where: { id },
                data: updateData
            })).to.be.true;
            expect(result).to.deep.equal({ id, ...updateData });
        });
    });

    describe('deleteMultimedia', function () {
        it('should delete multimedia and the associated file', async function () {
            const id = 1;
            const multimediaItem = { id, url: 'https://mockaccountname.blob.core.windows.net/documents/file.txt', multimediaTypeId: 2 };

            prismaClientStub.multimedia.findUnique.resolves(multimediaItem);
            prismaClientStub.multimedia.delete.resolves(multimediaItem);

            const result = await multimediaService.deleteMultimedia(id);

            expect(prismaClientStub.multimedia.findUnique.calledWith({ where: { id } })).to.be.true;
            expect(deleteFileStub.calledOnce).to.be.true;
            expect(prismaClientStub.multimedia.delete.calledWith({ where: { id } })).to.be.true;
            expect(result).to.deep.equal(multimediaItem);
        });

        it('should delete multimedia without deleting the file if multimediaTypeId is 1', async function () {
            const id = 1;
            const multimediaItem = { id, url: 'https://mockaccountname.blob.core.windows.net/documents/file.txt', multimediaTypeId: 1 };

            prismaClientStub.multimedia.findUnique.resolves(multimediaItem);
            prismaClientStub.multimedia.delete.resolves(multimediaItem);

            const result = await multimediaService.deleteMultimedia(id);

            expect(prismaClientStub.multimedia.findUnique.calledWith({ where: { id } })).to.be.true;
            expect(deleteFileStub.notCalled).to.be.true;
            expect(prismaClientStub.multimedia.delete.calledWith({ where: { id } })).to.be.true;
            expect(result).to.deep.equal(multimediaItem);
        });
    });
});
