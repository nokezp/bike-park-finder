import { useState } from "react";
import { useParams } from "react-router-dom";
import ReviewList from "./ReviewList";
import WriteReview, { ReviewFormData } from "./WriteReview";
import { useMutation } from "urql";
import { CreateReviewDocument, CreateReviewMutation } from "../../lib/graphql/generated/graphql-operations";

const ReviewSection = () => {
	const { id: bikeParkId } = useParams<{ id: string }>();
	const [showWriteReviewForm, setShowWriteReviewForm] = useState(false);

	const [reviewRes, createReview] = useMutation<CreateReviewMutation>(CreateReviewDocument);

	const handleSubmit = (formData: ReviewFormData) => {
		// Add bikeParkId to the form data
		createReview({
			...formData,
			bikeParkId
		});
	};

	if (reviewRes.fetching) return <div className="text-center py-4">Submitting review...</div>;
	if (reviewRes.error) return <div className="text-center py-4 text-red-500">Error submitting review: {reviewRes.error.message}</div>;

	return (
		<div id="reviews" className="bg-white rounded-lg shadow-md p-6 w-full">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-bold">Reviews</h2>
				{!showWriteReviewForm && (
					<button className="text-emerald-600 hover:text-emerald-700"
						onClick={() => setShowWriteReviewForm(true)}>Write Your Review</button>
				)}
			</div>
			{showWriteReviewForm && (
				<div className="flex justify-between items-center mb-6">
					<WriteReview onSubmit={formData => {
						handleSubmit(formData);
						setShowWriteReviewForm(false);
					}} onCancel={() => setShowWriteReviewForm(false)} />
				</div>
			)}
			<ReviewList />
		</div>
	);
};

export default ReviewSection;
