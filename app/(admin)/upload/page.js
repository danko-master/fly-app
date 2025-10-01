"use client";

import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Head from "next/head";
import { useRouter } from "next/navigation";

export default function UploadForm() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [showStatusUploader, setShowStatusUploader] = useState(false);
  const router = useRouter();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setUploadStatus("Выберите файл для загрузки.");
      return;
    }

    setUploadStatus("В процессе отправки...");
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("/api/uploader", {
        // Replace with your API route
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setUploadStatus("Файл успешно загружен!");
        setSelectedFile(null); // Clear selected file
        setShowStatusUploader(true);
        setTimeout(() => {
          router.push("/list"); // or router.replace('/target-page')
        }, 2000);
      } else {
        const errorData = await response.json();
        setUploadStatus(`Ошибка: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      setUploadStatus(`Ошибка: ${error.message}`);
    }
  };

  return (
    <>
      <Head>
        <title>Загрузка xlsx</title>
      </Head>
      <div className="text-center pt-10">
        <h3 className="pb-10">Добавление xlsx-файла</h3>
        {showStatusUploader && (
          <React.Fragment>
            Файл успешно загружен!
            <br />
            <br />
            Происходит перенаправление страницы...
          </React.Fragment>
        )}
        {!showStatusUploader && (
          <React.Fragment>
            <Form onSubmit={handleSubmit}>
              <input type="file" onChange={handleFileChange} />
              <Button variant="primary" type="submit" disabled={!selectedFile}>
                Загрузить
              </Button>
              {uploadStatus && <p>{uploadStatus}</p>}
            </Form>
          </React.Fragment>
        )}
      </div>
    </>
  );
}
