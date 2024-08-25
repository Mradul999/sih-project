import React, { useState } from "react";
import app from "../firebase.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const imageChangeHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const uploadImageHandler = (e) => {
    e.preventDefault(); // Prevent form submission and page reload

    if (!image) {
      alert("Please select an image first!");
      return;
    }

    const storage = getStorage(app);
    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Progress handling (optional)
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        // Handle any errors during upload
        console.error("Upload failed:", error);
      },
      () => {
        // When the upload is complete, get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
          console.log("File available at", downloadURL);
        });
      }
    );
  };

  return (
    <div className="w-screen flex justify-center items-center">
      <div>
        <form onSubmit={uploadImageHandler} className="flex flex-col gap-10">
          <input onChange={imageChangeHandler} type="file" accept="image/*" />
          <button
            type="submit"
            className="bg-red-600 p-2 rounded-md text-white text-lg"
          >
            Upload
          </button>
        </form>
        {imageUrl && (
          <div className="mt-4">
            <p>Image uploaded successfully! Here's the URL:</p>
            <a href={imageUrl} target="_blank" rel="noopener noreferrer">
              {imageUrl}
            </a>
            <div>
              <img src={imageUrl} alt="Uploaded" className="mt-4 w-64" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
