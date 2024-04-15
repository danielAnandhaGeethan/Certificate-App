import React from "react";

const Display = ({ data, display }) => {
  const handleDownload = (filename, content) => {
    const blob = new Blob([content], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className={`${display ? "opacity-100" : "hidden"}`}>
      {Object.entries(data).map(([key, value]) => (
        <div key={key}>
          <p>File Name: {key}</p>
          <button onClick={() => handleDownload(key, value)}>Download</button>
        </div>
      ))}
    </div>
  );
};

export default Display;
