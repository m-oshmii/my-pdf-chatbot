import { useState } from "react";
import { api } from "../api/api";

type Props = {
  pdfName: string | null;
  onUploaded: (filename: string) => void;
};

function UploadSection({ pdfName, onUploaded }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  function chooseFile(next: File | null) {
    setError("");
    if (next && next.type !== "application/pdf" && !next.name.toLowerCase().endsWith(".pdf")) {
      setFile(null);
      setError("Please choose a PDF file.");
      return;
    }
    setFile(next);
  }

  async function uploadPDF() {
    if (!file) {
      setError("Choose a PDF first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    setError("");
    try {
      const res = await api.post("/upload", formData);
      onUploaded(res.data.filename ?? file.name);
    } catch (err) {
      console.error(err);
      setError("Upload failed. Make sure the backend is running on port 8000.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <aside className="flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
        Document
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        Only the uploaded PDF is used for answers.
      </p>

      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          chooseFile(e.dataTransfer.files[0] ?? null);
        }}
        className={`mt-5 flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-4 py-8 text-center transition ${
          dragging
            ? "border-sky-400 bg-sky-500/10"
            : "border-slate-700 bg-slate-950/50 hover:border-slate-500"
        }`}
      >
        <input
          type="file"
          accept=".pdf,application/pdf"
          className="sr-only"
          onChange={(e) => chooseFile(e.target.files ? e.target.files[0] : null)}
        />
        <span className="text-sm font-medium text-slate-200">
          Drop a PDF here, or click to browse
        </span>
        <span className="mt-1 text-xs text-slate-500">PDF files only</span>
      </label>

      {file && (
        <p className="mt-3 truncate text-sm text-slate-300" title={file.name}>
          Selected: {file.name}
        </p>
      )}

      <button
        type="button"
        onClick={() => void uploadPDF()}
        disabled={uploading}
        className="mt-4 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-sky-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload PDF"}
      </button>

      {error && (
        <p className="mt-3 text-sm text-rose-400" role="alert">
          {error}
        </p>
      )}

      <div className="mt-auto border-t border-slate-800 pt-4">
        <p className="text-xs uppercase tracking-wide text-slate-500">Status</p>
        {pdfName ? (
          <p className="mt-1 text-sm text-emerald-400">Ready: {pdfName}</p>
        ) : (
          <p className="mt-1 text-sm text-slate-400">No document uploaded yet</p>
        )}
      </div>
    </aside>
  );
}

export default UploadSection;
