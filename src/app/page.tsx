import { api } from "@/trpc/server";
import CreatePost from "./_components/CreatePost";
import { ThemeToggle } from "./_components/ThemeToggle";
import Map from "./_components/Map";
import Logo from "./_components/Logo";
import RotatingEmoji from "./_components/RotatingEmoji";

export default async function Home() {
  const hello = await api.post.hello.query({ text: "from tRPC" });
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
      </div>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <Logo />
        <p>
          Find safe and inclusive spaces for queer people around the world.
        </p>

        {/* <div className="flex flex-col items-center gap-2">
          <p className="text-2xl">
            {hello ? hello.greeting : "Loading tRPC query..."}
          </p>
        </div> */}

        <div className="w-full">
          {/* <Map /> */}
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
  const latestPost = await api.post.getLatest.query();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
