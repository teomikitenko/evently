import { currentUser } from "@clerk/nextjs";
import MyTickets from "@/components/MyTickets";
import EventOrganized from "@/components/EventOrganized";
import { getProfileEvents } from "@/configs/db";

// TODO:Order details (only event you organized)

const MyProfile = async () => {
  const user = await currentUser();
  const userFullName = user?.firstName + " " + user?.lastName;
  const eventsData = await getProfileEvents(userFullName);
  return (
    <div className="flex flex-col">
      <MyTickets data={eventsData.my_ticket} images={eventsData.images} />
      <EventOrganized data={eventsData.organised} images={eventsData.images} />
    </div>
  );
};

export default MyProfile;