import { Project, Skill, Achievement, Goal, Hobby } from "./types";

export const projects: Project[] = [
  {
    id: "decimal-to-binary-converter",
    num: 1,
    title: "Decimal to Binary Converter",
    icon: "💻",
    category: "C# Programming",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800",
    desc: "A Windows Forms desktop application built in C# that converts any decimal number into its binary equivalent and counts the number of 1s in the resulting binary value — all in real time.",
    details: [
      "Designed and built a Windows Forms GUI using Visual Studio, including a math-themed background with a custom image layout",
      "Implemented the decimal-to-binary conversion algorithm from scratch using a while loop, remainder operations, and place-value multiplication",
      "Added logic to count the number of 1 bits in the binary output, which demonstrates understanding of bitwise data representation",
      "Displayed three outputs simultaneously: the entered decimal number, its binary equivalent, and the count of 1s",
      "Tested with multiple decimal inputs (e.g. 67 → 1000011, with 3 ones) to verify accuracy"
    ],
    tools: ["C#", "Visual Studio", ".NET Framework", "Windows Forms"],
    outcome: "A fully functional desktop app that accurately converts decimal numbers to binary and counts the 1-bits. Demonstrates core programming logic, event-driven GUI design, and algorithmic thinking using C# and .NET.",
    codeSnippet: `// Decimal to Binary algorithm snippet
int decimalNum = int.Parse(txtInput.Text);
string binary = "";
int countOfOnes = 0;

if (decimalNum == 0) {
    binary = "0";
} else {
    while (decimalNum > 0) {
        int remainder = decimalNum % 2;
        if (remainder == 1) countOfOnes++;
        binary = remainder + binary;
        decimalNum /= 2;
    }
}
lblBinaryResult.Text = binary;
lblOnesCountResult.Text = countOfOnes.ToString();`
  },
  {
    id: "html-calculator",
    num: 2,
    title: "HTML/CSS/JS Calculator",
    icon: "🖩",
    category: "Web Development",
    // Use the newly generated aesthetic image!
    image: "/src/assets/images/aesthetic_calculator_preview_1783126669381.jpg",
    desc: "A fully functional browser-based calculator built from scratch using only HTML, CSS, and JavaScript. It features an interactive layout with custom keyboard support and responsive grid sizing.",
    details: [
      "Structured the calculator layout using a CSS Grid with an elegant 4-column layout for modern proportions",
      "Styled with an immersive dark earth palette matching the Maison visual look, featuring tactile, elegant button feedback",
      "Implemented all calculation logic in JavaScript with dynamic equation building and responsive error handling (like zero-division protection)",
      "Designed keyboard event listeners so that users can type numbers and operators directly on their physical keyboard",
      "Created an interactive live calculator module inside this portfolio so readers can try it out immediately!"
    ],
    tools: ["HTML5", "CSS3 Grid & Variables", "JavaScript (ES6+)", "Dynamic DOM"],
    outcome: "An incredibly responsive web calculator with custom themes and tactile animation response. Now embedded as a live interactive widget inside the project modal!",
    hasInteractiveCalculator: true,
    codeSnippet: `// Tactile button event binding and math execution
const buttons = document.querySelectorAll('.calc-btn');
const screen = document.querySelector('.screen');

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.getAttribute('data-val');
    if (value === 'C') {
      equation = '';
    } else if (value === '=') {
      try {
        equation = eval(equation).toString();
      } catch (err) {
        equation = 'Error';
      }
    } else {
      equation += value;
    }
    screen.value = equation;
  });
});`
  },
  {
    id: "grade-checker",
    num: 3,
    title: "Grade Checker",
    icon: "📝",
    category: "C# Programming",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800",
    desc: "A C# console application that takes a student's grade (0–100) as input and outputs a corresponding remark: Excellent, Passed, or Failed — using conditional if-else logic.",
    details: [
      "Prompted the user to enter a grade between 0 and 100 via the console",
      "Used if-else if-else conditional statements to evaluate the grade against three thresholds",
      "Outputted 'Excellent' for grades 90 and above, 'Passed' for 75–89, and 'Failed' for below 75",
      "Demonstrated fundamental C# concepts: Console I/O, integer conversion, and conditional branching"
    ],
    tools: ["C#", "Visual Studio", ".NET Framework"],
    outcome: "A clean, functional grade evaluation program that correctly categorizes student scores. Demonstrates mastery of C# console applications and decision-making logic.",
    codeSnippet: `Console.Write("Enter your grade (0-100): ");
int grade = Convert.ToInt32(Console.ReadLine());

if (grade >= 90)
    Console.WriteLine("Excellent");
else if (grade >= 75)
    Console.WriteLine("Passed");
else
    Console.WriteLine("Failed");`
  },
  {
    id: "largest-number-finder",
    num: 4,
    title: "Largest Number Finder",
    icon: "🔢",
    category: "C# Programming",
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800",
    desc: "A C# console program that reads three integers from the user and determines which one is the largest using comparative if-else logic.",
    details: [
      "Prompted the user to input three separate numbers via the console",
      "Stored each input as an integer using Convert.ToInt32()",
      "Compared all three numbers using nested if-else conditions to find the maximum value",
      "Printed the result clearly to the console output"
    ],
    tools: ["C#", "Visual Studio", ".NET Framework"],
    outcome: "A working console program that correctly identifies the largest of three numbers. Demonstrates variable handling, type conversion, and comparative logic in C#.",
    codeSnippet: `int num1 = Convert.ToInt32(Console.ReadLine());
int num2 = Convert.ToInt32(Console.ReadLine());
int num3 = Convert.ToInt32(Console.ReadLine());

int largest;
if (num1 >= num2 && num1 >= num3)
    largest = num1;
else if (num2 >= num1 && num2 >= num3)
    largest = num2;
else
    largest = num3;

Console.WriteLine("The largest number is " + largest);`
  },
  {
    id: "number-counter",
    num: 5,
    title: "Number Counter (1–10)",
    icon: "🔁",
    category: "C# Programming",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&w=800",
    desc: "A C# console application that uses a for loop to print numbers 1 through 10 sequentially, demonstrating iteration and loop control flow.",
    details: [
      "Implemented a for loop starting at 1 and running up to (but not including) 11",
      "Used a continue statement inside the loop to skip i == 0 (demonstrating loop control flow)",
      "Printed each number on a new line using Console.WriteLine()",
      "Showcases foundational programming concepts: for loops, iteration, and control statements"
    ],
    tools: ["C#", "Visual Studio", ".NET Framework"],
    outcome: "A simple but precise loop program that correctly outputs numbers 1 to 10. Demonstrates understanding of iteration, loop conditions, and flow control in C#.",
    codeSnippet: `for (int i = 1; i < 11; i++)
{
    if (i == 0)
        continue;
    Console.WriteLine(i);
}`
  },
  {
    id: "data-management-form",
    num: 6,
    title: "Data Management Form",
    icon: "🗄️",
    category: "C# + SQL",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800",
    desc: "A multi-form Windows desktop application built in C# with SQL Server integration. It includes a Sign Up form, Login form, and a Data Table view — demonstrating real-world database connectivity and user authentication logic.",
    details: [
      "Designed three interconnected Windows Forms: Sign Up, Login, and a Data Table display",
      "Connected the application to a local SQL Server database using SqlConnection and SqlCommand",
      "Implemented sign-up validation — checks for empty fields and duplicate usernames before inserting records",
      "Built a login form that verifies credentials against the database and navigates to the main form on success",
      "Displayed stored user data in a DataGridView table for easy management and viewing"
    ],
    tools: ["C#", "Visual Studio", "SQL Server", "Windows Forms", ".NET Framework"],
    outcome: "A fully functional multi-form desktop app with real database-backed sign up, login, and data display. Demonstrates C# event-driven programming, SQL integration, and form navigation.",
    codeSnippet: `// Connecting SQL Server DB and verifying user login
string connStr = "Data Source=.;Initial Catalog=UserDB;Integrated Security=True";
using (SqlConnection conn = new SqlConnection(connStr)) {
    string query = "SELECT COUNT(*) FROM Users WHERE Username=@user AND Password=@pass";
    SqlCommand cmd = new SqlCommand(query, conn);
    cmd.Parameters.AddWithValue("@user", txtUsername.Text);
    cmd.Parameters.AddWithValue("@pass", txtPassword.Text);
    
    conn.Open();
    int count = (int)cmd.ExecuteScalar();
    if (count > 0) {
        MainDashboard main = new MainDashboard();
        main.Show();
        this.Hide();
    } else {
        MessageBox.Show("Invalid credentials.");
    }
}`
  },
  {
    id: "circle-area-calculator",
    num: 7,
    title: "Circle Area Calculator",
    icon: "⭕",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800",
    desc: "A JavaScript web page that computes and displays the area of a circle given a fixed radius, demonstrating variable declarations, arithmetic operators, and multiple output methods in JavaScript.",
    details: [
      "Declared variables using let and const for radius, pi, area, message, and a boolean isCircle",
      "Used compound assignment operators (area *= radius twice) to compute π × r²",
      "Rounded the result using Math.round() for a clean whole-number output",
      "Displayed the result in three ways: DOM innerText, document.write(), and window.alert()",
      "Logged data types of each variable to the browser console for learning purposes",
      "Styled the page with a glassmorphism card, blurred backdrop, and a math-themed geometry background"
    ],
    tools: ["HTML", "CSS", "JavaScript"],
    outcome: "A working, styled webpage that calculates and displays the area of a circle (radius 7 → area 154). Demonstrates JavaScript variable types, arithmetic operators, and multiple DOM output techniques.",
    codeSnippet: `let radius = 7;
const pi = 3.14;
let area = pi;

// Compute π × r² using assignment operators
area *= radius;
area *= radius;

// Round to whole number
area = Math.round(area);

// Output in multiple ways
document.getElementById("area").innerText = "Area: " + area;
console.log("Circle area: " + area);`
  },
  {
    id: "class-schedule",
    num: 8,
    title: "Class Schedule Table",
    icon: "📅",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800",
    desc: "A fully responsive HTML class schedule table showing 9 periods across Monday to Friday, styled with a warm brown earthy theme, transparent backgrounds, and mobile-first responsive layout.",
    details: [
      "Built a 6-column, 9-row HTML table displaying class periods for each weekday",
      "Styled with alternating row colors using nth-child selectors and semi-transparent backgrounds",
      "Applied a custom background image with full cover sizing for a warm visual theme",
      "Made fully responsive with CSS media queries — collapses to a card-per-row layout on small screens",
      "Used data-label attributes on each td for accessible mobile column labels",
      "Added box-shadow and border styling to enhance table readability"
    ],
    tools: ["HTML", "CSS"],
    outcome: "A clean, responsive class schedule table that displays correctly on both desktop and mobile. Demonstrates HTML table structure, CSS nth-child styling, and responsive design with media queries."
  },
  {
    id: "restaurant-menu",
    num: 9,
    title: "Restaurant Menu Page",
    icon: "🍽️",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800",
    desc: "A styled restaurant menu webpage for 'Lhuna's Restaurant' featuring three sections — Appetizers, Main Course, and Desserts — with hover animations, glassmorphism cards, and a nature-themed background.",
    details: [
      "Organized 9 menu items across 3 categories: Appetizers, Main Course, and Desserts",
      "Styled each menu item as a flexbox card with dish name, description, and price",
      "Added smooth hover animations — cards lift with translateY and deepen their shadow on hover",
      "Used a semi-transparent glassmorphism main container with backdrop-filter blur over a full-page background image",
      "Applied PHP-peso (₱) currency symbols with double border styling on each price",
      "Made the layout responsive for smaller screens with flex-direction column fallback"
    ],
    tools: ["HTML", "CSS"],
    outcome: "A complete, styled restaurant menu page with interactive hover effects and a professional layout. Demonstrates HTML list structures, CSS flexbox, transition animations, and glassmorphism design.",
    codeSnippet: `ul.menu-list li {
  background: #f7e8dc7a;
  border-radius: 8px;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
}

ul.menu-list li:hover {
  box-shadow: 0 6px 20px rgba(196, 78, 39, 0.4);
  transform: translateY(-4px);
  background: #f4dbc7;
}`
  },
  {
    id: "ai-academy-activity",
    num: 10,
    title: "AI Academy Activity",
    icon: "🤖",
    category: "Artificial Intelligence",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800",
    desc: "A hands-on activity completed as part of the AI Academy program, exploring real-world applications of artificial intelligence and prompt engineering techniques.",
    details: [
      "Explored machine learning concepts and AI applications",
      "Practiced prompt engineering to generate optimized AI outputs",
      "Analyzed AI-generated content for accuracy and relevance",
      "Documented learnings and reflections throughout the process"
    ],
    tools: ["ChatGPT", "Google Gemini", "AI Academy Platform"],
    outcome: "Gained practical experience using AI tools effectively and developed a deeper understanding of how AI can be applied to real-world problems."
  },
  {
    id: "business-report",
    num: 11,
    title: "Business Report",
    icon: "📊",
    category: "Academic Writing",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800",
    desc: "A comprehensive business report that analyzes a company or industry using structured research, data interpretation, and professional writing standards.",
    details: [
      "Conducted research using credible academic and industry sources",
      "Organized findings into a structured, professional report format",
      "Included data analysis, charts, and supporting evidence",
      "Provided actionable recommendations based on findings"
    ],
    tools: ["Google Docs", "Google Sheets", "Canva", "Google Scholar"],
    outcome: "A well-researched and professionally formatted business report that demonstrates analytical thinking and communication skills."
  },
  {
    id: "career-advice-email",
    num: 12,
    title: "Career Advice Email",
    icon: "📧",
    category: "Professional Writing",
    image: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=800",
    desc: "A professionally written email requesting career advice or mentorship, demonstrating strong business communication skills and etiquette.",
    details: [
      "Researched the recipient's background to personalize the message",
      "Crafted a clear, concise, and respectful email structure",
      "Highlighted relevant background and specific questions",
      "Proofread for grammar, tone, and professionalism"
    ],
    tools: ["Gmail", "Grammarly", "Google Docs"],
    outcome: "A polished professional email that demonstrates the ability to communicate formally and build meaningful connections."
  },
  {
    id: "debate-presentation",
    num: 13,
    title: "Debate Presentation",
    icon: "🎤",
    category: "Public Speaking",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800",
    desc: "A structured debate presentation arguing a specific position on a current topic, combining research, critical thinking, and public speaking skills.",
    details: [
      "Researched both sides of the argument to build a strong position",
      "Created a clear structure: opening, arguments, rebuttals, conclusion",
      "Designed supporting slides to reinforce key points",
      "Practiced delivery for clarity, confidence, and timing"
    ],
    tools: ["Canva", "Google Slides", "Research Databases"],
    outcome: "A persuasive and well-structured debate presentation that showcases critical thinking and confident public speaking."
  },
  {
    id: "research-project",
    num: 14,
    title: "Research Project",
    icon: "📚",
    category: "Academic Research",
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800",
    desc: "A formal academic research project following a structured methodology to investigate a specific topic and present findings in a scholarly format.",
    details: [
      "Formulated a clear research question and hypothesis",
      "Gathered data from credible sources and peer-reviewed journals",
      "Analyzed findings using appropriate frameworks",
      "Presented conclusions with supporting evidence and citations"
                ],
    tools: ["Google Scholar", "Zotero", "Google Docs", "SPSS"],
    outcome: "A thorough, citation-backed research paper that demonstrates academic rigor and the ability to synthesize complex information."
  },
  {
    id: "plc-traffic-light",
    num: 15,
    title: "PLC Traffic Light Control System",
    icon: "🚦",
    category: "Mechatronics / Automation",
    image: "https://images.unsplash.com/photo-1566008885218-90abf9200ddb?auto=format&fit=crop&w=800",
    desc: "A PLC-based traffic light control system designed using ladder logic programming to simulate real-world traffic signal operations.",
    details: [
      "Designed a ladder logic diagram to control traffic light sequences (red, yellow, green)",
      "Programmed timing control for each signal phase using PLC concepts",
      "Simulated real-world traffic conditions using automation logic",
      "Tested and debugged the system for correct and safe signal transitions"
    ],
    tools: ["PLC Simulator", "Ladder Logic Software", "Automation Studio"],
    outcome: "A fully functional traffic light control simulation demonstrating PLC programming, automation logic, and industrial control system design."
  },
  {
    id: "computerized-attendance-system",
    num: 16,
    title: "Computerized Attendance System",
    icon: "🖥️",
    category: "Computer Programming / Data Management",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800",
    desc: "A computer-based attendance system that records and updates student attendance digitally using programming logic and data management techniques.",
    details: [
      "Developed a digital attendance system using computer programming",
      "Created a user-friendly interface for recording attendance entries",
      "Implemented real-time updating of attendance records in the system",
      "Organized and managed student data efficiently using structured programming"
    ],
    tools: ["C#", "JavaScript", "Database Management", "Visual Studio"],
    outcome: "A functional computerized attendance system that improves accuracy, efficiency, and real-time tracking of student attendance."
  },
  {
    id: "brick-breaker-arcade",
    num: 17,
    title: "Brick Breaker Arcade Game",
    icon: "🧱",
    category: "Game Development / Web",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800",
    desc: "A fully functional retro-style Brick Breaker arcade game built inside a custom high-performance HTML5 canvas, featuring dynamic angle reflections, falling power-ups, and smooth physics simulation.",
    details: [
      "Engineered real-time 2D physics simulation with precise wall reflection bounds and smooth paddle interaction",
      "Designed dynamic reflection angles based on the exact offset of where the ball strikes the paddle",
      "Created a randomized power-up spawn mechanic including a Paddle Expander (W) and an extra Life (♥)",
      "Implemented a structured level-clear trigger that automatically updates brick rows, colors, and ball velocity",
      "Connected both smooth keyboard input and scaled mouse-tracking movement onto the canvas element",
      "Designed a modern React stats panel matching the portfolio theme to display Score, Lives, and active Modifiers"
    ],
    tools: ["HTML5 Canvas", "React", "TypeScript", "Tailwind CSS", "requestAnimationFrame"],
    outcome: "An engaging, responsive 2D arcade game running natively on React/TypeScript. Demonstrates high-performance canvas rendering, custom physics calculations, animation loop lifecycle, and precise collision detection.",
    hasInteractiveBrickBreaker: true,
    codeSnippet: `// Checking circle-to-rectangle collision for ball and bricks
function circleRectCollision(cx, cy, cr, rx, ry, rw, rh) {
  // Find closest point on the rectangle to the circle's center
  const closestX = clamp(cx, rx, rx + rw);
  const closestY = clamp(cy, ry, ry + rh);
  
  // Calculate distance between closest point and circle center
  const dx = cx - closestX;
  const dy = cy - closestY;
  
  // If distance squared is less than radius squared, collision occurred!
  return (dx * dx + dy * dy) < (cr * cr);
}`
  },
  {
    id: "love-responder",
    num: 18,
    title: "Love Responder 💕",
    icon: "💖",
    category: "Interactive Web Application / Emotional Support",
    image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800",
    desc: "An interactive, empathetic mood-tracking companion application designed to provide personalized comforting guidance, dynamic affirmations, and self-care recommendations based on the user's emotional state.",
    details: [
      "Developed a dynamic emotional response system supporting multiple distinct user moods (Happy, Sad, Angry, Tired, Lonely, Stressed)",
      "Designed a highly polished, responsive interface featuring ambient glow effects, customizable themes, and soft CSS transitions",
      "Implemented a local comfort session tracker and positive quote index to help users review and encourage their well-being journey",
      "Created an interactive affirmation generator that delivers real-time heart particles and comforting visual feedback",
      "Designed with an eye-friendly, beautiful pastel layout paired with warm and modern typography to inspire comfort and mindfulness"
    ],
    tools: ["React", "TypeScript", "Tailwind CSS", "motion/react", "Lucide Icons"],
    outcome: "A comforting emotional support web app that provides users with a safe, positive space to reflect and receive tailored emotional encouragement, encouraging mental wellness and self-care.",
    hasInteractiveLoveResponder: true,
    codeSnippet: `// Dynamic mood guidance routing based on emotional input
const getMoodMessage = (mood: string): string => {
  const messages: Record<string, string> = {
    happy: "I’m so glad you’re happy right now! 😊 Your smile is like sunshine that warms my heart. Keep laughing, keep enjoying every little moment...",
    sad: "I know you’re sad right now 😔, and that’s okay. Please remember, you don’t have to carry that sadness alone. Let me be your safe place...",
    angry: "I can sense your anger, and I respect your feelings ❤️🔥. Take a deep breath, let it out slowly. Whatever it is, I want to listen...",
    tired: "You’ve worked so hard, love 😴. I know you’re tired, and you deserve rest more than anything. Please close your eyes, breathe...",
    lonely: "Even if you feel lonely 💔, please remember this: you are always in my thoughts, always in my prayers, and always in my heart...",
    stressed: "I know things feel overwhelming right now 😣. But pause, love… take one breath at a time. You don’t have to do everything alone..."
  };
  return messages[mood.toLowerCase()] || "No matter what mood you’re in, my love for you doesn’t change. 🌹";
};`
  },
  {
    id: "exam-tracker",
    num: 19,
    title: "Exam Tracker",
    icon: "📊",
    category: "Web Application / Academic Utilities",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800",
    desc: "A fully featured academic management system and study planner designed to help students track upcoming exams, organize preparation schedules, and dynamically compute target grades.",
    details: [
      "Designed a centralized dashboard that summarizes exam countdown clocks, priorities, and preparation status",
      "Created an interactive grade planner utility that computes required final exam scores to achieve specific target grades",
      "Built structured lists for task management, subject organization, and key topics under review",
      "Ensured a highly accessible and responsive design optimized for study sessions on desktop and mobile browsers",
      "Deployed the completed application live to Netlify for real-time academic planning and ease of student access"
    ],
    tools: ["HTML5", "CSS3 Custom Properties", "JavaScript (ES6+)", "Netlify Deployment", "Responsive Layouts"],
    outcome: "An empowering educational tool that streamlines test preparation, enhances time management, and assists students in maintaining academic excellence. Accessible live at examtrack1.netlify.app.",
    liveUrl: "https://6a48ab673942a75d6d90241a--examtrack1.netlify.app/",
    codeSnippet: `// Dynamic Target Grade calculation function
function calculateRequiredScore(currentGrade, weight, targetGrade) {
  // weight is represented as a decimal (e.g. 0.40 for 40%)
  const currentContribution = currentGrade * (1 - weight);
  const requiredScore = (targetGrade - currentContribution) / weight;
  
  return requiredScore > 100 
    ? { feasible: false, score: Math.round(requiredScore) }
    : { feasible: true, score: Math.max(0, Math.round(requiredScore)) };
}`
  }
];

