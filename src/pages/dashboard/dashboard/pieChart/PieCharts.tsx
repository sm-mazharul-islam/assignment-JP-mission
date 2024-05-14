import {
  PieChart,
  Pie,
  // ResponsiveContainer,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
  ResponsiveContainer,
} from "recharts";

const PieCharts = () => {
  // From Server
  // const { data, isLoading, isError } = useGetReliefGoodsQuery(undefined);
  // console.log();
  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }
  // if (isError) {
  //   return <p>Loading...</p>;
  // }
  // if (!Array.isArray(data) || data.length === 0) {
  //   return <div>Error: Data is not in expected format</div>;
  // }
  // const chartData = data?.map((item) => ({
  //   name: `Amount: ${item.amount}`,
  //   value: 1,
  // }));

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
      image:
        "https://static.timesofisrael.com/www/uploads/2015/03/d-640x400.jpg",
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
      reason:
        "To ensure the welfare of pets and animals affected by disasters.",
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
  return (
    <div className="text-center">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* <ResponsiveContainer width="100%" height="100%"> */}
        <PieChart width={400} height={400}>
          <Pie
            dataKey="amount"
            isAnimationActive={true}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />

          <Tooltip />
        </PieChart>
        {/* </ResponsiveContainer> */}

        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={20}
          >
            <XAxis
              dataKey="title"
              scale="point"
              padding={{ left: 10, right: 10 }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar
              dataKey="amount"
              fill="#8884d8"
              background={{ fill: "#eee" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PieCharts;
