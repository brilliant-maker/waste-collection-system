import Modal from "./Modal.jsx";
import Card from "./Card.jsx";
import Badge from "./Badge.jsx";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import HeadingThree from "./HeadingThree.jsx";
import Text from "./Text.jsx";
import Button from "./Button.jsx";
import DAY_NAMES from "../constants/DAY_NAMES.js";

export default function SelectWardScheduleDayModal({
  selectedDay,
  setSelectedDay,
  isSelectWardScheduleDayModalOpen,
  onSelectWardScheduleDayModalClose
}) {
  
  const handleClose = () => {
    onSelectWardScheduleDayModalClose();
  }
  
  const main = (
    <Modal
      isOpen={isSelectWardScheduleDayModalOpen}>
      <Header className="modal-header">
        <HeadingThree>
          Select Day
        </HeadingThree>
      </Header>
      <Main className="modal-main">
        {DAY_NAMES.length > 0 && (
        DAY_NAMES.map((dayName, dayNumber) => (
        <Card
          key={dayNumber}
          className={`${dayNumber === selectedDay.dayNumber ? "selected" : ""}`}
          onClick={() => setSelectedDay({
            dayNumber,
            dayName: DAY_NAMES[dayNumber]})}>
          {dayNumber === selectedDay.dayNumber && (
          <Badge>
            ✓
          </Badge>)}
          <Text>
            Day Name: {dayName}
          </Text>
        </Card>)))}
      </Main>
      <Footer className="modal-footer">
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
