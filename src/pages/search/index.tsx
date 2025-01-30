import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { apiClient } from "@/utils/api-client"; // Assuming apiClient is set up for making API calls
import { SEARCH_CONTACTS_ROUTES, SEND_FRIEND_REQUEST } from "@/utils/constants";
import { toast } from "sonner";


interface SearchResult {
  _id: string;
  username: string;
  profilePicture: string;
  friendRequestSent: boolean; // Track if the friend request has already been sent
}

export default function SearchComponent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Handle search on button click or pressing Enter
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    try {
      const response = await apiClient.get(
        `${SEARCH_CONTACTS_ROUTES}?query=${searchQuery}`,
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        const results = response.data.map((user: SearchResult) => ({
          ...user,
          friendRequestSent: false, // Initialize friendRequestSent to false for each user
        }));
        setSearchResults(results); // Set search results in state
      }
    } catch (error) {
      console.error("Search error", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press for searching
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Handle sending the friend request
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
        setSearchResults((prevResults) =>
          prevResults.map((result) =>
            result._id === userId ? { ...result, friendRequestSent: true } : result
          )
        );
        toast.success("Friend request sent successfully.");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error sending friend request : ", (error as any).response?.data.message);
        toast.error((error as any).response?.data.message);
      } else {
        console.error("Error sending friend request : ", error);
      }
    }
  };

  return (
    <div className="md:w-[700px] mx-auto pt-5">
      <div className="flex space-x-2 p-4">
        <Input
          type="text"
          placeholder="Search for friends..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyPress} // Trigger search on Enter key press
        />
        <Button onClick={handleSearch} disabled={isLoading}>
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </div>

      {searchResults.length > 0 && (
        <div className="w-full z-10">
          <div className="grid gap-4 p-4">
            {searchResults.map((result) => (
              <Card key={result._id}>
                <CardContent className="flex items-center space-x-4 pt-6">
                  <Avatar>
                    <AvatarImage
                      src={result.profilePicture}
                      alt={result.username}
                    />
                    <AvatarFallback>{result.username.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{result.username}</p>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => handleSendFriendRequest(result._id)}
                    disabled={result.friendRequestSent}
                  >
                    {result.friendRequestSent ? "Request Sent" : "Add Friend"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
