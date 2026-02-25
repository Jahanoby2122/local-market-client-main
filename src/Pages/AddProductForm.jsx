import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import { toast } from "react-toastify";
import UseAuth from "../Hooks/UseAuth";
import {
  FiLink,
  FiCalendar,
  FiDollarSign,
  FiUser,
  FiShoppingBag,
  FiInfo,
  FiPackage,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";

/* ─── Inline styles / CSS-in-JS ─────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap');

  .apf-root {
    --color-bg: #f7f6f3;
    --color-surface: #ffffff;
    --color-primary: #1a1a2e;
    --color-accent: #e8572a;
    --color-accent-soft: #fdf0eb;
    --color-border: #e2e0da;
    --color-muted: #9b9589;
    --color-text: #1a1a1e;
    --color-label: #5a5650;
    --radius: 12px;
    --radius-sm: 8px;
    --shadow: 0 1px 3px rgba(0,0,0,.06), 0 4px 16px rgba(0,0,0,.06);
    --shadow-lg: 0 8px 40px rgba(0,0,0,.10);
    font-family: 'DM Sans', sans-serif;
    background: var(--color-bg);
    min-height: 100vh;
    padding: 48px 16px 80px;
    color: var(--color-text);
  }

  .apf-inner {
    max-width: 860px;
    margin: 0 auto;
  }

  /* ── Header ── */
  .apf-header {
    margin-bottom: 48px;
  }

  .apf-header-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: .12em;
    text-transform: uppercase;
    color: var(--color-accent);
    background: var(--color-accent-soft);
    border: 1px solid #f0c9b8;
    padding: 4px 12px;
    border-radius: 100px;
    margin-bottom: 16px;
  }

  .apf-header h1 {
    font-family: 'DM Serif Display', serif;
    font-size: 40px;
    font-weight: 400;
    line-height: 1.15;
    color: var(--color-primary);
    margin: 0 0 8px;
  }

  .apf-header p {
    font-size: 15px;
    color: var(--color-muted);
    margin: 0;
  }

  /* ── Card ── */
  .apf-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: 20px;
    box-shadow: var(--shadow-lg);
    overflow: hidden;
  }

  /* ── Section ── */
  .apf-section {
    padding: 36px 40px;
    border-bottom: 1px solid var(--color-border);
  }

  .apf-section:last-child {
    border-bottom: none;
  }

  .apf-section-header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 28px;
  }

  .apf-section-icon {
    width: 36px;
    height: 36px;
    background: var(--color-accent-soft);
    border-radius: var(--radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-accent);
    flex-shrink: 0;
  }

  .apf-section-header h2 {
    font-size: 15px;
    font-weight: 600;
    letter-spacing: .02em;
    color: var(--color-primary);
    margin: 0;
  }

  .apf-section-header span {
    font-size: 12px;
    color: var(--color-muted);
    margin-left: 4px;
    font-weight: 400;
  }

  /* ── Grid ── */
  .apf-grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  @media (max-width: 640px) {
    .apf-grid-2 { grid-template-columns: 1fr; }
    .apf-section { padding: 28px 20px; }
    .apf-header h1 { font-size: 28px; }
  }

  /* ── Field ── */
  .apf-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .apf-label {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: .06em;
    text-transform: uppercase;
    color: var(--color-label);
  }

  .apf-input {
    width: 100%;
    padding: 11px 14px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: var(--color-text);
    background: var(--color-bg);
    border: 1.5px solid var(--color-border);
    border-radius: var(--radius-sm);
    outline: none;
    transition: border-color .18s, box-shadow .18s, background .18s;
    box-sizing: border-box;
  }

  .apf-input:focus {
    border-color: var(--color-accent);
    background: #fff;
    box-shadow: 0 0 0 3px rgba(232,87,42,.10);
  }

  .apf-input[readonly], .apf-input:read-only {
    color: var(--color-muted);
    cursor: default;
    background: #f0eee9;
  }

  .apf-input.has-error {
    border-color: #d94f4f;
  }

  .apf-error {
    font-size: 11px;
    color: #d94f4f;
    font-weight: 500;
  }

  .apf-textarea {
    resize: vertical;
    min-height: 96px;
  }

  /* ── Price field with icon ── */
  .apf-price-wrap {
    position: relative;
  }

  .apf-price-wrap .apf-input {
    padding-left: 38px;
  }

  .apf-price-icon {
    position: absolute;
    left: 13px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-muted);
    font-size: 15px;
    pointer-events: none;
  }

  /* ── Image preview ── */
  .apf-image-preview {
    margin-top: 14px;
    display: flex;
    align-items: center;
    gap: 14px;
    background: var(--color-bg);
    border: 1.5px solid var(--color-border);
    border-radius: var(--radius-sm);
    padding: 10px 14px;
    animation: fadeIn .2s ease;
  }

  .apf-image-preview img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid var(--color-border);
    flex-shrink: 0;
  }

  .apf-image-preview p {
    font-size: 12px;
    color: var(--color-muted);
    margin: 0;
  }

  /* ── Price history ── */
  .apf-price-history {
    margin-top: 28px;
  }

  .apf-price-history-label {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: .06em;
    text-transform: uppercase;
    color: var(--color-label);
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .apf-price-history-badge {
    background: var(--color-accent-soft);
    color: var(--color-accent);
    font-size: 10px;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 100px;
    letter-spacing: .04em;
  }

  .apf-price-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 10px;
    animation: fadeIn .2s ease;
  }

  .apf-price-empty {
    font-size: 13px;
    color: var(--color-muted);
    font-style: italic;
    padding: 12px 0;
  }

  /* ── DatePicker override ── */
  .react-datepicker-wrapper {
    width: 100%;
  }
  .react-datepicker__input-container input {
    width: 100%;
    padding: 11px 14px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    color: var(--color-text);
    background: var(--color-bg);
    border: 1.5px solid var(--color-border);
    border-radius: var(--radius-sm);
    outline: none;
    transition: border-color .18s, box-shadow .18s;
    box-sizing: border-box;
  }
  .react-datepicker__input-container input:focus {
    border-color: var(--color-accent);
    background: #fff;
    box-shadow: 0 0 0 3px rgba(232,87,42,.10);
  }

  /* ── Footer / submit ── */
  .apf-footer {
    padding: 28px 40px;
    background: #faf9f7;
    border-top: 1px solid var(--color-border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  @media (max-width: 640px) {
    .apf-footer { flex-direction: column; padding: 24px 20px; }
    .apf-footer p { text-align: center; }
  }

  .apf-footer p {
    font-size: 12px;
    color: var(--color-muted);
    margin: 0;
    max-width: 340px;
    line-height: 1.5;
  }

  .apf-submit {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 13px 32px;
    background: var(--color-primary);
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: .02em;
    border: none;
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: background .18s, transform .12s, box-shadow .18s;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .apf-submit:hover:not(:disabled) {
    background: var(--color-accent);
    box-shadow: 0 4px 16px rgba(232,87,42,.30);
    transform: translateY(-1px);
  }

  .apf-submit:active:not(:disabled) {
    transform: translateY(0);
  }

  .apf-submit:disabled {
    opacity: .55;
    cursor: not-allowed;
  }

  .apf-spinner {
    width: 15px;
    height: 15px;
    border: 2px solid rgba(255,255,255,.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin .6s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
`;

/* ─── Helper: Field wrapper ───────────────────────────────────────────────── */
function Field({ label, error, children }) {
  return (
    <div className="apf-field">
      {label && <label className="apf-label">{label}</label>}
      {children}
      {error && <span className="apf-error">This field is required</span>}
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────────── */
export default function AddProductForm() {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
    watch,
  } = useForm({
    defaultValues: {
      date: new Date(),
      status: "pending",
      prices: [],
      image: "",
    },
  });

  const { fields } = useFieldArray({ control, name: "prices" });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const imageUrl = watch("image");
  const pricePerUnit = watch("pricePerUnit");

  /* Set vendor info */
  useEffect(() => {
    if (user) {
      setValue("vendor", user.email);
      setValue("vendorName", user.displayName);
    }
  }, [user, setValue]);

  /* Auto-update price history — always single row, replaces on change */
  useEffect(() => {
    if (!pricePerUnit) return;
    const chosenDate = selectedDate
      ? new Date(selectedDate).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0];
    setValue("prices", [{ date: chosenDate, price: pricePerUnit }]);
  }, [pricePerUnit, selectedDate, setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await axiosSecure.post("/products", data);
      if (response.data.insertedId) {
        toast.success("Product added successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      toast.error("Failed to add product. Please try again.", {
        position: "top-center",
      });
      console.error("Submission error:", error);
    }
  };

  return (
    <>
      <style>{styles}</style>

      <div className="apf-root">
        <div className="apf-inner">

          {/* ── Header ── */}
          <div className="apf-header">
            <div className="apf-header-eyebrow">
              <FiPackage size={11} /> Product Listing
            </div>
            <h1>Add New Product</h1>
            <p>Fill in the details below to list a product on the marketplace.</p>
          </div>

          {/* ── Card ── */}
          <div className="apf-card">
            <form onSubmit={handleSubmit(onSubmit)}>

              {/* ── Section 1: Vendor ── */}
              <div className="apf-section">
                <div className="apf-section-header">
                  <div className="apf-section-icon"><FiUser size={16} /></div>
                  <h2>Vendor Information <span>Auto-filled from your account</span></h2>
                </div>

                <div className="apf-grid-2">
                  <Field label="Email">
                    <input
                      type="email"
                      {...register("vendor")}
                      readOnly
                      className="apf-input"
                      placeholder="vendor@email.com"
                    />
                  </Field>

                  <Field label="Display Name">
                    <input
                      type="text"
                      {...register("vendorName")}
                      readOnly
                      className="apf-input"
                      placeholder="Your Name"
                    />
                  </Field>
                </div>
              </div>

              {/* ── Section 2: Market ── */}
              <div className="apf-section">
                <div className="apf-section-header">
                  <div className="apf-section-icon"><FiShoppingBag size={16} /></div>
                  <h2>Market Information</h2>
                </div>

                <div className="apf-grid-2" style={{ marginBottom: 20 }}>
                  <Field label="Market Name" error={errors.marketName}>
                    <input
                      {...register("marketName", { required: true })}
                      placeholder="e.g. Kawran Bazar"
                      className={`apf-input${errors.marketName ? " has-error" : ""}`}
                    />
                  </Field>

                  <Field label="Date">
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => {
                        setSelectedDate(date);
                        setValue("date", date);
                      }}
                    />
                  </Field>
                </div>

                <Field label="Market Description" error={errors.marketDescription}>
                  <textarea
                    {...register("marketDescription", { required: true })}
                    rows={3}
                    placeholder="Briefly describe the market location and its offerings…"
                    className={`apf-input apf-textarea${errors.marketDescription ? " has-error" : ""}`}
                  />
                </Field>
              </div>

              {/* ── Section 3: Product ── */}
              <div className="apf-section">
                <div className="apf-section-header">
                  <div className="apf-section-icon"><FiInfo size={16} /></div>
                  <h2>Product Information</h2>
                </div>

                <div className="apf-grid-2" style={{ marginBottom: 20 }}>
                  <Field label="Item Name" error={errors.itemName}>
                    <input
                      {...register("itemName", { required: true })}
                      placeholder="e.g. Fresh Tomatoes"
                      className={`apf-input${errors.itemName ? " has-error" : ""}`}
                    />
                  </Field>

                  <Field label="Price per Unit (৳)" error={errors.pricePerUnit}>
                    <div className="apf-price-wrap">
                      <FiDollarSign className="apf-price-icon" />
                      <input
                        {...register("pricePerUnit", { required: true })}
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        className={`apf-input${errors.pricePerUnit ? " has-error" : ""}`}
                      />
                    </div>
                  </Field>
                </div>

                {/* Image URL */}
                <Field label="Product Image URL">
                  <input
                    {...register("image")}
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    className="apf-input"
                  />
                </Field>

                {imageUrl && (
                  <div className="apf-image-preview">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      onError={(e) =>
                        (e.target.src = "https://via.placeholder.com/60?text=?")
                      }
                    />
                    <p>Image preview loaded successfully. Make sure it looks correct before submitting.</p>
                  </div>
                )}

                {/* Price History */}
                <div className="apf-price-history">
                  <div className="apf-price-history-label">
                    <FiClock size={13} />
                    Price History
                    <span className="apf-price-history-badge">Auto Generated</span>
                  </div>

                  {fields.length === 0 ? (
                    <p className="apf-price-empty">
                      Price history will appear here once you enter a price above.
                    </p>
                  ) : (
                    fields.map((item, index) => (
                      <div key={item.id} className="apf-price-row">
                        <Field label="Date">
                          <input
                            type="date"
                            {...register(`prices.${index}.date`)}
                            readOnly
                            className="apf-input"
                          />
                        </Field>
                        <Field label="Price (৳)">
                          <input
                            type="number"
                            {...register(`prices.${index}.price`)}
                            readOnly
                            className="apf-input"
                          />
                        </Field>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* ── Footer ── */}
              <div className="apf-footer">
                <p>
                  All fields marked required must be filled before submitting.
                  Price history is tracked automatically.
                </p>
                <button type="submit" disabled={isSubmitting} className="apf-submit">
                  {isSubmitting ? (
                    <>
                      <span className="apf-spinner" />
                      Processing…
                    </>
                  ) : (
                    <>
                      <FiCheckCircle size={15} />
                      Submit Product
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}