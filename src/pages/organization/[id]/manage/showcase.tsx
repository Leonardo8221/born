import React, { useState } from "react";

const Showcase = () => {
  const [showProgress, setShowProgress] = useState(false);

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    // const file = event.dataTransfer.files[0];
    // console.log(file, "file accepted");

    // Show progress bar for 3 seconds
    setShowProgress(true);
    setTimeout(() => {
      // Show success message for 3 seconds
      <div>Upload Successfull</div>;
      setShowProgress(false);
      alert("File uploaded successfully!");
      setTimeout(() => {
        // Show completion message for 3 seconds
        <div>Upload COmplete</div>;
        alert("File upload completed!");
      }, 3000);
    }, 3000);
  };

  return (
    <div className="flex justify-center items-center" onDrop={handleDrop}>
      {showProgress && <progress max="100" value="100"></progress>}
      <p>Drop a file here</p>
    </div>
  );
};

export default Showcase;
