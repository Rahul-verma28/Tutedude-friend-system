import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/store";
import { Link, useNavigate } from "react-router-dom";
import { apiClient } from "@/utils/api-client";
import { LOGOUT_ROUTE, GET_USER_INFO } from "@/utils/constants"; // Add the new route for fetching user info
import { toast } from "sonner";
import { useEffect } from "react";

export default function ProfilePage() {
  const { userInfo, setUserInfo } = useAppStore();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await apiClient.post(LOGOUT_ROUTE, {}, { withCredentials: true });
      if (response.status === 200) {
        toast.success("Logged out successfully.");
        navigate("/login");
        setUserInfo(undefined);
      }
    } catch (error) {
      console.log(error);
      toast.error("Logout failed. Please try again.");
    }
  };

  // Fetch user profile info on component mount
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setUserInfo(response.data); // Update user info in the store
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to load user profile.");
      }
    };
    fetchUserInfo();
  }, [setUserInfo]);

  return (
    <main className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
          <CardDescription>
            View and manage your personal information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage
                  src={userInfo?.profilePicture}
                  alt={`${userInfo?.username}`}
                />
                <AvatarFallback>{userInfo?.username.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-2xl font-semibold">{userInfo?.username}</h3>
                <p className="text-sm text-muted-foreground">{userInfo?.email}</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Bio</h4>
              <p className="mt-1">{userInfo?.bio}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">Interests</h4>
              <p className="mt-1">{userInfo?.interests}</p>
            </div>
            <Link to="/profile-setup" className="mr-5">
              <Button>Edit Profile</Button>
            </Link>
            <Button onClick={logout} variant="destructive">
              Logout
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
