"use client";
import { useState, useEffect } from "react";
import { getStoredLeads, QualifiedLead } from "@/lib/leadQualification";
import NotificationDashboard from "@/components/NotificationDashboard";
import styles from "./LeadDashboard.module.css";

interface LeadDashboardProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function LeadDashboard({
  isVisible,
  onClose,
}: LeadDashboardProps) {
  const [leads, setLeads] = useState<QualifiedLead[]>([]);
  const [selectedLead, setSelectedLead] = useState<QualifiedLead | null>(null);
  const [filter, setFilter] = useState<"all" | "hot" | "warm" | "cold">("all");
  const [activeTab, setActiveTab] = useState<"leads" | "notifications">(
    "leads"
  );

  useEffect(() => {
    if (isVisible) {
      setLeads(getStoredLeads());
    }
  }, [isVisible]);

  const filteredLeads = leads.filter(
    (lead) => filter === "all" || lead.leadQuality === filter
  );

  const getLeadStats = () => {
    const total = leads.length;
    const hot = leads.filter((l) => l.leadQuality === "hot").length;
    const warm = leads.filter((l) => l.leadQuality === "warm").length;
    const cold = leads.filter((l) => l.leadQuality === "cold").length;
    const avgScore =
      total > 0
        ? Math.round(leads.reduce((sum, l) => sum + l.leadScore, 0) / total)
        : 0;

    return { total, hot, warm, cold, avgScore };
  };

  const stats = getLeadStats();

  if (!isVisible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.dashboard}>
        <div className={styles.header}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${
                activeTab === "leads" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("leads")}
            >
              🎯 Leads ({leads.length})
            </button>
            <button
              className={`${styles.tab} ${
                activeTab === "notifications" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("notifications")}
            >
              🔔 Notifications
            </button>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>

        {activeTab === "leads" ? (
          <>
            {/* Stats Overview */}
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>{stats.total}</span>
                <span className={styles.statLabel}>Total Leads</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>{stats.hot}</span>
                <span className={styles.statLabel}>🔥 Hot</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>{stats.warm}</span>
                <span className={styles.statLabel}>⭐ Warm</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>{stats.cold}</span>
                <span className={styles.statLabel}>📋 Cold</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>{stats.avgScore}</span>
                <span className={styles.statLabel}>Avg Score</span>
              </div>
            </div>

            {/* Filters */}
            <div className={styles.filters}>
              {(["all", "hot", "warm", "cold"] as const).map((filterOption) => (
                <button
                  key={filterOption}
                  className={`${styles.filterButton} ${
                    filter === filterOption ? styles.active : ""
                  }`}
                  onClick={() => setFilter(filterOption)}
                >
                  {filterOption === "all"
                    ? "All"
                    : filterOption === "hot"
                    ? "🔥 Hot"
                    : filterOption === "warm"
                    ? "⭐ Warm"
                    : "📋 Cold"}
                </button>
              ))}
            </div>

            {/* Lead List */}
            <div className={styles.leadList}>
              {filteredLeads.length === 0 ? (
                <div className={styles.emptyState}>
                  <p>No leads found matching the selected filter.</p>
                </div>
              ) : (
                filteredLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className={`${styles.leadCard} ${styles[lead.leadQuality]}`}
                    onClick={() => setSelectedLead(lead)}
                  >
                    <div className={styles.leadHeader}>
                      <h4>{lead.name}</h4>
                      <span className={styles.leadScore}>
                        {lead.leadScore}/100
                      </span>
                    </div>
                    <div className={styles.leadInfo}>
                      <p>
                        <strong>📧</strong> {lead.email}
                      </p>
                      <p>
                        <strong>📞</strong> {lead.phone}
                      </p>
                      <p>
                        <strong>💼</strong> {lead.projectType}
                      </p>
                      <p>
                        <strong>💰</strong> {lead.budget}
                      </p>
                      <p>
                        <strong>⏰</strong> {lead.urgency}
                      </p>
                    </div>
                    <div className={styles.leadFooter}>
                      <span className={styles.timestamp}>
                        {new Date(lead.timestamp).toLocaleDateString("vi-VN")} -{" "}
                        {new Date(lead.timestamp).toLocaleTimeString("vi-VN")}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        ) : (
          <NotificationDashboard />
        )}

        {/* Lead Detail Modal */}
        {selectedLead && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h3>
                  {selectedLead.leadQuality === "hot"
                    ? "🔥"
                    : selectedLead.leadQuality === "warm"
                    ? "⭐"
                    : "📋"}
                  {selectedLead.name} - {selectedLead.leadQuality.toUpperCase()}{" "}
                  Lead
                </h3>
                <button
                  className={styles.modalClose}
                  onClick={() => setSelectedLead(null)}
                >
                  ✕
                </button>
              </div>
              <div className={styles.modalBody}>
                <div className={styles.leadDetails}>
                  <div className={styles.section}>
                    <h4>👤 Contact Information</h4>
                    <p>
                      <strong>Name:</strong> {selectedLead.name}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedLead.email}
                    </p>
                    <p>
                      <strong>Phone:</strong> {selectedLead.phone}
                    </p>
                    <p>
                      <strong>Company:</strong> {selectedLead.company}
                    </p>
                  </div>

                  <div className={styles.section}>
                    <h4>💼 Project Details</h4>
                    <p>
                      <strong>Type:</strong> {selectedLead.projectType}
                    </p>
                    <p>
                      <strong>Budget:</strong> {selectedLead.budget}
                    </p>
                    <p>
                      <strong>Timeline:</strong> {selectedLead.timeline}
                    </p>
                    <p>
                      <strong>Urgency:</strong> {selectedLead.urgency}
                    </p>
                    <p>
                      <strong>Decision Maker:</strong>{" "}
                      {selectedLead.decisionMaker}
                    </p>
                  </div>

                  <div className={styles.section}>
                    <h4>📝 Message</h4>
                    <p>{selectedLead.message}</p>
                  </div>

                  <div className={styles.section}>
                    <h4>📊 Lead Scoring</h4>
                    <p>
                      <strong>Score:</strong> {selectedLead.leadScore}/100
                    </p>
                    <p>
                      <strong>Quality:</strong>{" "}
                      {selectedLead.leadQuality.toUpperCase()}
                    </p>
                    <p>
                      <strong>Submitted:</strong>{" "}
                      {new Date(selectedLead.timestamp).toLocaleString("vi-VN")}
                    </p>
                    <p>
                      <strong>Source:</strong> {selectedLead.source}
                    </p>
                  </div>
                </div>

                <div className={styles.actions}>
                  <a
                    href={`mailto:${selectedLead.email}`}
                    className={styles.actionBtn}
                  >
                    📧 Email
                  </a>
                  <a
                    href={`tel:${selectedLead.phone}`}
                    className={styles.actionBtn}
                  >
                    📞 Call
                  </a>
                  <button
                    className={styles.actionBtn}
                    onClick={() => {
                      const text = `Lead: ${selectedLead.name}\nEmail: ${selectedLead.email}\nProject: ${selectedLead.projectType}\nBudget: ${selectedLead.budget}\nScore: ${selectedLead.leadScore}/100`;
                      navigator.clipboard.writeText(text);
                      alert("Copied to clipboard!");
                    }}
                  >
                    📋 Copy
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
