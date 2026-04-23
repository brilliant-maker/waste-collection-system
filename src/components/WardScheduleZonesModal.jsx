import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import Modal from "./Modal.jsx";
import Button from "./Button.jsx";
import WardScheduleZonesCard from "./WardScheduleZonesCard.jsx";

export default function WardScheduleZonesModal({
  wardScheduleZones,
  wardScheduleId,
  isWardScheduleZonesModalOpen,
  onWardScheduleZonesModalClose
}) {
  
  const main = (
    <Modal isOpen={isWardScheduleZonesModalOpen}>
      {wardScheduleZones.length > 0 && (
      <>
        <Main className="modal-main">
          <WardScheduleZonesCard
            wardScheduleId={wardScheduleId}
            wardScheduleZones={wardScheduleZones}/>
        </Main>
        <Footer className="modal-footer">
          <Button
            className="button-outline button-small"
            onClick={onWardScheduleZonesModalClose}>
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