export const skills: Skill[] = [
  { name: "WEB DEVELOPMENT", icon: "Code" },
  { name: "POSTER & FLYER DESIGN", icon: "Paintbrush" },
  { name: "AI IMAGE GENERATION", icon: "Palette" },
  { name: "MICROSOFT POWERPOINT", icon: "Layout" },
  { name: "PRESENTATION DESIGN", icon: "FileText" },
  { name: "SQL DATABASE MANAGEMENT", icon: "Database" },
  { name: "DATABASE MANAGEMENT", icon: "Server" },
  { name: "LADDER LOGIC PROGRAMMING", icon: "Cpu" },
  { name: "RESPONSIVE DESIGN", icon: "Smartphone" },
  { name: "PLC PROGRAMMING", icon: "Settings" }
];

export const softSkills: Skill[] = [
  { name: "SELF-DISCIPLINE", icon: "Heart" },
  { name: "CRITICAL THINKING", icon: "Lightbulb" },
  { name: "ATTENTION TO DETAIL", icon: "CheckSquare" },
  { name: "ADAPTABILITY", icon: "Activity" },
  { name: "PROBLEM SOLVING", icon: "Compass" },
  { name: "ACTIVE EMPATHY", icon: "Users" },
  { name: "TIME MANAGEMENT", icon: "Clock" },
  { name: "COMMUNICATION SKILLS", icon: "MessageSquare" },
  { name: "TEAMWORK", icon: "Layers" },
  { name: "LEADERSHIP", icon: "Award" }
];

