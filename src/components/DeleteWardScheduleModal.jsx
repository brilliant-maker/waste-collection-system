import Modal from "./Modal.jsx";
import Card from "./Card.jsx";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import HeadingThree from "./HeadingThree.jsx";
import Text from "./Text.jsx";
import ErrorText from "./ErrorText.jsx";
import Button from "./Button.jsx";
import { showToast } from "./Toast.jsx";
import useWardScheduleRPC from "../hooks/useWardScheduleRPC.js";


export default function DeleteWardScheduleModal({
  retrieveWardSchedules,
  retrieveWardScheduleLoaders,
  retrieveWardScheduleZones,
  wardScheduleId,
  wardSchedules,
  isDeleteWardScheduleModalOpen,
  onDeleteWardScheduleModalClose
}) {
  
  const { deleteWardSchedule, getState } = useWardScheduleRPC();
  const { data : deleteWardScheduleData, isExecuting : isDeleteWardScheduleExecuting, error : deleteWardScheduleError } = getState("deleteWardSchedule");

  const selectedWardSchedule = wardSchedules.find(
    ws => ws.ward_schedule_id === wardScheduleId
  );
  
  const handleDeleteWardSchedule = async () => {
    const id = await deleteWardSchedule(wardScheduleId);
    
    retrieveWardSchedules();
    retrieveWardScheduleLoaders();
    retrieveWardScheduleZones();
    
    if(!id) {
      showToast("Failed to Delete Schedule","error");
    }
    
    showToast("Successfully Deleted Schedule ","success");
    
    onDeleteWardScheduleModalClose();
  };
  
  const handleClose = () => {
    onDeleteWardScheduleModalClose();
  }
  
  const main = (
    <Modal isOpen={isDeleteWardScheduleModalOpen}>
      <Header className="modal-header">
        <HeadingThree>
          Delete Schedule
        </HeadingThree>
      </Header>
      <Main className="modal-main">
        {selectedWardSchedule && (
        <Card>
          <Main>
            <Text>
              {`Are you sure you want to delete ${selectedWardSchedule.day_name} ${selectedWardSchedule.shift_type} schedule?. This action cannot be reversed.`}
            </Text>
          </Main>
        </Card>)}
      </Main>
      <Footer className="modal-footer">
        <Button
          className="button-danger button-medium"
          onClick={handleDeleteWardSchedule}>
          {isDeleteWardScheduleExecuting ? "Deleting Schedule" : "Delete Schedule"}
        </Button>
        <Button
          className="button-outline button-small"
          onClick={handleClose}>
          Close
        </Button>
        {deleteWardScheduleError && (
        <ErrorText>
          {deleteWardScheduleError}
        </ErrorText>)}
      </Footer>
    </Modal>
  );
  
  return (
    <>
      {main}
    </>
  );
};
