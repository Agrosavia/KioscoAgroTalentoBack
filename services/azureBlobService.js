const fs = require('fs');
const path = require('path');

const uploadFolder = 'uploads/'; 


if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder, { recursive: true });
}

async function deleteFile(blobName) {
    const filePath = path.join(uploadFolder, blobName);
    console.log('Deleting file:', filePath);

    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            console.log('File deleted successfully');
        } else {
            console.log('File not found');
        }
    } catch (error) {
        console.error('Error deleting file:', error);
        throw new Error('File deletion failed');
    }
}

module.exports = { deleteFile };
