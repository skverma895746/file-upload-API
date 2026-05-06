const express = require('express');
const Image = require('./model/model');
const path = require('path');
const multer = require('multer');
const uploadFileToImageKit = require('./services/service');


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname , "public")));


const storage = multer.memoryStorage();
const upload = multer({ storage: storage});

//  file/image uploading route to ImageKit and then storing the URL in MongoDB
app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'File is required' });
        }
        const imageUrl = await uploadFileToImageKit(req.file);
        // console.log('Image uploaded successfully:', imageUrl);
        await Image.create({ imageUrl: imageUrl.url,
             caption: req.body.caption });
        res.status(201).json({
             message: 'Image uploaded successfully',
              imageUrl: imageUrl.url });
    }catch (error) {
        console.error('Error uploading file to ImageKit:', error);
        res.status(500).json({ error: 'Internal server error' });
    }


});
// image fetching route to show in preview
app.get('/images', async (req, res) => {
try {
    const images = await Image.find();
    res.status(200).json({
        message: 'Images retrieved successfully',
        data: images
    });
}
catch (error) {
    console.error('Error retrieving images:', error);
    res.status(500).json({ error: 'Internal server error' });
}
});

app.delete('/images/:id', async (req, res) => {
 try { 
        const id = req.params.id;
        const deletedImage = await Image.findByIdAndDelete(id);
        if (!deletedImage) {
            return res.status(404).json({ error: 'Image not found' });
        }
        res.status(200).json({ message: 'Image deleted successfully' });
    } catch (error) {
        console.error('Error deleting image:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = app;
