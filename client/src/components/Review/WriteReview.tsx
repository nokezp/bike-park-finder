import React, { useState, FormEvent } from "react";
import StarRating from "./StarRating";

export interface ReviewFormData {
	title: string;
	comment: string;
	rating: number;
	visitDate?: string;
	trailDifficulty?: string;
	photos?: string[];
}

const WriteReview: React.FC<{ onSubmit: (formData: ReviewFormData) => void; onCancel: () => void }> = ({ onSubmit, onCancel }) => {
	const [formData, setFormData] = useState<ReviewFormData>({
		title: "",
		comment: "",
		rating: 0,
		visitDate: "",
		trailDifficulty: "",
		photos: [],
	});
	
	const [errors, setErrors] = useState<{
		rating?: string;
		comment?: string;
		visitDate?: string;
	}>({});

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const validateForm = (): boolean => {
		const newErrors: {
			rating?: string;
			comment?: string;
			visitDate?: string;
		} = {};
		
		// Validate rating
		if (formData.rating === 0) {
			newErrors.rating = "Please provide a rating";
		}
		
		// Validate comment
		if (!formData.comment.trim()) {
			newErrors.comment = "Please provide a review comment";
		}
		
		// Validate visit date (can't be in the future)
		if (formData.visitDate) {
			const visitDate = new Date(formData.visitDate);
			const today = new Date();
			today.setHours(0, 0, 0, 0); // Reset time to start of day for fair comparison
			
			if (visitDate > today) {
				newErrors.visitDate = "Visit date cannot be in the future";
			}
		}
		
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};
	
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (validateForm()) {
			onSubmit(formData);
		}
	};

	return (
		<form id="review-form" className="border-b border-gray-200 pb-6 mb-6 w-full" onSubmit={handleSubmit}>
			<div className="bg-gray-50 p-6 rounded-lg mb-6">
				<h3 className="text-lg font-bold mb-4">Write Your Review</h3>
				<div className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Rating <span className="text-red-500">*</span>
						</label>
						<div className="flex space-x-2 text-2xl text-gray-300">
							<StarRating rating={formData.rating} setRating={(rating) => setFormData((prev) => ({ ...prev, rating }))} />
						</div>
						{errors.rating && <p className="text-red-500 text-sm mt-1">{errors.rating}</p>}
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
						<input type="text"
							name="title"
							value={formData.title}
							placeholder="Sum up your experience"
							className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
							onChange={handleChange}
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">
							Review <span className="text-red-500">*</span>
						</label>
						<textarea
							rows={4} placeholder="Share your experience in detail"
							name="comment"
							value={formData.comment}
							className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${errors.comment ? 'border-red-500' : ''}`}
							onChange={handleChange}
						></textarea>
						{errors.comment && <p className="text-red-500 text-sm mt-1">{errors.comment}</p>}
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">Visit Date</label>
							<input
								type="date"
								name="visitDate"
								value={formData.visitDate}
								className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${errors.visitDate ? 'border-red-500' : ''}`}
								onChange={handleChange} />
							{errors.visitDate && <p className="text-red-500 text-sm mt-1">{errors.visitDate}</p>}
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">Trail Difficulty</label>
							<select
								name="trailDifficulty"
								value={formData.trailDifficulty}
								className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
								onChange={handleChange}
							>
								<option>Beginner</option>
								<option>Intermediate</option>
								<option>Advanced</option>
								<option>Expert</option>
							</select>
						</div>
					</div>
					{/* <div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Photos</label>
						<div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
							<i className="fa-solid fa-camera text-gray-400 text-2xl mb-2"></i>
							<p className="text-sm text-gray-500">Drop your photos here or click to upload</p>
						</div>
					</div> */}
					<div className="flex justify-end space-x-3">
						<button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50" onClick={onCancel}>Cancel</button>
						<button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">Submit
							Review</button>
					</div>
				</div>
			</div>
		</form>
	);
};

export default WriteReview;
