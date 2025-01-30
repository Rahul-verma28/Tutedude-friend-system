import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { apiClient } from "@/utils/api-client"; // Ensure this client is properly set up
import {
  GET_FRIEND_DETAILS,
  GET_USER_INFO,
  RECOMMENDATIONS,
  SEND_FRIEND_REQUEST,
} from "@/utils/constants"; // Define correct API endpoints
import { useAppStore } from "@/store";
import { User } from "@/types";
import { toast } from "sonner";


export default function Home() {
  const { setUserInfo } = useAppStore();
  const [recommendations, setRecommendations] = useState<User[]>([]);
  const [friends, setFriends] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);


  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO, {
          withCredentials: true,
        });
        if (response.status === 200) {
          setUserInfo(response.data);
          
          // Fetch details for each friend
          const friendsDetails = await Promise.all(
            response.data.friends.map(async (friendId: string) => {
              const friendResponse = await apiClient.get(`${GET_FRIEND_DETAILS}/${friendId}`, {
                withCredentials: true,
              });
              return friendResponse.data;
            })
          );
          setFriends(friendsDetails);
          console.log(response.data.friends);
        }

        // Fetch recommended friends list
        const recommendationsResponse = await apiClient.get<User[]>(
          RECOMMENDATIONS,
          {
            withCredentials: true,
          }
        );

        if (recommendationsResponse.status === 200) {
          setRecommendations(recommendationsResponse.data);
        }

        console.log(recommendations);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(true);

      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSendFriendRequest = async (userId: string) => {
    try {
      console.log("Sending friend request to", userId);
      const response = await apiClient.post(
        SEND_FRIEND_REQUEST,
        { targetUserId: userId },
        { withCredentials: true }
      );

      if (response.status === 200) {
        // Update the state to show the request was sent
        toast.success("Friend request sent successfully.");
      }
    } catch (error) {
      console.error(
        "Error sending friend request : ",
        error
      );
      toast.error("Already send friend request.");
    }
  };

  if (loading) {
    return <div className="text-center p-6">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center p-6 text-red-500">Failed to load data.</div>
    );
  }

  return (
    <main className="container mx-auto p-4">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Friends List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Friends</CardTitle>
            <CardDescription>Stay connected with your friends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {friends?.map((friend: User) => (
                <div key={friend._id} className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={friend.profilePicture || ""}
                      alt={friend.username}
                    />
                    <AvatarFallback>
                      {friend.username.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{friend.username}</p>
                    <p className="text-sm font-medium">{friend.email}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Message
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommendations List */}
        <Card>
          <CardHeader>
            <CardTitle>Friend Recommendations</CardTitle>
            <CardDescription>People you might know</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendations?.map((recommendation: User) => (
                <div
                  key={recommendation._id}
                  className="flex items-center space-x-4"
                >
                  <Avatar>
                    <AvatarImage
                      src={recommendation.profilePicture || ""}
                      alt={recommendation.username}
                    />
                    <AvatarFallback>
                      {recommendation.username.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {recommendation.username}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {/* {recommendation.friends.length} mutual friends */}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleSendFriendRequest(recommendation._id)}
                  >
                    Add Friend
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