export const achievements: Achievement[] = [
  {
    num: 1,
    tag: "ONGOING MERIT",
    title: "AI Academy Student",
    desc: "Selected as an AI Academy student, gaining advanced knowledge and hands-on experience in artificial intelligence and technology development."
  },
  {
    num: 2,
    tag: "ACTIVE DEVELOPMENT",
    title: "Best in Religion",
    desc: "Received the Best in Religion award in recognition of my strong understanding of faith-based values, active participation, and commitment to spiritual growth."
  },
  {
    num: 3,
    tag: "JUNE 2026",
    title: "Hardworking Award",
    desc: "Received a Hardworking Award in recognition of my dedication, persistence, and consistent effort in completing tasks and achieving academic goals."
  },
  {
    num: 4,
    tag: "MARCH 2026",
    title: "With Honors",
    desc: "Consistently achieved with honors from elementary school up to Grade 11, reflecting my dedication, discipline, and strong academic performance throughout my studies."
  },
  {
    num: 5,
    tag: "JANUARY 2026",
    title: "Created Websites",
    desc: "Built multiple functional websites using HTML, CSS, JavaScript, and modern web frameworks."
  },
  {
    num: 6,
    tag: "NOVEMBER 2025",
    title: "Food Kiosk Project",
    desc: "Designed and developed a food kiosk system, combining UI design with practical business logic."
  },
  {
    num: 7,
    tag: "NOVEMBER 2025",
    title: "Data Management Form",
    desc: "Built a data management form application with login, sign-up, and data table views using C# and SQL."
  },
  {
    num: 8,
    tag: "FEBRUARY 2026",
    title: "Canva Design Projects",
    desc: "Created numerous professional-grade visual assets for academic and practical use."
  },
  {
    num: 9,
    tag: "NOVEMBER 2025",
    title: "Coding Projects",
    desc: "Developed multiple C# and JavaScript projects, including converters and calculators, to improve my programming and problem-solving skills."
  },
  {
    num: 10,
    tag: "JUNE 2026",
    title: "Ladder Diagram Projects",
    desc: "Designed a traffic light control system using PLC ladder logic to simulate automated traffic signal operations."
  }
];

