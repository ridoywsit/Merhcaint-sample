import React from 'react';
import { FileRejection, FileWithPath } from 'react-dropzone';
import { FiRotateCcw, FiTrash } from 'react-icons/fi';

export interface CustomRejectedProps extends Omit<FileRejection, 'file'> {
  file: FileWithPath;
}

interface RejectedProps extends CustomRejectedProps {
  removeFile: (index: number) => void;
  index: number;
}

const FileRejectionItems = ({
  file,
  errors,
  removeFile,
  index,
}: RejectedProps) => {
  const fileSize = React.useMemo(() => {
    const fileSizeInKb = file.size / 1024;
    if (fileSizeInKb > 1000) {
      const fileSizeInMb = fileSizeInKb / 1024;
      return `${fileSizeInMb.toFixed(1)}mb`;
    }
    return `${fileSizeInKb.toFixed(1)}kb`;
  }, [file.size]);
  return (
    <li className="inline-flex items-center justify-between w-full gap-4 px-3 py-2 border-l-2 border-red-700 bg-slate-50">
      <div className="flex flex-col text-xs font-semibold text-slate-900">
        <span className="max-w-xs break-words">{file.path}</span>
        <span className="text-slate-500">{fileSize}</span>
        {errors.map((e) => (
          <div key={e.code} className="pt-1 text-sm font-normal text-red-600">
            {e.code === 'file-invalid-type' ? 'File not supported' : null}
            {e.code === 'file-too-large' ? e.message : null}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => removeFile(index)}
          className="p-1 text-red-800 rounded bg-red-50"
        >
          <FiTrash className="w-4 h-4" />
        </button>
      </div>
    </li>
  );
};

export default FileRejectionItems;
