import { google } from 'googleapis';
import formidable from 'formidable';

const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: ['https://www.googleapis.com/auth/drive.file'],
});

const drive = google.drive({
  version: 'v3',
  auth,
});

export default async (req, res) => {
  const form = formidable({ multiples: true });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error uploading file' });
    } else {
      const { name, path: filePath, type } = files.file;
      const fileMetadata = { name };
      const media = {
        mimeType: type,
        body: require('fs').createReadStream(filePath),
      };
      try {
        const { data } = await drive.files.create({
          resource: fileMetadata,
          media,
          fields: 'id',
        });
        console.log(`File uploaded: ${data.id}`);
        res.status(200).json({ message: 'File uploaded successfully' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error uploading file to Google Drive' });
      }
    }
  });
};
