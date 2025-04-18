/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
'use client'
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BikePark, BikeParkDocument, BikeParkQuery, CreateBikeParkDocument, CreateBikeParkMutation, DeleteBikeParkDocument, DeleteBikeParkMutation, MeDocument, MeQuery, UpdateBikeParkDocument, UpdateBikeParkInput, UpdateBikeParkMutation } from '../../lib/graphql/generated/graphql-operations';
import { useMutation, useQuery } from 'urql';
import BikeParkFormFeaturesMedia from './FormSections/BikeParkFormFeaturesMedia';
import BikeParkFormBasicInfo from './FormSections/BikeParkFormBasicInfo';
import { useForm } from 'react-hook-form';
import { FormValues } from '../../lib/helpers/common-helper';
import BikeParkCreatedDalog from './Dialog/BikeParkCreatedDalog';
import BikeParkUpdatedDalog from './Dialog/BikeParkUpdatedDalog';
import BikeParkDeletedDialog from './Dialog/BikeParkDeletedDialog';
import BikeParkDeleteConfirmDialog from './Dialog/BikeParkDeleteConfirmDialog';

const BikeParkForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [showCreatedModal, setShowCreatedModal] = useState<BikePark>();
  const [showUpdatedModal, setShowUpdateddModal] = useState<BikePark>();
  const [showDeletedModal, setShowDeletedModal] = useState<BikePark>();
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);

  const [{ data, fetching, stale }] = useQuery<BikeParkQuery>({
    query: BikeParkDocument,
    variables: { id },
    pause: !id
  });

  const [userData] = useQuery<MeQuery>({ query: MeDocument });


  const bikePark = useMemo(() => data?.bikePark, [data?.bikePark])

  const [createBikeParkRes, createBikePark] = useMutation<CreateBikeParkMutation>(CreateBikeParkDocument);
  const [updateBikeParkRes, updateBikePark] = useMutation<UpdateBikeParkMutation>(UpdateBikeParkDocument);
  const [deleteBikeParkRes, deleteBikePark] = useMutation<DeleteBikeParkMutation>(DeleteBikeParkDocument)

  const onSubmit = (formData: FormValues) => {
    console.log("formData: ", formData);

    const input = {
      name: formData.name,
      description: formData.description,
      location: formData.location,
      coordinates: {
        latitude: formData.coordinates.latitude,
        longitude: formData.coordinates.longitude,
      },
      status: formData.status,
      openingHours: {
        monday: {
          from: formData.openingHours?.monday?.from,
          to: formData.openingHours?.monday?.to,
        },
        tuesday: {
          from: formData.openingHours?.tuesday?.from,
          to: formData.openingHours?.tuesday?.to,
        },
        wednesday: {
          from: formData.openingHours?.wednesday?.from,
          to: formData.openingHours?.wednesday?.to,
        },
        thursday: {
          from: formData.openingHours?.thursday?.from,
          to: formData.openingHours?.thursday?.to,
        },
        friday: {
          from: formData.openingHours?.friday?.from,
          to: formData.openingHours?.friday?.to,
        },
        saturday: {
          from: formData.openingHours?.saturday?.from,
          to: formData.openingHours?.saturday?.to,
        },
        sunday: {
          from: formData.openingHours?.sunday?.from,
          to: formData.openingHours?.sunday?.to,
        }
      },
      contact: formData.contact,
      socialMedia: {
        facebook: formData.socialMedia?.facebook,
        instagram: formData.socialMedia?.instagram,
        youtube: formData.socialMedia?.youtube,
        strava: formData.socialMedia?.strava,
      },
      features: formData.features,
      facilities: formData.facilities,
      rules: formData.rules,
      difficulty: formData.difficulty,
      imageUrl: formData.imageUrl,
      photos: formData.photos,
      videos: formData.videos,
      prices: formData.prices
    } as UpdateBikeParkInput;
    if (id) {
      updateBikePark({ id, input })
        .then((res) => {
          if (res.error) {
            console.error('Error updating bike park:', res.error);
          } else {
            console.log('Bike park updated successfully:', res.data);
            setShowCreatedModal(res.data?.updateBikePark);
          }
        }).catch((error) => {
          console.error('Error updating bike park:', error);
        });
    } else {
      createBikePark({ input }).then((res) => {
        console.log(res)
        if (res.error) {
          console.error('Error creating bike park:', res.error);
          alert(`Error creating bike park: ${res.error.message}`);
        } else {
          console.log('Bike park created successfully:', res.data);
          setShowCreatedModal(res.data?.createBikePark);
        }
      }).catch((error) => {
        console.error('Error creating bike park:', error);
        alert(`Error creating bike park: ${error.message}`);
      });
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleCloseSuccessModal = () => {
    setShowCreatedModal(undefined);
    setShowUpdateddModal(undefined);
    setShowDeletedModal(undefined);
    navigate('/bike-parks');
  };

  const handleDelete = () => {
    setShowDeleteConfirmModal(true);
  };

  const confirmDelete = () => {
    setShowDeleteConfirmModal(false);
    deleteBikePark({ id }).then((res) => {
      if (res.error) {
        console.error('Error deleting bike park:', res.error);
      } else {
        setShowDeletedModal({
          id: bikePark?.id ?? "",
          name: bikePark?.name ?? "",
          location: bikePark?.location
        });
      }
    }).catch((error) => {
      console.error('Error deleting bike park:', error);
    });
  };

  const form = useForm<FormValues>({
    defaultValues: {
      difficulty: "beginner",
      status: "open",
      location: "",
      coordinates: {
        longitude: 7.894679,
        latitude: 47.990162
      }
    }
  });

  useEffect(() => {
    if (bikePark) {
      form.reset({
        name: bikePark?.name,
        description: bikePark?.description,
        location: bikePark?.location ?? "Freiburg",
        imageUrl: bikePark?.imageUrl,
        difficulty: bikePark?.difficulty ?? "beginner",
        status: bikePark?.status,
        coordinates: bikePark?.coordinates
          ?? {
          latitude: 0,
          longitude: 0
        },
        contact: {
          email: bikePark?.contact?.email,
          phone: bikePark?.contact?.phone,
          website: bikePark?.contact?.website,
        },
        socialMedia: {
          facebook: bikePark?.socialMedia?.facebook,
          instagram: bikePark?.socialMedia?.instagram,
          youtube: bikePark?.socialMedia?.youtube,
          strava: bikePark?.socialMedia?.strava,
        },
        openingHours: {
          ...(bikePark?.openingHours?.monday !== undefined ? {
            monday: {
              from: bikePark.openingHours?.monday?.from,
              to: bikePark.openingHours?.monday?.to,
            }
          } : {}),
          ...(bikePark?.openingHours?.tuesday !== undefined ? {
            tuesday: {
              from: bikePark.openingHours?.tuesday?.from,
              to: bikePark.openingHours?.tuesday?.to,
            }
          } : {}),
          ...(bikePark?.openingHours?.wednesday !== undefined ? {
            wednesday: {
              from: bikePark.openingHours?.wednesday?.from,
              to: bikePark.openingHours?.wednesday?.to,
            }
          } : {}),
          ...(bikePark?.openingHours?.thursday !== undefined ? {
            thursday: {
              from: bikePark.openingHours?.thursday?.from,
              to: bikePark.openingHours?.thursday?.to,
            }
          } : {}),
          ...(bikePark?.openingHours?.friday !== undefined ? {
            friday: {
              from: bikePark.openingHours?.friday?.from,
              to: bikePark.openingHours?.friday?.to,
            }
          } : {}),
          ...(bikePark?.openingHours?.saturday !== undefined ? {
            saturday: {
              from: bikePark.openingHours?.saturday?.from,
              to: bikePark.openingHours?.saturday?.to,
            }
          } : {}),
          ...(bikePark?.openingHours?.sunday !== undefined ? {
            sunday: {
              from: bikePark.openingHours?.sunday?.from,
              to: bikePark.openingHours?.sunday?.to,
            }
          } : {}),
        },
        photos: data?.bikePark?.photos ?? [],
        videos: data?.bikePark?.videos ?? [],
        rules: data?.bikePark?.rules ?? [],
        facilities: data?.bikePark?.facilities ?? [],
        features: data?.bikePark?.features ?? [],
        prices: data?.bikePark?.prices ?? [] as any
      })
    }
  }, [bikePark, data?.bikePark?.facilities, data?.bikePark?.features, data?.bikePark?.photos, data?.bikePark?.prices, data?.bikePark?.rules, data?.bikePark?.videos, form])

  useEffect(() => {
    if (!navigator.geolocation) {
      return;
    }
    navigator.geolocation.getCurrentPosition(
      position => {
        form.setValue("coordinates.latitude", position.coords.latitude);
        form.setValue("coordinates.longitude", position.coords.longitude);
      },
    );
  }, []);

  const isLoading = fetching || stale || createBikeParkRes.fetching || updateBikeParkRes.fetching || deleteBikeParkRes.fetching;

  return (
    <div className="container mx-auto px-4 py-8">
      {isLoading && (
        <div className="flex items-center justify-center h-40 w-40 shadow-2xl absolute top-[50%] left-[50%] bg-white">
          <i className="fas fa-spinner fa-spin text-emerald-500 text-4xl"></i>
        </div>
      )}
      <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">{id ? "Edit Bike Park" : "Create Bike Park"}</h1>
          <div className="flex gap-4">
            <button
              className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200"
              onClick={handleCancel}
            >
              Cancel
            </button>
            {(userData.data?.me?.role === "admin" || bikePark?.createdBy?.id === userData.data?.me?.id) && (
              <>
                {location.pathname !== "/bike-park/new" && (
                  <button
                    type="button"
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                )}
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                >
                  {id ? "Save" : "Create Park"}
                </button>
              </>
            )}
          </div>
        </div>
        <div className="grid xl:grid-cols-2 gap-8">
          <BikeParkFormBasicInfo form={form} />
          <BikeParkFormFeaturesMedia form={form} />
        </div>
      </form >
      {showCreatedModal && (
        <BikeParkCreatedDalog data={showCreatedModal} onClose={handleCloseSuccessModal} />
      )}
      {showUpdatedModal && (
        <BikeParkUpdatedDalog data={showUpdatedModal} onClose={handleCloseSuccessModal} />
      )}
      {showDeletedModal && (
        <BikeParkDeletedDialog data={showDeletedModal} onClose={handleCloseSuccessModal} />
      )}
      {showDeleteConfirmModal && (
        <BikeParkDeleteConfirmDialog
          isOpen={showDeleteConfirmModal}
          bikePark={bikePark as BikePark}
          onClose={() => setShowDeleteConfirmModal(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

export default BikeParkForm;
