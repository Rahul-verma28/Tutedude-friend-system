// import { Button } from "@/components/ui/button";
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import { UserPlus } from "lucide-react";

// const friendRequests = [
//   { id: 1, name: "Emma Watson", avatar: "/avatars/emma.jpg" },
//   { id: 2, name: "Tom Hardy", avatar: "/avatars/tom.jpg" },
//   { id: 3, name: "Scarlett Johansson", avatar: "/avatars/scarlett.jpg" },
//   // ... more requests
// ];

// export function Requests() {
//   return (
//     <Sheet>
//       <TooltipProvider>
//         <Tooltip>
//           <SheetTrigger asChild>
//             <TooltipTrigger asChild>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="border-border size-8 shrink-0 border"
//               >
//                 <UserPlus className="w-5 h-5" />
//                 <span className="sr-only">Friend requests</span>
//               </Button>
//             </TooltipTrigger>
//           </SheetTrigger>
//           <TooltipContent align="end">Friend requests</TooltipContent>
//           <SheetContent>
//             <SheetHeader>
//               <SheetTitle>Friend Requests</SheetTitle>
//               <SheetDescription>
//                 Manage your incoming friend requests
//               </SheetDescription>
//             </SheetHeader>
//             <div className="space-y-4 mt-6">
//               {friendRequests.map((request) => (
//                 <div key={request.id} className="flex items-center space-x-4">
//                   <Avatar>
//                     <AvatarImage src={request.avatar} alt={request.name} />
//                     <AvatarFallback>{request.name.charAt(0)}</AvatarFallback>
//                   </Avatar>
//                   <div className="flex-1">
//                     <p className="text-sm font-medium">{request.name}</p>
//                   </div>
//                   <div className="space-x-2">
//                     <Button size="sm" variant="outline">
//                       Accept
//                     </Button>
//                     <Button size="sm" variant="ghost">
//                       Decline
//                     </Button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </SheetContent>
//         </Tooltip>
//       </TooltipProvider>
//     </Sheet>
//   );
// }



// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
// import { UserPlus } from "lucide-react";
// import axios from "axios"; // Assuming you're using axios for API calls
// import { ACCEPT_FRIEND_REQUEST, ALL_FRIEND_REQUEST, REJECT_FRIEND_REQUEST } from "@/utils/constants";
// import { apiClient } from "@/utils/api-client";

// // Define the type for a friend request
// interface FriendRequest {
//   id: string;
//   name: string;
//   avatar: string;
// }

// export function Requests() {
//   const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   // Fetch friend requests when the component mounts
//   useEffect(() => {
//     const fetchFriendRequests = async () => {
//       setIsLoading(true);
//       try {
//         const response = await apiClient.get(ALL_FRIEND_REQUEST, { withCredentials: true });
//         setFriendRequests(response.data);
//         console.log(friendRequests);
//       } catch (error) {
//         console.error("Error fetching friend requests:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchFriendRequests();
//   }, []);

//   // Handle accepting a friend request
//   const handleAcceptRequest = async (userId: string) => {
//     try {
//       await apiClient.post(
//         ACCEPT_FRIEND_REQUEST,
//         { requestId: userId },
//         { withCredentials: true }
//       );
//       setFriendRequests((prev) => prev.filter((request) => request.id !== userId));
//     } catch (error) {
//       console.error("Error accepting friend request", error);
//     }
//   };

//   // Handle declining a friend request
//   const handleDeclineRequest = async (userId: string) => {
//     try {
//       await apiClient.post(
//         REJECT_FRIEND_REQUEST,
//         { requestId: userId },
//         { withCredentials: true }
//       );
//       setFriendRequests((prev) => prev.filter((request) => request.id !== userId));
//     } catch (error) {
//       console.error("Error declining friend request", error);
//     }
//   };

