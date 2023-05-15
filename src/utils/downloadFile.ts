export const downloadFile = (file: BlobPart, downloadAs: 'pdf' | 'xlsx', fileName?: string) => {
  const url = URL.createObjectURL(new Blob([file]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName || `file.${downloadAs}`);
  const tempElement = document.createElement('div');
  tempElement.appendChild(link);
  tempElement.style.display = 'none';
  document.body.appendChild(tempElement);
  link.click();
  document.body.removeChild(tempElement);
};

export const download = (file: BlobPart, contentDisposition: string = '') => {
  let startFileNameIndex = contentDisposition.indexOf('"') + 1
  let endFileNameIndex = contentDisposition.lastIndexOf('"');
  let filename = contentDisposition.substring(startFileNameIndex, endFileNameIndex);

  const url = URL.createObjectURL(new Blob([file]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename || '');
  const tempElement = document.createElement('div');
  tempElement.appendChild(link);
  tempElement.style.display = 'none';
  document.body.appendChild(tempElement);
  link.click();
  document.body.removeChild(tempElement);
};
