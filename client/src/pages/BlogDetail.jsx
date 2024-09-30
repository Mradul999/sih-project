import React from "react";
import { useParams } from "react-router-dom";

const BlogDetail = () => {
  const { title } = useParams();

  const blogs = [
    {
      title: "How a farmer from Nashik grew 195 quintal onion",
      description: `Modern farming methods have often proven effective and have delivered outstanding results. A farmer from Nashik, stands testimony to the wonders modern farming techniques can do. Here’s how Mr. Balu Darade grew a whopping 195 quintal onion –

      NABARD’s golden initiative
      
      The National Bank for Agriculture and Rural Development (NABARD) initiated a noble program where it trained the farmers for modern farming techniques. Mr. Balu Darade participated in this program as he wished to yield more than 100 quintal, his average produce.
      
      Goodbye to traditional techniques
      
      The traditional method of sowing on flat beds was replaced by raised beds. Following are the advantages of raised bed sowing –
      
          Water can be supplied through drip irrigation
          The temperature can be maintained in raised bed sowing
          Spacing can be easily maintained
          Drip irrigation
      
      Raised bed sowing allowed the water to be supplied through drip irrigation, a method which has its own advantages –
      
          Drip irrigation reduces water wastage
          Evaporation is minimal and the consumption is lowered
          Fertilisers can be used via the dripping system
          The land between the plant rows remain dry and unwanted plant growth is prevented
      
      Apart from the good yield, the new techniques helped him save labour cost for irrigation, fertiliser application and removal of weeds. And guess what, he saved around Rs. 6,000 per acre.`,
      imageUrl: "https://mahadhan.co.in/wp-content/uploads/2017/11/Yielding.jpg",
    },
    {
      title: "Cotton farming – the success story",
      description: `Cotton is one of the most important crops in the Marathwada and Vidarbha region of Maharashtra. At a time when most regions in the state were dealing with numerous farming related problems, one man stood against all odds, applied modern farming techniques and emerged as an inspiration for other farmers – Mr. Ingle

      The back-story: Vijay was using the traditional methods of cotton farming and was getting an average produce. He realized the water supply could be one of the hindrances and drip irrigation might help him increase his produce.
      
      The challenge: None of the farmers in and around his village had used drip irrigation for cotton. There was no way he could guarantee the success of drip irrigation. Was it worth the risk? Let’s find out.
      
      The implementation: He purchased the required equipment and set up drip irrigation in his farm, sprawling across 14 acres. He had to invest a considerable amount, but he was sure it would pay off.
      
      The result: Drip irrigation allowed uniform growth of plants. In addition, it became easier to provide the necessary nutrients by using fertiliser through drip irrigation. The same year, he produced a whopping 35 quintals of cotton in his farm and set a benchmark for others to look up to. He was awarded Appasaheb Pawar Irrigation award for his innovative farming methods and achieving a feat unheard of in the region.
      
      Mr. Ingle also recommends using BT Cotton farming as the BT variety of cotton is more resistant to pests and yields a good produce as well.
      
      Of course, there are a lot of other important things you must follow to get a good yield of cotton.`,
      imageUrl: "https://mahadhan.co.in/wp-content/uploads/2017/10/wheat-farming-1170150.jpg",
    },
    {
      title: "7 tips to Get the Best Tomato Yield",
      description: `Tomato farming can be immensely lucrative if you know the control parameters from the very beginning. The secret to growing plump, juicy, red tomatoes is to start the plants off right, and mitigate any problems before they happen. Note that tomatoes are one of the most common vegetables that are prone to diseases. Therefore, take into account the following fool-proof tomato growing tips to ensure maximum yield:

      Ensure plenty of sunlight: Among the top tips to grow tomatoes is this one! Tomato is a warm season crop and requires at least 6 hours of sun on a daily basis. Therefore, ensure that the site you pick is always blessed with plenty of sunlight.
      Avoid seed crowding: Tomato seedlings need plenty of room to branch out. Crowding them will not just inhibit their growth but also result in unforeseen diseases. For tomatoes, two systems of spacing are generally followed, based on the type of crop variety or hybrid, either 60 × 45 cm or 45 × 30 cm. Seed Rate is 160–200 g/ac for varieties and 60–80 g/ac for hybrids.
      Clip the “suckers” regularly: Between the tomato plant’s stem and branch often grows another stem that produces new branches along the way. The downside is that these “suckers” don’t produce any fruit and hog all the air and energy of the plant. Clip them on a regular basis to ensure a bountiful harvest.
      Keep removing the bottom leaves: Once your plants reach above 3 feet, remove the bottom leaves as they’re the first ones to develop fungus issues. They’re also the oldest, and get lesser and lesser amount of sun and airflow. These also give rise to soil-borne pathogens that can deteriorate the harvest later on.
      Water without fail: Tomato crop thrives on loamy, well-drained soil and therefore, water deeply and regularly without skipping. Irregular watering can lead to blossom-end rot and cracking, so, especially during summer season, irrigation every 5–7 days is necessary, whereas in winter, a 10 to 15-day interval is sufficient.
      Don’t forget to mulch: Mulching conserves water and prevents the soil from diseases moving up across the plants. For efficient mulching, bring into use black LDPE sheets of 25-micron thickness and bury both the ends into the soil to a depth of 10 cm.`,
      imageUrl: "https://mahadhan.co.in/wp-content/uploads/2017/10/shutterstock_76223515.jpg",
    },
    {
      title: "Potato – diseases and symptoms",
      description: `Potatoes are one of the most common and important food sources on the planet. While there are several benefits of growing potatoes, it’s important to know that there are many diseases that the tubers catch. So, if you are growing potatoes this season, here are the types of potato diseases, potato disease control, and their management you should know:

      Late blight: Late blight damages leaves, stems and tubers (potatoes). Affected leaves appear blistered as if scalded by hot water and eventually rot and dry out. To treat late blight, plant resistant cultivators are used. You should also use soaker hoses to give plants time to dry out during the day as the disease develops in humid conditions.
      Bacterial Wilt: In this disease, the infected plant first begins to wilt and spreads to all parts of the plant. Leaves become yellow at their bases. Then the whole plant wilts and dies. Bacterial wilt has no cure. However, it can be controlled using methods of crop rotation, selecting suitable sites, using certified seeds and uprooting diseased plants.
      Blackheart disorder: Blackheart occurs primarily in storage when the tubers do not receive enough oxygen. The potatoes develop acute oxygen deficiency that results in blackening at the center. The tissue dies from the inside out and turns jet black. The disease occurs either due to low temperature in confined storage or high field soil temperatures. Blackheart can be prevented through good ventilation in storage, avoiding flooded areas and extreme temperatures.`,
      imageUrl: "https://mahadhan.co.in/wp-content/uploads/2017/10/shutterstock_94720522.jpg",
    },
    {
      title: "Desert Dunes",
      description: `Wheat is one of the most important food crops in the world and wheat farming requires proper planning to produce a high yield.

      Most farmers prefer growing wheat in winter when the average temperature is between 18-24 degree Celsius. However, farmers who reside in extremely cold climates prefer the spring season as it allows enough sunlight for the wheat crop to flourish.
      
      Seven tips for successful wheat seeding and farming for maximum yield:
      
      1: Pick a dry area for cultivation: Wheat is both a spring and winter crop, and utilizes at least 8 hours of sun on a daily basis. Therefore, avoid picking a site that’s too shady and doesn’t allow enough sunlight.
      
      2: Prepare the land well in advance: Growing wheat requires prepping the soil for strong root growth. Till your soil to a depth of at least 15 cm, and make sure that it’s even.
      
      3: Spread the wheat seeds in a semi-circular motion: You can always use a seed spreader too, as long as it spreads the seeds at approximately one seed per 2.5 sq. cm.
      
      4: Use phosphorus, nitrogen & Potassium fertilization: Phosphorus and nitrogen collectively help develop strong roots which will help the wheat crop survive winter. Optimum dose of Mahadhan 12:32:16 (75 Kg/ac) can help wheat growers to get more yield. In addition to this, application of Mahadhan Bensulf (10 kg/ac) & Mahadhan Zinc sulphate (10 Kg/ac) can further help wheat farmers to get quality oriented higher yield fetching better market price. However, note that excessive nitrogen fertilization can have adverse effects on the crop’s sustenance.
      
      5: Water right after planting the seeds: Winter wheat crops require water as soon as the seeds are planted. It is imperative to keep the entire planting area moist until the plant begins to develop. Then on, follow a strict irrigation schedule.
      
      6: Follow an irrigation schedule: For maximum yield of wheat crop, an irrigation schedule of 6 stages post sowing is highly recommended:
      
          1st irrigation – 3-4 weeks
          2nd irrigation – 40-45 days
          3rd irrigation – 60-65 days
          4th irrigation – 80-85 days
          5th irrigation – 100-105 days
          6th irrigation – 105-120 days
      
       
      
      7: Use pesticides and insecticides as necessary: Wheat crop is not averse to slugs and insects that can wreak havoc on the plantation, especially when the wheat is still very short. Use chemicals like Chlorpyrifos and acetamiprid in such a case that effectively manage the insects.`,
      imageUrl: "https://mahadhan.co.in/wp-content/uploads/2017/10/shutterstock_94720522.jpg",
    },
    {
      title: "Calm Lake",
      description: `Mr. Sanjeev Mane from Sangli was awarded Krushi Bhushan for his astounding work in farming and yielding a whopping 100 tonne sugarcane per acre. How did he achieve this feat? Here’s what he did –

      Drip irrigation: It is a myth that sugarcane crop requires a lot of water. Implementing drip irrigation system can further reduce the wastage of water. According to Mr. Mane, where traditional methods used 1 Crore litres of water, drip irrigation needed just 40 Lac litres of water. Effective water management helps in getting good output as well.
      
      To avoid additional maintenance costs, Mr. Mane also suggests using sub-surface drip irrigation instead of lateral drip irrigation.
      
      Apart from this, what Mr. Mane a few basic things in mind –   To know the soil test values by soil testing  prior to planting is key to fertiliser management in sugarcane.
      
      Soil: Sugarcane can grow on a variety of soils including loams, clayey loams, black cotton soils, brown or reddish loams and even laterites. In fact, sugarcane can tolerate any kind of soil that can retain moisture. But deep rich loamy soils are ideal for its growth.
      
      Essential nutrients: Nitrogen, calcium and phosphorus are the most important nutrients required for a good produce of sugarcane. Optimum nutrition can help improve the sugarcane yield.
      
      Climate: It requires hot and humid climate with average temperature of 21°-27°C and 75cm -150cm rainfall.
      
      Fertilisers: Sugarcane requires a heavy dose of fertiliser as it exhausts the fertility of the soil quickly. However, it is recommended to calculate the exact quantity of fertiliser by using the dosage calculator feature on the Mahadhan App. You can download the app here – Download Mahadhan App
      
      Intercropping: Sugarcane intercropping with short duration vegetable crops like Cabbage & cauliflower were found to be highly beneficial for the farmers. In areas of adequate irrigation, sowing one row of soybean or black gram helps to increase the soil fertility and sugarcane yield.`,
      imageUrl: "https://mahadhan.co.in/wp-content/uploads/2017/09/Cotton.jpg",
    },
  ];

  const blog = blogs.find((b) => b.title === decodeURIComponent(title));

  if (!blog) {
    return <p>Blog not found</p>;
  }

  return (
    <div className="p-6  min-h-screen">
      <h1 className="text-4xl  font-bold mb-8">{blog.title}</h1>
      <img
        src={blog.imageUrl}
        alt={blog.title}
        className="w-full h-72 object-cover  rounded-lg mb-8"
      />
      <p>{blog.description}</p>
    </div>
  );
};

export default BlogDetail;
