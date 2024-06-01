export const plans = [
  {
    id: 1,
    name: "Class 10th",
    minutes: 30,
    children: [
      {
        name: "Mathematics",
        children: [
          {
            name: "Matrices",
            children: [
              {
                name: "Types of Matrices",
                children: [
                  {
                    name: "Square Matrix",
                  },
                  {
                    name: "Identity Matrix",
                  },
                ],
              },
              {
                name: "Algebra of Matrices",
              },
            ],
          },
          {
            name: "Inverse Trigonometry",
          },
        ],
      },
      {
        name: "Computer Science",
        children: [
          {
            name: "Loops",
            children: [
              {
                name: "for loop",
              },
              {
                name: "while loop",
              },
            ],
          },
          {
            name: "Data Structures",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Class 11th",
    minutes: 45,
    children: [
      {
        name: "Mathematics",
        children: [
          {
            name: "Binomial Theorem",
            children: [
              {
                name: "Introduction",
              },
              {
                name: "Special Cases",
              },
            ],
          },
        ],
      },
      {
        name: "Chemistry",
        children: [
          {
            name: "Physical Chemistry",
            children: [
              {
                name: "Solid State Chemistry",
              },
            ],
          },
          {
            name: "Inorganic Chemsitry",
            children: [
              {
                name: "p-Block Elements",
              },
              {
                name: "s-Block Elements",
              },
            ],
          },
          {
            name: "Organic Chemistry",
          },
        ],
      },
    ],
  },
];
