import axios from 'axios';
import { FileWithPath } from 'react-dropzone';

import { API_URL } from 'environment';
import { ErrorResponse, S3File } from 'types/util.type';

export type AllowedFileTypes =
  | 'logo'
  | 'profile-pic'
  | 'invoice'
  | 'remittance';

export type UploadFileInput = {
  token: string;
  file: FileWithPath;
  type: AllowedFileTypes;
};

export const uploadFile = (input: Omit<UploadFileInput, 'file'>) => {
  return {
    api(file: UploadFileInput['file']) {
      const data = new FormData();
      data.append('file', file);
      const params = new URLSearchParams();
      params.append('fileType', input.type);
      return axios.post<S3File>(`${API_URL}/files?${params.toString()}`, data, {
        headers: {
          Authorization: `Bearer ${input.token}`,
        },
      });
    },
  };
};
export type TextractInput = {
  token: string;
  id: number;
};

export const textract = (token: TextractInput['token']) => {
  return {
    api(id: TextractInput['id']) {
      const params = new URLSearchParams({
        fileId: id.toString(),
      }).toString();
      return axios.post<S3File>(
        `${API_URL}/documents/extracted-invoices?${params}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    },
  };
};

export type GetFileProps = {
  token?: string;
  id: number;
};

export const getFile = ({ token, id }: GetFileProps) => {
  return fetch(`${API_URL}/files/${id}/download`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.blob());
};

export const getFileUrl = ({ blob, name }: { blob: Blob; name: string }) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('target', '_blank');
  // set name to the file
  link.setAttribute('download', name);
  document.body.appendChild(link);
  link.click();
};
