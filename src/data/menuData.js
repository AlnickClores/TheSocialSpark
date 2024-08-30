import spag from "../assets/images/MainCourse/SPAG.jpg";
import grilled from "../assets/images/MainCourse/grilled.jpg";

export const menu = {
  "main-course": [
    {
      name: "Grilled Chicken",
      price: 99.0,
      description:
        "Juicy grilled chicken breast served with mashed potatoes and steamed vegetables",
      image: grilled,
    },
    {
      name: "Spaghetti Bologne",
      price: 89.0,
      description:
        "Classic spaghetti pasta with rich Bolognese sauce and Parmesan cheese.",
      image: spag,
    },
  ],
  drinks: [
    {
      name: "Iced Tea",
      sizes: ["small", "medium", "large"],
      price: { small: 29.0, medium: 39.0, large: 49.0 },
      description: "Refreshing iced tea served with a slice of lemon.",
      image: null,
    },
    {
      name: "Fruit Punch",
      sizes: ["small", "medium", "large"],
      price: { small: 39.0, medium: 49.0, large: 59.0 },
      description:
        "Tropical fruit punch with a blend of pineapple, orange, and guava juices.",
      image: null,
    },
  ],
  desserts: [
    {
      name: "Wicked Surprise",
      price: 55.0,
      description:
        "Decadent chocolate cake topped with rich chocolate ganache.",
      image: null,
    },
    {
      name: "Banana Split",
      price: 60.0,
      description:
        "Creamy cheesecake on a graham cracker crust, topped with fresh strawberries.",
      image: null,
    },
    {
      name: "Cookie ala Mode",
      price: 90.0,
      description:
        "Creamy cheesecake on a graham cracker crust, topped with fresh strawberries.",
      image: null,
    },
    {
      name: "Fried Ice Cream",
      price: 120.0,
      description:
        "Creamy cheesecake on a graham cracker crust, topped with fresh strawberries.",
      image: null,
    },
  ],
  cakes: [
    {
      name: "Mango Cake",
      sizes: ["slice", "whole"],
      price: { slice: 135.0, whole: 1020.0 },
      description:
        "Delicious mango-flavored cake topped with fresh mango slices.",
      image: null,
    },
    {
      name: "Blueberry",
      sizes: ["slice", "whole"],
      price: { slice: 135.0, whole: 1020.0 },
      description:
        "Rich and moist chocolate cake with a creamy chocolate frosting.",
      image: null,
    },
    {
      name: "Strawberry",
      sizes: ["slice", "whole"],
      price: { slice: 135.0, whole: 1020.0 },
      description:
        "Rich and moist chocolate cake with a creamy chocolate frosting.",
      image: null,
    },
    {
      name: "Ube",
      sizes: ["slice", "whole"],
      price: { slice: 135.0, whole: 1020.0 },
      description:
        "Rich and moist chocolate cake with a creamy chocolate frosting.",
      image: null,
    },
  ],
  burgers: [
    {
      name: "Cheesy Bacon Burger",
      price: 200.0,
      description:
        "Juicy beef patty with lettuce, tomato, and our special sauce.",
      image: null,
    },
    {
      name: "Caramelized Onion Burger",
      price: 150.0,
      description:
        "Beef patty with melted cheese, pickles, onions, and ketchup.",
      image: null,
    },
    {
      name: "Three meat Burger",
      price: 200.0,
      description:
        "Beef patty topped with crispy bacon, cheddar cheese, and BBQ sauce.",
      image: null,
    },
    {
      name: "Knights of the Table (Mini Burgers)",
      price: 240.0,
      description:
        "Grilled veggie patty with avocado, lettuce, tomato, and vegan mayo.",
      image: null,
    },
    {
      name: "Clubhouse",
      price: 150.0,
      description:
        "Grilled veggie patty with avocado, lettuce, tomato, and vegan mayo.",
      image: null,
    },
    {
      name: "Tuna Sandwich",
      price: 100.0,
      description:
        "Grilled veggie patty with avocado, lettuce, tomato, and vegan mayo.",
      image: null,
    },
    {
      name: "TMC signature Burger",
      price: 160.0,
      description:
        "Grilled veggie patty with avocado, lettuce, tomato, and vegan mayo.",
      image: null,
    },
  ],
};
