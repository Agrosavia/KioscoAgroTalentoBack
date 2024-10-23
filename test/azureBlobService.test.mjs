import { expect } from 'chai';
import sinon from 'sinon';

let azureBlobService;

describe('Azure Blob Service', function () {
    let containerClientStub, blockBlobClientStub;

    before(async function () {
        // Mock environment variable for testing purposes
        process.env.AZURE_STORAGE_CONNECTION_STRING = 'DefaultEndpointsProtocol=https;AccountName=mockAccountName;AccountKey=mockAccountKey;EndpointSuffix=core.windows.net';

        // Dynamically import the service after setting the environment variable
        azureBlobService = await import('../services/azureBlobService.js');
    });

    beforeEach(function () {
        // Create stubs for Azure SDK methods
        blockBlobClientStub = {
            uploadFile: sinon.stub().resolves(),
            delete: sinon.stub().resolves()
        };

        containerClientStub = {
            getBlockBlobClient: sinon.stub().returns(blockBlobClientStub)
        };

        // Stub blobServiceClient's getContainerClient method
        sinon.stub(azureBlobService.blobServiceClient, 'getContainerClient').returns(containerClientStub);
    });

    afterEach(function () {
        sinon.restore(); // Restore original methods to clean up after each test
    });

    describe('uploadFile', function () {
        it('should upload a file to Azure Blob Storage', async function () {
            const containerName = 'documents';
            const filePath = '/path/to/file.txt';
            const blobName = 'file.txt';
        
            const result = await azureBlobService.uploadFile(containerName, filePath, blobName);
        
            expect(azureBlobService.blobServiceClient.getContainerClient.calledWith(containerName)).to.be.true;
            expect(containerClientStub.getBlockBlobClient.calledWith(blobName)).to.be.true;
            expect(blockBlobClientStub.uploadFile.calledWith(filePath)).to.be.true;
        
            // Update expected value to use lowercase account name
            expect(result).to.equal(`https://mockaccountname.blob.core.windows.net/documents/${blobName}`);
        });
        
    });

    describe('deleteFile', function () {
        it('should delete a file from Azure Blob Storage', async function () {
            const containerName = 'documents';
            const blobName = 'file.txt';

            await azureBlobService.deleteFile(containerName, blobName);

            expect(azureBlobService.blobServiceClient.getContainerClient.calledWith(containerName)).to.be.true;
            expect(containerClientStub.getBlockBlobClient.calledWith(blobName)).to.be.true;
            expect(blockBlobClientStub.delete.calledOnce).to.be.true;
        });
    });
});
