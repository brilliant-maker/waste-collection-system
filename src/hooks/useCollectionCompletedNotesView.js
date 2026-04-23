import useSBView from "./useSBView.js";

export default function useCollectionCompletedNotesView() {

  const {
    items,
    isRetrieving,
    retrieveError,
    retrieveItems
  } = useSBView({
    view: "collection_completed_notes_view",
    retrieveFields: "*"
  });

  return {
    collectionCompletedNotes: items || [],
    isCollectionCompletedNotesRetrieving: isRetrieving,
    collectionCompletedNotesRetrieveError: retrieveError,
    retrieveCollectionCompletedNotes: retrieveItems
  };
}
