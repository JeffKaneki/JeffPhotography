// ================= GALLERY DATA =================
// Centralized gallery data for easier maintenance and updates
const galleryData = [
  {
    id: 1,
    title: "Princess Pre-Debut(Cowboy Theme)",
    description: "An 18th pre-debut photoshoot that blends elegance and western charm— every frame telling a different side of her story.",
    coverImage: "assets/photos/sample1.jpg",
    images: [
      "assets/photos/set1/img1.jpg",
      "assets/photos/set1/img2.jpg",
      "assets/photos/set1/img3.jpg",
      "assets/photos/set1/img4.jpg",
      "assets/photos/set1/img5.jpg",
      "assets/photos/set1/img6.jpg"
    ]
  },
  {
    id: 2,
    title: "Ai-Jean Villanueva Civil Wedding",
    description: "From this moment on, every sunrise is shared, every dream intertwined. ✨\nCongratulations to the couple—your forever looks beautiful. ❤️",
    coverImage: "assets/photos/sample2.jpg",
    images: [
      "assets/photos/set2/img (1).jpg",
      "assets/photos/set2/img (2).jpg",
      "assets/photos/set2/img (3).jpg",
      "assets/photos/set2/img (4).jpg",
      "assets/photos/set2/img (5).jpg"
    ]
  },
  {
    id: 3,
    title: "Hannah Pre-Debut(Cowboy Theme)",
    description: "𝙉𝙤𝙩 𝙢𝙮 𝙛𝙞𝙧𝙨𝙩 𝙧𝙞𝙙𝙚, 𝙟𝙪𝙨𝙩 𝙢𝙮 𝙜𝙧𝙖𝙣𝙙 𝙙𝙚𝙗𝙪𝙩. 🤠💐",
    coverImage: "assets/photos/sample3.jpg",
    images: [
      "assets/photos/set3/img (1).jpg",
      "assets/photos/set3/img (2).jpg",
      "assets/photos/set3/img (3).jpg",
      "assets/photos/set3/img (4).jpg",
      "assets/photos/set3/img (5).jpg"
    ]
  },
  {
    id: 4,
    title: "Princess Pre-Debut(Dreamy Theme)",
    description: "𝐒𝐨𝐟𝐭 𝐢𝐧 𝐩𝐢𝐧𝐤. 𝐅𝐞𝐚𝐫𝐥𝐞𝐬𝐬 𝐢𝐧 𝐛𝐨𝐨𝐭𝐬. ✨🤍🤠\nAn 18th pre-debut photoshoot that blends elegance and western charm— every frame telling a different side of her story.",
    coverImage: "assets/photos/sample4.jpg",
    images: [
      "assets/photos/set4/img (1).jpg",
      "assets/photos/set4/img (2).jpg",
      "assets/photos/set4/img (3).jpg",
      "assets/photos/set4/img (4).jpg",
      "assets/photos/set4/img (5).jpg"
    ]
  },
  {
    id: 5,
    title: "THEA@18 | DEBUT✨",
    description: "Location: Centrala, Surallah, South Cotabato",
    coverImage: "assets/photos/sample5.jpg",
    images: [
      "assets/photos/set5/img (1).jpg",
      "assets/photos/set5/img (2).jpg",
      "assets/photos/set5/img (3).jpg",
      "assets/photos/set5/img (4).jpg",
      "assets/photos/set5/img (5).jpg"
    ]
  },
  {
    id: 6,
    title: "Hannah Pre-Debut(Dress Theme)",
    description: "𝙉𝙤𝙩 𝙢𝙮 𝙛𝙞𝙧𝙨𝙩 𝙧𝙞𝙙𝙚, 𝙟𝙪𝙨𝙩 𝙢𝙮 𝙜𝙧𝙖𝙣𝙙 𝙙𝙚𝙗𝙪𝙩. 🤠💐",
    coverImage: "assets/photos/sample6.jpg",
    images: [
      "assets/photos/set6/img (1).jpg",
      "assets/photos/set6/img (2).jpg",
      "assets/photos/set6/img (3).jpg",
      "assets/photos/set6/img (4).jpg",
      "assets/photos/set6/img (5).jpg"
    ]
  },
  {
    id: 7,
    title: "Reign Pre-Debut(Dress Theme)",
    description: "𝗘𝗶𝗴𝗵𝘁𝗲𝗲𝗻 𝗻𝗲𝘃𝗲𝗿 𝗹𝗼𝗼𝗸𝗲𝗱 𝘁𝗵𝗶𝘀 𝘀𝘁𝘂𝗻𝗻𝗶𝗻𝗴 ✨💖 𝗛𝗼𝗻𝗼𝗿𝗲𝗱 𝘁𝗼 𝘄𝗶𝘁𝗻𝗲𝘀𝘀 𝘁𝗵𝗲 𝗯𝗲𝗮𝘂𝘁𝘆 𝗯𝗲𝗳𝗼𝗿𝗲 𝘁𝗵𝗲 𝗯𝗶𝗴 𝗱𝗮𝘆 👑📸💫\n𝘚𝘩𝘦'𝘴 𝘨𝘭𝘰𝘸𝘪𝘯𝘨, 𝘢𝘯𝘥 𝘵𝘩𝘪𝘴 𝘪𝘴 𝘫𝘶𝘴𝘵 𝘵𝘩𝘦 𝘣𝘦𝘨𝘪𝘯𝘯𝘪𝘯𝘨.",
    coverImage: "assets/photos/sample7.jpg",
    images: [
      "assets/photos/set7/img (1).jpg",
      "assets/photos/set7/img (2).jpg",
      "assets/photos/set7/img (3).jpg",
      "assets/photos/set7/img (4).jpg",
      "assets/photos/set7/img (5).jpg"
    ]
  },
  {
    id: 8,
    title: "Mr. Pedro Jr. Civil Wedding",
    description: "A beautiful beginning to a lifetime of love and devotion. 🤍\nTwo hearts united, one promise for forever.\nCongratulations to the newlyweds—may your journey together be filled with love, joy, and endless blessings.",
    coverImage: "assets/photos/sample8.jpg",
    images: [
      "assets/photos/set8/img (1).jpg",
      "assets/photos/set8/img (2).jpg",
      "assets/photos/set8/img (3).jpg",
      "assets/photos/set8/img (4).jpg",
      "assets/photos/set8/img (5).jpg"
    ]
  },
  {
    id: 9,
    title: "In loving memory of Lito L. Miguel",
    description: "Gone from our sight, but never from our hearts. 🤍\nA day of prayer, remembrance, and love.",
    coverImage: "assets/photos/sample9.jpg",
    images: [
      "assets/photos/set9/img (1).jpg",
      "assets/photos/set9/img (2).jpg",
      "assets/photos/set9/img (3).jpg",
      "assets/photos/set9/img (4).jpg",
      "assets/photos/set9/img (5).jpg"
    ]
  },
  {
    id: 10,
    title: "In loving memory of Randy D. Patches",
    description: "Honored to provide photo coverage for this meaningful moment.",
    coverImage: "assets/photos/sample10.jpg",
    images: [
      "assets/photos/set10/img (1).jpg",
      "assets/photos/set10/img (2).jpg",
      "assets/photos/set10/img (3).jpg",
      "assets/photos/set10/img (4).jpg",
      "assets/photos/set10/img (5).jpg",
      "assets/photos/set10/img (6).jpg",
      "assets/photos/set10/img (7).jpg"
    ]
  },
  {
    id: 11,
    title: "Krizelle Dawn's Civil Wedding",
    description: "A simple wedding, a lifetime promise. 🤍\nCongratulations and best wishes to the newly married couple! 💖",
    coverImage: "assets/photos/sample11.jpg",
    images: [
      "assets/photos/set11/img (1).jpg",
      "assets/photos/set11/img (2).jpg",
      "assets/photos/set11/img (3).jpg",
      "assets/photos/set11/img (4).jpg",
      "assets/photos/set11/img (5).jpg",
      "assets/photos/set11/img (6).jpg",
      "assets/photos/set11/img (7).jpg",
      "assets/photos/set11/img (8).jpg"
    ]
  },
  {
    id: 12,
    title: "Jasmin Pre-Debut(Cowboy Theme)",
    description: "Two themes, one unforgettable pre-debut story. ✨\nFrom timeless elegance in white to fearless cowgirl vibes 🤍🤠\nCelebrating 18 with beauty, confidence, and a touch of western charm.",
    coverImage: "assets/photos/sample12.jpg",
    images: [
      "assets/photos/set12/img (1).jpg",
      "assets/photos/set12/img (2).jpg",
      "assets/photos/set12/img (3).jpg",
      "assets/photos/set12/img (4).jpg",
      "assets/photos/set12/img (5).jpg",
      "assets/photos/set12/img (6).jpg"
    ]
  },
  {
    id: 13,
    title: "Jasmin Pre-Debut(White Dress Theme)",
    description: "Two themes, one unforgettable pre-debut story. ✨\nFrom timeless elegance in white to fearless cowgirl vibes 🤍🤠\nCelebrating 18 with beauty, confidence, and a touch of western charm.",
    coverImage: "assets/photos/sample13.jpg",
    images: [
      "assets/photos/set13/img (1).jpg",
      "assets/photos/set13/img (2).jpg",
      "assets/photos/set13/img (3).jpg",
      "assets/photos/set13/img (4).jpg",
      "assets/photos/set13/img (5).jpg",
      "assets/photos/set13/img (6).jpg",
      "assets/photos/set13/img (7).jpg"
    ]
  }
];
