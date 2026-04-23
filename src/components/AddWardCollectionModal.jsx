import { useState } from "react";
import Modal from "./Modal.jsx";
import Card from "./Card.jsx";
import Header from "./Header.jsx";
import HeadingThree from "./HeadingThree.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import Text from "./Text.jsx";
import LoadingText from "./LoadingText.jsx";
import ErrorText from "./ErrorText.jsx";
import Button from "./Button.jsx";
import SelectCollectionCompletedNote from "./SelectCollectionCompletedNote.jsx";
import SelectCollectionMissedNote from "./SelectCollectionMissedNote.jsx";
import useCollectionNotesView from "../hooks/useCollectionNotesView.js";
import useCollectionCompletedNotesView from "../hooks/useCollectionCompletedNotesView.js";
import useCollectionMissedNotesView from "../hooks/useCollectionMissedNotesView.js";
import useWardCollectionRPC from "../hooks/useWardCollectionRPC.js";

export default function AddWardCollectionModal({
  wardSchedule,
  wardScheduleLoaders,
  wardScheduleZones,
  isAddWardCollectionCompletedModalOpen,
  onAddWardCollectionCompletedModalClose,
  isAddWardCollectionMissedModalOpen,
  onAddWardCollectionMissedModalClose
}) {
  
  const [collectionNoteId, setCollectionNoteId] = useState(null);
  
  const { collectionNotes, isCollectionNotesRetrieving, collectionNotesRetrieveError } = useCollectionNotesView();
  const { collectionCompletedNotes, isCollectionCompletedNotesRetrieving, collectionCompletedNotesRetrieveError } = useCollectionCompletedNotesView();
  const { collectionMissedNotes, isCollectionMissedNotesRetrieving, collectionMissedNotesRetrieveError } = useCollectionMissedNotesView();
  
  const { addWardCollection, getState } = useWardCollectionRPC();
  const { data : addWardCollectionData, isExecuting : isAddWardCollectionExecuting, error : addWardCollectionError } = getState("addWardCollection");
  
  const handleAddWardCollection = async () => {
    
    const collectionNote = collectionNotes.find(
    cn => cn.collection_note_id === collectionNoteId
  );

  const wardLoaderDetails = wardScheduleLoaders
    .filter(wsl => wsl.ward_schedule_id === wardSchedule.ward_schedule_id);

  const zoneDetails = wardScheduleZones
    .filter(wsz => wsz.ward_schedule_id === wardSchedule.ward_schedule_id);
    
    const wardCollectionPayload = {
      ward_id: wardSchedule.ward_id,
      ward_name: wardSchedule.ward_name,
      ward_supervisor_profile_id: wardSchedule.ward_supervisor_profile_id,
      ward_supervisor_user_id: wardSchedule.ward_supervisor_user_id,
      ward_supervisor_first_name: wardSchedule.ward_supervisor_first_name,
      ward_supervisor_middle_name: wardSchedule.ward_supervisor_middle_name,
      ward_supervisor_last_name: wardSchedule.ward_supervisor_last_name,
      ward_supervisor_phone_number: wardSchedule.ward_supervisor_phone_number,
      ward_supervisor_gender_type: wardSchedule.ward_supervisor_gender_type,
      ward_supervisor_role_type: wardSchedule.ward_supervisor_role_type,
      ward_driver_profile_id: wardSchedule.ward_driver_profile_id,
      ward_driver_user_id: wardSchedule.ward_driver_user_id,
      ward_driver_first_name: wardSchedule.ward_driver_first_name,
      ward_driver_middle_name: wardSchedule.ward_driver_middle_name,
      ward_driver_last_name: wardSchedule.ward_driver_last_name,
      ward_driver_phone_number: wardSchedule.ward_driver_phone_number,
      ward_driver_gender_type: wardSchedule.ward_driver_gender_type,
      ward_driver_role_type: wardSchedule.ward_driver_role_type,
      ward_vehicle_type: wardSchedule.ward_vehicle_type,
      ward_vehicle_plate_number: wardSchedule.ward_vehicle_plate_number,
      ward_waste_type: wardSchedule.ward_waste_type,
      day_name: wardSchedule.day_name,
      shift_type: wardSchedule.shift_type,
      starts_at: wardSchedule.starts_at,
      ends_at: wardSchedule.ends_at,
      collection_status_type: collectionNote.collection_status_type,
      collection_note_short: collectionNote.collection_note_short,
      collection_note_long: collectionNote.collection_note_long,
      ward_loader_details: wardLoaderDetails.map(wld => ({
        ward_id: wld.ward_id,
        profile_id: wld.ward_loader_profile_id,
        user_id: wld.ward_loader_user_id,
        first_name: wld.ward_loader_first_name,
        middle_name: wld.ward_loader_middle_name,
        last_name: wld.ward_loader_last_name,
        phone_number: wld.ward_loader_phone_number,
        gender_type: wld.ward_loader_gender_type,
        role_type: wld.ward_loader_role_type
      })),
      zone_details: zoneDetails.map(zd => ({
        ward_id: zd.ward_id,
        name: zd.zone_name,
      }))
    }
    
    await addWardCollection(wardCollectionPayload);
    
    isAddWardCollectionMissedModalOpen
    ?
    onAddWardCollectionMissedModalClose()
    :
    onAddWardCollectionCompletedModalClose()
    
    setCollectionNoteId(null);
  };
  
  const handleClose = () => {
    isAddWardCollectionMissedModalOpen
    ?
    onAddWardCollectionMissedModalClose()
    :
    onAddWardCollectionCompletedModalClose()
    
    setCollectionNoteId(null);
  }
  
  const main = (
    <Modal isOpen={isAddWardCollectionCompletedModalOpen || isAddWardCollectionMissedModalOpen}>
      <Header className="modal-header">
        <HeadingThree>
          {isAddWardCollectionMissedModalOpen ? "Select Missed Note" : "Select Completed Note"}
        </HeadingThree>
      </Header>
      <Main className="modal-main">
        {isCollectionNotesRetrieving ||
        isCollectionCompletedNotesRetrieving ||
        isCollectionMissedNotesRetrieving ? (
          <LoadingText>
            Loading...
          </LoadingText>
        ) :
        collectionNotesRetrieveError ||
        collectionCompletedNotesRetrieveError ||
        collectionMissedNotesRetrieveError ? (
          <ErrorText>
            Error: {
            collectionNotesRetrieveError ||
            collectionCompletedNotesRetrieveError ||
            collectionMissedNotesRetrieveError
            }
          </ErrorText>
        ) : (
        <Card>
          {isAddWardCollectionMissedModalOpen ?
          <SelectCollectionMissedNote
            collectionMissedNotes={collectionMissedNotes}
            collectionNoteId={collectionNoteId}
            setCollectionNoteId={setCollectionNoteId}
            />
          :
          <SelectCollectionCompletedNote
            collectionCompletedNotes={collectionCompletedNotes}
            collectionNoteId={collectionNoteId}
            setCollectionNoteId={setCollectionNoteId}/>}
        </Card>)}
      </Main>
      <Footer className="modal-footer">
        {addWardCollectionError && (
          <ErrorText>
            {addWardCollectionError}
          </ErrorText>
        )}
        <Button
          className="button-secondary button-medium"
          onClick={handleAddWardCollection}>
          {isAddWardCollectionExecuting ? "Adding Collection..." : "Add Collection"}
        </Button>
        <Button
          className="button-outline button-small"
          onClick={handleClose}>
          Close
        </Button>
      </Footer>
    </Modal>
  );
  
  return (
    <>
      {main}
    </>
  );
};
