import Navbar from "@/components/Navbar";

export default function MetabolismeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Navbar />
      <main className="flex-1 min-h-0">
        {children}
      </main>
    </div>
  )
}