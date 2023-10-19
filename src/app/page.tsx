import { api } from "@/trpc/server";
import CreatePost from "./_components/CreatePost";
import { ThemeToggle } from "./_components/ThemeToggle";
import Map from "./_components/Map";

export default async function Home() {
  const hello = await api.post.hello.query({ text: "from tRPC" });

  return (
    <main className="">
      <div>
        <ThemeToggle />
      </div>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Queer<span className="text-[hsl(280,100%,70%)]">Space</span>🌎
        </h1>

        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl">
            {hello ? hello.greeting : "Loading tRPC query..."}
          </p>
        </div>

        <Map />

        <CrudShowcase />
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
