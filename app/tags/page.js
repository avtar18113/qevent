import Tag from "@/components/Tag";

async function getTags() {
  const res = await fetch("https://qevent-backend.labs.crio.do/tags", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tags");
  }

  return res.json();
}

export default async function TagsPage() {
  const tags = await getTags();

  return (
    <main className="px-8 py-10">
      <h1 className="text-5xl font-bold max-sm:text-3xl bg-gradient-to-br from-orange-400 to-teal-600 bg-clip-text text-transparent mx-4 mb-8">
        Tags
      </h1>

      <div className="flex flex-wrap items-center justify-center gap-4 mt-16">
        {tags.map((tag) => (
          <Tag key={tag.id || tag.name || tag} text={tag.name || tag} clickable />
        ))}
      </div>
    </main>
  );
}