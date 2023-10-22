import { api } from "@/trpc/server";
import { ThemeToggle } from "./_components/ThemeToggle";
import Map from "./_components/Map";
import Logo from "./_components/Logo";
import RotatingEmoji from "./_components/RotatingEmoji";
import { UserButton, currentUser } from "@clerk/nextjs";
import { Button } from "./_components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./_components/ui/card";
import DeleteButton from "./_components/DeleteButton";
import { MapIcon } from "lucide-react";

export default async function Home() {
  const user = await currentUser();
  const earth = ["🌎", "🌍", "🌏"];
  const moon = ["🌑", "🌒", "🌓", "🌔", "🌕"];
  const girlies = ["🖐️", "✊", "🖐️", "🖐️"];
  const emojiList = [earth, moon, girlies];

  const selectedEmoji =
    emojiList[Math.floor(Math.random() * emojiList.length)]!;

  return (
    <main className="">
      <div className="flex w-full items-center gap-2 border-b p-6">
        <ThemeToggle />
        <span className="text-4xl">
          <RotatingEmoji emoji={selectedEmoji} />
        </span>
        <div className="ml-auto">
          {user ? (
            <UserButton />
          ) : (
            <a href="/sign-in">
              <Button>Sign in</Button>
            </a>
          )}
        </div>
      </div>
      <div className="container flex flex-col items-center justify-center gap-6 px-4 py-8 md:gap-12 md:py-16">
        <div className="flex flex-col gap-4">
          <Logo />
          <p>
            Find safe and inclusive spaces for queer people around the world.
          </p>
        </div>

        <div className="w-full">
          <Map />
        </div>

        <CrudShowcase />
      </div>
    </main>
  );
}

async function CrudShowcase() {
  const allPlaces = await api.place.getAllPlaces.query();

  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-4xl font-bold">All safe spaces</h2>
      <div className="grid gap-2">
        {allPlaces.reverse().map((place) => (
          <div key={place.id}>
            <Card>
              <CardHeader><h3 className="text-xl font-bold">{place.name}</h3></CardHeader>
              <CardContent><p>{place.address}</p></CardContent>
              <CardFooter className="flex items-center gap-4">
                <a href={'https://google.com/maps/search/' + place.address} target="_blank" rel="noopener noreferrer">
                  <Button className="flex items-center gap-2"><MapIcon />Directions</Button>
                </a>

                {process.env.NODE_ENV === 'development' && (
                  <DeleteButton id={place.id} />
                )}
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
