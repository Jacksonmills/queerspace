import { api } from "@/trpc/server";
import { ThemeToggle } from "./_components/ThemeToggle";
import Map from "./_components/Map";
import Logo from "./_components/Logo";
import RotatingEmoji from "./_components/RotatingEmoji";
import { UserButton, currentUser } from "@clerk/nextjs";
import CreatePlace from "./_components/CreatePlace";
import { Button } from "./_components/ui/button";

export default async function Home() {
  const user = await currentUser();
  const earth = ['🌎', '🌍', '🌏'];
  const moon = ['🌑', '🌒', '🌓', '🌔', '🌕'];
  const girlies = ['🖐️', '✊', '🖐️', '🖐️',];
  const emojiList = [earth, moon, girlies];

  const selectedEmoji = emojiList[Math.floor(Math.random() * emojiList.length)]!;

  return (
    <main className="">
      <div className="w-full border-b p-6 flex items-center gap-2">
        <ThemeToggle />
        <span className="text-4xl"><RotatingEmoji emoji={selectedEmoji} /></span>
        <div className="ml-auto">
          {user ? <UserButton /> : (
            <a href="/sign-in"><Button>Sign in</Button></a>
          )}
        </div>
      </div>
      <div className="container flex flex-col items-center justify-center gap-6 md:gap-12 px-4 py-8 md:py-16">
        <div className="flex flex-col gap-4">
          <Logo />
          <p>
            Find safe and inclusive spaces for queer people around the world.
          </p>
        </div>

        <div className="w-full">
          <Map />
        </div>
        {/* <div>
          <div className="w-full h-96 bg-gray-200 rounded-md animate-pulse"></div>
        </div> */}

        {/* <CrudShowcase /> */}
      </div>
    </main>
  );
}

async function CrudShowcase() {
  const allPlaces = await api.place.getAllPlaces.query();

  return (
    <div className="w-full max-w-xs">
      {
        allPlaces.map((place) => (
          <div key={place.id}>
            <h2>{place.name}</h2>
            <div>
              <span>{place.latitude}</span>
              <span>{place.longitude}</span>
            </div>
          </div>
        ))
      }
      <CreatePlace />
    </div>
  );
}
