import React from 'react';
import ModalDialog from '../../common/ModalDialog';
import { IEventReview } from '../ReviewEvents';

interface EventApproveConfirmDialogProps {
  isOpen: boolean;
  event: IEventReview | undefined;
  onClose: () => void;
  onConfirm: (id: string) => void;
}

const EventApproveConfirmDialog: React.FC<EventApproveConfirmDialogProps> = ({
  isOpen,
  event,
  onClose,
  onConfirm
}) => {
  return (
    <ModalDialog
      isOpen={isOpen}
      title="Approve Event"
    >
      <div>
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-emerald-100 p-3">
            <svg className="h-8 w-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2 text-center">Are you sure you want to approve this event?</h3>
        <p className="text-gray-600 mb-6 text-center">
          You are about to approve <strong>{event?.name}</strong> in <strong>{event?.location}</strong>.
          <br />
          This is created by <strong>{event?.createdBy?.username}</strong>.
          <br />
          If you have any questions, please contact the user by email at <strong>{event?.createdBy?.email}</strong>.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(event?.id ?? "")}
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            Approve
          </button>
        </div>
      </div>
    </ModalDialog>
  );
};

export default EventApproveConfirmDialog;