//   return (
//     <Sheet>
//       <TooltipProvider>
//         <Tooltip>
//           <SheetTrigger asChild>
//             <TooltipTrigger asChild>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="border-border size-8 shrink-0 border"
//               >
//                 <UserPlus className="w-5 h-5" />
//                 <span className="sr-only">Friend requests</span>
//               </Button>
//             </TooltipTrigger>
//           </SheetTrigger>
//           <TooltipContent align="end">Friend requests</TooltipContent>
//           <SheetContent>
//             <SheetHeader>
//               <SheetTitle>Friend Requests</SheetTitle>
//               <SheetDescription>
//                 Manage your incoming friend requests
//               </SheetDescription>
//             </SheetHeader>
//             <div className="space-y-4 mt-6">
//               {isLoading ? (
//                 <div>Loading...</div>
//               ) : friendRequests.length > 0 ? (
//                 friendRequests.map((request) => (
//                   <div key={request._id} className="flex items-center space-x-4">
//                     <Avatar>
//                       <AvatarImage src={request.avatar} alt={request.username} />
//                       {/* <AvatarFallback>{request.name.charAt(0)}</AvatarFallback> */}
//                     </Avatar>
//                     <div className="flex-1">
//                       <p className="text-sm font-medium">{request.email}</p>
//                     </div>
//                     <div className="space-x-2">
//                       <Button
//                         size="sm"
//                         variant="outline"
//                         onClick={() => handleAcceptRequest(request._id)}
//                       >
//                         Accept
//                       </Button>
//                       <Button
//                         size="sm"
//                         variant="ghost"
//                         onClick={() => handleDeclineRequest(request._id)}
//                       >
//                         Decline
//                       </Button>
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div>No friend requests</div>
//               )}
//             </div>
//           </SheetContent>
//         </Tooltip>
//       </TooltipProvider>
//     </Sheet>
//   );
// }





import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { UserPlus } from "lucide-react";
import { ACCEPT_FRIEND_REQUEST, ALL_FRIEND_REQUEST, REJECT_FRIEND_REQUEST } from "@/utils/constants";
import { apiClient } from "@/utils/api-client";

// Define the type for a friend request
interface FriendRequest {
  _id: string;
  username: string;
  email: string;
  avatar: string;
}

export function Requests() {
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch friend requests when the component mounts
  useEffect(() => {
    const fetchFriendRequests = async () => {
      setIsLoading(true);
      try {
        const response = await apiClient.get(ALL_FRIEND_REQUEST, { withCredentials: true });
        setFriendRequests(response.data);
      } catch (error) {
        console.error("Error fetching friend requests:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFriendRequests();
  }, []);

  // Handle accepting a friend request
  const handleAcceptRequest = async (userId: string) => {
    try {
      await apiClient.post(
        ACCEPT_FRIEND_REQUEST,
        { requestId: userId },
        { withCredentials: true }
      );
      setFriendRequests((prev) => prev.filter((request) => request._id !== userId));
    } catch (error) {
      console.error("Error accepting friend request", error);
    }
  };

  // Handle declining a friend request
  const handleDeclineRequest = async (userId: string) => {
    try {
      await apiClient.post(
        REJECT_FRIEND_REQUEST,
        { requestId: userId },
        { withCredentials: true }
      );
      setFriendRequests((prev) => prev.filter((request) => request._id !== userId));
    } catch (error) {
      console.error("Error declining friend request", error);
    }
  };

  return (
    <Sheet>
      <TooltipProvider>
        <Tooltip>
          <SheetTrigger asChild>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="border-border size-8 shrink-0 border"
              >
                <UserPlus className="w-5 h-5" />
                <span className="sr-only">Friend requests</span>
              </Button>
            </TooltipTrigger>
          </SheetTrigger>
          <TooltipContent align="end">Friend requests</TooltipContent>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Friend Requests</SheetTitle>
              <SheetDescription>
                Manage your incoming friend requests
              </SheetDescription>
            </SheetHeader>
            <div className="space-y-4 mt-6">
              {isLoading ? (
                <div>Loading...</div>
              ) : friendRequests.length > 0 ? (
                friendRequests.map((request) => (
                  <div key={request._id} className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={request.avatar} alt={request.username} />
                      <AvatarFallback>{request.username.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{request.username.toUpperCase()}</p>
                      <p className="text-sm">{request.email.toLowerCase()}</p>
                    </div>
                    <div className="space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAcceptRequest(request._id)}
                      >
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeclineRequest(request._id)}
                      >
                        Decline
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div>No friend requests</div>
              )}
            </div>
          </SheetContent>
        </Tooltip>
      </TooltipProvider>
    </Sheet>
  );
}