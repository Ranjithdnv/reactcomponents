import PDFGenerator from "./pdfchild";

const PdfParent = () => {
  const data = [
    { title: "Document 1", description: "This is the first document." },
    { title: "Document 2", description: "This is the second document." },
    { title: "Document 3", description: "This is the third document." },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">PDF Generator</h1>
      <PDFGenerator data={data} />
    </div>
  );
};

export default PdfParent;