export const goals: Goal[] = [
  { id: "G.01", title: "Become an AI professional by building skills in AI and creating impactful real-world solutions." },
  { id: "G.02", title: "Become a businesswoman by building strong skills in leadership, strategy, and innovation to create and grow successful ventures." },
  { id: "G.03", title: "Develop innovative projects that solve real problems and bring creative ideas to life through technology." },
  { id: "G.04", title: "Continuously improve my technical skills to stay updated and competitive in the field of technology." },
  { id: "G.05", title: "Build a successful career by gaining experience, opportunities, and meaningful achievements in my chosen field." },
  { id: "G.06", title: "Help my family by working hard, achieving my goals, and providing support for a better future." },
  { id: "G.07", title: "Continue lifelong learning by consistently exploring new knowledge, skills, and personal growth opportunities." }
];

export const hobbies: Hobby[] = [
  {
    num: 1,
    title: "Building Websites",
    image: "https://images.stockcake.com/public/0/a/9/0a9ddedd-bbf9-4435-a5f1-cfa95ced0f58_large/nighttime-urban-work-stockcake.jpg",
    alt: "Building websites"
  },
  {
    num: 2,
    title: "Journaling Thoughts",
    image: "https://i.pinimg.com/736x/87/9c/ed/879ced162bd6ac262f984994a6a3f052.jpg",
    alt: "Journaling"
  },
  {
    num: 3,
    title: "Creative Coding",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=400",
    alt: "Creative coding"
  },
  {
    num: 4,
    title: "Traveling",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=400",
    alt: "Traveling"
  },
  {
    num: 5,
    title: "Photography",
    image: "https://images.pexels.com/photos/27574694/pexels-photo-27574694/free-photo-of-a-woman-taking-a-photo-with-her-camera.jpeg?w=400&dpr=1",
    alt: "Photography"
  },
  {
    num: 6,
    title: "Reading Books",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuq0A0LlLPnMxQOBG-4s7myZQI-Z1t6IhED8GnBsHjOY1C4DhizZhf4Hm9&s=10",
    alt: "Reading"
  },
  {
    num: 7,
    title: "Drawing",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400",
    alt: "Drawing"
  },
  {
    num: 8,
    title: "Listening to Music",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400",
    alt: "Music"
  },
  {
    num: 9,
    title: "Nature Walking",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUP7W_zwifVMSHV7rxBhBKoHxALXHX7unY1_FD7LBEYI8Vg2-xq52Ao_yg&s=10",
    alt: "Nature"
  },
  {
    num: 10,
    title: "Playing Sports",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRriBZOQBvDU0viSPy3i3ctDKm2dCl7TYyyn7DOKp1M7XzkkX5-MrGi8dg&s=10",
    alt: "Sports"
  }
];

