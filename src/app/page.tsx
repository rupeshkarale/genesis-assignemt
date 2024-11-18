import { redirect } from "next/navigation";
import React from "react";

const Home: React.FC = () => {
  redirect("https://app.eventy.xyz");
};

export default Home;
