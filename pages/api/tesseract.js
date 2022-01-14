import { createWorker } from 'tesseract.js';


const worker = createWorker({
  logger: m => console.log(m)
});


export default async function handler(req, res) {
  let recognizedText = ""
  const fileStr = req.body.data

  if (req.method === "POST") {

    try {
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const { data: { text } } = await worker.recognize(fileStr);
      recognizedText = text
      await worker.terminate();
    } catch (error) {
      console.log('error', error);
    }
    res.status(200).json({ message: recognizedText });
    console.log('backend complete')
  }
}