import { useState } from "react";
import axios from "../config/axios";
import { useDropzone } from "react-dropzone";
import { HiOutlineUpload } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export default function UploadProduct() {
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [productName, setProductName] = useState("");
  const [code, setCode] = useState("");
  const [price, setPrice] = useState("");

  const navigate = useNavigate();

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const selectedFile = acceptedFiles[0];
      const reader = new FileReader();

      reader.onload = () => {
        setPreviewImage(reader.result);
      };

      if (selectedFile) {
        setFile(selectedFile);
        reader.readAsDataURL(selectedFile);
      }
    },
  });

  const files = acceptedFiles.map((selectedFile) => (
    <li key={selectedFile.path}>
      {selectedFile.path} - {selectedFile.size} bytes
    </li>
  ));

  const handleCancelClick = () => {
    setIsClicked(true);
  };

  const handleConfirmClick = () => {
    setIsClicked(false);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("imageUrl", file);
    formData.append("name", productName);
    formData.append("code", code);
    formData.append("price", price);

    try {
      await axios.post("/product/createProduct", formData);
      setFile(null);
      setPreviewImage(null);
      setProductName("");
      setCode("");
      setPrice("");
      navigate("/");
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  return (
    <form
      className="flex flex-col items-center mb-4"
      onSubmit={handleSubmitForm}
    >
      <div className="flex items-start w-full mb-10">
        <div className="text-4xl font-bold mt-5">Upload Product</div>
      </div>
      <div className="flex w-full justify-center mr-[720px] text-gray-600">
        <p>Upload image</p>
      </div>
      <section className="container cursor-pointer bg-white border-dashed border border-gray-200 text-gray-600 p-8 flex flex-col items-center text-l max-w-3xl rounded-3xl">
        <div className="py-16 flex flex-col justify-center items-center">
          <div {...getRootProps({ className: "dropzone" })}>
            {previewImage ? (
              <img
                src={previewImage}
                alt="preview"
                className="m-auto max-w-full h-auto "
              />
            ) : (
              <div className="flex flex-col items-center mb-4 text-3xl">
                <HiOutlineUpload />
              </div>
            )}
            <input {...getInputProps()} />
            <p className="text-xl">
              Drop & Drag or{" "}
              <span className="text-blue-600 underline cursor-pointer">
                Choose file
              </span>{" "}
              to upload
            </p>
            <div className="flex justify-center mt-3">
              <p className="text-sm">JPG or PNG Maximum file size 50MB</p>
            </div>
          </div>
          <aside>
            <ul>{files}</ul>
          </aside>
        </div>
      </section>
      <div className="w-full flex flex-col justify-start ml-[240px] mt-9">
        <div className="mb-4 max-w-6xl">
          <p className="text-gray-600">Product name</p>
          <input
            type="text"
            placeholder="Product name"
            className="border border-gray-300 rounded-3xl p-2 shadow-md w-full"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
        <div className="mb-4 max-w-6xl">
          <p className="text-gray-600">Code</p>
          <input
            type="text"
            placeholder="Code"
            className="border border-gray-300 rounded-3xl p-2 shadow-md w-full"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <div className="mb-4 max-w-6xl">
          <p className="text-gray-600">Price</p>
          <input
            type="text"
            placeholder="$"
            className="border border-gray-300 rounded-3xl p-2 shadow-md w-full"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
      </div>
      <div>
        <button
          onClick={handleCancelClick}
          className={`rounded-3xl text-lg py-3 px-6 ${
            isClicked ? "bg-red-500 text-white" : "bg-white text-red-500"
          }`}
        >
          ยกเลิก
        </button>
        <button
          onClick={handleConfirmClick}
          className={`rounded-3xl text-lg py-3 px-6 ${
            !isClicked ? "bg-red-500 text-white" : "bg-white text-red-500"
          }`}
        >
          ยืนยัน
        </button>
      </div>
    </form>
  );
}
