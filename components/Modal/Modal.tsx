import { DialogOverlay, DialogContent } from '@reach/dialog';
import { AnimatePresence, motion } from 'framer-motion';
import React, { FC } from 'react';

type Props = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal: FC<Props> = ({ showModal, children, setShowModal }) => {
  const AnimatedDialogOverlay = motion(DialogOverlay, {
    forwardMotionProps: true,
  });
  const AnimatedDialogContent = motion(DialogContent, {
    forwardMotionProps: true,
  }) as any;

  const handleDismiss = () => setShowModal(false);

  return (
    <AnimatePresence>
      {showModal ? (
        <AnimatedDialogOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full min-h-screen overflow-x-hidden overflow-y-auto md:inset-0  bg-[#0F172AAD]"
          onDismiss={handleDismiss}
        >
          <AnimatedDialogContent
            className="empty"
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '100%' }}
            aria-label="Modal"
            transition={{ min: 0, max: 100, bounceDamping: 9 }}
          >
            {children}
          </AnimatedDialogContent>
        </AnimatedDialogOverlay>
      ) : null}
    </AnimatePresence>
  );
};

export default Modal;

// className="fixed w-full max-w-xl transform -translate-x-1/2 -translate-y-1/2 rounded shadow-md bg-baseColor top-1/2 left-1/2"
