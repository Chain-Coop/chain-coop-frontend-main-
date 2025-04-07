import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        'xxl': '1320px',
      },
      colors: {
        primary: " #E6B8D4",
        fbg: "#c183cc",
        text1: "#1E1E1E ",
        text2: "#440080",
        text3: "#FFFFFF",
        text4: "#000000",
        text5: "#F5F0F0",
        card: "#FCFAFA",
        coming1: "#EDFFFF",
        coming2: "#F5F1FE",
        how1: "#F5F1FE",
        how2: "#EDFFFF",
        how3: "#F6E4F0",
        howtext: "#707070",
        memt1: "#302B2B",
        rec1: "#FAF9FC",
        rec2: "#f5ffff",
        rec3: "#F9F2F7",
        log: "#F2F2F2",
        holder: "#E9E9E9",
        Dh: "#F1F3F5",
        act: "#2EC046",
        bl: "#D9D9D9",
        fade: "#B3B3B3",
        not: "#F8F4F4",
        blog: "#EEE7F3",
      },
      fontFamily: {
        asap: ["Asap", "sans-serif"],
      },
      backgroundImage: {
        background: "url('/src/Assets/png/story/background.png')",
        heroBackground: "url('/src/Assets/png/home/background.png')",
        contact: "url('/src/Assets/png/contact/circle.png')",
        explore1: "url('/src/Assets/png/home/personlaptop.png')",
        explore2: "url('/src/Assets/png/home/ladylaptop.png')",
        explore3: "url('/src/Assets/png/home/ladylaptop3.png')",
        dashboardHome: "url('/src/Assets/png/dashboard/home.png')",
      },
    },
  },
});
