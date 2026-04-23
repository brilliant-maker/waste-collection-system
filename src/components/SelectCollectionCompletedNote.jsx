import Card from "./Card.jsx";
import Badge from "./Badge.jsx";
import Text from "./Text.jsx";

export default function SelectCollectionCompletedNote({
  collectionCompletedNotes,
  collectionNoteId,
  setCollectionNoteId
}) {
  
  
  const main = collectionCompletedNotes.map(collectionCompletedNote => (
    <Card
      key={collectionCompletedNote.collection_note_id}
      className={`${collectionNoteId === collectionCompletedNote.collection_note_id ? "selected" : ""}`}
      onClick={() => setCollectionNoteId(collectionCompletedNote.collection_note_id)}>
      {collectionNoteId === collectionCompletedNote.collection_note_id && (
      <Badge>
        ✓
      </Badge>)}
      <Text>
        Note: {collectionCompletedNote.collection_note_long}
      </Text>
    </Card>
  ));

  return (
    <>
      {main}
    </>
  );
};
