import Modal from "@modules/layout/modal";
import { useUI } from "@context/ui-managed-context";
import LoginView from "@modules/login-view";

interface Props {}

const ModalUI: React.FC<Props> = () => {
  const { displayModal, closeModal, modalView } = useUI();

  return (
    <Modal
      onClose={closeModal}
      open={displayModal}
      cancelable={modalView.cancelable}
    >
      {modalView.name === "LOGIN_VIEW" ? <LoginView /> : <></>}
    </Modal>
  );
};
export default ModalUI;
