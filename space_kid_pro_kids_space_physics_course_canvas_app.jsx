import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Lock, Rocket, RefreshCw, ChevronRight, ChevronLeft, BookOpenText, PlayCircle, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

/**
 * SpaceKidPro — Kids Space & Physics Course
 * -------------------------------------------------------------
 * - Single-file React app for Canvas preview
 * - Progress is persisted in localStorage (key: spacekidpro_progress_v1)
 * - Kids must complete all modules in a stage to unlock the next stage
 * - Each module has: short learn content + 1-question quiz to mark complete
 * - Includes Continue button to jump to the next incomplete module
 * - Minimal, friendly UI with animations and keyboard support
 */

// --------------- Course Data -----------------

const COURSE = [
  {
    id: "s1",
    stage: "Stage 1 – Discovering the World Around Us",
    goal: "Develop awareness of basic physical phenomena through everyday experiences.",
    progression:
      "Teaches kids to observe patterns (day/night, weather), which later helps them understand planetary motion and climate in space.",
    modules: [
      {
        id: "1.1",
        title: "What Is Science?",
        blurb: "Asking questions, making observations, simple experiments.",
        learn: [
          "Science starts with curiosity. We ask a question, make a good guess (hypothesis), test it, and share what we learned!",
          "Try: Drop a small ball and a big ball at the same time. What happens? Write or draw your observation.",
        ],
        quiz: {
          q: "What is the FIRST step scientists take when doing science?",
          options: ["Make a guess", "Ask a question", "Tell a friend"],
          answerIndex: 1,
        },
      },
      {
        id: "1.2",
        title: "Forces Around Us",
        blurb: "Pushes, pulls, gravity on Earth (why things fall).",
        learn: [
          "A force is a push or a pull. Gravity is the force that pulls things toward Earth.",
          "Try: Slide a book across a table. What makes it slow down? (Friction!)",
        ],
        quiz: {
          q: "Which is a force?",
          options: ["Blue", "Push", "Quiet"],
          answerIndex: 1,
        },
      },
      {
        id: "1.3",
        title: "Light & Shadows",
        blurb: "How light travels, day/night cycle on Earth.",
        learn: [
          "Light travels in straight lines and creates shadows when something blocks it.",
          "Try: Use a torch and a toy to make different shadow sizes by changing distance.",
        ],
        quiz: {
          q: "Shadows happen when...",
          options: ["light is blocked", "there is no gravity", "things are cold"],
          answerIndex: 0,
        },
      },
      {
        id: "1.4",
        title: "The Air We Live In",
        blurb: "Air as ‘invisible matter’, wind, clouds.",
        learn: [
          "Air is matter—it takes up space! Wind is moving air, and clouds are made of tiny water droplets.",
          "Try: Blow up a balloon in a bottle (with a hole) vs. without. What changes?",
        ],
        quiz: {
          q: "Air is...",
          options: ["nothing at all", "matter that takes up space", "music"],
          answerIndex: 1,
        },
      },
      {
        id: "1.5",
        title: "Temperature & Seasons",
        blurb: "Warm vs. cold, how the Sun changes our weather.",
        learn: [
          "The Sun warms Earth. Temperature tells us how hot or cold it is. Patterns in warmth connect to our seasons.",
          "Try: Put cups of water in the sun and shade. Which warms faster?",
        ],
        quiz: {
          q: "What warms Earth the most?",
          options: ["The Sun", "The Moon", "The clouds"],
          answerIndex: 0,
        },
      },
    ],
  },
  {
    id: "s2",
    stage: "Stage 2 – Our Planet in Space",
    goal: "Connect everyday phenomena to the Earth’s position and movement in space.",
    progression:
      "Kids already know about day/night and seasons from Stage 1; now they link them to planetary motion and begin thinking beyond Earth.",
    modules: [
      {
        id: "2.1",
        title: "Earth as a Planet",
        blurb: "Round shape, land/sea/air, maps & globes.",
        learn: [
          "Earth is a round planet covered with land, oceans, and a blanket of air (atmosphere).",
          "Try: Spin a globe and find where you live!",
        ],
        quiz: {
          q: "Which THREE parts are most of Earth made of?",
          options: ["Land, sea, air", "Chocolate, cheese, chips", "Fire, smoke, dust"],
          answerIndex: 0,
        },
      },
      {
        id: "2.2",
        title: "The Spinning Earth",
        blurb: "Rotation → day/night, time zones (simplified).",
        learn: [
          "Earth spins once each day. The side facing the Sun has day; the other side has night.",
          "Try: Use a lamp (Sun) and a ball (Earth) to see day/night change as you spin the ball.",
        ],
        quiz: {
          q: "Day and night happen because Earth...",
          options: ["spins", "stops", "shrinks"],
          answerIndex: 0,
        },
      },
      {
        id: "2.3",
        title: "The Orbiting Earth",
        blurb: "Revolution around the Sun → seasons.",
        learn: [
          "Earth orbits the Sun once each year. The tilt of Earth makes seasons.",
          "Try: Tilt a ball and walk it around a lamp to see changing light.",
        ],
        quiz: {
          q: "Seasons are mostly caused by Earth’s...",
          options: ["tilt", "color", "speed"],
          answerIndex: 0,
        },
      },
      {
        id: "2.4",
        title: "The Moon & Tides",
        blurb: "Moon phases, gravity link to ocean tides.",
        learn: [
          "The Moon orbits Earth. Its phases are the different shapes we see. The Moon’s gravity helps cause ocean tides.",
          "Try: Track the Moon each night for a week and sketch its shape.",
        ],
        quiz: {
          q: "What changes to make Moon phases?",
          options: ["How we see sunlight on the Moon", "The Moon melting", "The Moon turning off"],
          answerIndex: 0,
        },
      },
      {
        id: "2.5",
        title: "Our Cosmic Address",
        blurb: "Solar system as our ‘neighbourhood’.",
        learn: [
          "We live on Earth, in the Solar System, with the Sun, planets, moons, asteroids, and comets.",
          "Try: List your cosmic address: Planet → Solar System → Milky Way Galaxy → Universe!",
        ],
        quiz: {
          q: "Which is our star?",
          options: ["The Sun", "The Moon", "Polaris"],
          answerIndex: 0,
        },
      },
    ],
  },
  {
    id: "s3",
    stage: "Stage 3 – Solar System Explorers",
    goal: "Learn the key features of other planets, moons, and the Sun.",
    progression:
      "Builds on Stage 2’s ‘cosmic neighbourhood’ to introduce diversity of celestial bodies.",
    modules: [
      {
        id: "3.1",
        title: "Meet the Planets",
        blurb: "Names, order from the Sun, basic characteristics.",
        learn: [
          "Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune — in that order from the Sun!",
          "Try: Make a memory chant for the order of planets.",
        ],
        quiz: {
          q: "Which planet is 3rd from the Sun?",
          options: ["Venus", "Earth", "Mars"],
          answerIndex: 1,
        },
      },
      {
        id: "3.2",
        title: "The Mighty Sun",
        blurb: "Star energy, heat/light, solar flares (basic).",
        learn: [
          "The Sun is a star that gives us heat and light. Sometimes it bursts with solar flares!",
          "Try: Feel sunlight through a window versus shade and compare warmth.",
        ],
        quiz: {
          q: "The Sun is a...",
          options: ["planet", "star", "comet"],
          answerIndex: 1,
        },
      },
      {
        id: "3.3",
        title: "Gas Giants & Rocky Planets",
        blurb: "Differences in size, composition.",
        learn: [
          "Rocky: Mercury, Venus, Earth, Mars. Gas giants: Jupiter, Saturn. Ice giants: Uranus, Neptune.",
          "Try: Sort fruits (small rocks vs. big sponges) to model rocky vs. giant planets!",
        ],
        quiz: {
          q: "Which is a gas giant?",
          options: ["Jupiter", "Mars", "Mercury"],
          answerIndex: 0,
        },
      },
      {
        id: "3.4",
        title: "Moons & Rings",
        blurb: "Not just Earth’s Moon — variety in the solar system.",
        learn: [
          "Many planets have moons. Some, like Saturn, have rings made of ice and rocks!",
          "Try: Spin a coin on a plate to imagine a thin ring.",
        ],
        quiz: {
          q: "Which planet is famous for its rings?",
          options: ["Mars", "Saturn", "Mercury"],
          answerIndex: 1,
        },
      },
      {
        id: "3.5",
        title: "Asteroids & Comets",
        blurb: "Where they live, their journeys.",
        learn: [
          "Asteroids are rocky; comets are icy with glowing tails when near the Sun.",
          "Try: Sprinkle sugar (ice) on a rock to imagine a comet’s tail in sunlight!",
        ],
        quiz: {
          q: "Comet tails point...",
          options: ["toward the Sun", "away from the Sun", "down"],
          answerIndex: 1,
        },
      },
    ],
  },
  {
    id: "s4",
    stage: "Stage 4 – Physics in Action",
    goal: "Introduce the physical laws that govern both Earth and space in simple terms.",
    progression:
      "Kids now see that the same rules they’ve tested on Earth apply everywhere.",
    modules: [
      {
        id: "4.1",
        title: "Gravity Everywhere",
        blurb: "How it works on Earth and in space.",
        learn: [
          "Gravity pulls objects toward each other. On Earth, it makes things fall and keeps us on the ground.",
          "Try: Jump! What brings you back down?",
        ],
        quiz: {
          q: "Gravity pulls things...",
          options: ["apart", "together", "sideways"],
          answerIndex: 1,
        },
      },
      {
        id: "4.2",
        title: "Motion & Orbits",
        blurb: "Why planets don’t fall into the Sun.",
        learn: [
          "Planets are always falling toward the Sun but moving sideways fast enough to keep missing—this makes an orbit!",
          "Try: Tie a ball to a string and swing it—feel the pull toward the center.",
        ],
        quiz: {
          q: "An orbit is...",
          options: ["standing still", "a path around something", "falling straight down"],
          answerIndex: 1,
        },
      },
      {
        id: "4.3",
        title: "Energy & Heat",
        blurb: "Sun’s energy, how it moves through space.",
        learn: [
          "Energy from the Sun travels as light to warm Earth—no air needed!",
          "Try: Compare dark vs. light paper in the sun—Which warms faster?",
        ],
        quiz: {
          q: "The Sun’s energy reaches Earth mostly as...",
          options: ["light", "sound", "rain"],
          answerIndex: 0,
        },
      },
      {
        id: "4.4",
        title: "Light & Telescopes",
        blurb: "How we see far-away objects.",
        learn: [
          "Telescopes collect more light so we can see faint, far-away things like galaxies!",
          "Try: Look through a paper tube—blocking extra light can help you see details.",
        ],
        quiz: {
          q: "Telescopes help by collecting more...",
          options: ["light", "wind", "sand"],
          answerIndex: 0,
        },
      },
      {
        id: "4.5",
        title: "Sound in Space?",
        blurb: "Why space is silent, difference between light and sound waves.",
        learn: [
          "Sound needs air (or another material) to travel. Space is nearly empty, so sound can’t travel there—light can!",
          "Try: Place a phone in a bag vs. open air—notice how sound changes.",
        ],
        quiz: {
          q: "Why is space silent?",
          options: ["Too bright", "No air to carry sound", "Too cold"],
          answerIndex: 1,
        },
      },
    ],
  },
  {
    id: "s5",
    stage: "Stage 5 – Space Travel & Exploration",
    goal: "Show how humans explore space, linking technology to the science learned so far.",
    progression:
      "Kids now apply their knowledge of physics, orbits, and planetary science to understand exploration.",
    modules: [
      {
        id: "5.1",
        title: "History of Space Travel",
        blurb: "First rockets, Moon landing.",
        learn: [
          "From early rockets to the Apollo Moon landing—humans reached space step by step!",
          "Try: Build a paper rocket and see how far it flies.",
        ],
        quiz: {
          q: "Humans first walked on the Moon in...",
          options: ["1969", "1999", "1869"],
          answerIndex: 0,
        },
      },
      {
        id: "5.2",
        title: "Spacecraft & Satellites",
        blurb: "How they work and what they do.",
        learn: [
          "Satellites orbit Earth to help with weather, GPS, and communications.",
          "Try: Track a satellite pass using a sky app with an adult.",
        ],
        quiz: {
          q: "Satellites move by...",
          options: ["orbiting Earth", "floating still", "flapping wings"],
          answerIndex: 0,
        },
      },
      {
        id: "5.3",
        title: "Astronaut Life",
        blurb: "How they eat, sleep, and work in space.",
        learn: [
          "Astronauts float in microgravity, strap into beds, and eat special meals!",
          "Try: Tape a spoon to a table—pretend you’re keeping things from floating away.",
        ],
        quiz: {
          q: "Why do astronauts float?",
          options: ["No gravity at all", "Microgravity in orbit", "They wear floaty shoes"],
          answerIndex: 1,
        },
      },
      {
        id: "5.4",
        title: "Robots in Space",
        blurb: "Rovers, probes, telescopes.",
        learn: [
          "Robots like rovers explore where humans can’t go—like Mars!",
          "Try: Drive a toy car over rocks and imagine a Mars rover mission.",
        ],
        quiz: {
          q: "A rover is a...",
          options: ["space rock", "robot explorer", "spacesuit"],
          answerIndex: 1,
        },
      },
      {
        id: "5.5",
        title: "Future Journeys",
        blurb: "Mars, space stations, beyond.",
        learn: [
          "We may live on the Moon or Mars someday with habitats, greenhouses, and reusable rockets!",
          "Try: Draw your own Mars habitat with power, food, and water.",
        ],
        quiz: {
          q: "Which place might humans visit next?",
          options: ["Mars", "The core of the Sun", "Inside a black hole"],
          answerIndex: 0,
        },
      },
    ],
  },
  {
    id: "s6",
    stage: "Stage 6 – The Bigger Universe",
    goal: "Introduce concepts of stars, galaxies, and the scale of the universe.",
    progression:
      "Expands from the familiar (Sun, planets) to the unimaginable (billions of stars).",
    modules: [
      {
        id: "6.1",
        title: "Stars Are Suns",
        blurb: "Life cycle of stars (simplified).",
        learn: [
          "Stars are giant balls of hot gas. They are born, shine, and eventually change or explode!",
          "Try: Compare a small torch (dwarf) to a bright lamp (giant) for brightness.",
        ],
        quiz: {
          q: "Our Sun is a...",
          options: ["planet", "star", "comet"],
          answerIndex: 1,
        },
      },
      {
        id: "6.2",
        title: "Constellations & Navigation",
        blurb: "Stories in the stars.",
        learn: [
          "Constellations are star patterns with stories used for navigation and culture.",
          "Try: Connect-the-dots on black paper to make your own constellation.",
        ],
        quiz: {
          q: "Constellations are...",
          options: ["planets", "star patterns", "clouds"],
          answerIndex: 1,
        },
      },
      {
        id: "6.3",
        title: "Galaxies & the Milky Way",
        blurb: "What’s beyond our solar system.",
        learn: [
          "Galaxies are huge groups of stars. We live in the Milky Way galaxy.",
          "Try: Swirl glitter in water to imagine a spiral galaxy.",
        ],
        quiz: {
          q: "The Milky Way is...",
          options: ["our galaxy", "a planet", "a comet"],
          answerIndex: 0,
        },
      },
      {
        id: "6.4",
        title: "The Universe is Expanding",
        blurb: "Simple idea of the Big Bang.",
        learn: [
          "Space itself is stretching! Long ago, everything was closer together — that idea is called the Big Bang.",
          "Try: Draw dots on a balloon and gently blow it up to see distances grow.",
        ],
        quiz: {
          q: "When the universe expands, distant galaxies look like they are...",
          options: ["getting closer", "staying still", "moving apart"],
          answerIndex: 2,
        },
      },
      {
        id: "6.5",
        title: "Our Place in the Cosmos",
        blurb: "How small Earth is in the grand scale.",
        learn: [
          "Earth is tiny compared to the universe—but it’s our special home!",
          "Try: Hold a peppercorn (Earth) next to a big beach ball (Sun) for scale.",
        ],
        quiz: {
          q: "Compared to the universe, Earth is...",
          options: ["very small", "the biggest thing", "exactly average"],
          answerIndex: 0,
        },
      },
    ],
  },
  {
    id: "s7",
    stage: "Stage 7 – Bringing It All Together (Capstone)",
    goal: "Let kids demonstrate and connect all their learning.",
    progression:
      "Reinforces retention through creativity, integrating physics, astronomy, and exploration.",
    modules: [
      {
        id: "7.1",
        title: "Design Your Own Planet",
        blurb: "Use rules of physics & space to make it realistic.",
        learn: [
          "Pick size, distance from the star, atmosphere, and water. Explain how each choice affects life and weather!",
        ],
        quiz: {
          q: "A larger planet usually has...",
          options: ["stronger gravity", "weaker gravity", "no gravity"],
          answerIndex: 0,
        },
      },
      {
        id: "7.2",
        title: "Mission to Space",
        blurb: "Plan a space trip using knowledge of orbits, fuel, and human needs.",
        learn: [
          "Choose a destination, pick a rocket, plan food/water/air, and plot your orbit transfer!",
        ],
        quiz: {
          q: "Spacecraft stay in orbit because they...",
          options: ["keep missing the Earth as they fall", "are not affected by gravity", "are held by magnets"],
          answerIndex: 0,
        },
      },
      {
        id: "7.3",
        title: "Build a Mini Solar System",
        blurb: "Physical or digital model showing distances & motion.",
        learn: [
          "Show relative sizes and orbits. Remember: space is mostly empty!",
        ],
        quiz: {
          q: "In our solar system, most of the space is...",
          options: ["full of air", "empty", "solid rock"],
          answerIndex: 1,
        },
      },
      {
        id: "7.4",
        title: "Star Storytelling",
        blurb: "Create a constellation & myth around it.",
        learn: [
          "Invent a star pattern and write or record a short myth about it.",
        ],
        quiz: {
          q: "A constellation is best described as a...",
          options: ["rocket", "star pattern with a story", "mountain"],
          answerIndex: 1,
        },
      },
      {
        id: "7.5",
        title: "Space Fair",
        blurb: "Present projects to family/class.",
        learn: [
          "Share your favorite module and project. Teach others what you learned!",
        ],
        quiz: {
          q: "Teaching others helps you...",
          options: ["forget faster", "learn better", "fall asleep"],
          answerIndex: 1,
        },
      },
    ],
  },
] as const;

