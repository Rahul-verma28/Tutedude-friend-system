import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/store";
import { apiClient } from "@/utils/api-client";
import { UPDATE_PROFILE_ROUTE } from "@/utils/constants";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ProfileForm: React.FC = () => {
  const { userInfo, setUserInfo } = useAppStore();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [interests, setInterests] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (userInfo) {
      setUsername(userInfo.username || "");
      setBio(userInfo.bio || "");
      setInterests(userInfo.interests?.join(", ") || "");
      setAvatar(userInfo.profilePicture || "profilepicture");
    } else {
      // Redirect to profile setup if no userInfo is available
      navigate("/profile-setup");
    }
  }, [userInfo, navigate]);

  const validateProfile = () => {
    if (!username || !bio) {
      toast.error("Username & Bio are required.");
      return false;
    }
    return true;
  };

  const saveChanges = async () => {
    if (validateProfile()) {
      try {
        const response = await apiClient.post(
          UPDATE_PROFILE_ROUTE,
          {
            username,
            bio,
            interests: interests.split(",").map((interest) => interest.trim()),
            profilePicture: avatar,
          },
          { withCredentials: true }
        );
        if (response.status === 200 && response.data) {
          setUserInfo({ ...response.data });
          toast.success("Profile updated successfully.");
          navigate("/");
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error((error as any).response?.data?.message || error.message);
        } else {
          toast.error("An unknown error occurred");
        }
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "bio") setBio(value);
    if (name === "interests") setInterests(value);
  };

  return (
    <main className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Setup Profile</CardTitle>
          <CardDescription>
            View and manage your personal information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveChanges();
            }}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <Avatar className="w-20 h-20">
                <AvatarImage src={avatar} alt={`${username}`} />
                <AvatarFallback>{username.charAt(0)}</AvatarFallback>
              </Avatar>
              <Button type="button" variant="outline">
                Change Avatar
              </Button>
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                value={username}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">email</Label>
              <Input
                id="email"
                name="email"
                value={userInfo?.email}
                onChange={handleInputChange}
                disabled
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={bio}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="interests">Interests</Label>
              <Input
                id="interests"
                name="interests"
                value={interests}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  if (userInfo?.bio && username) {
                    navigate("/profile");
                  }
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
};

export default ProfileForm;
