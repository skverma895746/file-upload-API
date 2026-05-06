const form = document.getElementById("uploadForm");
const preview = document.getElementById("preview-container");
const msg = document.getElementById("msg");


 async function UploadImage(e) {
        e.preventDefault();
    // 🔥 Direct form se data uthao
    const formData = new FormData(form);
    try {
        const res = await fetch("http://localhost:3000/upload", {
            method: "POST",
            body: formData,
            headers: {
                "accept": "application/json"
            }
        });
       
         // पहले JSON लो
        const data = await res.json();
        if (!res.ok) {
            msg.textContent = data.message || "Upload failed!";
            clearMessage();
            return;
        }
        else {
        
            msg.textContent = `${data.message}`;
            clearMessage();
            form.reset();
            PreviewImage(); // 🔥
        }
    } 
    catch(err)
     {
        console.log("ERROR:", err); // 🔥 MUST
        msg.textContent = "An error occurred!";
    }
}


async function PreviewImage() {
    const res = await fetch("http://localhost:3000/images");
    const data = await res.json();
    console.log("Preview Data:", data); // 🔥
    if (!res.ok) {
        msg.textContent = data.message || "Failed to load images!";
    }
        else {
            let html = "";         
           data.data.forEach((item) => {        
           html += `<div class="image-item">
          <img src="${item.imageUrl}" alt="Image Preview"> 
           <p id="caption">${item.caption}</p>
           <button id="deleteBtn" onclick="deleteImage('${item._id}')">Delete</button>
      </div>`;
    }); 
    preview.innerHTML = html;}        
}
// delete image function 
async function deleteImage(id) {
    try {
        const res = await fetch(`http://localhost:3000/images/${id}`, {
            method: "DELETE"
        });
        
        if (!res.ok) { 
             const data = await res.json();         
             msg.textContent = data.message || "Failed to delete image!";
             clearMessage();
        } else {
            msg.textContent = "Image deleted successfully!";
            clearMessage();
            PreviewImage(); // Refresh the image list
        }
    } catch (err) {       
        msg.textContent = "An error occurred while deleting the image!";
    }
}


document.addEventListener("DOMContentLoaded",PreviewImage);
form.addEventListener("submit",UploadImage);
// clear message after 3 seconds
function clearMessage() {
    setTimeout(() => {
        msg.textContent = "";
    }, 1500);
}

