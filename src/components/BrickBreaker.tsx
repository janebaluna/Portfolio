import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Heart, Trophy, Zap, Gamepad2 } from "lucide-react";

interface Brick {
  x: number;
  y: number;
  w: number;
  h: number;
  alive: boolean;
  strength: number;
  color: string;
}

interface PowerUp {
  x: number;
  y: number;
  type: "expand" | "life";
  vy: number;
  active: boolean;
}

interface ActivePower {
  key: string;
  until: number;
  timerId?: any;
}

export default function BrickBreaker() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // React state for HUD
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);
  const [activePowers, setActivePowers] = useState<ActivePower[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  // Use refs for values that change inside the high-frequency animation loop
  const gameStateRef = useRef({
    score: 0,
    lives: 3,
    level: 1,
    running: false,
    paused: false,
    gameOver: false,
    activePowers: [] as ActivePower[],
    powerUps: [] as PowerUp[],
  });

  const paddleRef = useRef({
    w: 120,
    h: 14,
    x: (720 - 120) / 2,
    y: 480 - 40,
    speed: 8,
    targetX: null as number | null,
  });

  const ballRef = useRef({
    r: 9,
    x: 720 / 2,
    y: 480 / 2,
    vx: 4,
    vy: -5,
    stuck: true,
  });

  const bricksRef = useRef<Brick[]>([]);
  const animationFrameIdRef = useRef<number | null>(null);
  const keysRef = useRef<{ [key: string]: boolean }>({});

  const CANVAS_W = 720;
  const CANVAS_H = 480;

  // Sync state helpers to update both UI and loop refs
  const syncScore = (newScore: number) => {
    gameStateRef.current.score = newScore;
    setScore(newScore);
  };

  const syncLives = (newLives: number) => {
    gameStateRef.current.lives = newLives;
    setLives(newLives);
  };

  const syncLevel = (newLevel: number) => {
    gameStateRef.current.level = newLevel;
    setLevel(newLevel);
  };

  const syncActivePowers = (newPowers: ActivePower[]) => {
    gameStateRef.current.activePowers = newPowers;
    setActivePowers(newPowers);
  };

  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

  const getBrickColor = (row: number) => {
    const colors = ["#f94144", "#f3722c", "#f9c74f", "#90be6d", "#43aa8b", "#577590"];
    return colors[row % colors.length];
  };

  // Build bricks
  const buildBricks = (levelNum: number) => {
    const defaultRows = 5;
    const defaultCols = 8;
    const offsetLeft = 30;
    const offsetTop = 60;
    const padding = 10;
    const brickH = 20;

    const extraRows = Math.min(3, Math.floor((levelNum - 1) / 2));
    const rows = defaultRows + extraRows;
    const cols = defaultCols;
    const totalPadding = (cols - 1) * padding;
    const availableWidth = CANVAS_W - offsetLeft * 2;
    const brickW = Math.floor((availableWidth - totalPadding) / cols);

    const newBricks: Brick[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = offsetLeft + c * (brickW + padding);
        const y = offsetTop + r * (brickH + padding);
        const strength = 1 + Math.floor(r / 2);
        const color = getBrickColor(r);
        newBricks.push({ x, y, w: brickW, h: brickH, alive: true, strength, color });
      }
    }
    bricksRef.current = newBricks;
  };

  const resetBallAndPaddle = () => {
    paddleRef.current.w = 120;
    paddleRef.current.x = (CANVAS_W - 120) / 2;
    paddleRef.current.targetX = null;

    ballRef.current.x = CANVAS_W / 2;
    ballRef.current.y = paddleRef.current.y - ballRef.current.r - 2;
    ballRef.current.vx = 4 * (Math.random() > 0.5 ? 1 : -1);
    ballRef.current.vy = -5;
    ballRef.current.stuck = true;
  };

  const circleRectCollision = (cx: number, cy: number, cr: number, rx: number, ry: number, rw: number, rh: number) => {
    const closestX = clamp(cx, rx, rx + rw);
    const closestY = clamp(cy, ry, ry + rh);
    const dx = cx - closestX;
    const dy = cy - closestY;
    return dx * dx + dy * dy < cr * cr;
  };

  const spawnPowerUp = (x: number, y: number) => {
    const types: ("expand" | "life")[] = ["expand", "life"];
    const type = types[Math.floor(Math.random() * types.length)];
    gameStateRef.current.powerUps.push({
      x,
      y,
      type,
      vy: 2 + Math.random() * 1.2,
      active: true,
    });
  };

  const activatePower = (type: "expand" | "life") => {
    if (type === "expand") {
      const prevW = paddleRef.current.w;
      paddleRef.current.w = Math.min(CANVAS_W - 20, paddleRef.current.w * 1.6);

      const timerId = setTimeout(() => {
        paddleRef.current.w = prevW;
        // Clean expired power-up from array
        const filtered = gameStateRef.current.activePowers.filter((p) => p.key !== "WIDE");
        syncActivePowers(filtered);
      }, 12000);

      const newPower: ActivePower = {
        key: "WIDE",
        until: Date.now() + 12000,
        timerId,
      };

      // Remove previous wide timer if active to avoid overlapping timeouts
      gameStateRef.current.activePowers.forEach((p) => {
        if (p.key === "WIDE" && p.timerId) clearTimeout(p.timerId);
      });

      const updated = [...gameStateRef.current.activePowers.filter((p) => p.key !== "WIDE"), newPower];
      syncActivePowers(updated);
    } else if (type === "life") {
      syncLives(gameStateRef.current.lives + 1);
      const newPower: ActivePower = {
        key: "LIFE+",
        until: Date.now() + 3000,
      };
      const updated = [...gameStateRef.current.activePowers, newPower];
      syncActivePowers(updated);
    }
  };

  // Main Loop Game Logic Updates
  const updatePhysics = () => {
    const state = gameStateRef.current;
    if (!state.running || state.paused || state.gameOver) return;

    // Paddle updates
    const paddle = paddleRef.current;
    const keys = keysRef.current;

    if (keys["ArrowLeft"] || keys["Left"]) {
      paddle.x -= paddle.speed;
    } else if (keys["ArrowRight"] || keys["Right"]) {
      paddle.x += paddle.speed;
    } else if (paddle.targetX !== null) {
      paddle.x += (paddle.targetX - paddle.x) * 0.25;
    }
    paddle.x = clamp(paddle.x, 6, CANVAS_W - paddle.w - 6);

    // Ball updates
    const ball = ballRef.current;
    if (ball.stuck) {
      ball.x = paddle.x + paddle.w / 2;
      ball.y = paddle.y - ball.r - 2;
    } else {
      ball.x += ball.vx;
      ball.y += ball.vy;
    }

    // Wall reflections
    if (ball.x - ball.r < 0) {
      ball.x = ball.r;
      ball.vx = -ball.vx;
    }
    if (ball.x + ball.r > CANVAS_W) {
      ball.x = CANVAS_W - ball.r;
      ball.vx = -ball.vx;
    }
    if (ball.y - ball.r < 0) {
      ball.y = ball.r;
      ball.vy = -ball.vy;
    }

    // Paddle hit
    if (
      ball.y + ball.r >= paddle.y &&
      ball.y + ball.r <= paddle.y + paddle.h &&
      ball.x >= paddle.x &&
      ball.x <= paddle.x + paddle.w
    ) {
      const hitPos = (ball.x - (paddle.x + paddle.w / 2)) / (paddle.w / 2);
      const angle = hitPos * (Math.PI / 3); // max 60 deg
      const speed = Math.min(10, Math.hypot(ball.vx, ball.vy) + 0.2);
      ball.vx = speed * Math.sin(angle);
      ball.vy = -Math.abs(speed * Math.cos(angle));
      ball.y = paddle.y - ball.r - 1;
    }

    // Brick hits
    const bricks = bricksRef.current;
    for (let i = 0; i < bricks.length; i++) {
      const b = bricks[i];
      if (!b.alive) continue;

      if (circleRectCollision(ball.x, ball.y, ball.r, b.x, b.y, b.w, b.h)) {
        ball.vy = -ball.vy;
        b.strength -= 1;
        if (b.strength <= 0) {
          b.alive = false;
          syncScore(state.score + 100);
          if (Math.random() < 0.15) {
            spawnPowerUp(b.x + b.w / 2, b.y + b.h / 2);
          }
        } else {
          syncScore(state.score + 30);
        }
        break; // resolve one hit per frame
      }
    }

    // Powerup movement and catch
    for (let i = state.powerUps.length - 1; i >= 0; i--) {
      const p = state.powerUps[i];
      p.y += p.vy;
      if (p.y > CANVAS_H + 20) {
        state.powerUps.splice(i, 1);
        continue;
      }
      if (
        p.y + 8 >= paddle.y &&
        p.y - 8 <= paddle.y + paddle.h &&
        p.x >= paddle.x &&
        p.x <= paddle.x + paddle.w
      ) {
        activatePower(p.type);
        state.powerUps.splice(i, 1);
      }
    }

    // Ball falls out of bounds
    if (ball.y - ball.r > CANVAS_H) {
      const remainingLives = state.lives - 1;
      syncLives(remainingLives);
      if (remainingLives <= 0) {
        state.gameOver = true;
        state.running = false;
        setIsGameOver(true);
        setIsPlaying(false);
      } else {
        resetBallAndPaddle();
      }
    }

    // Next Level build
    if (bricks.length > 0 && bricks.every((b) => !b.alive)) {
      const nextLvl = state.level + 1;
      syncLevel(nextLvl);
      syncScore(state.score + 300);
      ball.vx *= 1.05;
      ball.vy *= 1.05;
      buildBricks(nextLvl);
      resetBallAndPaddle();
    }

    // Expire active powers in loop helper
    const now = Date.now();
    const cleanPowers = state.activePowers.filter((p) => !p.until || p.until > now);
    if (cleanPowers.length !== state.activePowers.length) {
      syncActivePowers(cleanPowers);
    }
  };

  // Rendering logic
  const drawRoundedRect = (ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r = 6) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
    ctx.fill();
  };

  const draw = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

    // Subtle background grid
    ctx.strokeStyle = "rgba(255, 209, 102, 0.03)";
    ctx.lineWidth = 1;
    for (let x = 0; x < CANVAS_W; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, CANVAS_H);
      ctx.stroke();
    }
    for (let y = 0; y < CANVAS_H; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(CANVAS_W, y);
      ctx.stroke();
    }

    // Top status card background
    ctx.fillStyle = "rgba(255,255,255,0.015)";
    drawRoundedRect(ctx, 10, 10, CANVAS_W - 20, 36, 8);

    // Bricks
    const bricks = bricksRef.current;
    bricks.forEach((b) => {
      if (!b.alive) return;
      ctx.fillStyle = b.color;
      drawRoundedRect(ctx, b.x, b.y, b.w, b.h, 5);

      // Strengths inner indicators
      ctx.fillStyle = "rgba(0,0,0,0.12)";
      ctx.fillRect(b.x + 3, b.y + 3, (b.w - 6) * (b.strength / 3), b.h - 6);
    });

    // Paddle
    const paddle = paddleRef.current;
    ctx.fillStyle = "#ffb703"; // Highlighted ochre/gold paddle
    drawRoundedRect(ctx, paddle.x, paddle.y, paddle.w, paddle.h, 6);

    // Ball
    const ball = ballRef.current;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fillStyle = "#ffd166";
    ctx.fill();
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.closePath();

    // Powerups
    const state = gameStateRef.current;
    state.powerUps.forEach((p) => {
      ctx.fillStyle = p.type === "expand" ? "#90be6d" : "#f94144";
      drawRoundedRect(ctx, p.x - 12, p.y - 8, 24, 16, 5);

      ctx.fillStyle = "#1b0d09";
      ctx.font = "bold 11px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(p.type === "expand" ? "W" : "♥", p.x, p.y);
    });

    // Text Overlay
    if (!state.running && !state.gameOver && !state.paused) {
      ctx.fillStyle = "rgba(27, 13, 9, 0.8)";
      ctx.fillRect(CANVAS_W / 2 - 200, CANVAS_H / 2 - 50, 400, 100);
      ctx.strokeStyle = "rgba(255, 209, 102, 0.3)";
      ctx.lineWidth = 1;
      ctx.strokeRect(CANVAS_W / 2 - 200, CANVAS_H / 2 - 50, 400, 100);

      ctx.fillStyle = "#ffd166";
      ctx.font = "600 15px Inter, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("BRICK BREAKER ARCADE", CANVAS_W / 2, CANVAS_H / 2 - 12);

      ctx.fillStyle = "#e6eef6";
      ctx.font = "400 12px Inter, sans-serif";
      ctx.fillText("Press SPACE or click 'Start Game' to Launch", CANVAS_W / 2, CANVAS_H / 2 + 15);
    }
  };

  const gameLoop = () => {
    updatePhysics();
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        draw(ctx);
      }
    }
    animationFrameIdRef.current = requestAnimationFrame(gameLoop);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key] = true;
      if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        const state = gameStateRef.current;
        if (!state.running && !state.gameOver) {
          startGame();
        } else if (ballRef.current.stuck && !state.gameOver) {
          ballRef.current.stuck = false;
        }
      }
      if (e.key.toLowerCase() === "p") {
        togglePause();
      }
      if (e.key.toLowerCase() === "r") {
        restartGame();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Initial setup
    buildBricks(1);
    resetBallAndPaddle();
    animationFrameIdRef.current = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
      gameStateRef.current.activePowers.forEach((p) => {
        if (p.timerId) clearTimeout(p.timerId);
      });
    };
  }, []);

  // Mouse / Touch controller
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = CANVAS_W / rect.width;
    const mouseX = (e.clientX - rect.left) * scaleX;
    paddleRef.current.targetX = mouseX - paddleRef.current.w / 2;
  };

  // Actions
  const startGame = () => {
    const state = gameStateRef.current;
    if (state.gameOver) {
      restartGame();
      return;
    }
    state.running = true;
    state.paused = false;
    setIsPlaying(true);
    setIsPaused(false);
    setIsGameOver(false);
  };

  const togglePause = () => {
    const state = gameStateRef.current;
    if (!state.running || state.gameOver) return;
    state.paused = !state.paused;
    setIsPaused(state.paused);
  };

  const restartGame = () => {
    // Clear timeouts
    gameStateRef.current.activePowers.forEach((p) => {
      if (p.timerId) clearTimeout(p.timerId);
    });

    syncScore(0);
    syncLives(3);
    syncLevel(1);
    syncActivePowers([]);

    const state = gameStateRef.current;
    state.running = false;
    state.paused = false;
    state.gameOver = false;
    state.powerUps = [];

    setIsPlaying(false);
    setIsPaused(false);
    setIsGameOver(false);

    buildBricks(1);
    resetBallAndPaddle();
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start w-full text-amberwood-100 max-w-4xl mx-auto">
      {/* Game Stage Area */}
      <div className="flex-grow w-full bg-[#180b07] border border-amberwood-900/30 rounded-2xl p-3 shadow-2xl flex flex-col items-center">
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          width={CANVAS_W}
          height={CANVAS_H}
          className="w-full h-auto bg-gradient-to-b from-[#021021] to-[#042033] rounded-xl border border-amberwood-900/40 cursor-none"
          id="brickBreakerCanvas"
        />

        {/* Floating Quick Tips */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center mt-3 gap-2 px-2 text-[11px] text-amberwood-400 font-sans tracking-wide">
          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-0.5 bg-amberwood-950/80 rounded border border-amberwood-900/40 text-ochre font-mono font-bold">←</span>
            <span className="px-1.5 py-0.5 bg-amberwood-950/80 rounded border border-amberwood-900/40 text-ochre font-mono font-bold">→</span>
            <span>or Mouse moves Paddle</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 bg-amberwood-950/80 rounded border border-amberwood-900/40 text-ochre font-mono font-bold">SPACE</span>
            <span>Launches Ball •</span>
            <span className="px-1.5 py-0.5 bg-amberwood-950/80 rounded border border-amberwood-900/40 text-ochre font-mono font-bold">P</span>
            <span>Pauses</span>
          </div>
        </div>
      </div>

      {/* Control / Stats Dashboard Sidebar */}
      <div className="w-full lg:w-72 bg-[#1b0d09]/40 border border-amberwood-900/30 rounded-2xl p-5 flex flex-col gap-4 font-sans text-left">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Gamepad2 className="w-5 h-5 text-ochre" />
            <h3 className="font-serif text-lg text-amberwood-200">Arcade Deck</h3>
          </div>
          <p className="text-xs text-amberwood-400">Catch falling power-ups to expand paddle width or gain extra lives!</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 lg:grid-cols-1 gap-2">
          <div className="flex items-center justify-between bg-amberwood-950/40 border border-amberwood-900/20 rounded-xl p-3">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-ochre" />
              <span className="text-xs text-amberwood-300 font-semibold uppercase">Score</span>
            </div>
            <span className="font-mono text-base font-bold text-ochre">{score}</span>
          </div>

          <div className="flex items-center justify-between bg-amberwood-950/40 border border-amberwood-900/20 rounded-xl p-3">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#f94144]" />
              <span className="text-xs text-amberwood-300 font-semibold uppercase">Lives</span>
            </div>
            <span className="font-mono text-base font-bold text-[#f94144]">{lives}</span>
          </div>

          <div className="flex items-center justify-between bg-amberwood-950/40 border border-amberwood-900/20 rounded-xl p-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#90be6d]" />
              <span className="text-xs text-amberwood-300 font-semibold uppercase">Level</span>
            </div>
            <span className="font-mono text-base font-bold text-[#90be6d]">{level}</span>
          </div>
        </div>

        {/* Active Powerups */}
        <div className="bg-amberwood-950/40 border border-amberwood-900/20 rounded-xl p-3">
          <span className="text-[10px] uppercase tracking-wider text-amberwood-400 block mb-2 font-bold">Active Modifiers</span>
          <div className="flex flex-wrap gap-2">
            {activePowers.length === 0 ? (
              <span className="text-xs text-amberwood-500 italic">None active</span>
            ) : (
              activePowers.map((p, idx) => (
                <span
                  key={idx}
                  className={`px-2 py-0.5 text-[10px] font-mono font-bold rounded-full uppercase flex items-center gap-1 border ${
                    p.key === "WIDE"
                      ? "bg-[#90be6d]/10 text-[#90be6d] border-[#90be6d]/20 animate-pulse"
                      : "bg-[#f94144]/10 text-[#f94144] border-[#f94144]/20"
                  }`}
                >
                  <Zap className="w-2.5 h-2.5" />
                  {p.key}
                </span>
              ))
            )}
          </div>
        </div>

        {/* Actions Button Deck */}
        <div className="flex flex-wrap gap-2">
          {!isPlaying && !isPaused && !isGameOver ? (
            <button
              onClick={startGame}
              className="flex-grow flex items-center justify-center gap-2 py-2.5 bg-ochre hover:bg-ochre/80 text-stone-950 text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-95"
            >
              <Play className="w-3.5 h-3.5" />
              Start Game
            </button>
          ) : (
            <>
              <button
                onClick={togglePause}
                disabled={isGameOver}
                className="flex-grow flex items-center justify-center gap-1.5 py-2 px-3 bg-amberwood-800 hover:bg-amberwood-700 text-parchment text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-sm active:scale-95 disabled:opacity-40"
              >
                <Pause className="w-3.5 h-3.5" />
                {isPaused ? "Resume" : "Pause"}
              </button>

              <button
                onClick={restartGame}
                className="flex items-center justify-center gap-1.5 py-2 px-3 bg-amberwood-950 hover:bg-amberwood-900 border border-amberwood-800/40 text-ochre text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-sm active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset
              </button>
            </>
          )}
        </div>

        {/* Game State Overlay Warning */}
        {isGameOver && (
          <div className="bg-[#f94144]/10 border border-[#f94144]/20 rounded-xl p-3 text-center">
            <span className="text-xs font-bold text-[#f94144] block mb-1">GAME OVER</span>
            <button
              onClick={restartGame}
              className="text-[10px] text-amberwood-200 underline hover:text-ochre transition-all"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Instructions list */}
        <div className="text-[11px] text-amberwood-400 space-y-1.5 border-t border-amberwood-900/20 pt-3">
          <span className="font-bold uppercase tracking-wider text-[10px] text-amberwood-300 block">Game Rules</span>
          <ul className="list-disc pl-4 space-y-1">
            <li>Reflect the ball with your paddle to destroy all blocks.</li>
            <li>Destroying a block awards score and may spawn power-ups!</li>
            <li>W is Paddle Expander, ♥ awards an extra Life.</li>
            <li>Losing all lives triggers game over.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
