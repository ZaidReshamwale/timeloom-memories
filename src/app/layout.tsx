import Image from "next/image";
import { createUserCollection } from "../services/collections"; // adjust path
import { useState } from "react";

const images = [
  "/photo1.jpg",
  "/photo2.jpg",
  "/photo3.jpg",
  "/photo4.jpg",
  "/photo5.jpg",
  "/photo6.jpg",
  "/photo7.jpg",
  "/photo8.jpg",
];

export default function Home() {
  const [status, setStatus] = useState("");

  const handleCreateCollection = async () => {
    try {
      const userUid = "02899e41ab7641da9d3af26c3c3da8d5";
      const token = "<YOUR_NWB_TOKEN>"; // Replace or fetch dynamically

      const payload = {
        name: "My Web Collection",
        type: "image-video",
        source: "userCollection",
        clientAttributes: [{ name: "source", value: "web-ui" }],
        coverItem: "dv-node://02899e41ab7641da9d3af26c3c3da8d5:laptop:Yu1uv",
        collectionItems: [
          { uri: "dv-node://02899e41ab7641da9d3af26c3c3da8d5:laptop:Dk42v" },
          { uri: "dv-node://02899e41ab7641da9d3af26c3c3da8d5:laptop:Yu1uv" },
        ],
      };

      const res = await createUserCollection(userUid, payload, token);
      setStatus(`✅ Created: ${res?.id ?? "Success"}`);
    } catch (error) {
      setStatus(`❌ Error: ${(error as Error).message}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="columns-2 sm:columns-3 md:columns-4 gap-4 p-4 pb-20">
        {images.map((src, index) => (
          <div
            key={index}
            className="mb-4 rounded-xl overflow-hidden break-inside-avoid shadow-sm"
          >
            <Image
              src={src}
              alt={`photo-${index}`}
              width={500}
              height={500}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-sm flex justify-around items-center h-16 z-50">
        <NavItem icon="/icons/memories.png" label="Memories" />
        <NavItem icon="/icons/create.png" label="Generate" active onClick={handleCreateCollection} />
        <NavItem icon="/icons/search.png" label="Search" />
      </nav>

      {status && (
        <div className="fixed bottom-20 left-0 right-0 text-center text-sm text-green-600">
          {status}
        </div>
      )}
    </div>
  );
}

function NavItem({
  icon,
  label,
  active = false,
  onClick,
}: {
  icon: string;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center text-xs text-gray-600 hover:text-black focus:outline-none"
    >
      <Image
        src={icon}
        alt={label}
        width={24}
        height={24}
        className={`mb-1 transition duration-150 ${
          active ? "animate-bounce" : "opacity-60"
        }`}
      />
      <span className={active ? "font-semibold text-black" : ""}>{label}</span>
    </button>
  );
}

