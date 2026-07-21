import { useState } from "react";

const SEGMENTS = [
  { key: "content", label: "Content & Preparation" },
  { key: "delivery", label: "Voice & Delivery" },
  { key: "bodyLanguage", label: "Body Language & Eye Contact" },
  { key: "structure", label: "Structure & Grammar" }
];

export default function Evaluations({ students, evaluations, onSaveEvaluation, onDeleteWeek }) {
  const [selectedWeek, setSelectedWeek] = useState(null); // null = show weeks list view
  const [showModal, setShowModal] = useState(false);
  const [weekToDelete, setWeekToDelete] = useState(null);

  // Form State
  const [weekNumberInput, setWeekNumberInput] = useState("1");
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [marks, setMarks] = useState({
    content: 0,
    delivery: 0,
    bodyLanguage: 0,
    structure: 0,
  });

  // Extract list of unique weeks dynamically
  const existingWeeks = Array.from(
    new Set(evaluations.map((e) => e.week).filter(Boolean))
  ).sort();

  const totalScore = Object.values(marks).reduce((acc, curr) => acc + Number(curr), 0);

  const handleOpenModal = () => {
    if (selectedWeek) {
      const match = selectedWeek.match(/\d+/);
      setWeekNumberInput(match ? match[0] : "1");
    } else {
      const nextNum = existingWeeks.length + 1;
      setWeekNumberInput(String(nextNum));
    }
    setSelectedStudentId(students[0]?.id || "");
    setMarks({ content: 0, delivery: 0, bodyLanguage: 0, structure: 0 });
    setShowModal(true);
  };

  const handleMarkChange = (segmentKey, val) => {
    const num = Math.min(10, Math.max(0, Number(val)));
    setMarks((prev) => ({ ...prev, [segmentKey]: num }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!weekNumberInput) {
      alert("Please enter a week number!");
      return;
    }
    if (!selectedStudentId) {
      alert("Please select a student!");
      return;
    }

    const formattedWeekName = `Week ${weekNumberInput}`;
    const studentObj = students.find((s) => s.id === selectedStudentId);

    onSaveEvaluation({
      week: formattedWeekName,
      studentId: selectedStudentId,
      studentName: studentObj ? studentObj.name : "Unknown",
      studentGrade: studentObj ? studentObj.grade : "",
      marks,
      totalScore,
    });

    setSelectedWeek(formattedWeekName);
    setShowModal(false);
  };

  const confirmDeleteWeek = () => {
    if (weekToDelete) {
      onDeleteWeek(weekToDelete);
      if (selectedWeek === weekToDelete) {
        setSelectedWeek(null);
      }
      setWeekToDelete(null);
    }
  };

  const activeWeekEvaluations = evaluations.filter((e) => e.week === selectedWeek);

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      {/* Top Bar Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "15px", marginBottom: "25px" }}>
        <div>
          {selectedWeek && (
            <button
              onClick={() => setSelectedWeek(null)}
              style={{ backgroundColor: "transparent", color: "#60a5fa", border: "none", cursor: "pointer", padding: 0, marginBottom: "8px", fontSize: "14px", fontWeight: "bold", display: "flex", alignItems: "center", gap: "5px" }}
            >
              ← Back to All Weeks
            </button>
          )}
          <h1 style={{ fontSize: "28px", fontWeight: "bold", margin: "0 0 5px 0" }}>
            {selectedWeek ? `${selectedWeek} Evaluations` : "Weekly Evaluations"}
          </h1>
          <p style={{ color: "#9ca3af", margin: 0 }}>
            {selectedWeek ? "Review student scores and statuses for this week." : "Select a week to view student records or add a new evaluation."}
          </p>
        </div>

        <button
          onClick={handleOpenModal}
          style={{ backgroundColor: "#2563eb", color: "white", padding: "10px 20px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "bold", fontSize: "15px" }}
        >
          + New Evaluation
        </button>
      </div>

      {/* VIEW 1: HORIZONTAL WEEKS LIST */}
      {!selectedWeek && (
        <div>
          {existingWeeks.length === 0 ? (
            <div style={{ backgroundColor: "#1f2937", borderRadius: "12px", border: "1px solid #374151", padding: "50px 20px", textAlign: "center" }}>
              <h3 style={{ margin: "0 0 10px 0", color: "#f3f4f6" }}>No Evaluation Weeks Available</h3>
              <p style={{ color: "#9ca3af", margin: "0 0 20px 0" }}>Click below to create your first evaluation session.</p>
              <button
                onClick={handleOpenModal}
                style={{ backgroundColor: "#2563eb", color: "white", padding: "10px 20px", borderRadius: "8px", border: "none", cursor: "pointer", fontWeight: "bold" }}
              >
                + Start First Evaluation
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {existingWeeks.map((week) => {
                const count = evaluations.filter((e) => e.week === week).length;
                return (
                  <div
                    key={week}
                    onClick={() => setSelectedWeek(week)}
                    style={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "10px",
                      padding: "16px 20px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      cursor: "pointer",
                      transition: "all 0.2s"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#3b82f6")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#374151")}
                  >
                    <div>
                      <h3 style={{ margin: "0 0 4px 0", fontSize: "18px", color: "#f9fafb" }}>{week}</h3>
                      <span style={{ fontSize: "13px", color: "#9ca3af" }}>
                        {count} {count === 1 ? "student evaluated" : "students evaluated"}
                      </span>
                    </div>

                    {/* Delete Week Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Don't trigger card click
                        setWeekToDelete(week);
                      }}
                      title="Delete Week"
                      style={{
                        backgroundColor: "#ef44441a",
                        color: "#ef4444",
                        border: "1px solid #ef4444",
                        borderRadius: "6px",
                        width: "36px",
                        height: "36px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: SELECTED WEEK STUDENT TABLE */}
      {selectedWeek && (
        <div style={{ backgroundColor: "#1f2937", borderRadius: "12px", border: "1px solid #374151", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ backgroundColor: "#111827", borderBottom: "1px solid #374151", color: "#9ca3af", fontSize: "14px" }}>
                <th style={{ padding: "14px 20px" }}>Student Name</th>
                <th style={{ padding: "14px 20px" }}>Grade</th>
                <th style={{ padding: "14px 20px" }}>Segment Breakdown</th>
                <th style={{ padding: "14px 20px" }}>Total Marks</th>
                <th style={{ padding: "14px 20px" }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ padding: "30px", textAlign: "center", color: "#6b7280" }}>
                    No students found. Add students in the Students tab first.
                  </td>
                </tr>
              ) : (
                students.map((student) => {
                  const evalData = activeWeekEvaluations.find((e) => e.studentId === student.id);
                  const isAbsent = !evalData;

                  return (
                    <tr key={student.id} style={{ borderBottom: "1px solid #374151" }}>
                      <td style={{ padding: "16px 20px", fontWeight: "600" }}>{student.name}</td>
                      <td style={{ padding: "16px 20px", color: "#9ca3af" }}>{student.grade}</td>

                      {/* Segment Breakdown */}
                      <td style={{ padding: "16px 20px" }}>
                        {!isAbsent ? (
                          <div style={{ fontSize: "13px", color: "#d1d5db" }}>
                            Content: <b>{evalData.marks?.content ?? 0}</b> | Delivery: <b>{evalData.marks?.delivery ?? 0}</b> | Body: <b>{evalData.marks?.bodyLanguage ?? 0}</b> | Structure: <b>{evalData.marks?.structure ?? 0}</b>
                          </div>
                        ) : (
                          <span style={{ color: "#6b7280" }}>—</span>
                        )}
                      </td>

                      {/* Total Score */}
                      <td style={{ padding: "16px 20px", fontWeight: "bold", fontSize: "16px" }}>
                        {!isAbsent ? `${evalData.totalScore} / 40` : "—"}
                      </td>

                      {/* Status Badge */}
                      <td style={{ padding: "16px 20px" }}>
                        {!isAbsent ? (
                          <span style={{ backgroundColor: "#065f46", color: "#34d399", padding: "4px 10px", borderRadius: "12px", fontSize: "12px", fontWeight: "bold" }}>
                            Evaluated
                          </span>
                        ) : (
                          <span style={{ backgroundColor: "#7f1d1d", color: "#fca5a5", padding: "4px 10px", borderRadius: "12px", fontSize: "12px", fontWeight: "bold" }}>
                            Absent
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL 1: NEW EVALUATION FORM */}
      {showModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.75)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 }}>
          <div style={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "12px", width: "90%", maxWidth: "500px", padding: "25px", color: "white" }}>
            <h2 style={{ marginTop: 0, fontSize: "22px" }}>New Evaluation</h2>

            <form onSubmit={handleSubmit}>
              {/* Number-Only Week Input */}
              <div style={{ marginBottom: "18px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#d1d5db" }}>
                  Week Number:
                </label>
                <div style={{ display: "flex", alignItems: "center", border: "1px solid #374151", borderRadius: "6px", backgroundColor: "#111827", overflow: "hidden" }}>
                  <span style={{ padding: "10px 14px", backgroundColor: "#374151", color: "#9ca3af", fontWeight: "bold", fontSize: "14px" }}>
                    Week
                  </span>
                  <input
                    type="number"
                    min="1"
                    value={weekNumberInput}
                    onChange={(e) => setWeekNumberInput(e.target.value)}
                    placeholder="1"
                    style={{ flex: 1, padding: "10px", backgroundColor: "transparent", color: "white", border: "none", outline: "none", fontSize: "15px", fontWeight: "bold" }}
                    required
                  />
                </div>
              </div>

              {/* Student Select Dropdown */}
              <div style={{ marginBottom: "18px" }}>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", color: "#d1d5db" }}>Select Student:</label>
                <select
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  style={{ width: "100%", padding: "10px", borderRadius: "6px", backgroundColor: "#111827", color: "white", border: "1px solid #374151", boxSizing: "border-box" }}
                  required
                >
                  <option value="" disabled>Choose a student...</option>
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>{s.name} ({s.grade})</option>
                  ))}
                </select>
              </div>

              {/* Segment Marks (0-10) */}
              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", marginBottom: "12px", fontSize: "14px", fontWeight: "bold", color: "#60a5fa" }}>
                  Allocate Segment Marks (0 - 10):
                </label>

                {SEGMENTS.map((seg) => (
                  <div key={seg.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                    <span style={{ fontSize: "14px" }}>{seg.label}</span>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={marks[seg.key]}
                      onChange={(e) => handleMarkChange(seg.key, e.target.value)}
                      style={{ width: "65px", padding: "6px", borderRadius: "6px", backgroundColor: "#111827", color: "white", border: "1px solid #374151", textAlign: "center", fontWeight: "bold" }}
                    />
                  </div>
                ))}
              </div>

              {/* Total Score Summary */}
              <div style={{ backgroundColor: "#111827", padding: "12px 15px", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <span>Total Calculated Score:</span>
                <span style={{ fontSize: "20px", fontWeight: "bold", color: "#34d399" }}>{totalScore} / 40</span>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{ padding: "10px 16px", borderRadius: "6px", backgroundColor: "#374151", color: "white", border: "none", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: "10px 20px", borderRadius: "6px", backgroundColor: "#2563eb", color: "white", border: "none", cursor: "pointer", fontWeight: "bold" }}
                >
                  Save Evaluation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: DELETE CONFIRMATION */}
      {weekToDelete && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.75)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1100 }}>
          <div style={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "12px", width: "90%", maxWidth: "420px", padding: "25px", color: "white", textAlign: "center" }}>
            <h3 style={{ marginTop: 0, fontSize: "20px", color: "#ef4444" }}>Delete {weekToDelete}?</h3>
            <p style={{ color: "#d1d5db", fontSize: "14px", marginBottom: "25px" }}>
              Are you sure you want to delete <b>{weekToDelete}</b> and all evaluation records inside it? This action cannot be undone.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
              <button
                onClick={() => setWeekToDelete(null)}
                style={{ padding: "10px 20px", borderRadius: "6px", backgroundColor: "#374151", color: "white", border: "none", cursor: "pointer" }}
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteWeek}
                style={{ padding: "10px 20px", borderRadius: "6px", backgroundColor: "#dc2626", color: "white", border: "none", cursor: "pointer", fontWeight: "bold" }}
              >
                Delete Week
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}