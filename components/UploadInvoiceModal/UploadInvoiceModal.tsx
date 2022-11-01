import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Indicator, Root } from '@radix-ui/react-progress';
import { useMutation } from '@tanstack/react-query';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import React from 'react';
import { useDropzone, FileWithPath, FileRejection } from 'react-dropzone';
import toast from 'react-hot-toast';
import { FiInfo, FiUploadCloud } from 'react-icons/fi';
import { HiX } from 'react-icons/hi';

import Button from 'components/Button';
import Spacer from 'components/Spacer';
import usePathHook from 'hooks/use-path.hook';
import DocumentIcon from 'public/svg/document.svg';
import TrashIcon from 'public/svg/trash.svg';
import UploadColorIcon from 'public/svg/upload-color.svg';
import {
  textract,
  TextractInput,
  uploadFile,
  UploadFileInput,
} from 'services/files/files.service';
import { ROUTES } from 'utils/routes';

import AcceptedFileItems from './AcceptedFileItems';
import FileRejectionItems, { CustomRejectedProps } from './RejectedFileItems';

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
};

const UploadInvoiceModal = ({ setShowModal, token }: Props) => {
  const [listParent] = useAutoAnimate<HTMLUListElement>();
  // **** State **** //
  const [myFiles, setMyFiles] = React.useState<FileWithPath[]>([]);
  const [myRejectedFiles, setMyRejectedFiles] = React.useState<FileRejection[]>(
    [],
  );
  const rerender = React.useReducer(() => ({}), {})[1];
  const [uploadProgress, setUploadProgress] = React.useState(10);

  // **** End State **** //

  // **** Dropzone **** //
  const onDrop = (
    acceptedFiles: FileWithPath[],
    rejectedFiles: FileRejection[],
    event: any,
  ) => {
    setMyFiles([...myFiles, ...acceptedFiles]);

    setMyRejectedFiles([...myRejectedFiles, ...rejectedFiles]);
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: {
      'application/pdf': [],
    },
    onDrop,
    validator: (file) => {
      // do not allow files greater than 10mb
      if (file.size > 10485760) {
        return [
          {
            code: 'file-too-large',
            message: 'File is too large',
          },
        ];
      }
      return null;
    },
  });

  const removeAcceptedFile = (index: number) => {
    setMyFiles((files) => files.filter((_, idx) => idx !== index));
  };
  const removeRejectedFile = (index: number) => {
    setMyRejectedFiles((files) => files.filter((_, idx) => idx !== index));
  };

  // **** End Dropzone **** //

  // **** Mutations **** //

  const { api } = uploadFile({ token, type: 'invoice' });
  const { mutateAsync, status } = useMutation(
    (input: UploadFileInput['file']) => api(input),
  );

  const { api: textractApi } = textract(token);
  const { mutateAsync: textractMutateAsync, status: textractStatus } =
    useMutation((input: TextractInput['id']) => textractApi(input));

  // **** End Mutations **** //

  // **** Others **** //

  const router = useRouter();
  const path = usePathHook();

  const closeModal = () => {
    setShowModal(false);
  };
  const submit = () => {
    if (myFiles.length === 0 || myFiles == null) {
      toast.error('Please upload at least one file');
      return;
    }

    const promises = myFiles.map((file) => mutateAsync(file));
    toast
      .promise(Promise.all(promises), {
        loading: 'Uploading...',
        success: 'Uploaded successfully',
        error: 'Upload failed',
      })
      .then((filesResponse) => {
        setUploadProgress(100);
        setTimeout(() => {
          setUploadProgress(0);
          setMyFiles([]);
          setMyRejectedFiles([]);
        }, 3000);
        const textractPromiseArray = filesResponse.map((response) => {
          const uploadedFile = response.data.id;
          if (uploadedFile != null) {
            return textractMutateAsync(uploadedFile);
          }
        });
        toast
          .promise(Promise.all(textractPromiseArray), {
            loading: 'Requesting for Extracting text...',
            success: 'Request for extracting text sent successfully',
            error: 'Request for extracting text failed',
          })
          .then(() => {
            if (path.path !== ROUTES.APP.DOCUMENTS) {
              router.push(ROUTES.APP.DOCUMENTS);
            }
            closeModal();
          });
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const isExpanded = React.useMemo(() => {
    if (myFiles.length > 0 || myRejectedFiles.length > 0) return true;
    return false;
  }, [myFiles.length, myRejectedFiles.length]);
  // **** End Others **** //

  return (
    <div>
      <div className="max-w-md pb-6 bg-white px-9 pt-9">
        <h3 className="text-2xl font-medium text-slate-700">Upload Invoice</h3>
        <Spacer axis="vertical" size={36} />
        <div className="flex px-3 py-2 bg-amber-50">
          <FiInfo className="w-6 h-5 text-amber-800" />
          <p className="pl-3.5 text-amber-700 text-xs font-medium">
            Our sample invoices will help you accurate your work process.{' '}
            <span className="font-bold underline text-amber-800">
              Check now
            </span>
          </p>
        </div>
        <Spacer axis="vertical" size={12} />
        <div
          id="drop__zone__wrapper"
          {...getRootProps({
            className: classNames(
              'drop__zone w-full border-dashed border border-slate-300 bg-slate-50 text-center flex flex-col justify-center items-center p-6',
              {
                'h-40': !isExpanded,
                'h-20': isExpanded,
              },
            ),
          })}
        >
          <FiUploadCloud className="text-indigo-800 w-9 h-9" />
          <p className="text-sm font-medium text-slate-700">
            Drop your file here, or{' '}
            <span className="font-semibold text-indigo-700">Browse Files</span>
          </p>
          <p className="text-xs text-slate-400">
            Supported format: PDF upto 10mb
          </p>
          <input {...getInputProps()} />
        </div>
        <Spacer axis="vertical" size={isExpanded ? 16 : 36} />
        <ul
          className={classNames(' space-y-2 overflow-y-auto', {
            'h-48': isExpanded,
          })}
          ref={listParent}
        >
          {myFiles.map((file: FileWithPath, index) => (
            <AcceptedFileItems
              key={`${file.path}`}
              file={file}
              removeFile={removeAcceptedFile}
              index={index}
              uploading={status === 'loading'}
              uploadProgress={uploadProgress}
            />
          ))}
          {myRejectedFiles.map((rejection: CustomRejectedProps, index) => (
            <FileRejectionItems
              key={rejection.file.path}
              file={rejection.file}
              errors={rejection.errors}
              removeFile={removeRejectedFile}
              index={index}
            />
          ))}
        </ul>
        {isExpanded ? <Spacer axis="vertical" size={36} /> : null}
        <footer className="flex justify-end gap-4 border-t pt-9 border-slate-200">
          <Button
            variant="secondary"
            size="xl"
            onClick={closeModal}
            disabled={status === 'loading' || textractStatus === 'loading'}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="primary"
            size="xl"
            onClick={submit}
            disabled={
              status === 'loading' ||
              myFiles.length === 0 ||
              textractStatus === 'loading'
            }
          >
            Extract now
          </Button>
        </footer>
      </div>
    </div>
  );
};

export default UploadInvoiceModal;
