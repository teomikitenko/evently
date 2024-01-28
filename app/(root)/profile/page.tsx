import { currentUser } from "@clerk/nextjs";
import MyTickets from "@/components/MyTickets";
import EventOrganized from "@/components/EventOrganized";
import { getProfileEvents } from "@/configs/db";

export const dynamic = "force-dynamic";

const MyProfile = async () => {
  const user = await currentUser();
  const userFullName = user?.lastName
    ? user?.firstName + " " + user?.lastName
    : user?.firstName;
  const eventsData = await getProfileEvents(userFullName as string);
  return (
    <div className="flex flex-col">
      <MyTickets data={eventsData.my_ticket} images={eventsData.images} />
      <EventOrganized data={eventsData.organised} images={eventsData.images} />
    </div>
  );
};

export default MyProfile;
