
let model;
const imageUpload = document.getElementById('imageUpload');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

cocoSsd.load().then(loadedModel => {
  model = loadedModel;
  console.log("Modelo COCO-SSD carregado.");
});

imageUpload.addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (!file || !model) return;

  const img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = async () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    const predictions = await model.detect(img);
    predictions.forEach(prediction => {
      ctx.beginPath();
      ctx.rect(...prediction.bbox);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'red';
      ctx.fillStyle = 'red';
      ctx.stroke();
      ctx.fillText(prediction.class + " (" + Math.round(prediction.score * 100) + "%)", prediction.bbox[0], prediction.bbox[1] > 10 ? prediction.bbox[1] - 5 : 10);
    });
  };
});