type Course = typeof COURSE;

// --------------- Persistence -----------------

const STORAGE_KEY = "spacekidpro_progress_v1";

type ProgressMap = {
  [stageId: string]: {
    [moduleId: string]: boolean; // completed or not
  };
};

function loadProgress(): ProgressMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function saveProgress(p: ProgressMap) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
}

function clearProgress() {
  localStorage.removeItem(STORAGE_KEY);
}

// --------------- UI Helpers -----------------

const fade = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.25 },
};

function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

// --------------- Components -----------------

function StageChip({ index }: { index: number }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-2xl px-3 py-1 bg-slate-100 text-slate-700 text-xs">
      <Rocket className="h-4 w-4" />
      <span>Stage {index + 1}</span>
    </div>
  );
}

function Header({ totalPct, onReset, onContinue }: { totalPct: number; onReset: () => void; onContinue: () => void }) {
  return (
    <div className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/80 border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
        <BookOpenText className="h-6 w-6" />
        <div className="font-semibold">SpaceKidPro · Space & Physics Course</div>
        <div className="ml-auto flex items-center gap-3 w-full max-w-sm">
          <Progress value={totalPct} className="h-2" />
          <div className="text-xs w-10 text-right">{Math.round(totalPct)}%</div>
          <Button variant="secondary" className="gap-2" onClick={onContinue}>
            Continue
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="ghost" className="gap-2" onClick={onReset}>
            <RefreshCw className="h-4 w-4" /> Reset
          </Button>
        </div>
      </div>
    </div>
  );
}

