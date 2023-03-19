export const downloadFile = (file: BlobPart, downloadAs: 'pdf' | 'xlsx') => {
  const url = URL.createObjectURL(new Blob([file]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `file.${downloadAs}`);
  const tempElement = document.createElement('div');
  tempElement.appendChild(link);
  tempElement.style.display = 'none';
  document.body.appendChild(tempElement);
  link.click();
  document.body.removeChild(tempElement);
};
