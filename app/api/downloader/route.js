import "server-only";
import { NextResponse } from "next/server";
import * as Minio from "minio";

export async function GET(req) {
  // Отключаем все сервисы
  setUploadStatus(`Ошибка: сервис отключен`);

  return true;

  // try {
  //   const minioClient = new Minio.Client({
  //     endPoint: process.env.MINIO_ENDPOINT,
  //     port: parseInt(process.env.MINIO_PORT),
  //     accessKey: process.env.MINIO_ROOT_USER,
  //     secretKey: process.env.MINIO_ROOT_PASSWORD,
  //     useSSL: false,
  //   });

  //   const bucketName = process.env.MINIO_BUCKET_NAME;

  //   const { searchParams } = new URL(req.url);
  //   const objectName = searchParams.get("uuid");
  //   const stream = await minioClient.getObject(bucketName, objectName);

  //   const headers = new Headers();
  //   headers.set(
  //     "Content-Disposition",
  //     `attachment; filename="${objectName}.xlsx"`
  //   );
  //   headers.set("Content-Type", "application/octet-stream"); // Or the actual MIME type

  //   // Create a ReadableStream from the MinIO stream
  //   const readableStream = new ReadableStream({
  //     start(controller) {
  //       stream.on("data", (chunk) => {
  //         controller.enqueue(chunk);
  //       });
  //       stream.on("end", () => {
  //         controller.close();
  //       });
  //       stream.on("error", (err) => {
  //         console.error("Error streaming file from MinIO:", err);
  //         controller.error(err);
  //       });
  //     },
  //   });

  //   return new NextResponse(readableStream, { headers });
  // } catch (error) {
  //   console.error("Error generating URL:", error);
  //   return NextResponse.json(
  //     { error: "Failed to generate URL" },
  //     { status: 500 }
  //   );
  // }
}
