# 📁 File Upload API

A simple and efficient REST API for uploading, storing, and managing files.

---

## 🚀 Features

* Upload single or multiple files
* Supports different file types (images, docs, etc.)
* File size validation
* Secure storage
* Easy integration with frontend apps

---

## 🛠️ Tech Stack

* Node.js
* Express.js
* Multer (for handling file uploads)

---

## 📂 Project Structure

```
file-upload-api/
│── uploads/          # Stored files
│── routes/           # API routes
│── controllers/      # Logic
│── app.js            # Main server file
│── package.json
```

---

## ⚙️ Installation

```bash
# Clone repository
git clone https://github.com/your-username/file-upload-api.git

# Go to project folder
cd file-upload-api

# Install dependencies
npm install
```

---

## ▶️ Run Server

```bash
npm start
```

Server will run on:

```
http://localhost:3000
```

---

## 📡 API Endpoints

### 🔹 Upload File

**POST** `/upload`

#### Request:

* Form-data
* Key: `file`
* Type: File

#### Example (using curl):

```bash
curl -X POST http://localhost:3000/upload \
-F "file=@yourfile.jpg"
```

#### Response:

```json
{
  "message": "File uploaded successfully",
  "file": "filename.jpg"
}
```

---

## 📦 File Storage

Uploaded files are stored in:

```
/uploads
```

---

## ⚠️ Notes

* Make sure `uploads/` folder exists
* Add file size limits if needed
* Use validation for security

---

## 🔒 Future Improvements

* Authentication (JWT)
* Cloud storage (AWS S3, Cloudinary)
* File preview API
* Delete & update file APIs

---

## 👨‍💻 Author

Your Name

---

## 📄 License

This project is licensed under the MIT License.
