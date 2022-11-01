import classNames from 'classnames';
import React from 'react';
import { toast, Toaster, ToastBar } from 'react-hot-toast';
import {
  FiAlertCircle,
  FiAlertTriangle,
  FiCheckCircle,
  FiLoader,
} from 'react-icons/fi';

const MerchaintToast = () => {
  return (
    <Toaster position="bottom-right">
      {(toast) => (
        <ToastBar
          toast={toast}
          style={{
            padding: 0,
            maxWidth: 412,
            boxShadow:
              '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)',
          }}
        >
          {({ icon, message }) => (
            <div
              className={classNames(
                'px-8 py-4 flex items-center gap-4 shadow rounded transition-colors',
                {
                  'bg-amber-600 text-white': toast.type === 'blank',
                  'bg-green-600 text-white': toast.type === 'success',
                  'bg-red-600 text-white': toast.type === 'error',
                  'bg-cyan-50 text-cyan-600': toast.type === 'loading',
                },
              )}
            >
              {toast.type === 'blank' ? (
                <span className="inline-flex items-center p-2 rounded-full w-9 h-9 bg-white/20">
                  <FiAlertTriangle
                    className="w-5 h-5 text-white "
                    aria-hidden="true"
                  />
                </span>
              ) : null}
              {toast.type === 'success' ? (
                <span className="inline-flex items-center p-2 rounded-full w-9 h-9 bg-white/20">
                  <FiCheckCircle
                    className="w-5 h-5 text-white "
                    aria-hidden="true"
                  />
                </span>
              ) : null}
              {toast.type === 'error' ? (
                <span className="inline-flex items-center p-2 rounded-full w-9 h-9 bg-white/20">
                  <FiAlertCircle
                    className="w-5 h-5 text-white "
                    aria-hidden="true"
                  />
                </span>
              ) : null}
              {toast.type === 'loading' ? (
                <span className="inline-flex items-center p-2 rounded-full w-9 h-9 bg-cyan-100 ">
                  <FiLoader
                    className="w-5 h-5 transition-transform transform rotate-180 text-cyan-700 animate-spin"
                    aria-hidden="true"
                  />
                </span>
              ) : null}

              {message}
            </div>
          )}
        </ToastBar>
      )}
    </Toaster>
  );
};

export default MerchaintToast;
