import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import Modal from "./Modal.jsx";
import Button from "./Button.jsx";
import WardScheduleLoadersCard from "./WardScheduleLoadersCard.jsx";

export default function WardScheduleLoadersModal({
  wardScheduleId,
  wardScheduleLoaders,
  isWardScheduleLoadersModalOpen,
  onWardScheduleLoadersModalClose
}) {
  
  const main = (
    <Modal isOpen={isWardScheduleLoadersModalOpen}>
    {wardScheduleLoaders.length > 0 && (
      <>
        <Main className="modal-main">
          <WardScheduleLoadersCard
            wardScheduleId={wardScheduleId}
            wardScheduleLoaders={wardScheduleLoaders}/>
        </Main>
        <Footer className="modal-footer">
          <Button
            className="button-outline button-small"
            onClick={onWardScheduleLoadersModalClose}>
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
