import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import Modal from "./Modal.jsx";
import Button from "./Button.jsx";
import WardScheduleSupervisorCard from "./WardScheduleSupervisorCard.jsx";

export default function WardScheduleSupervisorModal({
  wardScheduleSupervisors,
  wardScheduleSupervisorProfileId,
  isWardScheduleSupervisorModalOpen,
  onWardScheduleSupervisorModalClose
}) {
  
  const selectedWardScheduleSupervisor = wardScheduleSupervisors.find((wardScheduleSupervisor) => {
    return wardScheduleSupervisor.ward_supervisor_profile_id === wardScheduleSupervisorProfileId
  });
  
  const main = (
    <Modal
      isOpen={isWardScheduleSupervisorModalOpen}> 
      {selectedWardScheduleSupervisor && (
      <>
        <Main className="modal-main">
          <WardScheduleSupervisorCard
            wardScheduleSupervisor={selectedWardScheduleSupervisor}/>
        </Main>
        <Footer className="modal-footer">
          <Button
            className="button-outline button-small"
            onClick={onWardScheduleSupervisorModalClose}>
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
