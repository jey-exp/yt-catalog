"use client";

import { useLiveQuery } from "dexie-react-hooks";
import Link from "next/link";

import { HeartListIcon, StarIcon } from "~/components/custom/icons";
import JustTip from "~/components/custom/just-the-tip";
import { Button } from "~/components/shadcn/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/shadcn/sheet";
import { db } from "~/utils/db";

export default function FavoriteCatalog() {
  const favoriteCatalogs = useLiveQuery(() => db["favorites"].toArray(), []) ?? []

  return (
    <Sheet>
      <JustTip label="Favorite Catalogs">
        <SheetTrigger asChild>
          <Button variant="ghost">
            <HeartListIcon size={32} />
          </Button>
        </SheetTrigger>
      </JustTip>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <StarIcon className="w-5 h-5" />
            Favorite Catalogs
          </SheetTitle>
          <SheetDescription>
            Your collection of favorite catalogs
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <div className="grid gap-4">
            <div className="grid gap-4"></div>
            {favoriteCatalogs.map((favCatalog: any) => {
              return (
                <Link
                  className="flex items-start space-x-4 p-4 rounded-lg border bg-card"
                  href={`/c/${favCatalog.id}`}
                  key={favCatalog.id}
                >
                  <section>
                    <h3 className="font-semibold">{favCatalog.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {favCatalog.description}
                    </p>
                  </section>
                </Link>
              );
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
