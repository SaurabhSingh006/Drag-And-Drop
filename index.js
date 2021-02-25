
const input = document.querySelector('.drop-zone--input');
const dropZoneElement = document.querySelector('.drop-zone');
const prompt = document.querySelector('.drop-zone__prompt');
const events = ["dragleave", "dragend"]; 

dropZoneElement.addEventListener('click', () => {  
  input.click();
});
input.addEventListener('change', () => {
  if(input.files.length) {
    updateThumbnail(input.files[0]);
  }
});

dropZoneElement.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropZoneElement.classList.add("drop-zone--over");
});  

events.forEach(event => {
  dropZoneElement.addEventListener(event, () => {
    dropZoneElement.classList.remove("drop-zone--over");
  });  
});

dropZoneElement.addEventListener('drop', (e) => {
  e.preventDefault();
  
  if(e.dataTransfer.files.length) {
    input.files = e.dataTransfer.files;
    updateThumbnail(e.dataTransfer.files[0]);

    dropZoneElement.classList.remove('drop-zone--over');
  }
});

function updateThumbnail(file) {
  let thumbnail = dropZoneElement.querySelector('.drop-zone__thumb');

  if(prompt) {
    prompt.remove();
  }

  if(!thumbnail) {
    thumbnail = document.createElement('div');
    thumbnail.classList.add('drop-zone__thumb');
    dropZoneElement.appendChild(thumbnail);
  }  

  thumbnail.dataset.label = file.name;

  if(file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      thumbnail.style.backgroundImage = `url('${reader.result}')`;
    }
  } else {
    thumbnail.style.backgroundImage = null;  
  }
}