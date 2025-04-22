import React from "react";
import { Card, CardBody, CardFooter, Button, Chip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { format } from "timeago.js";
import type { Story } from "../types/story";

interface StoryCardProps {
  story: Story;
  isAdmin?: boolean;
  onDelete?: (id: string) => void;
}

export const StoryCard: React.FC<StoryCardProps> = ({
  story,
  isAdmin,
  onDelete,
}) => {
  return (
    <Card className="w-full" isHoverable>
      <CardBody className="gap-3">
        {story.title && (
          <h3 className="story-title text-2xl font-semibold text-primary-600">
            {story.title}
          </h3>
        )}
        <p className="text-foreground/90 leading-relaxed">{story.content}</p>
        {story.tag && (
          <Chip color="primary" variant="flat" size="sm" className="self-start">
            {story.tag}
          </Chip>
        )}
      </CardBody>
      <CardFooter className="flex justify-between items-center">
        <span className="text-sm text-foreground/60">
          {format(story.createdAt)}
        </span>
        {isAdmin && (
          <Button
            isIconOnly
            size="sm"
            color="danger"
            variant="light"
            onPress={() => onDelete?.(story.id)}
            className="ml-auto"
          >
            <Icon icon="lucide:trash-2" className="w-4 h-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
