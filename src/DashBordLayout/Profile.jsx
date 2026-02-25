import React, { useEffect, useState } from "react";
import {
  HeartIcon,
  ShoppingCartIcon,
  StarIcon,
  WalletIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  PencilSquareIcon,
  XMarkIcon,
  CameraIcon,
  CheckIcon,
  ArrowTrendingUpIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import UseAuth from "../Hooks/UseAuth";
import UseAxiosSecure from "../Hooks/UseAxiosSecure";
import { toast } from "react-toastify";

/* ─── Design tokens ──────────────────────────────────────── */
const C = {
  brand: "#288a4c",
  brandLight: "#e6f5ec",
  brandMid: "#4aad6e",
  brandDark: "#1a5c33",
  bg: "#f4f7f5",
  surface: "#ffffff",
  border: "#e2ece6",
  textPrimary: "#111c16",
  textSecondary: "#4e6657",
  textMuted: "#8fa898",
};

/* ─── Injected global styles ─────────────────────────────── */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=DM+Sans:wght@300;400;500&display=swap');

    .profile-root * { box-sizing: border-box; }
    .profile-root {
      font-family: 'DM Sans', sans-serif;
      background: ${C.bg};
      min-height: 100vh;
      color: ${C.textPrimary};
    }

    /* subtle noise texture on bg */
    .profile-root::before {
      content: '';
      position: fixed; inset: 0; z-index: 0; pointer-events: none;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E");
      opacity: 0.4;
    }

    /* ── Layout ── */
    .p-shell { position: relative; z-index: 1; max-width: 1120px; margin: 0 auto; padding: 36px 24px 60px; }

    /* ── Hero Card ── */
    .hero-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 2px 24px rgba(40,138,76,0.07);
    }
    .hero-banner {
      height: 120px;
      background: linear-gradient(130deg, var(--brand) 0%, var(--brand-mid) 55%, #6fcf97 100%);
      position: relative;
    }
    .hero-banner::after {
      content: '';
      position: absolute; inset: 0;
      background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='28'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
    }
    .hero-body { padding: 0 32px 32px; display: flex; align-items: flex-end; justify-content: space-between; flex-wrap: wrap; gap: 16px; }
    .avatar-wrap {
      margin-top: -44px; position: relative;
      width: 88px; height: 88px;
    }
    .avatar-wrap img {
      width: 88px; height: 88px; border-radius: 50%;
      border: 4px solid var(--surface);
      object-fit: cover;
      box-shadow: 0 4px 20px rgba(40,138,76,0.18);
    }
    .avatar-badge {
      position: absolute; bottom: 2px; right: 2px;
      width: 20px; height: 20px; border-radius: 50%;
      background: #22d26a; border: 2.5px solid var(--surface);
    }

    .hero-meta { flex: 1; min-width: 200px; padding-top: 12px; }
    .hero-meta h2 { font-family: 'Sora', sans-serif; font-weight: 700; font-size: 1.4rem; color: var(--text-primary); margin: 0 0 2px; }
    .hero-meta p { font-size: 0.85rem; color: var(--text-secondary); margin: 0; }
    .tag-row { display: flex; gap: 8px; margin-top: 10px; flex-wrap: wrap; }
    .tag {
      font-size: 0.72rem; font-weight: 600; letter-spacing: .4px; text-transform: uppercase;
      padding: 3px 10px; border-radius: 999px;
    }
    .tag-member { background: var(--brand-light); color: var(--brand); }
    .tag-active { background: #d1fae5; color: #065f46; }

    .hero-actions { display: flex; gap: 10px; padding-top: 12px; align-items: center; }
    .btn-edit {
      display: inline-flex; align-items: center; gap: 7px;
      background: ${C.brand}; color: #fff;
      border: none; border-radius: 12px;
      padding: 10px 20px; font-size: 0.85rem; font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(40,138,76,0.28);
      transition: transform .15s, box-shadow .15s;
    }
    .btn-edit:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(40,138,76,0.34); }

    /* ── Info Row ── */
    .info-row {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 0; border-top: 1px solid var(--border); margin-top: 8px;
    }
    .info-item {
      display: flex; align-items: center; gap: 12px;
      padding: 18px 24px;
      border-right: 1px solid var(--border);
    }
    .info-item:last-child { border-right: none; }
    .info-icon-box {
      width: 36px; height: 36px; border-radius: 10px;
      background: var(--brand-light); flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
    }
    .info-label { font-size: 0.72rem; color: var(--text-muted); font-weight: 500; text-transform: uppercase; letter-spacing: .5px; }
    .info-value { font-size: 0.88rem; color: var(--text-primary); font-weight: 500; margin-top: 2px; }

    /* ── Stat Cards ── */
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 16px; }
    .stat-card {
      background: var(--surface); border: 1px solid var(--border);
      border-radius: 20px; padding: 24px;
      box-shadow: 0 1px 8px rgba(0,0,0,0.04);
      display: flex; flex-direction: column; gap: 16px;
      transition: transform .2s, box-shadow .2s;
      position: relative; overflow: hidden;
    }
    .stat-card::before {
      content: '';
      position: absolute; top: -20px; right: -20px;
      width: 80px; height: 80px; border-radius: 50%;
      background: var(--brand-light); opacity: .5;
    }
    .stat-card:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(40,138,76,0.1); }
    .stat-top { display: flex; justify-content: space-between; align-items: flex-start; }
    .stat-icon {
      width: 44px; height: 44px; border-radius: 14px;
      background: var(--brand-light); display: flex; align-items: center; justify-content: center;
    }
    .stat-trend {
      font-size: 0.72rem; font-weight: 600; padding: 3px 8px; border-radius: 999px;
      background: #d1fae5; color: #065f46;
    }
    .stat-value { font-family: 'Sora', sans-serif; font-size: 2rem; font-weight: 700; color: var(--text-primary); line-height: 1; }
    .stat-label { font-size: 0.82rem; color: var(--text-secondary); font-weight: 500; }
    .stat-hint { font-size: 0.75rem; color: var(--text-muted); }

    /* ── Insight banner ── */
    .insight-banner {
      background: linear-gradient(135deg, ${C.brandDark} 0%, ${C.brand} 60%, ${C.brandMid} 100%);
      border-radius: 20px; padding: 28px 32px;
      display: flex; align-items: center; gap: 20px;
      color: #fff; position: relative; overflow: hidden;
    }
    .insight-banner::after {
      content: ''; position: absolute; right: -30px; top: -30px;
      width: 180px; height: 180px; border-radius: 50%;
      background: rgba(255,255,255,0.06);
    }
    .insight-icon-wrap {
      width: 52px; height: 52px; border-radius: 16px;
      background: rgba(255,255,255,0.15); flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
    }
    .insight-text h4 { font-family: 'Sora', sans-serif; font-size: 1.05rem; font-weight: 700; margin: 0 0 4px; }
    .insight-text p { font-size: 0.83rem; opacity: .75; margin: 0; }
    .insight-badge {
      margin-left: auto; background: rgba(255,255,255,0.18);
      border: 1px solid rgba(255,255,255,0.25);
      font-size: 0.72rem; font-weight: 700; letter-spacing: .5px; text-transform: uppercase;
      padding: 5px 12px; border-radius: 999px; color: #fff; white-space: nowrap;
    }

    /* ── Section title ── */
    .section-title { font-family: 'Sora', sans-serif; font-size: 1rem; font-weight: 700; color: ${C.textPrimary}; margin-bottom: 14px; }

    /* ── Modal ── */
    .modal-backdrop {
      position: fixed; inset: 0; z-index: 100;
      background: rgba(10,20,14,0.55); backdrop-filter: blur(6px);
      display: flex; align-items: center; justify-content: center; padding: 24px;
      animation: fadeIn .18s ease;
    }
    @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
    .modal-box {
      background: var(--surface); border-radius: 24px;
      width: 100%; max-width: 480px;
      box-shadow: 0 24px 60px rgba(0,0,0,0.18);
      animation: slideUp .22s ease;
      overflow: hidden;
    }
    @keyframes slideUp { from { transform: translateY(20px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
    .modal-header {
      padding: 24px 28px 20px;
      border-bottom: 1px solid ${C.border};
      display: flex; align-items: center; justify-content: space-between;
    }
    .modal-header h3 { font-family: 'Sora', sans-serif; font-size: 1.05rem; font-weight: 700; margin: 0; }
    .modal-close {
      width: 32px; height: 32px; border-radius: 10px;
      border: 1px solid ${C.border}; background: ${C.bg};
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; color: ${C.textSecondary};
    }
    .modal-close:hover { background: ${C.brandLight}; color: ${C.brand}; }
    .modal-body { padding: 24px 28px; display: flex; flex-direction: column; gap: 18px; }
    .field-group label {
      display: block; font-size: 0.75rem; font-weight: 600; text-transform: uppercase;
      letter-spacing: .5px; color: ${C.textMuted}; margin-bottom: 6px;
    }
    .field-group input {
      width: 100%; padding: 11px 14px;
      border: 1.5px solid ${C.border}; border-radius: 12px;
      font-family: 'DM Sans', sans-serif; font-size: 0.9rem; color: ${C.textPrimary};
      background: ${C.bg}; outline: none; transition: border-color .15s;
    }
    .field-group input:focus { border-color: ${C.brand}; background: #fff; }
    .modal-footer {
      padding: 16px 28px 24px; display: flex; justify-content: flex-end; gap: 10px;
    }
    .btn-cancel {
      padding: 10px 20px; border-radius: 12px; border: 1.5px solid ${C.border};
      background: transparent; font-size: 0.88rem; font-weight: 600; color: ${C.textSecondary};
      cursor: pointer; transition: background .15s;
    }
    .btn-cancel:hover { background: ${C.bg}; }
    .btn-save {
      padding: 10px 24px; border-radius: 12px; border: none;
      background: ${C.brand}; color: #fff;
      font-size: 0.88rem; font-weight: 700;
      cursor: pointer; display: inline-flex; align-items: center; gap: 7px;
      box-shadow: 0 4px 14px rgba(40,138,76,0.28);
      transition: transform .15s, box-shadow .15s;
    }
    .btn-save:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(40,138,76,0.36); }

    /* page header */
    .page-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; }
    .page-header-text p { font-size: 0.85rem; color: ${C.textMuted}; margin: 4px 0 0; }
    .page-title { font-family: 'Sora', sans-serif; font-size: 1.6rem; font-weight: 700; color: ${C.textPrimary}; margin: 0; }

    @media (max-width: 640px) {
      .hero-body { padding: 0 20px 24px; }
      .info-item { border-right: none; border-bottom: 1px solid ${C.border}; }
      .insight-badge { display: none; }
    }
  `}</style>
);

/* ─── Stat Card ─────────────────────────────────────────── */
const StatCard = ({ icon: Icon, title, value, hint, trend }) => (
  <div className="stat-card">
    <div className="stat-top">
      <div className="stat-icon">
        <Icon style={{ width: 20, height: 20, color: C.brand }} />
      </div>
      {trend && <span className="stat-trend">+{trend}%</span>}
    </div>
    <div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{title}</div>
      {hint && <div className="stat-hint" style={{ marginTop: 4 }}>{hint}</div>}
    </div>
  </div>
);

/* ─── Info Item ──────────────────────────────────────────── */
const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="info-item">
    <div className="info-icon-box">
      <Icon style={{ width: 16, height: 16, color: C.brand }} />
    </div>
    <div>
      <div className="info-label">{label}</div>
      <div className="info-value">{value}</div>
    </div>
  </div>
);

/* ─── Main Component ─────────────────────────────────────── */
const Profile = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const [stats, setStats] = useState({ watchlist: 0, orders: 0, reviews: 0, spend: 0 });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ displayName: "", phoneNumber: "", location: "", photoURL: "" });
  const [localName, setLocalName] = useState("");

  useEffect(() => {
    setLocalName(user?.displayName || user?.email?.split("@")[0] || "User");
    let mounted = true;
    const fetchStats = async () => {
      if (!user?.email) { setLoading(false); return; }
      try {
        const email = user.email;
        const [watchlistRes, ordersRes, reviewsRes] = await Promise.allSettled([
          axiosSecure.get("/watchlist", { params: { email } }),
          axiosSecure.get("/orders", { params: { email } }),
          axiosSecure.get("/reviews", { params: { userEmail: email } }),
        ]);
        let watchlistCount = 0, ordersCount = 0, reviewsCount = 0, totalSpend = 0;
        if (watchlistRes.status === "fulfilled" && Array.isArray(watchlistRes.value.data))
          watchlistCount = watchlistRes.value.data.length;
        if (ordersRes.status === "fulfilled") {
          const od = ordersRes.value.data;
          const arr = Array.isArray(od) ? od : od ? [od] : [];
          ordersCount = arr.length;
          totalSpend = arr.reduce((s, o) => s + Number(o.price || o.total || o.amount || 0), 0);
        }
        if (reviewsRes.status === "fulfilled" && Array.isArray(reviewsRes.value.data))
          reviewsCount = reviewsRes.value.data.length;
        if (mounted) setStats({ watchlist: watchlistCount, orders: ordersCount, reviews: reviewsCount, spend: totalSpend });
      } catch {
        if (mounted) setStats({ watchlist: 2, orders: 1, reviews: 0, spend: 38 });
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchStats();
    return () => { mounted = false; };
  }, [user]);

  const openEdit = () => {
    setForm({ displayName: user?.displayName || "", phoneNumber: user?.phoneNumber || "", location: user?.location || "", photoURL: user?.photoURL || "" });
    setEditing(true);
  };

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.email) return toast.error("Unable to identify user.");
    const payload = { ...form, email: user.email };
    try {
      setLocalName(payload.displayName || localName);
      setEditing(false);
      try { await axiosSecure.put(`/users/${encodeURIComponent(user.email)}`, payload); }
      catch { await axiosSecure.post("/users", payload); }
      toast.success("Profile updated successfully.");
    } catch {
      toast.error("Failed to update profile.");
      setLocalName(user?.displayName || user?.email?.split("@")[0] || "User");
    }
  };

  const displayName = localName || user?.displayName || user?.email?.split("@")[0] || "User";
  const photo = user?.photoURL || form.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=288a4c&color=fff&bold=true`;
  const email = user?.email || "Not provided";
  const phone = user?.phoneNumber || "Not provided";
  const location = user?.location || "Not set";
  const joined = user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString("en-US", { year: "numeric", month: "long" }) : "—";
  const lastLogin = user?.metadata?.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" }) : "—";

  return (
    <>
      <GlobalStyle />
      <div className="profile-root">
        <div className="p-shell">

          {/* Page header */}
          <div className="page-header">
            <div className="page-header-text">
              <h1 className="page-title">My Account</h1>
              <p>Welcome back, {displayName.split(" ")[0]} 👋</p>
            </div>
          </div>

          {/* Hero Profile Card */}
          <div className="hero-card" style={{ marginBottom: 24 }}>
            <div className="hero-banner" />
            <div className="hero-body">
              <div style={{ display: "flex", alignItems: "flex-end", gap: 20, flexWrap: "wrap" }}>
                <div className="avatar-wrap">
                  <img src={photo} alt={displayName} />
                  <div className="avatar-badge" />
                </div>
                <div className="hero-meta">
                  <h2>{displayName}</h2>
                  <p>Member since {joined} · Last active {lastLogin}</p>
                  <div className="tag-row">
                    <span className="tag tag-member">Member</span>
                    <span className="tag tag-active">Active</span>
                  </div>
                </div>
              </div>
              <div className="hero-actions">
                <button className="btn-edit" onClick={openEdit}>
                  <PencilSquareIcon style={{ width: 16, height: 16 }} />
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Info row */}
            <div className="info-row">
              <InfoItem icon={EnvelopeIcon} label="Email" value={email} />
              <InfoItem icon={PhoneIcon} label="Phone" value={phone} />
              <InfoItem icon={MapPinIcon} label="Location" value={location} />
            </div>
          </div>

          {/* Stat Cards */}
          <p className="section-title">Activity Overview</p>
          <div className="stats-grid" style={{ marginBottom: 24 }}>
            <StatCard icon={HeartIcon} title="Wishlist Items" value={loading ? "—" : stats.watchlist} hint="Saved for later" trend="12" />
            <StatCard icon={ShoppingCartIcon} title="Total Orders" value={loading ? "—" : stats.orders} hint="Completed & pending" trend="5" />
           
            <StatCard icon={WalletIcon} title="Total Spend" value={loading ? "—" : `৳${Number(stats.spend || 0).toLocaleString("en-BD", { minimumFractionDigits: 2 })}`} hint="All time" trend="8" />
          </div>

          {/* Insight Banner */}
          <div className="insight-banner">
            <div className="insight-icon-wrap">
              <SparklesIcon style={{ width: 24, height: 24, color: "#fff" }} />
            </div>
            <div className="insight-text">
              <h4>Purchase Insights — Coming Soon</h4>
              <p>Visual spending trends, top categories & order timelines will be available here.</p>
            </div>
            <span className="insight-badge">Beta</span>
          </div>

        </div>

        {/* Edit Modal */}
        {editing && (
          <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && setEditing(false)}>
            <div className="modal-box">
              <div className="modal-header">
                <h3>Edit Profile</h3>
                <button className="modal-close" onClick={() => setEditing(false)}>
                  <XMarkIcon style={{ width: 16, height: 16 }} />
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body">
                  <div className="field-group">
                    <label>Full Name</label>
                    <input name="displayName" value={form.displayName} onChange={handleChange} placeholder="Your name" />
                  </div>
                  <div className="field-group">
                    <label>Phone Number</label>
                    <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} placeholder="+880 ..." />
                  </div>
                  <div className="field-group">
                    <label>Location</label>
                    <input name="location" value={form.location} onChange={handleChange} placeholder="City, Country" />
                  </div>
                  <div className="field-group">
                    <label>Photo URL</label>
                    <input name="photoURL" value={form.photoURL} onChange={handleChange} placeholder="https://..." />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn-cancel" onClick={() => setEditing(false)}>Cancel</button>
                  <button type="submit" className="btn-save">
                    <CheckIcon style={{ width: 16, height: 16 }} />
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;