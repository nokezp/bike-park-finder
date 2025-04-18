# Bike Park Finder API

## Image Upload Functionality

The API now supports image uploads for bike parks. Images can be uploaded to either AWS S3 or local storage.

### Configuration

1. Copy the `.env.example` file to `.env`:
   ```
   cp .env.example .env
   ```

2. Configure the environment variables in the `.env` file:

   - For AWS S3 upload:
     ```
     AWS_ACCESS_KEY_ID=your_aws_access_key_id
     AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
     AWS_REGION=us-east-1
     S3_BUCKET=your-s3-bucket-name
     ```

   - For local storage (no configuration needed, will be used as fallback if AWS S3 is not configured)

3. Install the required dependencies:
   ```
   npm install aws-sdk uuid @types/uuid
   ```

### Usage

The API provides a GraphQL mutation for uploading images:

```graphql
mutation UploadImage($file: Upload!) {
  uploadImage(file: $file) {
    url
    key
  }
}
```

This mutation returns:
- `url`: The URL of the uploaded image
- `key`: The unique key/filename of the uploaded image

### Client Implementation

On the client side, you can use the Apollo Client to upload files:

```typescript
import { useMutation } from '@apollo/client';
import { UPLOAD_IMAGE_MUTATION } from './graphql/mutations';

const [uploadImage, { loading, error }] = useMutation(UPLOAD_IMAGE_MUTATION);

const handleFileUpload = async (file) => {
  try {
    const result = await uploadImage({ 
      variables: { file },
      context: {
        // Enable Apollo's file upload functionality
        useMultipart: true
      }
    });
    
    // Get the uploaded image URL
    const imageUrl = result.data.uploadImage.url;
    
    // Use the image URL as needed
    console.log('Uploaded image URL:', imageUrl);
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};
```

### Notes

- For AWS S3 uploads, make sure your S3 bucket has the appropriate CORS configuration to allow uploads from your client domain.
- Local storage uploads will be saved to the `uploads` directory in the project root.
- The API will automatically create the `uploads` directory if it doesn't exist.
