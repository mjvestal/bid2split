import CreateForm from "@/components/CreateForm"

export default function CreatePage() {
  return (
    <div className="flex flex-col items-center py-2 pb-20">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-10">
        <div className="flex max-w-2xl">
          <CreateForm />
        </div>
      </main>
    </div>
  )
}