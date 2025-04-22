import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
} from "@heroui/react";
import { Icon } from "@iconify/react";

const TAGS = [
  "kindness",
  "career",
  "love",
  "family",
  "friendship",
  "growth",
  "inspiration",
  "gratitude",
];

interface StoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (story: { content: string; title: string; tag: string }) => void;
}

export const StoryForm: React.FC<StoryFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [content, setContent] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [tag, setTag] = React.useState("");

  const handleSubmit = () => {
    if (!content.trim()) return;

    onSubmit({
      content: content.trim(),
      title: title.trim(),
      tag: tag,
    });

    setContent("");
    setTitle("");
    setTag("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      size="2xl"
      classNames={{
        base: "bg-content1",
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h2 className="story-title text-2xl">Share Your Story</h2>
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4">
                <Input
                  label="Title (Optional)"
                  placeholder="Give your story a title"
                  value={title}
                  onValueChange={setTitle}
                  startContent={
                    <Icon
                      icon="lucide:feather"
                      className="text-default-400 w-4 h-4"
                    />
                  }
                />
                <Textarea
                  label="Your Story"
                  placeholder="Share how a small action made a big impact..."
                  value={content}
                  onValueChange={setContent}
                  minRows={4}
                  maxRows={8}
                  isRequired
                />
                <Select
                  label="Tag (Optional)"
                  placeholder="Select a category"
                  selectedKeys={tag ? [tag] : []}
                  onSelectionChange={(keys) =>
                    setTag(Array.from(keys)[0] as string)
                  }
                >
                  {TAGS.map((tag) => (
                    <SelectItem key={tag}>
                      {tag.charAt(0).toUpperCase() + tag.slice(1)}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color="primary"
                onPress={handleSubmit}
                isDisabled={!content.trim()}
              >
                Share Story
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
