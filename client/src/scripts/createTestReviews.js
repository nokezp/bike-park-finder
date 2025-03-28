// Simple script to create test reviews using the GraphQL API
import fetch from 'node-fetch';

const API_URL = 'http://localhost:4000/graphql';
const BIKE_PARK_ID = '67e1fe8fd61e7f0c9c8759b5'; // Replace with your actual bike park ID

// GraphQL mutation for creating a review
const CREATE_REVIEW_MUTATION = `
  mutation CreateReview($bikeParkId: ID!, $rating: Float!, $comment: String!, $title: String) {
    createReview(bikeParkId: $bikeParkId, rating: $rating, comment: $comment, title: $title) {
      id
      rating
      comment
      title
    }
  }
`;

// Function to create a review
async function createReview(title, comment, rating) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZTFmZThmZDYxZTdmMGM5Yzg3NTlhZCIsInVzZXJuYW1lIjoiam9obmRvZSIsImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzE2OTI5MjA5fQ.Wd0QXCZIlxf0UkAuuQrLXLELVl_UWJQoAyQhxV5Vuqw', // Replace with your actual token
      },
      body: JSON.stringify({
        query: CREATE_REVIEW_MUTATION,
        variables: {
          bikeParkId: BIKE_PARK_ID,
          rating,
          comment,
          title,
        },
      }),
    });

    const data = await response.json();
    `Created review: ${title}`, data);
    return data;
  } catch (error) {
  }
}

// Create 10 test reviews
async function createTestReviews() {
  for (let i = 1; i <= 10; i++) {
    await createReview(
      `Test Review ${i}`,
      `This is test review number ${i}. It contains some text to test the pagination functionality.`,
      Math.floor(Math.random() * 5) + 1
    );
    // Add a small delay between requests
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  console.log('All test reviews created!');
}

createTestReviews();
