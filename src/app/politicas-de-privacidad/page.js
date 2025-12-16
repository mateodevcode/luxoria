import PolicitasPrivacidad from "@/components/politicas-de-privacidad/PolicitasPrivacidad";
import { scrollbarStyles } from "@/data/data.styles.scrollbar";

const page = () => {
  return (
    <>
      <PolicitasPrivacidad />
      <style>{scrollbarStyles.default}</style>
    </>
  );
};

export default page;
