import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@heroui/react";
import { Icon } from "@iconify/react";

interface UpdatePasswordProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdatePassword: (currentPassword: string, newPassword: string) => void;
}

export const UpdatePassword: React.FC<UpdatePasswordProps> = ({
  isOpen,
  onClose,
  onUpdatePassword,
}) => {
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = () => {
    if (
      !currentPassword.trim() ||
      !newPassword.trim() ||
      !confirmPassword.trim()
    ) {
      setError("All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords don't match");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setError("");
    onUpdatePassword(currentPassword, newPassword);

    // Reset form
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const resetForm = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
  };

  // Reset form when modal is closed
  React.useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} size="sm">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Update Admin Password
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <Input
                  type="password"
                  label="Current Password"
                  placeholder="Enter current password"
                  value={currentPassword}
                  onValueChange={setCurrentPassword}
                  startContent={
                    <Icon
                      icon="lucide:key"
                      className="text-default-400 w-4 h-4"
                    />
                  }
                />
                <Input
                  type="password"
                  label="New Password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onValueChange={setNewPassword}
                  startContent={
                    <Icon
                      icon="lucide:lock"
                      className="text-default-400 w-4 h-4"
                    />
                  }
                />
                <Input
                  type="password"
                  label="Confirm New Password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onValueChange={setConfirmPassword}
                  startContent={
                    <Icon
                      icon="lucide:check-circle"
                      className="text-default-400 w-4 h-4"
                    />
                  }
                />
                {error && <p className="text-danger text-sm">{error}</p>}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color="primary"
                onPress={handleSubmit}
                isDisabled={
                  !currentPassword.trim() ||
                  !newPassword.trim() ||
                  !confirmPassword.trim()
                }
              >
                Update Password
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
