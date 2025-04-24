import React, { useMemo } from "react";
import { useMutation, useQuery } from "urql";
import { MeDocument, ToggleFavoriteBikeParkDocument } from "../../lib/graphql/generated/graphql-operations";

interface FavoriteButtonProps {
  id: string;
  iconOnly?: boolean;
  textAdd?: string;
  textRemove?: string;
  classes?: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ id, iconOnly, textAdd, textRemove, classes }) => {
  const [{ data: userData }] = useQuery({ query: MeDocument });
  const [{ fetching }, toggleFavorite] = useMutation(ToggleFavoriteBikeParkDocument);

  const isFavorite = useMemo(() => {
    if (!userData?.me?.stats?.favoriteParks) {
      return false;
    }
    return userData.me.stats.favoriteParks.includes(id);
  }, [userData?.me?.stats?.favoriteParks, id]);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite({ bikeParkId: id });
  };

  if (!userData?.me) {
    return null;
  }

  return (
    iconOnly ? (
      <button
        onClick={handleToggleFavorite}
        disabled={fetching}
        className={`${classes} text-gray-400 hover:text-red-500 transition-colors`}
        title={isFavorite ? "Remove from favorites" : "Add to favorites"}>
        <i key={`${isFavorite ? 'remove' : 'add'}-favorite`} className={`fa-${isFavorite ? 'solid' : 'regular'} fa-heart ${isFavorite ? 'text-red-500' : ''}`}></i>
      </button >
    ) : (
      <button
        onClick={handleToggleFavorite}
        disabled={fetching}
        className={`${classes} px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50`}>
        <i key={`${isFavorite ? 'remove' : 'add'}-favorite`} className={`fa-${isFavorite ? 'solid' : 'regular'} fa-heart mr-2 ${isFavorite ? 'text-red-500' : ''}`}></i>
        {isFavorite ? textRemove : textAdd}
      </button>
    )
  );
};

export default FavoriteButton;
