import React from 'react';
import ModalDialog from '../../common/ModalDialog';
import { BikePark } from '../../../lib/graphql/generated/graphql-operations';

interface BikeParkCreatedDalogProps {
  data: BikePark;
  onClose: () => void;
}

const BikeParkDeletedDialog: React.FC<BikeParkCreatedDalogProps> = ({ data, onClose }) => {
  return (
    <ModalDialog
      isOpen={!!data.name}
      onClose={onClose}
      title="Bike park has been deleted"
    >
      <div>
        <div className="mb-4 flex justify-center">
          <div className="rounded-full bg-emerald-100 p-3">
            <svg className="h-8 w-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2 text-center">Bike Park Deleted Successfully!</h3>
        <p className="text-gray-600 mb-6">
          The new bike park <strong>{data.name}</strong> in <strong>{data.location}</strong> has been successfully deleted and removed from the database.
        </p>
      </div>
    </ModalDialog>
  );
};

export default BikeParkDeletedDialog;