export const contactInfo = {
  name: "Jane Marie Baluna",
  title: "Grade 12 Student",
  email: "Baluna.Jane@biga.onesms.edu.ph",
  phone: "09556849784",
  location: "Biga II Silang Cavite",
  school: "Sisters of Mary of Banneus Inc.",
  track: "Technical-Vocational-Livelihood (TVL)",
  major: "Computer Programming & Mechatronics",
  aboutMe: "Motivated Grade 12 student skilled in programming, mechatronics, electronics, web development, automation, electrical wiring, and AutoCAD. Experienced in apps, websites, and technical projects, seeking hands-on On-the-Job Training."
};

export const education = [
  {
    period: "2021 - 2026",
    school: "Sisters of Mary of Banneus Inc.",
    degree: "Sisters of Mary of Banneus Inc.",
    major: "With Honors",
    details: [
      "Rigorous technical training combining programming fundamentals (C#, JS, HTML/CSS, SQL) with industrial mechatronics (PLC ladder logic programming, automation, and basic robotics)",
      "Consistent With Honors achiever with perfect conduct, recognized with the 'Hardworking Award' for academic diligence",
      "Participated in the selective 'AI Academy' program, masterfully integrating AI capabilities into rapid prototype development and visual layouts"
    ]
  },
  {
    period: "2012 - 2019",
    school: "Bua Elementary School",
    degree: "Bua Elementary School",
    major: "With Honors",
    details: [
      "Consistently recognized with honors, building strong foundations in mathematics, logic, and core science modules",
      "Elected to leadership roles within academic groups, establishing excellent teamwork and project management habits"
    ]
  }
];

