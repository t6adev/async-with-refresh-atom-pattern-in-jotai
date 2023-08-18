import { atom } from "jotai";

let likes = 10;
const fetchLikes = async () => {
  await new Promise((r) =>
    setTimeout(() => {
      r(true);
    }, 500)
  );
  return likes;
};
const countUpLike = async () => {
  await new Promise((r) =>
    setTimeout(() => {
      r(true);
    }, 500)
  );
  likes++;
};

const baseRefreshAtom = atom(0);
const refreshAtom = atom(null, (get, set) => {
  set(baseRefreshAtom, get(baseRefreshAtom) + 1);
});

export const likesAtom = atom(async (get) => {
  get(baseRefreshAtom);
  const result = await fetchLikes();
  return result;
});

export const countUpLikeAtom = atom(null, async (get, set) => {
  await countUpLike();
  set(refreshAtom);
});
