import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "urql";
import { GetReviewsDocument, GetReviewsQuery } from "../../lib/graphql/generated/graphql-operations";
import moment from "moment";
import StarRating from "./StarRating";

const LIMIT = 3; // Show 3 reviews per page

const ReviewList: React.FC = () => {
	const { id: bikeParkId } = useParams<{ id: string }>();
	const [page, setPage] = useState(1);

	const [result] = useQuery<GetReviewsQuery>({
		query: GetReviewsDocument,
		variables: { bikeParkId, page, limit: LIMIT },
	});

	const { data, fetching, error } = result;

	if (fetching) return <div className="text-center py-4">Loading reviews...</div>;
	if (error) return <div className="text-center py-4 text-red-500">Error loading reviews: {error.message}</div>;
	if (!data?.reviews?.reviews?.length) return <div className="text-center py-4">No reviews yet. Be the first to write one!</div>;

	const { reviews, hasNextPage, currentPage, totalPages } = data.reviews;

	const formatDate = (dateString: string) => {
		const date = moment(Number(dateString));
		return moment().diff(date, 'days') <= 7 
			? date.fromNow() 
			: date.format('MMMM D, YYYY');
	};

	return (
		<div id="reviews" className="bg-white rounded-lg shadow-md p-6">
			<div className="space-y-6">
				{reviews.map((review) => (
					<div key={review.id} className="border-b border-gray-200 pb-6">
						<div className="flex items-start space-x-4">
							<img 
								src={`https://ui-avatars.com/api/?name=${review.createdBy.username}&background=random`}
								className="w-12 h-12 rounded-full" 
								alt={review.createdBy.username}
							/>
							<div className="flex-1">
								<div className="flex justify-between">
									<h4 className="font-bold">{review.createdBy.username}</h4>
									<span className="text-gray-500">{formatDate(review.createdAt)}</span>
								</div>
								<div className="flex items-center space-x-1 text-yellow-400 mb-2">
									<StarRating rating={review.rating} readOnly={true} />
								</div>
								{review.title && <h5 className="font-semibold mb-1">{review.title}</h5>}
								<p className="text-gray-600">{review.comment}</p>
								{review.trailDifficulty && (
									<div className="mt-2 text-sm text-gray-500">
										Trail difficulty: <span className="font-medium">{review.trailDifficulty}</span>
									</div>
								)}
								{review.visitDate && (
									<div className="text-sm text-gray-500">
										Visited: <span className="font-medium">{moment(Number(review.visitDate)).format('MMMM YYYY')}</span>
									</div>
								)}
							</div>
						</div>
					</div>
				))}
			</div>

			{totalPages > 1 && (
				<div className="flex justify-between items-center mt-6">
					<button 
						className={`px-4 py-2 text-emerald-600 hover:text-emerald-700 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
						onClick={() => setPage(prev => Math.max(prev - 1, 1))}
						disabled={currentPage === 1}
					>
						Previous
					</button>
					<span className="text-gray-600">
						Page {currentPage} of {totalPages}
					</span>
					<button 
						className={`px-4 py-2 text-emerald-600 hover:text-emerald-700 ${!hasNextPage ? 'opacity-50 cursor-not-allowed' : ''}`}
						onClick={() => setPage(prev => prev + 1)}
						disabled={!hasNextPage}
					>
						Next
					</button>
				</div>
			)}
		</div>
	);
};

export default ReviewList;
