import { useEffect, useState } from "react";
import { useStore } from "../../context/StoreContext";
import SafeImage from "../shared/SafeImage";
import { fileToCompressedDataUrl } from "../../utils/image";
import ModalPortal from "../shared/ModalPortal";

const emptyForm = { name: "", category: "Men", price: "", stock: "", img: "", desc: "" };

export default function ProductModal({ open, onClose, editProduct }) {
  const { addOrUpdateProduct } = useStore();
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError("");
    setUploading(true);
    try {
      const dataUrl = await fileToCompressedDataUrl(file);
      setForm((f) => ({ ...f, img: dataUrl }));
    } catch (err) {
      setUploadError("Couldn't read that image. Try a different file.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  useEffect(() => {
    if (editProduct) {
      setForm({
        name: editProduct.name,
        category: editProduct.category,
        price: editProduct.price,
        stock: editProduct.stock,
        img: editProduct.img,
        desc: editProduct.desc,
      });
    } else {
      setForm(emptyForm);
    }
  }, [editProduct, open]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    addOrUpdateProduct(
      {
        name: form.name,
        category: form.category,
        price: parseFloat(form.price),
        stock: parseInt(form.stock, 10),
        img: form.img,
        desc: form.desc,
      },
      editProduct?.id
    );
    onClose();
  };

  return (
    <ModalPortal>
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl relative animate-fade-in max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-stone-400 hover:text-black text-lg"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        <h3 className="font-luxury text-2xl font-bold text-stone-900 mb-6">
          {editProduct ? "Edit Product" : "Add New Full Product"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1 uppercase">
              Product Name
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-brand-accent"
              placeholder="Silk Velvet Sherwani"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1 uppercase">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none"
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Unisex">Unisex</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1 uppercase">
                Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                required
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none"
                placeholder="290.00"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1 uppercase">
              Stock Qty
            </label>
            <input
              type="number"
              required
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none"
              placeholder="15"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1 uppercase">
              Product Image
            </label>
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-xl overflow-hidden border border-stone-200 bg-stone-50 shrink-0">
                <SafeImage src={form.img} alt="Preview" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full text-[11px] file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-bold file:uppercase file:tracking-wider file:bg-brand-primary file:text-white hover:file:bg-brand-accent hover:file:text-brand-primary file:cursor-pointer cursor-pointer"
                />
                {uploading && <p className="text-[10px] text-stone-400">Processing image...</p>}
                {uploadError && <p className="text-[10px] text-red-500">{uploadError}</p>}
              </div>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1 uppercase">
              Description
            </label>
            <textarea
              rows="3"
              required
              value={form.desc}
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none"
              placeholder="Handcrafted luxury attire..."
            />
          </div>
          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-brand-primary text-white py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-brand-accent hover:text-brand-primary transition shadow-md disabled:opacity-60"
          >
            {uploading ? "Please wait..." : "Save Product"}
          </button>
        </form>
      </div>
    </div>
    </ModalPortal>
  );
}
