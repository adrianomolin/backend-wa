import storage from './storage';

const bucket = storage.bucket('waiterapp-uploads');

interface FileProps {
  originalname: string,
  buffer: Buffer,
}

export const uploadImage = (file: FileProps) => new Promise((resolve, reject) => {
  const { originalname, buffer } = file;

  const blob = bucket.file(`${Date.now()}-${originalname.replace(/\s/g, '-')}`);
  const blobStream = blob.createWriteStream({
    resumable: false
  });
  blobStream.on('finish', () => {
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    resolve(publicUrl);
  })
    .on('error', (err) => {
      console.log(err);
      reject('Unable to upload image, something went wrong');
    })
    .end(buffer);
});
