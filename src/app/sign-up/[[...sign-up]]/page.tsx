import Logo from "@/app/_components/Logo";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-full h-screen grid place-content-center">
      <div className="flex flex-col gap-12 items-center">
        <Logo />
        <SignUp />
      </div>
    </div>
  );
}
