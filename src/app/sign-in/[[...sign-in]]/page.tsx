import Logo from "@/app/_components/Logo";
import { Skeleton } from "@/app/_components/ui/skeleton";
import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-full h-screen grid place-content-center">
      <div className="flex flex-col gap-12 items-center isolate">
        <Logo />
        <div className="h-[270.25px]">
          <ClerkLoaded>
            <SignIn />
          </ClerkLoaded>
          <ClerkLoading>
            <Skeleton className="flex w-[25rem] h-full mb-[1.75rem] md:mx-[1.75rem]" style={{ maxWidth: "calc(-0.75rem + 100vw)", }} />
          </ClerkLoading>
        </div>
      </div>
    </div>
  );
}

