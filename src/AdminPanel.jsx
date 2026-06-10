import React, { useState, useRef } from "react";
import { uploadToCloudinary } from "./cloudinary";
import { Icons, ProductImagePlaceholder } from "./Icons";
import { useProducts } from "./ProductContext";

const CATEGORIES = ["mousepads", "home", "led"];
const BADGES = ["NEW", "HOT", "SALE"];
const CAROUSEL_TABS = [
  { key: "new", label: "New Arrivals" },
  { key: "bestseller", label: "Best Sellers" },
  { key: "handpicked", label: "Hand-Picked" },
];

const INPUT = {
  width: "100%",
  padding: "0.6rem 0.85rem",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.1)",
  background: "rgba(255,255,255,0.04)",
  color: "#f2ede4",
  fontSize: "0.85rem",
  fontFamily: "inherit",
  outline: "none",
  transition: "border 0.2s",
};
const LABEL = {
  fontSize: "0.68rem",
  letterSpacing: "0.12em",
  color: "rgba(218,165,50,0.6)",
  textTransform: "uppercase",
  fontWeight: 600,
  marginBottom: 6,
  display: "block",
};

const CAT_LABELS = {
  mousepads: "Mouse Pads",
  home: "Home Decor",
  led: "LED Products",
};
function Field({ label, children }) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={LABEL}>{label}</label>
      {children}
    </div>
  );
}

function ImageUploader({ value, onChange }) {
  const fileRef = useRef();
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const handleFile = async (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      onChange(url);
    } catch (err) {
      alert("Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };
  return (
    <div
      onClick={() => fileRef.current.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        handleFile(e.dataTransfer.files[0]);
      }}
      style={{
        width: "100%",
        height: 180,
        borderRadius: 14,
        cursor: "pointer",
        border: `2px dashed ${dragging ? "rgba(218,165,50,0.7)" : value ? "rgba(255,254,251,0.3)" : "rgba(255,255,255,0.1)"}`,
        background: dragging
          ? "rgba(218,165,50,0.06)"
          : "rgba(255,255,255,0.02)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
        transition: "all 0.2s",
      }}
    >
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => handleFile(e.target.files[0])}
      />
      {value ? (
        <>
          <img
            src={value}
            alt="preview"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              opacity: 0,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = 1)}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = 0)}
          >
            <Icons.Image size={28} color="#fff" />
            <span
              style={{
                fontSize: "0.75rem",
                color: "#fff",
                marginTop: 6,
                fontWeight: 600,
              }}
            >
              Change Image
            </span>
          </div>
        </>
      ) : (
        <div style={{ textAlign: "center", pointerEvents: "none" }}>
          <Icons.Upload size={36} color="rgba(218,165,50,0.5)" />
          <div
            style={{
              fontSize: "0.82rem",
              color: "rgba(255,181,21,0.98)",
              fontWeight: 600,
              marginTop: 8,
            }}
          >
            {uploading ? "Uploading..." : "Click or drag & drop"}
          </div>
          <div style={{ fontSize: "0.68rem", color: "#444", marginTop: 4 }}>
            JPG, PNG, WEBP
          </div>
        </div>
      )}
    </div>
  );
}

