import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { useDropzone } from "react-dropzone";
import { FileCard } from "../FileCard";
import { Button } from "../Button";
import { fonts } from "../../../config/fonts";
import { clsVariants } from "./utils";

const productIcon = (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="2.66663"
      y="2.66669"
      width="26.6667"
      height="26.6667"
      rx="5"
      stroke="#999999"
      stroke-width="1.5"
    />
    <path
      d="M3.33325 23.3334L6.75911 20.8863C7.47513 20.3749 8.45594 20.456 9.07814 21.0782L11.1514 23.1515C11.62 23.6201 12.3798 23.6201 12.8484 23.1515L20.1709 15.829C20.8292 15.1707 21.8809 15.123 22.596 15.719L29.3333 21.3334"
      stroke="#999999"
      stroke-width="1.5"
      stroke-linecap="round"
    />
    <circle
      cx="2.66667"
      cy="2.66667"
      r="2.66667"
      transform="matrix(-1 0 0 1 13.3333 8)"
      stroke="#999999"
      stroke-width="1.5"
    />
  </svg>
);

export const FileUpload = ({
  variant = "rectangle",
  acceptedFileTypes = [
    "image/jpeg",
    "image/png",
    "image/heic",
    "application/pdf",
  ],
  hasFilePreview = true,
  labelText = "",
  icon,
  handleAcceptedFiles = () => {},
  handleFilePreviewClick = () => {},
  handleUpload = () => {},
}) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const renderButton = () => {
    return (
      <Button
        variant="outlined"
        className={clsx(
          "!max-w-[216px] mt-6",
          fonts.fontWeights.regular,
          fonts.text.md
        )}
        onClick={() => {
          if (file) {
            handleUpload(file);
          } else {
            document.querySelector('input[type="file"]').click();
          }
        }}
      >
        {file ? "Upload" : "Select"}
      </Button>
    );
  };

  const onDrop = useCallback((acceptedFiles) => {
    handleAcceptedFiles(acceptedFiles);
    setFile(acceptedFiles[0]);
    setPreviewUrl(URL.createObjectURL(acceptedFiles[0]));
  }, []);

  // , isDragActive

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    maxFiles: 1,
  });
  return (
    <div className={clsVariants[variant].clsContainer}>
      {!!labelText && (
        <p
          className={clsx(
            fonts.fontWeights.light,
            fonts.text.md,
            "text-shades-black tracking-[.06em] absolute bg-shades-white top-[-10px] left-5 px-2"
          )}
        >
          {labelText}
        </p>
      )}

      <div className={clsVariants[variant].clsWrapper}>
        <div {...getRootProps()} className={clsVariants[variant].clsDropzone}>
          <input {...getInputProps()} />

          {!!hasFilePreview && (
            <>
              <FileCard
                src={previewUrl}
                variant={variant}
                icon={icon}
                onClick={handleFilePreviewClick}
              />
            </>
          )}
          {variant === "product" && (
            <>
              {(!file || !hasFilePreview) && <div>{productIcon}</div>}
              {renderButton()}
            </>
          )}
        </div>
        {variant !== "product" && renderButton()}
      </div>
    </div>
  );
};

FileUpload.propTypes = {
  acceptedFileTypes: PropTypes.arrayOf(PropTypes.string),
  variant: PropTypes.oneOf(["circle", "rectangle", "product"]),
  labelText: PropTypes.string,
  handleUpload: PropTypes.func,
  handleAcceptedFiles: PropTypes.func,
  hasFilePreview: PropTypes.bool,
  handleFilePreviewClick: PropTypes.func,
  icon: PropTypes.node,
};
