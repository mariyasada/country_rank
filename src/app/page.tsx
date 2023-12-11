import Link from "next/link";

export default function Home() { 
  return (
    <main className="h-screen bg-gradient-to-br from-sky-200 to-sky-400 opacity-100 flex">
      <div className="m-auto font-serif text-white text-5xl  max-[1100px]:text-2xl">Let's <Link href={"/signup"} className="text-blue-400">explore</Link> country rank...🚀</div>
    </main>
  )
}
