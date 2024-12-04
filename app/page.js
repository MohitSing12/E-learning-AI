import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h2>Hello Ji, Kaise Ho</h2>
      <Button>Click Here!</Button>
      
      <UserButton/>
    </div>
  );
}
