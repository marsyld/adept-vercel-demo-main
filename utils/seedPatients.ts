// utils/seedPatients.ts
export const seedPatients = [
  {
    id: "p1",
    name: "Анна Смирнова",
    age: 28,
    photo: "/seed/anna.png",
    analyses: [
      {
        date: new Date().toISOString(),
        photo: "/seed/anna.png",
        attrs: {
          age: { value: 27 },
          gender: { value: "female" },
          beauty: { female_score: 7.2, male_score: 6.1 },
          emotion: { neutral: 0.82, happy: 0.1 },
          skinstatus: {
            acne: 0.4,
            dark_circle: 1.2,
            stain: 0.7,
            health: 0.9,
          },
        },
      },
    ],
  },
  {
    id: "p2",
    name: "Мария Орлова",
    age: 34,
    photo: "/seed/maria.png",
    analyses: [],
  },
  {
    id: "p3",
    name: "Игорь Ковалёв",
    age: 42,
    photo: "/seed/igor.png",
    analyses: [],
  },
];
