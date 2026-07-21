import { useState } from "react";

export default function Winners({ students, evaluations = [] }) {
  // Extract list of unique evaluated weeks dynamically
  const existingWeeks = Array.from(
    new Set(evaluations.map((e) => e.week).filter(Boolean))
  ).sort();

  // Default to the most recent week if available, otherwise "Overall"
  const defaultWeek = existingWeeks.length > 0 ? existingWeeks[existingWeeks.length - 1] : "Overall";
  const [selectedWeek, setSelectedWeek] = useState(defaultWeek);

  // Calculate Leaderboard based on selected week or Overall
  let leaderboard = [];

  if (selectedWeek === "Overall") {
    leaderboard = [...students]
      .map((s) => ({
        id: s.id,
        name: s.name,
        grade: s.grade,
        score: s.score || 0,
        speechesGiven: s.speechesGiven || 0,
      }))
      .sort((a, b) => b.score - a.score);
  } else {
    // Filter evaluations for selected week and sort by total score
    const weekEvals = evaluations.filter((e) => e.week === selectedWeek);
    leaderboard = weekEvals
      .map((e) => ({
        id: e.studentId || e.id,
        name: e.studentName,
        grade: e.studentGrade,
        score: e.totalScore,
        marks: e.marks,
      }))
      .sort((a, b) => b.score - a.score);
  }

  const firstPlace = leaderboard[0];
  const secondPlace = leaderboard[1];
  const thirdPlace = leaderboard[2];
  const remainingRankings = leaderboard.slice(3);

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      {/* Header & Week Selector */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "15px", marginBottom: "30px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: "bold", margin: "0 0 5px 0" }}>🏆 Winners Podium</h1>
          <p style={{ color: "#9ca3af", margin: 0 }}>
            {selectedWeek === "Overall"
              ? "Overall cumulative scores across all evaluation sessions."
              : `Top performers for ${selectedWeek}.`}
          </p>
        </div>

        {/* Select Week Dropdown Icon */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#1f2937", border: "1px solid #374151", padding: "8px 16px", borderRadius: "8px" }}>
          <span style={{ fontSize: "18px" }}>📅</span>
          <select
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(e.target.value)}
            style={{
              backgroundColor: "transparent",
              color: "#38bdf8",
              border: "none",
              outline: "none",
              fontSize: "15px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            {existingWeeks.map((week) => (
              <option key={week} value={week} style={{ backgroundColor: "#1f2937", color: "white" }}>
                {week} Winners
              </option>
            ))}
            <option value="Overall" style={{ backgroundColor: "#1f2937", color: "white" }}>
              🏆 Overall Standings
            </option>
          </select>
        </div>
      </div>

      {/* Empty State */}
      {leaderboard.length === 0 ? (
        <div style={{ backgroundColor: "#1f2937", border: "1px solid #374151", borderRadius: "12px", padding: "50px 20px", textAlign: "center" }}>
          <h3 style={{ color: "#f3f4f6", margin: "0 0 10px 0" }}>No Winner Data for {selectedWeek}</h3>
          <p style={{ color: "#9ca3af", margin: 0 }}>Submit student evaluations in the Weekly Evaluations tab to generate winners.</p>
        </div>
      ) : (
        <>
          {/* Top 3 Podium Displays (In 1, 2, 3 Order - Equal Sizes) */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "stretch", gap: "15px", marginBottom: "40px", flexWrap: "wrap" }}>
            
            {/* 1st Place (Gold) */}
            {firstPlace && (
              <div style={{ backgroundColor: "#1f2937", border: "2px solid #eab308", borderRadius: "12px", padding: "20px", textAlign: "center", flex: "1", minWidth: "220px", maxWidth: "280px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: "36px", marginBottom: "8px" }}>🥇</div>
                  <h3 style={{ margin: "0 0 4px 0", fontSize: "18px", color: "#fef08a" }}>{firstPlace.name}</h3>
                  <p style={{ margin: "0 0 12px 0", fontSize: "13px", color: "#ca8a04" }}>{firstPlace.grade}</p>
                </div>
                <div>
                  <div style={{ backgroundColor: "#ca8a04", color: "#1e1b4b", fontWeight: "bold", padding: "6px 12px", borderRadius: "20px", display: "inline-block", fontSize: "14px" }}>
                    {firstPlace.score} {selectedWeek === "Overall" ? "pts" : "/ 40"}
                  </div>
                </div>
              </div>
            )}

            {/* 2nd Place (Silver) */}
            {secondPlace && (
              <div style={{ backgroundColor: "#1f2937", border: "2px solid #94a3b8", borderRadius: "12px", padding: "20px", textAlign: "center", flex: "1", minWidth: "220px", maxWidth: "280px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: "36px", marginBottom: "8px" }}>🥈</div>
                  <h3 style={{ margin: "0 0 4px 0", fontSize: "18px", color: "#e2e8f0" }}>{secondPlace.name}</h3>
                  <p style={{ margin: "0 0 12px 0", fontSize: "13px", color: "#94a3b8" }}>{secondPlace.grade}</p>
                </div>
                <div>
                  <div style={{ backgroundColor: "#334155", color: "#e2e8f0", fontWeight: "bold", padding: "6px 12px", borderRadius: "20px", display: "inline-block", fontSize: "14px" }}>
                    {secondPlace.score} {selectedWeek === "Overall" ? "pts" : "/ 40"}
                  </div>
                </div>
              </div>
            )}

            {/* 3rd Place (Bronze) */}
            {thirdPlace && (
              <div style={{ backgroundColor: "#1f2937", border: "2px solid #b45309", borderRadius: "12px", padding: "20px", textAlign: "center", flex: "1", minWidth: "220px", maxWidth: "280px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: "36px", marginBottom: "8px" }}>🥉</div>
                  <h3 style={{ margin: "0 0 4px 0", fontSize: "18px", color: "#fcd34d" }}>{thirdPlace.name}</h3>
                  <p style={{ margin: "0 0 12px 0", fontSize: "13px", color: "#b45309" }}>{thirdPlace.grade}</p>
                </div>
                <div>
                  <div style={{ backgroundColor: "#78350f", color: "#fde68a", fontWeight: "bold", padding: "6px 12px", borderRadius: "20px", display: "inline-block", fontSize: "14px" }}>
                    {thirdPlace.score} {selectedWeek === "Overall" ? "pts" : "/ 40"}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Leaderboard Table for remaining participants */}
          {remainingRankings.length > 0 && (
            <div style={{ backgroundColor: "#1f2937", borderRadius: "12px", border: "1px solid #374151", overflow: "hidden" }}>
              <h4 style={{ margin: 0, padding: "16px 20px", backgroundColor: "#111827", borderBottom: "1px solid #374151", color: "#9ca3af", fontSize: "14px" }}>
                Other Participants ({selectedWeek})
              </h4>
              <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                <tbody>
                  {remainingRankings.map((student, index) => (
                    <tr key={student.id} style={{ borderBottom: "1px solid #374151" }}>
                      <td style={{ padding: "14px 20px", fontWeight: "bold", color: "#9ca3af", width: "50px" }}>
                        #{index + 4}
                      </td>
                      <td style={{ padding: "14px 20px", fontWeight: "600" }}>{student.name}</td>
                      <td style={{ padding: "14px 20px", color: "#9ca3af" }}>{student.grade}</td>
                      <td style={{ padding: "14px 20px", fontWeight: "bold", textAlign: "right" }}>
                        {student.score} {selectedWeek === "Overall" ? "pts" : "/ 40"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}