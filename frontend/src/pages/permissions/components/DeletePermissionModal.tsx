import DeleteConfirmationModal from "../../../components/DeleteConfirmationModal";

interface DeletePermissionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

const DeletePermissionModal: React.FC<DeletePermissionModalProps> = ({ isOpen, onClose, onConfirm }) => {
    return (
        <DeleteConfirmationModal
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={onConfirm}
            title="Delete Permission"
            message="Are you sure you want to delete this permission?"
        />
    );
};

export default DeletePermissionModal;
