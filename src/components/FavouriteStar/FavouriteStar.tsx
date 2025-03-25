import SelectStar from "/static/svg/favourite_select.svg";
import NotSelectStar from "/static/svg/favourite_not_select.svg";
import useFavouriteMutation from "../../hooks/queries/useFavouriteMutation";
interface FavouriteStarProps {
  isFavourite: boolean;
  id: number;
  type: "room" | "device";
  onClick?: (isFavourite: boolean) => void;
  className?: string;
}
export default function FavouriteStar({
  isFavourite,
  onClick,
  className,
  id,
  type,
}: FavouriteStarProps) {
  const mutation = useFavouriteMutation(onClick);
  const handleFavouriteClick = () => {
    mutation.mutate({
      id,
      is_favourite: isFavourite,
      type,
    });
  };

  return (
    <>
      <img
        src={isFavourite ? SelectStar : NotSelectStar}
        alt="Star"
        width="24"
        height="24"
        onClick={handleFavouriteClick}
        className={className}
      />
    </>
  );
}
