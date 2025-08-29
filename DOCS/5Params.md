### newer Nextjs params needs to be awaited
This error occurs because in newer versions of Next.js, `params` is now a **Promise** that needs to be awaited. Here's the fix:

## Updated Solution:

```typescript
import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ listingId: string }> }  // params is a Promise
) {
  const currentUser = await getCurrentUser();
  
  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = await params;  // Await the params here

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds.push(listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      favoriteIds
    }
  });

  return NextResponse.json(user);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ listingId: string }> }  // params is a Promise
) {
  const currentUser = await getCurrentUser();
  
  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = await params;  // Await the params here

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  let favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds = favoriteIds.filter(id => id !== listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id
    },
    data: {
      favoriteIds
    }
  });

  return NextResponse.json(user);
}
```

## Key Changes:

1. **`params` is now a Promise**: `{ params: Promise<{ listingId: string }> }`
2. **Await params**: `const { listingId } = await params;`

## Alternative cleaner syntax:

```typescript
export async function POST(
  request: Request,
  { params }: { params: Promise<{ listingId: string }> }
) {
  const { listingId } = await params;  // Await first thing
  const currentUser = await getCurrentUser();
  
  // ... rest of your code
}
```

## Why this change happened:

Next.js recently updated to make `params` asynchronous to support:
- **Server Components**: Better integration with async components
- **Performance**: More efficient data loading
- **Concurrent Features**: Preparation for future React features

The error message you're seeing is a warning that becomes an error in production builds to ensure compatibility with the latest Next.js features.

This change should resolve both your local terminal error and the CI build failure.

### listing params issue
This error is happening because you're using `params` directly in a server component or server action without awaiting it. Here's how to fix it:

## For Server Components (`app/listings/[listingId]/page.tsx`):

```tsx
// app/listings/[listingId]/page.tsx
export default async function ListingPage({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) {
  // Await the params first
  const { listingId } = await params;
  
  // Then use it in your function
  const listing = await getListingById({ listingId });

  // ... rest of your component
}
```

## For Server Actions (`app/actions/getListingById.ts`):

```typescript
// app/actions/getListingById.ts
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId: string;
}

export default async function getListingById(
  params: Promise<IParams>  // Accept Promise<IParams>
) {
  try {
    const { listingId } = await params;  // Await the params

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    if (!listing) {
      return null;
    }

    return listing;
  } catch (error: any) {
    throw new Error(error);
  }
}
```

## Or if you want to keep the function signature the same:

```typescript
// app/actions/getListingById.ts
import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId: string;
}

export default async function getListingById(
  params: IParams  // Keep as IParams but call with awaited params
) {
  try {
    const { listingId } = params;

    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    if (!listing) {
      return null;
    }

    return listing;
  } catch (error: any) {
    throw new Error(error);
  }
}
```

Then in your page component:

```tsx
// app/listings/[listingId]/page.tsx
export default async function ListingPage({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) {
  const { listingId } = await params;
  const listing = await getListingById({ listingId }); // Pass as object
  
  // ... rest of your component
}
```

## Key Points:

1. **In server components**, `params` is now a `Promise` that needs to be awaited
2. **You need to `await params`** before destructuring or using its properties
3. **Server actions** should either accept `Promise<Params>` or be called with already-awaited params

## The fix is simple:

- **Before**: `const { listingId } = params;`
- **After**: `const { listingId } = await params;`

This change is required because Next.js 13+ made `params` asynchronous to support concurrent features and improve performance.