import db from "../../../models";
import Table from "react-bootstrap/Table";
import Script from "next/script";

function downloadFile(uuid) {
  return "/api/downloader?uuid=" + uuid;
}

export const metadata = {
  title: "Список файлов и статусов",
  description: "Список файлов и статусов обработки.",
};

export default async function Page() {
  const allRecords = await db.Xlsxfile.findAll({
    order: [["createdAt", "DESC"]],
  });

  async function flightsNew(uuid) {
    const { count, rows } = await db.Flight.findAndCountAll({
      where: { xlsxfile_uuid: uuid },
    });
    return count;
  }

  function rustatus(statusCode) {
    switch (statusCode) {
      case "uploaded":
        return "Готов к обработке";
      case "reading":
        return "Чтение файла";
      case "parsing":
        return "В процессе парсинга";
      case "saved":
        return "Готов к формированию отчётов";
      default:
        return "-";
    }
  }
  return (
    <div className="text-center pt-10">
      <h3 className="pb-10">Список загруженных xlsx-файлов</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>UUID</th>
            <th>Статус</th>
            <th>Имя файла</th>
            <th>Новые записи, ед.</th>
            <th>Дата добавления</th>
          </tr>
        </thead>
        <tbody>
          {allRecords.map((rec) => (
            <tr key={rec.uuid}>
              <td>{rec.uuid}</td>
              <td
                className="check-status-code"
                data-status-code={rec.statusCode}
              >
                {rustatus(rec.statusCode)}
              </td>
              <td>
                <a href={downloadFile(rec.uuid)}>{rec.originalName}</a>
              </td>
              <td>{flightsNew(rec.uuid)}</td>
              <td>{rec.createdAt.toString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Script src="/checker.js" strategy="lazyOnload" />
    </div>
  );
}
