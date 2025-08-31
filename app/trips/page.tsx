import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import TripsCLient from "./TripsClient";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();
  
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState 
          title="Unauthorized"
          subtitle="Please log in."
        />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({
    userId: currentUser.id
  });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState 
          title="No trips found"
          subtitle="Looks like you have no trips planned."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <TripsCLient 
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}

export default TripsPage