import React from 'react';
import { Button, Card, CardBody, useDisclosure } from "@heroui/react";
import { Icon } from "@iconify/react";
import { StoryCard } from './components/story-card';
import { StoryForm } from './components/story-form';
import { AdminLogin } from './components/admin-login';
import type { Story } from './types/story';

// In a real app, this would be an environment variable
const ADMIN_PASSWORD = "admin123";

export default function App() {
  const [stories, setStories] = React.useState<Story[]>(() => {
    const saved = localStorage.getItem('stories');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [isAdmin, setIsAdmin] = React.useState(false);
  const { isOpen: isFormOpen, onOpen: onFormOpen, onClose: onFormClose } = useDisclosure();
  const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure();

  React.useEffect(() => {
    localStorage.setItem('stories', JSON.stringify(stories));
  }, [stories]);

  const handleStorySubmit = (storyData: { content: string; title?: string; tag?: string }) => {
    const newStory: Story = {
      id: crypto.randomUUID(),
      content: storyData.content,
      title: storyData.title,
      tag: storyData.tag,
      createdAt: new Date(),
    };
    
    setStories(prev => [newStory, ...prev]);
  };

  const handleDelete = (id: string) => {
    setStories(prev => prev.filter(story => story.id !== id));
  };

  const handleAdminLogin = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      onLoginClose();
    }
  };

  return (
    <main className="min-h-screen bg-background pb-20">
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-primary-100">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="story-title text-3xl text-primary-500">
            Small Actions, Big Impact
          </h1>
          <div className="flex gap-2">
            <Button
              color="primary"
              variant="flat"
              onPress={onFormOpen}
              startContent={<Icon icon="lucide:plus" />}
            >
              Share Story
            </Button>
            {!isAdmin && (
              <Button
                isIconOnly
                variant="light"
                onPress={onLoginOpen}
                className="text-default-400"
              >
                <Icon icon="lucide:settings" />
              </Button>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 pt-24">
        <Card className="mb-8">
          <CardBody className="text-center space-y-2">
            <p className="text-xl text-foreground/90">
              Welcome to a space where small actions create ripples of change.
            </p>
            <p className="text-foreground/60">
              Share your story anonymously and inspire others.
            </p>
          </CardBody>
        </Card>

        <div className="space-y-6">
          {stories.map(story => (
            <StoryCard
              key={story.id}
              story={story}
              isAdmin={isAdmin}
              onDelete={handleDelete}
            />
          ))}
          
          {stories.length === 0 && (
            <div className="text-center text-foreground/60 py-12">
              <Icon icon="lucide:book-heart" className="w-12 h-12 mx-auto mb-4" />
              <p>No stories yet. Be the first to share!</p>
            </div>
          )}
        </div>
      </div>

      <StoryForm
        isOpen={isFormOpen}
        onClose={onFormClose}
        onSubmit={handleStorySubmit}
      />

      <AdminLogin
        isOpen={isLoginOpen}
        onClose={onLoginClose}
        onLogin={handleAdminLogin}
      />
    </main>
  );
}
