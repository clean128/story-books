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
import { UpdatePassword } from "./components/update-password";

const BACKEND_URL = "https://anemo-230k.onrender.com/api";

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
  const {
    isOpen: isUpdatingPasswordOpen,
    onOpen: onUpdatingPasswordOpen,
    onClose: onUpdatingPasswordClose,
  } = useDisclosure();

  const getAllStories = async () => {
    try {
      const response = await axios.get(BACKEND_URL + "/story/list", {
        headers: {
          "ngrok-skip-browser-warning": "123",
        },
      });

      if (response.data.length > 0) {
        const fetchedStories = response.data.map((story: any) => ({
          ...story,
          id: story._id,
        })) as Story[];

        setStories(
          fetchedStories.sort((a, b) => {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          })
        );
      }
    } catch (error) {
      toast.error("Failed to fetch stories", {
        position: "bottom-right",
        className: "bg-error text-white",
      });
      console.error("Error fetching stories:", error);
      throw error;
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
      const res = await axios.post(BACKEND_URL + "/story/add", newStory);

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
      throw error;
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
      const res = await axios.post(BACKEND_URL + "/story/delete", {
        storyId: id,
      });

      if (res.data.status === "success") {
        setStories((prev) => prev.filter((story) => story.id !== id));
        toast.success(res.data.message, {
          position: "bottom-right",
          className: "bg-success text-white",
        });
        return;
      } else {
        toast.error(res.data.message, {
          position: "bottom-right",
          className: "bg-error text-white",
        });
        return;
      }
    } catch (error: any) {
      toast.error(error.message, {
        position: "bottom-right",
        className: "bg-error text-white",
      });
      console.error("Error deleting stories:", error);
      throw error;
    }
  };

  const handleAdminLogin = async (password: string) => {
    try {
      const res = await axios.post(BACKEND_URL + "/auth/signin", {
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
      } else {
        toast.error(res.data.message, {
          position: "bottom-right",
          className: "bg-error text-white",
        });
        return;
      }
    } catch (error: any) {
      toast.error(error.message, {
        position: "bottom-right",
        className: "bg-error text-white",
      });
      console.error("Error:", error);
      throw error;
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

  const handleUpdatePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    try {
      const response = await axios.post(BACKEND_URL + "/password", {
        currentPassword,
        newPassword,
      });

      if (response.data.status === "success") {
        toast.success("Password updated successfully", {
          position: "bottom-right",
          className: "bg-success text-white",
        });
        onUpdatingPasswordClose();
        return;
      } else {
        toast.error(response.data.message, {
          position: "bottom-right",
          className: "bg-error text-white",
        });
        return;
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to update password", {
        position: "bottom-right",
        className: "bg-error text-white",
      });
      console.error("Error updating password:", error);
      throw error;
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
      {/* Header with gradient */}
      <nav className="fixed top-0 w-full bg-gradient-pink backdrop-blur-md z-50 shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Icon icon="lucide:feather" className="text-white text-2xl mr-2" />
            <h1 className="story-title text-4xl text-white font-display">
              Anemo
            </h1>
          </div>
          <div className="flex gap-2">
            <Button
              color="primary"
              variant="solid"
              onPress={onFormOpen}
              startContent={<Icon icon="lucide:plus" />}
              className="bg-white text-primary-500 hover:bg-primary-50"
            >
              Share Story
            </Button>
            {isAdmin ? (
              <div className="pl-2 flex gap-2">
                <Button
                  isIconOnly
                  variant="flat"
                  onPress={onUpdatingPasswordOpen}
                  className="text-white hover:bg-primary-400/50"
                >
                  <Icon icon="lucide:key" />
                </Button>

                <Button
                  isIconOnly
                  variant="flat"
                  onPress={onLogoutOpen}
                  className="text-white hover:bg-primary-400/50"
                >
                  <Icon icon="lucide:log-out" />
                </Button>
              </div>
            ) : (
              <Button
                isIconOnly
                variant="flat"
                onPress={onLoginOpen}
                className="text-white hover:bg-primary-400/50"
              >
                <Icon icon="lucide:settings" />
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero section with image and gradient overlay */}
      <div
        className="relative pt-32 pb-32 flex content-center items-center justify-center"
        style={{ minHeight: "50vh" }}
      >
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage: "url('/hero.jpg')",
            backgroundPosition: "center",
          }}
        >
          <span className="w-full h-full absolute opacity-70 bg-gradient-mixed"></span>
        </div>
        <div className="container relative mx-auto">
          <div className="items-center flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <div className="px-6">
                <h1 className="text-5xl font-bold text-white mb-4 font-display">
                  Share Your Voice
                </h1>
                <p className="text-xl text-white">
                  A space where small actions create ripples of change. Share
                  your story anonymously and inspire others.
                </p>
                <Button
                  className="mt-8 bg-white text-primary-500 font-bold shadow-lg hover:shadow-xl transition-all"
                  size="lg"
                  onPress={onFormOpen}
                  startContent={<Icon icon="lucide:feather" />}
                >
                  Start Writing
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <Card className="mb-8 border border-content2-border bg-content2">
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
            <Card className="p-12 bg-content3 border border-content3-border">
              <CardBody className="text-center text-foreground/60 py-12">
                <Icon
                  icon="lucide:book-heart"
                  className="w-16 h-16 mx-auto mb-4 text-accent-300"
                />
                <p className="text-xl">
                  No stories yet. Be the first to share!
                </p>
                <Button
                  color="primary"
                  variant="flat"
                  onPress={onFormOpen}
                  className="mt-4"
                >
                  Share Your Story
                </Button>
              </CardBody>
            </Card>
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

      <UpdatePassword
        isOpen={isUpdatingPasswordOpen}
        onClose={onUpdatingPasswordClose}
        onUpdatePassword={handleUpdatePassword}
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
