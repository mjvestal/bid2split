import CreateForm from "@/components/CreateForm"
import Head from "next/head"

export default function CreatePage() {
  return (
    <div>
      <Head>
        <title>bid2split | Create a split for your next vacation rental</title>
      </Head>
      <div className="flex flex-col items-center py-2 pb-20 bg-[url('/images/bg_tile_gray.png')]">
        <main className="flex w-full flex-1 flex-col items-center justify-center px-10">
          <div className="flex max-w-2xl">
            <CreateForm />
          </div>
        </main>
      </div>
    </div>
  )
}