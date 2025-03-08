// import React, { useRef } from "react";
// import html2canvas from "html2canvas";
// import { jsPDF } from "jspdf";
// import Apptable from "../table/table";

// const PDFGenerator = ({
//   data,
//   bgColor = "#000000",
//   textColor = "#ffffff",
//   title = "Generated PDF",
// }) => {
//   const refs = useRef([]);

//   const generatePDF = async (index) => {
//     if (!refs.current[index]) return;

//     const pdf = new jsPDF("p", "mm", "a4");
//     const element = refs.current[index];
//     const pdfWidth = pdf.internal.pageSize.getWidth();
//     const pdfHeight = pdf.internal.pageSize.getHeight();

//     // Apply dark mode styling before capturing
//     const originalBg = element.style.backgroundColor;
//     const originalColor = element.style.color;
//     element.style.backgroundColor = bgColor;
//     element.style.color = textColor;

//     // 🟢 Title Page (Corrected)
//     pdf.setTextColor(0, 0, 0); // White text
//     pdf.setFont("helvetica", "bold");
//     pdf.setFontSize(22);
//     pdf.text(title, pdfWidth / 2 - pdf.getTextWidth(title) / 2, 20); // Centered text

//     pdf.setFontSize(12);
//     pdf.text("Generated on: " + new Date().toLocaleString(), 10, 30);

//     pdf.addPage(); // Move to content page

//     // 🟢 Capture Main Content
//     const canvas = await html2canvas(element, {
//       backgroundColor: bgColor,
//       scale: 2,
//     });
//     const imgData = canvas.toDataURL("image/png");

//     pdf.addImage(imgData, "PNG", 10, 50, pdfWidth - 20, 0); // Added padding to prevent overlap

//     // 🟢 Capture and Add Each Apptable on a New Page
//     const tables = element.querySelectorAll(".apptable-container");
//     for (let i = 0; i < tables.length; i++) {
//       pdf.addPage(); // New page

//       pdf.setFontSize(16);
//       pdf.setTextColor(255, 255, 255); // White text
//       const tableText = `Table ${i + 1}`;
//       pdf.text(tableText, pdfWidth / 2 - pdf.getTextWidth(tableText) / 2, 15); // Centered text

//       const tableCanvas = await html2canvas(tables[i], {
//         backgroundColor: bgColor,
//         scale: 2,
//       });
//       const tableImgData = tableCanvas.toDataURL("image/png");

//       pdf.addImage(tableImgData, "PNG", 10, 30, pdfWidth - 20, 0); // Table image added below text
//     }

//     // Restore original styles
//     element.style.backgroundColor = originalBg;
//     element.style.color = originalColor;

//     pdf.save(`document_${index + 1}.pdf`);
//   };

//   return (
//     <div>
//       {data.map((item, index) => (
//         <div
//           key={index}
//           className="p-4 border rounded mb-4"
//           ref={(el) => (refs.current[index] = el)}
//           //   style={{ backgroundColor: bgColor, color: textColor }}
//         >
//           <h2 className="text-lg font-bold">{item.title}</h2>
//           <p>{item.description}</p>
//           <button
//             onClick={() => generatePDF(index)}
//             className="mt-2 p-2 bg-blue-500 text-white rounded"
//           >
//             Download PDF
//           </button>

//           <div className="apptable-container">
//             <Apptable />
//           </div>
//           <div className="apptable-container">
//             <Apptable />
//           </div>
//           <div className="apptable-container">
//             <Apptable />
//           </div>
//           <div className="apptable-container">
//             <Apptable />
//           </div>
//           <div className="apptable-container">
//             <Apptable />
//           </div>
//           <div className="apptable-container">
//             <Apptable />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PDFGenerator;
//////////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import Apptable from "../table/table";

const PDFGenerator = ({
  data,
  bgColor = "#000000",
  textColor = "#ffffff",
  title = "Generated PDF",
}) => {
  const refs = useRef([]);

  const generatePDF = async (index) => {
    if (!refs.current[index]) return;

    const pdf = new jsPDF("p", "mm", "a4");
    const element = refs.current[index];
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // 🟢 Apply dark mode styling before capturing
    const originalBg = element.style.backgroundColor;
    const originalColor = element.style.color;
    element.style.backgroundColor = bgColor;
    element.style.color = textColor;

    // 🟢 Title Page
    pdf.setTextColor(255, 255, 255);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(22);
    pdf.text(title, pdfWidth / 2 - pdf.getTextWidth(title) / 2, 20);

    pdf.setFontSize(12);
    pdf.text("Generated on: " + new Date().toLocaleString(), 10, 30);

    pdf.addPage();

    // 🟢 Capture Main Content (Lower scale for speed)
    const canvas = html2canvas(element, {
      backgroundColor: bgColor,
      scale: 1.5,
    });
    // const imgData = canvas.toDataURL("image/jpeg");

    // pdf.addImage(imgData, "JPEG", 10, 50, pdfWidth - 20, 0, "", "FAST");

    // // 🟢 Capture and Add Each Apptable on a New Page (Faster)
    const tables = element.querySelectorAll(".apptable-container");
    for (let i = 0; i < tables.length; i++) {
      pdf.addPage();

      pdf.setFontSize(16);
      pdf.setTextColor(255, 255, 255);
      const tableText = `Table ${i + 1}`;
      pdf.text(tableText, pdfWidth / 2 - pdf.getTextWidth(tableText) / 2, 15);

      // await new Promise((resolve) => setTimeout(resolve, 300)); // Non-blocking delay

      const tableCanvas = await html2canvas(tables[i], {
        backgroundColor: bgColor,
        scale: 1.5,
      });
      const tableImgData = tableCanvas.toDataURL("image/jpeg");

      pdf.addImage(tableImgData, "JPEG", 10, 30, pdfWidth - 20, 0, "", "FAST");
    }

    // 🟢 Restore original styles
    element.style.backgroundColor = originalBg;
    element.style.color = originalColor;

    pdf.save(`document_${index + 1}.pdf`);
  };

  return (
    <div>
      {data.map((item, index) => (
        <div
          key={index}
          className="p-4 border rounded mb-4"
          ref={(el) => (refs.current[index] = el)}
        >
          <h2 className="text-lg font-bold">{item.title}</h2>
          <p>{item.description}</p>
          <button
            onClick={() => generatePDF(index)}
            className="mt-2 p-2 bg-blue-500 text-white rounded"
          >
            Download PDF
          </button>

          {/* Wrap all tables in one div for faster capturing */}
          <div className="tables-wrapper">
            <div className="apptable-container">
              <Apptable />
            </div>
            <div className="apptable-container">
              <Apptable />
            </div>
            <div className="apptable-container">
              <Apptable />
            </div>
            <div className="apptable-container">
              <Apptable />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PDFGenerator;
