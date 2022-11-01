import { Indicator, Root } from '@radix-ui/react-progress';
import React from 'react';
import { FileWithPath } from 'react-dropzone';
import { FiRotateCcw, FiTrash } from 'react-icons/fi';

const AcceptedFileItems = ({
  file,
  removeFile,
  index,
  uploadProgress,
  uploading,
}: {
  file: FileWithPath;
  removeFile: (index: number) => void;
  index: number;
  uploadProgress: number;
  uploading: boolean;
}) => {
  const fileSize = React.useMemo(() => {
    const fileSizeInKb = file.size / 1024;
    if (fileSizeInKb > 1000) {
      const fileSizeInMb = fileSizeInKb / 1024;
      return `${fileSizeInMb.toFixed(1)}mb`;
    }
    return `${fileSizeInKb.toFixed(1)}kb`;
  }, [file.size]);
  return (
    <li className="inline-flex items-center justify-between w-full gap-4 px-3 py-2 bg-slate-50">
      <div className="flex flex-col">
        <div className="flex flex-col text-xs font-semibold text-slate-900">
          <span className="max-w-xs break-words">{file.path}</span>

          {uploading ? (
            <>
              <Root
                value={uploadProgress}
                className="relative h-[5px]  overflow-hidden border border-transparent rounded-lg w-80 bg-cyan-100 mt-1.5"
              >
                <Indicator
                  className="h-full bg-cyan-500"
                  style={{ transform: `translateX(-${100 - uploadProgress}%)` }}
                />
              </Root>
            </>
          ) : (
            <span className="text-slate-500">{fileSize}</span>
          )}
        </div>
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

export default AcceptedFileItems;
