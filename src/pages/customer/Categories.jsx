import { useNavigate } from "react-router-dom";
import SafeImage from "../../components/shared/SafeImage";

const CATS = [
  {
    key: "Men",
    tag: "Regal Attire",
    title: "Men's Collection",
    desc: "Sherwanis, tailored tuxedos, and designer kurta sets.",
    img: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=800",
  },
  {
    key: "Women",
    tag: "Grace & Drape",
    title: "Women's Couture",
    desc: "Velvet gowns, organza ensembles, and silk wrap dresses.",
    img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=800",
  },
  {
    key: "Unisex",
    tag: "Finishing Touches",
    title: "Accessories",
    desc: "Handcrafted brooches, zari pocket squares, and luxury scarves.",
    img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800",
  },
];

export default function Categories() {
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <div className="mb-8">
        <span className="text-xs uppercase tracking-[0.2em] text-brand-accent font-bold">Collections</span>
        <h1 className="font-luxury text-3xl md:text-4xl font-bold text-brand-primary mt-1">
          Explore By Category
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {CATS.map((c) => (
          <div
            key={c.key}
            onClick={() => navigate(`/shop?cat=${c.key}`)}
            className="relative bg-stone-900 text-white rounded-3xl overflow-hidden aspect-[4/5] cursor-pointer group shadow-xl"
          >
            <SafeImage
              src={c.img}
              className="w-full h-full object-cover opacity-70 group-hover:scale-110 transition duration-700"
              alt={c.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-primary via-transparent to-transparent flex flex-col justify-end p-8">
              <span className="text-xs uppercase tracking-[0.3em] text-brand-accent font-bold mb-1">
                {c.tag}
              </span>
              <h3 className="font-luxury text-3xl font-bold mb-2">{c.title}</h3>
              <p className="text-xs text-stone-300">{c.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
