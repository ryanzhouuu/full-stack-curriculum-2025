import React, { useState } from "react";

export default function Scoreboard({ team1, team2 }) {
    const [score1, setScore1] = useState(0);
    const [score2, setScore2] = useState(0);
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        color: "white",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        borderRadius: "15px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        border: "3px solid #ffd700",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      {/* NBA Logo/Title */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "20px",
          borderBottom: "2px solid #ffd700",
          paddingBottom: "10px",
        }}
      >
        <h1
          style={{
            color: "#ffd700",
            fontSize: "2.5rem",
            margin: "0",
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            fontWeight: "bold",
          }}
        >
          🏀 NBA SCOREBOARD 🏀
        </h1>
      </div>

      {/* Game Info */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginBottom: "20px",
        }}
      >
        {/* Home Team */}
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.1)",
            padding: "15px",
            borderRadius: "10px",
            textAlign: "center",
            border: "2px solid #ffd700",
          }}
        >
          <h3
            style={{
              color: "#ffd700",
              margin: "0 0 10px 0",
              fontSize: "1.2rem",
            }}
          >
            HOME
          </h3>
          <div
            style={{ fontSize: "2rem", fontWeight: "bold", color: "#ff6b6b" }}
          >
            {team1}
          </div>
          <div
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              color: "#ffd700",
              margin: "10px 0",
            }}

            onClick={() => setScore1(score1 + 1)}
          >
            {score1}
          </div>
        </div>

        {/* Away Team */}
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.1)",
            padding: "15px",
            borderRadius: "10px",
            textAlign: "center",
            border: "2px solid #ffd700",
          }}
        >
          <h3
            style={{
              color: "#ffd700",
              margin: "0 0 10px 0",
              fontSize: "1.2rem",
            }}
          >
            AWAY
          </h3>
          <div
            style={{ fontSize: "2rem", fontWeight: "bold", color: "#4ecdc4" }}
          >
            {team2}
          </div>
          <div
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              color: "#ffd700",
              margin: "10px 0",
            }}

            onClick={() => setScore2(score2 + 1)}
          >
            {score2}
          </div>
        </div>
      </div>

      {/* Game Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "15px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.1)",
            padding: "10px",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              color: "#ffd700",
              fontSize: "0.9rem",
              marginBottom: "5px",
            }}
          >
            QUARTER
          </div>
          <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>4th</div>
        </div>
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.1)",
            padding: "10px",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              color: "#ffd700",
              fontSize: "0.9rem",
              marginBottom: "5px",
            }}
          >
            TIME
          </div>
          <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>2:34</div>
        </div>
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.1)",
            padding: "10px",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              color: "#ffd700",
              fontSize: "0.9rem",
              marginBottom: "5px",
            }}
          >
            TIMEOUTS
          </div>
          <div style={{ fontSize: "1.5rem", fontWeight: "bold" }}>3</div>
        </div>
      </div>

      {/* Season Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "15px",
          backgroundColor: "rgba(0,0,0,0.2)",
          padding: "15px",
          borderRadius: "10px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              color: "#ffd700",
              fontSize: "0.9rem",
              marginBottom: "5px",
            }}
          >
            WINS
          </div>
          <div
            style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#4ecdc4" }}
          >
            42
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              color: "#ffd700",
              fontSize: "0.9rem",
              marginBottom: "5px",
            }}
          >
            LOSSES
          </div>
          <div
            style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#ff6b6b" }}
          >
            28
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              color: "#ffd700",
              fontSize: "0.9rem",
              marginBottom: "5px",
            }}
          >
            WIN %
          </div>
          <div
            style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#ffd700" }}
          >
            60.0%
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              color: "#ffd700",
              fontSize: "0.9rem",
              marginBottom: "5px",
            }}
          >
            GAMES
          </div>
          <div
            style={{ fontSize: "1.8rem", fontWeight: "bold", color: "#fff" }}
          >
            70
          </div>
        </div>
      </div>
    </div>
  );
}