function ProductForm({ initial, onSave, onCancel }) {
  const empty = {
    name: "",
    cat: "mousepads",
    image: "",
    image2: "",
    image3: "",
    price: "",
    old: "",
    desc: "",
    meesho: "",
    amazon: "",
    rating: "",
    reviews: "",
    badges: [],
    colors: ["#daa532"],
  };
  const [form, setForm] = useState(initial || empty);
  const [errors, setErrors] = useState({});
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const toggleBadge = (b) =>
    set(
      "badges",
      form.badges.includes(b)
        ? form.badges.filter((x) => x !== b)
        : [...form.badges, b],
    );

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.price || isNaN(form.price)) e.price = "Valid price required";
    if (!form.old || isNaN(form.old)) e.old = "Valid MRP required";
    if (!form.image) e.image = "Upload a product image";
    if (form.meesho && !form.meesho.startsWith("http"))
      e.meesho = "Enter a valid URL";
    if (form.amazon && !form.amazon.startsWith("http"))
      e.amazon = "Enter a valid URL";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <div
      id="edit-form"
      style={{
        background: "rgba(16,14,24,0.98)",
        border: "1px solid rgba(218,165,50,0.2)",
        borderRadius: 20,
        padding: "2rem",
        backdropFilter: "blur(20px)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0 2rem",
        }}
      >
        {/* Left Column */}
        <div>
          <Field label="Product Image 1 (Main) *">
            <ImageUploader
              value={form.image}
              onChange={(v) => set("image", v)}
            />
            {errors.image && (
              <span
                style={{
                  fontSize: "0.7rem",
                  color: "#ef4444",
                  marginTop: 4,
                  display: "block",
                }}
              >
                {errors.image}
              </span>
            )}
          </Field>
          <Field label="Product Image 2 (optional)">
            <ImageUploader
              value={form.image2}
              onChange={(v) => set("image2", v)}
            />
          </Field>
          <Field label="Product Image 3 (optional)">
            <ImageUploader
              value={form.image3}
              onChange={(v) => set("image3", v)}
            />
          </Field>
          <Field label="Badges">
            <div style={{ display: "flex", gap: 8 }}>
              {BADGES.map((b) => {
                const active = form.badges.includes(b);
                const c = { NEW: "#22c55e", HOT: "#ef4444", SALE: "#daa532" }[
                  b
                ];
                return (
                  <button
                    key={b}
                    onClick={() => toggleBadge(b)}
                    style={{
                      padding: "0.4rem 1rem",
                      borderRadius: 8,
                      cursor: "pointer",
                      border: `1px solid ${active ? c : "rgba(255,255,255,0.1)"}`,
                      background: active ? `${c}22` : "transparent",
                      color: active ? c : "#555",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      transition: "all 0.2s",
                    }}
                  >
                    {b}
                  </button>
                );
              })}
            </div>
          </Field>
          <Field label="Total Reviews">
            <input
              style={INPUT}
              type="number"
              placeholder="e.g. 128"
              value={form.reviews || ""}
              onChange={(e) => set("reviews", e.target.value)}
              onFocus={(e) =>
                (e.target.style.borderColor = "rgba(218,165,50,0.5)")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = "rgba(255,255,255,0.1)")
              }
            />
          </Field>
          <Field label="Category">
            <select
              value={form.cat}
              onChange={(e) => set("cat", e.target.value)}
              style={{ ...INPUT, cursor: "pointer" }}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c} style={{ background: "#0e0c18" }}>
                  {CAT_LABELS[c]}
                </option>
              ))}{" "}
            </select>
          </Field>
        </div>

        {/* Right Column */}
        <div>
          <Field label="Product Name">
            <input
              style={{
                ...INPUT,
                borderColor: errors.name ? "#ef4444" : "rgba(255,255,255,0.1)",
              }}
              value={form.name}
              placeholder="e.g. GLCW Anime Mouse Pad"
              onChange={(e) => set("name", e.target.value)}
              onFocus={(e) =>
                (e.target.style.borderColor = "rgba(218,165,50,0.5)")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = errors.name
                  ? "#ef4444"
                  : "rgba(255,255,255,0.1)")
              }
            />
            {errors.name && (
              <span style={{ fontSize: "0.7rem", color: "#ef4444" }}>
                {errors.name}
              </span>
            )}
          </Field>
          <Field label="Rating (Out of 5)">
            <input
              style={INPUT}
              type="number"
              step="0.1"
              max="5"
              min="0"
              placeholder="e.g. 4.5"
              value={form.rating || ""}
              onChange={(e) => set("rating", e.target.value)}
              onFocus={(e) =>
                (e.target.style.borderColor = "rgba(218,165,50,0.5)")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = "rgba(255,255,255,0.1)")
              }
            />
          </Field>
          <Field label="Short Description">
            <input
              style={INPUT}
              value={form.desc}
              placeholder="e.g. 60x30cm, Non-Slip Rubber Base"
              onChange={(e) => set("desc", e.target.value)}
              onFocus={(e) =>
                (e.target.style.borderColor = "rgba(218,165,50,0.5)")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = "rgba(255,255,255,0.1)")
              }
            />
          </Field>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0 1rem",
            }}
          >
            <Field label="Selling Price (₹)">
              <input
                style={{
                  ...INPUT,
                  borderColor: errors.price
                    ? "#ef4444"
                    : "rgba(255,255,255,0.1)",
                }}
                type="number"
                value={form.price}
                placeholder="599"
                onChange={(e) => set("price", e.target.value)}
                onFocus={(e) =>
                  (e.target.style.borderColor = "rgba(218,165,50,0.5)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = errors.price
                    ? "#ef4444"
                    : "rgba(255,255,255,0.1)")
                }
              />
              {errors.price && (
                <span style={{ fontSize: "0.7rem", color: "#ef4444" }}>
                  {errors.price}
                </span>
              )}
            </Field>
            <Field label="MRP / Original (₹)">
              <input
                style={{
                  ...INPUT,
                  borderColor: errors.old ? "#ef4444" : "rgba(255,255,255,0.1)",
                }}
                type="number"
                value={form.old}
                placeholder="999"
                onChange={(e) => set("old", e.target.value)}
                onFocus={(e) =>
                  (e.target.style.borderColor = "rgba(218,165,50,0.5)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = errors.old
                    ? "#ef4444"
                    : "rgba(255,255,255,0.1)")
                }
              />
              {errors.old && (
                <span style={{ fontSize: "0.7rem", color: "#ef4444" }}>
                  {errors.old}
                </span>
              )}
            </Field>
          </div>
          <Field label="🛍️ Meesho Product Link">
            <input
              style={{
                ...INPUT,
                borderColor: errors.meesho
                  ? "#ef4444"
                  : "rgba(255,255,255,0.1)",
              }}
              value={form.meesho}
              placeholder="https://meesho.com/product/..."
              onChange={(e) => set("meesho", e.target.value)}
              onFocus={(e) => (e.target.style.borderColor = "#f43397")}
              onBlur={(e) =>
                (e.target.style.borderColor = errors.meesho
                  ? "#ef4444"
                  : "rgba(255,255,255,0.1)")
              }
            />
            {errors.meesho && (
              <span style={{ fontSize: "0.7rem", color: "#ef4444" }}>
                {errors.meesho}
              </span>
            )}
          </Field>
          <Field label="📦 Amazon Product Link">
            <input
              style={{
                ...INPUT,
                borderColor: errors.amazon
                  ? "#ef4444"
                  : "rgba(255,255,255,0.1)",
              }}
              value={form.amazon}
              placeholder="https://amazon.in/dp/..."
              onChange={(e) => set("amazon", e.target.value)}
              onFocus={(e) => (e.target.style.borderColor = "#ff9900")}
              onBlur={(e) =>
                (e.target.style.borderColor = errors.amazon
                  ? "#ef4444"
                  : "rgba(255,255,255,0.1)")
              }
            />
            {errors.amazon && (
              <span style={{ fontSize: "0.7rem", color: "#ef4444" }}>
                {errors.amazon}
              </span>
            )}
          </Field>
          {(form.name || form.image) && (
            <div
              style={{
                padding: "0.75rem 1rem",
                borderRadius: 12,
                background: "rgba(218,165,50,0.05)",
                border: "1px solid rgba(218,165,50,0.12)",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              {form.image ? (
                <img
                  src={form.image}
                  alt=""
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 8,
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 8,
                    background: "rgba(218,165,50,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icons.Image size={22} color="rgba(218,165,50,0.5)" />
                </div>
              )}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "0.88rem",
                    color: "#f2ede4",
                  }}
                >
                  {form.name || "Product Name"}
                </div>
                <div
                  style={{ fontSize: "0.75rem", color: "rgba(218,165,50,0.8)" }}
                >
                  ₹{form.price || "—"}
                  {form.old && (
                    <span
                      style={{
                        color: "#555",
                        textDecoration: "line-through",
                        marginLeft: 8,
                      }}
                    >
                      ₹{form.old}
                    </span>
                  )}
                </div>
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                {form.badges.map((b) => (
                  <span
                    key={b}
                    style={{
                      fontSize: "0.6rem",
                      padding: "2px 7px",
                      borderRadius: 5,
                      fontWeight: 700,
                      background: {
                        NEW: "#22c55e",
                        HOT: "#ef4444",
                        SALE: "#daa532",
                      }[b],
                      color: b === "SALE" ? "#000" : "#fff",
                    }}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: 10,
          marginTop: "1.5rem",
          justifyContent: "flex-end",
        }}
      >
        <button
          onClick={onCancel}
          style={{
            padding: "0.6rem 1.5rem",
            borderRadius: 10,
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#666",
            fontSize: "0.85rem",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => validate() && onSave(form)}
          style={{
            padding: "0.6rem 1.8rem",
            borderRadius: 10,
            background: "linear-gradient(135deg, #daa532, #f0c060)",
            border: "none",
            color: "#000",
            fontSize: "0.85rem",
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 0 20px rgba(218,165,50,0.3)",
          }}
        >
          {initial ? "✓ Save Changes" : "+ Add Product"}
        </button>
      </div>
    </div>
  );
}

function CarouselForm({ initial, onSave, onCancel }) {
  const empty = { name: "", image: "", price: "", meesho: "", amazon: "" };
  const [form, setForm] = useState(initial || empty);
  const [errors, setErrors] = useState({});
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.price || isNaN(form.price)) e.price = "Valid price required";
    if (!form.image) e.image = "Upload an image";
    if (form.meesho && !form.meesho.startsWith("http"))
      e.meesho = "Enter a valid URL";
    if (form.amazon && !form.amazon.startsWith("http"))
      e.amazon = "Enter a valid URL";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <div
      style={{
        background: "rgba(16,14,24,0.98)",
        border: "1px solid rgba(218,165,50,0.15)",
        borderRadius: 16,
        padding: "1.5rem",
        backdropFilter: "blur(20px)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "200px 1fr",
          gap: "1.5rem",
          alignItems: "start",
        }}
      >
        <div>
          <label style={LABEL}>Product Image</label>
          <ImageUploader value={form.image} onChange={(v) => set("image", v)} />
          {errors.image && (
            <span
              style={{
                fontSize: "0.7rem",
                color: "#ef4444",
                marginTop: 4,
                display: "block",
              }}
            >
              {errors.image}
            </span>
          )}
        </div>
        <div>
          <Field label="Product Name">
            <input
              style={{
                ...INPUT,
                borderColor: errors.name ? "#ef4444" : "rgba(255,255,255,0.1)",
              }}
              value={form.name}
              placeholder="e.g. Anime Mouse Pad"
              onChange={(e) => set("name", e.target.value)}
              onFocus={(e) =>
                (e.target.style.borderColor = "rgba(218,165,50,0.5)")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = errors.name
                  ? "#ef4444"
                  : "rgba(255,255,255,0.1)")
              }
            />
            {errors.name && (
              <span style={{ fontSize: "0.7rem", color: "#ef4444" }}>
                {errors.name}
              </span>
            )}
          </Field>
          <Field label="Price (₹)">
            <input
              style={{
                ...INPUT,
                borderColor: errors.price ? "#ef4444" : "rgba(255,255,255,0.1)",
              }}
              type="number"
              value={form.price}
              placeholder="349"
              onChange={(e) => set("price", e.target.value)}
              onFocus={(e) =>
                (e.target.style.borderColor = "rgba(218,165,50,0.5)")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = errors.price
                  ? "#ef4444"
                  : "rgba(255,255,255,0.1)")
              }
            />
            {errors.price && (
              <span style={{ fontSize: "0.7rem", color: "#ef4444" }}>
                {errors.price}
              </span>
            )}
          </Field>
          <Field label="🛍️ Meesho Link">
            <input
              style={{
                ...INPUT,
                borderColor: errors.meesho
                  ? "#ef4444"
                  : "rgba(255,255,255,0.1)",
              }}
              value={form.meesho}
              placeholder="https://meesho.com/..."
              onChange={(e) => set("meesho", e.target.value)}
              onFocus={(e) => (e.target.style.borderColor = "#f43397")}
              onBlur={(e) =>
                (e.target.style.borderColor = errors.meesho
                  ? "#ef4444"
                  : "rgba(255,255,255,0.1)")
              }
            />
            {errors.meesho && (
              <span style={{ fontSize: "0.7rem", color: "#ef4444" }}>
                {errors.meesho}
              </span>
            )}
          </Field>
          <Field label="📦 Amazon Link">
            <input
              style={{
                ...INPUT,
                borderColor: errors.amazon
                  ? "#ef4444"
                  : "rgba(255,255,255,0.1)",
              }}
              value={form.amazon}
              placeholder="https://amazon.in/..."
              onChange={(e) => set("amazon", e.target.value)}
              onFocus={(e) => (e.target.style.borderColor = "#ff9900")}
              onBlur={(e) =>
                (e.target.style.borderColor = errors.amazon
                  ? "#ef4444"
                  : "rgba(255,255,255,0.1)")
              }
            />
            {errors.amazon && (
              <span style={{ fontSize: "0.7rem", color: "#ef4444" }}>
                {errors.amazon}
              </span>
            )}
          </Field>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: 10,
          marginTop: "1.25rem",
          justifyContent: "flex-end",
        }}
      >
        <button
          onClick={onCancel}
          style={{
            padding: "0.5rem 1.2rem",
            borderRadius: 10,
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#666",
            fontSize: "0.82rem",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => validate() && onSave(form)}
          style={{
            padding: "0.5rem 1.4rem",
            borderRadius: 10,
            background: "linear-gradient(135deg, #daa532, #f0c060)",
            border: "none",
            color: "#000",
            fontSize: "0.82rem",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          {initial ? "✓ Save" : "+ Add to Carousel"}
        </button>
      </div>
    </div>
  );
}

function AdminLogin({ onLogin }) {
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [locked, setLocked] = useState(false);
  const [lockRemaining, setLockRemaining] = useState(0);
  const [attemptsLeft, setAttemptsLeft] = useState(5);
  const { login, getLoginStatus } = useProducts();

  React.useEffect(() => {
    const status = getLoginStatus();
    if (status.isLocked) {
      setLocked(true);
      setLockRemaining(status.remainingMs);
    } else {
      setAttemptsLeft(5 - status.attempts);
    }
  }, []);

  React.useEffect(() => {
    if (!locked || lockRemaining <= 0) return;
    const interval = setInterval(() => {
      setLockRemaining((prev) => {
        if (prev <= 1000) {
          setLocked(false);
          clearInterval(interval);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [locked]);

  const formatTime = (ms) => {
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleLogin = async () => {
    if (locked) return;
    const result = await login(pw);
    if (result.success) {
      onLogin();
    } else if (result.locked) {
      setLocked(true);
      setLockRemaining(result.remainingMs);
      setError("");
    } else {
      setAttemptsLeft(result.remaining);
      setError(
        `Wrong password — ${result.remaining} attempt${result.remaining === 1 ? "" : "s"} left`,
      );
      setPw("");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#04040a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 380,
          padding: "2.5rem",
          background: "rgba(16,14,24,0.98)",
          border: `1px solid ${locked ? "rgba(239,68,68,0.3)" : "rgba(218,165,50,0.2)"}`,
          borderRadius: 20,
          textAlign: "center",
          boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
        }}
      >
        <div
          style={{
            fontFamily: "Syne",
            fontWeight: 800,
            fontSize: "1.8rem",
            background: "linear-gradient(120deg, #daa532, #f0c060)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            marginBottom: 6,
          }}
        >
          GLCW
        </div>
        <div
          style={{
            fontSize: "0.75rem",
            color: "rgba(218,165,50,0.4)",
            letterSpacing: "0.15em",
            marginBottom: "2rem",
            textTransform: "uppercase",
          }}
        >
          Admin Panel
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1.5rem",
          }}
        >
          <Icons.Lock
            size={48}
            color={locked ? "rgba(239,68,68,0.6)" : "rgba(218,165,50,0.6)"}
          />
        </div>
        {locked ? (
          <div>
            <div
              style={{
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.3)",
                borderRadius: 12,
                padding: "1.25rem",
                marginBottom: "1rem",
              }}
            >
              <div
                style={{
                  color: "#ef4444",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  marginBottom: 6,
                }}
              >
                Account Locked
              </div>
              <div
                style={{
                  color: "#888",
                  fontSize: "0.78rem",
                  marginBottom: "0.75rem",
                }}
              >
                Too many failed attempts. Try again in:
              </div>
              <div
                style={{
                  fontFamily: "Syne",
                  fontWeight: 700,
                  fontSize: "2rem",
                  color: "#ef4444",
                }}
              >
                {formatTime(lockRemaining)}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <input
              type="password"
              placeholder="Enter admin password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              style={{
                width: "100%",
                padding: "0.7rem 1rem",
                borderRadius: 10,
                border: `1px solid ${error ? "#ef4444" : "rgba(255,255,255,0.1)"}`,
                background: "rgba(255,255,255,0.04)",
                color: "#f2ede4",
                fontSize: "0.9rem",
                fontFamily: "inherit",
                outline: "none",
                marginBottom: "0.75rem",
                textAlign: "center",
                letterSpacing: "0.2em",
              }}
            />
            {error && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  color: "#ef4444",
                  fontSize: "0.78rem",
                  marginBottom: "0.75rem",
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  borderRadius: 8,
                  padding: "0.5rem",
                }}
              >
                <Icons.X size={13} color="#ef4444" /> {error}
              </div>
            )}
            {attemptsLeft < 5 && !error && (
              <div
                style={{
                  fontSize: "0.72rem",
                  color: "#666",
                  marginBottom: "0.75rem",
                }}
              >
                {attemptsLeft} attempt{attemptsLeft === 1 ? "" : "s"} remaining
                before lockout
              </div>
            )}
            <button
              onClick={handleLogin}
              style={{
                width: "100%",
                padding: "0.75rem",
                background: "linear-gradient(135deg, #daa532, #f0c060)",
                border: "none",
                borderRadius: 10,
                color: "#000",
                fontWeight: 700,
                fontSize: "0.9rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <Icons.Lock size={16} color="#000" /> Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function CarouselManager() {
  const { carousel, addCarouselItem, updateCarouselItem, deleteCarouselItem } =
    useProducts();
  const [activeTab, setActiveTab] = useState("new");
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const formRef = useRef();

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };
  const handleAdd = (form) => {
    addCarouselItem(activeTab, form);
    setShowForm(false);
    showSuccess("✓ Added to carousel!");
  };
  const handleUpdate = (form) => {
    updateCarouselItem(activeTab, editingItem.id, form);
    setEditingItem(null);
    showSuccess("✓ Updated!");
  };
  const handleDelete = (id) => {
    deleteCarouselItem(activeTab, id);
    setDeleteConfirm(null);
    showSuccess("Removed from carousel.");
  };

  const items = carousel[activeTab] || [];

  return (
    <div>
      {successMsg && (
        <div
          style={{
            position: "fixed",
            top: 80,
            right: 24,
            zIndex: 500,
            background: "rgba(34,197,94,0.15)",
            border: "1px solid rgba(34,197,94,0.4)",
            borderRadius: 12,
            padding: "0.75rem 1.25rem",
            color: "#22c55e",
            fontSize: "0.85rem",
            fontWeight: 600,
            backdropFilter: "blur(20px)",
          }}
        >
          {successMsg}
        </div>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        <div style={{ display: "flex", gap: 6 }}>
          {CAROUSEL_TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => {
                setActiveTab(t.key);
                setShowForm(false);
                setEditingItem(null);
              }}
              style={{
                padding: "0.45rem 1.1rem",
                borderRadius: 10,
                cursor: "pointer",
                transition: "all 0.2s",
                fontSize: "0.82rem",
                fontWeight: activeTab === t.key ? 700 : 400,
                border: `1px solid ${activeTab === t.key ? "rgba(218,165,50,0.5)" : "rgba(255,255,255,0.08)"}`,
                background:
                  activeTab === t.key
                    ? "rgba(255,255,255,0.12)"
                    : "transparent",
                color: activeTab === t.key ? "#daa532" : "#555",
              }}
            >
              {t.label}{" "}
              <span style={{ fontSize: "0.7rem", opacity: 0.6 }}>
                ({(carousel[t.key] || []).length})
              </span>
            </button>
          ))}
        </div>
        {!showForm && !editingItem && (
          <button
            onClick={() => {
              setShowForm(true);
              setTimeout(
                () =>
                  formRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  }),
                100,
              );
            }}
            style={{
              padding: "0.5rem 1.25rem",
              borderRadius: 10,
              background: "linear-gradient(135deg, #daa532, #f0c060)",
              border: "none",
              color: "#000",
              fontWeight: 700,
              fontSize: "0.82rem",
              cursor: "pointer",
            }}
          >
            + Add Item
          </button>
        )}
      </div>
      {showForm && (
        <div ref={formRef} style={{ marginBottom: "1.5rem" }}>
          <div
            style={{
              fontFamily: "Syne",
              fontWeight: 600,
              fontSize: "0.95rem",
              color: "rgba(218,165,50,0.6)",
              marginBottom: "0.75rem",
            }}
          >
            Add to {CAROUSEL_TABS.find((t) => t.key === activeTab)?.label}
          </div>
          <CarouselForm
            onSave={handleAdd}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}
      {editingItem && (
        <div ref={formRef} style={{ marginBottom: "1.5rem" }}>
          <div
            style={{
              fontFamily: "Syne",
              fontWeight: 600,
              fontSize: "0.95rem",
              color: "rgba(218,165,50,0.6)",
              marginBottom: "0.75rem",
            }}
          >
            Editing: {editingItem.name}
          </div>
          <CarouselForm
            initial={editingItem}
            onSave={handleUpdate}
            onCancel={() => setEditingItem(null)}
          />
        </div>
      )}
      {items.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            color: "#333",
            fontSize: "0.85rem",
          }}
        >
          No items yet. Click "+ Add Item" to get started.
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                background: "rgba(16,14,24,0.8)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 14,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: 120,
                  background: "rgba(218,165,50,0.04)",
                  overflow: "hidden",
                }}
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icons.Package size={32} color="rgba(218,165,50,0.4)" />
                  </div>
                )}
              </div>
              <div style={{ padding: "0.75rem" }}>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "0.82rem",
                    marginBottom: 3,
                    color: "#f2ede4",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.name}
                </div>
                <div
                  style={{
                    fontFamily: "Syne",
                    fontWeight: 700,
                    color: "#daa532",
                    fontSize: "0.9rem",
                    marginBottom: "0.6rem",
                  }}
                >
                  ₹{item.price}
                </div>
                <div style={{ display: "flex", gap: 5, marginTop: 8 }}>
                  <button
                    onClick={() => {
                      setEditingItem(item);
                      setShowForm(false);
                      setTimeout(
                        () =>
                          formRef.current?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                          }),
                        100,
                      );
                    }}
                    style={{
                      flex: 1,
                      padding: "4px 0",
                      borderRadius: 7,
                      background: "rgba(218,165,50,0.1)",
                      border: "1px solid rgba(218,165,50,0.25)",
                      color: "#daa532",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  {deleteConfirm === item.id ? (
                    <div style={{ display: "flex", gap: 4, flex: 1 }}>
                      <button
                        onClick={() => handleDelete(item.id)}
                        style={{
                          flex: 1,
                          padding: "4px 0",
                          borderRadius: 7,
                          background: "rgba(239,68,68,0.2)",
                          border: "1px solid rgba(239,68,68,0.4)",
                          color: "#ef4444",
                          fontSize: "0.65rem",
                          fontWeight: 700,
                          cursor: "pointer",
                        }}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        style={{
                          flex: 1,
                          padding: "4px 0",
                          borderRadius: 7,
                          background: "transparent",
                          border: "1px solid rgba(255,255,255,0.1)",
                          color: "#666",
                          fontSize: "0.65rem",
                          cursor: "pointer",
                        }}
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirm(item.id)}
                      style={{
                        flex: 1,
                        padding: "4px 0",
                        borderRadius: 7,
                        background: "rgba(239,68,68,0.08)",
                        border: "1px solid rgba(239,68,68,0.2)",
                        color: "#ef4444",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ProductsManager() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const formRef = useRef();

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };
  const handleAdd = async (form) => {
    try {
      await addProduct(form);
      setShowForm(false);
      showSuccess("✓ Product added!");
    } catch (e) {
      alert("Failed to add product: " + e.message);
    }
  };
  const handleUpdate = async (form) => {
    try {
      await updateProduct(editingProduct.id, form);
      setEditingProduct(null);
      showSuccess("✓ Product updated!");
    } catch (e) {
      alert("Failed to update product: " + e.message);
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setDeleteConfirm(null);
      showSuccess("Product deleted.");
    } catch (e) {
      console.error("Delete failed:", e);
      setDeleteConfirm(null);
      alert("Failed to delete: " + e.message);
    }
  };

  return (
    <div>
      {successMsg && (
        <div
          style={{
            position: "fixed",
            top: 80,
            right: 24,
            zIndex: 500,
            background: "rgba(34,197,94,0.15)",
            border: "1px solid rgba(34,197,94,0.4)",
            borderRadius: 12,
            padding: "0.75rem 1.25rem",
            color: "#22c55e",
            fontSize: "0.85rem",
            fontWeight: 600,
            backdropFilter: "blur(20px)",
          }}
        >
          {successMsg}
        </div>
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
        }}
      >
        <h2
          style={{
            fontFamily: "Syne",
            fontWeight: 700,
            fontSize: "1.1rem",
            color: "rgba(218,165,50,0.7)",
          }}
        >
          All Products ({products.length})
        </h2>
        {!showForm && !editingProduct && (
          <button
            onClick={() => {
              setShowForm(true);
              setTimeout(
                () =>
                  formRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  }),
                100,
              );
            }}
            style={{
              padding: "0.6rem 1.5rem",
              borderRadius: 10,
              background: "linear-gradient(135deg, #daa532, #f0c060)",
              border: "none",
              color: "#000",
              fontWeight: 700,
              fontSize: "0.85rem",
              cursor: "pointer",
            }}
          >
            + Add New Product
          </button>
        )}
      </div>
      {showForm && (
        <div ref={formRef} style={{ marginBottom: "2rem" }}>
          <div
            style={{
              fontFamily: "Syne",
              fontWeight: 600,
              fontSize: "1rem",
              color: "rgba(218,165,50,0.6)",
              marginBottom: "1rem",
            }}
          >
            Add New Product
          </div>
          <ProductForm onSave={handleAdd} onCancel={() => setShowForm(false)} />
        </div>
      )}
      {editingProduct && (
        <div ref={formRef} style={{ marginBottom: "2rem" }}>
          <div
            style={{
              fontFamily: "Syne",
              fontWeight: 600,
              fontSize: "1rem",
              color: "rgba(218,165,50,0.6)",
              marginBottom: "1rem",
            }}
          >
            Editing: {editingProduct.name}
          </div>
          <ProductForm
            initial={editingProduct}
            onSave={handleUpdate}
            onCancel={() => setEditingProduct(null)}
          />
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {products.map((p) => (
          <div
            key={p.id}
            style={{
              background: "rgba(16,14,24,0.8)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 14,
              padding: "1rem 1.25rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 10,
                overflow: "hidden",
                flexShrink: 0,
                background: "rgba(218,165,50,0.08)",
              }}
            >
              {p.image ? (
                <img
                  src={p.image}
                  alt={p.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Icons.Package size={26} color="rgba(218,165,50,0.4)" />
                </div>
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: "0.92rem",
                    color: "#f2ede4",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: 300,
                  }}
                >
                  {p.name}
                </span>
                {p.badges &&
                  p.badges.map((b) => (
                    <span
                      key={b}
                      style={{
                        fontSize: "0.58rem",
                        padding: "1px 6px",
                        borderRadius: 4,
                        fontWeight: 700,
                        background: {
                          NEW: "#22c55e",
                          HOT: "#ef4444",
                          SALE: "#daa532",
                        }[b],
                        color: b === "SALE" ? "#000" : "#fff",
                      }}
                    >
                      {b}
                    </span>
                  ))}
              </div>
              <div style={{ fontSize: "0.72rem", color: "#555", marginTop: 2 }}>
                {CAT_LABELS[p.cat] || p.cat} · {p.desc}
              </div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div
                style={{
                  fontFamily: "Syne",
                  fontWeight: 700,
                  color: "#daa532",
                  fontSize: "1rem",
                }}
              >
                ₹{p.price}
              </div>
              <div
                style={{
                  fontSize: "0.72rem",
                  color: "#444",
                  textDecoration: "line-through",
                }}
              >
                ₹{p.old}
              </div>
            </div>
            <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
              <button
                onClick={() => {
                  setEditingProduct(p);
                  setShowForm(false);
                  setTimeout(
                    () =>
                      formRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      }),
                    100,
                  );
                }}
                style={{
                  padding: "0.4rem 0.9rem",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  background: "rgba(218,165,50,0.1)",
                  border: "1px solid rgba(218,165,50,0.25)",
                  color: "#daa532",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <Icons.Edit size={13} color="#daa532" />
                  Edit
                </span>
              </button>
              {deleteConfirm === p.id ? (
                <div style={{ display: "flex", gap: 4 }}>
                  <button
                    onClick={() => handleDelete(p.id)}
                    style={{
                      padding: "0.4rem 0.75rem",
                      borderRadius: 8,
                      cursor: "pointer",
                      background: "rgba(239,68,68,0.2)",
                      border: "1px solid rgba(239,68,68,0.4)",
                      color: "#ef4444",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                    }}
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    style={{
                      padding: "0.4rem 0.75rem",
                      borderRadius: 8,
                      cursor: "pointer",
                      background: "transparent",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#666",
                      fontSize: "0.72rem",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setDeleteConfirm(p.id)}
                  style={{
                    padding: "0.4rem 0.9rem",
                    borderRadius: 8,
                    cursor: "pointer",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    background: "rgba(239,68,68,0.08)",
                    border: "1px solid rgba(239,68,68,0.2)",
                    color: "#ef4444",
                  }}
                >
                  <span
                    style={{ display: "flex", alignItems: "center", gap: 5 }}
                  >
                    <Icons.Trash size={13} color="#ef4444" />
                    Delete
                  </span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AdminPanel() {
  const { products, carousel, isAdmin, logout } = useProducts();
  const [loggedIn, setLoggedIn] = useState(isAdmin);
  const [mainTab, setMainTab] = useState("products");
  const totalCarousel = Object.values(carousel).reduce(
    (sum, arr) => sum + arr.length,
    0,
  );

  if (!loggedIn) return <AdminLogin onLogin={() => setLoggedIn(true)} />;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#04040a",
        fontFamily: "Instrument Sans, sans-serif",
      }}
    >
      <div
        style={{
          background: "rgba(10,10,18,0.95)",
          borderBottom: "1px solid rgba(218,165,50,0.15)",
          padding: "1rem 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 200,
          backdropFilter: "blur(20px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div
            style={{
              fontFamily: "Syne",
              fontWeight: 800,
              fontSize: "1.4rem",
              background: "linear-gradient(120deg, #daa532, #f0c060)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            GLCW
          </div>
          <span
            style={{
              fontSize: "0.65rem",
              padding: "2px 10px",
              borderRadius: 999,
              background: "rgba(218,165,50,0.12)",
              color: "#daa532",
              border: "1px solid rgba(255,174,0,0.25)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Admin Panel
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a
            href="/"
            style={{
              fontSize: "0.8rem",
              color: "#666",
              textDecoration: "none",
              padding: "0.4rem 1rem",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8,
            }}
          >
            ← View Site
          </a>
          <button
            onClick={() => {
              logout();
              setLoggedIn(false);
            }}
            style={{
              fontSize: "0.8rem",
              color: "#666",
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8,
              padding: "0.4rem 1rem",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: 12,
            marginBottom: "2rem",
          }}
        >
          {[
            {
              label: "Total Products",
              value: products.length,
              IconComp: Icons.Package,
            },
            {
              label: "Carousel Items",
              value: totalCarousel,
              IconComp: Icons.Carousel,
            },
            {
              label: "Mouse Pads",
              value: products.filter((p) => p.cat === "mousepads").length,
              IconComp: Icons.Mouse,
            },
            {
              label: "LED Products",
              value: products.filter((p) => p.cat === "led").length,
              IconComp: Icons.Bulb,
            },
            {
              label: "Home Decor",
              value: products.filter((p) => p.cat === "home").length,
              IconComp: Icons.Home,
            },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                background: "rgba(16,14,24,0.8)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 14,
                padding: "0.85rem",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 6,
                }}
              >
                {s.IconComp && <s.IconComp size={22} color="#daa532" />}
              </div>
              <div
                style={{
                  fontFamily: "Syne",
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  color: "#daa532",
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: "0.65rem",
                  color: "#555",
                  letterSpacing: "0.08em",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            gap: 4,
            marginBottom: "2rem",
            background: "rgba(255,255,255,0.03)",
            borderRadius: 12,
            padding: 4,
            width: "fit-content",
          }}
        >
          {[
            { key: "products", label: "📦 Products", count: products.length },
            { key: "carousel", label: "🎠 Carousel", count: totalCarousel },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setMainTab(t.key)}
              style={{
                padding: "0.55rem 1.5rem",
                borderRadius: 9,
                cursor: "pointer",
                transition: "all 0.2s",
                fontSize: "0.85rem",
                fontWeight: mainTab === t.key ? 700 : 400,
                background:
                  mainTab === t.key ? "rgba(255,255,255,0.15)" : "transparent",
                border: `1px solid ${mainTab === t.key ? "rgba(218,165,50,0.4)" : "transparent"}`,
                color: mainTab === t.key ? "#daa532" : "#555",
              }}
            >
              {t.label}{" "}
              <span style={{ fontSize: "0.7rem", opacity: 0.6 }}>
                ({t.count})
              </span>
            </button>
          ))}
        </div>

        {mainTab === "products" ? <ProductsManager /> : <CarouselManager />}
      </div>
    </div>
  );
}
