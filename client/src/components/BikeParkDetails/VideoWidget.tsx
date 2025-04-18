import React from 'react';
import { BikePark } from '../../lib/graphql/generated/graphql-operations';
import { getYouTubeEmbedUrl } from '../../lib/helpers/common-helper';

const VideoWidget: React.FC<{ bikePark: BikePark }> = ({ bikePark }) => {
  if (!bikePark.videos?.length) {
    return <div />
  }
  return (
    <div id="park-video" className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-xl font-bold mb-4">Featured Video</h3>
      <div className="relative aspect-video rounded-lg overflow-hidden">
        <iframe
          width="100%"
          height="100%"
          src={getYouTubeEmbedUrl(bikePark.videos[0])}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        ></iframe>

        {/* <div className="absolute inset-0 flex items-center justify-center">
          <button className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
            <i className="fa-solid fa-play text-2xl text-emerald-600"></i>
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default VideoWidget;