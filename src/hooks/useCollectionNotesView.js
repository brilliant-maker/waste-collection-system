import useSBView from "./useSBView.js";

export default function useCollectionNotesView() {

  const {
    items,
    isRetrieving,
    retrieveError,
    retrieveItems
  } = useSBView({
    view: "collection_notes_view",
    retrieveFields: "*"
  });

  return {
    collectionNotes: items || [],
    isCollectionNotesRetrieving: isRetrieving,
    collectionNotesRetrieveError: retrieveError,
    retrieveCollectionNotes: retrieveItems
  };
}
