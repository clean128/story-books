import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { Icon } from "@iconify/react";

interface AdminLogoutProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
}

export const AdminLogout: React.FC<AdminLogoutProps> = ({
  isOpen,
  onClose,
  onLogout,
}) => {
  const handleLogout = () => {
    onLogout();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} size="sm">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Confirm Logout
            </ModalHeader>
            <ModalBody>
              <div className="flex items-center gap-2">
                <p>Are you sure you want to log out from admin account?</p>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={handleLogout}>
                Logout
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
