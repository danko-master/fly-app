import "server-only";
import { NextResponse } from "next/server";
import * as Minio from "minio";
import db from "../../../models";
import { Kafka } from "kafkajs";

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_ENDPOINT,
  port: parseInt(process.env.MINIO_PORT),
  accessKey: process.env.MINIO_ROOT_USER,
  secretKey: process.env.MINIO_ROOT_PASSWORD,
  useSSL: false,
});

const bucketName = process.env.MINIO_BUCKET_NAME;

const kafka = new Kafka({
  clientId: "fly-app",
  brokers: [process.env.KAFKA_BROKER], // Replace with your Kafka broker addresses
});

const kafkaTopic = process.env.KAFKA_TOPIC;

export async function POST(req) {
  // Отключаем все сервисы
  setUploadStatus(`Ошибка: сервис отключен`);

  return true;

  // try {
  //   const formData = await req.formData();
  //   // FormData {
  //   //   file: File {
  //   //     size: 16257140,
  //   //     type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  //   //     name: '2025.xlsx',
  //   //     lastModified: 1758567982359
  //   //   }
  //   // }
  //   const file = formData.get("file");

  //   // Сохранить данные в БД
  //   let result = await db.Xlsxfile.create({
  //     statusCode: "uploaded",
  //     bucket: bucketName,
  //     originalName: file.name,
  //     originalSize: file.size,
  //   });

  //   // Отправка файла в хранилище
  //   const uuid = result.dataValues.uuid;

  //   // Сохранение файла в хранилище
  //   const expiry = 60 * 5; // 5 minutes

  //   let presignedUrl = await minioClient.presignedPutObject(
  //     bucketName,
  //     uuid,
  //     expiry,
  //     { "Content-Type": file.type }
  //   );

  //   const response = await fetch(presignedUrl, {
  //     method: "PUT",
  //     body: file,
  //     headers: {
  //       "Content-Type": file.type,
  //       "Access-Control-Allow-Origin": "*",
  //     },
  //   });

  //   const message = { uuid: uuid };

  //   // Отправка UUID файла в Kafka
  //   const producer = kafka.producer();
  //   await producer.connect();
  //   await producer.send({
  //     topic: kafkaTopic,
  //     messages: [{ value: JSON.stringify(message) }],
  //   });
  //   await producer.disconnect();

  //   return NextResponse.json({ presignedUrl });
  // } catch (error) {
  //   console.error("Error generating pre-signed URL:", error);
  //   return NextResponse.json(
  //     { error: "Failed to generate pre-signed URL" },
  //     { status: 500 }
  //   );
  // }
}
