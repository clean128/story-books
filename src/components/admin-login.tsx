import React from 'react';
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

interface AdminLoginProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (password: string) => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ isOpen, onClose, onLogin }) => {
  const [password, setPassword] = React.useState("");

  const handleSubmit = () => {
    if (!password.trim()) return;
    onLogin(password);
    setPassword("");
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={onClose}
      size="sm"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Admin Login
            </ModalHeader>
            <ModalBody>
              <Input
                type="password"
                label="Password"
                placeholder="Enter admin password"
                value={password}
                onValueChange={setPassword}
                startContent={
                  <Icon icon="lucide:lock" className="text-default-400 w-4 h-4" />
                }
              />
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button 
                color="primary" 
                onPress={handleSubmit}
                isDisabled={!password.trim()}
              >
                Login
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