function StageCard({
  stage,
  index,
  locked,
  completedCount,
  total,
  onOpen,
}: {
  stage: Course[number];
  index: number;
  locked: boolean;
  completedCount: number;
  total: number;
  onOpen: () => void;
}) {
  const pct = Math.round((completedCount / total) * 100);
  return (
    <Card className={cn("transition hover:shadow-md", locked && "opacity-60")}> 
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <StageChip index={index} />
          {locked ? (
            <span className="inline-flex items-center gap-1 text-xs text-slate-500"><Lock className="h-4 w-4"/> Locked</span>
          ) : completedCount === total ? (
            <span className="inline-flex items-center gap-1 text-xs text-green-600"><CheckCircle2 className="h-4 w-4"/> Completed</span>
          ) : null}
        </div>
        <CardTitle className="text-lg mt-2">{stage.stage}</CardTitle>
        <div className="text-sm text-slate-600">Goal: {stage.goal}</div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-xs text-slate-500 mb-3">Progression link: {stage.progression}</div>
        <div className="flex items-center gap-3">
          <div className="w-full max-w-xs">
            <Progress value={pct} className="h-2" />
          </div>
          <div className="text-xs tabular-nums">{completedCount}/{total}</div>
          <Button onClick={onOpen} disabled={locked} className="ml-auto">
            {locked ? "Complete previous stage" : "Open"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function Quiz({
  q,
  options,
  answerIndex,
  onPass,
}: {
  q: string;
  options: string[];
  answerIndex: number;
  onPass: () => void;
}) {
  const [choice, setChoice] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  function submit() {
    if (choice === answerIndex) {
      setFeedback("Nice! That’s correct.");
      setTimeout(onPass, 500);
    } else {
      setFeedback("Not quite — try again!");
    }
  }
  return (
    <div className="mt-4 space-y-3">
      <div className="font-medium">Quick Check</div>
      <div className="text-sm">{q}</div>
      <div className="grid gap-2">
        {options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => setChoice(idx)}
            className={cn(
              "rounded-2xl px-3 py-2 border text-left",
              choice === idx ? "border-sky-500 bg-sky-50" : "border-slate-200 hover:bg-slate-50"
            )}
          >
            {opt}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <Button onClick={submit} className="gap-2">
          <PlayCircle className="h-4 w-4"/> Submit
        </Button>
        <span className="text-sm text-slate-600">{feedback}</span>
      </div>
    </div>
  );
}

function ModulePanel({
  stage,
  moduleIndex,
  onBack,
  onComplete,
  completed,
}: {
  stage: Course[number];
  moduleIndex: number;
  onBack: () => void;
  onComplete: () => void;
  completed: boolean;
}) {
  const m = stage.modules[moduleIndex];
  return (
    <AnimatePresence mode="wait">
      <motion.div key={m.id} {...fade}>
        <Card className="shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2 text-slate-600 text-xs mb-1">
              <button className="inline-flex items-center gap-1 hover:underline" onClick={onBack}>
                <ChevronLeft className="h-4 w-4"/> Back to stage
              </button>
              <span>•</span>
              <StageChip index={Number(stage.id.replace("s", "")) - 1} />
            </div>
            <CardTitle className="text-xl">{m.title} <span className="text-slate-400 text-sm">({m.id})</span></CardTitle>
            <div className="text-sm text-slate-600">{m.blurb}</div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {m.learn.map((line, i) => (
                <div key={i} className="rounded-2xl bg-slate-50 p-3 text-sm">{line}</div>
              ))}
            </div>
            <Quiz q={m.quiz.q} options={m.quiz.options} answerIndex={m.quiz.answerIndex} onPass={onComplete} />
            {completed && (
              <div className="mt-4 inline-flex items-center gap-2 text-green-700">
                <CheckCircle2 className="h-5 w-5"/>
                <span>Module completed!</span>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}

// Find next incomplete module (stageIdx, moduleIdx)
function findNextIncomplete(progress: ProgressMap) {
  for (let s = 0; s < COURSE.length; s++) {
    const stage = COURSE[s];
    const st = progress[stage.id] || {};
    for (let m = 0; m < stage.modules.length; m++) {
      const mod = stage.modules[m];
      if (!st[mod.id]) return { s, m };
    }
  }
  return { s: COURSE.length - 1, m: COURSE[COURSE.length - 1].modules.length - 1 };
}

export default function App() {
  const [progress, setProgress] = useState<ProgressMap>({});
  const [openStageIdx, setOpenStageIdx] = useState<number | null>(null);
  const [openModuleIdx, setOpenModuleIdx] = useState<number | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const totalModules = useMemo(() => COURSE.reduce((acc, s) => acc + s.modules.length, 0), []);
  const totalCompleted = useMemo(
    () => COURSE.reduce((acc, s) => acc + Object.values(progress[s.id] || {}).filter(Boolean).length, 0),
    [progress]
  );
  const totalPct = (totalCompleted / totalModules) * 100;

  function reset() {
    clearProgress();
    setProgress({});
    setOpenStageIdx(null);
    setOpenModuleIdx(null);
  }

  function openStage(i: number) {
    setOpenStageIdx(i);
    setOpenModuleIdx(null);
  }

  function openModule(i: number) {
    setOpenModuleIdx(i);
  }

  function markComplete(stageId: string, moduleId: string) {
    setProgress((p) => {
      const next = { ...p };
      next[stageId] = { ...(next[stageId] || {}), [moduleId]: true };
      return next;
    });
  }

  function stageLocked(index: number) {
    if (index === 0) return false; // Stage 1 unlocked
    const prev = COURSE[index - 1];
    const st = progress[prev.id] || {};
    return prev.modules.some((m) => !st[m.id]);
  }

  function continueToNext() {
    const { s, m } = findNextIncomplete(progress);
    setOpenStageIdx(s);
    setOpenModuleIdx(m);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white text-slate-900">
      <Header totalPct={totalPct} onReset={reset} onContinue={continueToNext} />

      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Overview or Stage Detail */}
        {openStageIdx === null ? (
          <AnimatePresence>
            <motion.div {...fade} className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {COURSE.map((s, i) => {
                const st = progress[s.id] || {};
                const completedCount = s.modules.filter((m) => st[m.id]).length;
                const locked = stageLocked(i);
                return (
                  <StageCard
                    key={s.id}
                    stage={s}
                    index={i}
                    locked={locked}
                    completedCount={completedCount}
                    total={s.modules.length}
                    onOpen={() => openStage(i)}
                  />
                );
              })}
            </motion.div>
          </AnimatePresence>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div key={openStageIdx} {...fade}>
              <div className="mb-4 flex items-center gap-3">
                <Button variant="ghost" onClick={() => setOpenStageIdx(null)} className="gap-2">
                  <ChevronLeft className="h-4 w-4"/> All stages
                </Button>
                <StageChip index={openStageIdx} />
                <div className="text-lg font-semibold">{COURSE[openStageIdx].stage}</div>
              </div>

              {/* Stage modules grid or module view */}
              {openModuleIdx === null ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {COURSE[openStageIdx].modules.map((m, mi) => {
                    const st = progress[COURSE[openStageIdx].id] || {};
                    const done = !!st[m.id];
                    return (
                      <Card key={m.id} className="hover:shadow-md transition">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">{m.title} <span className="text-slate-400 text-xs">({m.id})</span></CardTitle>
                          <div className="text-sm text-slate-600">{m.blurb}</div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="flex items-center gap-2 mb-3">
                            {done ? (
                              <span className="inline-flex items-center gap-1 text-green-600 text-xs"><CheckCircle2 className="h-4 w-4"/> Completed</span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-slate-500 text-xs"><PlayCircle className="h-4 w-4"/> Not started</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <Button onClick={() => openModule(mi)} className="gap-2">
                              Start
                              <ChevronRight className="h-4 w-4"/>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <ModulePanel
                  stage={COURSE[openStageIdx]}
                  moduleIndex={openModuleIdx}
                  onBack={() => setOpenModuleIdx(null)}
                  completed={!!(progress[COURSE[openStageIdx].id] || {})[COURSE[openStageIdx].modules[openModuleIdx].id]}
                  onComplete={() =>
                    markComplete(
                      COURSE[openStageIdx].id,
                      COURSE[openStageIdx].modules[openModuleIdx].id
                    )
                  }
                />
              )}

              {/* Stage footer: completion badge */}
              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-slate-600">
                  Goal: {COURSE[openStageIdx].goal}
                </div>
                <div className="inline-flex items-center gap-2 text-sky-700">
                  <Award className="h-5 w-5"/>
                  <span>Complete every module to unlock the next stage</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-10 border-t">
        <div className="max-w-6xl mx-auto px-4 py-8 text-xs text-slate-500">
          SpaceKidPro · Learning through wonder ✨ — Progress is saved in your browser.
        </div>
      </footer>
    </div>
  );
}