export const experienceCertifications = [
  {
    title: "Computer Programming NC3",
    details: "Developed apps (Calculator, Student Management, Food Kiosk) and websites using C#, SQL, HTML, CSS, and JavaScript, focusing on functionality, responsiveness, and user experience."
  },
  {
    title: "Mechatronics NC2",
    details: "Designed ladder diagrams, wired PLCs, and assembled electro-pneumatic systems under 3 minutes, enhancing technical skills and confidence in industrial automation."
  },
  {
    title: "EPA NC2",
    details: "Designed and wired parallel and one-way lighting circuits, improving skills in electrical circuits, wiring, and safe installation."
  },
  {
    title: "AutoCAD",
    details: "Designed a personal house project and created 3D models of car parts using AutoCAD, demonstrating skills in drafting, modeling, and technical design."
  }
];

export const technicalCompetencies = [
  { category: "Web Design", level: 90, items: ["SQL Database Management", "Website Design and Development", "Pneumatics Board Setup", "Electrical & Electronics", "Mechatronics & Automation", "Problem Solving & Analytical Thinking"] },
  { category: "Soft Skills", level: 95, items: ["Time Management", "Adaptability and Flexibility", "Active Listening", "Communication Skills", "Teamwork and Collaboration", "Organizational Skills", "Leadership"] }
];

export const softCompetencies = [
  { name: "Time Management", desc: "Balancing intense academic workloads with vocational training schedules" },
  { name: "Adaptability and Flexibility", desc: "Rigorous self-regulation developed in specialized boarding environment" },
  { name: "Active Listening", desc: "Formulating methodical, logical answers to instructions and engineering issues" },
  { name: "Communication Skills", desc: "Creating supportive team cultures and designing user-centric interfaces" },
  { name: "Teamwork and Collaboration", desc: "Coordinating perfectly in wiring groups, code development, and robotics labs" },
  { name: "Organizational Skills", desc: "Pristine alignment in code styling, design layouts, and wiring diagrams" },
  { name: "Leadership", desc: "Elected to lead groups, guiding peers to successfully assemble systems under record time" }
];
