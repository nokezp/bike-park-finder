/* eslint-disable no-undef */
import React, { useState } from 'react';
import { useQuery, useMutation } from 'urql';
import { ApproveEventDocument, GetPendingEventsDocument, RejectEventDocument } from '../../lib/graphql/generated/graphql-operations';
import FallbackImage from '../common/FallbackImage';
import EventApproveConfirmDialog from './Dialog/EventApproveConfirmDialog';
import EventRejectConfirmDialog from './Dialog/EventRejectConfirmDialog';
import moment from 'moment';

export interface IEventReview {
  id: string;
  title: string;
  location: string;
  imageUrl?: string;
  date: string;
  createdAt: string;
  startTime: string;
  endTime: string;
  approvalStatus: string;
  createdBy?: {
    id: string;
    username: string;
    email: string;
  };
  organizer?: {
    description: string;
    imageUrl: string;
    name: string;
  };
  venue?: {
    address: string;
    mapImageUrl: string;
    name: string;
  };
}

enum ApprovalStatus {
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  WAITING_FOR_APPROVAL = 'WAITING_FOR_APPROVAL'
}

const EVENTS_PER_PAGE = 25;

const ReviewEvents: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<ApprovalStatus | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [approveDialogOpen, setApproveDialogOpen] = useState<IEventReview>();
  const [rejectDialogOpen, setRejectDialogOpen] = useState<IEventReview>();

  const [{ data, fetching, error }] = useQuery({
    query: GetPendingEventsDocument,
    variables: { status: selectedStatus },
  });

  const [approveEventResult, approveEvent] = useMutation(ApproveEventDocument);
  const [rejectEventResult, rejectEvent] = useMutation(RejectEventDocument);

  const handleApproveEvent = async (id: string) => {
    try {
      await approveEvent({ id });
    } catch (err) {
      console.error('Error approving event:', err);
    }
  };

  const handleRejectEvent = async (id: string) => {
    try {
      await rejectEvent({ id });
    } catch (err) {
      console.error('Error rejecting event:', err);
    }
  };

  const filteredEvents = data?.pendingEvents
    ? data.pendingEvents.filter(
      (event: IEventReview) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : [];

  const totalPages = Math.ceil(filteredEvents.length / EVENTS_PER_PAGE);
  const startIndex = (currentPage - 1) * EVENTS_PER_PAGE;
  const endIndex = startIndex + EVENTS_PER_PAGE;
  const currentEvents = filteredEvents.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const formatDate = (dateString: string) => {
    try {
      return moment(dateString).format('MMMM DD, YYYY')
    } catch (error) {
      return dateString;
    }
  };

  const formatTime = (timeString: string) => {
    try {
      return moment(timeString, 'HH:mm').format('h:mm A');
    } catch (error) {
      return timeString;
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'WAITING_FOR_APPROVAL':
        return 'bg-yellow-100 text-yellow-800';
      case 'APPROVED':
        return 'bg-green-100 text-green-800';
      case 'REJECTED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusDisplayText = (status: string) => {
    switch (status) {
      case 'WAITING_FOR_APPROVAL':
        return 'Pending Review';
      case 'APPROVED':
        return 'Approved';
      case 'REJECTED':
        return 'Rejected';
      default:
        return status;
    }
  };

  if (fetching) return <div className="container mx-auto px-4 py-8 pt-16">Loading...</div>;
  if (error) return <div className="container mx-auto px-4 py-8 pt-16">Error: {error.message}</div>;

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Pending Events Reviews</h1>
          <div className="flex gap-4">
            <select
              className="px-4 py-2 border rounded-md"
              value={selectedStatus || ''}
              onChange={(e) => setSelectedStatus(e.target.value as ApprovalStatus || null)}
            >
              <option value="">All Status</option>
              <option value="WAITING_FOR_APPROVAL">Pending</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
            <input
              type="text"
              placeholder="Search events..."
              className="px-4 py-2 border rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div id="pending-events-list" className="space-y-4">
          {currentEvents.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-6 text-center text-gray-500">
              No events found matching your criteria.
            </div>
          ) : (
            currentEvents.map((event: IEventReview) => (
              <div key={event.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden">
                      <FallbackImage
                        className="w-full h-full object-cover"
                        src={event.imageUrl || "https://storage.googleapis.com/uxpilot-auth.appspot.com/db4aa7e988-dc443d34ddf3a4049811.png"}
                        alt={event.title}
                      />
                    </div>
                    <div className='flex justify-between flex-col max-w-[80%]'>
                      <div>
                        <h3 className="text-lg font-bold">{event.title}</h3>
                        <p className="text-gray-600 text-sm mt-2">{event.location}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <i className="fa-regular fa-calendar"></i>
                        <span>{formatDate(event.date)}</span>
                        <span>|</span>
                        <span>{formatTime(event.startTime)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>Submitted: {formatDate(event.createdAt)}</span>
                        <span>By: {event.createdBy?.username}</span>
                      </div>
                    </div>
                  </div>
                  <div className='flex items-end justify-between flex-col h-[90px]'>
                    <div className={`${getStatusBadgeClass(event.approvalStatus)} px-2 py-1 rounded-full text-xs`}>
                      {getStatusDisplayText(event.approvalStatus)}
                    </div>
                    <div className="flex gap-2">
                      {event.approvalStatus !== 'APPROVED' && (
                        <button
                          className="px-3 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                          onClick={() => setApproveDialogOpen(event)}
                          disabled={approveEventResult.fetching}>
                          Approve
                        </button>
                      )}
                      {event.approvalStatus !== 'REJECTED' && (
                        <button
                          className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                          onClick={() => setRejectDialogOpen(event)}
                          disabled={rejectEventResult.fetching}>
                          Reject
                        </button>
                      )}
                      <button className="px-3 py-2 bg-gray-100 rounded-md hover:bg-gray-200">
                        <a href={`/event/${event.id}`} target="_blank" rel="noopener noreferrer">
                          View Details
                        </a>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {filteredEvents.length > 0 && filteredEvents > EVENTS_PER_PAGE && (
          <div className="flex items-center justify-between mt-8">
            <p className="text-gray-600">
              Showing {startIndex + 1}-{Math.min(endIndex, filteredEvents.length)} of {filteredEvents.length} events
            </p>
            <div className="flex gap-2">
              <button
                className={`px-4 py-2 border rounded-md ${currentPage === 1 ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}>
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => {
                const pageNumber = i + 1;
                const isVisible =
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1);

                if (!isVisible) {
                  if (
                    (pageNumber === currentPage - 2 && currentPage > 3) ||
                    (pageNumber === currentPage + 2 && currentPage < totalPages - 2)
                  ) {
                    return <span key={pageNumber} className="px-2">...</span>;
                  }
                  return null;
                }

                return (
                  <button
                    key={pageNumber}
                    className={`px-4 py-2 ${currentPage === pageNumber ? 'bg-emerald-600 text-white' : 'border hover:bg-gray-50'} rounded-md`}
                    onClick={() => handlePageChange(pageNumber)}>
                    {pageNumber}
                  </button>
                );
              })}
              <button
                className={`px-4 py-2 border rounded-md ${currentPage === totalPages ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          </div>
        )}
      </div>
      {approveDialogOpen &&
        <EventApproveConfirmDialog
          isOpen={!!approveDialogOpen}
          event={approveDialogOpen}
          onClose={() => setApproveDialogOpen(undefined)}
          onConfirm={(id) => {
            handleApproveEvent(id);
            setApproveDialogOpen(undefined);
          }}
        />
      }
      {rejectDialogOpen &&
        <EventRejectConfirmDialog
          isOpen={!!rejectDialogOpen}
          event={rejectDialogOpen}
          onClose={() => setRejectDialogOpen(undefined)}
          onConfirm={(id) => {
            handleRejectEvent(id);
            setRejectDialogOpen(undefined);
          }}
        />
      }
    </>
  );
};

export default ReviewEvents;
