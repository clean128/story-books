import { Button, Card, CardBody, useDisclosure } from "@heroui/react";
import { Icon } from "@iconify/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";

import { AdminLogin } from "./components/admin-login";
import { AdminLogout } from "./components/admin-logout";
import { StoryCard } from "./components/story-card";
import { StoryForm } from "./components/story-form";
import type { Story, StoryBody } from "./types/story";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [stories, setStories] = useState<Story[]>([]);

  const {
    isOpen: isFormOpen,
    onOpen: onFormOpen,
    onClose: onFormClose,
  } = useDisclosure();
  const {
    isOpen: isLoginOpen,
    onOpen: onLoginOpen,
    onClose: onLoginClose,
  } = useDisclosure();
  const {
    isOpen: isLogoutOpen,
    onOpen: onLogoutOpen,
    onClose: onLogoutClose,
  } = useDisclosure();

  const getAllStories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/story/list");
      const fetchedStories = response.data.map((story: any) => ({
        ...story,
        id: story._id,
      })) as Story[];

      setStories(fetchedStories);
    } catch (error) {
      toast.error("Failed to fetch stories", {
        position: "bottom-right",
        className: "bg-error text-white",
      });
      console.error("Error fetching stories:", error);
      return;
    }
  };

  const handleStorySubmit = async (storyData: {
    content: string;
    title: string;
    tag: string;
  }) => {
    const newStory: StoryBody = {
      content: storyData.content,
      title: storyData.title,
      tag: storyData.tag,
      createdAt: new Date(),
    };

    try {
      const res = await axios.post(
        "http://localhost:8080/api/story/add",
        newStory
      );

      if (res.data.status === "error") {
        toast.error(res.data.message, {
          position: "bottom-right",
          className: "bg-error text-white",
        });
        return;
      }

      setStories((prev) => [
        {
          ...newStory,
          id: res.data._id,
        } as Story,
        ...prev,
      ]);
      toast.success(res.data.message, {
        position: "bottom-right",
        className: "bg-success text-white",
      });
    } catch (error: any) {
      toast.error(error.message, {
        position: "bottom-right",
        className: "bg-error text-white",
      });
      console.error("Error adding stories:", error);
      return;
    }
  };

  const handleDelete = async (id: string) => {
    if (!localStorage.getItem("accessToken")) {
      toast.error("You must sign in as admin.", {
        position: "bottom-right",
        className: "bg-error text-white",
      });
      return;
    }
    try {
      const res = await axios.post("http://localhost:8080/api/story/delete", {
        storyId: id,
      });

      if (res.data.status === "success") {
        setStories((prev) => prev.filter((story) => story.id !== id));
        toast.success(res.data.message, {
          position: "bottom-right",
          className: "bg-success text-white",
        });
        return;
      }
    } catch (error: any) {
      toast.error(error.message, {
        position: "bottom-right",
        className: "bg-error text-white",
      });
      console.error("Error deleting stories:", error);
      return;
    }
  };

  const handleAdminLogin = async (password: string) => {
    try {
      const res = await axios.post("http://localhost:8080/api/auth/signin", {
        password: password,
      });

      if (res.data.accessToken) {
        localStorage.setItem("accessToken", res.data.accessToken);
        toast.success(res.data.message, {
          position: "bottom-right",
          className: "bg-success text-white",
        });
        setIsAdmin(true);
        onLoginClose();
        return;
      }
    } catch (error: any) {
      toast.error(error.message, {
        position: "bottom-right",
        className: "bg-error text-white",
      });
      console.error("Error:", error);
      return;
    }
  };

  const handleLogout = () => {
    if (localStorage.getItem("accessToken")) {
      localStorage.removeItem("accessToken");
      setIsAdmin(false);
      onLogoutClose();
      toast.success("Logged out successfully", {
        position: "bottom-right",
        className: "bg-success text-white",
      });
    }
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setIsAdmin(true);
    }
    getAllStories();
  }, []);

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
            {isAdmin ? (
              <Button
                isIconOnly
                variant="light"
                onPress={onLogoutOpen}
                className="text-default-400"
              >
                <Icon icon="lucide:log-out" />
              </Button>
            ) : (
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
          {stories.map((story) => (
            <StoryCard
              key={story.id}
              story={story}
              isAdmin={isAdmin}
              onDelete={handleDelete}
            />
          ))}

          {stories.length === 0 && (
            <div className="text-center text-foreground/60 py-12">
              <Icon
                icon="lucide:book-heart"
                className="w-12 h-12 mx-auto mb-4"
              />
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

      <AdminLogout
        isOpen={isLogoutOpen}
        onClose={onLogoutClose}
        onLogout={handleLogout}
      />

      <ToastContainer
        position="bottom-right"
        icon={false}
        hideProgressBar={true}
        autoClose={3000}
        transition={Bounce}
        closeOnClick
        pauseOnHover={false}
      />
    </main>
  );
}
