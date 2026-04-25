import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  {
    id: 1,
    title: "Emergency Food Package",
    category: "Food",
    item: "1 Food Package",
    amount: 50,
    description:
      "10 kg of rice , 5 cans of beans,5 cans of tuna,5 packets of instant noodles,1 liter of cooking oil",
    image:
      "https://s3.amazonaws.com/usc-cache.salvationarmy.org/42bcd5c0-f0b9-4968-a0cd-05f498850333_Sarpy+DRC+3+web.jpg",
    reason:
      "To provide immediate sustenance to families affected by the disaster.",
  },
  {
    id: 2,
    title: "Clean Water Supply",
    category: "Hygiene",
    item: "5 Gallons",
    amount: 20,
    description: "5 gallons of drinking water",
    image: "https://example.com/water_image.jpg",
    reason:
      "To ensure access to safe and clean drinking water for hygiene and hydration.",
  },
  {
    id: 3,
    title: "Hygiene Essentials Kit",
    category: "Hygiene",
    item: "1 Kit",
    amount: 30,
    description:
      "2 bars of soap,1 toothpaste,1 toothbrush,1 pack of sanitary napkins",
    image: "https://static.timesofisrael.com/www/uploads/2015/03/d-640x400.jpg",
    reason:
      "To promote good hygiene practices and prevent the spread of diseases.",
  },
  // Continue adding objects with unique IDs...
  {
    id: 4,
    title: "Warm Blanket",
    category: "Clothing",
    item: "1 Blanket",
    amount: 15,
    description: "1 warm blanket",
    image:
      "https://intlweloveu.org/wp-content/uploads/2019/12/Typhoon-relief-support00-3.jpg",
    reason: "To provide warmth and comfort during cold nights.",
  },
  {
    id: 5,
    title: "Baby Care Package",
    category: "Baby Supplies",
    item: "1 Package",
    amount: 40,
    description:
      "20 diapers,2 packs of baby wipes,5 jars of baby food,1 baby blanket",
    image:
      "https://ashadeofteal.com/wp-content/uploads/2017/12/Gift-Basket-for-an-Expecting-Mom.aShadeofTeal-5.jpg",
    reason: "To cater to the special needs of infants and young children.",
  },
  {
    id: 6,
    title: "First Aid Kit",
    category: "Medical Supplies",
    item: "1 Kit",
    amount: 25,
    description:
      "1 first aid kit (bandages, antiseptic, pain relievers),1 thermometer,5 surgical masks",
    image:
      "https://st2.depositphotos.com/4431055/7393/i/450/depositphotos_73938411-stock-photo-first-aid-kit-medicine-charity.jpg",
    reason:
      "To provide immediate medical assistance in case of injuries or emergencies.",
  },
  {
    id: 7,
    title: "School Supplies Bundle",
    category: "Education",
    item: "1 Bundle",
    amount: 35,
    description:
      "5 notebooks, 10 pencils, 1 ruler,1 eraser, 1 pencil sharpener",
    image:
      "https://media.istockphoto.com/id/1143006246/photo/buying-in-the-library-with-the-shopping-cart.jpg?s=612x612&w=0&k=20&c=OlzzpEBqFWJFMJuIpELipZJRI4gagTWpxL8piJUSOGU=",
    reason:
      "To support children's education and learning continuity during crisis situations.",
  },
  {
    id: 8,
    title: "Emergency Tent",
    category: "Shelter",
    item: "1 Tent",
    amount: 75,
    description: "1 emergency tent",
    image:
      "https://media.istockphoto.com/id/1161024064/photo/big-tents-of-the-ministry-of-emergency-situations-laid-out-on-the-lawn-in-the-forest.jpg?s=612x612&w=0&k=20&c=a8RXiW1ILNNAs-zSTZoDDjaCwRPCy_N4q40BdoeGUxs=",
    reason:
      "To provide temporary shelter to displaced families or individuals.",
  },
  {
    id: 9,
    title: "Pet Care Package",
    category: "Animal Supplies",
    item: "1 Package",
    amount: 20,
    description: "5 cans of pet food, 1 leash, 1 pet blanket",
    image:
      "https://prod-cdn-thekrazycouponlady.imgix.net/wp-content/uploads/2021/07/petco-basket-2021-2-1627098385-1627098385.jpg?auto=format&fit=fill&q=25",
    reason: "To ensure the welfare of pets and animals affected by disasters.",
  },
  {
    id: 10,
    title: "Cooking Utensils Set",
    category: "Cooking Supplies",
    item: "1 Set",
    amount: 30,
    description: "1 cooking pot, 1 frying pan, 1 set of utensils",
    image:
      "https://media.istockphoto.com/id/476392316/photo/kitchen-utensil.jpg?s=612x612&w=0&k=20&c=Mb2d_7WGJP6N5Jb__soAl74ZUhFwH47iSdJtXeoW47o=",
    reason:
      "To facilitate cooking and food preparation for affected individuals or communities.",
  },
  {
    id: 11,
    title: "Personal Hygiene Kit",
    category: "Hygiene",
    item: "1 Kit",
    amount: 25,
    description: "1 shampoo, 1 conditioner, 1 body wash, 1 towel",
    image:
      "https://worldhelp.net/wp-content/uploads/2023/03/IMG_1015_Edit-1.jpg",
    reason:
      "To promote personal cleanliness and hygiene practices for overall health and well-being.",
  },
  {
    id: 12,
    title: "Emergency Light Source",
    category: "Utilities",
    item: "1 Flashlight",
    amount: 10,
    description: "1 flashlight, 1 pack of batteries",
    image:
      "https://media.istockphoto.com/id/1278451359/photo/emergency-preparedness-natural-disaster-supplies.jpg?s=612x612&w=0&k=20&c=Q81FP11SgrzOtGPtFGfBlgijhZvUSFLhlbqanYm08wQ=",
    reason: "To provide illumination during power outages or emergencies.",
  },
];
const COLORS = [
  "#FDA4AF",
  "#A78BFA",
  "#F472B6",
  "#818CF8",
  "#FB7185",
  "#6EE7B7",
  "#FBBF24",
];

