import BottomNav from "./components/bottomNav";
import FloatingButton from "./components/floatingButton";

export default function Home() {
  return (
    <>
      <BottomNav />
      <div className="btn-wrap fixed bottom-21 right-0 flex flex-col gap-2">
        <FloatingButton variant="create" />
        <FloatingButton variant="top" />
      </div>
    </>
  );
}
