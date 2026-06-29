import ArtistCard from "@/components/ArtistCard";

async function getArtists() {
  const res = await fetch("https://qevent-backend.labs.crio.do/artists", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch artists");
  }

  return res.json();
}

export default async function ArtistsPage() {
  const artists = await getArtists();

  return (
    <main className="px-8 py-10">
      <h1 className="text-5xl font-bold max-sm:text-3xl bg-gradient-to-br from-orange-400 to-teal-600 bg-clip-text text-transparent mx-4 mb-8">
        Artists
      </h1>

      <div className="flex flex-wrap items-start justify-center gap-6 mb-32">
        {artists.map((artistData) => (
          <ArtistCard key={artistData.id || artistData.name} artistData={artistData} />
        ))}
      </div>
    </main>
  );
}