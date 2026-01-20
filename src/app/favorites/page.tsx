import FavoritesList from "@/components/FavoritesList";
import Navbar from "@/components/Navbar";

export default function FavoritesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <h1 className="mb-8 text-4xl font-bold text-white">My Cookbook</h1>
        <FavoritesList />
      </div>
    </main>
  );
}
