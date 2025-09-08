import Modal from '@/Components/Modal';
import Button from '@/Components/Button';

const BookingModal = ({ closeModal }) => {
  return (
    <Modal
      handleClose={closeModal}
      text={'Извините, пока у нас только один зал :('}>
        <Button
          onClick={closeModal}
          fullSize={true}
          size="l"
          label="Понятно"
          variant="blue-gradient"
          disabledShadow={true}
        />
    </Modal>
  )
}

export default BookingModal;