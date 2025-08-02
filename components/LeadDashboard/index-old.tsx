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
  const [activeTab, setActiveTab] = useState<"leads" | "notifications">("leads");

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
              className={`${styles.tab} ${activeTab === "leads" ? styles.active : ""}`}
              onClick={() => setActiveTab("leads")}
            >
              🎯 Leads ({leads.length})
            </button>
            <button 
              className={`${styles.tab} ${activeTab === "notifications" ? styles.active : ""}`}
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
          </>
        ) : (
          <NotificationDashboard />
        )}
          <button onClick={onClose} className={styles.closeBtn}>
            ✕
          </button>
        </div>

        {/* Stats Overview */}
        <div className={styles.stats}>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>{stats.total}</span>
            <span className={styles.statLabel}>Total Leads</span>
          </div>
          <div className={`${styles.statCard} ${styles.hot}`}>
            <span className={styles.statNumber}>{stats.hot}</span>
            <span className={styles.statLabel}>🔥 Hot</span>
          </div>
          <div className={`${styles.statCard} ${styles.warm}`}>
            <span className={styles.statNumber}>{stats.warm}</span>
            <span className={styles.statLabel}>⭐ Warm</span>
          </div>
          <div className={`${styles.statCard} ${styles.cold}`}>
            <span className={styles.statNumber}>{stats.cold}</span>
            <span className={styles.statLabel}>📋 Cold</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statNumber}>{stats.avgScore}</span>
            <span className={styles.statLabel}>Avg Score</span>
          </div>
        </div>

        {/* Filters */}
        <div className={styles.filters}>
          <button
            className={filter === "all" ? styles.active : ""}
            onClick={() => setFilter("all")}
          >
            All ({leads.length})
          </button>
          <button
            className={filter === "hot" ? styles.active : ""}
            onClick={() => setFilter("hot")}
          >
            🔥 Hot ({stats.hot})
          </button>
          <button
            className={filter === "warm" ? styles.active : ""}
            onClick={() => setFilter("warm")}
          >
            ⭐ Warm ({stats.warm})
          </button>
          <button
            className={filter === "cold" ? styles.active : ""}
            onClick={() => setFilter("cold")}
          >
            📋 Cold ({stats.cold})
          </button>
        </div>

        {/* Lead List */}
        <div className={styles.leadList}>
          {filteredLeads.map((lead) => (
            <div
              key={lead.id}
              className={`${styles.leadCard} ${styles[lead.leadQuality]}`}
              onClick={() => setSelectedLead(lead)}
            >
              <div className={styles.leadHeader}>
                <h4>{lead.name}</h4>
                <span className={styles.leadScore}>{lead.leadScore}/100</span>
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
                <span className={styles.leadDate}>
                  {new Date(lead.timestamp).toLocaleDateString("vi-VN")}
                </span>
                <span
                  className={`${styles.leadBadge} ${styles[lead.leadQuality]}`}
                >
                  {lead.leadQuality.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Lead Detail Modal */}
        {selectedLead && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div className={styles.modalHeader}>
                <h3>Lead Details: {selectedLead.name}</h3>
                <button onClick={() => setSelectedLead(null)}>✕</button>
              </div>

              <div className={styles.modalBody}>
                <div className={styles.section}>
                  <h4>Contact Information</h4>
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
                  <h4>Project Details</h4>
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
                </div>

                <div className={styles.section}>
                  <h4>Qualification</h4>
                  <p>
                    <strong>Decision Maker:</strong>{" "}
                    {selectedLead.decisionMaker}
                  </p>
                  <p>
                    <strong>Team Size:</strong> {selectedLead.teamSize}
                  </p>
                  <p>
                    <strong>Current Solution:</strong>{" "}
                    {selectedLead.currentSolution}
                  </p>
                  <p>
                    <strong>Lead Score:</strong> {selectedLead.leadScore}/100
                  </p>
                  <p>
                    <strong>Quality:</strong>{" "}
                    <span className={styles[selectedLead.leadQuality]}>
                      {selectedLead.leadQuality.toUpperCase()}
                    </span>
                  </p>
                </div>

                <div className={styles.section}>
                  <h4>Requirements</h4>
                  <div className={styles.requirements}>
                    {selectedLead.specificRequirements.map((req) => (
                      <span key={req} className={styles.requirement}>
                        {req}
                      </span>
                    ))}
                  </div>
                  <p>
                    <strong>Message:</strong>
                  </p>
                  <p className={styles.message}>{selectedLead.message}</p>
                </div>

                <div className={styles.section}>
                  <h4>Actions</h4>
                  <div className={styles.actions}>
                    <button
                      className={styles.actionBtn}
                      onClick={() =>
                        window.open(`mailto:${selectedLead.email}`, "_blank")
                      }
                    >
                      📧 Email
                    </button>
                    <button
                      className={styles.actionBtn}
                      onClick={() =>
                        window.open(`tel:${selectedLead.phone}`, "_blank")
                      }
                    >
                      📞 Call
                    </button>
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
          </div>
        )}
      </div>
    </div>
  );
}
