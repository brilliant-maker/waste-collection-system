import Card from "./Card.jsx";
import Badge from "./Badge.jsx";
import Text from "./Text.jsx";

export default function SelectCollectionMissedNote({
  collectionMissedNotes,
  collectionNoteId,
  setCollectionNoteId
}) {
  
  const main = collectionMissedNotes.map(collectionMissedNote => (
    <Card
      key={collectionMissedNote.collection_note_id}
      className={`${collectionNoteId === collectionMissedNote.collection_note_id ? "selected" : ""}`}
      onClick={() => setCollectionNoteId(collectionMissedNote.collection_note_id)}>
        {collectionNoteId === collectionMissedNote.collection_note_id && (
      <Badge>
        ✓
      </Badge>)}
      <Text>
        Note: {collectionMissedNote.collection_note_long}
      </Text>
    </Card>
  ));

  return (
    <>
      {main}
    </>
  );
};
