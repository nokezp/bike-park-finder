/* eslint-disable no-undef */
import React, { useRef, useState, ChangeEvent, useMemo } from 'react';
import { capitalize } from 'lodash';
import { MostCommonFacilitiesDocument, MostCommonFacilitiesQuery, MostCommonRulesDocument, MostCommonRulesQuery, Price } from '../../../lib/graphql/generated/graphql-operations';
import { useQuery } from 'urql';
import { BikeParkFormProp } from './BikeParkFormBasicInfo';
import { bikeParkPasses, currencies, featuresObject } from '../../../lib/helpers/common-helper';

const BikeParkFormFeaturesMedia: React.FC<BikeParkFormProp> = ({ form }) => {
  const [loadAllFeatures, setLoadAllFeatures] = useState<boolean>(false);
  const [loadAllFacilities, setLoadAllFacilities] = useState<boolean>(false);
  const [loadAllRules, setLoadAllRules] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const multipleImagesRef = useRef<HTMLInputElement>(null);
  const [uploadingGallery, setUploadingGallery] = useState<boolean>(false);

  const features = useMemo(() => {
    if (loadAllFeatures) {
      return featuresObject;
    } else {
      return featuresObject.slice(0, 5);
    }
  }, [loadAllFeatures])

  const [{ data: facilities }] = useQuery<MostCommonFacilitiesQuery>({
    query: MostCommonFacilitiesDocument,
    ...(!loadAllFacilities ? { variables: { limit: 5 } } : {}),
  });

  const [{ data: rules }] = useQuery<MostCommonRulesQuery>({
    query: MostCommonRulesDocument,
    ...(!loadAllRules ? { variables: { limit: 5 } } : {}),
  });

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // form.setValue("imageUrl", file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    try {
      form.clearErrors("imageUrl");
      const imageFormData = new FormData();
      imageFormData.append('operations', JSON.stringify({
        query: `
          mutation UploadImage($file: Upload!) {
            uploadImage(file: $file) {
              url
              key
            }
          }
        `,
        variables: { file: null }
      }));

      imageFormData.append('map', JSON.stringify({ "0": ["variables.file"] }));
      imageFormData.append('0', file);

      const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          ...(localStorage.getItem('token') ? { 'Authorization': `Bearer ${localStorage.getItem('token')}` } : {})
        },
        body: imageFormData
      });

      const result = await response.json();

      if (result.error) {
        form.setError("imageUrl", {
          type: "validate",
          message: `Upload failed: ${result.error.message}`,
        });
        return;
      }

      if (result.data?.uploadImage?.url) {
        form.setValue("imageUrl", result.data.uploadImage.url)
      }
    } catch (error) {
      form.setError("imageUrl", {
        type: "validate",
        message: `Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    } finally {
      setIsUploading(false);
    }
  };

  const selectedFeatures = form.watch("features") || [];
  const selectedFacilities = form.watch("facilities") || [];
  const selectedRules = form.watch("rules") || [];
  const imageUrl = form.watch("imageUrl");
  const photos = form.watch("photos") || [];
  const videos = form.watch("videos") || [];
  const prices: Price[] = form.watch("prices") || [];

  return (
    <div id="features-media" className="space-y-6">
      <h2 className="text-xl font-bold">Features & Media</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Park Features</label>
        <div className="space-y-2 max-h-[185px] overflow-auto mb-[10px]">
          {features?.map((feature, index) => (
            <label key={`feature_${index}`} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedFeatures.includes(feature.name)}
                onChange={(e) => {
                  const current = form.getValues("features") || [];
                  const updated = e.target.checked
                    ? [...current, feature.name]
                    : current.filter((f: string) => f !== feature.name);
                  form.setValue("features", updated);
                }}
              />
              <div className={`bg-${feature.color}-500 rounded-full flex items-center justify-center w-[30px] h-[30px]`}>
                <i className={`fa-solid fa-${feature.icon} text-white text-xs`}></i>
              </div>
              <span className="text-sm">{capitalize(feature.name)}</span>
            </label>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setLoadAllFeatures(!loadAllFeatures)}
          className="text-emerald-600"
        >
          <i className="fa-solid fa-plus mr-2"></i>
          {loadAllFeatures ? "Show Less" : "Show More"}
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Park Facilities</label>
        <div className="space-y-2 max-h-[40] overflow-auto mb-[10px]">
          {facilities?.mostCommonFacilities?.map((facility, index) => {
            return (
              <label key={`facility_${index}`} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedFacilities.includes(facility)}
                  onChange={(e) => {
                    const current = form.getValues("facilities") || [];
                    const updated = e.target.checked
                      ? [...current, facility]
                      : current.filter((f: string) => f !== facility);
                    form.setValue("facilities", updated);
                  }}
                  className="mr-2"
                />
                {capitalize(facility)}
              </label>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setLoadAllFacilities(!loadAllFacilities)}
          className="text-emerald-600"
        >
          <i className="fa-solid fa-plus mr-2"></i>
          {loadAllFacilities ? "Show Less" : "Show More"}
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Park Rules</label>
        <div className="space-y-2 max-h-40 overflow-auto mb-[10px]">
          {rules?.mostCommonRules?.map((rule, index) => {
            return (
              <label key={`rule_${index}`} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedRules.includes(rule)}
                  onChange={(e) => {
                    const current = form.getValues("rules") || [];
                    const updated = e.target.checked
                      ? [...current, rule]
                      : current.filter((f: string) => f !== rule);
                    form.setValue("rules", updated);
                  }}
                  className="mr-2"
                />
                {capitalize(rule)}
              </label>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => setLoadAllRules(!loadAllRules)}
          className="text-emerald-600"
        >
          <i className="fa-solid fa-plus mr-2"></i>
          {loadAllRules ? "Show Less" : "Show More"}
        </button>
      </div>

      <div className={`${form.formState.errors.difficulty ? 'text-red-500' : ''}`}>
        <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
        <div className="space-y-2">
          <label className="flex items-center"  >
            <input
              type="radio"
              value="beginner"
              {...form.register("difficulty", { required: "Please select a difficulty level" })}
              className="mr-2"
            />
            Beginner (Blue)
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="intermediate"
              {...form.register("difficulty")}
              className="mr-2"
            />
            Intermediate (Red)
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="expert"
              {...form.register("difficulty")}
              className="mr-2"
            />
            Expert (Black)
          </label>
          {form.formState.errors.difficulty && <span style={{ color: 'red' }}>{form.formState.errors.difficulty?.message}</span>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
        <div
          className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50"
          onClick={() => fileInputRef.current?.click()}
        >
          {imagePreview ? (
            <div className="relative">
              <img src={imagePreview} alt="Cover preview" className="max-h-48 mx-auto rounded-md" />
              <div className="mt-2">
                <button
                  type="button"
                  className="text-red-500 text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    // setSelectedImage(null);
                    setImagePreview(null);
                    form.setValue("imageUrl", undefined);
                  }}
                >
                  <i className="fa-solid fa-trash mr-1"></i>
                  Remove image
                </button>
              </div>
            </div>
          ) : imageUrl ? (
            <div className="relative">
              <img src={imageUrl} alt="Current cover" className="max-h-48 mx-auto rounded-md" />
              <div className="mt-2">
                <button
                  type="button"
                  className="text-red-500 text-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    form.setValue("imageUrl", undefined);
                  }}
                >
                  <i className="fa-solid fa-trash mr-1"></i>
                  Remove image
                </button>
              </div>
            </div>
          ) : (
            <>
              <i className="fa-solid fa-cloud-arrow-up text-3xl text-gray-400 mb-2"></i>
              <p className="text-sm text-gray-500">
                {isUploading ? 'Uploading...' : 'Drag and drop your image here or click to browse'}
              </p>
              {form.formState?.errors?.imageUrl
                && (
                  <p className="text-red-500 text-sm mt-1">{form.formState.errors.imageUrl.message}</p>
                )}
            </>
          )}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Gallery Images</label>
        <div className="mb-4">
          <div
            className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 mb-4"
            onClick={() => multipleImagesRef.current?.click()}
          >
            <i className="fa-solid fa-images text-3xl text-gray-400 mb-2"></i>
            <p className="text-sm text-gray-500">
              {uploadingGallery ? 'Uploading...' : 'Click to add multiple images to gallery'}
            </p>
            <input
              type="file"
              ref={multipleImagesRef}
              className="hidden"
              accept="image/*"
              multiple
              onChange={async (e) => {
                const files = Array.from(e.target.files || []);
                if (files.length === 0) return;

                setUploadingGallery(true);

                try {
                  const uploadedUrls: string[] = [];

                  for (const file of files) {
                    const formData = new FormData();
                    formData.append('operations', JSON.stringify({
                      query: `
                        mutation UploadImage($file: Upload!) {
                          uploadImage(file: $file) {
                            url
                            key
                          }
                        }
                      `,
                      variables: { file: null }
                    }));

                    formData.append('map', JSON.stringify({ "0": ["variables.file"] }));
                    formData.append('0', file);

                    const response = await fetch('http://localhost:4000/graphql', {
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        ...(localStorage.getItem('token') ? { 'Authorization': `Bearer ${localStorage.getItem('token')}` } : {})
                      },
                      body: formData
                    });

                    const result = await response.json();

                    if (result.error) {
                      continue;
                    }

                    if (result.data?.uploadImage?.url) {
                      uploadedUrls.push(result.data.uploadImage.url);
                    }
                  }

                  if (uploadedUrls.length > 0) {
                    const currentGallery = photos || [];
                    form.setValue("photos", [...currentGallery, ...uploadedUrls]);
                  }
                } catch (error) {
                  console.error('Gallery upload error:', error);
                } finally {
                  setUploadingGallery(false);
                  if (multipleImagesRef.current) {
                    multipleImagesRef.current.value = '';
                  }
                }
              }}
            />
          </div>
          {photos && photos.length > 0 && (
            <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 mb-4">
              <div className="grid grid-cols-3 gap-4 mt-4">
                {photos.map((imageUrl: string, index: number) => (
                  <div key={`gallery_${index}`} className="relative">
                    <img src={imageUrl} alt={`Gallery ${index + 1}`} className="w-full h-32 object-cover rounded-md" />
                    <button
                      type="button"
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      onClick={() => {
                        const updatedGallery = videos;
                        updatedGallery.splice(index, 1);
                        form.setValue("photos", updatedGallery);
                      }}
                    >
                      <i className="fa-solid fa-times"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div >

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Videos</label>
        <div className="space-y-4">
          {videos?.map((video: string, index: number) => (
            <div key={`video_${index}`} className="flex items-center gap-2">
              <input
                type="text"
                value={video}
                className="w-full px-3 py-2 border rounded-md"
                placeholder={`Add ${index + 1}. video link`}
                onChange={e => {
                  const updatedVideos = [...(videos || [])];
                  updatedVideos[index] = e.target.value;
                  form.setValue("videos", updatedVideos);
                }}
              />
              <div>
                <button
                  type="button"
                  className="text-red-500 w-6 h-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    const updatedGallery = videos;
                    updatedGallery.splice(index, 1);
                    form.setValue("videos", updatedGallery);
                  }}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              const newVideo = "";
              form.setValue("videos", [...(videos || []), newVideo]);
            }}
            className="text-emerald-600">
            <i className="fa-solid fa-plus mr-2"></i>Add New Video Link
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Pricing Information</label>
        <div className="space-y-4">
          {prices?.map((p: Price, index: number) => (
            <div key={`price_${index}`}>
              <div className="flex items-center gap-4">
                <select
                  className={`w-1/3 px-3 py-2 border rounded-md ${form.formState.errors.prices?.[index]?.name ? 'border-red-500' : 'border-gray-300'}`}
                  value={p.name}
                  {...form.register(`prices.${index}.name`, { required: "Please select a price name" })}
                  onChange={e => {
                    const updatedPrices = prices;
                    updatedPrices[index] = { ...updatedPrices[index], name: e.target.value };
                    form.setValue("prices", updatedPrices);
                  }}
                >
                  <option value="">Type</option>
                  {bikeParkPasses.map(c => (
                    <option key={c.value} value={c.value}>{c.name}</option>
                  ))}
                </select>
                <input
                  type="number"
                  min={0}
                  value={p.price}
                  {...form.register(`prices.${index}.price`, {
                    required: "Please select a price value",
                    min: { value: 1, message: "Price must be at least 1" }
                  })}
                  onChange={e => {
                    const updatedPrices = prices;
                    updatedPrices[index] = { ...updatedPrices[index], price: Number(e.target.value) };
                    form.setValue("prices", updatedPrices);
                  }}
                  className={`w-1/3 px-3 py-2 border rounded-md ${form.formState.errors.prices?.[index]?.name ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Price"
                />
                <select
                  className="w-1/3 px-3 py-2 border rounded-md"
                  value={p.currency}
                  {...form.register(`prices.${index}.currency`, { required: "Please select a price currency" })}
                  onChange={e => {
                    const updatedPrices = prices;
                    updatedPrices[index] = { ...updatedPrices[index], currency: e.target.value };
                    form.setValue("prices", updatedPrices);
                  }}
                >
                  <option value="">Currency</option>
                  {currencies.map(currency => (
                    <option key={currency.code} value={currency.code}>{currency.name}</option>
                  ))}
                </select>
                <div>
                  <button
                    type="button"
                    className={`text-red-500 w-6 h-6 ${form.formState.errors.prices?.[index]?.name ? 'border-red-500' : 'border-gray-300'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      const updatedPrices = prices;
                      updatedPrices.splice(index, 1);
                      form.setValue("prices", updatedPrices);
                    }}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </div>
              {form.formState.errors.prices?.[index]?.name ? (
                <span style={{ color: 'red' }}>
                  {form.formState.errors.prices?.[index]?.name?.message}
                </span>
              ) : form.formState.errors.prices?.[index]?.currency ? (
                <span style={{ color: 'red' }}>
                  {form.formState.errors.prices?.[index]?.currency?.message}
                </span>
              ) : (
                <span style={{ color: 'red' }}>
                  {form.formState.errors.prices?.[index]?.price?.message}
                </span>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              const newPrice = { name: "", price: 0, currency: "" };
              form.setValue("prices", [...prices, newPrice]);
            }}
            className="text-emerald-600">
            <i className="fa-solid fa-plus mr-2"></i>Add Price Option
          </button>
        </div>
      </div>
    </div >
  );
};

export default BikeParkFormFeaturesMedia;
