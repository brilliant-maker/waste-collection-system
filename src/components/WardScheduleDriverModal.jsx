import Modal from "./Modal.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import Button from "./Button.jsx";
import WardScheduleDriverCard from "./WardScheduleDriverCard.jsx";

export default function WardScheduleDriverModal({
  wardScheduleDrivers,
  wardScheduleDriverProfileId,
  isWardScheduleDriverModalOpen,
  onWardScheduleDriverModalClose
}) {
  
  const selectedWardScheduleDriver = wardScheduleDrivers.find((wardScheduleDriver) => {
    return wardScheduleDriver.ward_driver_profile_id === wardScheduleDriverProfileId
  });
  
  const main = (
    <Modal
      isOpen={isWardScheduleDriverModalOpen}> 
      {selectedWardScheduleDriver && (
      <>
        <Main className="modal-main">
          <WardScheduleDriverCard
            wardScheduleDriver={selectedWardScheduleDriver}/>
        </Main>
        <Footer className="modal-footer">
          <Button
            className="button-outline button-small"
            onClick={onWardScheduleDriverModalClose}>
            Close
          </Button>
        </Footer>
      </>)}
    </Modal>
  );

  return (
    <>
      {main}
    </>
  );
};
