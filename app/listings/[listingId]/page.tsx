import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";

import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";

import ListingClient from "./ListingClient";

interface IParams {
  listingId: string;
}

export default async function ListingPage({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) {
  // Await the params first
  const { listingId } = await params;

  // Fetch data in parallel for better performance
  const [listing, currentUser] = await Promise.all([
    getListingById({ listingId }),
    getCurrentUser(),
  ]);
  
  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};