interface ReliefGood {
  id: number;
  title: string;
  category: string;
  amount: number;
  description: string;
  image: string;
}

interface TooltipPayload {
  payload: ReliefGood;
  value: number;
  dataKey: string;
  name: string;
  color: string;
  fill: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload as ReliefGood;
    return (
      <div className="bg-white/90 backdrop-blur-md p-3 md:p-5 rounded-2xl shadow-2xl border border-slate-100 max-w-[200px] md:max-w-sm animate-fade-in z-50">
        <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-4">
          <img
            src={item.image}
            alt={item.title}
            className="w-10 h-10 md:w-16 md:h-16 rounded-lg md:rounded-xl object-cover"
          />
          <div>
            <p className="text-sm md:text-xl font-black text-slate-900 tracking-tight leading-none">
              {item.title}
            </p>
            <p className="text-[#FDA4AF] text-[10px] font-bold uppercase tracking-widest mt-1">
              {item.category}
            </p>
          </div>
        </div>
        <p className="hidden md:block text-slate-600 text-xs leading-relaxed mb-3 italic">
          "{item.description}"
        </p>
        <p className="text-lg md:text-3xl font-black text-violet-500 tracking-tighter">
          Amount: {item.amount}
        </p>
      </div>
    );
  }
  return null;
};

const PieCharts = () => {
  return (
    <section className="py-12 md:py-20 bg-slate-50/50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header Section */}
        <div className="relative text-center mb-10 md:mb-16 px-4 group">
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full bg-[#FDA4AF]/10 border border-[#FDA4AF]/20">
            <span className="text-[#FDA4AF] font-bold uppercase tracking-[0.3em] text-[10px]">
              Impact Data
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Relief{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-[#FDA4AF]">
              Goods
            </span>{" "}
            Distribution
          </h2>
          <div className="flex justify-center items-center gap-3 mt-6 md:mt-8">
            <div className="h-[2px] w-4 bg-slate-200 rounded-full" />
            <div className="h-1 w-20 bg-gradient-to-r from-[#FDA4AF] to-violet-400 rounded-full transition-all duration-700 group-hover:w-32" />
            <div className="w-2 h-2 bg-violet-400 rounded-full animate-ping" />
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
          {/* Pie Chart Card */}
          <div className="bg-white p-4 md:p-8 rounded-[2rem] md:rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col items-center min-h-[350px] md:min-h-[500px]">
            <h3 className="text-lg md:text-2xl font-black text-slate-800 tracking-tight mb-4 md:mb-8">
              By Category
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  dataKey="amount"
                  isAnimationActive={true}
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius="50%" // Percentage-based for better scaling
                  outerRadius="80%"
                  stroke="none"
                  label={false} // Disable labels on mobile to prevent overlap
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  iconType="circle"
                  verticalAlign="bottom"
                  wrapperStyle={{ fontSize: "10px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart Card */}
          <div className="bg-white p-4 md:p-8 rounded-[2rem] md:rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.03)] border border-slate-100 min-h-[350px] md:min-h-[500px]">
            <h3 className="text-lg md:text-2xl font-black text-slate-800 tracking-tight mb-8 text-center">
              By Relief Item
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={data}
                margin={{ top: 10, right: 10, left: -20, bottom: 40 }}
                barSize={12}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#f1f5f9"
                  vertical={false}
                />
                <XAxis
                  dataKey="title"
                  tick={{ fill: "#94a3b8", fontSize: 10 }}
                  interval={0} // Force show all ticks
                  angle={-25} // Angle for mobile readability
                  textAnchor="end"
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis hide />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "rgba(167, 139, 250, 0.05)" }}
                />
                <Bar
                  dataKey="amount"
                  fill="url(#colorUv)"
                  radius={[6, 6, 0, 0]}
                />
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FDA4AF" stopOpacity={1} />
                    <stop offset="95%" stopColor="#A78BFA" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PieCharts;
