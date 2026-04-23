import useSBView from "./useSBView.js";

export default function useCollectionMissedNotesView() {

  const {
    items,
    isRetrieving,
    retrieveError,
    retrieveItems
  } = useSBView({
    view: "collection_missed_notes_view",
    retrieveFields: "*"
  });

  return {
    collectionMissedNotes: items || [],
    isCollectionMissedNotesRetrieving: isRetrieving,
    collectionMissedNotesRetrieveError: retrieveError,
    retrieveCollectionMissedNotes: retrieveItems
  };
}
