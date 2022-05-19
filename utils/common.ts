export const isFavorite = (
  userId: string,
  favorites?: Array<{
    userid: string;
  }>
) => {
  const match = favorites?.filter((favorite) => favorite.userid === userId);
  if (match?.length !== 0) return true;
  return false;
};
